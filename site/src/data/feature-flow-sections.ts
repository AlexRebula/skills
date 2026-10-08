import '../data/register-solar-icons';
import type { FeatureFlowHighlightCard, FeatureFlowItem } from '@littlebranches/giselle-mui';
import type { FlowSkill, FlowStageSection } from './flow-sections.types';

/**
 * One-line blurb per flow stage, shown in the hovered row's right-panel
 * heading (see `pages/index.tsx`'s `renderRightPanel` prop). No stage-level
 * copy existed anywhere in the data model before this - only `FLOW_STAGES`'
 * bare `label` (`site/sidebars.ts`).
 */
export const FLOW_STAGE_DESCRIPTIONS: Record<string, string> = {
  'Start the day': 'Pick up where the last session left off before writing anything new.',
  'Shape it': 'Stress-test the idea and pin down the spec before you write code.',
  'Build it': 'Scaffold, implement, and test-drive the feature.',
  'Words for the codebase': 'Name things well and write down decisions future readers will need.',
  'Land it': 'Commit, open the PR, and get it reviewed and merged.',
  'When it breaks': 'Triage, diagnose, and resolve the problem in front of you.',
  'Sweep for debt': 'Find and clear the debt a fast-moving codebase leaves behind.',
  'Run the wiki': 'Ingest, query, and keep a personal knowledge base honest.',
  'Close the session': 'Wrap up cleanly and hand off context to whoever picks this up next.',
  'Grow a contributor': "Turn a junior engineer's work into real, lasting skill.",
  'LittleBranches specifics': "The house rules and workflows specific to this org's own repos.",
  'Reach for on their own':
    'Everything else worth having on hand, used less often but still useful.',
};

/**
 * A longer, multi-sentence description per flow stage, shown in the
 * expanded detail panel (`FeatureFlowItem.longDescription`, falls back to
 * `description` when unset - see `FeatureFlowItemDetail`'s own doc comment).
 * Distinct from `FLOW_STAGE_DESCRIPTIONS`'s one-liner, which stays the short
 * blurb shown in the row itself and the hover panel.
 */
export const FLOW_STAGE_LONG_DESCRIPTIONS: Record<string, string> = {
  'Start the day':
    "Every session starts by re-establishing context, not by writing code. This stage surfaces what's already been done, what's still open, and what state your repos are actually in, including dirty files, open PRs, and prior session notes, before you touch anything new. The five skills here run as a fixed sequence: preflight loads context, then a repo-wide sweep, then a morning brief you can act on immediately.",
  'Shape it':
    "Before you write code, you pressure-test the idea. This stage covers interview-style skills that surface assumptions, force a decision tree into the open, and turn a rough plan into a written spec or a set of tickets ready for implementation. The goal isn't speed. It's catching the wrong assumption while it's still cheap to fix.",
  'Build it':
    'The implementation work: scaffolding a new component, building a feature test-first, or prototyping a design question before committing to an approach. `/implement` fetches a tracked ticket directly and builds it, deferring to a ticket-specified build skill when one is named; `/tdd` and the framework-specific `/create-*` skills carry the red-green-refactor discipline through to the end.',
  'Words for the codebase':
    'Code communicates as much through its names and structure as through what it executes. This stage is about the vocabulary of a codebase: designing deep modules with the right seams, building and sharpening a shared domain model, and writing documentation an AI agent, not just a human, can act on.',
  'Land it':
    "Getting finished work merged: committing cleanly, opening a well-formed PR, and working through review feedback until it's mergeable. `/wip-sweep` catches uncommitted work across every repo before it's lost; `/review-pr` and `/respond-pr-review` cover both sides of the review cycle.",
  'When it breaks':
    "Something is broken and you need to find out why before you can fix it. This stage covers triaging an incoming report, the diagnosis loop for a hard bug or performance regression, and resolving an in-progress merge or rebase conflict without losing anyone's work.",
  'Sweep for debt':
    "The maintenance work that a fast-moving codebase leaves behind: stale PRs waiting on review, dirty repos nobody's swept, prose that reads like it was never edited by a human, and architecture that's drifted from what the codebase needs. These skills are meant to run on a cadence, not just when something's on fire.",
  'Run the wiki':
    "Keeping a personal knowledge base current and honest: ingesting a new source, querying what's already been captured, health-checking the wiki for contradictions and stale claims, and logging behavioral incidents so the next session doesn't repeat the same mistake.",
  'Close the session':
    "Ending a session in a state the next one, yours or someone else's, can pick up from: a written wrap-up, a clean handoff document, uncommitted work captured before it's lost, and any task-tracker sync kept current rather than left to drift.",
  'Grow a contributor':
    "Mentoring is a distinct skill from doing the work yourself. This stage is about growing a junior engineer's or apprentice's own contribution: auditing an issue before handing it off, tracking what a learner has already tried, picking the next issue that stretches them, and teaching a concept in a way that sticks.",
  'LittleBranches specifics':
    "House rules specific to the LittleBranches organisation's own repos: giselle-mui's own component-scaffolding conventions, its test-quality bar, its PR review workflow, and the org-wide quality standards and critical-path context every session there should load first.",
  'Reach for on their own':
    "A grab-bag of skills tied to one person's own setup or used rarely enough that they're not part of the daily flow above: redacting sensitive data, an ultra-compressed communication mode, guardrails against destructive git commands, and a handful of narrow one-off migrations and scaffolds. Kept around because they're still useful, not because they're used every day.",
};

/**
 * One sentence (about 110 characters) per flow stage: what the flow is, who
 * it is for, and what its skills achieve. Distinct from
 * `FLOW_STAGE_DESCRIPTIONS`' blurb (the row's own heading) and
 * `FLOW_STAGE_LONG_DESCRIPTIONS`' detail prose. The two catch-all stages
 * describe their reader plainly rather than naming a persona.
 */
export const FLOW_STAGE_SUMMARIES: Record<string, string> = {
  'Start the day':
    'For anyone opening a work session: skills that reload prior notes and repo state into one brief to act on.',
  'Shape it':
    'For anyone with a rough idea: skills that interview you, then turn the answers into a spec and tickets.',
  'Build it':
    'For developers writing a feature: skills that scaffold components and build them test-first from a ticket.',
  'Words for the codebase':
    'For teams that want a readable codebase: skills that sharpen names, module seams and recorded decisions.',
  'Land it':
    'For developers shipping finished work: skills that commit cleanly, open the PR and carry it through review.',
  'When it breaks':
    'For whoever is facing a bug: skills that triage the report, find the cause and untangle merge conflicts.',
  'Sweep for debt':
    'For maintainers of a busy codebase: skills that find stale PRs, dirty repos and sloppy prose, then clear them.',
  'Run the wiki':
    'For anyone keeping a personal wiki: skills that ingest sources, answer from them and flag stale claims.',
  'Close the session':
    'For anyone ending a work session: skills that write the wrap-up and save loose work for whoever is next.',
  'Grow a contributor':
    'For mentors of a junior engineer: skills that vet issues, track progress and teach so lessons stick.',
  'LittleBranches specifics':
    'For people working in LittleBranches repos: skills that apply its component, test and review conventions.',
  'Reach for on their own':
    'For anyone with an occasional or personal need: skills that redact data, shorten replies and block risky git.',
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
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * `media` is set to a plain dark placeholder image for every card, rather
 * than left unset: `FeatureFlowHighlightCarousel`'s scrim/text color
 * (`channelAlpha(COMMON_BLACK_CHANNEL/WHITE_CHANNEL, ...)`) depends on MUI
 * CSS-var channel tokens `GiselleThemeProvider`'s theme preset doesn't
 * currently emit (giselle-mui bug, same class as #185 - filed upstream), so
 * the scrim itself renders fully transparent under this site's theme. A
 * real (if generic) dark image behind the text restores contrast
 * independently of that scrim bug.
 *
 * `description` stays the skill's short one-line landing-page blurb -
 * this is also what `FlowStageHoverPanel` (`renderRightPanel`) shows next
 * to each skill as soon as its stage is active, so it has to stay short.
 * `FlowSkillAccordionList` (`renderHighlightPanel`) sources its own, longer
 * per-skill deep-dive independently (`scripts/generate-skill-summaries.ts`,
 * looked up there by this card's own `href`), rather than overloading this
 * field with two different lengths for two different consumers.
 */
function toHighlightCard(skill: FlowSkill, skillCardMediaSrc: string): FeatureFlowHighlightCard {
  return {
    title: skill.name,
    description: skill.description,
    href: `/${skill.category}/${skill.name}`,
    media: skillCardMediaSrc,
  };
}

/**
 * Falls back to a generic icon rather than a literal "undefined" glyph name
 * if a stage is ever added here without one. Reuses `widget-4`
 * (`framework/create-giselle-component` in `SKILL_ICON_NAMES`) since it's
 * already bundled into `solar-icons.json` - no icon base name should be
 * introduced here that isn't already extracted by `generate-skill-icons.ts`.
 */
const FALLBACK_ICON_NAME = 'widget-4';

/**
 * `FeatureFlowItem` plus the stage `summary`. The installed library's
 * `FeatureFlowItem` has no `summary` field yet, so it is carried alongside
 * here (and on into the generated snapshot) instead of widening the library's
 * type; once the library ships the optional field this collapses to
 * `FeatureFlowItem`.
 */
export type FlowStageItem = FeatureFlowItem & { summary: string };

/**
 * Maps `FlowStageSection[]` (already persona-filtered - see
 * `filterFlowSections`) into `FeatureFlowItem[]` for `FeatureFlowSection`:
 * one item per stage. Each stage's `highlightCards` follow its `skills` in
 * FLOW_STAGES order (the stage's suggested order, so a consumer that numbers
 * them numbers that sequence), original and lineage skills interleaved as
 * the stage lists them, no visual divider (a view that groups them, like
 * `FlowSkillAccordionList`, partitions the cards itself). The diff-viewing
 * affordance those skills lose from the old `SkillTimeline` footer isn't
 * actually lost, just relocated to each skill's own doc page
 * (`ProvenanceButton` in `DocItem/Content`), which the card's `href` already
 * links to. `skillCardMediaSrc` is the base-url-resolved backdrop image
 * (`useBaseUrl` is a hook, so the caller resolves it and passes the plain
 * string in - this module has no component to call it from).
 */
export function buildFeatureFlowItems(
  flowSections: readonly FlowStageSection[],
  skillCardMediaSrc: string
): FlowStageItem[] {
  return flowSections.map((section) => ({
    id: slugify(section.label),
    icon: `solar:${FLOW_STAGE_ICON_NAMES[section.label] ?? FALLBACK_ICON_NAME}-bold-duotone`,
    title: section.label,
    description: FLOW_STAGE_DESCRIPTIONS[section.label] ?? '',
    longDescription: FLOW_STAGE_LONG_DESCRIPTIONS[section.label],
    summary: FLOW_STAGE_SUMMARIES[section.label] ?? '',
    highlightCards: section.skills.map((skill) => toHighlightCard(skill, skillCardMediaSrc)),
  }));
}
