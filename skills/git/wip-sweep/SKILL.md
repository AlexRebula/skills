---
name: wip-sweep
description: Sweep dirty repos for uncommitted work and create OSS §2.1-compliant snapshot branches. Groups dirty files by logical concern, proposes branch names and commit messages, then runs a tiered action model — T2 (local commit), T3 (push to remote), T4 (draft PR) — with a confirmation gate at each tier. Use after /repo-status has produced a dirty state table.
---

# WIP Sweep

## Scope selection (T1 — automatic)

**This tier runs automatically.** Show the dirty state table from `/repo-status` to the developer and ask:

> "Which repos should I sweep? Options: A) All dirty repos (default) B) Select specific repos C) Skip WIP sweep entirely
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

   Branch name format: `<prefix>/YYYYMMDD-<group-slug>` Commit format: `<type>(standup-prep): snapshot — <group> — YYYY-MM-DD`

   Examples:
   - Docs group → `docs/20260523-dashboard-plan-updates` / `docs(standup-prep): snapshot — dashboard-plan — 2026-05-23`
   - CI config group → `chore/20260523-ci-config` / `chore(standup-prep): snapshot — ci-config — 2026-05-23`
   - Component work → `feature/20260523-stat-card-progress` / `feature(standup-prep): snapshot — stat-card — 2026-05-23`

4. Present the full plan:

   > "I will create the following snapshot commits (OSS §2.1 branch names):
   >
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

### Update existing PR description (non-negotiable)

After every push, check whether the branch already has an open PR:

```sh
gh pr view --json number,title,body --repo <owner>/<repo> <branch>
```

If an open PR exists:

1. **Update the PR description.** Delegate to the correct PR skill with an `update` flag — do not construct the body inline. Use the same routing table as T4:

   | Repo owner         | Skill to invoke                                     |
   | ------------------ | --------------------------------------------------- |
   | `LittleBranches/*` | `/create-giselle-pr <branch> skip-hygiene update`   |
   | All other repos    | `/create-pr <branch> skip-hygiene update`           |

2. If the delegated skill does not yet support an `update` flag, fall back to reading `.github/pull_request_template.md`, filling every section with the current branch state, and running:

   ```sh
   gh pr edit <number> --body-file <temp-file> --repo <owner>/<repo>
   ```

3. Confirm to the developer: `"PR #N description updated."` with a link to the PR.

A push to a branch with an open PR **always** triggers a description update. There are no exceptions — a stale PR description is worse than no description.

---

## T4 — Open pull requests (ask, default NO)

After T3, ask:

> "Open pull requests for the pushed branches? Default: NO. [y/n/select]"

If yes, for each pushed branch, **delegate to the correct PR skill** — do not construct a `--body` string inline. Delegating ensures the repo's PR template is read and filled correctly, and that all quality checks and companion-doc conventions are applied.

**Routing rule:**

| Repo owner         | Skill to invoke                            |
| ------------------ | ------------------------------------------ |
| `LittleBranches/*` | `/create-giselle-pr <branch> skip-hygiene` |
| All other repos    | `/create-pr <branch> skip-hygiene`         |

The `skip-hygiene` flag is always passed — T2/T3 already created and pushed the branch cleanly; there is nothing to re-check.

**Do not** call `gh pr create --body` or `gh pr create --body-file` directly in this step. Those bypass the repo's pull request template and produce non-conforming PR descriptions. The `create-pr` and `create-giselle-pr` skills read the template from `.github/pull_request_template.md`, fill every section, and open the PR correctly.

PRs are created as **drafts** — pass `--draft` only if the delegated skill does not do so automatically (check the skill's behaviour for the target repo).

---

## Changelog

| Date | What changed | Why |
| --- | --- | --- |
| 2026-05-30 | T4 now delegates PR creation to `/create-giselle-pr` (LittleBranches repos) or `/create-pr` (other repos) instead of constructing `--body` inline | `gh pr create --body` bypasses `.github/pull_request_template.md`; delegating fixes non-conforming PR descriptions |
| 2026-05-30 | T3 now requires a PR description update whenever a push lands on a branch that already has an open PR | Stale PR descriptions accumulate silently when multiple commits are pushed; every push must reflect the current branch state |
