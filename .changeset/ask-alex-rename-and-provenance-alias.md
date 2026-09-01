---
"alexrebula-skills": minor
---

Renamed `ask-matt` to `ask-alex` (no alias, same convention as prior renames), crediting Matt Pocock's original `ask-matt` router in both the skill file and the docs site.

Fixed a real attribution bug this surfaced: `generate-provenance.ts` matches a skill's upstream lineage by folder name alone, so any renamed skill silently lost its real Matt Pocock lineage and showed up as "AlexRebula Original" instead. Added `site/src/data/skill-renames.ts`, a small map of current name to prior name, so a renamed skill still resolves correctly. This also fixes `setup-engineering-skills`'s provenance, which had the identical bug since its own earlier rename from `setup-matt-pocock-skills`. The docs site now shows a "Renamed from Matt Pocock's `<old-name>`" credit line for both.
