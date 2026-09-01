import type { ProvenanceMap } from '../../data/provenance.types';

export interface ProvenanceIconProps {
  /** The doc's permalink, e.g. "/engineering/create-giselle-component". */
  slug: string;
  /** Injectable for tests; defaults to the real build-time generated data. */
  provenanceMap?: ProvenanceMap;
  /** Placement (spacing, alignment) is the caller's concern - a bare icon on its own line under a description needs different layout than one inline in an accordion's title row. */
  className?: string;
}
