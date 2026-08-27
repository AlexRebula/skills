import type { ProvenanceMap, ProvenanceStatus } from './provenance.types';
import { getProvenanceEntry } from './provenance.utils';
import type { SkillsLandingData } from './skills-landing.types';
import { extractDocIds } from './sidebar-tree';
import type { FlowSkill, FlowSkillDiff, FlowStageSection, StageSkillRef } from './flow-sections.types';

/**
 * Statuses that count as "real Matt Pocock lineage" for the lineage
 * sub-list, per #156's grilled decision: upstream/modified/inherited
 * together, everything that isn't a from-scratch original.
 */
const LINEAGE_STATUSES: ReadonlySet<ProvenanceStatus> = new Set(['upstream', 'modified', 'inherited']);

/**
 * Reads one stage's doc ids ("category/name") back out of its Docusaurus
 * sidebar item shape (see site/sidebars.ts's `stage()`/`skillItem()`), via
 * the shared recursive walker (`extractDocIds`) so a nested stage item is
 * never silently dropped.
 */
function stageSkillRefs(items: unknown): StageSkillRef[] {
  const refs: StageSkillRef[] = [];
  for (const id of extractDocIds(items)) {
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
