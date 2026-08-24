import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

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

function skillItem({ category, name }: SkillRef) {
  return { type: 'doc' as const, id: `${category}/${name}`, label: name };
}

function stage(label: string, skills: SkillRef[]) {
  return {
    type: 'category' as const,
    label,
    items: skills.map(skillItem),
  };
}

// Mirrors docs/overview.md's own stage breakdown exactly (see that page for
// the prose reasoning behind each grouping). Kept as a second, independent
// listing rather than generated from the prose: this is a routing config,
// not a place to parse markdown out of a narrative page.
const FLOW_STAGES = [
  stage('Start the day', [
    { category: 'productivity', name: 'standup-prep' },
    { category: 'productivity', name: 'standup-prep-preflight' },
    { category: 'productivity', name: 'check-prior-work' },
    { category: 'productivity', name: 'load-session-context' },
    { category: 'productivity', name: 'load-session-guidelines' },
  ]),
  stage('Shape it', [
    { category: 'productivity', name: 'grill-me' },
    { category: 'productivity', name: 'grilling' },
    { category: 'engineering', name: 'grill-with-docs' },
    { category: 'productivity', name: 'wait-what' },
    { category: 'productivity', name: 'to-questionnaire' },
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
    { category: 'productivity', name: 'writing-for-agents' },
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
    { category: 'productivity', name: 'ingest' },
    { category: 'productivity', name: 'query' },
    { category: 'productivity', name: 'wiki-lint' },
    // extract-quotes deliberately excluded: it has no docs/productivity/extract-quotes.md
    // yet (a pre-existing gap check-docs-completeness.ts already flags, unrelated to
    // this ticket's scope), so there's no real doc for a sidebar entry to point at.
    { category: 'productivity', name: 'extract-vocabulary' },
    { category: 'productivity', name: 'rebuild-root-index' },
    { category: 'productivity', name: 'log-incident' },
  ]),
  stage('Close the session', [
    { category: 'productivity', name: 'session-wrap' },
    { category: 'productivity', name: 'handoff' },
    { category: 'productivity', name: 'collapse-session-folder' },
    { category: 'productivity', name: 'extract-session-worktree' },
    { category: 'productivity', name: 'resolve-ai-paths' },
    { category: 'productivity', name: 'capture' },
    { category: 'productivity', name: 'sync' },
    { category: 'productivity', name: 'asana-sync' },
  ]),
  stage('Grow a contributor', [
    { category: 'productivity', name: 'audit-issue' },
    { category: 'productivity', name: 'learner-history' },
    { category: 'productivity', name: 'next-issue' },
    { category: 'productivity', name: 'teach' },
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

// The Flow: docs/overview.md first, then every stage, then the router
// called out on its own (ask-matt points into all of the above; it isn't a
// step inside any one of them, so it isn't nested in a stage). Pinned above
// the autogenerated per-bucket categories below, which render exactly as
// they always have: this only adds a second way to reach the same docs.
const FLOW_SECTION = {
  type: 'category' as const,
  label: 'The Flow',
  link: { type: 'doc' as const, id: 'overview' },
  collapsed: false,
  items: [...FLOW_STAGES, skillItem({ category: 'engineering', name: 'ask-matt' })],
};

// Autogenerated from the docs/ folder structure (configured via the docs
// plugin's `path: '../docs'`). Category folders get their labels/order from
// their own `_category_.json` files. Only categories that contain at least
// one page render — new pages from future content tickets show up here with
// no sidebar edits needed.
const sidebars: SidebarsConfig = {
  skillsSidebar: [FLOW_SECTION, { type: 'autogenerated', dirName: '.' }],
};

export default sidebars;
