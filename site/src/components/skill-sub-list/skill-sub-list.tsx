import React, { type ReactNode } from 'react';
import { SkillTimeline } from '../skill-timeline';
import type { SkillSubListProps } from './types';
import styles from './skill-sub-list.module.css';

/**
 * One of a stage's two sub-lists ("Original" or the Matt-lineage group).
 * Renders nothing when empty, so a stage made up entirely of one kind of
 * skill doesn't show a dangling empty heading (issue #156). Renders through
 * `SkillTimeline` (giselle-mui's Timeline components) rather than a plain
 * list, per issue #157. Since each sub-list gets its own `SkillTimeline`
 * instance, this is exactly the "two adjacent Timeline instances per stage"
 * option #157's own follow-up comment raised for representing #156's later
 * two-tier (Original / Matt-lineage) split, which giselle-mui's Timeline has
 * no native sub-grouping API for.
 */
export function SkillSubList({ heading, skills }: SkillSubListProps): ReactNode {
  if (skills.length === 0) return null;
  return (
    <div className={styles.subList}>
      <p className={styles.subListHeading}>{heading}</p>
      <SkillTimeline skills={skills} />
    </div>
  );
}
