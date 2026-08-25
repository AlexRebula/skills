import type { StatCardItem } from '@littlebranches/giselle-mui';
import type { ProvenanceMap } from './provenance.types';

export interface LandingStatsInput {
  totalSkills: number;
  totalCategories: number;
  provenanceMap: ProvenanceMap;
}

/**
 * Turns data the landing page already loads (skill/category counts from
 * `skills-landing.json`, provenance status from `provenance.json`) into the
 * four `StatCardItem`s the "at a glance" section renders. Kept as a pure
 * function, no React, so the numbers are unit-testable without mounting
 * any MUI component, and so they can never drift from what the category
 * sections below the stats row already show — same source data, no
 * separate hand-maintained count.
 */
export function computeLandingStats({
  totalSkills,
  totalCategories,
  provenanceMap,
}: LandingStatsInput): StatCardItem[] {
  const entries = Object.values(provenanceMap);
  const originalCount = entries.filter((entry) => entry.status === 'original').length;
  const modifiedCount = entries.filter((entry) => entry.status === 'modified').length;

  return [
    {
      label: 'Skills',
      value: totalSkills,
      color: 'primary',
      iconId: 'solar:widget-add-bold-duotone',
    },
    {
      label: 'Categories',
      value: totalCategories,
      color: 'info',
      iconId: 'solar:folder-check-bold-duotone',
    },
    {
      label: 'AlexRebula original',
      value: originalCount,
      color: 'success',
      iconId: 'solar:checklist-bold-duotone',
    },
    {
      label: 'Diverged from upstream',
      value: modifiedCount,
      color: 'warning',
      iconId: 'solar:branching-paths-up-bold-duotone',
    },
  ];
}
