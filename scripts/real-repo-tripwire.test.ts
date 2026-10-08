import { execFileSync } from 'node:child_process';
import { mkdtempSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanGitEnv } from './git-env';
import { describeChanges, snapshotRepo } from './real-repo-tripwire';

let repo: string;
let decoy: string;

function git(cwd: string, ...args: string[]): string {
  return execFileSync('git', args, { cwd, env: cleanGitEnv(), encoding: 'utf8', stdio: 'pipe' });
}

function makeRepo(prefix: string): string {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), prefix)));
  git(dir, 'init', '--quiet', '--initial-branch=main');
  git(dir, 'config', 'user.email', 'test@example.com');
  git(dir, 'config', 'user.name', 'Test');
  git(dir, 'commit', '--quiet', '--allow-empty', '--no-verify', '-m', 'initial');
  return dir;
}

beforeEach(() => {
  repo = makeRepo('tripwire-repo-');
  decoy = makeRepo('tripwire-decoy-');
});

afterEach(() => {
  rmSync(repo, { recursive: true, force: true });
  rmSync(decoy, { recursive: true, force: true });
});

describe('snapshotRepo', () => {
  it('reads the repo it is given even when GIT_DIR points somewhere else', () => {
    const original = process.env.GIT_DIR;
    process.env.GIT_DIR = join(decoy, '.git');
    try {
      const snapshot = snapshotRepo(repo);
      expect(snapshot?.configPath).toBe(join(repo, '.git', 'config'));
      expect(snapshot?.tip).toBe(git(repo, 'rev-parse', 'HEAD').trim());
    } finally {
      if (original === undefined) delete process.env.GIT_DIR;
      else process.env.GIT_DIR = original;
    }
  });

  it('returns null for a directory that is not a git repository', () => {
    const plain = mkdtempSync(join(tmpdir(), 'tripwire-plain-'));
    try {
      expect(snapshotRepo(plain)).toBeNull();
    } finally {
      rmSync(plain, { recursive: true, force: true });
    }
  });
});

describe('describeChanges', () => {
  it('reports nothing when the repo is untouched', () => {
    const before = snapshotRepo(repo)!;
    expect(describeChanges(before, snapshotRepo(repo)!)).toEqual([]);
  });

  it('reports a changed .git/config, with the lines that changed', () => {
    const before = snapshotRepo(repo)!;
    git(repo, 'config', 'core.bare', 'true');
    const changes = describeChanges(before, snapshotRepo(repo)!);
    expect(changes).toHaveLength(1);
    expect(changes[0]).toContain('.git/config changed');
    expect(changes[0]).toContain('- \tbare = false');
    expect(changes[0]).toContain('+ \tbare = true');
  });

  it('reports a new commit on the current branch', () => {
    const before = snapshotRepo(repo)!;
    git(repo, 'commit', '--quiet', '--allow-empty', '--no-verify', '-m', 'fixture');
    const changes = describeChanges(before, snapshotRepo(repo)!);
    expect(changes).toHaveLength(1);
    expect(changes[0]).toContain('branch tip moved');
  });

  it('reports a switched HEAD', () => {
    git(repo, 'branch', 'other');
    const before = snapshotRepo(repo)!;
    git(repo, 'switch', '--quiet', 'other');
    const changes = describeChanges(before, snapshotRepo(repo)!);
    expect(changes).toHaveLength(1);
    expect(changes[0]).toContain('HEAD changed: ref: refs/heads/main -> ref: refs/heads/other');
  });
});
