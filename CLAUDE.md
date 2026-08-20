## ⚠️ PUBLIC REPOSITORY: read before writing anything

This repo is a **public fork** of [Matt Pocock's skills repo](https://github.com/total-typescript/skills).
It is published and installable by anyone: `npx skills@latest add AlexRebula/skills`.

**Rules, non-negotiable:**

- **PR descriptions and commit messages must be written for a public audience.** Assume a
  stranger to the project is reading them. No unexplained internal jargon, no references to
  internal project names or private tooling unless you define them inline.
- **Skill files may reference organisation-specific context** (LittleBranches, giselle-mui, etc.)
  because those skills are explicitly scoped to that organisation. The PR that ships them
  should describe what the skill does, not assume the reader knows the internal setup.
- **Never reference private repository names** (e.g. `my-private-app`, `my-portfolio`) in
  PR descriptions, commit messages, or README entries.

---

## Skill bucket structure

Skills are organized into bucket folders under `skills/`:

- `engineering/`: framework-agnostic code craft and architecture
- `framework/`: framework-specific scaffolding (React, Vue, Angular)
- `git/`: git and PR lifecycle operations
- `org/`: LittleBranches organisation-specific skills
- `productivity/`: daily non-code workflow tools
- `misc/`: kept around but rarely used, not promoted
- `personal/`: tied to my own setup, not promoted
- `in-progress/`: drafts not yet ready to ship
- `deprecated/`: no longer used

Every skill in `engineering/`, `framework/`, `git/`, `org/`, or `productivity/` (the **promoted**
buckets) must have a reference in the top-level `README.md` and an entry in
`.claude-plugin/plugin.json`'s `skills` array (the Claude Code plugin ships exactly the promoted
set). Skills in `misc/`, `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

The repo is also its own single-plugin Claude Code marketplace: `.claude-plugin/marketplace.json`
lists the one `alexrebula-skills` plugin. When bumping the release version, keep
`.claude-plugin/plugin.json`'s `version` in sync with `package.json`'s (`npm run version` does
this automatically via `scripts/sync-plugin-version.mjs`; `npm run check-plugin-version` verifies
it). Run `claude plugin validate . --strict` after touching either manifest.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line
description, with the skill name linked to its `SKILL.md`. The `engineering/` and `productivity/`
bucket `README.md`s group entries into **User-invoked** and **Model-invoked**; other bucket
`README.md`s use a flat list.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true`, reachable only when you
type the slash command) or model-invoked (model- or user-reachable via rich trigger phrasing). See
[.agents/invocation.md](./.agents/invocation.md) for the full split, including the
`agents/openai.yaml` half of the story for Codex.

To (re)link every skill into the local harness skill directories (`~/.claude/skills`,
`~/.agents/skills`), run `scripts/link-skills.sh`. Each entry is a symlink into this repo, so a
`git pull` keeps installed skills current; re-run the script after adding, removing, or renaming a
skill.

No em-dashes anywhere in this repo's prose (`SKILL.md` files, docs, `README.md`,
`CHANGELOG.md`, ADRs, changesets, code comments). Where a sentence reaches for one, rewrite it
instead with a comma, colon, period, parentheses, or a conjunction, whichever the sentence
actually wants; never do a blind character substitution.

## AI Reviewer Instructions

Load: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

Scope: only §1–§4 (AI Collaboration Protocol, Branch Hygiene, Quality Gate, PR Review
Workflow) and §11 (Definition of Done) apply to this repository. §5–§10 are React + MUI
specific and do not apply here.
