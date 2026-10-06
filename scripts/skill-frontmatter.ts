/**
 * skill-frontmatter.ts
 *
 * Reads the short per-skill lines a docs page carries in its frontmatter
 * (docs/<category>/<name>.md), for the generators that turn them into a
 * consuming site's data: generate-skill-taglines.ts and
 * generate-skill-outcomes.ts. The frontmatter is a block at the very top of
 * the page, between two `---` lines, one `key: "value"` per line. Docusaurus
 * reads the same block and does not show it on the page.
 *
 * Every value is double-quoted (a JSON string), so a colon or an apostrophe
 * in it can never be misread.
 */

import { readFileSync } from 'node:fs';
import { listSkillDocs } from './skill-docs.ts';

const FENCE = '---\n';
const KEY = /^[A-Za-z][\w-]*$/;

/** The page's frontmatter as `key` → value; empty when the page has none. */
export function readFrontmatter(doc: string): Record<string, string> {
  if (!doc.startsWith(FENCE)) return {};
  const end = doc.indexOf(`\n${FENCE}`, FENCE.length - 1);
  if (end === -1) return {};
  const block = doc.slice(FENCE.length, end);
  const entries: Record<string, string> = {};
  for (const line of block.split('\n')) {
    if (line.trim() === '') continue;
    const colon = line.indexOf(':');
    const key = line.slice(0, colon).trim();
    const raw = line.slice(colon + 1).trim();
    if (colon === -1 || !KEY.test(key) || !raw.startsWith('"') || !raw.endsWith('"')) {
      throw new Error(`Frontmatter values must be double-quoted strings: ${line}`);
    }
    entries[key] = JSON.parse(raw) as string;
  }
  return entries;
}

export interface FrontmatterFieldResult {
  /** Each skill's value, keyed "category/name", like every other per-skill data file. */
  values: Record<string, string>;
  /** One line per skill whose value is missing or invalid: "category/name: why". */
  problems: string[];
}

/**
 * One frontmatter field from every real skill's docs page. `check` returns why a
 * value is not acceptable, or null when it is; a page without the field is a
 * problem too, so a new skill can't ship without its line.
 */
export function collectFrontmatterField(
  skillsRoot: string,
  docsRoot: string,
  field: string,
  check: (value: string) => string | null
): FrontmatterFieldResult {
  const values: Record<string, string> = {};
  const problems: string[] = [];
  for (const { key, docsPath } of listSkillDocs(skillsRoot, docsRoot)) {
    const value = readFrontmatter(readFileSync(docsPath, 'utf-8'))[field]?.trim();
    const problem = value ? check(value) : `no "${field}" in its docs page's frontmatter`;
    if (problem === null && value) values[key] = value;
    else problems.push(`${key}: ${problem}`);
  }
  return { values, problems };
}
