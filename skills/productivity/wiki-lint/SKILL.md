---
name: wiki-lint
description: Health-check the personal wiki — scans for contradictions, orphan pages, stale claims, missing cross-references, and data gaps. Produces a prioritised finding list and suggests next ingests. Use when the user says "lint the wiki", "health check the wiki", or "what's wrong with the wiki".
---

Health-check the wiki at `c:/work/projects/ar/wiki`.

## Arguments

`/wiki-lint` — full lint pass across all wiki pages.
`/wiki-lint --fix` — after producing the findings, apply safe fixes automatically (add missing cross-references, stub missing pages). Ask before touching anything structural.

---

## Step 1 — Orient

Read:
1. `wiki/index.md` — get the full list of pages
2. `wiki/log.md` — understand what was done recently (avoid re-flagging things just ingested)

---

## Step 2 — Scan all wiki pages

Read every page listed in `wiki/index.md`. For each page, check:

**Structural checks:**
- [ ] Has valid frontmatter (type, updated fields present)
- [ ] Not empty or stub-only (body has real content)
- [ ] Has at least one outbound `[[wikilink]]` (not an island)
- [ ] Is referenced by at least one other page (not an orphan)

**Content checks:**
- [ ] Claims are not contradicted by another wiki page
- [ ] Claims are not superseded by a more recent source (check `wiki/log.md` for newer ingests on the same topic)
- [ ] Important concepts/people/projects mentioned in the body have their own wiki page
- [ ] Source citations link to pages that actually exist in `wiki/sources/`

---

## Step 3 — Produce findings

Group findings by severity:

**🔴 Critical** — content is wrong, contradicted, or actively misleading
**🟡 Medium** — missing cross-references, orphan pages, stubs that should be filled
**⚪ Low** — cosmetic, missing optional fields, minor gaps

Format:

```
## Findings

### 🔴 Critical
- `wiki/concepts/foo.md` contradicts `wiki/concepts/bar.md` on [claim] — one of these needs updating

### 🟡 Medium
- `wiki/concepts/baz.md` — orphan page, not linked from anywhere
- `wiki/concepts/qux.md` mentions [[some-concept]] but that page doesn't exist
- `wiki/sources/old-source.md` — claim about X may be superseded by more recent ingest on [date]

### ⚪ Low
- `wiki/people/name.md` — `updated` field is stale (last touched [date])
```

---

## Step 4 — Suggest next actions

After findings, produce two lists:

**Suggested fixes** (things to do in the wiki now):
- Pages to create (concepts mentioned but lacking a page)
- Cross-references to add
- Contradictions to resolve (suggest which version to keep and why)

**Suggested ingests** (gaps that need new raw sources):
- Topics the wiki covers shallowly where a new source would help
- Open questions from deep-dive pages that haven't been answered
- Anything flagged as potentially stale that could be verified with a fresh source

---

## Step 5 — Apply fixes (--fix only)

If `--fix` was passed, apply these automatically without asking:
- Add missing `[[wikilinks]]` where a referenced concept has a page
- Update `updated:` frontmatter dates on touched pages

Ask before:
- Creating new stub pages
- Removing or rewriting any existing content
- Resolving contradictions (always ask which version to keep)

---

## Step 6 — Update log

Append to `wiki/log.md`:

```
## [YYYY-MM-DD] lint | <N> critical, <N> medium, <N> low findings
```

If `--fix` was passed and fixes were applied:

```
## [YYYY-MM-DD] lint | <N> findings, <N> auto-fixed
```

---

## Step 7 — Report

- Total pages scanned
- Finding counts by severity
- Top 3 most urgent fixes
- Top 3 suggested next ingests
