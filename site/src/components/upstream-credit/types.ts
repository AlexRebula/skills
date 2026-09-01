import type { ProvenanceMap } from '../../data/provenance.types';

export interface UpstreamCreditProps {
  /** The doc's permalink, e.g. "/engineering/create-giselle-component". */
  slug: string;
  /** Injectable for tests; defaults to the real build-time generated data. */
  provenanceMap?: ProvenanceMap;
}
