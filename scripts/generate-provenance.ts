#!/usr/bin/env node
/**
 * generate-provenance.ts
 *
 * For every skill folder, classifies it against the `upstream` remote
 * (mattpocock/skills) so the docs site can show, at the top of each skill's
 * doc page, whether it's an untouched upstream skill, a modified one, an
 * AlexRebula-only addition, or one that existed upstream at some point in
 * its history and was later removed there ("inherited"), and credit/link
 * the original where one exists.
 *
 * Always computed fresh at build time (never a committed/stale snapshot):
 * adds+fetches the `upstream` remote if it isn't already configured, then
 * diffs each skill folder's tree against `upstream/main`. Fails loudly
 * (non-zero exit) if the fetch fails, rather than silently shipping wrong
 * or stale badges.
 *
 * Usage:
 *   npx tsx scripts/generate-provenance.ts [--out <path>] [--help]
 *
 * Exit codes:
 *   0: provenance file written
 *   1: could not fetch the upstream remote, or a git command failed
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { diffLines, type Change } from 'diff';
import { TARGET_CATEGORIES } from './check-docs-completeness.ts';
import type {
  DiffRow,
  DiffStatEntry,
  FileDiff,
  ProvenanceEntry,
  ProvenanceMap,
  ProvenanceStatus,
} from '../site/src/data/provenance.types.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const UPSTREAM_URL = 'https://github.com/mattpocock/skills.git';
const UPSTREAM_BRANCH = 'main';

const USAGE = `Usage: tsx scripts/generate-provenance.ts [--out <path>] [--help]

Classifies every skill folder against the upstream remote (${UPSTREAM_URL})
and writes the result as JSON: for each "<category>/<name>" key, whether it's
untouched upstream, modified from upstream, or has no upstream counterpart.

  --out <path>  Where to write the JSON (default: site/src/data/provenance.json)
  --help        Show this message

Exit codes:
  0  provenance file written
  1  could not fetch the upstream remote, or a git command failed`;

function git(args: string[]): string {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf-8' }).trim();
}

function ensureUpstreamRemote(): void {
  const remotes = git(['remote']).split('\n');
  if (!remotes.includes('upstream')) {
    git(['remote', 'add', 'upstream', UPSTREAM_URL]);
  }
  try {
    execFileSync('git', ['fetch', 'upstream', UPSTREAM_BRANCH], {
      cwd: REPO_ROOT,
      stdio: 'pipe',
    });
  } catch (e) {
    throw new Error(
      `Could not fetch upstream (${UPSTREAM_URL}#${UPSTREAM_BRANCH}), refusing to write ` +
        `provenance data rather than ship stale/wrong badges. Underlying error: ${(e as Error).message}`,
    );
  }
}

function pathExistsInUpstream(path: string, upstreamSha: string): boolean {
  try {
    execFileSync('git', ['cat-file', '-e', `${upstreamSha}:${path}`], {
      cwd: REPO_ROOT,
      stdio: 'pipe',
    });
    return true;
  } catch {
    return false;
  }
}

export interface HistoricalOccurrence {
  sha: string;
  path: string;
}

/**
 * Pure parsing of `git log --pretty=format:%H --name-only` output into
 * (commit, path) pairs, most recent first. A commit with no matching path
 * (shouldn't happen given the pathspec that produces this output, but kept
 * defensive) contributes no pairs.
 */
export function parseHistoryLog(output: string): HistoricalOccurrence[] {
  const occurrences: HistoricalOccurrence[] = [];
  let currentSha: string | null = null;
  for (const line of output.split('\n')) {
    if (line.trim() === '') continue;
    if (/^[0-9a-f]{40}$/.test(line)) {
      currentSha = line;
    } else if (currentSha) {
      occurrences.push({ sha: currentSha, path: line });
    }
  }
  return occurrences;
}

/**
 * IO: every commit reachable from upstreamSha that ever touched a
 * SKILL.md at this name under any category (a category move upstream
 * before deletion still matches), most recent first.
 */
function historyOccurrences(name: string, upstreamSha: string): HistoricalOccurrence[] {
  const log = execFileSync(
    'git',
    ['log', upstreamSha, '--name-only', '--pretty=format:%H', '--', `skills/*/${name}/SKILL.md`],
    { cwd: REPO_ROOT, encoding: 'utf-8' },
  );
  return parseHistoryLog(log);
}

/**
 * The most recent commit where a currently-nonexistent-upstream skill last
 * actually existed there. `historyOccurrences` also matches the commit that
 * *removed* the file (the pathspec still sees it in that diff), so this
 * walks newest-first and returns the first occurrence that actually exists
 * in that commit's tree, skipping the deletion commit itself. Returns null
 * if the name never appeared anywhere in upstream's history.
 */
function findLastUpstreamOccurrence(name: string, upstreamSha: string): HistoricalOccurrence | null {
  for (const occurrence of historyOccurrences(name, upstreamSha)) {
    if (pathExistsInUpstream(occurrence.path, occurrence.sha)) return occurrence;
  }
  return null;
}

/**
 * Pure: which of a name's ever-known upstream paths (from history, any
 * category) currently exists upstream, per the given existence check.
 * Separated from the git I/O that actually answers "does this path exist"
 * so the decision itself, including the case a local bucket move creates
 * (the local category doesn't match any upstream one, but a *different*
 * historical candidate does), is testable without shelling out to git.
 */
export function pickCurrentUpstreamPath(candidatePaths: string[], existsNow: (path: string) => boolean): string | null {
  for (const path of candidatePaths) {
    if (existsNow(path)) return path;
  }
  return null;
}

/**
 * IO: the skill's current upstream path, by name, across any category the
 * skill has ever been filed under upstream, not just whatever local category
 * happens to be passed at the call site. This is what makes a purely local
 * bucket reorganization (this fork moving a skill to a different local
 * folder than upstream's) distinguishable from Matt actually deleting it:
 * the two look identical if "does this exist upstream" only ever checks the
 * exact local path.
 */
function findCurrentUpstreamPath(name: string, upstreamSha: string): string | null {
  const candidates = [...new Set(historyOccurrences(name, upstreamSha).map((o) => toSkillFolderPath(o.path)))];
  return pickCurrentUpstreamPath(candidates, (path) => pathExistsInUpstream(path, upstreamSha));
}

function isUnchangedVsUpstream(upstreamPath: string, localPath: string, upstreamSha: string): boolean {
  const diff = execFileSync('git', ['diff', '--stat', `${upstreamSha}:${upstreamPath}`, `HEAD:${localPath}`], {
    cwd: REPO_ROOT,
    encoding: 'utf-8',
  }).trim();
  return diff === '';
}

/** Pure parsing, kept separate from the git I/O so it's unit-testable. */
export function parseNumstat(numstatOutput: string, skillPath: string): DiffStatEntry[] {
  const prefix = `${skillPath}/`;
  return numstatOutput
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const [added, removed, file] = line.split('\t');
      return {
        file: file.startsWith(prefix) ? file.slice(prefix.length) : file,
        // Binary files report "-" instead of a number; treat as 0 rather than NaN.
        added: added === '-' ? 0 : Number(added),
        removed: removed === '-' ? 0 : Number(removed),
      };
    });
}

// Diffing two arbitrary tree paths (git diff <sha>:<pathA> <sha>:<pathB>) rather
// than one path across two revisions (git diff <sha1> <sha2> -- <path>) is what
// makes this work when the local and upstream categories differ. As a side
// effect, paths in the output are already bare (relative to each tree's own
// root, e.g. "SKILL.md"), never prefixed with the skill folder: parseNumstat's
// prefix-stripping is a no-op here, not wrong, just nothing left to strip.
function computeDiffStat(upstreamPath: string, localPath: string, upstreamSha: string): DiffStatEntry[] {
  const numstat = execFileSync(
    'git',
    ['diff', '--numstat', `${upstreamSha}:${upstreamPath}`, `HEAD:${localPath}`],
    { cwd: REPO_ROOT, encoding: 'utf-8' },
  );
  return parseNumstat(numstat, localPath);
}

/** A diffLines() chunk, reduced to its own lines with a trailing-newline-produced empty element dropped. */
interface LineChunk {
  type: 'context' | 'add' | 'remove';
  lines: string[];
}

function lineChunkType(change: Change): LineChunk['type'] {
  if (change.added) return 'add';
  if (change.removed) return 'remove';
  return 'context';
}

function toLineChunks(oldContent: string, newContent: string): LineChunk[] {
  return diffLines(oldContent, newContent).map((change) => {
    const lines = change.value.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    return { type: lineChunkType(change), lines };
  });
}

/** Tracks the next old/new line number to assign as rows are built, mutated in place by each `*Rows` helper below. */
interface LineCursor {
  oldLineNumber: number;
  newLineNumber: number;
}

function contextRows(lines: string[], cursor: LineCursor): DiffRow[] {
  return lines.map((content) => ({
    type: 'context',
    oldLineNumber: cursor.oldLineNumber++,
    oldContent: content,
    newLineNumber: cursor.newLineNumber++,
    newContent: content,
  }));
}

function addRows(lines: string[], cursor: LineCursor): DiffRow[] {
  return lines.map((content) => ({
    type: 'add',
    oldLineNumber: null,
    oldContent: null,
    newLineNumber: cursor.newLineNumber++,
    newContent: content,
  }));
}

function removeRows(lines: string[], cursor: LineCursor): DiffRow[] {
  return lines.map((content) => ({
    type: 'remove',
    oldLineNumber: cursor.oldLineNumber++,
    oldContent: content,
    newLineNumber: null,
    newContent: null,
  }));
}

/**
 * Pairs a "remove" chunk against an immediately-following "add" chunk (the
 * common wording-change shape) line-by-line into "change" rows, rather than
 * stacked remove-then-add rows, matching how a real diff reads: the same
 * position, before and after. Any length mismatch spills over as plain
 * remove/add rows for the unmatched tail. Returns how many chunks were
 * consumed (2 when paired, 1 when there was nothing to pair with).
 */
function pairRemoveWithFollowingAdd(
  removeChunk: LineChunk,
  next: LineChunk | undefined,
  cursor: LineCursor,
): { rows: DiffRow[]; consumed: number } {
  if (next?.type !== 'add') {
    return { rows: removeRows(removeChunk.lines, cursor), consumed: 1 };
  }

  const pairCount = Math.min(removeChunk.lines.length, next.lines.length);
  const rows: DiffRow[] = [];
  for (let j = 0; j < pairCount; j++) {
    rows.push({
      type: 'change',
      oldLineNumber: cursor.oldLineNumber++,
      oldContent: removeChunk.lines[j],
      newLineNumber: cursor.newLineNumber++,
      newContent: next.lines[j],
    });
  }
  rows.push(...removeRows(removeChunk.lines.slice(pairCount), cursor));
  rows.push(...addRows(next.lines.slice(pairCount), cursor));
  return { rows, consumed: 2 };
}

/** Pure: a side-by-side line diff between two full file contents. */
export function buildLineDiff(oldContent: string, newContent: string): DiffRow[] {
  const chunks = toLineChunks(oldContent, newContent);
  const cursor: LineCursor = { oldLineNumber: 1, newLineNumber: 1 };
  const rows: DiffRow[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk.type === 'context') {
      rows.push(...contextRows(chunk.lines, cursor));
    } else if (chunk.type === 'add') {
      // Only reached for an "add" not already consumed as the second half of a pairing below.
      rows.push(...addRows(chunk.lines, cursor));
    } else {
      const paired = pairRemoveWithFollowingAdd(chunk, chunks[i + 1], cursor);
      rows.push(...paired.rows);
      i += paired.consumed - 1;
    }
  }

  return rows;
}

function computeFileDiffs(
  upstreamPath: string,
  localPath: string,
  upstreamSha: string,
  diffStat: DiffStatEntry[],
): FileDiff[] {
  return diffStat
    .filter(
      // added === removed === 0 only happens for a binary file (parseNumstat normalizes
      // git's "-" marker to 0 for both): nothing line-diffable there, and there's no
      // other way to tell a binary file apart from diffStat alone.
      ({ added, removed }) => added > 0 || removed > 0,
    )
    .map(({ file }): FileDiff => {
      // A file added or deleted outright (not modified in place) has no content on one
      // side; treat that side as empty so it diffs as wholly added/removed, the same as
      // any other add/remove, rather than being silently dropped.
      const oldContent = readFileAtRef(upstreamSha, `${upstreamPath}/${file}`) ?? '';
      const newContent = readFileAtRef('HEAD', `${localPath}/${file}`) ?? '';
      return { file, rows: buildLineDiff(oldContent, newContent) };
    });
}

function readFileAtRef(ref: string, path: string): string | null {
  try {
    return execFileSync('git', ['show', `${ref}:${path}`], { cwd: REPO_ROOT, encoding: 'utf-8' });
  } catch {
    return null; // file doesn't exist at that ref (added/removed/renamed)
  }
}

function skillFolders(category: string): string[] {
  const dir = join(REPO_ROOT, 'skills', category);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export interface StatusInputs {
  existsUpstream: boolean;
  unchangedVsUpstream: boolean;
  existedUpstreamHistorically: boolean;
}

/** Pure decision logic, kept separate from the git I/O above so it's unit-testable. */
export function deriveStatus({
  existsUpstream,
  unchangedVsUpstream,
  existedUpstreamHistorically,
}: StatusInputs): ProvenanceStatus {
  if (existsUpstream) return unchangedVsUpstream ? 'upstream' : 'modified';
  return existedUpstreamHistorically ? 'inherited' : 'original';
}

export function buildUpstreamUrl(skillPath: string, upstreamSha: string): string {
  return `https://github.com/mattpocock/skills/tree/${upstreamSha}/${skillPath}`;
}

/** Pure: a historical occurrence's path always names the SKILL.md file; the tree URL wants the containing skill folder. */
export function toSkillFolderPath(skillMdPath: string): string {
  return skillMdPath.replace(/\/SKILL\.md$/, '');
}

function classify(category: string, name: string, upstreamSha: string): ProvenanceEntry {
  const localPath = `skills/${category}/${name}`;
  // Found by name across any category, not the exact localPath: a skill filed
  // under a different local bucket than upstream's must still classify as
  // upstream/modified, not fall through to the historical (deleted) case.
  const upstreamPath = findCurrentUpstreamPath(name, upstreamSha);
  const existsUpstream = upstreamPath !== null;
  const historical = existsUpstream ? null : findLastUpstreamOccurrence(name, upstreamSha);
  const status = deriveStatus({
    existsUpstream,
    unchangedVsUpstream: existsUpstream && isUnchangedVsUpstream(upstreamPath!, localPath, upstreamSha),
    existedUpstreamHistorically: historical !== null,
  });

  if (status === 'original') return { status };

  if (status === 'inherited') {
    // Non-null: `historical` only feeds `deriveStatus` as true when it's set.
    return {
      status,
      upstreamSha: historical!.sha,
      upstreamUrl: buildUpstreamUrl(toSkillFolderPath(historical!.path), historical!.sha),
    };
  }

  // Non-null: `existsUpstream` only feeds `deriveStatus` as true when it's set.
  const entry: ProvenanceEntry = { status, upstreamSha, upstreamUrl: buildUpstreamUrl(upstreamPath!, upstreamSha) };
  if (status === 'modified') {
    entry.diffs = computeFileDiffs(upstreamPath!, localPath, upstreamSha, computeDiffStat(upstreamPath!, localPath, upstreamSha));
  }
  return entry;
}

function parseArgs(argv: string[]): { out: string } {
  let out = join(REPO_ROOT, 'site/src/data/provenance.json');
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--help' || argv[i] === '-h') {
      console.log(USAGE);
      process.exit(0);
    }
    if (argv[i] === '--out' && argv[i + 1]) out = argv[++i];
  }
  return { out };
}

function main(): void {
  const { out } = parseArgs(process.argv.slice(2));

  ensureUpstreamRemote();
  const upstreamSha = git(['rev-parse', `upstream/${UPSTREAM_BRANCH}`]);

  const provenance: ProvenanceMap = {};
  let total = 0;

  for (const category of TARGET_CATEGORIES) {
    for (const name of skillFolders(category)) {
      provenance[`${category}/${name}`] = classify(category, name, upstreamSha);
      total++;
    }
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(provenance, null, 2) + '\n');
  console.log(`Wrote provenance for ${total} skill(s) (upstream@${upstreamSha.slice(0, 7)}) to ${out}`);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    main();
  } catch (e) {
    console.error(`ERROR: ${(e as Error).message}`);
    process.exit(1);
  }
}
