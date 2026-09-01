// One skill's (category, name) pair. Duplicated from sidebars.ts's own
// private SkillRef rather than imported: sidebars.ts can't export anything
// beyond its default sidebars config without breaking Docusaurus's
// sidebar-file loader (confirmed by bisection while fixing #155 - adding
// `export` to a second named export there makes the loader misparse the
// whole file, throwing "Invalid sidebar items collection" at build time).
export interface SkillRef {
  category: string;
  name: string;
}

// The one skill deliberately excluded from FLOW_STAGES (site/sidebars.ts):
// ask-matt is a router over the whole set (see docs/overview.md's "The
// router" section), not a step inside any one stage, so it's called out on
// its own in sidebars.ts instead of nested in a stage. Lives here, not in
// sidebars.ts itself, for the loader reason above - this is the one place
// both sidebars.ts and check-flow-stages.ts can safely import it from.
export const ROUTER_SKILL: SkillRef = { category: 'engineering', name: 'ask-matt' };
