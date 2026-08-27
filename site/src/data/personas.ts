/**
 * Static category->persona grouping, settled via /grill-me on #159
 * (2026-08-27): a persona is a fixed group of the existing 10 skill
 * categories (categories.ts), not a new per-skill field. `misc` maps to no
 * persona on purpose — it is excluded from persona filtering entirely,
 * handled by the downstream filter UI (#176), not here.
 */

import type { CategoryKey } from './categories';
import type { PersonaKey } from './personas.types';
import { PERSONAS } from './personas.types';

export const PERSONA_INFO: Record<PersonaKey, { label: string }> = {
  'software-engineering': { label: 'Software Engineering' },
  'teaching-mentoring': { label: 'Teaching & Mentoring' },
  'running-the-practice': { label: 'Running the practice' },
  'personal-knowledge-work': { label: 'Personal knowledge work' },
};

const CATEGORY_TO_PERSONAS: Record<CategoryKey, readonly PersonaKey[]> = {
  engineering: ['software-engineering'],
  framework: ['software-engineering'],
  git: ['software-engineering'],
  mentoring: ['teaching-mentoring'],
  'daily-workflow': ['running-the-practice'],
  org: ['running-the-practice'],
  'thinking-tools': ['running-the-practice'],
  wiki: ['personal-knowledge-work'],
  personal: ['personal-knowledge-work'],
  misc: [],
};

/**
 * Resolves a skill's persona membership from its category/label membership
 * (`SkillEntry.categories`), unioning across every category the skill
 * belongs to. A misc-only skill (or any category with no persona mapping)
 * resolves to an empty array, not an error.
 */
export function personasForCategories(categories: readonly string[]): PersonaKey[] {
  const result = new Set<PersonaKey>();
  for (const category of categories) {
    const personas = CATEGORY_TO_PERSONAS[category as CategoryKey];
    if (!personas) continue;
    for (const persona of personas) result.add(persona);
  }
  return PERSONAS.filter((persona) => result.has(persona));
}
