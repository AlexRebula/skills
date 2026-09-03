---
name: archive-file
description: "Archive a stale wiki/notes file: move it to the repo's archive folder, stamp its frontmatter with created/summary/archived-date and parent/children/related links, log the move, and flag (not fix) any dangling references. A minimal v1 primitive — no auto-detection of staleness, no auto-rewriting of other pages. Use when the user says \"archive this file\", \"this is going stale, archive it\", or invokes /archive-file <path>."
---

# Archive File

Move one stale file into this repo's archive folder, with just enough recorded metadata that anyone finding it later (human or agent) knows what it was, when it was written, when it was archived, and why — without maintaining anything beyond that. This is a minimal primitive: it does one thing (archive a file someone has already decided is stale) and stops there. Staleness *detection* and any richer lifecycle management are explicitly out of scope for v1.

## Arguments

`/archive-file <path>`: archive the file at `<path>`. If no path is given, ask for one.

---

## Step 1: Resolve ARCHIVE_ROOT

The folder frozen/archived files get moved into. Work through these checks in order, stop at the first that succeeds:

1. **Template variable substituted**: if `{{ARCHIVE_ROOT}}` is a real filesystem path, use it. Done.
2. **Workspace scan**: search the repo for a folder literally named `_archive`.
   - **One result** → announce `"Detected archive folder: <path>"` and proceed.
   - **Multiple results** → list all candidates and ask: `"Which archive folder should I use?"`
   - **No result** → this is a first run in this repo. Propose a default (`raw/_archive/`, or the closest equivalent to wherever raw/unprocessed material otherwise lives in this repo) and ask the user to confirm before creating it. On confirmation, create the folder with a short README modeled on the existing convention (state that it holds frozen copies, is not to be maintained, and that the archive log records what went where and why).

## Step 2: Resolve ARCHIVE_LOG

The single running log of everything archived by this skill.

1. **Template variable substituted**: if `{{ARCHIVE_LOG}}` is a real filesystem path, use it. Done.
2. **Workspace scan**: search for a file named `archive-log.md` under the wiki content root (wherever `index.md`/`log.md` for the wiki live).
   - **One result** → use it.
   - **Multiple results** → list candidates and ask which.
   - **No result** → this is a first run. Propose creating it (e.g. `wiki/archive-log.md`) with the header and intro shown in `SCHEMA.md`'s "Archive Log Format" section, and confirm before creating.

## Step 3: Confirm the target and check it isn't already archived

- Read the target file. If it's already under `ARCHIVE_ROOT`, or already carries `archived: true` in frontmatter, stop and tell the user — nothing to do.
- If the file schema for this repo defines frontmatter fields (check for a `SCHEMA.md` or equivalent), use its "Common Frontmatter Fields" (or nearest equivalent) as the source of truth for what to stamp in Step 5. If no such schema doc exists yet, ask the user what fields they want recorded rather than inventing a new convention silently — this skill should not carry undocumented conventions.

## Step 4: Gather metadata

- **`created`**: try `git log --follow --diff-filter=A --format=%ad --date=short -- <path>` for the file's first-commit date. If that returns nothing (uncommitted file, or history doesn't track it) or the file wasn't already carrying a `created` date, ask the user rather than guessing.
- **`summary`**: draft a one-sentence summary from the file's own content and show it to the user for a quick confirm/edit rather than asking them to write it from scratch.
- **Why archived**: ask the user for a short reason (going stale, superseded, no longer relevant, etc.) — this goes in the archive log entry, not the file's own frontmatter.
- **`parent` / `children` / `related`**: ask the user if any apply; default to omitting the fields entirely rather than writing empty lists.

## Step 5: Offer a chance to route elsewhere first

Before moving anything, ask: *"Before I archive this, do you want it to go through anything else first — captured as a task, ingested, cleaned up, or similar?"* If the user is unsure what's available, point them at `/ask-alex` to help decide rather than this skill maintaining its own list of candidate skills — that list will drift the moment a new skill is added or renamed, and `ask-alex` already exists to answer exactly this question.

If the user picks something, let that run to completion first, then resume at Step 6 against whatever file it leaves behind (it may have moved or renamed the file — reconfirm the current path before continuing).

## Step 6: Stamp frontmatter

Add or merge into the file's YAML frontmatter (creating a frontmatter block if none exists):

```yaml
created: <resolved in Step 4, or existing value if already present>
summary: "<confirmed in Step 4>"
archived: true
archived_date: <today, YYYY-MM-DD>
parent: [...]      # only if given in Step 4
children: [...]    # only if given in Step 4
related: [...]     # only if given in Step 4
```

Preserve every existing frontmatter field untouched — this step only adds the fields above, never removes or rewrites others (including the type-specific `updated` field, which this skill does not touch).

## Step 7: Move the file

Move the file into `ARCHIVE_ROOT`, keeping its original filename. If a file of that name already exists there, ask the user how to disambiguate (this skill does not silently overwrite or auto-rename).

## Step 8: Flag dangling references

Search the repo for links or mentions pointing at the file's original path or filename (e.g. `grep -rl` for the filename across wiki index/nav pages and any other markdown). Report every hit to the user as a list to fix manually. Do not edit those other files — that's explicitly out of scope for this minimal primitive (see SKILL description).

## Step 9: Append to the archive log

Add one entry to `ARCHIVE_LOG`, in the format defined in `SCHEMA.md`'s "Archive Log Format" section (or the nearest equivalent doc in a repo without that exact file) — original path, archived date, summary, why archived, and a link to the frozen copy.

## Step 10: Update the main log

If the repo keeps a running activity log (e.g. `wiki/log.md`), append one line in its existing format recording the archive operation.

## Step 11: Report

Summarize what happened:
- Original path → new path
- Frontmatter fields added
- Archive log entry added (link)
- Any dangling references found (list, unfixed)
