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
        <Accordion
          key={card.title}
          disableGutters
          title={<span className={styles.title}>/{card.title}</span>}
          // A plain CSS-module class loses a specificity fight against
          // MUI's own emotion-injected Paper/Accordion styles (box-shadow,
          // per-corner border-radius) - sx resolves through the same
          // styling pipeline MUI itself uses, so it reliably wins instead.
          sx={{
            background: 'transparent',
            boxShadow: 'none',
            // !important: MUI's own Accordion styleOverrides round only the
            // first/last item's outer corners via a `:first-of-type`/
            // `:last-of-type` compound selector, which otherwise beats a
            // plain sx-generated class for every other item in the list.
            borderRadius: '8px !important',
            padding: '0.25rem 0.75rem',
            transition: 'background-color 0.15s ease',
            '&::before': { display: 'none' },
            '&:hover': { backgroundColor: 'var(--ifm-color-emphasis-100) !important' },
            '&.Mui-expanded': { backgroundColor: 'var(--ifm-color-emphasis-100) !important' },
          }}
        >
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
