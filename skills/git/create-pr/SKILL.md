---
name: create-pr
description: Prepare a branch for a pull request — verify branch hygiene, run the quality gate, create the PR with a well-formed description via the gh CLI, and optionally request a review. Use when asked to "create pr <branch>", "open a PR for <branch>", or "create a pull request".
---

# Create PR

Covers two phases:

- **Phase 0 — Branch hygiene**: every commit belongs to the branch's stated purpose; quality gate passes.
- **Phase 1 — PR creation**: PR created via `gh pr create` with a complete description; review optionally triggered.

## Configurable defaults (read before using)

Six points in this workflow are opinionated. They are called out inline with **⚙️ Configurable** labels.

| # | Default behaviour | What to override |
| --- | --- | --- |
| 1 | Branch prefixes: `feature/`, `fix/`, `chore/`, `refactor/`, `docs/` | Add or remove prefixes to match your conventions |
| 2 | Quality gate command: `npm run check:verify` | Replace with any command that exits 0 on pass |
| 3 | Green-light gate: wait for explicit user approval before creating the PR | Pass `auto-approve` argument to skip the gate |
| 4 | PR description uses `.github/pull_request_template.md` if present; falls back to a conventional set of sections | Provide your own template or skip the fallback |
| 5 | PR title format: `<type>(<scope>): <short description>` (conventional commits) | Replace with your team's format |
| 6 | Base branch: `main` (detected; falls back to `main` if detection fails) | Pass a different base branch name if needed |

---

## Arguments

`/create-pr <branch>` — branch to create the PR for. Required. Ask if omitted.  
`/create-pr <branch> skip-hygiene` — skip Phase 0 (use when hygiene was already done in this session).  
`/create-pr <branch> request-review` — trigger a review bot after PR creation.  
`/create-pr <branch> auto-approve` — skip the green-light gate in Phase 1 Step 4 and create the PR immediately.  
`/create-pr <branch> <owner>/<repo>` — if the repo cannot be inferred from context.

---

## Phase 0 — Branch hygiene

> Skip this phase if `skip-hygiene` was passed.

### Step 1 — Identify the branch's working set

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || echo 'main')
git log ${DEFAULT_BRANCH}..<branch> --oneline
```

Save `$DEFAULT_BRANCH` — use it in place of `main` throughout Phase 0 and Phase 1.

Note every commit on the branch. This is the working set for the rest of Phase 0.

### Step 1b — Verify the branch is not stacked on another open PR

The single most common snowball trigger is a branch cut from another branch that is
still in review: the child can't merge until the parent does, and review debt compounds.

```sh
git fetch origin ${DEFAULT_BRANCH} --quiet
# Commits unique to this branch (not yet on the base):
git log --oneline origin/${DEFAULT_BRANCH}..<branch>
# Heads of all other open PRs:
gh pr list --state open --json number,headRefName,headRefOid
```

Compare: if any open PR's `headRefOid` appears in the `git log origin/${DEFAULT_BRANCH}..<branch>`
output, this branch is **stacked** on that PR's branch.

**If stacked — stop and surface it:**

> "This branch is stacked on `<other-branch>` (PR #<N>), which hasn't merged yet.
> Stacking is the fastest path to a PR snowball. Options:
> (a) merge PR #<N> first, then rebase this branch onto `${DEFAULT_BRANCH}`;
> (b) if the dependency isn't real, rebase this branch directly onto `${DEFAULT_BRANCH}` now."

Do not create the PR until the branch is based on `${DEFAULT_BRANCH}`, unless the user
explicitly accepts the stacked dependency.

### Step 2 — Verify every commit belongs on this branch

Read the branch prefix to determine the stated purpose:

| Prefix      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `feature/`  | New functionality                         |
| `fix/`      | Bug fix                                   |
| `chore/`    | Tooling, config, dependencies, docs       |
| `refactor/` | Code restructure with no behaviour change |
| `docs/`     | Documentation only                        |

> **⚙️ Configurable — branch prefixes:** Add or remove prefixes to match your conventions. A common addition is `data/` for data-file-only changes (e.g. seed or fixture updates). That prefix is not included by default because it is specific to projects that version their data files in the repository.

For each commit, decide: does it relate to the branch's stated purpose?

- A `chore:` commit on a `feature/` branch is **fine** if it enables the feature (adding a barrel export, bumping a required dependency).
- It is **not fine** if it is unrelated (bumping a linter version on a feature branch, fixing a typo on a chore branch).

**If unrelated commits are found:**

1. Identify the correct branch prefix for each unrelated commit.
2. Check whether a branch for that purpose already exists. If yes, cherry-pick onto it. If no, create a new branch from `$DEFAULT_BRANCH`.
3. Remove the commit from the original branch via interactive rebase.
4. Force-push the original branch — **only after confirming no open PR exists for it**. If a PR already exists, ask the user before force-pushing; force-pushing rewrites history and invalidates outstanding review threads.

```sh
git rebase -i ${DEFAULT_BRANCH}
git push --force-with-lease origin <branch>
```

### Step 3 — Run the quality gate

> **⚙️ Configurable — quality gate command:** The command below is a typical example. Replace it with your own gate command. A quality gate is any command that exits 0 when formatting, linting, type-checking, and tests all pass. Common alternatives:
>
> - `npm run lint && npm run typecheck && npm test`
> - `pnpm check`
> - `make ci`

```sh
# Replace with your project's quality gate command
npm run check:verify
```

Do not continue to Phase 1 if the gate fails. Fix the failures first.

---

## Phase 1 — PR creation

> **Note:** `DEFAULT_BRANCH` is set unconditionally here so Phase 1 works correctly even when Phase 0 was skipped via `skip-hygiene`.

```sh
DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || echo 'main')
```

### Step 4 — Wait for the green light

> **⚙️ Configurable — green light gate:** By default this skill waits for an explicit instruction before creating the PR ("go ahead", "create it", "open it"). This prevents accidental PR creation mid-task. If you prefer immediate creation without the gate, pass `auto-approve` as an argument.

Do not proceed to Step 5 until the user explicitly approves PR creation.

### Step 5 — Build the PR description

Check for an existing template:

```sh
cat .github/pull_request_template.md 2>/dev/null
```

**If a template exists:** fill every section with actual content derived from the branch commits and conversation context. Never leave a section empty or with placeholder text.

**If no template exists**, use this fallback structure and fill it completely:

> **⚙️ Configurable — fallback PR template sections:** These fields are a widely useful default. Replace or extend them to match your team's conventions.

```md
## What does this PR do?

<one paragraph: the concrete deliverable>

## Why

<reason this change is needed — link to an issue, roadmap entry, or prior conversation>

## Mergeable bar

<the done condition, agreed before review opens — what must be true to merge, and which
review threads are blocking vs tracked-deferred vs won't-fix. Reviewers apply THIS bar.>

## Type of change

- [ ] New feature
- [ ] Bug fix
- [ ] Refactor (no behaviour change)
- [ ] Chore / docs / config

## Checklist

- [ ] Quality gate passes
- [ ] Tests added or updated where applicable
- [ ] No secrets or credentials in changed files

## Notes for reviewer

<anything non-obvious the reviewer should check first>
```

**PR title format:** `<type>(<scope>): <short description>` — mirrors the conventional commits convention.

> **⚙️ Configurable — PR title format:** Conventional commits titles are widely used but not universal. Replace with your team's format if needed.

**The `## Mergeable bar` section is mandatory and must be filled before the PR is opened.**
If a `.github/pull_request_template.md` exists but has no equivalent section, append the
Mergeable bar block above to the body. A PR with no stated done-condition is the root cause
of review escalation — threads multiply with no exit condition. Do not open the PR without
it, unless the user explicitly waives the requirement. See
`raw/reference/pr-snowball-mitigation.md` (guardrail #4).

### Step 6 — Create the PR

**Do not use the GitHub web UI to create the PR.** The UI pre-fills the template structure but leaves every section empty, requiring manual content entry and producing inconsistent descriptions. Always create via `gh pr create`.

```sh
gh pr create \
  --title "<type>(<scope>): <short description>" \
  --body "<filled description from step 5>" \
  --base ${DEFAULT_BRANCH} \
  --head <branch>
```

> **⚙️ Configurable — base branch:** `DEFAULT_BRANCH` is detected automatically in Phase 0. If detection fails it falls back to `main`. Override as needed (`master`, `develop`, `trunk`, etc.).

Save the PR number from the command output.

### Step 7 — Trigger a review (optional)

> **Only run this step if `request-review` was passed.** Requires a GitHub Copilot subscription with the code review feature enabled. If you use a different review bot (e.g. CodeRabbit, Graphite), adapt this step accordingly.

Check whether the review bot was automatically added:

```sh
gh pr view <PR-number> --json reviewRequests --jq '.reviewRequests[].login'
```

If `github-copilot[bot]` already appears, skip this step.

If not, trigger it manually via the GitHub UI: **PR → "Reviewers" → "Request" → Copilot**

There is no reliable CLI or API path for requesting a bot review — the GitHub UI is required.

Stop here. Do not respond to review threads in this skill. Use `/respond-pr-review <PR-number>` when you are ready to address the review.

---

## Output

Report back with:

- Phase 0 result: any commits moved or flag to skip hygiene next time
- Quality gate result: pass / fail (if fail: what failed)
- PR URL and number
- Whether a review was triggered
