---
name: asana-sync
description: Sync a morning brief to Asana. Locates or bootstraps .asana-config.json, enforces safety rules (no repo-linked projects, write-access check, shared-project warning), shows an impact plan before writing, creates the Morning Briefs section if missing, creates tasks with full metadata, posts a Status Update, and logs results back to the brief file. Opt-in — always ask before running.
---

# Asana Sync

Ask the developer:

> "Sync today's standup to Asana? [y/n]"

If no, skip this skill entirely.

If yes, run steps 9a–9g below.

---

## 9a — Locate or bootstrap Asana config

> **This skill is self-contained.** It does not require any specific project's copilot-instructions.md. All Asana setup knowledge is documented here.

**Step 1 — Find the config (dynamic — no hardcoded paths):**

Check in order:

1. The workspace folders — search for `.asana-config.json` in any open workspace root.
2. `dependency-chain.md` (if already loaded in context) — scan for any path reference to `.asana-config.json`.
3. If still not found, ask:
   > "Do you have an `.asana-config.json` file? Provide the full path, or type 'none' to set up Asana for the first time."

**Config schema (reference):**

```json
{
  "token": "<Asana personal access token>",
  "workspaceGid": "<GID of your Asana workspace>",
  "morningBriefsProjectGid": "<GID of the Morning Briefs project — one task per brief file>",
  "standupProjectGid": "<GID of your personal daily-standup project — individual action-item tasks>",
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

**Step 2 — First-time setup (only if no config found):**

If the developer types 'none' or no config is found:

1. **Get an Asana personal access token:**
   - Go to https://app.asana.com/0/my-profile-apps → "Create new token"
   - Copy it — you will only see it once. Store it somewhere safe.

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
   Then re-run `/standup-prep` — this step will proceed automatically from this point.

---

## 9b — Check write access and classify risk

Before selecting a target project, enforce the following safety rules:

**Rule 1 — Never seed a repo-linked project.** The `projects` map in the config links each repo to an Asana project. Morning briefs must NEVER be created in any of those projects. If the developer tries to select one, block it:

> `❌ Blocked: <project> is a repo-linked project (GID: <gid>). Morning briefs must go to a dedicated personal project, not a code project. This would pollute the backlog for every team member who can see that project.`

**Rule 2 — Verify write access.**

```sh
curl -s "https://app.asana.com/api/1.0/projects/<candidateGid>?opt_fields=name,members,owner" \
  -H "Authorization: Bearer <token>" | jq '{name: .data.name, members: (.data.members | length), owner: .data.owner.name}'
```

If the request returns 403 or the authenticated user is not a member → block with: `❌ No write access to project <name>. Cannot seed.`

**Rule 3 — Warn on shared projects (member count > 1).** If the project has more than 1 member, warn:

> `⚠️ Project <name> has <N> members. If you seed morning briefs here, every member will see them. This can become noisy in a team setting. Are you sure you want to use this project? [y/n]`
Require explicit `y` before proceeding.

**Rule 4 — Dedicated standup project (preferred).** If `standupProjectGid` is present in the config, use it as the default. Skip the selection prompt — go straight to 9c.

If `standupProjectGid` is NOT in the config (first run), guide the developer:

> `No dedicated standup project is configured. The safest option is a personal Asana project used only for daily standups.
>
> Options: A) Use an existing personal project — provide the GID or project name B) I will create a new Asana project manually first, then tell you the GID C) Skip Asana sync for today
>
> After first use, the selected GID will be added to .asana-config.json as 'standupProjectGid' so you are not asked again.`

Wait for the developer's response.

---

## 9c — Show impact plan before writing

For each open PR, WIP commit, and critical-path item from the morning brief, map to an Asana task:

Present the plan:

> "I will add the following to the **Morning Briefs** section of **<project>**:
>
> - Task: [YYYY-MM-DD] <your-repo> — <description> (Priority: High, Owner: <your-username>)
> - Task: [YYYY-MM-DD] <another-repo> — <description> (Priority: High)
> - ...
>
> Proceed? [y/n/edit]"

---

## 9d — Create the Morning Briefs section if it doesn't exist

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

## 9e — Create tasks with full metadata

For each confirmed task, create it in the Morning Briefs section:

```sh
curl -s -X POST "https://app.asana.com/api/1.0/tasks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "[YYYY-MM-DD] <repo> — <description>",
      "projects": ["<projectGid>"],
      "memberships": [{"project":"<projectGid>","section":"<sectionGid>"}],
      "custom_fields": {
        "<priority field GID>": "<priorityOptionGid>",
        "<repo field GID>": "<repoValue>"
      },
      "notes": "<link to GitHub PR or branch if applicable>"
    }
  }'
```

Use the GIDs from `.asana-config.json`. Map priorities: blocker → `CRITICAL`, critical path → `High`, informational → `Normal`.

---

## 9f — Post a Status Update to the project

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
      "text": "<morning brief narrative — plain text, no markdown>"
    }
  }'
```

---

## 9g — Log the sync results

Append a `## Asana Sync Log` section to the morning brief file:

```md
## Asana Sync Log — YYYY-MM-DD

**Project:** <project name> (`<projectGid>`) **Section:** Morning Briefs (`<sectionGid>`)

Tasks created:

- [YYYY-MM-DD] <your-repo> — <description> → https://app.asana.com/0/<projectGid>/<taskGid>
- ...

Status Update posted: https://app.asana.com/0/<projectGid>/<statusGid>
```
