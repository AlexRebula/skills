---
name: sync
description: Bidirectional sync between configured Asana projects and their local markdown files. Pulls new/updated tasks from Asana, pushes local changes to Asana, resolves conflicts (local wins). Commits changed files to the repository. Use when the user says /sync or "sync" against an Asana-backed content workspace.
---

# Sync

Sync all configured content projects bidirectionally between Asana and local markdown files.

## Prerequisites

- `.asana-config.json` exists at the project root (run `npm run setup-asana` to create it)
- `ASANA_TOKEN` is set in `.env`
- The project provides a `npm run sync-mill` script (or equivalent)

## Arguments

`/sync` — no arguments required.

---

## Step 1 — Check prerequisites

Verify `.asana-config.json` exists at the project root. If not:

> "`.asana-config.json` not found. Run `npm run setup-asana` with `ASANA_TOKEN` set to create it."

Stop.

---

## Step 2 — Run the sync script

```sh
ASANA_TOKEN=$(grep ASANA_TOKEN .env | cut -d= -f2) \
  npm run sync-workspace
```

Capture stdout. The script prints one line per project:

```
  <project>: N pulled, N pushed, N conflict(s) resolved
```

---

## Step 3 — Commit changed files

After the sync, stage and commit any changed files in the configured content folder:

```sh
git add <content-folder>/
git diff --cached --quiet || git commit -m "sync: <YYYY-MM-DD>"
```

If nothing changed, skip the commit.

---

## Step 4 — Report

Print a summary table:

| Project | Pulled | Pushed | Conflicts |
|---|---|---|---|
| <project> | N | N | N |

If any conflicts were resolved, note:

> "⚠ N conflict(s) resolved — local files won. Asana was updated with local values."

If everything was 0/0/0:

> "Nothing changed on either side — no writes, no commit."

---

## Error handling

- `ASANA_TOKEN` missing → ask the user to add it to `.env`
- `.asana-config.json` missing → `npm run setup-asana`
- Asana API error → print the error and stop; do not commit partial results

## Setup

This skill depends on a project-provided sync script that:

1. Reads project config from `.asana-config.json` (workspace GID, project GIDs, section GIDs, local repo paths)
2. Fetches all tasks per configured project from Asana
3. Compares modification timestamps against a per-project `.sync-state.json`
4. Pulls Asana-newer tasks → writes/updates local markdown files (frontmatter overwritten, body preserved)
5. Pushes locally-newer files → updates Asana task fields
6. Resolves conflicts (both sides changed) → local wins, Asana updated
7. Writes `.sync-state.json` per project after a successful sync
8. Is idempotent: no writes or API calls when nothing changed
