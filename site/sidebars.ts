import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { ROUTER_SKILL, type SkillRef } from './src/data/router-skill';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// @docusaurus/plugin-content-docs doesn't publicly export its own sidebar-item
// type (only the top-level SidebarsConfig), so it's derived from that rather
// than reaching into the package's internal (unexported, unstable) types
// module just for a more precise annotation.
type SidebarItemList = Extract<SidebarsConfig[keyof SidebarsConfig], unknown[]>;
type SidebarItem = SidebarItemList[number];

// SkillRef (one skill's (category, name) pair) and ROUTER_SKILL live in
// ./src/data/router-skill.ts, not here: Docusaurus's sidebar-file loader
// breaks if this file carries a second named export alongside FLOW_STAGES
// (confirmed by bisection while fixing #155 - exporting ROUTER_SKILL
// directly from this file made the loader misparse it, throwing "Invalid
// sidebar items collection" at build time). FLOW_STAGES itself is fine to
// export - only ROUTER_SKILL triggered it - but keeping both skill-data
// exports in the same place avoids relying on that asymmetry staying true
// across Docusaurus versions.

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
    { category: 'engineering', name: 'ask-alex' },
    { category: 'daily-workflow', name: 'standup-prep' },
    { category: 'daily-workflow', name: 'standup-prep-preflight' },
    { category: 'daily-workflow', name: 'check-prior-work' },
    { category: 'daily-workflow', name: 'load-session-context' },
    { category: 'daily-workflow', name: 'load-session-guidelines' },
  ]),
  stage('Shape it', [
    { category: 'thinking-tools', name: 'grill-me' },
    { category: 'engineering', name: 'grill-with-docs' },
    { category: 'thinking-tools', name: 'grilling' },
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
    { category: 'engineering', name: 'implement-tickets' },
    { category: 'engineering', name: 'tdd' },
    { category: 'engineering', name: 'prototype' },
    { category: 'engineering', name: 'wizard' },
    { category: 'framework', name: 'create-react-component' },
    { category: 'framework', name: 'create-vue-component' },
    { category: 'framework', name: 'create-angular-component' },
    { category: 'framework', name: 'migrate-react-subcomponent' },
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
    { category: 'git', name: 'pr-merged' },
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
    { category: 'git', name: 'sync-status' },
    { category: 'git', name: 'sync-down' },
  ]),
  stage('Run the wiki', [
    { category: 'wiki', name: 'ingest' },
    { category: 'wiki', name: 'query' },
    { category: 'wiki', name: 'wiki-lint' },
    { category: 'wiki', name: 'extract-quotes' },
    { category: 'wiki', name: 'extract-vocabulary' },
    { category: 'wiki', name: 'rebuild-root-index' },
    { category: 'wiki', name: 'log-incident' },
    { category: 'wiki', name: 'archive-file' },
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
    { category: 'org', name: 'migrate-giselle-subcomponent' },
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
