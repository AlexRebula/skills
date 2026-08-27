import type { TimelineDotProps } from '@mui/lab/TimelineDot';

/**
 * The subset of `TimelineDotProps['color']` this site actually uses to
 * express provenance status. Shared between `provenance-display.ts`
 * (`PROVENANCE_TIMELINE_COLOR`) and this file's own `SkillTimelinePhaseData`,
 * so the two don't drift into two separately-written copies of the same
 * type expression.
 */
export type TimelineColor = NonNullable<TimelineDotProps['color']>;

/**
 * A skill's non-JSX Timeline phase data: everything `buildSkillTimelinePhases`
 * can derive without rendering an icon or a footer button, which need real
 * JSX and so are attached by `SkillTimeline` at render time instead. Kept
 * separate so the ordering/color/date-synthesis logic in
 * `skill-timeline-phases.ts` stays pure and unit-testable without mounting
 * React (issue #157).
 */
export interface SkillTimelinePhaseData {
  key: number;
  category: string;
  name: string;
  title: string;
  description: string;
  /** Not a real date: repurposed to show the skill's category, since
   * TimelinePhase.date is required but a skill-taxonomy stage has no
   * actual chronology. See #157's acceptance criteria. */
  date: string;
  side: 'left' | 'right';
  color: TimelineColor;
  hasDiff: boolean;
}
