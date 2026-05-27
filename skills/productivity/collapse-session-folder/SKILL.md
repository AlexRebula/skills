---
name: collapse-session-folder
description: Collapse all same-day session wrap folders into one combined folder. Announces the plan, derives a combined slug, renumbers files sequentially, repairs → Next footer links, deletes old folders, and updates sessions-index.md. Depends on SESSIONS_ROOT — resolved via /resolve-ai-paths. Called automatically by /session-wrap but can be invoked independently to fix uncollapsed same-day folders at any time.
---

# Collapse Session Folder

Collapse all `YYYY-MM-DD-*` session folders for today's date into one combined folder.

## Path Resolution

Invoke `/resolve-ai-paths` to resolve `SESSIONS_ROOT`. Skip Step 2 of the resolver
(you do not need `PROMPTS_ROOT`). Substitute the returned value throughout all steps below.

**Today's date** — always `YYYY-MM-DD`. If invoked independently without a date, use today's date.

---

## Step 1 — Scan for same-day folders

List all immediate subdirectories of `{{SESSIONS_ROOT}}\` whose name starts with today's
date in `YYYY-MM-DD-*` format.

**If only one folder matches today's date** — nothing to collapse. Report this and stop.

---

## Step 2 — Announce before collapsing

Before touching any files, output a brief summary to the user:

```
Found N same-day session folders for YYYY-MM-DD:
  - 2026-05-27-<slug-1>/  (N wraps)
  - 2026-05-27-<slug-2>/  (N wraps)
  ...

Collapsing into: 2026-05-27-<combined-slug>/
```

This is informational — do not wait for confirmation. Proceed immediately. The purpose is to
make the collapse visible so the user can spot a mistake (wrong folders, wrong day) before
the index is updated.

> **Only today's folders are ever collapsed.** Never collapse sessions from previous days —
> their history is already committed and should not be rewritten. If you notice uncollapsed
> folders from a previous date, mention them to the user but do not touch them.

---

## Step 3 — Derive the combined slug

- Extract the slug portion (the part after `YYYY-MM-DD-`) from every same-day folder name.
- Build a combined slug: take the 1–2 most distinctive words from each slug, join with `-`,
  cap at **6 words total**.
- The result should be a compact, readable summary of everything done today.
- Example: `skills-bucket-restructure-pr` + `skills-generalization-merge-fix` + `wip-sweep`
  → `skills-bucket-generalization-merge-wip`
- If all same-day slugs share a common prefix (e.g. all start with `skills-`), use the prefix
  once then append the differentiating words.
- Good: `giselle-theme-pr-triage-asana-sync`
- Bad: `session`, `misc`, `work`, or a slug longer than 6 words

---

## Step 4 — Create the combined folder

```
{{SESSIONS_ROOT}}\YYYY-MM-DD-<combined-slug>\
```

---

## Step 5 — Determine move order

Sort the same-day folders chronologically by the creation timestamp of their earliest wrap
file (`01-*.md`). Within each folder, files are already in `NN-` order — preserve that
intra-folder sequence. The result is a flat ordered list of all wrap files across all
same-day folders.

---

## Step 6 — Move and renumber all files

Assign new sequential `NN-` numbers across the full flat list (01, 02, 03, …). Keep the
original slug portion of every filename unchanged — only the `NN-` prefix changes.

Example: folder A has `01-pr-review.md`, `02-eslint-fix.md`; folder B has
`01-asana-seed.md`. Result: `01-pr-review.md`, `02-eslint-fix.md`, `03-asana-seed.md` in
the combined folder.

---

## Step 7 — Fix `→ Next:` footer links

For every file moved and renumbered, check its content for `→ Next:` footers:

- If the footer's target `[[<old-NN>-<slug>]]` is another file from the same original session
  folder, update the `old-NN` prefix to the new number the target file received in Step 6.
- If the last file of one session has no `→ Next:` footer but there is a next session's file
  immediately following in the new combined order, **add** a `→ Next:` footer linking to
  that next file. This bridges separate sessions into one traversable chain.
- Do not touch any footer that points outside the sessions folder (external links, PR links,
  etc.).

Footer format:

```markdown

---

**→ Next:** [[<NN>-<slug>|<NN> — <display text>]]
```

---

## Step 8 — Delete the now-empty old folders

After all files are moved, delete the now-empty original same-day session folders.

---

## Step 9 — Update `sessions-index.md`

All index rows whose Folder column pointed to a same-day folder must be merged:

- Find every row in `sessions-index.md` whose Date matches today and whose Folder slug is one
  of the now-deleted folders.
- Delete those rows.
- Insert one replacement row:

| Column     | Value                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Date       | today's date                                                                                     |
| Title      | comma-joined session titles (or a 5–8 word combined sentence describing the day's work)          |
| Projects   | union of all projects from merged rows                                                           |
| Topics     | union of all topics from merged rows                                                             |
| Wraps      | total wrap file count across all merged sessions                                                 |
| Model(s)   | union of all models from merged rows                                                             |
| Session ID | comma-separated IDs from merged rows (or first 8 chars each)                                     |
| Folder     | `[[<combined-session-name>/01-<first-slug>\|<combined-session-name>]]` — links to the first file |
