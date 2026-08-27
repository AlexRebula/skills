import React, { type ReactNode } from 'react';
import { InlineMarkdown } from '../inline-markdown';
import { SkillCard } from '../skill-card';
import { PROVENANCE_CARD_COLOR, PROVENANCE_BADGE_LABEL } from '../../data/provenance-display';
import type { SkillListItemProps } from './types';
import styles from './skill-list-item.module.css';

/** One skill's card + description, the row shape shared by both of a stage's sub-lists. */
export function SkillListItem({ skill }: SkillListItemProps): ReactNode {
  return (
    <div className={styles.skillRow}>
      <dt>
        <SkillCard
          category={skill.category}
          name={skill.name}
          color={PROVENANCE_CARD_COLOR[skill.status]}
          label={PROVENANCE_BADGE_LABEL[skill.status]}
          diff={skill.diff}
        />
      </dt>
      <dd className={styles.skillDefinition}>
        <InlineMarkdown text={skill.description} />
      </dd>
    </div>
  );
}
