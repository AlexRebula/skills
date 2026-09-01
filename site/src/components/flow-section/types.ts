import type { FeatureFlowItem } from '@littlebranches/giselle-mui';

export interface FlowSectionProps {
  /** The flow-stage items to render — see `buildFeatureFlowItems` in `data/feature-flow-sections.ts`. */
  items: FeatureFlowItem[];
  /**
   * `FeatureFlowSectionProps.image` is required even though `renderRightPanel`
   * supplies the visible content (giselle-mui#188's known limitation: the
   * internal image-preload/prewarm hooks aren't undefined-safe yet) - this
   * placeholder is never rendered, just needs to resolve.
   */
  imageSrc: string;
}
