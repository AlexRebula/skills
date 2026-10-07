import React, { type ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { ProvenanceIcon } from '../provenance-icon';
import { FLOW_STAGE_ORDER_NOTE } from '../../data/index-page-copy';
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
 * own hint line. A stage with skills also gets a one-line note that their
 * order is a suggestion, so the list doesn't read as a required sequence.
 */
export function FlowStageHoverPanel({ item, isExpanded, provenanceMap }: FlowStageHoverPanelProps): ReactNode {
  const skills = item.highlightCards ?? [];

  return (
    <div className={styles.panel}>
      <Heading as="h3" className={styles.title}>
        {item.title}
      </Heading>
      <p className={styles.description}>{item.description}</p>
      <ul className={styles.skillList}>
        {skills.map((card) => (
          <li key={card.title} className={styles.skillItem}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {card.href && <ProvenanceIcon slug={card.href} provenanceMap={provenanceMap} />}
              {card.href ? (
                <Link to={card.href} className={styles.skillName}>
                  /{card.title}
                </Link>
              ) : (
                <span className={styles.skillName}>/{card.title}</span>
              )}
            </Stack>
            <p className={styles.skillDescription}>{card.description}</p>
          </li>
        ))}
      </ul>
      {skills.length > 0 && <p className={styles.orderNote}>{FLOW_STAGE_ORDER_NOTE}</p>}
      <p className={styles.hint}>
        {isExpanded
          ? 'Browse each skill in more depth below.'
          : 'Select this stage to browse each skill in more depth.'}
      </p>
    </div>
  );
}
