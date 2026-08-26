/**
 * Shared between scripts/generate-landing-data.ts (which writes
 * skills-landing.json) and pages/index.tsx (which reads it), per the
 * companion-types / promotion rule (a type used by a second module moves to
 * one shared file rather than being redeclared).
 */

/**
 * A skill's category/label membership. Stored as an array so a skill can
 * belong to more than one category at once (many-to-many, not a single
 * implicit category) — laid down for a future filter/recommendation
 * feature. `SkillEntry` objects still live nested inside each
 * `CategoryEntry.skills` bucket the skill belongs to (so today's
 * per-category homepage rendering needs no changes), but `categories` is
 * now the explicit, authoritative record of every bucket a given skill
 * appears in, rather than that membership being implied only by array
 * position.
 */
export interface SkillEntry {
  name: string;
  description: string;
  categories: string[];
}

export interface CategoryEntry {
  key: string;
  heading: string;
  description: string;
  skills: SkillEntry[];
}

export interface SkillsLandingData {
  categories: CategoryEntry[];
}
