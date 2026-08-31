import React, { type ReactNode } from 'react';
import { Accordion } from '@littlebranches/giselle-mui';
import Link from '@docusaurus/Link';
import type { FlowSkillAccordionListProps } from './types';
import styles from './flow-skill-accordion-list.module.css';

/**
 * `FeatureFlowSection`'s `renderHighlightPanel` content for the expanded
 * flow-stage detail panel (giselle-mui#feature/render-highlight-panel):
 * every skill in the stage as its own `Accordion`, all titles visible at
 * once and independently expandable, instead of giselle-mui's default
 * one-at-a-time `FeatureFlowHighlightCarousel` - a better fit for browsing
 * a list of skills than paging through a marketing-style carousel.
 */
export function FlowSkillAccordionList({ item }: FlowSkillAccordionListProps): ReactNode {
  return (
    <div className={styles.list}>
      {(item.highlightCards ?? []).map((card) => (
        <Accordion key={card.title} title={`/${card.title}`} className={styles.accordion}>
          <p className={styles.description}>{card.description}</p>
          {card.href && (
            <Link to={card.href} className={styles.learnMore}>
              Learn more
            </Link>
          )}
        </Accordion>
      ))}
    </div>
  );
}
