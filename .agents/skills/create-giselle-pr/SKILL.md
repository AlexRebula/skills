---
name: create-giselle-pr
description: Prepare a branch for a pull request in a LittleBranches repository — pre-loads the OSS quality standards, verifies branch hygiene, runs the quality gate including banned-content scan, creates the PR with a complete description, optionally writes a companion doc in docs/pr-messages/, and triggers a Copilot review. Use instead of /create-pr when working in LittleBranches/giselle-mui, LittleBranches/giselle-ui, LittleBranches/giselle-sections-sdk, or other LittleBranches-adjacent repositories.
---

# Create Giselle PR

Same two-phase workflow as `/create-pr`, with LittleBranches-specific additions baked in:

- AGENTS.md pre-loaded before hygiene checks
- Banned-content scan included in the quality gate
- `data/` branch prefix included
- Copilot review triggered by default
- Optional companion doc created in `docs/pr-messages/`

Use `/create-pr` for repositories outside this ecosystem.

### Differences from `/create-pr`

|                            | `/create-pr`                       | `/create-giselle-pr`                        |
| -------------------------- | ---------------------------------- | ------------------------------------------- |
| AGENTS.md pre-load         | ❌                                 | ✅ public + private, before hygiene         |
| Banned-content scan        | ⚙️ implied by quality gate         | ✅ explicitly called out (step 0a)          |
| `data/` branch prefix      | ⚙️ labeled as project-specific     | ✅ included, unlabeled                      |
| Quality gate command       | ⚙️ labeled, alternatives shown     | ✅ `npm run check:verify`, locked           |
| Copilot review trigger     | ⚙️ opt-in via `request-review` arg | ✅ ON by default, opt-out via `skip-review` |
| PR companion doc           | ❌                                 | ✅ opt-in via `with-companion-doc` arg      |
| `⚙️ Configurable` callouts | 6                                  | 0                                           |
| Handoff                    | generic                            | points to `/respond-giselle-pr-review`      |

---

## Arguments

`/create-giselle-pr <branch>` — branch to create the PR for. Required. Ask if omitted.  
`/create-giselle-pr <branch> skip-hygiene` — skip Phase 0 (use when hygiene was already done in this session).  
`/create-giselle-pr <branch> skip-review` — do not trigger the Copilot review after creation.  
`/create-giselle-pr <branch> with-companion-doc` — create a companion doc in `docs/pr-messages/`.  
`/create-giselle-pr <branch> <owner>/<repo>` — if the repo cannot be inferred from context.

---

## Pre-load: Standards and workflow docs

Always load these before doing anything else. They govern every decision in Phase 0 and Phase 1.

```sh
# Public AGENTS.md
# Fetch from: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md

# Private AGENTS.md (requires gh CLI authentication — never use fetch_webpage, the repo is private)
gh api repos/LittleBranches/oss-quality-standards-private/contents/AGENTS.md \
  --jq '.content | @base64d'

# PR review workflow doc (local, already in repo)
# Read: docs/pr-review-workflow.md
```

If the private AGENTS.md returns a permission error, note explicitly that banned-content and encryption rules were not checked, and proceed. Do not silently skip it.

---

## Phase 0 — Branch hygiene

> Skip this phase if `skip-hygiene` was passed.

### Step 1 — Identify the branch's working set

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
git log main..<branch> --oneline
```

Note every commit on the branch.

### Step 2 — Verify every commit belongs on this branch

Read the branch prefix to determine the stated purpose:

| Prefix      | Purpose                                                       |
| ----------- | ------------------------------------------------------------- |
| `feature/`  | New functionality                                             |
| `fix/`      | Bug fix                                                       |
| `chore/`    | Tooling, config, dependencies, docs                           |
| `refactor/` | Code restructure with no behaviour change                     |
| `docs/`     | Documentation only                                            |
| `data/`     | Data-file-only changes (e.g. `tasks.json` updates, seed data) |

For each commit: does it relate to the branch's stated purpose?

- A `chore:` commit on a `feature/` branch is **fine** if it enables the feature (barrel export, required dependency bump).
- It is **not fine** if it is unrelated (linter bump on a feature branch, typo fix on a chore branch).

**If unrelated commits are found:**

1. Identify the correct branch prefix for each unrelated commit.
2. Check whether a branch for that purpose already exists. If yes, cherry-pick. If no, create one from `main`.
3. Remove the commit from the original branch via interactive rebase.
4. Force-push **only after confirming no open PR exists for this branch**. If a PR exists, ask the branch owner before force-pushing — force-pushing rewrites history and invalidates outstanding review threads.

```sh
git rebase -i main
git push --force-with-lease origin <branch>
```

### Step 3 — Run the quality gate

The LittleBranches quality gate runs these checks in order:

```
0a — Banned-content scan     (scripts/check-banned-content.js)
1  — Prettier                (formatting)
2  — ESLint                  (lint + no-restricted-syntax for banned identifiers)
3  — TypeScript              (tsc --noEmit)
4  — Vitest                  (unit tests)
5  — tsup build              (distributable compiles, where applicable)
6  — Storybook build         (stories compile, where applicable)
```

```sh
npm run check:verify
```

Do not continue to Phase 1 if the gate fails. Fix the failures first. If the banned-content scan (step 0a) fires, the violation must be removed before the PR is created — banned identifiers in a public repo are a permanent part of the git history once pushed.

---

## Phase 1 — PR creation

### Step 4 — Wait for the green light

Do not proceed to Step 5 until the user explicitly approves PR creation in the current session ("go ahead", "create it", "open the PR"). A general instruction to finish a task is not a green light.

### Step 5 — Build the PR description

Check for the PR template:

```sh
cat .github/pull_request_template.md 2>/dev/null
```

If the template exists, fill every section with actual content derived from the branch commits and conversation context. Never leave a section empty or with its placeholder text.

If no template exists, use this fallback and fill it completely:

```md
## What does this PR do?

<one paragraph: the concrete deliverable>

## Why

<link to roadmap entry, GitHub issue, or conversation context>

## Type of change

- [ ] New feature
- [ ] Bug fix
- [ ] Refactor (no behaviour change)
- [ ] Chore / docs / config
- [ ] Data only

## Checklist

- [ ] Quality gate passes (Prettier + ESLint + tsc + Vitest + build)
- [ ] Banned-content scan clean (no proprietary identifiers in src/ or docs/)
- [ ] Tests added or updated where applicable
- [ ] No secrets or credentials in changed files
- [ ] Roadmap entry updated if a milestone was completed

## Notes for reviewer

<anything non-obvious the reviewer should check first>
```

**PR title format:** `<type>(<scope>): <short description>` — mirrors conventional commits.

### Step 6 — Create the PR

Do not use the GitHub web UI. Always use `gh pr create` to ensure the description is complete.

```sh
gh pr create \
  --title "<type>(<scope>): <short description>" \
  --body "<filled description from step 5>" \
  --base main \
  --head <branch>
```

Save the PR number from the output.

### Step 7 — Trigger the Copilot review

After the PR is created, check whether Copilot was automatically added:

```sh
gh pr view <PR-number> --json reviewRequests --jq '.reviewRequests[].login'
```

If `github-copilot[bot]` already appears, skip this step.

If not, trigger it manually via the GitHub UI: **PR → "Reviewers" → "Request" → Copilot**

There is no reliable CLI path for requesting a bot review — the GitHub UI is required.

> Skip this step only if `skip-review` was passed.

### Step 8 — Create companion doc (optional)

> Only run this step if `with-companion-doc` was passed.

Create a companion doc in `docs/pr-messages/`:

```sh
# Find the next PR number (the one just created)
# Folder name pattern: pr-<N>-<branch-slug>/
mkdir -p docs/pr-messages/pr-<N>-<branch-slug>
```

Companion doc path: `docs/pr-messages/pr-<N>-<branch-slug>/README.md`

Use this structure:

```md
---
sidebar_label: "PR<N> - <short description>"
---

**[Open](https://github.com/<owner>/<repo>/pull/<N>)** — [`<branch>`](url) — <DD Mon YYYY>

# PR: `<branch-name>`

> **Branch:** `<branch>` → `main`
> **PR:** [#<N>](url)
> **Type:** `feature` | `fix` | `chore` | `refactor` | `docs` | `data`
> **Opened:** <DD Mon YYYY>

---

## Summary

<one paragraph: what this PR delivers and why>

## What Changed

<subsections per logical group of changes, with bullet items>

## Quality gate

- [ ] Prettier
- [ ] ESLint
- [ ] TypeScript
- [ ] Vitest
- [ ] tsup build (if applicable)
- [ ] Storybook build (if applicable)
- [ ] Banned-content scan
```

After creating the companion doc, update `docs/pr-messages/README.md`:

1. Add a row to the **Branch To Roadmap Mapping** table (branch, PR number, dates, roadmap phases).
2. Add a `###` branch section under **Branches** with a one-sentence context note and a link to the companion doc.

Commit the companion doc and README update as a separate `docs:` commit on the same branch — do not mix it with the feature commit.

---

## Stop here

Do not respond to review threads in this skill.
Wait for the Copilot review to be submitted and threads to be visible.
Use `/respond-giselle-pr-review <PR-number>` when you are ready to address the review.

---

## Output

Report back with:

- Phase 0 result: commits moved, or hygiene was clean
- Quality gate result: pass / fail; if fail, which step
- PR URL and number
- Whether the Copilot review was triggered
- Companion doc path (if created)
