import React, { useState, type ReactNode } from 'react';
import { Accordion, type FeatureFlowHighlightCard } from '@littlebranches/giselle-mui';
import Link from '@docusaurus/Link';
import { InlineMarkdown } from '../inline-markdown';
import { ProvenanceIcon } from '../provenance-icon';
import defaultProvenance from '../../data/provenance.json';
import { getProvenanceEntry } from '../../data/provenance.utils';
import realSkillSummaries from '../../data/skill-summaries.json';
import type { ProvenanceMap } from '../../data/provenance.types';
import type {
  FlowSkillAccordionListProps,
  SkillAccordionGroupProps,
  SkillAccordionItemProps,
} from './types';
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
 * A card with no resolvable provenance entry (no `href`, or an unknown slug)
 * defaults to "original", matching `deriveStatus`'s own default in
 * `generate-provenance.ts`: absence of matched upstream lineage is what
 * "original" means there too.
 */
function isOriginalCard(card: FeatureFlowHighlightCard, provenanceMap: ProvenanceMap): boolean {
  return (getProvenanceEntry(card.href ?? '', provenanceMap)?.status ?? 'original') === 'original';
}

/** Splits `cards` into `[originalCards, lineageCards]`, one provenance lookup per card. */
function partitionByProvenance(
  cards: readonly FeatureFlowHighlightCard[],
  provenanceMap: ProvenanceMap
): [FeatureFlowHighlightCard[], FeatureFlowHighlightCard[]] {
  const originalCards: FeatureFlowHighlightCard[] = [];
  const lineageCards: FeatureFlowHighlightCard[] = [];
  for (const card of cards) {
    (isOriginalCard(card, provenanceMap) ? originalCards : lineageCards).push(card);
  }
  return [originalCards, lineageCards];
}

/**
 * One skill's `Accordion`, factored out of `FlowSkillAccordionList` per
 * CONVENTIONS.md's rule against an inline function returning JSX assigned to
 * a variable inside a component body (the `.map()` callback here would
 * otherwise be exactly that).
 */
function SkillAccordionItem({
  card,
  isExpanded,
  onToggle,
  skillSummaries,
  provenanceMap,
}: SkillAccordionItemProps): ReactNode {
  const summary = skillSummaries[toSummaryKey(card.href) ?? ''];
  const paragraphs = summary?.length ? summary : [card.description];

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={(_event, expanded) => onToggle(expanded)}
      expandIcon={<ChevronDownIcon />}
      title={<span className={styles.title}>/{card.title}</span>}
      leadingAction={
        card.href ? (
          <ProvenanceIcon slug={card.href} provenanceMap={provenanceMap} className={styles.provenanceSlot} />
        ) : undefined
      }
      // A plain CSS-module class loses a specificity fight against MUI's own
      // emotion-injected Paper/Accordion styles (box-shadow, per-corner
      // border-radius) - sx resolves through the same styling pipeline MUI
      // itself uses, so it reliably wins instead.
      //
      // This list sits on FeatureFlowSection's detailPanelColor="info"
      // backdrop (pages/index.tsx), not a plain page background - so a
      // collapsed item stays fully transparent (the container's own tint is
      // its only background) while the expanded one inverts to solid
      // white/paper, standing out from it instead of blending in.
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
}

/** One original/lineage group: an optional heading plus its cards. Renders nothing for an empty group. */
function SkillAccordionGroup({
  heading,
  cards,
  expandedTitle,
  onToggle,
  skillSummaries,
  provenanceMap,
}: SkillAccordionGroupProps): ReactNode {
  if (cards.length === 0) return null;

  return (
    <div className={styles.group}>
      {heading && <p className={styles.groupHeading}>{heading}</p>}
      {cards.map((card) => (
        <SkillAccordionItem
          key={card.title}
          card={card}
          isExpanded={expandedTitle === card.title}
          onToggle={(isExpanded) => onToggle(card.title, isExpanded)}
          skillSummaries={skillSummaries}
          provenanceMap={provenanceMap}
        />
      ))}
    </div>
  );
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
 *
 * Splits into two visually distinct groups, "Original" then "From Matt
 * Pocock" (AlexRebula/skills#146): a stage's own skills are already sorted
 * original-then-lineage by `buildFlowSections`, but that order alone reads
 * as arbitrary without a heading marking where one group ends and the next
 * begins. A heading only earns its place once there's an actual boundary to
 * mark, so a stage that's entirely one kind renders with no heading at all,
 * exactly like before this split existed.
 */
export function FlowSkillAccordionList({
  item,
  skillSummaries = realSkillSummaries,
  provenanceMap = defaultProvenance as ProvenanceMap,
}: FlowSkillAccordionListProps): ReactNode {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const handleToggle = (title: string, isExpanded: boolean) => setExpandedTitle(isExpanded ? title : null);

  const [originalCards, lineageCards] = partitionByProvenance(item.highlightCards ?? [], provenanceMap);
  const showHeadings = originalCards.length > 0 && lineageCards.length > 0;

  return (
    <div className={styles.list}>
      <SkillAccordionGroup
        heading={showHeadings ? 'Original' : null}
        cards={originalCards}
        expandedTitle={expandedTitle}
        onToggle={handleToggle}
        skillSummaries={skillSummaries}
        provenanceMap={provenanceMap}
      />
      <SkillAccordionGroup
        heading={showHeadings ? 'From Matt Pocock' : null}
        cards={lineageCards}
        expandedTitle={expandedTitle}
        onToggle={handleToggle}
        skillSummaries={skillSummaries}
        provenanceMap={provenanceMap}
      />
    </div>
  );
}
