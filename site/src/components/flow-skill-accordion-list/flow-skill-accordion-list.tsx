import React, { useState, type ReactNode } from 'react';
import { Accordion } from '@littlebranches/giselle-mui';
import Link from '@docusaurus/Link';
import { InlineMarkdown } from '../inline-markdown';
import realSkillSummaries from '../../data/skill-summaries.json';
import type { FlowSkillAccordionListProps } from './types';
import styles from './flow-skill-accordion-list.module.css';

/**
 * Plain inline SVG, not a `GiselleIcon`/Iconify name: this is a one-off UI
 * chevron, not a skill icon, so it doesn't belong in
 * `scripts/generate-skill-icons.ts`'s bundled-icon extraction. MUI's own
 * `AccordionSummary` already rotates `expandIconWrapper` 180deg on
 * `.Mui-expanded` - no extra rotation CSS needed here.
 */
function ChevronDownIcon(): ReactNode {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Strips the leading "/" a highlight card's `href` always has, back to a "category/name" summaries key. */
function toSummaryKey(href: string | undefined): string | undefined {
  return href?.replace(/^\//, '');
}

/**
 * `FeatureFlowSection`'s `renderHighlightPanel` content for the expanded
 * flow-stage detail panel (giselle-mui#feature/render-highlight-panel):
 * every skill in the stage as its own `Accordion`, all titles visible at
 * once, only one expanded at a time (a real accordion, not an independent
 * toggle group), instead of giselle-mui's default one-at-a-time
 * `FeatureFlowHighlightCarousel` - a better fit for browsing a list of
 * skills than paging through a marketing-style carousel.
 *
 * Each card's body is that skill's own "## What it does" section, straight
 * from its docs page (`scripts/generate-skill-summaries.ts`), looked up by
 * the card's own `href` - a real deeper dive, distinct from `card.description`
 * itself, which stays the short one-line blurb `FlowStageHoverPanel` shows
 * next to the same skill as soon as its stage is active. Falls back to that
 * one-liner (as a single paragraph) if a skill has no doc-page summary.
 */
export function FlowSkillAccordionList({
  item,
  skillSummaries = realSkillSummaries,
}: FlowSkillAccordionListProps): ReactNode {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  return (
    <div className={styles.list}>
      {(item.highlightCards ?? []).map((card) => {
        const summary = skillSummaries[toSummaryKey(card.href) ?? ''];
        const paragraphs = summary?.length ? summary : [card.description];
        return (
          <Accordion
            key={card.title}
            disableGutters
            expanded={expandedTitle === card.title}
            onChange={(_event, isExpanded) => setExpandedTitle(isExpanded ? card.title : null)}
            expandIcon={<ChevronDownIcon />}
            title={<span className={styles.title}>/{card.title}</span>}
            // A plain CSS-module class loses a specificity fight against
            // MUI's own emotion-injected Paper/Accordion styles (box-shadow,
            // per-corner border-radius) - sx resolves through the same
            // styling pipeline MUI itself uses, so it reliably wins instead.
            //
            // This list sits on FeatureFlowSection's detailPanelColor="grey"
            // backdrop (pages/index.tsx), not a plain page background - so a
            // collapsed item stays fully transparent (the container's own
            // grey is its only background) while the expanded one inverts to
            // solid white/paper, standing out from it instead of blending in.
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
              '&.Mui-expanded': {
                backgroundColor: 'var(--mui-palette-background-paper) !important',
              },
            }}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.description}>
                <InlineMarkdown text={paragraph} />
              </p>
            ))}
            {card.href && (
              <Link to={card.href} className={styles.learnMore}>
                Learn more
              </Link>
            )}
          </Accordion>
        );
      })}
    </div>
  );
}
