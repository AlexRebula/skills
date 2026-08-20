#!/usr/bin/env node
/**
 * check-docs-completeness.ts
 *
 * Standalone reporting tool (not a build gate — see LittleBranches/wiki#522
 * for the later ticket that wires a check like this into CI once all content
 * has landed).
 *
 * For each of the 7 target skill categories, enumerates every skill folder
 * that contains a SKILL.md, and checks whether a corresponding docs page
 * exists at docs/<category>/<skill-name>.md. Prints a report of any skills
 * missing a docs page, grouped by category.
 *
 * `deprecated` and `in-progress` are never considered, even if they contain
 * skills with (or without) docs pages.
 *
 * Usage:
 *   npx tsx scripts/check-docs-completeness.ts [--skills-root <path>] [--docs-root <path>]
 *
 * Exit codes:
 *   0 — every enumerated skill has a docs page
 *   1 — at least one skill is missing a docs page
 */

import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** The only categories this check ever considers. */
export const TARGET_CATEGORIES = [
  'engineering',
  'productivity',
  'git',
  'framework',
  'org',
  'personal',
  'misc',
] as const;

/** Categories that must never be enumerated, regardless of contents. */
export const IGNORED_CATEGORIES = ['deprecated', 'in-progress'] as const;

export interface MissingDocsReport {
  /** category -> list of skill names missing a docs page, sorted */
  missingByCategory: Record<string, string[]>;
  /** total count of skills enumerated across all target categories */
  totalSkillsChecked: number;
  /** total count of skills missing a docs page */
  totalMissing: number;
}

/**
 * List the skill folder names under `skillsRoot/<category>` that contain a
 * SKILL.md file. Non-directories (e.g. a category-level README.md) and
 * directories without a SKILL.md are ignored. Returns [] if the category
 * directory does not exist.
 */
export function listSkillsInCategory(skillsRoot: string, category: string): string[] {
  const categoryDir = join(skillsRoot, category);
  if (!existsSync(categoryDir) || !statSync(categoryDir).isDirectory()) {
    return [];
  }

  return readdirSync(categoryDir)
    .filter((entry) => {
      const entryPath = join(categoryDir, entry);
      return statSync(entryPath).isDirectory() && existsSync(join(entryPath, 'SKILL.md'));
    })
    .sort();
}

/**
 * Build the completeness report: for each of TARGET_CATEGORIES, enumerate
 * skills (folders containing SKILL.md) and check for a matching docs page
 * at `docsRoot/<category>/<skill>.md`. `deprecated` and `in-progress` are
 * never read, even if `skillsRoot` contains them.
 */
export function checkDocsCompleteness(skillsRoot: string, docsRoot: string): MissingDocsReport {
  const missingByCategory: Record<string, string[]> = {};
  let totalSkillsChecked = 0;
  let totalMissing = 0;

  for (const category of TARGET_CATEGORIES) {
    const skills = listSkillsInCategory(skillsRoot, category);
    const missing: string[] = [];

    for (const skill of skills) {
      totalSkillsChecked += 1;
      const docsPath = join(docsRoot, category, `${skill}.md`);
      if (!existsSync(docsPath)) {
        missing.push(skill);
      }
    }

    if (missing.length > 0) {
      missingByCategory[category] = missing;
      totalMissing += missing.length;
    }
  }

  return { missingByCategory, totalSkillsChecked, totalMissing };
}

/** Render a human-readable report. Pure function, easy to assert on in tests. */
export function formatReport(report: MissingDocsReport): string {
  if (report.totalMissing === 0) {
    return `All ${report.totalSkillsChecked} skill(s) across ${TARGET_CATEGORIES.length} categories have a docs page.`;
  }

  const lines: string[] = [
    `${report.totalMissing} of ${report.totalSkillsChecked} skill(s) are missing a docs page:`,
    '',
  ];

  for (const category of TARGET_CATEGORIES) {
    const missing = report.missingByCategory[category];
    if (!missing || missing.length === 0) continue;
    lines.push(`${category}:`);
    for (const skill of missing) {
      lines.push(`  - ${skill} (expected docs/${category}/${skill}.md)`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}

function main() {
  const args = process.argv.slice(2);
  const getFlag = (name: string, fallback: string): string => {
    const idx = args.indexOf(name);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
  };

  const skillsRoot = getFlag('--skills-root', join(REPO_ROOT, 'skills'));
  const docsRoot = getFlag('--docs-root', join(REPO_ROOT, 'docs'));

  const report = checkDocsCompleteness(skillsRoot, docsRoot);
  console.log(formatReport(report));

  process.exit(report.totalMissing === 0 ? 0 : 1);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
