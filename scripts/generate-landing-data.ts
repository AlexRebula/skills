#!/usr/bin/env node
/**
 * generate-landing-data.ts
 *
 * Reads the repo-root README.md (already the hand-tuned, human-facing
 * description of every skill) and turns its per-category sections into
 * structured JSON the docs site's landing page renders directly. Keeps
 * README.md as the single source of truth for skill descriptions instead
 * of duplicating them, the same way the docs plugin reads `docs/` in
 * place rather than copying it into `site/`.
 *
 * Usage:
 *   npx tsx scripts/generate-landing-data.ts [--out <path>]
 *
 * Exit codes:
 *   0 — data file written
 *   1 — a category heading or skill listed in README.md could not be
 *       parsed, or a real skill folder has no matching README entry
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TARGET_CATEGORIES } from './check-docs-completeness.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** README's own heading text for each category folder key. */
const CATEGORY_HEADINGS: Record<(typeof TARGET_CATEGORIES)[number], string> = {
  engineering: 'Engineering',
  framework: 'Framework',
  git: 'Git',
  org: 'Organisation (LittleBranches)',
  productivity: 'Productivity',
  misc: 'Misc',
  personal: 'Personal',
};

interface SkillEntry {
  name: string;
  description: string;
}

interface CategoryEntry {
  key: string;
  heading: string;
  description: string;
  skills: SkillEntry[];
}

function parseArgs(argv: string[]): { out: string } {
  let out = join(REPO_ROOT, 'site/src/data/skills-landing.json');
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out' && argv[i + 1]) out = argv[++i];
  }
  return { out };
}

function extractSection(readme: string, heading: string): string {
  const headingLine = `## ${heading}`;
  const start = readme.indexOf(`${headingLine}\n`);
  if (start === -1) {
    throw new Error(`Could not find "${headingLine}" heading in README.md`);
  }
  const rest = readme.slice(start + headingLine.length);
  const nextHeadingIdx = rest.indexOf('\n## ');
  return nextHeadingIdx === -1 ? rest : rest.slice(0, nextHeadingIdx);
}

function extractDescription(section: string): string {
  const lines = section.split('\n').map((l) => l.trim());
  for (const line of lines) {
    if (line === '') continue;
    if (line.startsWith('-') || line.startsWith('**') || line.startsWith('#')) break;
    return line;
  }
  throw new Error('Could not find a category description paragraph');
}

function extractSkills(section: string, category: string): SkillEntry[] {
  const pattern = new RegExp(
    `- \\*\\*\\[([a-z0-9-]+)\\]\\(\\./skills/${category}/[a-z0-9-]+/SKILL\\.md\\)\\*\\*: (.+)`,
    'g',
  );
  const skills: SkillEntry[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(section)) !== null) {
    skills.push({ name: match[1], description: match[2].trim() });
  }
  return skills;
}

function realSkillNames(category: string): string[] {
  const dir = join(REPO_ROOT, 'skills', category);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function main(): void {
  const { out } = parseArgs(process.argv.slice(2));
  const readme = readFileSync(join(REPO_ROOT, 'README.md'), 'utf-8');

  const categories: CategoryEntry[] = [];
  const errors: string[] = [];

  for (const category of TARGET_CATEGORIES) {
    const heading = CATEGORY_HEADINGS[category];
    let section: string;
    try {
      section = extractSection(readme, heading);
    } catch (e) {
      errors.push((e as Error).message);
      continue;
    }

    let description: string;
    try {
      description = extractDescription(section);
    } catch (e) {
      errors.push(`${category}: ${(e as Error).message}`);
      continue;
    }

    const skills = extractSkills(section, category);
    const real = realSkillNames(category);
    const listed = new Set(skills.map((s) => s.name));
    const missing = real.filter((n) => !listed.has(n));
    if (missing.length > 0) {
      errors.push(
        `${category}: README.md is missing an entry for: ${missing.join(', ')} (found on disk but not parsed from README)`,
      );
      continue;
    }

    categories.push({ key: category, heading, description, skills });
  }

  if (errors.length > 0) {
    console.error('ERROR: could not build landing page data from README.md:');
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ categories }, null, 2) + '\n');
  const total = categories.reduce((sum, c) => sum + c.skills.length, 0);
  console.log(`Wrote ${total} skill(s) across ${categories.length} categories to ${out}`);
}

main();
