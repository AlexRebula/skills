---
name: collapse-session-folder
description: Collapse all same-day session wrap folders into one combined folder. Announces the plan, derives a combined slug, renumbers files sequentially, repairs → Next footer links, deletes old folders, and updates sessions-index.md. Depends on SESSIONS_ROOT — resolved via /resolve-ai-paths. Called automatically by /session-wrap but can be invoked independently to fix uncollapsed same-day folders at any time.
---

# Collapse Session Folder

Collapse all `YYYY-MM-DD-*` session folders for a given date into one combined folder.

## Path Resolution

Invoke `/resolve-ai-paths` to resolve `SESSIONS_ROOT`. Skip Step 2 of the resolver (you do not need `PROMPTS_ROOT`). Substitute the returned value throughout.

**Date** — defaults to today (`YYYY-MM-DD`). If the user specifies a different date, use that.

---

## Step 1 — Scan for same-day folders

List all immediate subdirectories of `{{SESSIONS_ROOT}}` whose name starts with the target date in `YYYY-MM-DD-*` format.

**If only one (or zero) folders match:** nothing to collapse. Report this and stop.

---

## Step 2 — Generate a combined slug

Look at the folder **names only** — do not read file content.

Extract the slug portion (everything after `YYYY-MM-DD-`) from each folder name and build a combined slug:

- 3–6 kebab-case words that summarise the combined scope.
- Draw the most distinctive words from the individual slugs.
- Good: `pr-sweep-morning-brief`, `bucket-restructure-wip-pr64`, `asana-obsidian-pr-review`
- Never use generic words: `session`, `wrap`, `work`, `misc`, `updates`.

Print the plan before running (informational — no confirmation needed):

```
Found N same-day session folders for YYYY-MM-DD:
  - 2026-05-27-<slug-1>/  (N wraps)
  - 2026-05-27-<slug-2>/  (N wraps)

Collapsing into: 2026-05-27-<combined-slug>/
```

---

## Step 3 — Run the collapse script

```sh
npx tsx "c:/work/projects/ar/skills/scripts/collapse-sessions.ts" \
  --sessions-root "{{SESSIONS_ROOT}}" \
  --slug "<combined-slug>" \
  --date "YYYY-MM-DD"
```

The script handles all mechanical work:

- Creates the combined folder
- Moves and renumbers all files (`NN-` prefix reassigned sequentially)
- Merges the `sessions-index.md` rows (deduped projects/topics/models, summed wraps)
- Repairs all `→ Next` wiki-links and markdown links across every `.md` file under `SESSIONS_ROOT`
- Adds bridge `→ Next` links at folder junctions where none existed
- Deletes the now-empty old folders

Print the script output verbatim.

---

## Done

If the script exits with code 0, the collapse is complete. If it exits with a non-zero code, show the error output to the user and stop.
