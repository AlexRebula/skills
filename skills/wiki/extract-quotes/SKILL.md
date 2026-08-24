---
name: extract-quotes
description: "Extract the most quotable verbatim lines from a source into a per-source quotes page, grouped by speaker in a vault-wide barrel. Works from an ingested source page, a raw file, a URL, or pasted text. A full /ingest is not required. Optional topic/keyword argument narrows or expands focus. Use when the user says \"extract quotes\", \"pull the quotes from this\", \"get the best lines from this video\", or invokes /extract-quotes. Opt-in: never run without the user asking."
---

Pull quotable lines from a source into the wiki's quotes layer at `{{WIKI_ROOT}}`.

Companion to `/ingest`, not a step inside it. Curatorial, not exhaustive: a 2-hour talk should yield ~8–15 quotes, not eighty. If a `[topic]` is given, go near-exhaustive on that topic only; everything else stays curated.

## Arguments

`/extract-quotes <input> [topic]`

- `<input>`: one of: a `wiki/sources/<group>/<slug>.md` page; a raw file with no source page yet; a URL; pasted text with nothing saved yet.
- `[topic]` (optional): a keyword/theme. Given: pull near-exhaustively on it, curated elsewhere. Given on a source already extracted: append new topic matches (dedup by exact quote text), don't restart.

## Step 0: Get a raw file

- `<input>` is a source page → read its `raw_path`.
- `<input>` is a raw file → use it.
- `<input>` is a URL or pasted text → run `/ingest`'s YouTube fetch flow (or Step 2.5 privacy screen for pasted text), then stop. Don't build a source page.

## Step 1: Select quotes

Read the whole source. Keep a line only if it's self-contained, says something (a claim, a fact, a framing, not filler), and short (trim with `…`, never alter wording).

## Step 2: Attribute + date/venue

Speaker = who actually said it. For a relayed quote (source retelling someone else's words), attribute the original speaker and cite the *original* event's date/venue, separately from the retelling's.

Research the real event date/venue, not the source's publish date. State plainly if it can't be established; never substitute the publish date silently.

## Step 3: Write the quote page

Has a source page → `wiki/quotes/<group>/<slug>-quotes.md`, `<group>`/`<slug>` matching it exactly:

```yaml
---
type: quotes
source: wiki/sources/<group>/<slug>.md
title: "<Title>: Quotes"
updated: <date>
---
```

No source page yet → `wiki/quotes/_unfiled/<slug>-quotes.md`:

```yaml
---
type: quotes
raw_path: <path to raw file>
title: "<Title>: Quotes"
updated: <date>
status: unfiled
---
```

Body:

```markdown
# <Title>: Quotes

→ [[<slug>|Back to the source page]]
```

If unfiled, replace that link with: `> Not yet linked to a source page. Running /ingest on the raw file above will file this automatically.`

Then:

```markdown
> **When & where:** <what Step 2 found, plus any sourcing caveat>
```

If a `[topic]` was given, add one line: `> This pass focused on "<topic>". Other quotes weren't exhaustively pulled.`

Then one block per quote, no commentary between them:

```markdown
> "<quote>"
> (<Speaker> · <venue>, <date> [<timestamp>])
```

## Step 4: Update the barrel

`wiki/quotes/quotes-index.md`, grouped by speaker, alphabetical:

- New speaker → new `## <Speaker>` heading.
- One event for the whole heading → state venue/date once under it. Mixed events → per line.
- One line per quote: `- "<quote>": [[<slug>-quotes|<Title>]] [<timestamp>]`
- Unfiled → append ` *(unfiled)*`.

## Step 5: Link back

Has a source page → add under its "Related pages": `→ Quotes from this source: [[<slug>-quotes|Quotes]]`. Unfiled → skip.

## Step 6: Update wiki/index.md

Has a source page: first quote page ever → add `## Quotes` category (barrel line + this page's line, with its prose description per `SCHEMA.md`'s Index Format rule). Otherwise → add this page's line. Unfiled → skip.

## Step 7: Log

`## [YYYY-MM-DD] extract-quotes | <N> quotes from <title>, speaker(s): <names>`

## Step 8: Report

Quotes extracted (count + speakers), page written, barrel updated, filed or unfiled, source linked (or not).
