/**
 * Shared between site/src/data/personas.ts (the category->persona mapping)
 * and whatever eventually consumes it for the homepage filter (#176), the
 * same split as categories.ts/skills-landing.types.ts.
 */

export const PERSONAS = [
  'software-engineering',
  'teaching-mentoring',
  'running-the-practice',
  'personal-knowledge-work',
] as const;

export type PersonaKey = (typeof PERSONAS)[number];

export interface PersonaInfo {
  /** Display label shown on the persona filter chip. */
  label: string;
}
