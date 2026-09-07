---
name: wip-sweep
description: "Sweep dirty repos for uncommitted work and create OSS §2.1-compliant snapshot branches. Groups dirty files by logical concern, proposes branch names and commit messages, then runs a tiered action model: T2 (local commit), T3 (push to remote), T4 (draft PR), with a confirmation gate at each tier (interactive mode), or unattended for private, docs-only groups (auto mode). Use after /repo-status has produced a dirty state table."
---

# WIP Sweep

## Arguments

`/wip-sweep`: interactive (default, unchanged from before `auto` existed). Shows the dirty-state table, asks which repos to sweep, asks before every commit, every push, and every PR-open.

`/wip-sweep auto`: non-interactive. For each dirty repo/group, decides automatically whether it qualifies for unattended commit → push → PR-open (see "Auto-eligibility" below); anything that doesn't qualify falls back to the normal interactive tiers for that repo/group only, unchanged. Auto mode is silent on confirmation, never on visibility — every dirty-state table, plan, and action is still printed as it happens.

`/wip-sweep auto <repo-list>`: same as `auto`, but scoped to exactly the repos named in `<repo-list>` (e.g. passed by `/session-wrap`'s hand-off). Any *other* dirty repo found outside this list is never swept and never silently skipped — it's surfaced immediately as an out-of-scope finding (see T1), since it means something unexpected is dirty beyond the caller's own known scope.

---

## Auto-eligibility (only relevant in `auto` mode)

A sweep-group may proceed through T2/T3/T4 without stopping for approval only when **both**:

1. **The repo is private.** Check live, every time, never assumed or cached: `gh repo view --json isPrivate --jq '.isPrivate' -R <owner>/<repo>`.
2. **Every file in this specific group** — not the whole repo, this group — is under the caller's `SESSIONS_ROOT` (if the caller supplied one) or matches a docs-only extension (`.md`, `.mdx`). One non-doc file anywhere in the group disqualifies the whole group, even if the repo is private and even if every other file in the group is docs.

A group failing either check falls back to that repo's normal interactive T2/T3/T4 prompts, exactly as today — `auto` mode never skips a prompt for a non-qualifying group, only for a qualifying one.

**A public repo never qualifies, regardless of file contents.** Always fall back to interactive prompts for a public repo's groups, and call this out explicitly wherever the dirty-state table is shown (a `Visibility` column, or an inline `⚠️ PUBLIC` marker) — a public repo must never look visually indistinguishable from an auto-eligible private one.

---

## Scope selection (T1: automatic)

**Interactive mode (default):** show the dirty state table from `/repo-status` to the developer and ask:

> "Which repos should I sweep? Options: A) All dirty repos (default) B) Select specific repos C) Skip WIP sweep entirely
>
> For any repo you want swept, should I also suggest a group name for the WIP branch based on the dirty file contents? (y/n)"

Wait for the developer's answer before proceeding.

**`auto` mode:** skip the prompt entirely.

- If a `<repo-list>` was supplied by the caller: restrict the scan to exactly those repos. Any additional dirty repo found outside this list is not swept — print `⚠️ <owner>/<repo> is dirty but wasn't in the scope this session touched — skipping, needs manual review.` and move on. Do not ask a yes/no about it inline; auto mode never blocks waiting for an answer about an out-of-scope repo, it just refuses to touch it and flags it in the output.
- If no `<repo-list>` was supplied: scan all known dirty repos as in interactive mode, but every repo/group is still subject to the Auto-eligibility check above rather than being blanket-included.
- Grouping still happens exactly as in T2 (by logical concern) — `auto` changes whether the tiers below pause for approval, never how files get grouped.

---

## T2: Stage and commit locally (ask before running)

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
   - Mixed types → `chore/` (safe default: ask the developer to correct if wrong)

   `wip/` is never valid. Full §2.1 table is in OSS AGENTS.md: fetch on demand if unsure.

   Branch name format: `<prefix>/YYYYMMDD-<group-slug>` Commit format: `<type>(standup-prep): snapshot (<group>, YYYY-MM-DD)`

   Examples:
   - Docs group → `docs/20260523-dashboard-plan-updates` / `docs(standup-prep): snapshot (dashboard-plan, 2026-05-23)`
   - CI config group → `chore/20260523-ci-config` / `chore(standup-prep): snapshot (ci-config, 2026-05-23)`
   - Component work → `feature/20260523-stat-card-progress` / `feature(standup-prep): snapshot (stat-card, 2026-05-23)`

4. Present the full plan:

   > "I will create the following snapshot commits (OSS §2.1 branch names):
   >
   > - [my-app] docs/20260523-dashboard-plan (3 files: docs/dashboard-components-plan.md, ...)
   > - [my-app] chore/20260523-ci-config (2 files: ci.yml, vitest.config.ts)
   > - [my-lib] docs/20260523-roadmap-updates (2 files: docs/roadmap.md, src/styles.css)
   >
   > Proceed with local commits? [y/n/edit]"

   **In `auto` mode, for an auto-eligible group** (see "Auto-eligibility" above): print this same plan text, but skip the question — do not wait for an answer, proceed straight to step 5 for that group. A group that isn't auto-eligible still asks, exactly as above.

5. If confirmed (interactive mode) or auto-eligible (auto mode), run:
   ```sh
   git -C <repo-path> checkout -b <prefix>/YYYYMMDD-<group-slug>
   git -C <repo-path> add <files-in-group>
   git -C <repo-path> commit -m "<type>(standup-prep): snapshot (<group>, YYYY-MM-DD)"
   ```

---

## T3: Push to remote (ask per repo, after T2)

After T2 completes, ask:

> "Push WIP branches to remote? [y=all / n=none / list repo names to push selectively]"

**In `auto` mode, for an auto-eligible group:** skip this question — print `Pushing <branch> to origin (auto)...` and push immediately. A group that isn't auto-eligible still asks, exactly as above.

For each confirmed (interactive) or auto-eligible (auto) repo:

```sh
git -C <repo-path> push -u origin HEAD
```

### Update existing PR description (non-negotiable)

After every push, check whether the branch already has an open PR:

```sh
gh pr view --json number,title,body --repo <owner>/<repo> <branch>
```

If an open PR exists:

1. **Update the PR description.** Delegate to the correct PR skill with an `update` flag. Do not construct the body inline. Use the same routing table as T4:

   | Repo               | Skill to invoke                                           |
   | ------------------ | --------------------------------------------------------- |
   | Custom org variant | Your org-specific PR creation skill (if one exists)       |
   | Default            | `/create-pr <branch> skip-hygiene update`                 |

2. If the delegated skill does not yet support an `update` flag, fall back to reading `.github/pull_request_template.md`, filling every section with the current branch state, and running:

   ```sh
   gh pr edit <number> --body-file <temp-file> --repo <owner>/<repo>
   ```

3. Confirm to the developer: `"PR #N description updated."` with a link to the PR.

A push to a branch with an open PR **always** triggers a description update. There are no exceptions: a stale PR description is worse than no description.

---

## T4: Open pull requests (ask, default NO)

After T3, ask:

> "Open pull requests for the pushed branches? Default: NO. [y/n/select]"

**In `auto` mode, for an auto-eligible group:** skip this question — proceed straight to delegating to the PR skill below, and pass `auto-approve` in addition to `skip-hygiene` (see routing table), so `/create-pr`'s own green-light gate doesn't stop and ask a second time for the same decision. A group that isn't auto-eligible still asks as above, and if opened, only ever gets `skip-hygiene` — never `auto-approve` for a non-eligible or public group.

If yes (interactive) or auto-eligible (auto), for each pushed branch, **delegate to the correct PR skill**. Do not construct a `--body` string inline. Delegating ensures the repo's PR template is read and filled correctly, and that all quality checks and companion-doc conventions are applied.

**Routing rule:**

| Repo               | Skill to invoke                                                    |
| ------------------ | ------------------------------------------------------------------- |
| Custom org variant | Your org-specific PR creation skill (if one exists)                 |
| Default (interactive, or auto but not eligible) | `/create-pr <branch> skip-hygiene`             |
| Default (auto, eligible group)                  | `/create-pr <branch> skip-hygiene auto-approve` |

The `skip-hygiene` flag is always passed: T2/T3 already created and pushed the branch cleanly; there is nothing to re-check.

**Do not** call `gh pr create --body` or `gh pr create --body-file` directly in this step. Those bypass the repo's pull request template and produce non-conforming PR descriptions. The `create-pr` skill (or your org's custom variant) reads the template from `.github/pull_request_template.md`, fills every section, and opens the PR correctly.

PRs are created as **drafts**. The delegated PR creation skill must pass `--draft` to `gh pr create`. If for any reason it does not, append `--draft` explicitly. A WIP-sweep PR must never be opened as a ready-for-review PR.

---

## ⛔ Non-negotiable invariant: T4

**NEVER call `gh pr create` directly in T4. Not even once. Not even for "simple" PRs.**

The only permitted action is invoking `/create-pr <branch> skip-hygiene` (interactive, or auto but not eligible) or `/create-pr <branch> skip-hygiene auto-approve` (auto, eligible group) as a skill — never any other combination, and never `gh pr create` inline. Delegating reads `.github/pull_request_template.md`, fills every section, and creates the PR correctly. Calling `gh pr create` inline bypasses the template and produces non-conforming PR descriptions.

If `/create-pr` is unavailable or broken, stop and tell the user rather than falling back to an inline `gh pr create` call.

---

## Changelog

| Date | What changed | Why |
| --- | --- | --- |
| 2026-05-30 | T4 now delegates PR creation to your project's PR creation skill (or `/create-pr` as default) instead of constructing `--body` inline | `gh pr create --body` bypasses `.github/pull_request_template.md`; delegating fixes non-conforming PR descriptions |
| 2026-05-30 | T3 now requires a PR description update whenever a push lands on a branch that already has an open PR | Stale PR descriptions accumulate silently when multiple commits are pushed; every push must reflect the current branch state |
| 2026-06-13 | Added ⛔ non-negotiable block prohibiting inline `gh pr create` in T4 | Prose-level prohibition was ignored; caused non-conforming PR descriptions |
| 2026-09-07 | Added `auto` argument and per-group Auto-eligibility check (private repo + docs-only files); T2/T3/T4 skip their confirmation prompt for eligible groups, T4 also passes `auto-approve` through to `/create-pr` for eligible groups | Repeated interactive round-trips for `/session-wrap`'s own low-stakes docs commits had no real decision to make each time; scoped narrowly (private + docs-only, per group, never whole-repo) so public repos and mixed-content groups are unaffected |
