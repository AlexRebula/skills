# PR: chore/ingest-update

## Summary

- **ingest skill — privacy screen and slug privacy rule:** adds Step 2.5 (mandatory PII scan before writing any file) and a slug privacy rule (no private individuals' names in file/folder names). Defines replacement rules: vault placeholders for the user's own data, role-based labels for third parties, redaction markers for sensitive numbers. Also removes a duplicate instruction paragraph that was triggering the banned-name pre-commit hook.

- **Tool-agnostic language across all skills:** strips all VS Code, GitHub Copilot, and Claude Code-specific references from 10 skills. Template variables are now described as "replace with…" only. Any step that is genuinely platform-specific either already had or now has a generic fallback.

- **Permanent guard in `write-a-skill`:** adds a review checklist item requiring platform neutrality on every new skill — preventing regressions without a manual audit.

## Files changed

| File | Change |
|---|---|
| `productivity/ingest` | Step 2.5 privacy screen, slug privacy rule, duplicate paragraph removed |
| `productivity/write-a-skill` | New checklist item: no tool-specific references |
| `productivity/standup-prep` | Remove VS Code setup instruction |
| `productivity/resolve-ai-paths` | Replace VS Code Copilot callout with generic note |
| `productivity/session-wrap` | Remove "VS Code Copilot" branding from session ID steps |
| `productivity/handoff` | Remove "in VS Code Copilot / on other platforms" phrasing |
| `productivity/asana-sync` | "VS Code workspace folders" → "workspace folders" |
| `git/repo-status` | "VS Code workspace context" → "workspace context" |
| `git/commit-wip` | "VS Code workspace folders" → "workspace folders" |
| `org/load-dependency-chain` | Tool-agnostic path variable notes |

## Test plan

- [ ] Run `/ingest` on a source containing PII — verify Step 2.5 fires and replacements are applied before any file is written
- [ ] Run `/ingest` on a source with a private individual's name — verify slug uses role-based label, not the name
- [ ] Run `/write-a-skill` — verify new checklist item appears in the review step
- [ ] Install skills (`npx skills@latest add AlexRebula/skills -g -y`) and confirm all skills load without VS Code-specific copy visible in their instructions
