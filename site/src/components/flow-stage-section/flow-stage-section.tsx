import React, { type ReactNode } from 'react';
import Heading from '@theme/Heading';
import { SkillSubList } from '../skill-sub-list';
// This component's numbered kicker line ("01 · Stage Name") reuses the same
// small uppercase label style as the page's own hero kicker. There is no
// shared cross-component CSS primitive in this codebase yet (every other
// component owns its full CSS Module) - importing the page's module for
// this one class is the smaller of two evils versus duplicating the rule.
import pageStyles from '../../pages/index.module.css';
import type { FlowStageSectionViewProps } from './types';
import styles from './flow-stage-section.module.css';

const ORIGINAL_HEADING = 'Original';
const LINEAGE_HEADING = 'From Matt Pocock';

/**
 * One flow-stage section: title/order come from FLOW_STAGES (site/sidebars.ts),
 * not the old category buckets. Split into "Original" (mine) first, then
 * everything with real Matt Pocock lineage - upstream/modified/inherited
 * together - per #156's grilled decision; this is a physical re-sort, not
 * just a color cue on top of #145's four-color SkillCard design.
 */
export function FlowStageSectionView({ section, index }: FlowStageSectionViewProps): ReactNode {
  return (
    <section className={styles.stageSection}>
      <p className={pageStyles.kicker}>
        {String(index + 1).padStart(2, '0')} · {section.label}
      </p>
      <Heading as="h2" className={styles.stageTitle}>
        {section.label}
      </Heading>
      <SkillSubList heading={ORIGINAL_HEADING} skills={section.original} />
      <SkillSubList heading={LINEAGE_HEADING} skills={section.lineage} />
    </section>
  );
}
