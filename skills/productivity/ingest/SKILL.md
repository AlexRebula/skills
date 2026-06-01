---
name: ingest
description: Ingest a raw source file into the personal wiki — reads the source, extracts metadata, writes a wiki/sources/ synthesis page, updates related wiki pages, and updates wiki/index.md and wiki/log.md. Add --deep to also write a long-form deep dive at wiki/deep/<slug>-deep.md. Use when the user wants to ingest an article, YouTube transcript, gist, podcast, or paper into the wiki.
---

Ingest a raw source into the wiki at `c:/work/projects/ar/wiki`.

## Arguments

`/ingest <path>` — path to the raw source file (absolute or relative to wiki root). Required. Ask if omitted. `/ingest <path> --deep` — also write a long-form deep dive at `wiki/deep/<slug>-deep.md` after the short source page.

If `--deep` is passed and a source page for this file already exists, locate the existing `wiki/sources/<slug>.md` by matching its `raw_path`, read its frontmatter to recover `<slug>` and `<title>`, then skip Steps 1–7 and go straight to **Step D**.

---

## Step 0 — Orient

Read these files before doing anything else:

1. `wiki/index.md` — understand what's already in the wiki
2. `wiki/log.md` (last 10 lines) — see what was ingested recently
3. `SCHEMA.md` — recall source page frontmatter and wiki page types

---

## Step 1 — Read the source

Read the file at `<path>`. Do not summarise yet.

Detect the source type from the path and content:

| Path pattern          | `source_type`              |
| --------------------- | -------------------------- |
| `raw/transcripts/`    | `youtube` or `transcript`  |
| `raw/articles/`       | `article`                  |
| `raw/gists/`          | `gist`                     |
| `raw/morning-briefs/` | skip — session artifacts   |
| `raw/sessions/`       | skip — session artifacts   |
| `tasks/`              | skip — Asana task files    |
| `wiki/`               | skip — already a wiki page |

**If the path is in `tasks/`:** stop. Task files are structured Asana records, not knowledge sources. Tell the user:

> "Task files in `tasks/` are Asana-backed records, not ingestible sources. If you want to create a wiki page from task data, ask directly — for example: 'Create `wiki/projects/giselle-mui.md` from the tasks in `tasks/mill/giselle-mui/`' or 'Create `wiki/concepts/foo.md` from the notes in this task file.' The agent knows both schemas and can synthesise freely."

**If the path is in `wiki/`:** stop. Wiki pages are already synthesised content — re-ingesting them would create a source page about a wiki page, which is circular. If you want to deepen an existing page, edit it directly or use `/ingest <original-raw-source> --deep`.

**If the path is in `morning-briefs/` or `sessions/`:** stop. These are session artifacts, not knowledge sources. Suggest checking `raw/transcripts/` or `raw/articles/`.

---

## Step 2 — Extract metadata

From the file content, extract:

- **Title** — H1 heading, file name, or the title from the source URL
- **Author** — from byline, channel name, or filename
- **URL** — any URL in the first 20 lines, or null
- **Date published** — any date in the first 20 lines, or null

Generate a slug from the title: lowercase, spaces → hyphens, strip non-word chars, max 60 chars.

---

## Step 3 — Discuss key takeaways

Present a brief summary (2–3 sentences) of what the source is about, then list 5–7 candidate key takeaways as bullet points.

Ask the user:

> "Does this look right? Anything to add, remove, or emphasise before I write the page?"

Wait for confirmation before writing. If the user says "go" or "looks good", proceed immediately.

---

## Step 4 — Write the source page

Write `wiki/sources/<slug>.md` using the source page template from `SCHEMA.md`:

```yaml
---
type: source
source_type: <detected type>
title: '<title>'
author: '<author>'
url: '<url or null>'
date_published: <YYYY-MM-DD or null>
date_ingested: <today's date>
raw_path: <path relative to wiki root>
updated: <today's date>
---
```

Content:

- **Summary** — one paragraph: what this source is and why it matters
- **Key takeaways** — 3–7 bullet points (refined from Step 3 discussion)
- **Quotes** — 1–3 verbatim excerpts worth keeping (optional; omit if none stand out)
- **Related pages** — wikilinks to any existing `wiki/` pages this source informs (check `wiki/index.md`)
- If `--deep`: add `deep_dive: wiki/deep/<slug>-deep.md` to frontmatter and append `→ [[<slug>-deep|Deep dive]]` at the bottom

---

## Step 5 — Update related wiki pages

For each existing wiki page that this source informs (from the Related pages list above):

1. Read the page
2. Add or update a sentence/bullet that reflects the new insight
3. Add a source link if not already present

Only touch pages where the source genuinely adds something. Do not touch pages where the connection is superficial.

If a concept, person, or project is prominently featured in the source but has **no wiki page yet**, create one now using the appropriate template from `SCHEMA.md`.

---

## Step 6 — Update wiki/index.md

Add a line under `## Sources`:

```
- [Title](wiki/sources/<slug>.md) — one-line summary
```

If any new concept/person/project pages were created in Step 5, add those lines to their respective sections too.

---

## Step 7 — Append to wiki/log.md

```
## [YYYY-MM-DD] ingest | <title> (<source_type>)
```

---

## Step D — Write the deep dive (--deep only)

Write `wiki/deep/<slug>-deep.md`. This is the long-form companion to the short source page.

**Frontmatter:**

```yaml
---
type: deep-dive
source: wiki/sources/<slug>.md
title: '<title> — Deep Dive'
updated: <today's date>
---
```

**Structure:**

Open with one sentence: `→ [[<slug>|Short summary]]`

Then for **each major topic or section** in the source:

- Write a `##` heading named after the topic
- Expand fully: explain the idea in depth, work through implications, give concrete examples or applications, note tensions or open questions
- Add a `> **Relevance to my work:**` callout connecting it to your projects, career, or personal context — check `wiki/index.md` for relevant pages to reference
- Cross-link to related wiki pages with `[[wikilinks]]`

Length comes from depth, not repetition. A simple topic gets a short section; a complex one gets as much space as it earns.

Close with a `## Open Questions` section: 3–5 questions this source raises that aren't yet answered in the wiki — seeds for future ingests or lint passes.

**After writing the deep dive:**

- Add a `## Deep Dives` section to `wiki/index.md` if it doesn't exist, and add a line:
  ```
  - [Title — Deep Dive](wiki/deep/<slug>-deep.md) — one-line description
  ```
- Append to `wiki/log.md`:
  ```
  ## [YYYY-MM-DD] deep-dive | <title>
  ```

---

## Step 8 — Report

Tell the user:

- Source page written: `wiki/sources/<slug>.md`
- Deep dive written: `wiki/deep/<slug>-deep.md` (if --deep)
- Related pages updated: list any pages touched
- New pages created: list any new pages
- Suggested next ingests: if the source references other sources worth adding, name them
