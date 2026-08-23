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

  'productivity/asana-sync': 'refresh-circle',
  'productivity/audit-issue': 'clipboard-check',
  'productivity/capture': 'inbox-in',
  'productivity/check-prior-work': 'history',
  'productivity/collapse-session-folder': 'folder-check',
  'productivity/extract-session-worktree': 'export',
  'productivity/extract-vocabulary': 'file-text',
  'productivity/ingest': 'import',
  'productivity/learner-history': 'history-2',
  'productivity/load-session-context': 'download-minimalistic',
  'productivity/load-session-guidelines': 'book-2',
  'productivity/log-incident': 'shield-cross',
  'productivity/next-issue': 'signpost',
  'productivity/query': 'magnifer',
  'productivity/rebuild-root-index': 'refresh-square',
  'productivity/resolve-ai-paths': 'route',
  'productivity/session-wrap': 'archive-check',
  'productivity/standup-prep': 'users-group-rounded',
  'productivity/standup-prep-preflight': 'checklist',
  'productivity/sync': 'refresh',
  'productivity/wiki-lint': 'magnifer-bug',
  'productivity/writing-great-skills': 'magic-stick-3',

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
};
