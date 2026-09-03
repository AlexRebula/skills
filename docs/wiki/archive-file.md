## What it does

`archive-file` moves one stale file into your repo's archive folder, stamps its frontmatter with just enough metadata to explain itself later (`created`, `summary`, `archived`/`archived_date`, and optional `parent`/`children`/`related` links), records the move in a running archive log, and flags — without touching — any other page that still links to it.

It is a minimal v1 primitive. It does not decide a file is stale for you, and it does not go rewrite every other page that referenced it. Both of those are explicitly out of scope for now.

## Locating the archive folder and log

Neither location is hardcoded. The skill scans the repo for a folder literally named `_archive`, and for a file named `archive-log.md` alongside wherever the rest of the wiki's index/log files live — the same scan-for-a-marker approach `resolve-ai-paths` uses for session/prompt folders. First run in a repo with neither yet: it proposes sensible defaults and asks before creating anything.

## What goes on the file

- `created` — pulled from the file's first commit in git history where possible, otherwise asked
- `summary` — drafted from the file's own content and shown to you to confirm or edit
- `archived` / `archived_date` — the lifecycle stamp
- `parent` / `children` / `related` — optional, only added if you say they apply

Every existing frontmatter field on the file is left untouched; this only adds fields, never rewrites others.

## Before it moves anything

It asks whether the file should go through something else first — captured as a task, ingested, cleaned up, whatever fits. If you're not sure what's available, it points you at `/ask-alex` rather than keeping its own list of candidate skills, which would just go stale the next time a skill is renamed or added.

## What it won't do

- Auto-rewrite other pages' links to the file it just archived — it lists them, you fix them
- Detect staleness on its own — you decide a file is stale; this skill only acts on that decision
- Invent a frontmatter convention if your repo doesn't already document one — it asks rather than guessing

## It's working if

- The archived file is self-describing: anyone opening it cold can tell what it was, when it was written, and when/why it was archived, without cross-referencing anything else.
- The archive log has one new entry pointing back at the file.
- Nothing else in the repo silently broke — any dangling reference was surfaced, not swept under the rug.
