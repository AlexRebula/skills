---
name: load-session-context
description: Load recent session history so a new session can pick up where the last one left off. Reads the sessions index, loads only the latest wrap file from the most recent session, and surfaces pending tasks and unresolved blockers. Run at the start of any session before the user's first task.
---

# Load Session Context

> If `{{SESSIONS_ROOT}}` appears as a literal placeholder (i.e. was not substituted by your environment), invoke `/resolve-ai-paths` before continuing. It will scan for the sessions folder and return the resolved value.

## Session index

Open `{{SESSIONS_ROOT}}/sessions-index.md`.

Find the **5 most recent rows** by date. Note the title and primary work for each.

## Latest wrap file

**Always read the latest wrap file from the most recent session** (load it now):

1. Take the session folder from the most recent row's `Folder` column.
2. List the files in that folder: `ls "{{SESSIONS_ROOT}}/<session-name>/"`
3. Read the **highest-numbered file** (e.g. `05-...md` if it exists, else `01-...md`).
4. This is your "where we left off" context. Extract: pending tasks, unresolved blockers, decisions made.

**Do NOT load all wrap files from the session** — only the latest one. Older files in the same session folder are superseded by the latest.

## Today's morning brief (if it exists)

Check `{{MORNING_BRIEFS_ROOT}}/<today's date>/`. If any `.md` files exist, read the highest-numbered one. This tells you if a standup already ran today.

## Older sessions

For the 4 older sessions: read titles and projects from the index only — do not open their files unless they contain an unresolved blocker flagged as relevant to today.

## Report

After loading, print a short summary:

```
**Picked up from:** <session title> (<date>)
**Pending tasks:**
- [BLOCKING] ...
- [HIGH] ...
- [LOW] ...
**Last open branch/PR:** <branch> → PR #N
```

Then wait for the user's instruction.
