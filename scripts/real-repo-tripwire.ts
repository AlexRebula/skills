/**
 * Vitest globalSetup: fails the run if the test suite changed this checkout's
 * own git state (its .git/config, HEAD, or current branch tip).
 *
 * A test that runs `git` against a throwaway repo, but inherits a git hook's
 * GIT_DIR, acts on this repository instead (see git-env.ts). That has set
 * `core.bare = true` and added stray commits here before. This tripwire
 * records the real repo's state before the suite and compares it after, so
 * the next such test fails loudly instead of corrupting the checkout quietly.
 *
 * The repo is resolved from this file's own location with GIT_* stripped, so
 * a leaked GIT_DIR can't redirect the tripwire itself.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanGitEnv } from './git-env.ts';

export interface RepoSnapshot {
  configPath: string;
  config: string;
  headPath: string;
  head: string;
  /** Commit HEAD points at, or null on an unborn branch. */
  tip: string | null;
}

function git(repoRoot: string, args: string[]): string {
  return execFileSync('git', ['-C', repoRoot, ...args], {
    env: cleanGitEnv(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

/** Records the repo's shared config, HEAD and branch tip; null if `repoRoot` isn't a git repo. */
export function snapshotRepo(repoRoot: string): RepoSnapshot | null {
  let gitDir: string;
  let commonDir: string;
  try {
    [gitDir, commonDir] = git(repoRoot, [
      'rev-parse',
      '--path-format=absolute',
      '--git-dir',
      '--git-common-dir',
    ]).split('\n');
  } catch {
    return null;
  }
  let tip: string | null;
  try {
    tip = git(repoRoot, ['rev-parse', '--verify', '--quiet', 'HEAD']);
  } catch {
    tip = null;
  }
  const configPath = join(commonDir, 'config');
  const headPath = join(gitDir, 'HEAD');
  return {
    configPath,
    config: readFileSync(configPath, 'utf8'),
    headPath,
    head: readFileSync(headPath, 'utf8').trim(),
    tip,
  };
}

function changedLines(before: string, after: string): string[] {
  const beforeLines = before.split('\n');
  const afterLines = after.split('\n');
  return [
    ...beforeLines.filter((line) => !afterLines.includes(line)).map((line) => `    - ${line}`),
    ...afterLines.filter((line) => !beforeLines.includes(line)).map((line) => `    + ${line}`),
  ];
}

/** One human-readable line (or block) per thing that differs between two snapshots. */
export function describeChanges(before: RepoSnapshot, after: RepoSnapshot): string[] {
  const changes: string[] = [];
  if (before.config !== after.config) {
    changes.push(
      [
        `.git/config changed (${before.configPath}):`,
        ...changedLines(before.config, after.config),
      ].join('\n')
    );
  }
  if (before.head !== after.head) {
    changes.push(`HEAD changed: ${before.head} -> ${after.head}`);
  } else if (before.tip !== after.tip) {
    changes.push(`branch tip moved: ${before.tip ?? '(none)'} -> ${after.tip ?? '(none)'}`);
  }
  return changes;
}

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));

export default function setup(): () => void {
  const before = snapshotRepo(REPO_ROOT);
  return () => {
    if (!before) return;
    const after = snapshotRepo(REPO_ROOT);
    const changes = after
      ? describeChanges(before, after)
      : [`${REPO_ROOT} is no longer a readable git repository`];
    if (changes.length === 0) return;
    throw new Error(
      [
        `The test suite changed this repository's own git state (${REPO_ROOT}):`,
        ...changes.map((change) => `  ${change}`),
        'A test probably ran git without `env: cleanGitEnv()` (scripts/git-env.ts) while a git hook',
        'had exported GIT_DIR. (A commit or branch switch of your own during the run, e.g. in watch',
        'mode, also trips this.) Nothing was restored automatically: check and repair the repo by hand.',
      ].join('\n')
    );
  };
}
