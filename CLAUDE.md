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
- **Never reference private repository names** (e.g. `first-branch`, `alexrebula`) in
  PR descriptions, commit messages, or README entries.

---

## Skill bucket structure

Skills are organized into bucket folders under `skills/`:

- `engineering/` — daily code work
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Every skill in `engineering/`, `productivity/`, or `misc/` must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. Skills in `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`.

## AI Reviewer Instructions

Load: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

Scope: only §1–§4 (AI Collaboration Protocol, Branch Hygiene, Quality Gate, PR Review
Workflow) and §11 (Definition of Done) apply to this repository. §5–§10 are React + MUI
specific and do not apply here.
