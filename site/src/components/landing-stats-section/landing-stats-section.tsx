import React, { type ReactNode } from 'react';
import { GiselleThemeProvider, SectionContainer, SectionTitle, StatCardRow } from '@littlebranches/giselle-mui';
import type { LandingStatsSectionProps } from './types';

/**
 * "At a glance" landing-page section — this site's first real giselle-mui
 * showcase (see `AlexRebula/skills#150`). Renders `StatCardRow` with data
 * derived from the same `skills-landing.json` / `provenance.json` the rest
 * of the landing page already reads (see `computeLandingStats`), so this
 * row can't drift from what the category sections below it show.
 *
 * Scoped in its own `GiselleThemeProvider` rather than depending on a
 * site-wide theme: Docusaurus's navbar dark/light toggle isn't wired to
 * `GiselleThemeProvider` yet (tracked separately as `AlexRebula/skills#149`).
 * `defaultMode="system"` follows the OS colour-scheme preference in the
 * meantime, which keeps this one section legible in both Docusaurus colour
 * modes without introducing a second, competing toggle. Once #149 lands and
 * a shared provider wraps the app, this local one can be removed in favour
 * of that.
 */
export function LandingStatsSection({ items }: LandingStatsSectionProps): ReactNode {
  return (
    <GiselleThemeProvider defaultMode="system">
      <SectionContainer maxWidth="lg" py={{ xs: 4, md: 6 }}>
        <SectionTitle
          caption="By the numbers"
          title="This fork, at a glance"
          description="Pulled from the same skill and provenance data the sections below render — not a separate, hand-maintained count."
          sx={{ mb: { xs: 3, md: 4 } }}
        />
        <StatCardRow items={items} />
      </SectionContainer>
    </GiselleThemeProvider>
  );
}
