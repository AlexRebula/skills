---
name: wip-sweep
description: Sweep dirty repos for uncommitted work and create OSS §2.1-compliant snapshot branches. Groups dirty files by logical concern, proposes branch names and commit messages, then runs a tiered action model — T2 (local commit), T3 (push to remote), T4 (draft PR) — with a confirmation gate at each tier. Use after /repo-status has produced a dirty state table.
---

# WIP Sweep

## Scope selection (T1 — automatic)

**This tier runs automatically.** Show the dirty state table from `/repo-status` to the developer and ask:

> "Which repos should I sweep? Options:
> A) All dirty repos (default)
> B) Select specific repos
> C) Skip WIP sweep entirely
>
> For any repo you want swept, should I also suggest a group name for the WIP branch based on the dirty file contents? (y/n)"

Wait for the developer's answer before proceeding.

---

## T2 — Stage and commit locally (ask before running)

Process only the repos selected above.

For each selected dirty repo:

1. Inspect the dirty files:
   ```sh
   git -C <repo-path> diff --name-only
   git -C <repo-path> ls-files --others --exclude-standard
   ```

2. Group the dirty files by logical concern (e.g. "stories cleanup", "ci config", "docs updates"). If the developer agreed to grouping, create one branch per group. If not, create one branch for all dirty files in the repo.

3. **Determine the OSS §2.1-compliant branch prefix.** Common mappings:
   - `docs/**`, `*.md` only → `docs/`
   - Config/tooling files (`.json`, `.yml`, `.mjs`) → `chore/`
   - Source (`.tsx`, `.ts` component or page) → `feature/`
   - Tests only (`*.test.ts`) → `test/`
   - Mixed types → `chore/` (safe default — ask the developer to correct if wrong)

   `wip/` is never valid. Full §2.1 table is in OSS AGENTS.md — fetch on demand if unsure.

   Branch name format: `<prefix>/YYYYMMDD-<group-slug>`
   Commit format: `<type>(standup-prep): snapshot — <group> — YYYY-MM-DD`

   Examples:
   - Docs group → `docs/20260523-dashboard-plan-updates` / `docs(standup-prep): snapshot — dashboard-plan — 2026-05-23`
   - CI config group → `chore/20260523-ci-config` / `chore(standup-prep): snapshot — ci-config — 2026-05-23`
   - Component work → `feature/20260523-stat-card-progress` / `feature(standup-prep): snapshot — stat-card — 2026-05-23`

4. Present the full plan:
   > "I will create the following snapshot commits (OSS §2.1 branch names):
   > - [giselle-mui] docs/20260523-dashboard-plan (3 files: docs/dashboard-components-plan.md, ...)
   > - [giselle-mui] chore/20260523-ci-config (2 files: ci.yml, vitest.config.ts)
   > - [giselle-ui] docs/20260523-roadmap-updates (2 files: docs/roadmap.md, src/styles.css)
   >
   > Proceed with local commits? [y/n/edit]"

5. If confirmed, run:
   ```sh
   git -C <repo-path> checkout -b <prefix>/YYYYMMDD-<group-slug>
   git -C <repo-path> add <files-in-group>
   git -C <repo-path> commit -m "<type>(standup-prep): snapshot — <group> — YYYY-MM-DD"
   ```

---

## T3 — Push to remote (ask per repo, after T2)

After T2 completes, ask:
> "Push WIP branches to remote? [y=all / n=none / list repo names to push selectively]"

For each confirmed repo:
```sh
git -C <repo-path> push -u origin HEAD
```

---

## T4 — Open pull requests (ask, default NO)

After T3, ask:
> "Open pull requests for the pushed branches? Default: NO. [y/n/select]"

If yes, for each pushed branch:

1. Check for a PR template:
   ```sh
   cat <repo-path>/.github/pull_request_template.md 2>/dev/null
   ```

2. If a template exists, fill every section. If none exists, use What / Why / Type / Checklist / Notes.

3. Every PR body must include:
   - **What:** one paragraph describing the files and changes in this snapshot
   - **Why:** "WIP snapshot — preserves in-progress work from session YYYY-MM-DD"
   - **Type:** correct checkbox (docs / chore / feature / etc.)
   - **Checklist:** tick what applies; mark others N/A with a reason
   - **Notes for reviewer:** "Draft WIP snapshot — do not merge until work is complete and reviewed."

```sh
gh pr create --repo <owner>/<repo> --head <branch> \
  --title "<type>(standup-prep): snapshot — <group> — YYYY-MM-DD" \
  --body "<filled-in description per above>" \
  --draft
```

PRs are created as **drafts** — never as ready-for-review.
