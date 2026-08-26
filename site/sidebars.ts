import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// @docusaurus/plugin-content-docs doesn't publicly export its own sidebar-item
// type (only the top-level SidebarsConfig), so it's derived from that rather
// than reaching into the package's internal (unexported, unstable) types
// module just for a more precise annotation.
type SidebarItemList = Extract<SidebarsConfig[keyof SidebarsConfig], unknown[]>;
type SidebarItem = SidebarItemList[number];

// One skill's (category, name) pair, kept as data rather than typing out
// `{ type: 'doc', id: '<category>/<name>', label: '<name>' }` by hand ~76
// times below: Docusaurus validates every id against a real doc at build
// time (onBrokenLinks: 'throw' in docusaurus.config.ts), so a typo here
// fails loudly rather than silently, the same safety net the handwritten
// form would have had.
interface SkillRef {
  category: string;
  name: string;
}

function skillItem({ category, name }: SkillRef): SidebarItem {
  return { type: 'doc', id: `${category}/${name}`, label: name };
}

function stage(label: string, skills: SkillRef[]): SidebarItem {
  return {
    type: 'category',
    label,
    items: skills.map(skillItem),
  };
}

// Mirrors docs/overview.md's own stage breakdown exactly (see that page for
// the prose reasoning behind each grouping). Kept as a second, independent
// listing rather than generated from the prose: this is a routing config,
// not a place to parse markdown out of a narrative page.
//
// Exported so a test can walk it and assert it covers every real docs page
// exactly once (see check-flow-stages.test.ts) - the whole point of this
// list is exhaustive, non-redundant coverage, and that's easy to silently
// drift out of sync as skills get added, renamed, or re-categorised.
export const FLOW_STAGES = [
  stage('Start the day', [
    { category: 'daily-workflow', name: 'standup-prep' },
    { category: 'daily-workflow', name: 'standup-prep-preflight' },
    { category: 'daily-workflow', name: 'check-prior-work' },
    { category: 'daily-workflow', name: 'load-session-context' },
    { category: 'daily-workflow', name: 'load-session-guidelines' },
  ]),
  stage('Shape it', [
    { category: 'thinking-tools', name: 'grill-me' },
    { category: 'thinking-tools', name: 'grilling' },
    { category: 'engineering', name: 'grill-with-docs' },
    { category: 'thinking-tools', name: 'wait-what' },
    { category: 'thinking-tools', name: 'to-questionnaire' },
    { category: 'engineering', name: 'to-spec' },
    { category: 'engineering', name: 'to-tickets' },
    { category: 'engineering', name: 'wayfinder' },
  ]),
  stage('Build it', [
    { category: 'engineering', name: 'setup-engineering-skills' },
    { category: 'engineering', name: 'start-issue' },
    { category: 'engineering', name: 'implement' },
    { category: 'engineering', name: 'tdd' },
    { category: 'engineering', name: 'prototype' },
    { category: 'engineering', name: 'wizard' },
    { category: 'framework', name: 'create-react-component' },
    { category: 'framework', name: 'create-vue-component' },
    { category: 'framework', name: 'create-angular-component' },
  ]),
  stage('Words for the codebase', [
    { category: 'engineering', name: 'codebase-design' },
    { category: 'engineering', name: 'domain-modeling' },
    { category: 'engineering', name: 'writing-for-agents' },
  ]),
  stage('Land it', [
    { category: 'git', name: 'commit-wip' },
    { category: 'git', name: 'wip-sweep' },
    { category: 'git', name: 'create-pr' },
    { category: 'git', name: 'review-pr' },
    { category: 'git', name: 'respond-pr-review' },
    { category: 'git', name: 'sync-branches' },
  ]),
  stage('When it breaks', [
    { category: 'engineering', name: 'triage' },
    { category: 'engineering', name: 'diagnosing-bugs' },
    { category: 'engineering', name: 'resolving-merge-conflicts' },
  ]),
  stage('Sweep for debt', [
    { category: 'engineering', name: 'improve-codebase-architecture' },
    { category: 'engineering', name: 'research' },
    { category: 'engineering', name: 'deslopify' },
    { category: 'git', name: 'morning-pr-sweep' },
    { category: 'git', name: 'open-pr-sweep' },
    { category: 'git', name: 'repo-status' },
    { category: 'git', name: 'query-issues' },
  ]),
  stage('Run the wiki', [
    { category: 'wiki', name: 'ingest' },
    { category: 'wiki', name: 'query' },
    { category: 'wiki', name: 'wiki-lint' },
    { category: 'wiki', name: 'extract-quotes' },
    { category: 'wiki', name: 'extract-vocabulary' },
    { category: 'wiki', name: 'rebuild-root-index' },
    { category: 'wiki', name: 'log-incident' },
  ]),
  stage('Close the session', [
    { category: 'daily-workflow', name: 'session-wrap' },
    { category: 'daily-workflow', name: 'handoff' },
    { category: 'daily-workflow', name: 'collapse-session-folder' },
    { category: 'daily-workflow', name: 'extract-session-worktree' },
    { category: 'daily-workflow', name: 'resolve-ai-paths' },
    { category: 'daily-workflow', name: 'capture' },
    { category: 'daily-workflow', name: 'sync' },
    { category: 'daily-workflow', name: 'asana-sync' },
  ]),
  stage('Grow a contributor', [
    { category: 'mentoring', name: 'audit-issue' },
    { category: 'mentoring', name: 'learner-history' },
    { category: 'mentoring', name: 'next-issue' },
    { category: 'mentoring', name: 'teach' },
  ]),
  stage('LittleBranches specifics', [
    { category: 'org', name: 'create-giselle-component' },
    { category: 'org', name: 'audit-giselle-tests' },
    { category: 'org', name: 'respond-giselle-pr-review' },
    { category: 'org', name: 'load-oss-standards' },
    { category: 'org', name: 'load-dependency-chain' },
    { category: 'org', name: 'sync-roadmap' },
  ]),
  stage('Reach for on their own', [
    { category: 'personal', name: 'anonimise' },
    { category: 'personal', name: 'caveman' },
    { category: 'personal', name: 'edit-article' },
    { category: 'personal', name: 'obsidian-vault' },
    { category: 'misc', name: 'git-guardrails-claude-code' },
    { category: 'misc', name: 'karpathy-guidelines' },
    { category: 'misc', name: 'migrate-to-shoehorn' },
    { category: 'misc', name: 'scaffold-exercises' },
    { category: 'misc', name: 'setup-pre-commit' },
  ]),
];

// The one skill deliberately excluded from FLOW_STAGES: ask-matt is a router
// over the whole set (see docs/overview.md's "The router" section), not a
// step inside any one stage, so it's called out on its own below instead of
// nested in a stage. Named and exported (rather than inlined where it's
// used) so check-flow-stages.test.ts can assert this is the *only* real
// docs page FLOW_STAGES doesn't cover, instead of hardcoding a second,
// disconnected copy of the same exception.
export const ROUTER_SKILL: SkillRef = { category: 'engineering', name: 'ask-matt' };

// The Flow: docs/overview.md as an explicit first row (not just a link
// attached to the category header, which a reader could easily miss is
// clickable), then every stage, then the router called out on its own.
// Pinned above the autogenerated per-bucket categories below, which render
// exactly as they always have: this only adds a second way to reach the
// same docs.
const FLOW_SECTION: SidebarItem = {
  type: 'category',
  label: 'The Flow',
  collapsed: false,
  items: [
    { type: 'doc', id: 'overview', label: 'Overview' },
    ...FLOW_STAGES,
    skillItem(ROUTER_SKILL),
  ],
};

// Autogenerated from the docs/ folder structure (configured via the docs
// plugin's `path: '../docs'`). Category folders get their labels/order from
// their own `_category_.json` files. Only categories that contain at least
// one page render. New pages from future content tickets show up here with
// no sidebar edits needed.
const sidebars: SidebarsConfig = {
  skillsSidebar: [FLOW_SECTION, { type: 'autogenerated', dirName: '.' }],
};

export default sidebars;
