import type { FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { ProvenanceMap } from '../../data/provenance.types';

export interface FlowStageHoverPanelProps {
  item: FeatureFlowItem;
  isExpanded: boolean;
  /** Forwarded to each card's `ProvenanceButton`. Defaults to the real generated data; tests inject a fixture instead. */
  provenanceMap?: ProvenanceMap;
}
