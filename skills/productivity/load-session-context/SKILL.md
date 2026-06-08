---
name: load-session-context
description: Load recent session history and today's existing morning brief. Reads the session index, loads only the latest wrap file from the most recent session, and checks whether a standup brief already exists for today. Use as part of any session-startup workflow before producing a new morning brief.
---

# Load Session Context

> **Prerequisites:** This skill requires the `{{SESSIONS_ROOT}}` template variable (folder where session folders are stored) defined in your environment (e.g. `settings.json` `env` block, `.env` file, or shell profile).
>
> If `{{SESSIONS_ROOT}}` appears as a literal placeholder (i.e. was not substituted by your environment), invoke `/resolve-ai-paths` before continuing. It will scan for the sessions folder and return the value.

## Session index

Read the session index:

```
{{SESSIONS_ROOT}}/sessions-index.md
```

Find the **5 most recent rows** by date. Note the title and primary work for each.

## Latest wrap file

**Always read the latest wrap file from the most recent session** (load it now):

1. Take the session folder from the most recent row's Folder column.
2. List the files in that folder: `ls "{{SESSIONS_ROOT}}/<session-name>/"`
3. Read the **highest-numbered file** (e.g. `05-continued.md` if it exists, else `01-initial.md`).
4. This is your "where we left off" context. Extract: pending tasks, unresolved blockers, decisions made.

**Do NOT load all wrap files from the session** — only the latest one. Older files in the same session folder are superseded by the latest.

## Today's morning brief (if it exists)

Check the `Morning Briefs/<today's date>/` folder (a sibling of `{{SESSIONS_ROOT}}`). If any `.md` files exist, read the highest-numbered one. This tells you if a standup already ran today.

## Older sessions

For the 4 older sessions: read titles and projects from `sessions-index.md` only — do not open their files unless they contain an unresolved blocker flagged as relevant to today.
