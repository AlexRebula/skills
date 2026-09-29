#!/usr/bin/env node
/**
 * generate-skill-when-to-use.ts
 *
 * Extracts each skill's "when to reach for it" line straight from its own
 * docs page (docs/<category>/<name>.md): the first sentence of the page's
 * "## When to reach for it" section, inline markdown kept as written. A
 * consuming site shows it next to a hovered skill, so it reuses the doc
 * page's own wording rather than a second hand-written copy that would
 * drift from it. Keyed "category/name", the same way as
 * skill-summaries.json (see generate-skill-summaries.ts).
 *
 * Usage:
 *   npx tsx scripts/generate-skill-when-to-use.ts [--skills-root <path>] [--docs-root <path>] [--out <path>]
 *
 * Exit codes:
 *   0: data file written
 *   1: a docs page has a "## When to reach for it" section with nothing
 *      usable in it
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findSection } from './generate-landing-data.ts';
import { listSkillDocs, parseSkillDocsGeneratorArgs } from './skill-docs.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

const HEADING = 'When to reach for it';

/**
 * The first sentence of `paragraph`: up to the first `.`, `!` or `?` that is
 * followed by whitespace, allowing closing quotes, brackets or emphasis
 * markers in between (`"open a promotion PR." Run it` ends after `."`).
 * Full stops inside code spans and URLs never split, since they aren't
 * followed by whitespace.
 */
function firstSentence(paragraph: string): string {
  const match = /^[\s\S]*?[.!?]["'”’)*_]*(?=\s|$)/.exec(paragraph);
  return match ? match[0] : paragraph;
}

/**
 * A prose paragraph, as opposed to a table, a list, or a usage line that is
 * nothing but one code span (e.g. "`/query-issues <owner>/<repo> <label>`"),
 * none of which reads as a sentence about when to use the skill.
 */
function isProse(block: string): boolean {
  return !/^(\||[-*+] |\d+\. )/.test(block) && !/^`[^`]*`$/.test(block);
}

/**
 * The first situation cell of a "| Your situation | Where to go |" table:
 * the row that routes to the skill itself, by the docs' own convention.
 */
function firstSituationCell(block: string): string | undefined {
  const rows = block.split('\n').map((row) => row.trim());
  if (rows.length < 3 || !/^\|\s*your situation\s*\|/i.test(rows[0])) return undefined;
  const cell = rows[2].split('|')[1]?.trim();
  return cell ? cell : undefined;
}

/**
 * The first sentence of the doc's "## When to reach for it" section, with
 * its inline markdown (code spans, links, emphasis) kept as written. The
 * sentence comes from the section's first prose paragraph; a section with
 * no prose at all falls back to its "Your situation" table's first cell.
 *
 * Returns `undefined` when the doc has no such section, so a caller leaves
 * the skill out rather than giving it an empty string. Throws when the
 * section exists but holds neither, so that drift fails the build loudly.
 */
export function extractWhenToUse(docContent: string): string | undefined {
  const section = findSection(docContent, HEADING);
  if (section === undefined) return undefined;

  const blocks = section
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);

  const paragraph = blocks.find(isProse);
  // Docs pages hard-wrap some paragraphs; one line reads as one label.
  if (paragraph !== undefined) return firstSentence(paragraph.replace(/\s+/g, ' '));

  for (const block of blocks) {
    const cell = firstSituationCell(block);
    if (cell !== undefined) return cell;
  }
  throw new Error(`"## ${HEADING}" has no prose paragraph and no "Your situation" table`);
}

interface GenerateResult {
  /** "category/name" -> that skill's whenToUse sentence. */
  whenToUse: Record<string, string>;
  /** "category/name" of every skill whose section exists but holds nothing usable. */
  unusable: string[];
}

export function generateSkillWhenToUse(skillsRoot: string, docsRoot: string): GenerateResult {
  const whenToUse: Record<string, string> = {};
  const unusable: string[] = [];

  for (const { key, docsPath } of listSkillDocs(skillsRoot, docsRoot)) {
    // Read outside the try, so only extractWhenToUse's own "nothing usable"
    // error counts as unusable; a failed read still throws.
    const docContent = readFileSync(docsPath, 'utf-8');
    let sentence: string | undefined;
    try {
      sentence = extractWhenToUse(docContent);
    } catch {
      unusable.push(key);
      continue;
    }
    if (sentence !== undefined) whenToUse[key] = sentence;
  }

  return { whenToUse, unusable };
}

function main(): void {
  const { skillsRoot, docsRoot, out } = parseSkillDocsGeneratorArgs(process.argv.slice(2), {
    skillsRoot: join(REPO_ROOT, 'skills'),
    docsRoot: join(REPO_ROOT, 'docs'),
    out: join(REPO_ROOT, 'site/src/data/skill-when-to-use.json'),
  });
  const { whenToUse, unusable } = generateSkillWhenToUse(skillsRoot, docsRoot);

  if (unusable.length > 0) {
    console.error(`ERROR: ${unusable.length} skill(s) have a "## ${HEADING}" section with nothing usable in it:`);
    for (const slug of unusable) console.error(`  - ${slug}`);
    process.exit(1);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(whenToUse, null, 2) + '\n');
  console.log(`Wrote whenToUse for ${Object.keys(whenToUse).length} skill(s) to ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
