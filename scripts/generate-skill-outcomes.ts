#!/usr/bin/env node
/**
 * generate-skill-outcomes.ts
 *
 * Collects each skill's outcome line, what a run of it produces in one short
 * sentence, from the `outcome` in its own docs page's frontmatter (see
 * skill-frontmatter.ts), into JSON keyed "category/name". A consuming site
 * shows it while the skill runs, such as above the belt in an engine room.
 *
 * Usage:
 *   npx tsx scripts/generate-skill-outcomes.ts [--skills-root <path>] [--docs-root <path>] [--out <path>]
 *
 * Exit codes:
 *   0: data file written
 *   1: a real skill's docs page has no outcome, or one too long for a line
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectFrontmatterField, type FrontmatterFieldResult } from './skill-frontmatter.ts';
import { parseSkillDocsGeneratorArgs } from './skill-docs.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** The most characters an outcome line has, so it reads as one line above the belt. */
export const OUTCOME_MAX_LENGTH = 70;

export function generateSkillOutcomes(
  skillsRoot: string,
  docsRoot: string
): FrontmatterFieldResult {
  return collectFrontmatterField(skillsRoot, docsRoot, 'outcome', (outcome) =>
    outcome.length <= OUTCOME_MAX_LENGTH
      ? null
      : `"${outcome}" is ${outcome.length} characters, more than ${OUTCOME_MAX_LENGTH}`
  );
}

function main(): void {
  const { skillsRoot, docsRoot, out } = parseSkillDocsGeneratorArgs(process.argv.slice(2), {
    skillsRoot: join(REPO_ROOT, 'skills'),
    docsRoot: join(REPO_ROOT, 'docs'),
    out: join(REPO_ROOT, 'site/src/data/skill-outcomes.json'),
  });
  const { values, problems } = generateSkillOutcomes(skillsRoot, docsRoot);

  if (problems.length > 0) {
    console.error(`ERROR: ${problems.length} skill(s) have no usable outcome line:`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(values, null, 2) + '\n');
  console.log(`Wrote outcome lines for ${Object.keys(values).length} skill(s) to ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
