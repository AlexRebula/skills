import type { FeatureFlowItem } from '@littlebranches/giselle-mui';
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
