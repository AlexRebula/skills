import type { FileDiff, ProvenanceMap, ProvenanceStatus } from './provenance.types';
import { getProvenanceEntry } from './provenance.utils';
import type { SkillsLandingData } from './skills-landing.types';

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

interface StageSkillRef {
  category: string;
  name: string;
}

/**
 * Statuses that count as "real Matt Pocock lineage" for the lineage
 * sub-list, per #156's grilled decision: upstream/modified/inherited
 * together, everything that isn't a from-scratch original.
 */
const LINEAGE_STATUSES: ReadonlySet<ProvenanceStatus> = new Set(['upstream', 'modified', 'inherited']);

/**
 * Reads one stage's doc ids ("category/name") back out of its Docusaurus
 * sidebar item shape (see site/sidebars.ts's `stage()`/`skillItem()`).
 * Stages only ever nest flat `{type:'doc'}` items (no sub-categories), so
 * this doesn't need the general recursive tree walk
 * scripts/check-flow-stages.ts uses to validate the whole sidebar - just
 * one flat `items` array per stage.
 */
function stageSkillRefs(items: unknown): StageSkillRef[] {
  if (!Array.isArray(items)) return [];

  const refs: StageSkillRef[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if (!('type' in item) || item.type !== 'doc' || !('id' in item)) continue;

    const id = String((item as { id: unknown }).id);
    const slash = id.indexOf('/');
    if (slash === -1) continue;

    refs.push({ category: id.slice(0, slash), name: id.slice(slash + 1) });
  }
  return refs;
}

/**
 * "category/name" -> the skill's landing-page description, read from
 * skills-landing.json's per-category nesting. A skill can be nested under
 * more than one category bucket for multi-category membership (see
 * `SkillEntry`'s own doc comment), so the lookup key must include the exact
 * category FLOW_STAGES assigned that skill to, not just its bare name.
 */
function buildDescriptionLookup(landing: SkillsLandingData): Map<string, string> {
  const lookup = new Map<string, string>();
  for (const category of landing.categories) {
    for (const skill of category.skills) {
      lookup.set(`${category.key}/${skill.name}`, skill.description);
    }
  }
  return lookup;
}

/**
 * Regroups `FLOW_STAGES` (the routing config in site/sidebars.ts) by real
 * skill metadata (skills-landing.json, provenance.json) for the homepage:
 * one section per stage, in stage order, each split into "Original" then
 * "Matt-lineage" sub-lists (issue #156). Pure/no React, so the grouping
 * logic is unit-testable without mounting the page. `flowStages` is typed
 * `unknown` (rather than importing FLOW_STAGES's own type) so tests can
 * pass small fixtures the same way scripts/check-flow-stages.ts's own
 * `checkFlowStagesCoverage` does.
 */
export function buildFlowSections(
  flowStages: unknown,
  landing: SkillsLandingData,
  provenanceMap: ProvenanceMap,
): FlowStageSection[] {
  const descriptions = buildDescriptionLookup(landing);
  if (!Array.isArray(flowStages)) return [];

  return flowStages.map((stageItem): FlowStageSection => {
    const label =
      stageItem && typeof stageItem === 'object' && 'label' in stageItem && typeof stageItem.label === 'string'
        ? stageItem.label
        : '';
    const items = stageItem && typeof stageItem === 'object' && 'items' in stageItem ? stageItem.items : undefined;

    const original: FlowSkill[] = [];
    const lineage: FlowSkill[] = [];

    for (const ref of stageSkillRefs(items)) {
      const key = `${ref.category}/${ref.name}`;
      const description = descriptions.get(key);
      // A stage entry with no matching landing-data skill shouldn't happen
      // in practice (scripts/check-flow-stages.ts guards FLOW_STAGES itself
      // against exactly this drift), but skip defensively rather than
      // rendering a card with no real content.
      if (description === undefined) continue;

      const provenanceEntry = getProvenanceEntry(key, provenanceMap);
      const status = provenanceEntry?.status ?? 'original';
      const diff: FlowSkillDiff | undefined =
        provenanceEntry?.status === 'modified' && provenanceEntry.diffs && provenanceEntry.diffs.length > 0
          ? { upstreamSha: provenanceEntry.upstreamSha ?? '', files: provenanceEntry.diffs }
          : undefined;

      const skill: FlowSkill = { category: ref.category, name: ref.name, description, status, diff };
      (LINEAGE_STATUSES.has(status) ? lineage : original).push(skill);
    }

    return { label, original, lineage };
  });
}
