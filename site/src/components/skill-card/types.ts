import type { FileDiff } from '../../data/provenance.types';

export type SkillCardColor = 'green' | 'amber' | 'blue' | 'purple';

/** The data a "modified" card needs to open its own DiffModal; absent for every other status. */
export interface SkillCardDiff {
  upstreamSha: string;
  files: FileDiff[];
}

export interface SkillCardProps {
  category: string;
  name: string;
  color: SkillCardColor;
  label: string;
  /** Present only for "modified" skills with a real diff to show; renders an in-card affordance that opens the DiffModal. */
  diff?: SkillCardDiff;
}
