import type { ProvenanceStatus } from './provenance.types';
import type { SkillCardColor } from '../components/skill-card/types';
import type { TimelineColor } from './skill-timeline-phases.types';

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

/**
 * Same status→color idea as `PROVENANCE_CARD_COLOR`, but expressed in
 * giselle-mui Timeline's own palette-key vocabulary (issue #157) rather than
 * `SkillCardColor`. MUI's `TimelineDot` only accepts its own theme palette
 * keys, so this can't reuse `PROVENANCE_CARD_COLOR`'s values directly. Chosen
 * to mirror the existing color language as closely as that palette allows:
 * green→success, amber→warning, blue→info, purple→secondary (matching
 * `ProvenanceButton`'s own `--portfolio-color-secondary` for "modified").
 */
export const PROVENANCE_TIMELINE_COLOR: Record<ProvenanceStatus, TimelineColor> = {
  original: 'success',
  inherited: 'warning',
  upstream: 'info',
  modified: 'secondary',
};
