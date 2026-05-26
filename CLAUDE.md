Skills are organized into bucket folders under `skills/`:

- `engineering/` — framework-agnostic code craft and architecture
- `framework/` — framework-specific scaffolding (React, Vue, Angular)
- `git/` — git and PR lifecycle operations
- `org/` — LittleBranches organisation-specific skills
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Every skill in `engineering/`, `framework/`, `git/`, `org/`, `productivity/`, or `misc/` must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. Skills in `personal/`, `in-progress/`, and `deprecated/` must not appear in either.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`.

## AI Reviewer Instructions

Load: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

Scope: only §1–§4 (AI Collaboration Protocol, Branch Hygiene, Quality Gate, PR Review
Workflow) and §11 (Definition of Done) apply to this repository. §5–§10 are React + MUI
specific and do not apply here.
