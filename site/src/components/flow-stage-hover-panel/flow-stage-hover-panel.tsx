import React, { type ReactNode } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import type { FlowStageHoverPanelProps } from './types';
import styles from './flow-stage-hover-panel.module.css';

/**
 * `FeatureFlowSection`'s `renderRightPanel` content for the flow-stages
 * landing view (giselle-mui#188): a heading + short description for the
 * hovered/active stage, standing in for the image column this site has no
 * use for, plus every skill in that stage listed with its own one/two-
 * sentence description - shown as soon as the stage is active, not gated
 * behind expanding it. `isExpanded` doesn't change which skills are listed
 * here (that's always the full list); expanding a stage instead reveals the
 * same skills one at a time, in more depth, in the detail panel below (see
 * `FeatureFlowHighlightCarousel`) - `isExpanded` only changes this panel's
 * own hint line.
 */
export function FlowStageHoverPanel({ item, isExpanded }: FlowStageHoverPanelProps): ReactNode {
  return (
    <div className={styles.panel}>
      <Heading as="h3" className={styles.title}>
        {item.title}
      </Heading>
      <p className={styles.description}>{item.description}</p>
      <ul className={styles.skillList}>
        {(item.highlightCards ?? []).map((card) => (
          <li key={card.title} className={styles.skillItem}>
            {card.href ? (
              <Link to={card.href} className={styles.skillName}>
                /{card.title}
              </Link>
            ) : (
              <span className={styles.skillName}>/{card.title}</span>
            )}
            <p className={styles.skillDescription}>{card.description}</p>
          </li>
        ))}
      </ul>
      <p className={styles.hint}>
        {isExpanded
          ? 'Browse each skill in more depth below.'
          : 'Select this stage to browse each skill in more depth.'}
      </p>
    </div>
  );
}
