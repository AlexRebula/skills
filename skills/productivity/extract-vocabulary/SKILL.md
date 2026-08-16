---
name: extract-vocabulary
description: Extract unfamiliar jargon/lingo from an already-ingested wiki source and file it into a per-concept vocabulary cheat-sheet, explained ELI5/junior-dev-simple. Use when the user says "extract vocabulary", "pull the jargon out of this", "add a glossary for this video", or invokes /extract-vocabulary. Opt-in — run after /ingest on sources that are actually jargon-heavy (reaction/podcast/interview videos), not on every ingest.
---

Extract jargon from an already-ingested source at `{{WIKI_ROOT}}` and file each term into the wiki's vocabulary layer.

This is a companion to `/ingest`, not a step inside it. Run it manually, after ingesting, on sources where unfamiliar terminology was actually the pain point — reaction videos, podcasts, interviews. Skip it for sources with no real jargon density (personal/legal entries, internal docs, CVs).

## Arguments

- `/extract-vocabulary <source-page>` — path to an existing `wiki/sources/<group>/<slug>.md` page. Required.

If the given path isn't a source page (doesn't exist, or isn't under `wiki/sources/`), stop and ask the user for a valid one — do not guess.

---

## Step 0 — Orient

Read, in order:

1. `SCHEMA.md`'s **Vocabulary page**, **Vocabulary barrel**, and **Concept page** sections — the exact frontmatter and structure you're about to write
2. `wiki/index.md` — full list of existing concepts (`## Concepts`) and any existing vocabulary files (`## Vocabulary`, may not exist yet)
3. The source page named in the argument, and its `raw_path` raw file

---

## Step 1 — Extract candidate terms

Scan the source (source page + raw transcript/article) for terms that would stop a non-technical person or a junior developer cold — insider tech jargon, acronyms, named patterns/techniques, tool-specific vocabulary. Concretely:

- **Include**: domain jargon ("hypermedia", "hydration", "optimistic UI", "HATEOAS", "idempotent"), acronyms not already common English (SSR, RSC, XHR), named techniques/patterns used as shorthand
- **Exclude**: plain English, terms already thoroughly explained inline in the source itself in a way a beginner could follow without help, terms already covered in an existing vocabulary file for the same concept (check before adding — no duplicate entries)

Produce a candidate list: `term → one-line ELI5 draft → best-matching concept (existing or proposed-new)`.

---

## Step 2 — Match each term to a concept

For each candidate term, check `wiki/index.md`'s `## Concepts` list (and skim the actual concept pages if the title alone doesn't make the match obvious) for a concept it belongs to.

**Matched to an existing concept** → proceed automatically, no approval needed (Step 3).

**No existing concept fits** → this wiki has a strict no-orphans rule: every vocabulary term must belong to a concept. Collect all such terms and their proposed new concept page(s) (name + one-line description of what the concept page would cover), then stop and show the user:

> "These terms don't match any existing concept and would need new concept page(s) created: `<list>`. Create them?"

Wait for a clear go-ahead before creating any new concept page. If declined for a given term, drop it from this run (don't silently force it into an ill-fitting existing concept).

---

## Step 3 — Write/update the vocabulary file

For each term (existing-concept matches now, approved-new-concept matches after Step 2's gate), append to `wiki/vocabulary/<concept-slug>.md`:

```markdown
### <Term>

<1–2 sentence ELI5 definition — plain words only, no jargon used to explain the jargon>

→ first heard in [[<source-slug>]]
```

- If the vocabulary file doesn't exist yet for this concept, create it now (frontmatter per `SCHEMA.md`) — this is the lazy-creation point, not a backfill.
- Check the existing file first — if this exact term is already present, skip it (no duplicate entries); if the source adds a genuinely new nuance to an already-defined term, add a short note under the existing entry rather than a second `###` heading.
- Newest entries go at the bottom — this file is not kept alphabetical (the barrel handles that).

---

## Step 4 — Update the concept page

For each concept touched:

1. If its frontmatter is missing `title`, `vocabulary_file`, or `status`, add them now (per `SCHEMA.md`'s upgraded Concept page frontmatter). Set `vocabulary_file` to the path just written/updated in Step 3.
2. Add a `## Glossary` section if one doesn't exist yet:
   ```markdown
   ## Glossary

   → [[<concept-slug>|Jargon from this topic, explained simply]]
   ```
   If the section already exists, leave it — it already points at the same file.

---

## Step 5 — Update the vocabulary barrel

`wiki/vocabulary/vocabulary-index.md` — the flat A–Z list across every concept's terms.

- If it doesn't exist yet (this is the first vocabulary file in the whole wiki), create it now per `SCHEMA.md`'s Vocabulary barrel section.
- Insert one line per new term, in alphabetical position by term:
  ```markdown
  - **<Term>** — <same ELI5 line as the vocabulary file entry> → [[<concept-slug>]] · [[<concept-slug>#<term-anchor>|full entry]]
  ```

---

## Step 6 — Link back from the source page

Add a line to the source page (`wiki/sources/<group>/<slug>.md`) — not the raw file, which stays a frozen verbatim record per this wiki's existing convention (see `SCHEMA.md`'s Project page note on `raw/` files) — pointing at whichever vocabulary file(s) picked up terms from it:

```markdown
→ Jargon from this source: [[<concept-slug>|<Concept Name> vocabulary]]
```

Place it directly under the existing "Related pages" section, or create a small "Vocabulary extracted" line if "Related pages" doesn't exist on this page yet.

> **Note:** if you specifically want the raw file itself edited too (not just the source page), say so — this skill defaults to leaving raw files untouched, consistent with how the rest of the wiki treats them as archival records.

---

## Step 7 — Update wiki/index.md

- If this is the first vocabulary file in the wiki, add a new `## Vocabulary` category (with its 1–2 sentence prose description, per `SCHEMA.md`'s Index Format rule) directly after `## Concepts`, listing the barrel first, then each vocabulary file.
- Otherwise, add a line for any newly-created vocabulary file; existing lines need no change (the file's content changed, not its existence).
- If any new concept pages were created in Step 2, add their lines to `## Concepts` as usual.

---

## Step 8 — Append to wiki/log.md

```
## [YYYY-MM-DD] extract-vocabulary | <N> terms from <source title> — <concept(s) touched>
```

---

## Step 9 — Report

Tell the user:

- Terms extracted (count + list)
- Vocabulary file(s) written/updated
- Concept page(s) updated, and any newly created
- Barrel updated
- Source page linked back
- Terms dropped (no concept match, declined at the Step 2 gate) — if any
