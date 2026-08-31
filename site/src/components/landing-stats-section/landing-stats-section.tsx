import React, { type ReactNode } from 'react';
import { SectionContainer, SectionTitle, StatCardRow } from '@littlebranches/giselle-mui';
import type { LandingStatsSectionProps } from './types';

/**
 * "At a glance" landing-page section — this site's first real giselle-mui
 * showcase (see `AlexRebula/skills#150`). Renders `StatCardRow` with data
 * derived from the same `skills-landing.json` / `provenance.json` the rest
 * of the landing page already reads (see `computeLandingStats`), so this
 * row can't drift from what the category sections below it show.
 *
 * Relies on the site-wide `GiselleThemeProvider` mounted in `theme/Root.tsx`
 * rather than its own nested one: a nested provider with no `themeOverrides`
 * resets back to giselle-mui's stock theme for everything inside it (stock
 * Roboto/300 headings, ignoring Root.tsx's Infima font-family/weight
 * overrides) and stops the outer navbar dark/light bridge from reaching this
 * section, since it's a separate MUI theme context.
 */
export function LandingStatsSection({ items }: LandingStatsSectionProps): ReactNode {
  return (
    <SectionContainer maxWidth="lg" py={{ xs: 4, md: 6 }}>
      <SectionTitle
        caption="By the numbers"
        title="This fork, at a glance"
        description="Pulled from the same skill and provenance data the sections below render — not a separate, hand-maintained count."
        sx={{ mb: { xs: 3, md: 4 } }}
      />
      <StatCardRow items={items} />
    </SectionContainer>
  );
}
