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

## Language

All Node.js tooling, scripts, and tests committed to this repository use **TypeScript**. JavaScript files (`.js`, `.cjs`, `.mjs`) are not permitted. When adding a test runner, helper script, or any executable file, use `.ts` and a TypeScript-capable runner (Vitest, tsx, ts-node). The absence of a `package.json` or `tsconfig.json` is not a reason to default to JavaScript — add the infrastructure instead.

This rule covers committed executable files only. Code examples and file-tree illustrations inside skill `.md` files are not subject to it — those should match the target project's language.

## AI Reviewer Instructions

Load: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

Scope: only §1–§4 (AI Collaboration Protocol, Branch Hygiene, Quality Gate, PR Review
Workflow) and §11 (Definition of Done) apply to this repository. §5–§10 are React + MUI
specific and do not apply here.
