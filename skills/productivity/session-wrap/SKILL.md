---
name: session-wrap
description: Write a session wrap document summarising completed work, open blockers, and next steps. Saves to the configured sessions folder, updates the session index, and hands off to /wip-sweep to commit the session's own artifacts. Use at context >55%, after completing major work, or before ending a session.
argument-hint: 'Optional: focus hint for the next session (e.g. "continue stat-card TDD")'
---

# Session Wrap

> **Prerequisites:** This skill requires two template variables defined in your environment (e.g. `settings.json` `env` block, `.env` file, or shell profile):
>
> | Variable            | Points to                               | Example               |
> | ------------------- | --------------------------------------- | --------------------- |
> | `{{SESSIONS_ROOT}}` | Folder where session folders are stored | `C:/your/sessions/folder` |
> | `{{PROMPTS_ROOT}}`  | Folder where the prompt catalogue lives | `C:/your/prompts/folder`  |
>
> `{{VSCODE_TARGET_SESSION_LOG}}` is optional — used in Step 2a to recover the full transcript. If unavailable the skill degrades gracefully.
>
> If either `{{SESSIONS_ROOT}}` or `{{PROMPTS_ROOT}}` appears as a literal placeholder (i.e. was not substituted by your environment), invoke `/resolve-ai-paths` before continuing. It will scan for the sessions folder and return both values.

> **⛔ Template variable guard:** Before running any step, check whether `{{SESSIONS_ROOT}}` is still a literal string (i.e. was not substituted). If it is, stop immediately and tell the user: `SESSIONS_ROOT is not resolved. Run /resolve-ai-paths first.` Do not proceed past this point until SESSIONS_ROOT is a real filesystem path.

---

## Step 0 — Pre-flight: auto-collapse same-day folders

Run immediately, no prompt needed.

1. **Determine today's date** as `YYYY-MM-DD`.

2. List `{{SESSIONS_ROOT}}` and find every folder whose name starts with `YYYY-MM-DD-`.

3. **If zero or one folder matches today's date:** nothing to collapse — proceed to Step 0b.

4. **If two or more folders match today's date:**

   a. Look at the folder _names_ only (do not read file content — that wastes tokens).

   b. Generate a combined slug: 3–6 kebab-case words that describe the combined scope drawn from the folder name slugs themselves.
   - Good: `pr-sweep-morning-brief`, `bucket-restructure-wip-pr64`, `asana-obsidian-pr-review`
   - Never use generic words: `session`, `wrap`, `work`, `misc`, `updates`.

   c. Run the collapse script:

   ```sh
   npx tsx "{{SKILLS_ROOT}}/scripts/collapse-sessions.ts" \
     --sessions-root "{{SESSIONS_ROOT}}" \
     --slug "<combined-slug>" \
     --date "YYYY-MM-DD"
   ```

   The script handles everything: file moves, NN renumbering, `→ Next` link repairs, `sessions-index.md` row merge, old-folder deletion.

   d. Print the script output verbatim.

**Do not process previous-date folders.** Only today's date is in scope for Step 0. If you notice uncollapsed folders from a prior date, note them to the user but take no action — those folders contain already-committed history.

Continue to Step 0b.

---

## Step 0b — Link integrity check (automatic)

Before writing anything new, scan the current session folder for broken or missing `→ Next` links. This catches stale links left by earlier folder-collapse renumbering.

**Determine the session folder.** If this is a brand-new session (no folder yet), skip to Step 1 — nothing to repair.

If the folder exists and contains `.md` files:

1. **List all `.md` files** in the folder, sorted by name (`01-foo.md`, `02-bar.md`, …).

2. **For each file except the last one:**

   a. Check whether it contains a `**→ Next:**` wikilink (`[[slug|label]]`).

   b. **If a link is present:** extract the linked slug (everything before `|` in `[[slug|...]]`).
   - If a file named `<slug>.md` exists in the same folder → link is valid, no action.
   - If no such file exists → search the folder for a file whose _semantic slug_ matches (the portion after the `NN-` prefix). If found, repair the `NN-` prefix in the link in-place.
   - If no matching file is found at all → flag as unresolvable: `⚠️ Unresolvable → Next in <file>: [[<slug>]] — target not found, repair manually`

   c. **If no `→ Next` link is present:** note it as missing (you will add it in Step 4 when the new file is saved).

3. **Detect backward links** (where the linked file's `NN` ≤ the source file's `NN`): flag these — they always mean the link is pointing backward to a previous file, which breaks Obsidian navigation.

4. Print a repair report before continuing:

   ```
   LINK INTEGRITY CHECK
   ─────────────────────────────────────────────────────────
   Fixed:   05-foo.md  [[02-bar|02 — Bar]] → [[06-bar|06 — Bar]]  (renumbered during collapse)
   ✅ OK:    01-baz.md  [[02-qux|02 — Qux]]
   ⚠️ Missing → Next: 03-quux.md  (will be wired in Step 4 after new file is saved)
   ⚠️ Unresolvable: 07-gap.md  [[99-missing|...]] — target not found, repair manually
   ─────────────────────────────────────────────────────────
   ```

   If no issues are found, print: `✅ Link integrity: all → Next links valid`

5. Apply all identified fixes now (before writing the new wrap file).

**Scope:** only inspect the folder this wrap will be saved to — never touch session folders from previous dates.

---

## Step 1 — Name this session

**First — check if this is a continuation of an existing session.**

Look for any of these signals in the conversation context:

- A `<conversation-summary>` block (context compaction) that references a session name or path
- An attached folder from `{{SESSIONS_ROOT}}/<session-name>/` passed as context
- The summary includes a path like `<session-name>/<NN>-*.md`

If **any** signal is present, **use the existing session name** — do not generate a new one. The wrap file will be `<N+1>-<semantic-slug>.md` inside the existing folder.

If **no** signals are present, generate a new session name:

1. **Machine name** — used as the folder and filename prefix
   - Format: `YYYY-MM-DD-<slug>` (today's date + 3–5 words in kebab-case)
   - Good: `2026-05-24-stat-card-tdd`, `2026-05-24-pr53-title-fixes`
   - Bad: `misc-updates`, `session`, `work`

2. **Human title** — used as the document heading
   - A short readable sentence describing what happened (max 10 words)
   - Good: `PR #53 Story Title Fixes`, `Stat Card TDD — Red/Green/Refactor`
   - Bad: `2026-05-22-pr53-review-response`

Print all four on their own lines:

```
**Session name:** YYYY-MM-DD-<slug>
**Title:** <Human title>
**Model:** <model name — e.g. Claude Sonnet 4.6, GPT-4o>
**Session ID:** <UUID if available, else N/A>
```

**How to find the session ID:** if `{{VSCODE_TARGET_SESSION_LOG}}` resolves to a path, its last segment is the UUID — extract it. If the variable is unavailable, write `N/A`.

---

## Step 2 — Deduplication check (continuation sessions only)

Scan the session folder for existing wrap files:

```sh
ls "{{SESSIONS_ROOT}}/<session-name>" 2>/dev/null
```

If **no** `NN-*.md` files exist → first wrap; proceed to Step 3 with no constraints.

If **prior files exist**, read each in full and build an inventory of already-captured content:

- Every topic row in their "Topics Covered" tables
- Every path in their "Files Edited" / "Actions Taken" sections
- Every row in their "Decisions" sections
- Every task in their "Pending Tasks" sections

When writing Step 3, apply these rules:

- **Omit anything already captured** — reference instead: `> Already documented in [<NN>-<slug>.md](<NN>-<slug>.md). No change.`
- **Include updated items** with a clear `[UPDATED]` marker: `> [UPDATED since <NN>-<slug>.md] PR #19 is now merged. Was: open.`
- **Open the Summary** with a continuation note: `> Continuation from [<NN>-<slug>.md]. This file covers work done after the prior checkpoint.`
- **Pending Tasks** — only list tasks that are NEW or status-changed since the last wrap. For unchanged tasks: `Other pending tasks unchanged — see [<NN>-<slug>.md].`

---

## Step 2a — Recover full history from transcript (mandatory)

The in-context summary is **always incomplete** if the conversation was compacted one or more times. Do not skip this step even if the current context feels complete.

1. Read `{{VSCODE_TARGET_SESSION_LOG}}` (JSONL — one JSON object per line).
2. Extract every `<conversation-summary>` block found in the file. Each block is a compaction checkpoint that summarises what happened before that point in the session.
3. Also read the uncompacted tail — any tool calls and assistant messages that appear **after** the final `<conversation-summary>` block.
4. If this is a continuation wrap, find the timestamp of the previous wrap file and include only activity recorded **after** that timestamp.

**Step 2a is evidence-based, not recall-based.** Do not write anything from memory. Every item in the wrap must be traceable to one of the four categories below.

### 2a.1 — Build the evidence inventory (four categories, all mandatory)

Scan the full transcript — every compaction block and the uncompacted tail — and produce a checklist in exactly this format. **Do not proceed to Step 3 until this checklist is complete and shown to the user.**

```
PRE-WRITE EVIDENCE CHECKLIST
─────────────────────────────────────────────────────────
SKILLS INVOKED  (scan for /word patterns and skill invocation signals)
  - /skill-name ✓ → outcome (e.g. "created #84")
  - /skill-name ✗ → proposed but not executed
  [none] if no skills were invoked

GITHUB WRITES  (scan for issues_create, pull_request_create, gh api POST, mcp_gitkraken_issues_create, mcp_gitkraken_pull_request_create, gh pr create, gh issue create)
  - issues_create → #NN "title"
  - pull_request_create → PR #NN
  [none] if no GitHub writes were made

FILES EDITED  (scan for replace_string_in_file, multi_replace_string_in_file, create_file, write_file)
  - path/to/file.md  ← repo-relative only (strip any absolute prefix up to and including the repo root folder)
  [none] if no files were edited

  Path normalisation rule: if a scanned path is absolute (starts with `/`, `C:\`, `C:/`, or any drive letter), strip everything up to and including the repository root folder name. Record only the portion from the repo root downward (e.g. `wiki/sources/foo.md` not the full absolute path). If the repo root cannot be determined, replace the home-directory prefix with `~`.

USER DECISIONS  (scan for agreement/confirmation signals: "confirmed", "agreed", "split", "let's do", "AFK", "yes", "no, don't", "that's right")
  - Decision text — context/consequence
─────────────────────────────────────────────────────────
```

Show this checklist to the user before writing the wrap document. The user can correct omissions before anything is committed to disk.

### 2a.2 — Derive the wrap from the checklist

- **Topics Covered table** — every skill in SKILLS INVOKED gets a row. Completed skills are 🎯 Primary or 🔀 Detour; proposed-but-not-executed skills are ❓ Unanswered.
- **Files Edited section** — populated from FILES EDITED only.
- **Decisions section** — populated from USER DECISIONS only.
- **Pending Tasks section** — each task must reference its source: which skill produced it, which user decision shaped it, which issue number it targets.
- **Current State section** — references GITHUB WRITES to state what was actually created/updated.

**If `{{VSCODE_TARGET_SESSION_LOG}}` is unavailable** (path not resolved or not provided by the platform), produce the checklist from context alone and add this note to both the checklist and the wrap document:

> ⚠️ Transcript not available — checklist built from context only. Skills invoked and GitHub writes may be incomplete. Verify against screenshots or a separate session log if critical work happened before the last context compaction.

---

## Step 2c — Cross-repo issue routing (automatic)

Run immediately after the evidence checklist is shown. Skip silently if GITHUB WRITES contains no issues.

### Trigger rule

An issue is **cross-repo** if its body contains any of the following signals:
- The phrase `This is a **handover issue**`
- A line like `> ⚠️ This is a **handover issue**`
- A phrase like `change must be made in \`Owner/repo\``
- A phrase like `the work must happen in \`Owner/repo\``
- A `**Target repo:**` field naming a different repo

If the issue body contains none of these signals, it is a **same-repo issue** — skip it.

### For each cross-repo issue

**1. Determine the current repo and target repo**

```sh
CURRENT_REPO=$(gh repo view --json nameWithOwner --jq '.nameWithOwner')
```

Extract the target repo from the issue body (the `Owner/repo` value named in the signal phrase above).

**2. Apply labels**

The repo-name label is the target repo's name in `owner-repo` format (e.g. `AlexRebula/skills` → label `AlexRebula/skills`). Apply both labels in one command:

```sh
gh issue edit <issue-number> \
  --repo "$CURRENT_REPO" \
  --add-label "handover,<target-repo-name>"
```

If the label does not exist in the current repo, note it and skip — do not create labels mid-wrap.

**3. Create Asana task**

Read `_config/asana-github-issues.json` (relative to the wiki repo root) to find:
- `asana.workspace` — the Asana workspace name
- `asana.projectGid` — the Asana project GID
- The `sectionGid` for the target repo under `repos[]`

If the config file is not found or the target repo has no entry, log a warning and skip the Asana step for that issue.

Create the task using the Asana MCP tool:

```
create_tasks:
  workspace: <asana.workspace from config>
  name: "<issue title>"
  notes: "<issue URL>\n\n<first paragraph of issue body>"
  projects: ["<projectGid>"]
  memberships: [{ project: "<projectGid>", section: "<sectionGid>" }]
```

### Output

After processing, print a routing report:

```
CROSS-REPO ROUTING
─────────────────────────────────────────────────────────
Issue #NN  →  handover + <owner>/<target-repo>  ✅ labels applied  ✅ Asana task created
Issue #NN  →  same-repo (<owner>/<current-repo>)  — skipped
─────────────────────────────────────────────────────────
```

If no issues were created this session, print: `Cross-repo routing: no issues created this session — skipped`

---

## Step 3 — Write the wrap document

Be concise — this is a continuity pointer for agents, not a narrative. Do not duplicate content already captured in commits, PRs, issues, or ADRs; reference by path or URL instead.

```markdown
# <Human title>

<YYYY-MM-DD>

**Model:** <model name> **Session ID:** `<UUID>` | `N/A`

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

Paths only — no file content. All paths must be repo-relative (e.g. `wiki/sources/foo.md`). Never write absolute paths or paths containing a local username.

## Decisions

What was decided and why.

## Pending Tasks

Enough context to pick up immediately. If arguments were passed to the skill, make those the focus here.

## Suggested Skills

Skills the next agent should invoke (e.g. `/tdd`, `/diagnose`, `/wip-sweep`).
```

---

## Step 4 — Save the wrap file

Determine the filename using a **semantic slug** that describes the main thing that happened:

- Format: `<NN>-<semantic-slug>.md`
- `<NN>` is a zero-padded counter starting at `01`
- `<semantic-slug>` is 3–6 words in kebab-case describing the session's main outcome
- Examples: `01-pr25-review-response.md`, `02-skills-bucket-restructure.md`, `03-merge-conflicts-resolved.md`
- Never use generic labels like `initial`, `continued`, `wrap`, or `session`

Write the document to:

```
{{SESSIONS_ROOT}}/<session-name>/<NN>-<semantic-slug>.md
```

Create the directory if it does not exist. **Never overwrite** an existing numbered file.

**After saving the file, wire it into the → Next chain:**

- Find the file immediately before this one — `<NN-1>-*.md`.
- If that file ends with `**→ Next:** _(next session not yet started)_` or has no `→ Next` line: replace/append the link:

  ```markdown
  ---

  **→ Next:** [[<NN>-<semantic-slug>|<NN> — <Human title>]]
  ```

- If that file already has a valid `→ Next` pointing to the correct slug, leave it untouched.
- This file (`<NN>-<semantic-slug>.md`) is the last in the chain — append a trailing marker at the end:

  ```markdown
  ---

  **→ Next:** _(next session not yet started)_
  ```

---

## Step 4b — Post-save same-day folder check

Run immediately after Step 4 completes (the new folder now exists on disk).

1. List `{{SESSIONS_ROOT}}` and count folders whose name starts with today's `YYYY-MM-DD-`.

2. **If the count is 1** (the folder you just created is the only one for today): no action — proceed to Step 5.

3. **If the count is 2 or more** (today's date now has multiple folders), notify the user and immediately run the collapse procedure:

   > ⚠️ A second folder for YYYY-MM-DD was just created (`<new-folder>`). There is already a folder for today: `<existing-folder(s)>`. Collapsing same-day folders now to preserve the one-folder-per-day invariant.

4. Run the Step 0 collapse procedure now — generate a combined slug from the folder name slugs, run the collapse script, print its output — then proceed to Step 5.

**Why here and not Step 0:** Step 0 runs before the new folder exists, so it can never detect a collision caused by this session itself. Step 4b runs after the folder is created, catching the case where this session is the one that introduced the duplicate.

---

## Step 5 — Update the session index

Open `{{SESSIONS_ROOT}}/sessions-index.md`.

If `sessions-index.md` does not exist, create it with this header:

```markdown
# Session Index

> Each session is stored in its own folder. Multiple wraps from the same session appear as numbered files inside the folder — named `<NN>-<slug>.md` with a semantic slug (e.g. `01-merge-conflicts-resolved.md`).

| Date | Title | Projects | Topics | Wraps | Model(s) | Session ID | Folder |
| ---- | ----- | -------- | ------ | ----- | -------- | ---------- | ------ |
```

**If a row already exists for this session** (match on session name slug in the Folder column): increment **Wraps** by 1, append the model to **Model(s)** if not already listed, and update **Session ID** to the latest (or append with `, ` if multiple).

**If no row exists**: append a new row:

| Column     | Value                                          |
| ---------- | ---------------------------------------------- |
| Date       | today's date                                   |
| Title      | human title from Step 1                        |
| Projects   | comma-separated repo/project names             |
| Topics     | comma-separated tags from Topics Covered table |
| Wraps      | `1`                                            |
| Model(s)   | model name from Step 1                         |
| Session ID | first 8 chars of UUID, or `N/A`                |
| Folder     | `[<session-name>](./<session-name>/)`          |

---

## Step 6 — Update prompt catalogue (if applicable)

Check the Files Edited list from Step 3. If any `.prompt.md` files were created or modified this session, upsert a row in `{{PROMPTS_ROOT}}/prompts-index.md`.

For each affected prompt file:

1. Read its YAML frontmatter for `name:` and `description:`.
2. If `prompts-index.md` does not exist, create it with this header:

   ```markdown
   # Prompt Catalogue

   | Name | Invoked as | Description | Created | Last Updated | File |
   | ---- | ---------- | ----------- | ------- | ------------ | ---- |
   ```

3. If a row already exists for the file: update `Last Updated` to today's date only.
4. If it is a new prompt: append a row with Name, `/`-prefixed invocation, description, Created date, Last Updated date, and `[<filename>.prompt.md](./<filename>.prompt.md)` link.

If no prompt files were touched this session, skip this step silently.

---

## Step 7 — Final → Next chain scan (automatic, before wip-sweep)

Before handing off to `/wip-sweep`, verify every file in the session folder has a correct `→ Next` link.

1. List all `.md` files in the session folder, sorted by name.
2. For each file **except the last:**
   - Check that it ends with `**→ Next:** [[<slug>|...]]` pointing to the next file in sequence.
   - If missing or broken: add/fix the link in-place now.
3. For the **last file:**
   - Check that it ends with `**→ Next:** _(next session not yet started)_`.
   - If missing: append it now.
4. Print a confirmation:

   ```
   → NEXT CHAIN
   ─────────────────────────────────────────────────────────
   ✅ 01-foo.md  →  [[02-bar|02 — Bar]]
   ✅ 02-bar.md  →  [[03-baz|03 — Baz]]
   ✅ 03-baz.md  →  (next session not yet started)
   ─────────────────────────────────────────────────────────
   ```

**This step is non-negotiable.** Do not hand off to `/wip-sweep` until every file in the folder has its `→ Next` link.

---

## Step 7b — Hand off to /wip-sweep (one-way, no loop)

After saving the wrap files and updating the index, the sessions repo has new or modified `.md` artifacts. Source repos touched during the session may also have uncommitted changes.

Call `/wip-sweep` now. When wip-sweep asks which repos to sweep, answer:

> "Sweep only the repos dirtied during this session: [list repos and what changed in each]"

**Loop safety:** wip-sweep commits existing dirty files and creates no new ones. There is nothing new to wrap after it completes. The dependency is strictly one-way: `session-wrap → wip-sweep`.

wip-sweep's T2/T3/T4 tier gates are where the user reviews branch names and approves pushes. This skill does not propose branches — that is wip-sweep's responsibility.

---

## ⛔ Non-negotiable invariants

**0. NEVER COMMIT OR PUSH DIRECTLY TO MAIN. NOT EVEN SESSION WRAP FILES.**

Session wrap files, index updates, and any other artifacts produced by this skill are not exempt from the branch + PR rule. Every change to any repo must go through a branch and a pull request — no exceptions, no matter how small or "safe" the change appears.

The correct flow for committing session wrap artifacts:
1. Create a `chore/session-wrap-YYYY-MM-DD` branch
2. Commit the wrap file, index update, and any `→ Next` link repairs to that branch
3. Push the branch and open a PR
4. Do NOT merge the PR yourself — leave it for the user to merge

If `/wip-sweep` is handling the commit, it will create branches via its own tier gates. Do not bypass that process.

**1. THERE SHOULD BE NO SEPARATE FOLDERS WITH THE SAME DATE PREFIX — THERE SHOULD ONLY BE ONE.**

Every session that happens on the same calendar day belongs in the same folder. Multiple wrap files within that folder (`01-`, `02-`, `03-`, …) are how intra-day sessions are separated — not multiple folders.

If at any point during this skill's execution two or more folders share a `YYYY-MM-DD-` prefix, collapse them before proceeding. No exceptions.

**2. EVERY NON-LAST FILE IN A SESSION FOLDER MUST HAVE A `→ Next` WIKILINK TO THE NEXT FILE. THE LAST FILE MUST HAVE THE `_(next session not yet started)_` MARKER.**

The `→ Next` chain is how Obsidian navigation and session continuity work. A missing link breaks the chain for every agent that follows. Step 7b enforces this at the end of every run — but the rule holds at all times, not just during session-wrap.
