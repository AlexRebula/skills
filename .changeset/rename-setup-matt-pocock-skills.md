---
"alexrebula-skills": minor
---

Rename `setup-matt-pocock-skills` to `setup-engineering-skills`, and stop pointing this fork's changelog/versioning at upstream.

- **Skill rename**: `setup-matt-pocock-skills` → `setup-engineering-skills` (folder, frontmatter `name`, H1, Codex metadata, and every cross-reference in `wayfinder`, `code-review`, `to-tickets`, `ask-matt`, `to-spec`, `triage`, their docs pages, `README.md`, `CONTEXT.md`, and `.claude-plugin/plugin.json`). No backward-compat shim, consistent with this repo's prior renames (`review` → `code-review`, `to-prd` → `to-spec`).
- **Changeset package key fixed**: every `.changeset/*.md` file's frontmatter used `"mattpocock-skills"`, which doesn't match `package.json`'s real name (`alexrebula-skills`) and was silently breaking `npx changeset status`/`version` (`Found changeset ... for package mattpocock-skills which is not in the workspace`). All existing changesets now key on `"alexrebula-skills"`.
- **Changelog target repointed to this fork**: `CHANGELOG.md`'s heading and `.changeset/config.json`'s `changelog-github` repo now read `alexrebula-skills` / `AlexRebula/skills`, so future entries link to this fork's own PRs and commits instead of upstream's. Historical changelog entries are untouched — those really did happen on `mattpocock/skills` before this fork diverged further.
