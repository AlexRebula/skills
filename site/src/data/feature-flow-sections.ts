import '../data/register-solar-icons';
import type { FeatureFlowHighlightCard, FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { FlowSkill, FlowStageSection } from './flow-sections.types';

/**
 * One-line blurb per flow stage, shown in the hovered row's right-panel
 * heading (see `feature-flow-sections.tsx`'s `renderRightPanel`). No
 * stage-level copy existed anywhere in the data model before this - only
 * `FLOW_STAGES`' bare `label` (`site/sidebars.ts`).
 */
export const FLOW_STAGE_DESCRIPTIONS: Record<string, string> = {
  'Start the day': 'Pick up where the last session left off before writing anything new.',
  'Shape it': 'Stress-test the idea and pin down the spec before code gets written.',
  'Build it': 'Scaffold, implement, and test-drive the actual feature.',
  'Words for the codebase': 'Name things well and write down decisions future readers will need.',
  'Land it': 'Commit, open the PR, and get it reviewed and merged.',
  'When it breaks': 'Triage, diagnose, and resolve the problem in front of you.',
  'Sweep for debt': 'Find and clear the debt a fast-moving codebase leaves behind.',
  'Run the wiki': 'Ingest, query, and keep a personal knowledge base honest.',
  'Close the session': 'Wrap up cleanly and hand off context to whoever picks this up next.',
  'Grow a contributor': "Turn a junior engineer's work into real, lasting skill.",
  'LittleBranches specifics': "The house rules and workflows specific to this org's own repos.",
  'Reach for on their own': 'Everything else worth having on hand, used less often but still useful.',
};

/**
 * One `FeatureFlowItem.icon` base name per flow stage, each reused from an
 * existing skill already in that stage (`SKILL_ICON_NAMES`,
 * `site/src/data/skill-icons.ts`) rather than a newly invented icon: every
 * name here is already extracted into `solar-icons.json` by
 * `scripts/generate-skill-icons.ts`, so no build-time regeneration is
 * needed to add a stage row here.
 */
const FLOW_STAGE_ICON_NAMES: Record<string, string> = {
  'Start the day': 'users-group-rounded',
  'Shape it': 'compass',
  'Build it': 'code-2',
  'Words for the codebase': 'pen-new-square',
  'Land it': 'send-square',
  'When it breaks': 'bug-minimalistic',
  'Sweep for debt': 'broom',
  'Run the wiki': 'magnifer',
  'Close the session': 'archive-check',
  'Grow a contributor': 'square-academic-cap',
  'LittleBranches specifics': 'shield-check',
  'Reach for on their own': 'tuning-4',
};

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function toHighlightCard(skill: FlowSkill): FeatureFlowHighlightCard {
  return {
    title: skill.name,
    description: skill.description,
    href: `/${skill.category}/${skill.name}`,
  };
}

/**
 * Maps `FlowStageSection[]` (already persona-filtered - see
 * `filterFlowSections`) into `FeatureFlowItem[]` for `FeatureFlowSection`:
 * one item per stage. Original and lineage skills flatten into a single
 * `highlightCards` carousel, original-then-lineage order, no visual divider
 * - the diff-viewing affordance those skills lose from the old
 * `SkillTimeline` footer isn't actually lost, just relocated to each
 * skill's own doc page (`ProvenanceButton` in `DocItem/Content`), which the
 * card's `href` already links to.
 */
export function buildFeatureFlowItems(flowSections: readonly FlowStageSection[]): FeatureFlowItem[] {
  return flowSections.map((section) => ({
    id: slugify(section.label),
    icon: `solar:${FLOW_STAGE_ICON_NAMES[section.label]}-bold-duotone`,
    title: section.label,
    description: FLOW_STAGE_DESCRIPTIONS[section.label] ?? '',
    highlightCards: [...section.original, ...section.lineage].map(toHighlightCard),
  }));
}
