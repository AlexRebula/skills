import type { ProvenanceStatus } from './provenance.types';
import type { SkillCardColor } from '../components/skill-card/types';

/**
 * The single source of truth for how a provenance status is badged and
 * colored on the landing page: consumed by `SkillCard`, `ProvenanceButton`,
 * and the flow-stage rendering components. Before this module existed, the
 * badge label strings were hand-copied into `ProvenanceButton`'s own `LABEL`
 * map and `index.tsx`'s `SKILL_CARD_CONFIG` independently (issue #156 rework
 * item 1) — three of the four statuses were byte-identical strings drifting
 * apart with no shared source.
 */
export const PROVENANCE_CARD_COLOR: Record<ProvenanceStatus, SkillCardColor> = {
  original: 'green',
  inherited: 'amber',
  upstream: 'blue',
  modified: 'purple',
};

export const PROVENANCE_BADGE_LABEL: Record<ProvenanceStatus, string> = {
  original: 'AlexRebula Original.',
  inherited: 'Inherited from Matt Pocock',
  upstream: 'Upstream - Unchanged',
  modified: 'Modified from Matt Pocock',
};
