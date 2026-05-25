---
name: sync-roadmap
description: >
  Pull current task statuses from Asana and write them back into each repo's
  docs/roadmap.md and (where a data.tsx exists) update `done` flags on phases
  and milestones. Asana is the master — this skill flows changes downstream.
argument-hint: "Repo name to sync (e.g. giselle-mui), or 'all' / omit to sync all repos."
agent: agent
---

# /sync-roadmap

Pull Asana task statuses → write them into `docs/roadmap.md` and `data.tsx`.

**Direction:** Asana → markdown + TypeScript (one-way)

**Use when:**
- You have marked phases or milestones done in Asana and want the docs files updated
- Running a morning session and want roadmap.md in sync before starting work
- After a `/seed-asana` run to verify round-trip fidelity

---

## Phase 0 — Read config

Read `.asana-config.json` from the alexrebula repo root:

```sh
cat c:/work/projects/ar/rm/presentation/alexrebula/.asana-config.json
```

Extract:
- `token` — Asana PAT
- `projects` — map of `repo-name → project GID`
- `customFields.status` — GID of the status custom field
- `customFields.statusOptions` — map of `option-label → option-GID`

---

## Phase 1 — Determine scope

If the argument is `all` or omitted (no argument), process every repo listed in `projects`.

If a specific repo name is given (e.g. `giselle-mui`), process only that repo.

For each target repo, look up its `projectGid` from the `projects` map. If the repo has no
entry in `projects`, skip it and log a warning.

---

## Phase 2 — Fetch tasks from Asana

For each project GID, fetch all tasks with their custom fields and subtasks:

```sh
curl -s "https://app.asana.com/api/1.0/projects/<projectGid>/tasks?opt_fields=name,notes,due_on,completed,custom_fields,subtasks" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

For each task (phase), fetch its subtasks:

```sh
curl -s "https://app.asana.com/api/1.0/tasks/<taskGid>/subtasks?opt_fields=name,notes,completed,custom_fields" \
  -H "Authorization: Bearer <token>"
```

Map Asana statuses to roadmap symbols:

| Asana status custom field value | Roadmap symbol | `done` flag |
|---------------------------------|----------------|-------------|
| `done` / `completed` + `completed: true` | `✅` | `true` |
| `in-progress` / `in_progress`   | `🔄`           | `false`     |
| `not-started` / not set         | `⬜`           | `false`     |

If the task has `completed: true` (Asana native checkbox), treat it as done regardless of the custom field value.

---

## Phase 3 — Update docs/roadmap.md

Locate the roadmap.md for the repo. Standard paths:

```
c:/work/projects/ar/<repo>/docs/roadmap.md
```

Exception for alexrebula:

```
c:/work/projects/ar/rm/presentation/alexrebula/docs/roadmap.md
```

**Update status symbols only.** Do not rewrite headings, descriptions, or table structure.
Match phases by name (strip leading symbols and whitespace before comparing).

For each phase row in the markdown table:
- If the Asana task name matches (fuzzy: case-insensitive, ignoring emoji prefixes), replace
  the leading symbol (`⬜`, `🔄`, `✅`) with the one from Asana.

For each milestone bullet under a phase:
- Match the bullet text to the Asana subtask name.
- Replace the leading `[ ]` / `[x]` checkbox with the Asana status:
  - done → `[x]`
  - not done → `[ ]`

If no table rows or bullets match, report "no matches" and do not modify the file.

---

## Phase 4 — Update data.tsx (if present)

Some repos have a `data.tsx` file that powers a visual timeline. Standard path:

```
src/sections-api/<repo>/data.tsx
```

For alexrebula's own roadmap timeline:

```
c:/work/projects/ar/rm/presentation/alexrebula/src/sections-api/roadmap/data.tsx
```

**Update `done` flags only.** Do not touch icon, side, variant, color, description, or any
other property.

For each `TimelinePhase` object in the array, match by `label` or `key` to the Asana task
name. If found and Asana marks it done, set `done: true`; otherwise set `done: false`.

For each milestone in `phase.milestones`, match by `label` to the Asana subtask name. Apply
the same `done` update.

If the file cannot be parsed reliably, skip it and report a warning — do not corrupt it.

---

## Phase 5 — Commit changes

For each repo where files were modified:

```sh
git -C <repo-path> diff --stat
```

If diff is non-empty:

```sh
git -C <repo-path> add docs/roadmap.md src/sections-api/<repo>/data.tsx
git -C <repo-path> commit -m "chore: sync roadmap status from Asana — $(date +%Y-%m-%d)"
```

Do **not** push automatically — leave pushing to the developer.

---

## Phase 6 — Report

Print a summary:

```
Sync complete — <date>

giselle-mui          roadmap.md  ✅ 3 phases updated, 7 milestones updated
giselle-mui          data.tsx    ✅ 3 phases updated
first-branch         roadmap.md  ✅ 1 phase updated
alexrebula           roadmap.md  ⚠️ no matches found (check phase names)
skills               roadmap.md  ✓ already in sync — no changes
```

---

## Notes

- **Asana is master.** If a phase is marked done in Asana but `✅` is already in roadmap.md,
  no change is written — the file stays as-is.
- **Names must match.** The skill matches by name. If a phase was renamed in one place but
  not the other, it will not match. Fix the mismatch manually, then re-run.
- **data.tsx parsing is conservative.** If the file uses non-standard formatting or nested
  expressions that prevent reliable `done:` replacement, skip it rather than corrupt it.
- **No custom fields beyond status are synced.** Fields like `icon`, `side`, `variant`,
  `color` require those custom fields to exist in Asana. If they are added to the Asana
  project later, extend Phase 4 accordingly.
- **To add custom fields to Asana** (icon, side, variant), run
  `scripts/setup-asana.ts --add-timeline-fields` (not yet implemented — create if needed).
