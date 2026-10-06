import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SKILL_ICON_NAMES } from '../site/src/data/skill-icons';
import { listSkillDocs } from './skill-docs';

// The real repo: every skill with a docs page, keyed "category/name" as SKILL_ICON_NAMES is.
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = listSkillDocs(join(REPO_ROOT, 'skills'), join(REPO_ROOT, 'docs')).map(
  ({ key }) => key
);

describe('SKILL_ICON_NAMES', () => {
  it('gives every skill an icon', () => {
    expect(SKILLS.filter((key) => !(key in SKILL_ICON_NAMES))).toEqual([]);
  });

  it('names only real skills, never another docs page with the same name', () => {
    // docs/vocabulary/handoff.md is a term, not the daily-workflow/handoff skill
    expect(Object.keys(SKILL_ICON_NAMES).filter((key) => !SKILLS.includes(key))).toEqual([]);
  });

  it('gives no two skills the same icon', () => {
    const icons = Object.values(SKILL_ICON_NAMES);
    expect(icons.filter((icon, index) => icons.indexOf(icon) !== index)).toEqual([]);
  });
});
