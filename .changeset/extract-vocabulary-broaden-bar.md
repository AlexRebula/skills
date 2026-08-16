---
"mattpocock-skills": patch
---

Fix `extract-vocabulary` under-extracting: Step 1's inclusion bar was too narrow ("insider jargon") and silently stopped after finding a handful of terms that fit existing concepts, missing foundational-but-still-beginner-unknown terms (JSON, DOM, UI, XML, ESM, CommonJS, templating engine, vanilla JS, etc.) entirely. The bar is now near-exhaustive — a complete-beginner-zero-background cutoff, not a "pick the interesting ones" cutoff — and Step 2 now defaults every term to the concept the source itself is primarily about (rather than requiring a dedicated concept per term), so generic terms don't need their own concept page just because they aren't htmx-specific in isolation. New concept pages are now reserved for terms that are both unmatched AND unrelated to the source's own topic.
