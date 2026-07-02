## ⚠️ PUBLIC REPOSITORY — read before writing anything

This repo is a **public fork** of [Matt Pocock's skills repo](https://github.com/total-typescript/skills).
It is published and installable by anyone: `npx skills@latest add AlexRebula/skills`.

**Rules — non-negotiable:**

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

- `engineering/` — framework-agnostic code craft and architecture
- `framework/` — framework-specific scaffolding (React, Vue, Angular)
- `git/` — git and PR lifecycle operations
- `org/` — LittleBranches organisation-specific skills
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used, not promoted
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Every skill in `engineering/`, `framework/`, `git/`, `org/`, `productivity/`, or `misc/` must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. Skills in `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. The promoted buckets' `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**; non-promoted bucket `README.md`s (`misc/`, `personal/`) use a flat list.

Skills in `engineering/`, `framework/`, `git/`, `org/`, and `productivity/` also have a human-facing docs page at `docs/<bucket>/<skill-name>.md` (the docs tree mirrors those bucket folders under `skills/`). When you add, rename, or change the behaviour of a skill in those buckets, create or re-sync its docs page. Skills in the non-promoted buckets (`misc/`, `personal/`, `in-progress/`, `deprecated/`) get **no** docs page.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true`, reachable only by the human) or model-invoked (model- or user-reachable). See [.agents/invocation.md](./.agents/invocation.md) for the upstream invocation rules.

[`ask-matt`](./skills/engineering/ask-matt/SKILL.md) is the router that maps every user-reachable skill and how they relate. Whenever you add, rename, remove, or change how a user-reachable skill fits the flows, re-read `ask-matt`'s `SKILL.md` and update it so the map stays accurate.

To (re)link every skill into the local harness skill directories (`~/.claude/skills`, `~/.agents/skills`), run `scripts/link-skills.sh`. Each entry is a symlink into this repo, so a `git pull` keeps installed skills current; re-run the script after adding, removing, or renaming a skill.

## AI Reviewer Instructions

Load: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

Scope: only §1–§4 (AI Collaboration Protocol, Branch Hygiene, Quality Gate, PR Review
Workflow) and §11 (Definition of Done) apply to this repository. §5–§10 are React + MUI
specific and do not apply here.
