---
"alexrebula-skills": minor
---

Add the **`extract-vocabulary`** skill: a companion to `/ingest` that pulls unfamiliar jargon out of an already-ingested wiki source and files it into a per-concept vocabulary cheat-sheet — ELI5/junior-dev-level definitions, one file per concept, plus a flat A–Z barrel index (`wiki/vocabulary/vocabulary-index.md`). Cross-linked from the source page, the owning concept page (which gets a new `## Glossary` section), and the barrel. Enforces a no-orphan-terms rule: a term with no matching concept triggers a propose-and-wait-for-approval gate before a new concept page is created. Opt-in — run manually on jargon-heavy sources (reaction videos, podcasts, interviews), not on every ingest.
