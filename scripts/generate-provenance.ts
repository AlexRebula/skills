#!/usr/bin/env node
/**
 * generate-provenance.ts
 *
 * For every skill folder, classifies it against the `upstream` remote
 * (mattpocock/skills) so the docs site can show, at the top of each skill's
 * doc page, whether it's an untouched upstream skill, a modified one, or an
 * AlexRebula-only addition, and credit/link the original where one exists.
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
import { TARGET_CATEGORIES } from './check-docs-completeness.ts';
import type {
  DiffStatEntry,
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

function isUnchangedVsUpstream(path: string, upstreamSha: string): boolean {
  const diff = execFileSync('git', ['diff', '--stat', upstreamSha, 'HEAD', '--', path], {
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

function computeDiffStat(path: string, upstreamSha: string): DiffStatEntry[] {
  const numstat = execFileSync('git', ['diff', '--numstat', upstreamSha, 'HEAD', '--', path], {
    cwd: REPO_ROOT,
    encoding: 'utf-8',
  });
  return parseNumstat(numstat, path);
}

/** Pure parsing: level-2 ("## ") headings only, in document order. Never matches "### ...". */
export function extractHeadings(markdown: string): string[] {
  return [...markdown.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

const INTRO_LABEL = 'the introduction';

interface Section {
  heading: string;
  body: string;
}

/** Pure parsing: splits into (heading, body-until-next-heading) pairs, plus a leading "the introduction" pseudo-section for anything before the first "## ". */
export function extractSections(markdown: string): Section[] {
  const sections: Section[] = [{ heading: INTRO_LABEL, body: '' }];
  for (const line of markdown.split('\n')) {
    const match = /^## (.+)$/.exec(line);
    if (match) {
      sections.push({ heading: match[1].trim(), body: '' });
    } else {
      sections[sections.length - 1].body += `${line}\n`;
    }
  }
  return sections;
}

function formatList(items: string[]): string {
  const quoted = items.map((s) => (s === INTRO_LABEL ? s : `'${s}'`));
  if (quoted.length === 1) return quoted[0];
  if (quoted.length === 2) return `${quoted[0]} and ${quoted[1]}`;
  return `${quoted.slice(0, -1).join(', ')}, and ${quoted[quoted.length - 1]}`;
}

function capitalize(sentence: string): string {
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
}

/**
 * Pure, mechanical, always-honest summary of what changed in a markdown
 * file: which top-level sections were added, removed, or had their wording
 * changed while keeping the same heading (including "the introduction", the
 * text before the first heading). Never AI-generated: this is a structural
 * diff, not an interpretation of intent. Returns null only when nothing at
 * the section level actually differs (e.g. a pure whitespace/EOF change).
 */
export function summarizeChange(oldMarkdown: string, newMarkdown: string): string | null {
  const oldSections = extractSections(oldMarkdown);
  const newSections = extractSections(newMarkdown);
  const oldHeadings = oldSections.map((s) => s.heading);
  const newHeadings = newSections.map((s) => s.heading);

  const added = newHeadings.filter((h) => h !== INTRO_LABEL && !oldHeadings.includes(h));
  const removed = oldHeadings.filter((h) => h !== INTRO_LABEL && !newHeadings.includes(h));

  const changedWording = newSections
    .filter((s) => !added.includes(s.heading))
    .filter((s) => {
      const oldSection = oldSections.find((o) => o.heading === s.heading);
      return !!oldSection && oldSection.body.trim() !== s.body.trim();
    })
    .map((s) => s.heading);

  const parts: string[] = [];
  if (added.length > 0) parts.push(`adds ${formatList(added)}`);
  if (removed.length > 0) parts.push(`removes ${formatList(removed)}`);
  if (changedWording.length > 0) parts.push(`changes wording in ${formatList(changedWording)}`);
  if (parts.length === 0) return null;
  return capitalize(parts.join('; '));
}

function readFileAtRef(ref: string, path: string): string | null {
  try {
    return execFileSync('git', ['show', `${ref}:${path}`], { cwd: REPO_ROOT, encoding: 'utf-8' });
  } catch {
    return null; // file doesn't exist at that ref (added/removed/renamed)
  }
}

/**
 * Always produces a human-readable sentence for a modified skill, in order
 * of preference: (1) the SKILL.md section-level diff; (2) which non-SKILL.md
 * files changed, if SKILL.md itself didn't; (3) raw +/- line counts for
 * SKILL.md, if section parsing somehow found no difference (e.g. a pure
 * whitespace change). Only returns undefined if there is truly nothing in
 * diffStat to describe.
 */
function computeChangeSummary(path: string, upstreamSha: string, diffStat: DiffStatEntry[]): string | undefined {
  const skillMdPath = `${path}/SKILL.md`;
  const oldContent = readFileAtRef(upstreamSha, skillMdPath);
  const newContent = readFileAtRef('HEAD', skillMdPath);

  if (oldContent !== null && newContent !== null) {
    const summary = summarizeChange(oldContent, newContent);
    if (summary) return summary;
  }

  const otherFiles = diffStat.map((d) => d.file).filter((f) => f !== 'SKILL.md');
  if (otherFiles.length > 0) return capitalize(`changes ${formatList(otherFiles)}`);

  const skillMdStat = diffStat.find((d) => d.file === 'SKILL.md');
  if (skillMdStat) {
    return `Changes wording in SKILL.md (+${skillMdStat.added}/-${skillMdStat.removed} lines).`;
  }

  return undefined;
}

function skillFolders(category: string): string[] {
  const dir = join(REPO_ROOT, 'skills', category);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Pure decision logic, kept separate from the git I/O above so it's unit-testable. */
export function deriveStatus(existsUpstream: boolean, unchangedVsUpstream: boolean): ProvenanceStatus {
  if (!existsUpstream) return 'original';
  return unchangedVsUpstream ? 'upstream' : 'modified';
}

export function buildUpstreamUrl(skillPath: string, upstreamSha: string): string {
  return `https://github.com/mattpocock/skills/tree/${upstreamSha}/${skillPath}`;
}

function classify(category: string, name: string, upstreamSha: string): ProvenanceEntry {
  const path = `skills/${category}/${name}`;
  const existsUpstream = pathExistsInUpstream(path, upstreamSha);
  const status = deriveStatus(existsUpstream, existsUpstream && isUnchangedVsUpstream(path, upstreamSha));
  if (status === 'original') return { status };
  const entry: ProvenanceEntry = { status, upstreamSha, upstreamUrl: buildUpstreamUrl(path, upstreamSha) };
  if (status === 'modified') {
    const diffStat = computeDiffStat(path, upstreamSha);
    entry.diffStat = diffStat;
    const summary = computeChangeSummary(path, upstreamSha, diffStat);
    if (summary) entry.changeSummary = summary;
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
