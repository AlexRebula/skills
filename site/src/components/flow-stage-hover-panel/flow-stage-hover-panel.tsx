import React, { type ReactNode } from 'react';
import Heading from '@theme/Heading';
import type { FlowStageHoverPanelProps } from './types';
import styles from './flow-stage-hover-panel.module.css';

/**
 * `FeatureFlowSection`'s `renderRightPanel` content for the flow-stages
 * landing view (giselle-mui#188): a heading + short description for the
 * hovered/active stage, standing in for the image column this site has no
 * use for. `isExpanded` doesn't change the content shown for the item, only
 * which hint renders below it.
 */
export function FlowStageHoverPanel({ item, isExpanded }: FlowStageHoverPanelProps): ReactNode {
  return (
    <div className={styles.panel}>
      <Heading as="h3" className={styles.title}>
        {item.title}
      </Heading>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.hint}>
        {isExpanded ? 'Every skill in this stage is listed below.' : 'Click the stage to see its skills.'}
      </p>
    </div>
  );
}
