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

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractSection } from './generate-landing-data.ts';
import { listSkillDocs, parseSkillDocsGeneratorArgs } from './skill-docs.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

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

  for (const { key, docsPath } of listSkillDocs(skillsRoot, docsRoot)) {
    const docContent = readFileSync(docsPath, 'utf-8');
    let paragraphs: string[];
    try {
      paragraphs = extractWhatItDoesParagraphs(docContent);
    } catch {
      missing.push(key);
      continue;
    }
    if (paragraphs.length === 0) {
      missing.push(key);
      continue;
    }
    summaries[key] = paragraphs;
  }

  return { summaries, missing };
}

function main(): void {
  const { skillsRoot, docsRoot, out } = parseSkillDocsGeneratorArgs(process.argv.slice(2), {
    skillsRoot: join(REPO_ROOT, 'skills'),
    docsRoot: join(REPO_ROOT, 'docs'),
    out: join(REPO_ROOT, 'site/src/data/skill-summaries.json'),
  });
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
