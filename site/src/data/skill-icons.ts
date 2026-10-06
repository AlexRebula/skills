/**
 * Per-skill icon assignment: one distinct icon per skill, for the skill
 * summary cards on the landing page (see the `skill-card` component) and for
 * every consuming site that shows the skills, which syncs this file (a skill's
 * icon there, such as on the packages it puts on a FeatureFlow engine room's
 * belt). Add one here for every new skill. Maps each "<category>/<name>" slug to a
 * `solar` icon's base name (the `-bold-duotone` suffix and `solar:` prefix
 * are added at the call site).
 *
 * This file is the single source of truth for the mapping: `scripts/
 * generate-skill-icons.ts` reads it at build time to extract only these
 * icons' glyph data out of the full `@iconify-json/solar` set (7000+ icons)
 * into `solar-icons.json`, and the `SkillCard` component reads it at
 * render time to know which icon to request. Every name here must exist in
 * `@iconify-json/solar`'s `icons.json` — the generator fails loudly if one
 * doesn't, rather than silently rendering a blank icon.
 */
export const SKILL_ICON_NAMES: Record<string, string> = {
  'daily-workflow/standup-prep': 'sun-2',
  'daily-workflow/standup-prep-preflight': 'checklist-minimalistic',
  'daily-workflow/check-prior-work': 'history',
  'daily-workflow/load-session-context': 'folder-open',
  'daily-workflow/load-session-guidelines': 'book-bookmark',
  'daily-workflow/session-wrap': 'moon',
  'daily-workflow/collapse-session-folder': 'folder-2',
  'daily-workflow/extract-session-worktree': 'scissors',
  'daily-workflow/resolve-ai-paths': 'route',
  'daily-workflow/capture': 'lightbulb',
  'daily-workflow/sync': 'restart',
  'daily-workflow/asana-sync': 'calendar-mark',

  'engineering/ask-alex': 'question-circle',
  'engineering/grill-with-docs': 'notebook',
  'engineering/to-spec': 'document-text',
  'engineering/to-tickets': 'ticket',
  'engineering/wayfinder': 'map',
  'engineering/implement-tickets': 'list-check',
  'engineering/setup-engineering-skills': 'settings',
  'engineering/implement': 'code-square',
  'engineering/tdd': 'test-tube',
  'engineering/prototype': 'ruler-cross-pen',
  'engineering/wizard': 'magic-stick',
  'engineering/codebase-design': 'layers',
  'engineering/domain-modeling': 'book-2',
  'engineering/writing-for-agents': 'pen-new-round',
  'engineering/triage': 'sort-vertical',
  'engineering/diagnosing-bugs': 'bug',
  'engineering/resolving-merge-conflicts': 'branching-paths-down',
  'engineering/deslopify': 'eraser',
  'engineering/improve-codebase-architecture': 'buildings-2',
  'engineering/research': 'magnifer',

  'thinking-tools/grill-me': 'chat-round-dots',
  'thinking-tools/grilling': 'dialog-2',
  'thinking-tools/wait-what': 'chat-round-unread',
  'thinking-tools/to-questionnaire': 'clipboard-list',

  'framework/create-react-component': 'atom',
  'framework/create-vue-component': 'widget-add',
  'framework/create-angular-component': 'widget-5',
  'framework/migrate-react-subcomponent': 'folder-with-files',
  'framework/cleanup-component': 'magic-stick-3',
  'framework/port-mui-theme-override': 'palette',

  'org/create-giselle-component': 'widget-4',
  'org/migrate-giselle-subcomponent': 'move-to-folder',
  'org/port-giselle-component': 'import',
  'org/audit-giselle-tests': 'test-tube-minimalistic',
  'org/respond-giselle-pr-review': 'chat-line',
  'org/load-oss-standards': 'verified-check',
  'org/load-dependency-chain': 'link-minimalistic-2',
  'org/sync-roadmap': 'signpost',

  'git/commit-wip': 'diskette',
  'git/wip-sweep': 'broom',
  'git/create-pr': 'square-share-line',
  'git/link-pr-to-issue': 'link',
  'git/pr-merged': 'check-circle',
  'git/reap-ticket-branches': 'trash-bin-minimalistic',
  'git/canary-publish': 'rocket',
  'git/preview-package-branch': 'eye',
  'git/manual-vercel-deploy': 'cloud-upload',
  'git/check-pr-link': 'link-circle',
  'git/review-pr': 'clipboard-check',
  'git/respond-pr-review': 'reply',
  'git/sync-branches': 'refresh-circle',
  'git/dependabot-sweep': 'shield-warning',
  'git/morning-pr-sweep': 'inbox',
  'git/open-pr-sweep': 'inbox-archive',
  'git/repo-status': 'server-square',
  'git/query-issues': 'filter',
  'git/sync-status': 'transfer-horizontal',
  'git/sync-down': 'download-minimalistic',
  'git/sync-up': 'upload-minimalistic',

  'wiki/ingest': 'inbox-in',
  'wiki/query': 'question-square',
  'wiki/wiki-lint': 'checklist',
  'wiki/extract-quotes': 'chat-square-like',
  'wiki/extract-vocabulary': 'text-square',
  'wiki/rebuild-root-index': 'database',
  'wiki/log-incident': 'danger-triangle',
  'wiki/archive-file': 'archive',

  'vocabulary/handoff': 'hand-shake',

  'mentoring/audit-issue': 'document-medicine',
  'mentoring/learner-history': 'graph-up',
  'mentoring/next-issue': 'square-arrow-right',
  'mentoring/teach': 'square-academic-cap',

  'personal/anonimise': 'incognito',
  'personal/caveman': 'hashtag-chat',
  'personal/edit-article': 'pen',
  'personal/obsidian-vault': 'safe-square',

  'misc/karpathy-guidelines': 'ruler-pen',
  'misc/git-guardrails-claude-code': 'shield-keyhole',
  'misc/migrate-to-shoehorn': 'transfer-vertical',
  'misc/scaffold-exercises': 'dumbbells',
  'misc/setup-pre-commit': 'shield-check',
};
