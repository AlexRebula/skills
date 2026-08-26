/**
 * Per-skill icon assignment for the skill summary cards on the landing page
 * (see the `skill-card` component). Maps each "<category>/<name>" slug to a
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
  'engineering/deslopify': 'broom',
  'engineering/setup-engineering-skills': 'tuning-2',
  'engineering/start-issue': 'flag',
  'engineering/ask-matt': 'chat-round-line',
  'engineering/codebase-design': 'structure',
  'engineering/diagnosing-bugs': 'bug-minimalistic',
  'engineering/domain-modeling': 'diagram-up',
  'engineering/grill-with-docs': 'fire',
  'engineering/implement': 'code-2',
  'engineering/improve-codebase-architecture': 'buildings-2',
  'engineering/prototype': 'test-tube-minimalistic',
  'engineering/research': 'notebook',
  'engineering/resolving-merge-conflicts': 'shuffle',
  'engineering/tdd': 'test-tube',
  'engineering/to-spec': 'document-text',
  'engineering/to-tickets': 'ticket',
  'engineering/triage': 'stethoscope',
  'engineering/wayfinder': 'compass',
  'engineering/wizard': 'magic-stick-3',
  'engineering/writing-for-agents': 'pen-new-square',

  'daily-workflow/asana-sync': 'refresh-circle',
  'daily-workflow/handoff': 'hand-shake',
  'mentoring/audit-issue': 'clipboard-check',
  'mentoring/teach': 'square-academic-cap',
  'daily-workflow/capture': 'inbox-in',
  'daily-workflow/check-prior-work': 'history',
  'daily-workflow/collapse-session-folder': 'folder-check',
  'daily-workflow/extract-session-worktree': 'export',
  'wiki/extract-quotes': 'bookmark-square',
  'wiki/extract-vocabulary': 'file-text',
  'wiki/ingest': 'import',
  'mentoring/learner-history': 'history-2',
  'daily-workflow/load-session-context': 'download-minimalistic',
  'daily-workflow/load-session-guidelines': 'book-2',
  'wiki/log-incident': 'shield-cross',
  'mentoring/next-issue': 'signpost',
  'wiki/query': 'magnifer',
  'wiki/rebuild-root-index': 'refresh-square',
  'daily-workflow/resolve-ai-paths': 'route',
  'daily-workflow/session-wrap': 'archive-check',
  'daily-workflow/standup-prep': 'users-group-rounded',
  'daily-workflow/standup-prep-preflight': 'checklist',
  'daily-workflow/sync': 'refresh',
  'wiki/wiki-lint': 'magnifer-bug',

  'git/commit-wip': 'diskette',
  'git/create-pr': 'send-square',
  'git/morning-pr-sweep': 'sunrise',
  'git/open-pr-sweep': 'folder-open',
  'git/query-issues': 'question-square',
  'git/repo-status': 'server',
  'git/respond-pr-review': 'chat-square-check',
  'git/review-pr': 'magnifer-zoom-in',
  'git/sync-branches': 'branching-paths-up',
  'git/wip-sweep': 'restart-circle',

  'framework/create-angular-component': 'widget-5',
  'framework/create-react-component': 'atom',
  'framework/create-vue-component': 'widget-4',

  'org/audit-giselle-tests': 'test-tube',
  'org/create-giselle-component': 'widget-add',
  'org/load-dependency-chain': 'link-round',
  'org/load-oss-standards': 'shield-check',
  'org/respond-giselle-pr-review': 'chat-dots',
  'org/sync-roadmap': 'signpost-2',

  'personal/anonimise': 'incognito',
  'personal/caveman': 'translation',
  'personal/edit-article': 'pen-2',
  'personal/obsidian-vault': 'safe-2',

  'misc/karpathy-guidelines': 'checklist-minimalistic',
  'misc/git-guardrails-claude-code': 'shield-warning',
  'misc/migrate-to-shoehorn': 'transfer-horizontal',
  'misc/scaffold-exercises': 'ruler-cross-pen',
  'misc/setup-pre-commit': 'tuning-4',

  'thinking-tools/grill-me': 'fire-minimalistic',
  'thinking-tools/grilling': 'flame',
  'thinking-tools/to-questionnaire': 'clipboard-text',
  'thinking-tools/wait-what': 'question-circle',
};
