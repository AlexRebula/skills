---
"alexrebula-skills": minor
---

Add `/deslopify` — strip AI tells from prose and code.

- Prose half always applies to anything meant for a human reader (blog drafts, PR descriptions, commit messages, docs, session summaries): scan, rewrite, add back voice, self-audit. Pattern list adapted from cursor/plugins' `unslop` skill.
- Code half is manual-only (`/deslopify <file>`), scoped to generation tells — restating comments, impossible error handling, dead defensive branches, placeholder docstrings, over-verbose naming, leftover TODO scaffolding — not general design or simplification review, which stays with `karpathy-guidelines`, `/simplify`, and `/code-review`.
