import type { FileDiff, ProvenanceStatus } from './provenance.types';
import type { PersonaKey } from './personas.types';

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
  /**
   * Personas this skill belongs to, resolved via `personasForCategories`
   * (#174) from the skill's *full* category membership (`SkillEntry.categories`),
   * not just the single `category` bucket it's nested under for this stage.
   * Empty for a misc-only skill — the homepage filter (#176) treats an empty
   * array as "always visible", never as "matches nothing".
   */
  personas: PersonaKey[];
}

/**
 * One flow-stage section: skills split into "Original" (mine) first, then
 * everything with real Matt Pocock lineage (upstream/modified/inherited)
 * second - a physical re-sort, not just a color cue (issue #156).
 */
export interface FlowStageSection {
  label: string;
  /**
   * `true` when the stage's skills run as a fixed sequence (so a consumer
   * can number them and draw arrows between them), `false` when they're a
   * set to pick from. Set by hand per stage in `FLOW_STAGES`
   * (site/sidebars.ts): only a stage the docs call a fixed sequence is `true`.
   */
  ordered: boolean;
  original: FlowSkill[];
  lineage: FlowSkill[];
}

export interface StageSkillRef {
  category: string;
  name: string;
}
