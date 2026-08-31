#!/usr/bin/env node
/**
 * generate-skill-summaries.ts
 *
 * Extracts each skill's "## What it does" section straight from its own
 * docs page (docs/<category>/<name>.md) into JSON the homepage's Flow
 * section renders as a deeper per-skill dive (see
 * site/src/components/flow-skill-accordion-list) - reusing the doc page's
 * own wording rather than hand-authoring a second, separately-maintained
 * summary that would drift from it.
 *
 * Usage:
 *   npx tsx scripts/generate-skill-summaries.ts [--skills-root <path>] [--docs-root <path>] [--out <path>]
 *
 * Exit codes:
 *   0: data file written
 *   1: a real skill's docs page has no "## What it does" section
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TARGET_CATEGORIES } from '../site/src/data/categories.ts';
import { listSkillsInCategory } from './check-docs-completeness.ts';
import { extractSection } from './generate-landing-data.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

function parseArgs(argv: string[]): { skillsRoot: string; docsRoot: string; out: string } {
  const getFlag = (name: string, fallback: string): string => {
    const idx = argv.indexOf(name);
    return idx !== -1 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    skillsRoot: getFlag('--skills-root', join(REPO_ROOT, 'skills')),
    docsRoot: getFlag('--docs-root', join(REPO_ROOT, 'docs')),
    out: getFlag('--out', join(REPO_ROOT, 'site/src/data/skill-summaries.json')),
  };
}

/**
 * The "## What it does" section's own paragraphs, in order - table rows and
 * list items filtered out (InlineMarkdown, the renderer this feeds, only
 * handles a single paragraph's inline code/links/bold, not block markdown).
 * Every doc page's own prose so far is plain paragraphs at this heading;
 * this guard just keeps a future page with a table here from leaking raw
 * markdown syntax onto the homepage instead of silently mis-rendering.
 */
export function extractWhatItDoesParagraphs(docContent: string): string[] {
  const section = extractSection(docContent, 'What it does');
  return section
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0 && !block.startsWith('|') && !block.startsWith('-'));
}

interface GenerateResult {
  summaries: Record<string, string[]>;
  missing: string[];
}

export function generateSkillSummaries(skillsRoot: string, docsRoot: string): GenerateResult {
  const summaries: Record<string, string[]> = {};
  const missing: string[] = [];

  for (const category of TARGET_CATEGORIES) {
    for (const skill of listSkillsInCategory(skillsRoot, category)) {
      const docsPath = join(docsRoot, category, `${skill}.md`);
      if (!existsSync(docsPath)) continue; // covered separately by check-docs-completeness.ts

      const docContent = readFileSync(docsPath, 'utf-8');
      let paragraphs: string[];
      try {
        paragraphs = extractWhatItDoesParagraphs(docContent);
      } catch {
        missing.push(`${category}/${skill}`);
        continue;
      }
      if (paragraphs.length === 0) {
        missing.push(`${category}/${skill}`);
        continue;
      }
      summaries[`${category}/${skill}`] = paragraphs;
    }
  }

  return { summaries, missing };
}

function main(): void {
  const { skillsRoot, docsRoot, out } = parseArgs(process.argv.slice(2));
  const { summaries, missing } = generateSkillSummaries(skillsRoot, docsRoot);

  if (missing.length > 0) {
    console.error(`ERROR: ${missing.length} skill(s) have no usable "## What it does" section:`);
    for (const slug of missing) console.error(`  - ${slug}`);
    process.exit(1);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(summaries, null, 2) + '\n');
  console.log(
    `Wrote deeper-dive summaries for ${Object.keys(summaries).length} skill(s) to ${out}`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
