---
name: commit-wip
description: >
  Scan every local workspace repo for uncommitted changes and commit them to a safe
  named branch. Prevents work from being lost when switching context or starting
  a morning PR sweep. Runs before any review or CI workflow.
argument-hint: "Optional: path to a single repo (e.g. C:/work/projects/ar/giselle-mui). Omit to scan all workspace repos."
agent: agent
---

# /commit-wip

Scan workspace repos for uncommitted changes and commit them to named branches.

**Use when:**
- Starting a morning session (runs before `/morning-pr-sweep` or `/bootstrap`)
- Switching branches or switching repos mid-session
- Before running any CI or quality gate command that reads the working tree

---

## Phase 0 — Determine scope

If an argument was provided, scope the scan to that repo path only.

Otherwise use the default workspace repo list:

```
C:/work/projects/ar/rm/presentation/alexrebula
C:/work/projects/ar/giselle-mui
C:/work/projects/ar/giselle-sections-sdk
C:/work/projects/ar/giselle-ui
C:/work/projects/ar/giselle-docs
C:/work/projects/ar/first-branch
C:/work/projects/ar/oss-quality-standards
C:/work/projects/ar/skills
```

Skip any path that does not exist on disk — do not error.

---

## Phase 1 — Scan for dirty state

For each repo path, run:

```sh
git -C <repo-path> status --porcelain
```

Collect the list of repos with non-empty output (dirty repos). If none are dirty, print:

```
All repos clean — no uncommitted changes.
```

…and stop.

---

## Phase 2 — Commit each dirty repo

For each dirty repo, run this sequence:

### 2a — Check current branch

```sh
git -C <repo-path> branch --show-current
```

### 2b — Create a WIP branch if on a protected branch

If the current branch is `main` or `master`, create a new branch before committing:

```sh
git -C <repo-path> checkout -b wip/$(date +%Y%m%d)-uncommitted
```

If already on a feature/fix/wip branch, stay on it — no new branch needed.

### 2c — Stage all changes

```sh
git -C <repo-path> add -A
```

### 2d — Commit

```sh
git -C <repo-path> commit -m "WIP: uncommitted changes — $(date +%Y-%m-%d)"
```

### 2e — Push

```sh
git -C <repo-path> push -u origin HEAD
```

If push fails (e.g. remote does not exist), commit locally and report the push failure separately — do not abort the rest of the repos.

---

## Phase 3 — Report

Print a summary table:

```
Repo                    Branch                          Status
─────────────────────── ──────────────────────────────── ──────────────────
giselle-mui             wip/20250522-uncommitted         ✅ committed + pushed
first-branch            fix/login-redirect               ✅ committed + pushed
alexrebula              main → wip/20250522-uncommitted  ✅ committed + pushed
giselle-docs            main                             ✓ already clean
```

If any push failed, list those repos separately with the error message.

---

## Notes

- This skill does **not** run tests, lint, or any quality gate — it only stages + commits.
  That is intentional: dirty WIP may not be in a passing state. The goal is safety, not correctness.
- The WIP commit message is intentional and easy to grep: `"WIP: uncommitted changes"`.
  Squash or amend it before opening a PR.
- On `main`/`master`, the branch created is `wip/YYYYMMDD-uncommitted`. If that branch
  already exists, append `-2`, `-3`, etc.
