/**
 * Exercises .githooks/post-merge for real, but only inside a throwaway git
 * repo in the OS temp dir. The hook must run no code at all: an `npm` put
 * first on PATH only logs its calls, so the tests can assert it never ran.
 * The repo's `notify-consumers` npm script is a logging fake as well, as
 * defence in depth should a real npm be reached some other way.
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

// Each fake appends one line to calls.txt in the repo when called.
const fake = (name: string) => `#!/bin/sh\necho "${name} $*" >> "$FAKE_CALLS"\n`;

const MOVED_MESSAGE =
  "notify-consumers: this repo's main moved. See the plan: npm run notify-consumers -- --dry-run\n" +
  'notify-consumers: run it: npm run notify-consumers\n';
const NOT_SET_UP_MESSAGE =
  "notify-consumers: not set up. Only needed if another project of yours keeps a copy of this repo's skills data; see scripts/notify-consumers.md.\n";

// How long to wait for a background run the hook must not have started.
const BACKGROUND_GRACE_MS = 1500;

let repo: string;

/** A clean env: no CI, no global/system git config, no inherited GIT_* vars. */
function gitEnv(extra: Record<string, string> = {}): NodeJS.ProcessEnv {
  const env = cleanGitEnv();
  delete env.CI;
  return {
    ...env,
    PATH: `${join(repo, 'fake-bin')}:${env.PATH ?? ''}`,
    FAKE_CALLS: join(repo, 'calls.txt'),
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

/** Merges branch `incoming` into the current branch; returns the hook's output (git's stderr). */
function mergeIncoming(extra: Record<string, string> = {}): string {
  const result = spawnSync('git', ['merge', '--no-edit', 'incoming'], {
    cwd: repo,
    env: gitEnv(extra),
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(`git merge failed: ${result.stderr}`);
  // git sends a hook's output to stderr; its own merge summary goes to stdout.
  return result.stderr;
}

/** Every call of a fake (`npm ...` or `notify-consumers ...`), one entry per call. */
function fakeCalls(): string[] {
  const file = join(repo, 'calls.txt');
  return existsSync(file) ? readFileSync(file, 'utf8').trim().split('\n') : [];
}

// The old hook wrote a background run's output here.
const staleLogFile = () => join(repo, 'notify-consumers.log');

beforeEach(() => {
  repo = mkdtempSync(join(tmpdir(), 'post-merge-hook-'));
  git(['init', '--quiet', '--initial-branch=main']);
  const hooks = join(repo, '.hooks');
  mkdirSync(hooks);
  copyFileSync(HOOK, join(hooks, 'post-merge'));
  git(['config', 'core.hooksPath', hooks]);

  mkdirSync(join(repo, 'fake-bin'));
  writeFileSync(join(repo, 'fake-bin', 'npm'), fake('npm'), { mode: 0o755 });
  writeFileSync(join(repo, 'fake-notify.sh'), fake('notify-consumers'));
  const scripts = { 'notify-consumers': 'sh fake-notify.sh' };
  writeFileSync(join(repo, 'package.json'), JSON.stringify({ scripts }));
  writeFileSync(join(repo, '.gitignore'), 'calls.txt\nnotify-consumers.log\nnotify-consumers.config.json\n');
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
  it('prints where to see the plan and how to run it when a merge moves main on, and runs nothing', async () => {
    writeConfig();
    expect(mergeIncoming()).toBe(MOVED_MESSAGE);
    // Give a background run time to show up: none may.
    await new Promise((r) => setTimeout(r, BACKGROUND_GRACE_MS));
    expect(fakeCalls()).toEqual([]);
    expect(existsSync(staleLogFile())).toBe(false);
  }, 10000);

  it('exits 0 after printing the message', () => {
    writeConfig();
    mergeIncoming();
    // Run the hook again by hand to see its exit code (ORIG_HEAD still differs from HEAD).
    const result = spawnSync('sh', [HOOK, '0'], { cwd: repo, env: gitEnv(), encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toBe('');
    expect(result.stderr).toBe(MOVED_MESSAGE);
    expect(fakeCalls()).toEqual([]);
  });

  it('does nothing on a branch other than main', () => {
    writeConfig();
    git(['checkout', '--quiet', '-b', 'feature']);
    const output = mergeIncoming();
    expect(output).not.toContain('notify-consumers');
    expect(fakeCalls()).toEqual([]);
  });

  it('does nothing on CI, and says why', () => {
    writeConfig();
    const output = mergeIncoming({ CI: 'true' });
    expect(output).toContain('notify-consumers: CI detected, skipping.');
    expect(fakeCalls()).toEqual([]);
  });

  it('does nothing without a config, and says it is not set up and when it is needed', () => {
    const output = mergeIncoming();
    expect(output).toBe(NOT_SET_UP_MESSAGE);
    expect(fakeCalls()).toEqual([]);
  });

  it('--help prints usage to stdout, starts nothing, and exits 0', () => {
    writeConfig();
    const result = spawnSync('sh', [HOOK, '--help'], { cwd: repo, env: gitEnv(), encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/^Usage: \.githooks\/post-merge/);
    expect(result.stderr).toBe('');
    expect(fakeCalls()).toEqual([]);
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
  it('ignores the local config and the old background log', () => {
    const ignored = readFileSync(join(REPO_ROOT, '.gitignore'), 'utf8').split('\n');
    expect(ignored).toContain('notify-consumers.config.json');
    expect(ignored).toContain('notify-consumers.log');
  });
});
