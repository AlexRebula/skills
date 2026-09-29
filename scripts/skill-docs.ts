/**
 * skill-docs.ts
 *
 * The walk both per-skill docs generators share (generate-skill-summaries.ts
 * and generate-skill-when-to-use.ts): every real skill's docs page across
 * TARGET_CATEGORIES, keyed "category/name", plus their common CLI flags.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { TARGET_CATEGORIES } from '../site/src/data/categories.ts';
import { listSkillsInCategory } from './check-docs-completeness.ts';

export interface SkillDoc {
  /** "category/name", the key every generated per-skill JSON file uses. */
  key: string;
  docsPath: string;
}

/**
 * Every skill under `skillsRoot` that has a docs page at
 * `docsRoot/<category>/<name>.md`. A skill with no docs page is skipped:
 * check-docs-completeness.ts already reports that gap.
 */
export function listSkillDocs(skillsRoot: string, docsRoot: string): SkillDoc[] {
  const docs: SkillDoc[] = [];
  for (const category of TARGET_CATEGORIES) {
    for (const skill of listSkillsInCategory(skillsRoot, category)) {
      const docsPath = join(docsRoot, category, `${skill}.md`);
      if (existsSync(docsPath)) docs.push({ key: `${category}/${skill}`, docsPath });
    }
  }
  return docs;
}

export interface SkillDocsGeneratorArgs {
  skillsRoot: string;
  docsRoot: string;
  out: string;
}

/** `--skills-root`, `--docs-root` and `--out`, each falling back to its default when absent. */
export function parseSkillDocsGeneratorArgs(
  argv: string[],
  defaults: SkillDocsGeneratorArgs,
): SkillDocsGeneratorArgs {
  const getFlag = (name: string, fallback: string): string => {
    const idx = argv.indexOf(name);
    return idx !== -1 && argv[idx + 1] ? argv[idx + 1] : fallback;
  };
  return {
    skillsRoot: getFlag('--skills-root', defaults.skillsRoot),
    docsRoot: getFlag('--docs-root', defaults.docsRoot),
    out: getFlag('--out', defaults.out),
  };
}
