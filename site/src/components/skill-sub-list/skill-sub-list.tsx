import React, { type ReactNode } from 'react';
import { SkillListItem } from '../skill-list-item';
import type { SkillSubListProps } from './types';
import styles from './skill-sub-list.module.css';

/**
 * One of a stage's two sub-lists ("Original" or the Matt-lineage group).
 * Renders nothing when empty, so a stage made up entirely of one kind of
 * skill doesn't show a dangling empty heading (issue #156).
 */
export function SkillSubList({ heading, skills }: SkillSubListProps): ReactNode {
  if (skills.length === 0) return null;
  return (
    <div className={styles.subList}>
      <p className={styles.subListHeading}>{heading}</p>
      <dl className={styles.skillList}>
        {skills.map((skill) => (
          <SkillListItem key={`${skill.category}/${skill.name}`} skill={skill} />
        ))}
      </dl>
    </div>
  );
}
