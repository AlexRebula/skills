import type { FileDiff, ProvenanceStatus } from './provenance.types';

/** The data a "modified" skill's diff affordance needs; absent for every other status. */
export interface FlowSkillDiff {
  upstreamSha: string;
  files: FileDiff[];
}

/** One skill, positioned in its flow stage, carrying everything the homepage card needs to render. */
export interface FlowSkill {
  category: string;
  name: string;
  description: string;
  status: ProvenanceStatus;
  diff?: FlowSkillDiff;
}

/**
 * One flow-stage section: skills split into "Original" (mine) first, then
 * everything with real Matt Pocock lineage (upstream/modified/inherited)
 * second - a physical re-sort, not just a color cue (issue #156).
 */
export interface FlowStageSection {
  label: string;
  original: FlowSkill[];
  lineage: FlowSkill[];
}

export interface StageSkillRef {
  category: string;
  name: string;
}
