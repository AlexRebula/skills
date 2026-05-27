---
name: session-wrap
description: Write a session wrap document summarising completed work, open blockers, and next steps. Saves to the AI_ROOT sessions folder, updates the session index, and hands off to /wip-sweep to commit the session's own artifacts. Use at context >55%, after completing major work, or before ending a session.
argument-hint: 'Optional: focus hint for the next session (e.g. "continue stat-card TDD")'
---

# Session Wrap

> **Prerequisite:** This skill requires `AI_ROOT` to be defined as a template variable in your
> environment (e.g. via VS Code settings or a `.env` file). `AI_ROOT` should point to the root
> of your AI workflow folder — the folder that contains `Agents/Sessions/`, `Agents/Prompts/`,
> and `Agents/Morning Briefs/`.

## Obsidian Compatibility Rules

Applies to **every file created by this skill** (and any other skill that writes to `AI_ROOT`):

- **No leading underscores** in filenames. Use `sessions-index.md`, not `_index.md`.
- **No trailing dots or spaces** in filenames.
- **No folder links with trailing slashes** — Obsidian treats `[label](./folder/)` as a new note to create, not a folder link. Link to a specific note file instead.
- **Use wikilinks for internal cross-references:** `[[path/to/note|display text]]`. These render correctly in Obsidian and survive graph-view traversal.
- **Every note name must be semantically unique** — names like `initial`, `continued`, or `index` used alone are invisible in the graph view. Combine a number prefix with a 3–5 word slug: `01-stat-card-tdd-complete`, `02-pr-review-conflicts`.
- **README.md is the only exception** — GitHub requires this exact name for repo root documentation.

## Step 1 — Name this session

**First — check if this is a continuation of an existing session.**

Look for any of these signals in the conversation context:

- A `<conversation-summary>` block (context compaction) that references a session name or path
- An attached folder from `{{AI_ROOT}}\Agents\Sessions\<session-name>\` passed as context
- The summary includes a path like `Sessions\<session-name>\<NN>-*.md`

If **any** signal is present, **use the existing session name** — do not generate a new one.
The wrap file will be `<N+1>-continued.md` inside the existing folder.

If **no** signals are present, generate a new session name:

1. **Machine name** — used as the filename
   - Format: `YYYY-MM-DD-<slug>` (today's date + 3–5 words in kebab-case)
   - Good: `2026-05-24-giselle-mui-stat-card-tdd`, `2026-05-24-first-branch-task-status-dropdown`
   - Bad: `misc-updates`, `session`, `work`

2. **Human title** — used as the document heading
   - A short readable sentence describing what happened (max 10 words)
   - Good: `giselle-mui — PR #53 Story Title Fixes`
   - Bad: `2026-05-22-giselle-mui-pr53-review-response`

Print all four on their own lines:

```
**Session name:** YYYY-MM-DD-<slug>
**Title:** <Human title>
**Model:** <model name — e.g. Claude Sonnet 4.6, GPT-4o>
**Session ID:** <UUID if available, else N/A>
```

**How to find the session ID (VS Code Copilot):** the template variable
`{{VSCODE_TARGET_SESSION_LOG}}` contains a path whose last segment is a UUID. Extract it.
On all other platforms (Claude.ai, Gemini web, etc.), write `N/A`.

---

## Step 2 — Deduplication check (continuation sessions only)

Scan the session folder for existing wrap files:

```sh
ls "{{AI_ROOT}}\Agents\Sessions\<session-name>" 2>/dev/null
```

If **no** `NN-*.md` files exist → first wrap; proceed to Step 3 with no constraints.

If **prior files exist**, read each in full and build an inventory of already-captured content:

- Every topic row in their "Topics Covered" tables
- Every path in their "Files Edited" / "Actions Taken" sections
- Every row in their "Decisions" sections
- Every task in their "Pending Tasks" sections

When writing Step 3, apply these rules:

- **Omit anything already captured** — reference instead:
  `> Already documented in [[<NN-1>-<prev-slug>]]. No change.`
- **Include updated items** with a clear `[UPDATED]` marker:
  `> [UPDATED since [[<NN-1>-<prev-slug>]]] PR #19 is now merged. Was: open.`
- **Open the Summary** with a continuation note (use Obsidian wikilink, not markdown link):
  `> Continuation from [[<NN-1>-<prev-slug>]]. This file covers work done after the prior checkpoint.`
- **Pending Tasks** — only list tasks that are NEW or status-changed since the last wrap.
  For unchanged tasks: `Other pending tasks unchanged — see [[<NN-1>-<prev-slug>]].`

---

## Step 2a — Recover full history from transcript (mandatory)

The in-context summary is **always incomplete** if the conversation was compacted one or more
times. Do not skip this step even if the current context feels complete.

1. Read `{{VSCODE_TARGET_SESSION_LOG}}` (JSONL — one JSON object per line).
2. Extract every `<conversation-summary>` block found in the file. Each block is a
   compaction checkpoint that summarises what happened before that point in the session.
3. Also read the uncompacted tail — any tool calls and assistant messages that appear
   **after** the final `<conversation-summary>` block.
4. If this is a continuation wrap, find the timestamp of the previous wrap file and
   include only activity recorded **after** that timestamp.
5. Build a flat list of all distinct work items found across every compaction block
   **plus** the current context. This is the authoritative activity inventory.
6. Use this inventory — not the in-context summary alone — for the Topics Covered table
   in Step 3 and the Files Edited list.

**If `{{VSCODE_TARGET_SESSION_LOG}}` is unavailable** (non-VS-Code session or path not
resolved), proceed from context alone and add this note to the wrap document:

> ⚠️ Transcript not available — wrap may be incomplete. Verify against screenshots or
> a separate session log if critical work happened before the last context compaction.

---

## Step 3 — Write the wrap document

Be concise — this is a continuity pointer for agents, not a narrative. Do not duplicate content
already captured in commits, PRs, issues, or ADRs; reference by path or URL instead.

```markdown
# <Human title>

<YYYY-MM-DD>

**Model:** <model name>
**Session ID:** `<UUID>` | `N/A`

## Summary

One paragraph.

## Topics Covered

| Topic | Type           | One-line summary |
| ----- | -------------- | ---------------- |
| ...   | 🎯 Primary     | ...              |
| ...   | 🐇 Rabbit hole | ...              |

Types: 🎯 Primary · 🐇 Rabbit hole · 🔀 Detour (related but not the plan) · ❓ Unanswered

## Current State

In-progress and blocked items.

## Files Edited

Paths only — no file content.

## Decisions

What was decided and why.

## Pending Tasks

Enough context to pick up immediately. If arguments were passed to the skill, make those
the focus here.

## Suggested Skills

Skills the next agent should invoke (e.g. `/tdd`, `/diagnose`, `/wip-sweep`).
```

---

## Step 4 — Save the wrap file

Determine the filename:

- Format: `<NN>-<slug>.md` where `<slug>` is **3–5 kebab-case words** derived from the Summary.
- Choose the most distinctive words that make this file uniquely identifiable in the Obsidian graph view.
- Every wrap file — including the first — must have a semantic slug. **Never use `initial` or `continued` as the slug.**
- Good: `01-merge-conflicts-resolved.md`, `01-stat-card-tdd-complete.md`, `02-pr-review-respond.md`
- Bad: `01-initial.md`, `02-continued.md`, `03-session.md`

Write the document to **two locations** (same content, same filename at both):

```
%USERPROFILE%\AppData\Local\Temp\<session-name>\<NN>-<slug>.md
{{AI_ROOT}}\Agents\Sessions\<session-name>\<NN>-<slug>.md
```

Create both directories if they do not exist. **Never overwrite** an existing numbered file.

### Step 4a — Chain the previous wrap file (continuation sessions only)

If `NN > 1` (this is a continuation), open the previous wrap file
(`{{AI_ROOT}}\Agents\Sessions\<session-name>\<NN-1>-<prev-slug>.md`)
and **append** this footer to it:

```markdown

---

**→ Next:** [[<NN>-<slug>|<NN> — <display text>]]
```

- `<display text>` is 3–6 readable words derived from this wrap's Summary — same words as the slug, without hyphens.
- Use the short filename (no folder prefix) — Obsidian resolves unique names across the vault.
- This creates a forward-linked chain: every multi-part session is fully traversable from the index through `01 → 02 → 03 → …` without orphan nodes in the graph.

---

### Step 4b — Collapse same-day sessions into one folder

After saving the wrap file (and applying Step 4a if applicable):

**1. Scan for same-day folders.**

List all immediate subdirectories of `{{AI_ROOT}}\Agents\Sessions\` whose name starts with today's date in `YYYY-MM-DD-*` format.

**2. If only one folder matches today's date** — nothing to collapse. Skip the rest of this step.

**3. If two or more folders share today's date**, perform the collapse:

#### 3a — Derive the combined slug

- Extract the slug portion (the part after `YYYY-MM-DD-`) from every same-day folder name.
- Build a combined slug: take the 1–2 most distinctive words from each slug, join with `-`, cap at **6 words total**.
- The result should be a compact, readable summary of everything done today.
- Example: `skills-bucket-restructure-pr` + `skills-generalization-merge-fix` + `wip-sweep` → `skills-bucket-generalization-merge-wip`
- If all same-day slugs share a common prefix (e.g. all start with `skills-`), use the prefix once then append the differentiating words.
- Good: `giselle-theme-pr-triage-asana-sync`
- Bad: `session`, `misc`, `work`, or a slug longer than 6 words

#### 3b — Create the combined folder

```
{{AI_ROOT}}\Agents\Sessions\YYYY-MM-DD-<combined-slug>\
```

#### 3c — Determine move order

Sort the same-day folders chronologically by the creation timestamp of their earliest wrap file (`01-*.md`). Within each folder, files are already in `NN-` order — preserve that intra-folder sequence. The result is a flat ordered list of all wrap files across all same-day folders.

#### 3d — Move and renumber all files

Assign new sequential `NN-` numbers across the full flat list (01, 02, 03, …). Keep the original slug portion of every filename unchanged — only the `NN-` prefix changes.

Example: folder A has `01-pr-review.md`, `02-eslint-fix.md`; folder B has `01-asana-seed.md`. Result: `01-pr-review.md`, `02-eslint-fix.md`, `03-asana-seed.md` in the combined folder.

#### 3e — Fix `→ Next:` footer links

For every file moved and renumbered, check its content for `→ Next:` footers:

- If the footer's target `[[<old-NN>-<slug>]]` is another file from the same original session folder, update the `old-NN` prefix to the new number the target file received in step 3d.
- If the last file of one session has no `→ Next:` footer but there is a next session's file immediately following in the new combined order, **add** a `→ Next:` footer linking to that next file. This bridges separate sessions into one traversable chain.
- Do not touch any footer that points outside the sessions folder (external links, PR links, etc.).

#### 3f — Delete the now-empty old folders

After all files are moved, delete the now-empty original same-day session folders.

#### 3g — Update `sessions-index.md`

All index rows whose Folder column pointed to a same-day folder must be merged:

- Find every row in `sessions-index.md` whose Date matches today and whose Folder slug is one of the now-deleted folders.
- Delete those rows.
- Insert one replacement row:

| Column     | Value                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Date       | today's date                                                                                      |
| Title      | comma-joined session titles (or a 5–8 word combined sentence describing the day's work)           |
| Projects   | union of all projects from merged rows                                                            |
| Topics     | union of all topics from merged rows                                                              |
| Wraps      | total wrap file count across all merged sessions                                                  |
| Model(s)   | union of all models from merged rows                                                              |
| Session ID | comma-separated IDs from merged rows (or first 8 chars each)                                      |
| Folder     | `[[<combined-session-name>/01-<first-slug>\|<combined-session-name>]]` — links to the first file  |

---

## Step 5 — Update the session index

Open `{{AI_ROOT}}\Agents\Sessions\sessions-index.md`.

If `sessions-index.md` does not exist, create it with this header:

```markdown
# Session Index

> Each session is stored in its own folder. Multiple wraps from the same session appear as
> numbered files inside the folder — named `<NN>-<slug>.md` with a semantic slug.

| Date | Title | Projects | Topics | Wraps | Model(s) | Session ID | Folder |
| ---- | ----- | -------- | ------ | ----- | -------- | ---------- | ------ |
```

**If a row already exists for this session** (match on session name slug in the Folder column):
increment **Wraps** by 1, append the model to **Model(s)** if not already listed, and update
**Session ID** to the latest (or append with `, ` if multiple).

**If no row exists**: append a new row:

| Column     | Value                                                                             |
| ---------- | --------------------------------------------------------------------------------- |
| Date       | today's date                                                                      |
| Title      | human title from Step 1                                                           |
| Projects   | comma-separated repo/project names                                                |
| Topics     | comma-separated tags from Topics Covered table                                    |
| Wraps      | `1`                                                                               |
| Model(s)   | model name from Step 1                                                            |
| Session ID | first 8 chars of UUID, or `N/A`                                                   |
| Folder     | `[[<session-name>/<NN>-<slug>\|<session-name>]]` — links to the first wrap file   |

> **Obsidian note:** use a wikilink in the Folder column that targets the first wrap file (not the folder). The display text is the session-name folder. This ensures Obsidian graph traversal works and avoids the "not created yet" tooltip caused by trailing-slash folder links.

---

## Step 6 — Update prompt catalogue (if applicable)

Check the Files Edited list from Step 3. If any `.prompt.md` files were created or modified
this session, upsert a row in `{{AI_ROOT}}\Agents\Prompts\prompts-index.md`.

For each affected prompt file:

1. Read its YAML frontmatter for `name:` and `description:`.
2. If `prompts-index.md` does not exist, create it with this header:

   ```markdown
   # Prompt Catalogue

   | Name | Invoked as | Description | Created | Last Updated | File |
   | ---- | ---------- | ----------- | ------- | ------------ | ---- |
   ```

3. If a row already exists for the file: update `Last Updated` to today's date only.
4. If it is a new prompt: append a row with Name, `/`-prefixed invocation, description,
   Created date, Last Updated date, and `[[<filename>|<filename>.prompt.md]]` wikilink.

If no prompt files were touched this session, skip this step silently.

---

## Step 7 — Hand off to /wip-sweep (one-way, no loop)

After saving the wrap files and updating the index, the `AI_ROOT` repo has new or modified
`.md` artifacts. Source repos touched during the session may also have uncommitted changes.

Call `/wip-sweep` now. When wip-sweep asks which repos to sweep, answer:

> "Sweep only the repos dirtied during this session: [list repos and what changed in each]"

**Loop safety:** wip-sweep commits existing dirty files and creates no new ones. There is
nothing new to wrap after it completes. The dependency is strictly one-way:
`session-wrap → wip-sweep`.

wip-sweep's T2/T3/T4 tier gates are where the user reviews branch names and approves pushes.
This skill does not propose branches — that is wip-sweep's responsibility.
