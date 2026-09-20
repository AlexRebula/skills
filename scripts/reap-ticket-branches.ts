#!/usr/bin/env node
/**
 * reap-ticket-branches.ts
 *
 * Finds local git branches and worktrees left behind by a closed or
 * abandoned ticket, and reports what is safe to remove. Read-only: this
 * script never deletes anything itself. It prints findings plus the exact
 * git commands to run, so the actual deletion stays a deliberate, visible
 * action taken by whoever (or whichever tool) is driving it.
 *
 * Two modes:
 *   --ticket <ref>   Scan every branch in the given repo(s) for one whose
 *                    name contains this ticket number as a delimited
 *                    segment (not adjacent to another digit), e.g. "841"
 *                    matches "fix/841-foo" but not "fix/8410-foo" or
 *                    "fix/1841-foo". Accepts a bare number or a prefixed
 *                    one ("#841", "tracker#841"): only the trailing digits
 *                    are used.
 *   --branch <name>  Skip matching; report on this exact branch name only.
 *                    Used by tools (e.g. a PR-merge cleanup routine) that
 *                    already know the branch and don't need ticket lookup.
 *
 * For each matching branch, classifies it via `gh pr list --head <branch>
 * --state all` (merged / open, never merged / no PR found) so the report
 * can recommend a safe `git branch -d` for the merged case and flag the
 * unmerged case as needing an explicit force delete. Classification is
 * skipped gracefully (not an error) if `gh` isn't installed, isn't
 * authenticated, or the repo has no GitHub remote: the git-level findings
 * are still reported.
 *
 * Usage:
 *   npx tsx scripts/reap-ticket-branches.ts --ticket 841 --repo <path> [--repo <path> ...]
 *   npx tsx scripts/reap-ticket-branches.ts --branch fix/841-foo --repo <path>
 *
 * Exit codes:
 *   0: ran successfully (regardless of whether anything was found)
 *   1: argument error, or a given --repo path is not a git repository
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WorktreeEntry {
  /** Absolute path of the worktree. */
  path: string;
  /** Branch checked out there, without the "refs/heads/" prefix. Empty for a detached HEAD. */
  branch: string;
  /** Short commit sha. */
  commit: string;
}

export type PrState = 'merged' | 'open' | 'closed-unmerged' | 'none' | 'unavailable';

export interface BranchFinding {
  repoPath: string;
  branch: string;
  commit: string;
  /** The worktree this branch is checked out in, if any (not the main working copy). */
  worktreePath: string | null;
  /** True if this branch is the one currently checked out in its own repo/worktree. */
  isCurrentlyCheckedOut: boolean;
  prState: PrState;
  prNumber: number | null;
  prUrl: string | null;
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

export interface CliArgs {
  ticket: string | null;
  branch: string | null;
  repos: string[];
}

export function parseArgs(argv: string[]): CliArgs {
  const repos: string[] = [];
  let ticket: string | null = null;
  let branch: string | null = null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--ticket' && argv[i + 1]) {
      ticket = argv[++i];
    } else if (arg === '--branch' && argv[i + 1]) {
      branch = argv[++i];
    } else if (arg === '--repo' && argv[i + 1]) {
      repos.push(argv[++i]);
    }
  }

  if (!ticket && !branch) {
    throw new Error('Pass either --ticket <ref> or --branch <name>.');
  }
  if (ticket && branch) {
    throw new Error('Pass only one of --ticket or --branch, not both.');
  }
  if (repos.length === 0) {
    throw new Error('Pass at least one --repo <path>.');
  }

  return { ticket, branch, repos };
}

// ---------------------------------------------------------------------------
// Ticket matching
// ---------------------------------------------------------------------------

/** Extracts the trailing digits from a ticket reference like "841", "#841", or "tracker#841". */
export function extractTicketNumber(ref: string): string {
  const match = ref.match(/(\d+)\s*$/);
  if (!match) {
    throw new Error(`Could not find a ticket number in "${ref}".`);
  }
  return match[1];
}

/**
 * True if `branchName` contains `ticketNumber` as a delimited segment: the
 * number must not be immediately preceded or followed by another digit.
 * Matches "fix/841-foo" for ticket "841"; does not match "fix/8410-foo" or
 * "fix/1841-foo".
 */
export function branchMatchesTicket(branchName: string, ticketNumber: string): boolean {
  const escaped = ticketNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?<!\\d)${escaped}(?!\\d)`);
  return pattern.test(branchName);
}

// ---------------------------------------------------------------------------
// Git discovery (I/O)
// ---------------------------------------------------------------------------

// Invoked from this repo's own pre-push hook (among other contexts), which sets GIT_DIR /
// GIT_WORK_TREE / GIT_INDEX_FILE etc. in the environment for its own git process. Those vars
// override `-C <repoPath>` for any child git command that inherits them, silently pointing this
// script at the wrong repository. Stripping every GIT_* var keeps `-C` authoritative regardless
// of the calling context. (Mirrors this file's own test's CLEAN_GIT_ENV — that one isolates the
// test's tmpdir fixture; this is the same fix applied to the production code path it exercises.)
const CLEAN_GIT_ENV = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')));

function runGit(repoPath: string, args: string[]): string {
  return execFileSync('git', ['-C', repoPath, ...args], { encoding: 'utf8', env: CLEAN_GIT_ENV }).trim();
}

function tryRunGit(repoPath: string, args: string[]): string | null {
  try {
    return runGit(repoPath, args);
  } catch {
    return null;
  }
}

/** Parses `git worktree list --porcelain` output into structured entries. */
export function parseWorktreePorcelain(output: string): WorktreeEntry[] {
  const entries: WorktreeEntry[] = [];
  let current: Partial<WorktreeEntry> = {};

  for (const line of output.split('\n')) {
    if (line.startsWith('worktree ')) {
      if (current.path) entries.push(current as WorktreeEntry);
      current = { path: line.slice('worktree '.length), branch: '', commit: '' };
    } else if (line.startsWith('HEAD ')) {
      current.commit = line.slice('HEAD '.length, 'HEAD '.length + 7);
    } else if (line.startsWith('branch ')) {
      current.branch = line.slice('branch '.length).replace(/^refs\/heads\//, '');
    }
  }
  if (current.path) entries.push(current as WorktreeEntry);

  return entries;
}

/** Parses `git branch --list --format=...` output (one "name<TAB>sha" per line) into a map. */
export function parseBranchList(output: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const line of output.split('\n')) {
    if (!line.trim()) continue;
    const [name, sha] = line.split('\t');
    if (name && sha) map.set(name, sha.slice(0, 7));
  }
  return map;
}

function resolveGithubSlug(repoPath: string): string | null {
  const url = tryRunGit(repoPath, ['remote', 'get-url', 'origin']);
  if (!url) return null;
  const match = url.match(/github\.com[:/]([^/]+\/[^/.]+?)(?:\.git)?$/);
  return match ? match[1] : null;
}

function classifyViaGh(repoPath: string, branch: string): Pick<BranchFinding, 'prState' | 'prNumber' | 'prUrl'> {
  const slug = resolveGithubSlug(repoPath);
  if (!slug) return { prState: 'unavailable', prNumber: null, prUrl: null };

  try {
    const raw = execFileSync(
      'gh',
      ['pr', 'list', '--repo', slug, '--head', branch, '--state', 'all', '--json', 'number,state,url'],
      { encoding: 'utf8' }
    );
    const prs = JSON.parse(raw) as Array<{ number: number; state: string; url: string }>;
    if (prs.length === 0) return { prState: 'none', prNumber: null, prUrl: null };

    const merged = prs.find((pr) => pr.state === 'MERGED');
    if (merged) return { prState: 'merged', prNumber: merged.number, prUrl: merged.url };

    const open = prs.find((pr) => pr.state === 'OPEN');
    if (open) return { prState: 'open', prNumber: open.number, prUrl: open.url };

    const closed = prs[0];
    return { prState: 'closed-unmerged', prNumber: closed.number, prUrl: closed.url };
  } catch {
    return { prState: 'unavailable', prNumber: null, prUrl: null };
  }
}

/** Scans one repo for branches matching the given predicate, across every worktree and every plain local branch. */
export function findBranchesInRepo(repoPath: string, matches: (branchName: string) => boolean): BranchFinding[] {
  if (!existsSync(repoPath)) {
    throw new Error(`Repo path does not exist: ${repoPath}`);
  }
  const topLevel = tryRunGit(repoPath, ['rev-parse', '--show-toplevel']);
  if (!topLevel) {
    throw new Error(`Not a git repository: ${repoPath}`);
  }

  const worktreeOutput = runGit(repoPath, ['worktree', 'list', '--porcelain']);
  const worktrees = parseWorktreePorcelain(worktreeOutput);
  const worktreeByBranch = new Map(worktrees.filter((w) => w.branch).map((w) => [w.branch, w]));

  const branchListOutput = runGit(repoPath, ['branch', '--list', '--format=%(refname:short)\t%(objectname)']);
  const allBranches = parseBranchList(branchListOutput);

  const currentBranch = tryRunGit(repoPath, ['rev-parse', '--abbrev-ref', 'HEAD']);

  const findings: BranchFinding[] = [];
  for (const [branchName, commit] of allBranches) {
    if (!matches(branchName)) continue;

    const worktree = worktreeByBranch.get(branchName);
    const isMainWorktreeBranch = branchName === currentBranch && !worktree;
    const classification = classifyViaGh(repoPath, branchName);

    findings.push({
      repoPath: topLevel,
      branch: branchName,
      commit,
      worktreePath: worktree && worktree.path !== topLevel ? worktree.path : null,
      isCurrentlyCheckedOut: isMainWorktreeBranch || (!!worktree && worktree.branch === currentBranch && worktree.path === topLevel),
      ...classification,
    });
  }

  return findings;
}

// ---------------------------------------------------------------------------
// Report formatting
// ---------------------------------------------------------------------------

const PR_STATE_LABEL: Record<PrState, string> = {
  merged: 'merged via PR',
  open: 'open PR, never merged',
  'closed-unmerged': 'closed PR, never merged',
  none: 'no PR found',
  unavailable: 'PR state unavailable (no gh / no auth / no GitHub remote)',
};

/** Builds the recommended git command(s) for one finding. Never executed by this script. */
export function recommendedCommands(finding: BranchFinding): string[] {
  if (finding.isCurrentlyCheckedOut) {
    return [`# currently checked out at ${finding.worktreePath ?? finding.repoPath} -- switch away first`];
  }

  const commands: string[] = [];
  if (finding.worktreePath) {
    commands.push(`git -C ${finding.repoPath} worktree remove ${finding.worktreePath}`);
  }

  if (finding.prState === 'merged') {
    commands.push(`git -C ${finding.repoPath} branch -d ${finding.branch}`);
  } else {
    commands.push(
      `git -C ${finding.repoPath} branch -d ${finding.branch}  # will likely refuse (unmerged)`,
      `git -C ${finding.repoPath} branch -D ${finding.branch}  # force delete -- confirm this branch is really abandoned first`
    );
  }

  return commands;
}

export function formatReport(findings: BranchFinding[]): string {
  if (findings.length === 0) {
    return 'No matching local branches or worktrees found.';
  }

  const lines: string[] = [];
  for (const finding of findings) {
    lines.push(`- ${finding.branch} (${finding.commit}) in ${finding.repoPath}`);
    if (finding.worktreePath) lines.push(`    worktree: ${finding.worktreePath}`);
    lines.push(`    status: ${PR_STATE_LABEL[finding.prState]}${finding.prNumber ? ` (#${finding.prNumber})` : ''}`);
    if (finding.prUrl) lines.push(`    ${finding.prUrl}`);
    for (const cmd of recommendedCommands(finding)) {
      lines.push(`    ${cmd}`);
    }
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  let args: CliArgs;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error((error as Error).message);
    console.error('Usage: reap-ticket-branches.ts (--ticket <ref> | --branch <name>) --repo <path> [--repo <path> ...]');
    process.exit(1);
  }

  const matches = args.ticket
    ? (branchName: string) => branchMatchesTicket(branchName, extractTicketNumber(args.ticket as string))
    : (branchName: string) => branchName === args.branch;

  const allFindings: BranchFinding[] = [];
  for (const repoPath of args.repos) {
    try {
      allFindings.push(...findBranchesInRepo(repoPath, matches));
    } catch (error) {
      console.error((error as Error).message);
      process.exit(1);
    }
  }

  console.log(formatReport(allFindings));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
