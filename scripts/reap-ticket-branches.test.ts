import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  branchMatchesTicket,
  extractTicketNumber,
  findBranchesInRepo,
  parseArgs,
  parseBranchList,
  parseWorktreePorcelain,
  recommendedCommands,
  formatReport,
  type BranchFinding,
} from './reap-ticket-branches';

// ---------------------------------------------------------------------------
// Pure function unit tests
// ---------------------------------------------------------------------------

describe('parseArgs', () => {
  it('parses --ticket and one or more --repo flags', () => {
    const args = parseArgs(['--ticket', '841', '--repo', '/a', '--repo', '/b']);
    expect(args).toEqual({ ticket: '841', branch: null, repos: ['/a', '/b'] });
  });

  it('parses --branch mode', () => {
    const args = parseArgs(['--branch', 'fix/841-foo', '--repo', '/a']);
    expect(args).toEqual({ ticket: null, branch: 'fix/841-foo', repos: ['/a'] });
  });

  it('throws when neither --ticket nor --branch is given', () => {
    expect(() => parseArgs(['--repo', '/a'])).toThrow(/--ticket.*--branch/);
  });

  it('throws when both --ticket and --branch are given', () => {
    expect(() => parseArgs(['--ticket', '841', '--branch', 'foo', '--repo', '/a'])).toThrow(/only one/);
  });

  it('throws when no --repo is given', () => {
    expect(() => parseArgs(['--ticket', '841'])).toThrow(/--repo/);
  });
});

describe('extractTicketNumber', () => {
  it('accepts a bare number', () => {
    expect(extractTicketNumber('841')).toBe('841');
  });

  it('extracts trailing digits from a hash-prefixed ref', () => {
    expect(extractTicketNumber('#841')).toBe('841');
  });

  it('extracts trailing digits from a tracker-prefixed ref', () => {
    expect(extractTicketNumber('tracker#841')).toBe('841');
  });

  it('throws when no digits are present', () => {
    expect(() => extractTicketNumber('no-number-here')).toThrow();
  });
});

describe('branchMatchesTicket', () => {
  it('matches the ticket number as a delimited segment', () => {
    expect(branchMatchesTicket('fix/841-hero-background', '841')).toBe(true);
  });

  it('does not match a longer number that merely contains the ticket digits', () => {
    expect(branchMatchesTicket('fix/8410-something', '841')).toBe(false);
    expect(branchMatchesTicket('fix/1841-something', '841')).toBe(false);
  });

  it('does not false-positive on a short ticket number inside a longer one', () => {
    expect(branchMatchesTicket('fix/848-plus-mark', '8')).toBe(false);
  });

  it('matches at the start or end of the branch name', () => {
    expect(branchMatchesTicket('841-fix', '841')).toBe(true);
    expect(branchMatchesTicket('fix-841', '841')).toBe(true);
  });
});

describe('parseWorktreePorcelain', () => {
  it('parses one worktree entry', () => {
    const output = ['worktree /repo', 'HEAD abc1234abcdef', 'branch refs/heads/main', ''].join('\n');
    expect(parseWorktreePorcelain(output)).toEqual([{ path: '/repo', branch: 'main', commit: 'abc1234' }]);
  });

  it('parses multiple worktree entries, including a detached HEAD with no branch line', () => {
    const output = [
      'worktree /repo',
      'HEAD abc1234abcdef',
      'branch refs/heads/main',
      '',
      'worktree /repo-worktrees/fix-841',
      'HEAD def5678abcdef',
      'branch refs/heads/fix/841-foo',
      '',
      'worktree /repo-worktrees/detached',
      'HEAD 9999999abcdef',
      'detached',
      '',
    ].join('\n');
    const parsed = parseWorktreePorcelain(output);
    expect(parsed).toHaveLength(3);
    expect(parsed[1]).toEqual({ path: '/repo-worktrees/fix-841', branch: 'fix/841-foo', commit: 'def5678' });
    expect(parsed[2].branch).toBe('');
  });
});

describe('parseBranchList', () => {
  it('parses name/sha pairs', () => {
    const output = 'main\tabc1234abcdef\nfix/841-foo\tdef5678abcdef\n';
    const map = parseBranchList(output);
    expect(map.get('main')).toBe('abc1234');
    expect(map.get('fix/841-foo')).toBe('def5678');
  });

  it('ignores blank lines', () => {
    const output = 'main\tabc1234abcdef\n\n';
    expect(parseBranchList(output).size).toBe(1);
  });
});

describe('recommendedCommands', () => {
  const base: BranchFinding = {
    repoPath: '/repo',
    branch: 'fix/841-foo',
    commit: 'abc1234',
    worktreePath: null,
    isCurrentlyCheckedOut: false,
    prState: 'none',
    prNumber: null,
    prUrl: null,
  };

  it('recommends a safe delete for a merged branch', () => {
    const commands = recommendedCommands({ ...base, prState: 'merged', prNumber: 155 });
    expect(commands).toEqual(['git -C /repo branch -d fix/841-foo']);
  });

  it('recommends trying -d then flags -D as needing confirmation for an unmerged branch', () => {
    const commands = recommendedCommands({ ...base, prState: 'none' });
    expect(commands[0]).toContain('branch -d fix/841-foo');
    expect(commands[1]).toContain('branch -D fix/841-foo');
    expect(commands[1]).toContain('confirm');
  });

  it('includes a worktree remove command when the branch lives in a dedicated worktree', () => {
    const commands = recommendedCommands({ ...base, worktreePath: '/repo-worktrees/fix-841' });
    expect(commands[0]).toBe('git -C /repo worktree remove /repo-worktrees/fix-841');
  });

  it('never recommends a delete command for the currently checked out branch', () => {
    const commands = recommendedCommands({ ...base, isCurrentlyCheckedOut: true });
    expect(commands).toHaveLength(1);
    expect(commands[0]).toContain('switch away first');
    expect(commands[0]).not.toContain('branch -d');
    expect(commands[0]).not.toContain('branch -D');
  });
});

describe('formatReport', () => {
  it('reports no findings plainly', () => {
    expect(formatReport([])).toBe('No matching local branches or worktrees found.');
  });

  it('includes the branch, status label, and recommended commands', () => {
    const finding: BranchFinding = {
      repoPath: '/repo',
      branch: 'fix/841-foo',
      commit: 'abc1234',
      worktreePath: null,
      isCurrentlyCheckedOut: false,
      prState: 'merged',
      prNumber: 155,
      prUrl: 'https://github.com/org/repo/pull/155',
    };
    const report = formatReport([finding]);
    expect(report).toContain('fix/841-foo');
    expect(report).toContain('merged via PR (#155)');
    expect(report).toContain('https://github.com/org/repo/pull/155');
    expect(report).toContain('branch -d fix/841-foo');
  });
});

// ---------------------------------------------------------------------------
// End-to-end discovery test against a real temp git repo (no GitHub remote,
// so PR classification is exercised in its graceful "unavailable" path).
// ---------------------------------------------------------------------------

// A test process invoked from a git hook (e.g. this repo's own pre-push) inherits GIT_DIR /
// GIT_WORK_TREE / GIT_INDEX_FILE etc. in its environment. Those env vars override `cwd`/`-C`
// entirely, so a child `git` call below would silently operate on the real repo instead of the
// isolated tmpdir fixture. Stripping every GIT_* var keeps these fixtures genuinely isolated.
const CLEAN_GIT_ENV = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')));

describe('findBranchesInRepo (integration, real git, no GitHub remote)', () => {
  let repoPath: string;

  beforeEach(() => {
    repoPath = mkdtempSync(join(tmpdir(), 'reap-ticket-branches-fixture-'));
    const git = (...args: string[]) =>
      execFileSync('git', args, { cwd: repoPath, encoding: 'utf8', env: CLEAN_GIT_ENV });
    git('init', '--quiet', '--initial-branch=main');
    git('config', 'user.email', 'test@example.com');
    git('config', 'user.name', 'Test');
    git('commit', '--allow-empty', '-m', 'initial');
    git('branch', 'fix/841-hero-background');
    git('branch', 'fix/8410-unrelated');
  });

  afterEach(() => {
    rmSync(repoPath, { recursive: true, force: true });
  });

  it('finds a plain local branch matching the ticket number, and reports PR state as unavailable with no GitHub remote', () => {
    const findings = findBranchesInRepo(repoPath, (name: string) => branchMatchesTicket(name, '841'));
    expect(findings).toHaveLength(1);
    expect(findings[0].branch).toBe('fix/841-hero-background');
    expect(findings[0].worktreePath).toBeNull();
    expect(findings[0].isCurrentlyCheckedOut).toBe(false);
    expect(findings[0].prState).toBe('unavailable');
  });

  it('flags the currently checked out branch and excludes it from delete recommendations', () => {
    execFileSync('git', ['-C', repoPath, 'checkout', 'fix/841-hero-background'], {
      encoding: 'utf8',
      env: CLEAN_GIT_ENV,
    });

    const findings = findBranchesInRepo(repoPath, (name: string) => branchMatchesTicket(name, '841'));
    expect(findings[0].isCurrentlyCheckedOut).toBe(true);
    expect(recommendedCommands(findings[0])[0]).toContain('switch away first');
  });
});

// ---------------------------------------------------------------------------
// Regression: this module must not inherit ambient GIT_* env vars (e.g. from
// the real git hook that invokes it) into its own `-C <repoPath>` git calls,
// or it silently inspects the wrong repository. See the module's own
// CLEAN_GIT_ENV comment for the full scenario this guards against.
// ---------------------------------------------------------------------------

describe('findBranchesInRepo (regression: does not leak ambient GIT_* env into its own git calls)', () => {
  let repoPath: string;
  const originalGitDir = process.env.GIT_DIR;
  const originalGitWorkTree = process.env.GIT_WORK_TREE;

  beforeEach(() => {
    repoPath = mkdtempSync(join(tmpdir(), 'reap-ticket-branches-fixture-'));
    const git = (...args: string[]) =>
      execFileSync('git', args, { cwd: repoPath, encoding: 'utf8', env: CLEAN_GIT_ENV });
    git('init', '--quiet', '--initial-branch=main');
    git('config', 'user.email', 'test@example.com');
    git('config', 'user.name', 'Test');
    git('commit', '--allow-empty', '-m', 'initial');
    git('branch', 'fix/841-hero-background');
  });

  afterEach(() => {
    rmSync(repoPath, { recursive: true, force: true });
    if (originalGitDir === undefined) delete process.env.GIT_DIR;
    else process.env.GIT_DIR = originalGitDir;
    if (originalGitWorkTree === undefined) delete process.env.GIT_WORK_TREE;
    else process.env.GIT_WORK_TREE = originalGitWorkTree;
    vi.resetModules();
  });

  it('still finds the fixture repo\'s own branch when GIT_DIR/GIT_WORK_TREE point elsewhere in the ambient environment', async () => {
    // Poison the environment the way a real git hook invocation would, THEN
    // (re-)import the module — CLEAN_GIT_ENV is captured once at module load,
    // matching how a real short-lived CLI process actually runs.
    process.env.GIT_DIR = '/nonexistent/poisoned-git-dir';
    process.env.GIT_WORK_TREE = '/nonexistent/poisoned-work-tree';
    vi.resetModules();
    const { findBranchesInRepo: freshFindBranchesInRepo, branchMatchesTicket: freshBranchMatchesTicket } =
      await import('./reap-ticket-branches');

    const findings = freshFindBranchesInRepo(repoPath, (name: string) => freshBranchMatchesTicket(name, '841'));

    expect(findings).toHaveLength(1);
    expect(findings[0].branch).toBe('fix/841-hero-background');
  });
});
