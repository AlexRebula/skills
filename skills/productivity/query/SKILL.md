---
name: query
description: Answer a question using the personal wiki — reads the index, drills into relevant pages, synthesises an answer with citations, and optionally files the answer as a new wiki page. Use when the user asks a question and wants the wiki to answer it, or says "query the wiki".
---

Answer a question against the wiki at `{{WIKI_ROOT}}`.

## Arguments

- `/query <question>` — the question to answer. Required. Ask if omitted.
- `/query <question> --save` — also file the answer as a new wiki page.

---

## Step 1 — Orient

Read `wiki/index.md` in full. Do not read individual pages yet — use the index to decide which pages are relevant to the question.

List the pages you plan to read and why. If no pages seem relevant, say so and offer to search `raw/` sources instead.

---

## Step 2 — Read relevant pages

Read each page identified in Step 1. Follow `[[wikilinks]]` one level deep if they lead to something directly relevant.

Also check `wiki/log.md` (last 10 entries) — if a recent ingest or query touched this topic, factor that in.

---

## Step 3 — Synthesise

Write the answer. Format depends on the question:

| Question type            | Format                                         |
| ------------------------ | ---------------------------------------------- |
| Factual / recall         | Direct answer with citations `([[page-name]])` |
| Comparison               | Markdown table                                 |
| How-to / process         | Numbered steps                                 |
| Open-ended / exploratory | Short paragraphs with section headings         |

Always cite the wiki pages used: `([[page-name]])` inline or a `## Sources` list at the end.

If the wiki doesn't have enough to answer well, say what's missing and suggest which raw sources to ingest next to fill the gap.

---

## Step 4 — Save (--save only)

If `--save` was passed, write the answer as a new wiki page.

Choose the right location:

- A comparison or analysis → `wiki/concepts/<slug>.md`
- About a specific project → `wiki/projects/<name>.md`
- About a person → `wiki/people/<name>.md`
- A personal reflection → `wiki/personal/<slug>.md`

Use the appropriate frontmatter from `SCHEMA.md`. Add a `## Query` section at the top noting the original question and date.

Then:

- Add the page to `wiki/index.md` under the correct section
- Append to `wiki/log.md`:
  ```
  ## [YYYY-MM-DD] query | <question> → saved as <path>
  ```

If `--save` was not passed, still append to `wiki/log.md`:

```
## [YYYY-MM-DD] query | <question>
```

---

## Step 5 — Report

- Answer (inline in the response)
- Pages consulted: list with one-line description of what each contributed
- Saved to: path (if --save)
- Gaps: what the wiki is missing to answer this more completely
