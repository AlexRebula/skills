/**
 * Shared between the Node build scripts that read/derive skill-category data
 * (scripts/check-docs-completeness.ts, scripts/generate-landing-data.ts,
 * scripts/generate-provenance.ts — all run directly via tsx) and the landing
 * page that renders it (pages/index.tsx, bundled for the browser): the
 * single source of truth for which skill categories exist, README.md's exact
 * heading text for each (used to locate its section when parsing README.md),
 * and the display label shown on the landing page. The two intentionally
 * aren't always the same string — e.g. "org" reads "Organisation
 * (LittleBranches)" in README.md but displays as just "Organisation".
 */

export const TARGET_CATEGORIES = [
  'engineering',
  'wiki',
  'daily-workflow',
  'mentoring',
  'thinking-tools',
  'git',
  'framework',
  'org',
  'personal',
  'misc',
] as const;

export type CategoryKey = (typeof TARGET_CATEGORIES)[number];

export interface CategoryInfo {
  /** README.md's exact heading text for this category, matched as `## ${heading}`. */
  heading: string;
  /** Display label shown on the landing page. */
  label: string;
}

export const CATEGORY_INFO: Record<CategoryKey, CategoryInfo> = {
  engineering: { heading: 'Engineering', label: 'Engineering' },
  wiki: { heading: 'Wiki', label: 'Wiki' },
  'daily-workflow': { heading: 'Daily Workflow', label: 'Daily Workflow' },
  mentoring: { heading: 'Mentoring', label: 'Mentoring' },
  'thinking-tools': { heading: 'Thinking Tools', label: 'Thinking Tools' },
  git: { heading: 'Git', label: 'Git' },
  framework: { heading: 'Framework', label: 'Framework' },
  org: { heading: 'Organisation (LittleBranches)', label: 'Organisation' },
  personal: { heading: 'Personal', label: 'Personal' },
  misc: { heading: 'Misc', label: 'Misc' },
};
