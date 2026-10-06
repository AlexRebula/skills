#!/usr/bin/env node
/**
 * generate-skill-taglines.ts
 *
 * Collects each skill's tagline, the skill in 3 to 5 words, from the
 * `tagline` in its own docs page's frontmatter (see skill-frontmatter.ts), into
 * JSON keyed "category/name". A consuming site shows it where a skill's
 * summary has no room, such as under its name on a narrow panel.
 *
 * Usage:
 *   npx tsx scripts/generate-skill-taglines.ts [--skills-root <path>] [--docs-root <path>] [--out <path>]
 *
 * Exit codes:
 *   0: data file written
 *   1: a real skill's docs page has no tagline, or one outside 3 to 5 words
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectFrontmatterField, type FrontmatterFieldResult } from './skill-frontmatter.ts';
import { parseSkillDocsGeneratorArgs } from './skill-docs.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** How many words a tagline has, at least and at most. */
export const TAGLINE_WORDS = { min: 3, max: 5 } as const;

export function generateSkillTaglines(
  skillsRoot: string,
  docsRoot: string
): FrontmatterFieldResult {
  return collectFrontmatterField(skillsRoot, docsRoot, 'tagline', (tagline) => {
    const words = tagline.split(/\s+/).length;
    return words >= TAGLINE_WORDS.min && words <= TAGLINE_WORDS.max
      ? null
      : `"${tagline}" has ${words} words, not ${TAGLINE_WORDS.min} to ${TAGLINE_WORDS.max}`;
  });
}

function main(): void {
  const { skillsRoot, docsRoot, out } = parseSkillDocsGeneratorArgs(process.argv.slice(2), {
    skillsRoot: join(REPO_ROOT, 'skills'),
    docsRoot: join(REPO_ROOT, 'docs'),
    out: join(REPO_ROOT, 'site/src/data/skill-taglines.json'),
  });
  const { values, problems } = generateSkillTaglines(skillsRoot, docsRoot);

  if (problems.length > 0) {
    console.error(`ERROR: ${problems.length} skill(s) have no usable tagline:`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(values, null, 2) + '\n');
  console.log(`Wrote taglines for ${Object.keys(values).length} skill(s) to ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
