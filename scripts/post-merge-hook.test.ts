/**
 * Exercises .githooks/post-merge for real, but only inside a throwaway git
 * repo in the OS temp dir. That repo's `notify-consumers` npm script is a
 * fake that just writes a marker file, so no real consumer is ever run.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanGitEnv } from './git-env';
import { parseConfig } from './notify-consumers';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOOK = join(REPO_ROOT, '.githooks', 'post-merge');

// The fake waits before writing its marker, so a hook that blocked on it
// would make the merge take at least this long.
const FAKE_DELAY_SECONDS = 4;

let repo: string;

/** A clean env: no CI, no global/system git config, no inherited GIT_* vars. */
function gitEnv(extra: Record<string, string> = {}): NodeJS.ProcessEnv {
  const env = cleanGitEnv();
  delete env.CI;
  return {
    ...env,
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_AUTHOR_NAME: 'Test',
    GIT_AUTHOR_EMAIL: 'test@example.com',
    GIT_COMMITTER_NAME: 'Test',
    GIT_COMMITTER_EMAIL: 'test@example.com',
    ...extra,
  };
}

function git(args: string[], extra: Record<string, string> = {}): string {
  return execFileSync('git', args, { cwd: repo, env: gitEnv(extra), encoding: 'utf8', stdio: 'pipe' });
}

function commit(file: string): void {
  writeFileSync(join(repo, file), file);
  git(['add', file]);
  git(['commit', '--quiet', '--no-verify', '-m', file]);
}

/** Merges branch `incoming` into the current branch; returns output and elapsed ms. */
function mergeIncoming(extra: Record<string, string> = {}): { output: string; ms: number } {
  const start = Date.now();
  const result = spawnSync('git', ['merge', '--no-edit', 'incoming'], {
    cwd: repo,
    env: gitEnv(extra),
    encoding: 'utf8',
  });
  const ms = Date.now() - start;
  if (result.status !== 0) throw new Error(`git merge failed: ${result.stderr}`);
  // git sends a hook's output to stderr.
  return { output: result.stdout + result.stderr, ms };
}

const marker = () => join(repo, 'marker.txt');

// The hook's shell creates the log (by redirecting into it) before the hook
// returns, so a missing log right after the merge means nothing was started.
const logFile = () => join(repo, 'notify-consumers.log');

async function waitForMarker(timeoutMs = 15000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (existsSync(marker())) return true;
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

beforeEach(() => {
  repo = mkdtempSync(join(tmpdir(), 'post-merge-hook-'));
  git(['init', '--quiet', '--initial-branch=main']);
  const hooks = join(repo, '.hooks');
  mkdirSync(hooks);
  copyFileSync(HOOK, join(hooks, 'post-merge'));
  git(['config', 'core.hooksPath', hooks]);

  // The fake notify-consumers: sleep, then leave a marker.
  const fake = `sleep ${FAKE_DELAY_SECONDS} && echo ran > marker.txt`;
  writeFileSync(join(repo, 'package.json'), JSON.stringify({ scripts: { 'notify-consumers': fake } }));
  writeFileSync(join(repo, '.gitignore'), 'marker.txt\nnotify-consumers.log\nnotify-consumers.config.json\n');
  commit('base.txt');

  git(['checkout', '--quiet', '-b', 'incoming']);
  commit('incoming.txt');
  git(['checkout', '--quiet', 'main']);
});

afterEach(() => {
  rmSync(repo, { recursive: true, force: true });
});

const writeConfig = () => writeFileSync(join(repo, 'notify-consumers.config.json'), '{"consumers": []}');

describe('.githooks/post-merge', () => {
  it('starts notify-consumers in the background when a merge moves main on', async () => {
    writeConfig();
    const { output, ms } = mergeIncoming();
    expect(output).toContain('notify-consumers: started in the background');
    // The merge returned before the fake finished its delay.
    expect(ms).toBeLessThan(FAKE_DELAY_SECONDS * 1000);
    expect(existsSync(logFile())).toBe(true);
    expect(existsSync(marker())).toBe(false);
    expect(await waitForMarker()).toBe(true);
  }, 20000);

  it('does nothing on a branch other than main', () => {
    writeConfig();
    git(['checkout', '--quiet', '-b', 'feature']);
    const { output } = mergeIncoming();
    expect(output).not.toContain('notify-consumers');
    expect(existsSync(logFile())).toBe(false);
  });

  it('does nothing on CI, and says why', () => {
    writeConfig();
    const { output } = mergeIncoming({ CI: 'true' });
    expect(output).toContain('notify-consumers: CI detected, skipping.');
    expect(existsSync(logFile())).toBe(false);
  });

  it('does nothing without a config, and says why', () => {
    const { output } = mergeIncoming();
    expect(output).toContain('notify-consumers: no notify-consumers.config.json, skipping');
    expect(existsSync(logFile())).toBe(false);
  });

  it('--help prints usage to stdout, starts nothing, and exits 0', () => {
    writeConfig();
    const result = spawnSync('sh', [HOOK, '--help'], { cwd: repo, env: gitEnv(), encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/^Usage: \.githooks\/post-merge/);
    expect(result.stderr).toBe('');
    expect(existsSync(logFile())).toBe(false);
  });
});

describe('notify-consumers.config.example.json', () => {
  it('is a valid config that uses only placeholder paths', () => {
    const config = parseConfig(readFileSync(join(REPO_ROOT, 'notify-consumers.config.example.json'), 'utf8'));
    expect(config.consumers.length).toBeGreaterThan(0);
    for (const consumer of config.consumers) expect(consumer.path).toMatch(/^\/path\/to\//);
  });
});

describe('.gitignore', () => {
  it('ignores the local config and the background log', () => {
    const ignored = readFileSync(join(REPO_ROOT, '.gitignore'), 'utf8').split('\n');
    expect(ignored).toContain('notify-consumers.config.json');
    expect(ignored).toContain('notify-consumers.log');
  });
});
