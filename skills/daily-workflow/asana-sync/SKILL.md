---
name: asana-sync
description: "Sync a morning brief to Asana. Locates or bootstraps .asana-config.json, enforces safety rules (no repo-linked projects, write-access check, shared-project warning), shows an impact plan before writing, creates the Morning Briefs section if missing, creates tasks with full metadata, posts a Status Update, and logs results back to the brief file. Opt-in: always ask before running."
---

# Asana Sync

Ask the developer:

> "Sync today's standup to Asana? [y/n]"

If no, skip this skill entirely.

If yes, run steps 9a–9g below.

---

## 9a: Locate or bootstrap Asana config

> **This skill is self-contained.** It does not require any specific project's copilot-instructions.md. All Asana setup knowledge is documented here.

**Step 1: Find the config (dynamic: no hardcoded paths):**

Check in order:

1. The workspace folders: search for `.asana-config.json` in any open workspace root.
2. `dependency-chain.md` (if already loaded in context): scan for any path reference to `.asana-config.json`.
3. If still not found, ask:
   > "Do you have an `.asana-config.json` file? Provide the full path, or type 'none' to set up Asana for the first time."

**Config schema (reference):**

```json
{
  "token": "<Asana personal access token>",
  "workspaceGid": "<GID of your Asana workspace>",
  "morningBriefsProjectGid": "<GID of the Morning Briefs project, one task per brief file>",
  "standupProjectGid": "<GID of your personal daily-standup project, individual action-item tasks>",
  "projects": {
    "repo-name": "<Asana project GID for that repo>"
  },
  "customFields": {
    "priority": {
      "gid": "<custom field GID>",
      "options": { "High": "<GID>", "Normal": "<GID>", "Low": "<GID>" }
    }
  }
}
```

Only `token` and `workspaceGid` are required to start. All other keys are optional and can be added over time.

**Step 2: First-time setup (only if no config found):**

If the developer types 'none' or no config is found:

1. **Get an Asana personal access token:**
   - Go to https://app.asana.com/0/my-profile-apps → "Create new token"
   - Copy it. You will only see it once. Store it somewhere safe.

2. **Get your workspace GID:**

   ```sh
   curl -s "https://app.asana.com/api/1.0/workspaces" \
     -H "Authorization: Bearer <token>" | jq '.data[] | {name, gid}'
   ```

3. **Create a dedicated standup project in Asana (strongly recommended):**
   - Go to Asana → New Project → name it `Daily Standups` (or similar) → mark it personal/private.
   - Get its GID:
     ```sh
     curl -s "https://app.asana.com/api/1.0/projects?workspace=<workspaceGid>&opt_fields=name,gid" \
       -H "Authorization: Bearer <token>" | jq '.data[] | select(.name == "Daily Standups") | .gid'
     ```

4. Create `.asana-config.json` in the root of your primary project folder:
   ```json
   { "token": "...", "workspaceGid": "...", "standupProjectGid": "..." }
   ```
   Then re-run `/standup-prep`: this step will proceed automatically from this point.

---

## 9b: Check write access and classify risk

Before selecting a target project, enforce the following safety rules:

**Rule 1: Never seed a repo-linked project.** The `projects` map in the config links each repo to an Asana project. Morning briefs must NEVER be created in any of those projects. If the developer tries to select one, block it:

> `❌ Blocked: <project> is a repo-linked project (GID: <gid>). Morning briefs must go to a dedicated personal project, not a code project. This would pollute the backlog for every team member who can see that project.`

**Rule 2: Verify write access.**

```sh
curl -s "https://app.asana.com/api/1.0/projects/<candidateGid>?opt_fields=name,members,owner" \
  -H "Authorization: Bearer <token>" | jq '{name: .data.name, members: (.data.members | length), owner: .data.owner.name}'
```

If the request returns 403 or the authenticated user is not a member → block with: `❌ No write access to project <name>. Cannot seed.`

**Rule 3: Warn on shared projects (member count > 1).** If the project has more than 1 member, warn:

> `⚠️ Project <name> has <N> members. If you seed morning briefs here, every member will see them. This can become noisy in a team setting. Are you sure you want to use this project? [y/n]`
Require explicit `y` before proceeding.

**Rule 4: Dedicated standup project (preferred).** If `standupProjectGid` is present in the config, use it as the default. Skip the selection prompt: go straight to 9c.

If `standupProjectGid` is NOT in the config (first run), guide the developer:

> `No dedicated standup project is configured. The safest option is a personal Asana project used only for daily standups.
>
> Options: A) Use an existing personal project: provide the GID or project name B) I will create a new Asana project manually first, then tell you the GID C) Skip Asana sync for today
>
> After first use, the selected GID will be added to .asana-config.json as 'standupProjectGid' so you are not asked again.`

Wait for the developer's response.

---

## 9c: Show impact plan before writing

**This is the canonical structure, verified directly against the real reference task `1215096086079518` ("Brief — 2026-05-25 #2") on 2026-09-20, and cross-checked against a real (but currently broken — see "Known gap" below) local `sync-morning-briefs.ts` / `brief-utils.ts` implementation the developer has elsewhere. Do not substitute a flat, one-task-per-item structure or plain-text `notes` — both were tried on 2026-09-20 and corrected the same day; check the developer's own incident log for the full history of what was tried and rejected before landing here.**

**Use `html_notes`, not plain `notes`, for every task and subtask below.** Asana's task notes support a restricted HTML subset: `h1`, `h2`, `strong`, `em`, `u`, `s`, `code`, `pre`, `ul`, `ol`, `li`, `a` (the only tag that may carry attributes), `blockquote`, `hr`. Not supported: `p`, `br`, `h3`+, `table`/`tr`/`th`/`td`. Convert the brief's markdown to this subset using these exact rules (ported from `brief-utils.ts`'s `markdownToAsanaHtml`):

- `# heading` → `<h1>heading</h1>`; `## heading` → `<h2>heading</h2>`; `###`+ → `<strong>heading</strong>` (no `<h3>` support)
- A line of 3+ `-` or `*` (a markdown `---` rule) → `<hr/>`
- `**bold**`/`__bold__` → `<strong>`, `*italic*` → `<em>`, `~~strike~~` → `<s>`, `` `code` `` → `<code>`, `` ```fenced``` `` → `<pre>` (preserves newlines, no `<br/>` needed)
- `- item` / `* item` → `<ul><li>`; `1. item` → `<ol><li>` (consecutive items of the same type batch into one list)
- A markdown table → `<ul><li>` rows: a 2-column table renders each row as `<strong>col1:</strong> col2`; 3+ columns join cells with ` — `
- Plain text lines → inlined directly in `<body>`, no wrapper (no `<p>` support)
- Wrap the whole result in `<body>...</body>`

The structure has **three levels**:

**Level 1 — the parent task**, named `Brief — YYYY-MM-DD #N` (`N` increments if more than one standup runs the same day — check existing tasks in the Morning Briefs section matching `Brief — <today> #*` to find the next number). Its `html_notes` carries the condensed narrative in the same section order as the printed brief: `<h1>Standup — YYYY-MM-DD / Standup N</h1>`, then `<strong>Hard deadline:</strong> ...` and `<strong>Time to deadline:</strong> ...` as plain inlined text, then for each of the 6 sections below: `<hr />`, `<h2>Section Name</h2>`, and either that section's content converted per the rules above (for the two single-item sections, and — per the reference task — also for `Critical path today`, which inlines its full numbered list here even though it *also* gets Level-3 sub-subtasks below) or `<strong>See subtasks</strong>` (for `Open PRs`, `Recent sessions (last 5)`, `What to skip today`). Ends with `<hr />` and the plain-text `_Generated by /standup-prep · Model: <model> · Session: <id>_` line.

**Level 2 — exactly 6 subtasks** under the parent, one per brief section, in this order:

1. `Critical path today` — list-type
2. `What to skip today` — list-type
3. `Recent sessions (last 5)` — list-type
4. `Suggested first task` — single-item
5. `Open PRs` — list-type
6. `WIP commits created this standup` — single-item

A **single-item section** gets its content converted to `html_notes` directly (e.g. `Run <code>/respond-pr-review</code> for <strong>PR #N</strong> ...`), followed by a trailing `<hr />`, and has **no** Level-3 children.

A **list-type section** gets `html_notes` set to either just `<hr />` (bare — matches `Critical path today`/`Recent sessions`/`What to skip today` in the reference) or the full list restated as `<ul><li>...</li></ul>` followed by `<hr />` (matches `Open PRs` in the reference, which also bolds+underlines its single most-critical item with `<strong><u>...</u></strong>`) — restating is optional per section but must be consistent within one brief. It always gets one Level-3 sub-subtask per list item (see below), regardless of whether it also restates.

**Level 3 — one sub-subtask per item**, for each list-type Level-2 subtask, named with that item's exact one-line text (a PR's `#N — repo — title — action`, a session's `YYYY-MM-DD: summary`, etc.), `parent` set to that Level-2 subtask's own GID. These leaf tasks carry no `notes`/`html_notes` of their own in the reference.

**Known gap, not fixed by this edit:** a `sync-morning-briefs.ts`/`sync-one-brief.ts` pair of scripts (with a shared `brief-utils.ts` lib) is a real, once-working implementation of `markdownToAsanaHtml`/`parseSections` that this section's conversion rules are ported from — but they only ever produced Levels 1–2 (never Level 3; those sub-subtasks in the reference task were added by hand or by a since-removed tool), their default project root predates a later migration of morning briefs into a git-tracked wiki, and their required `.asana-config.json` (with a raw Asana personal access token) no longer exists where they expect it. Re-pointing them and provisioning a token is a real fix worth doing, but it touches credentials and file paths outside this generic skill's own repo — this skill cannot make that call unilaterally. If you find a similar script pair in your own setup, flag the mismatch to the developer rather than running or silently patching it.

Present the plan before writing:

> "I will add to the **Morning Briefs** section of **<project>**:
>
> - Parent task: `Brief — YYYY-MM-DD #N`
> - Subtasks: Critical path today (N items), What to skip today (N items), Recent sessions (last 5) (N items), Suggested first task (single), Open PRs (N items), WIP commits created this standup (single)
>
> Proceed? [y/n/edit]"

---

## 9d: Create the Morning Briefs section if it doesn't exist

```sh
# Check if section exists
curl -s "https://app.asana.com/api/1.0/projects/<projectGid>/sections" \
  -H "Authorization: Bearer <token>" \
  | jq '.data[] | select(.name == "Morning Briefs") | .gid'
```

If no result, create it:

```sh
curl -s -X POST "https://app.asana.com/api/1.0/sections" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"data":{"name":"Morning Briefs","project":"<projectGid>"}}'
```

---

## 9e: Create the parent task, its 6 subtasks, and each list-type subtask's sub-subtasks

All three levels use `html_notes` (see 9c for the conversion rules), never plain `notes`.

**Level 1 — parent task**, in the Morning Briefs section:

```sh
curl -s -X POST "https://app.asana.com/api/1.0/tasks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Brief — YYYY-MM-DD #N",
      "projects": ["<projectGid>"],
      "memberships": [{"project":"<projectGid>","section":"<sectionGid>"}],
      "html_notes": "<body>...condensed narrative, see 9c...</body>"
    }
  }'
```

**Level 2 — the 6 section subtasks**, `parent` set to the Level-1 task GID. Single-item sections get their content in `html_notes`; list-type sections get `<body><hr/></body>` (or the restated `<ul>`/`<ol>` + `<hr/>` — see 9c):

```sh
curl -s -X POST "https://app.asana.com/api/1.0/tasks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "<section name, e.g. Critical path today>",
      "parent": "<parentTaskGid>",
      "html_notes": "<body>...per 9c's rules for this section type...</body>"
    }
  }'
```

**Level 3 — sub-subtasks, one per item, only for the 4 list-type Level-2 subtasks**, `parent` set to that Level-2 task's own GID (not the Level-1 parent). These carry no `notes`/`html_notes`:

```sh
curl -s -X POST "https://app.asana.com/api/1.0/tasks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "<the item's one-line text, e.g. a single PR row or a single critical-path bullet>",
      "parent": "<level2SubtaskGid>"
    }
  }'
```

Do not skip Level 3 for a list-type section, even a short one. A subtask/sub-subtask does not need to be added to the project separately — Asana nests it under its parent automatically. If an MCP Asana connector is available in place of raw `curl`, prefer its `create_tasks` tool (batch calls per level, using `parent: "<gid>"` for each child, and `html_notes` — not `notes` — for Levels 1–2).

---

## 9f: Post a Status Update to the project

Post the full morning brief narrative as a Status Update on the selected project:

```sh
curl -s -X POST "https://app.asana.com/api/1.0/status_updates" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "parent": "<projectGid>",
      "status_type": "on_track",
      "title": "Standup YYYY-MM-DD",
      "text": "<morning brief narrative: plain text, no markdown>"
    }
  }'
```

---

## 9g: Log the sync results

Append a `## Asana Sync Log` section to the morning brief file. Note the item count for each list-type subtask so a future read can sanity-check Level 3 was actually populated, not skipped:

```md
## Asana Sync Log: YYYY-MM-DD

**Project:** <project name> (`<projectGid>`) **Section:** Morning Briefs (`<sectionGid>`)

Parent task: `Brief — YYYY-MM-DD #N` → https://app.asana.com/0/<projectGid>/<parentTaskGid>

Subtasks created:

- Critical path today (N sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>
- What to skip today (N sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>
- Recent sessions (last 5) (N sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>
- Suggested first task (text in notes, no sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>
- Open PRs (N sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>
- WIP commits created this standup (text in notes, no sub-subtasks) → https://app.asana.com/0/<projectGid>/<taskGid>

Status Update posted: https://app.asana.com/0/<projectGid>/<statusGid> (or "skipped" + reason)
```
