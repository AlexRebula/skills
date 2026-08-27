import React, { type ReactNode } from 'react';
import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
import { TimelineTwoColumn, TimelineCompact } from '@littlebranches/giselle-mui/lab';
import type { TimelinePhase } from '@littlebranches/giselle-mui/lab';
import { SkillIcon } from '../skill-icon';
import { ProvenanceButton } from '../provenance-button';
import { buildSkillTimelinePhases } from '../../data/skill-timeline-phases';
import type { SkillTimelineProps } from './types';
import styles from './skill-timeline.module.css';

/**
 * Renders one sub-list's skills through giselle-mui's Timeline components
 * (issue #157: a real dogfooding showcase) instead of a plain list. `date`
 * and `side` are required by `TimelinePhase` but have no natural meaning for
 * a skill-taxonomy stage (see `skill-timeline-phases.ts`'s doc comment on
 * `date`). `checklist` stays unset (default false) so no "done"/overdue
 * semantics are ever implied. The acceptance criteria this ticket is
 * scoped to are explicit about that.
 *
 * Both `TimelineTwoColumn` (desktop) and `TimelineCompact` (mobile) render
 * simultaneously, toggled by a CSS media query rather than a JS breakpoint
 * hook: this site is statically generated (Docusaurus SSG), and a
 * `useMediaQuery`-based switch would render one variant on the server and
 * potentially the other on the client after hydration, a structurally
 * different DOM tree that would visibly flash and risk a hydration mismatch.
 * See CONVENTIONS.md's "known gotchas".
 *
 * Self-wrapped in its own `GiselleThemeProvider` (`defaultMode="system"`)
 * rather than depending on the site-wide one from `theme/Root.tsx`, matching
 * `LandingStatsSection`'s established pattern for a giselle-mui-consuming
 * component that needs `theme.vars` to be renderable and testable in
 * isolation, independent of app-level composition.
 */
export function SkillTimeline({ skills }: SkillTimelineProps): ReactNode {
  if (skills.length === 0) return null;

  const phases: TimelinePhase[] = buildSkillTimelinePhases(skills).map((phase) => ({
    key: phase.key,
    title: phase.title,
    description: phase.description,
    date: phase.date,
    side: phase.side,
    color: phase.color,
    icon: <SkillIcon category={phase.category} name={phase.name} size={20} />,
    footer: phase.hasDiff ? (
      <ProvenanceButton slug={`${phase.category}/${phase.name}`} compact />
    ) : undefined,
  }));

  return (
    <GiselleThemeProvider defaultMode="system">
      <div className={styles.desktopOnly}>
        <TimelineTwoColumn phases={phases} sortOrder="key" />
      </div>
      <div className={styles.mobileOnly}>
        <TimelineCompact phases={phases} sortOrder="key" />
      </div>
    </GiselleThemeProvider>
  );
}
