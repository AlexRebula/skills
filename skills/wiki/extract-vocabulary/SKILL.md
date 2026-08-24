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

1. `SCHEMA.md`'s **Concept page**, **Vocabulary term file**, **Vocabulary folder index**, and **Vocabulary barrel** sections — the exact frontmatter and structure you're about to write. Vocabulary is one file per term (`wiki/vocabulary/<owning-concept-slug>/<term-slug>.md`), not one file per concept — do not append `###` sections to a flat file, that structure was retired.
2. `wiki/vocabulary/vocabulary-index.md` (the barrel) — the full existing term list, vault-wide. This is also your dedup check: a term already present anywhere in the barrel, under any concept, must not get a second file.
3. `wiki/index.md` — full list of existing concepts (`## Concepts`) and any existing vocabulary folders (`## Vocabulary`, may not exist yet)
4. The source page named in the argument, and its `raw_path` raw file

---

## Step 1 — Extract candidate terms

Scan the **entire** source (source page + full raw transcript/article, start to finish — not just the parts that were quoted in the source page's takeaways) for every term, acronym, or tool/library name that would stop a *complete beginner with zero background* cold. This is a near-exhaustive bar, not a "pick the interesting ones" bar:

- **Include**: acronyms no matter how foundational they feel to an experienced engineer (JSON, XML, DOM, UI, ESM, CommonJS, SSR, RSC, XHR), tool/library names used as jargon shorthand (Pug, Django templates, Handlebars, Alpine.js, Bun), general technical vocabulary a beginner wouldn't already have (templating engine, vanilla JS, client-side JS/code, partial, hydration, virtual DOM, meta framework, file-based routing, client-side routing, Web Components, Shadow DOM, WebSockets, Server-Sent Events), named patterns/techniques used as shorthand (hypermedia, optimistic UI, HATEOAS, idempotent)
- **Exclude**: only the handful of names so ubiquitous that anyone even glancingly adjacent to tech already knows them (React, JavaScript, HTML, CSS, GitHub, npm), and terms already covered by an existing term file *anywhere in the vault* (check the barrel, not just this concept's folder — see Step 3's dedup rule)

**Do not stop early because you found "enough."** A single jargon-dense video can easily surface 20+ terms — that is the expected, correct result, not a sign to narrow down. If in doubt about a borderline term, include it; a false-positive entry costs a few lines, a false-negative is what this skill exists to prevent.

Produce a candidate list: `term → one-line ELI5 draft → best-matching concept (existing or proposed-new)`.

---

## Step 2 — Match each term to a concept

**Default every term to the concept the source itself is primarily about**, even when the term is more general-purpose than that concept's core subject (e.g. "JSON," "DOM," or "Pug" filed under `htmx-vs-spa-architecture`'s vocabulary because that's what the source is about, not because the term is inherently htmx-specific). Do not require an exact-topic match per term — that would force a new concept page for every acronym and defeats the point of a source-grounded cheat-sheet. A term only earns its *own* new concept when it's substantial and central enough to the source to deserve independent treatment (the way "Virtual DOM" did) — check `wiki/index.md`'s `## Concepts` list for one before assuming none exists.

**No existing concept fits, and the term isn't a natural fit for the source's primary concept either** (e.g. a term mentioned only in an aside or joke, unconnected to what the source actually teaches) → this wiki has a strict no-orphans rule: every vocabulary term must still belong to a concept. Collect all such terms and their proposed new concept page(s) (name + one-line description of what the concept page would cover), then stop and show the user:

> "These terms don't match any existing concept and aren't a natural fit for this source's primary concept either — they'd need new concept page(s) created: `<list>`. Create them?"

Wait for a clear go-ahead before creating any new concept page. If declined for a given term, drop it from this run (don't silently force it into an ill-fitting existing concept).

---

## Step 3 — Write the term file

For each term (existing-concept matches now, approved-new-concept matches after Step 2's gate):

**Dedup check first (vault-wide, not just this concept):** search the barrel for this exact term. If it's already there:
- Same concept as before → this is the "genuinely new nuance" case: open the existing term file and add a short note, rather than creating a second file.
- **Different concept than before** → do not create a second file for a second concept. Merge instead: open the existing term file, fold in the new source's citation (`; also covered in [[<new-source-slug>]]` on the first-heard line), and only touch the blurb if this source's phrasing is genuinely clearer — otherwise leave the existing wording alone. The term stays in whichever concept folder it already lives in; do not move it. Skip straight to Step 5's barrel update for this term (add the new concept to its concept-links) and skip the rest of Step 3/Step 4's new-file steps.

If it's a genuinely new term, slugify its title (`term-slug`, kebab-case) and check that slug against the full list of concept slugs in `wiki/index.md`. **If it collides with an existing concept's own slug** (e.g. a term called "Recursion" being filed under the `recursion` concept), suffix the filename with `-term` (`recursion-term.md`) — this is the one mandatory disambiguation rule, since two files sharing a basename anywhere in the vault would make bare `[[wikilinks]]` ambiguous.

Create `wiki/vocabulary/<concept-slug>/<term-slug>.md` (or `<term-slug>-term.md` on collision):

```markdown
---
type: vocabulary-term
concept: wiki/concepts/<concept-slug>.md
title: "<Term>"
updated: <today>
---

# <Term>

<1–2 sentence ELI5 definition — plain words only, no jargon used to explain the jargon>

→ first heard in [[<source-slug>]]

→ [Back to the concept page](../../concepts/<concept-slug>.md)
```

If the concept's vocabulary folder doesn't exist yet, create it now — this is the lazy-creation point, not a backfill.

---

## Step 4 — Update the concept page

For each concept touched:

1. If its frontmatter is missing `title`, `vocabulary_file`, or `status`, add them now (per `SCHEMA.md`'s Concept page frontmatter). Set `vocabulary_file` to `wiki/vocabulary/<concept-slug>/<concept-slug>-vocabulary-index.md`.
2. Add a `## Glossary` section if one doesn't exist yet:
   ```markdown
   ## Glossary

   → [[<concept-slug>-vocabulary-index|Jargon from this topic, explained simply]]
   ```
   If the section already exists, leave it.
3. Create or update `wiki/vocabulary/<concept-slug>/<concept-slug>-vocabulary-index.md` — add one line for each new term file, keeping the list alphabetical by term:
   ```markdown
   - [[<term-slug>|<Term>]] — <same ELI5 line as the term file>
   ```
4. **Inline-link the term's first mention in this concept page's own prose**, if the term's exact wording (or a close variant) actually appears in the page body: wrap only the *first* occurrence as `[[<term-slug>|<text as it appears>]]`. Don't wrap headings, code spans, or every repeat — first mention only, same rule as the Glossary link. Skip this if the term genuinely isn't mentioned in the concept page's own text (it's still reachable via the folder index either way).

---

## Step 5 — Update the vocabulary barrel

`wiki/vocabulary/vocabulary-index.md` — the flat A–Z list across every term in the vault, regardless of which concept's folder owns it.

- Insert one line per new term, in alphabetical position by term:
  ```markdown
  - **<Term>** — <same ELI5 line as the term file> → [[<concept-slug>|concept]] · [[<term-slug>|full entry]]
  ```
- **If this term is now used by more than one concept** (the merge case from Step 3's dedup check), list every owning/using concept, comma-separated: `→ [[<concept-a>|concept]], [[<concept-b>|concept]] · [[<term-slug>|full entry]]` — update the existing line in place rather than adding a second one.

---

## Step 6 — Link back from the source page

Add a line to the source page (`wiki/sources/<group>/<slug>.md`) — not the raw file, which stays a frozen verbatim record per this wiki's existing convention (see `SCHEMA.md`'s Project page note on `raw/` files) — pointing at whichever vocabulary folder(s) picked up terms from it:

```markdown
→ Jargon from this source: [[<concept-slug>-vocabulary-index|<Concept Name> vocabulary]]
```

Place it directly under the existing "Related pages" section, or create a small "Vocabulary extracted" line if "Related pages" doesn't exist on this page yet.

> **Note:** if you specifically want the raw file itself edited too (not just the source page), say so — this skill defaults to leaving raw files untouched, consistent with how the rest of the wiki treats them as archival records.

---

## Step 7 — Update wiki/index.md

- If this is the first vocabulary folder in the wiki, add a new `## Vocabulary` category (with its 1–2 sentence prose description, per `SCHEMA.md`'s Index Format rule) directly after `## Concepts`, listing the barrel first, then each concept's vocabulary index file.
- Otherwise, add a line for any newly-created vocabulary folder (linking its `<concept-slug>-vocabulary-index.md`); existing lines need no change (the folder's contents changed, not its existence).
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
- Term file(s) written/updated, and any merged into an existing term from a different concept
- Concept page(s) updated (Glossary link, folder index, inline first-mention links), and any newly created
- Barrel updated
- Source page linked back
- Terms dropped (no concept match, declined at the Step 2 gate) — if any
