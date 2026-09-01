import type { ProvenanceMap, ProvenanceStatus } from './provenance.types';
import { getProvenanceEntry } from './provenance.utils';
import type { SkillsLandingData } from './skills-landing.types';
import { extractDocIds } from './sidebar-tree';
import { personasForCategories } from './personas';
import type { PersonaKey } from './personas.types';
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

/** The fields `buildSkillLookup` resolves per `"category/name"` key. */
interface SkillLookupEntry {
  description: string;
  /** The skill's *full* category membership (`SkillEntry.categories`), used to resolve
   * personas across every category it belongs to, not just the single stage bucket it's
   * nested under in `FLOW_STAGES`. */
  categories: readonly string[];
}

/**
 * "category/name" -> the skill's landing-page description and full category
 * membership, read from skills-landing.json's per-category nesting. A skill
 * can be nested under more than one category bucket for multi-category
 * membership (see `SkillEntry`'s own doc comment), so the lookup key must
 * include the exact category FLOW_STAGES assigned that skill to, not just
 * its bare name.
 */
function buildSkillLookup(landing: SkillsLandingData): Map<string, SkillLookupEntry> {
  const lookup = new Map<string, SkillLookupEntry>();
  for (const category of landing.categories) {
    for (const skill of category.skills) {
      lookup.set(`${category.key}/${skill.name}`, { description: skill.description, categories: skill.categories });
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
  const skillLookup = buildSkillLookup(landing);
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
      const entry = skillLookup.get(key);
      // A stage entry with no matching landing-data skill shouldn't happen
      // in practice (scripts/check-flow-stages.ts guards FLOW_STAGES itself
      // against exactly this drift), but skip defensively rather than
      // rendering a card with no real content.
      if (entry === undefined) continue;

      const provenanceEntry = getProvenanceEntry(key, provenanceMap);
      const status = provenanceEntry?.status ?? 'original';
      const diff: FlowSkillDiff | undefined =
        provenanceEntry?.status === 'modified' && provenanceEntry.diffs && provenanceEntry.diffs.length > 0
          ? { upstreamSha: provenanceEntry.upstreamSha ?? '', files: provenanceEntry.diffs }
          : undefined;

      const personas = personasForCategories(entry.categories);
      const skill: FlowSkill = {
        category: ref.category,
        name: ref.name,
        description: entry.description,
        status,
        diff,
        personas,
      };
      (LINEAGE_STATUSES.has(status) ? lineage : original).push(skill);
    }

    return { label, original, lineage };
  });
}

/**
 * A skill is visible under `activePersonas` when either no persona is
 * active (unfiltered-by-default, issue #176), the skill carries no persona
 * at all (a misc-only skill, always visible regardless of the filter), or
 * the skill's personas intersect the active set (multi-select union
 * semantics across active chips).
 */
function skillMatchesFilter(skill: FlowSkill, activePersonas: ReadonlySet<PersonaKey>): boolean {
  if (activePersonas.size === 0) return true;
  if (skill.personas.length === 0) return true;
  return skill.personas.some((persona) => activePersonas.has(persona));
}

/**
 * Narrows `flowSections` (already built by `buildFlowSections`) down to the
 * skills matching the active persona filter, per issue #176. A stage left
 * with zero matching skills in both sub-lists is dropped entirely, rather
 * than rendered with an empty body.
 */
export function filterFlowSections(
  flowSections: FlowStageSection[],
  activePersonas: ReadonlySet<PersonaKey>,
): FlowStageSection[] {
  if (activePersonas.size === 0) return flowSections;

  const filtered: FlowStageSection[] = [];
  for (const section of flowSections) {
    const original = section.original.filter((skill) => skillMatchesFilter(skill, activePersonas));
    const lineage = section.lineage.filter((skill) => skillMatchesFilter(skill, activePersonas));
    if (original.length === 0 && lineage.length === 0) continue;
    filtered.push({ label: section.label, original, lineage });
  }
  return filtered;
}
