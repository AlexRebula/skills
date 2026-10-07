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
 * One flow-stage section. `skills` holds every skill in the stage's own
 * suggested order (FLOW_STAGES, site/sidebars.ts), which is the order to
 * number or list them in. `original` and `lineage` hold the same skills
 * split into "Original" (mine) and everything with real Matt Pocock lineage
 * (upstream/modified/inherited), each keeping that relative order, for a
 * view that groups them (issue #156).
 */
export interface FlowStageSection {
  label: string;
  /**
   * `true` when the stage's skills are listed in a suggested order (so a
   * consumer can number them and draw arrows between them), `false` when
   * they're a set to pick from. Set by hand per stage in `FLOW_STAGES`
   * (site/sidebars.ts), where every stage is `true`: the order is a
   * suggestion to the reader, not a fixed sequence. The `false` case stays
   * because the flag is the library's own contract; the every-stage rule is
   * a content rule on this repo's data (scripts/check-flow-stages.test.ts).
   */
  ordered: boolean;
  /** Every skill in the stage, in FLOW_STAGES order. */
  skills: FlowSkill[];
  /** The `skills` with no Matt Pocock lineage, in the same relative order. */
  original: FlowSkill[];
  /** The `skills` with Matt Pocock lineage, in the same relative order. */
  lineage: FlowSkill[];
}

export interface StageSkillRef {
  category: string;
  name: string;
}
