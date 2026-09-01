import type { FeatureFlowHighlightCard, FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { ProvenanceMap } from '../../data/provenance.types';

/** "category/name" -> that skill's own "## What it does" paragraphs (scripts/generate-skill-summaries.ts). */
export type SkillSummaries = Record<string, readonly string[]>;

export interface FlowSkillAccordionListProps {
  item: FeatureFlowItem;
  /** Defaults to the real generated data; tests inject a fixture instead. */
  skillSummaries?: SkillSummaries;
  /** Forwarded to each card's `ProvenanceButton`. Defaults to the real generated data; tests inject a fixture instead. */
  provenanceMap?: ProvenanceMap;
}

export interface SkillAccordionItemProps {
  card: FeatureFlowHighlightCard;
  isExpanded: boolean;
  onToggle: (isExpanded: boolean) => void;
  skillSummaries: SkillSummaries;
  provenanceMap: ProvenanceMap;
}

export interface SkillAccordionGroupProps {
  /** Rendered above the group's cards when non-null; the "Original"/"From Matt Pocock" boundary only earns a heading once both groups are non-empty (see FlowSkillAccordionList's showHeadings). */
  heading: string | null;
  cards: readonly FeatureFlowHighlightCard[];
  expandedTitle: string | null;
  onToggle: (title: string, isExpanded: boolean) => void;
  skillSummaries: SkillSummaries;
  provenanceMap: ProvenanceMap;
}
