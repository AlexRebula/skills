---
name: commit-wip
description: >
  Scan every local workspace repo for uncommitted changes, group them by topic, and commit each group to the most semantically appropriate branch. Checks remote branches first — if an existing branch matches the changed files, commits go there. Only creates a new categorised branch (feature/, fix/, docs/, chore/, data/) when no remote match exists. Prevents WIP loss and keeps work on the right branch from the start.

argument-hint: 'Optional: path to a single repo (e.g. /path/to/repo). Omit to scan all workspace repos.'
agent: agent
---

# /commit-wip

Scan workspace repos for uncommitted changes, group them by topic, match each group to an existing remote branch, and commit there. Creates a new categorised branch only when no remote match exists.

**Use when:**

- Starting a morning session (before `/morning-pr-sweep` or `/bootstrap`)
- Switching branches or switching repos mid-session
- Before running any CI or quality gate command that reads the working tree

---

## Phase 0 — Determine scope

If an argument was provided, scope the scan to that repo path only.

Otherwise use the workspace repo list from `{{WORKSPACE_CONFIG}}` or the VS Code workspace folders in context.

Skip any path that does not exist on disk — do not error.

---

## Phase 1 — Scan for dirty state

For each repo path, run:

```sh
git -C <repo-path> status --porcelain
```

Collect repos with non-empty output. If none are dirty, print:

```
All repos clean — no uncommitted changes.
```

…and stop.

---

## Phase 2 — Fetch remote branches

For each dirty repo, fetch the remote so the branch list is current:

```sh
git -C <repo-path> fetch --prune --quiet
```

List all remote branches (strip the `origin/` prefix):

```sh
git -C <repo-path> branch -r --format='%(refname:short)' | sed 's|origin/||' | grep -v HEAD
```

---

## Phase 3 — Group dirty files by topic

Read the `git status --porcelain` output for each dirty repo and assign every file to a **topic group** using these rules (top-down, first match wins):

| File path pattern | Group label | Default branch prefix |
| --- | --- | --- |
| `src/components/<name>/` or `src/components/<group>/<name>/` | `component:<name>` | `feature/` |
| `docs/**`, `*.md` at root | `docs` | `docs/` |
| `data/**` | `data` | `data/` |
| `scripts/**` | `chore:scripts` | `chore/` |
| Config files (`*.config.*`, `package.json`, `tsconfig.json`, `eslint*`, `prettier*`, `.env*`) | `chore:config` | `chore/` |
| Test-only files (`*.test.ts`, `*.spec.ts`) | merge into their component group | — |
| Story files (`*.stories.tsx`) | merge into their component group | — |
| Prompt / skill files (`*.prompt.md`, `SKILL.md`) | `docs` | `docs/` |
| Mixed / unclassifiable | `wip` | `chore/` |

**Single group → one branch, one commit.** **Multiple groups → one branch per group, one commit each.** Files that cannot be cleanly separated (e.g. a shared util touched by two components) go into the largest group.

---

## Phase 4 — Match each group to an existing remote branch

For each group, scan the remote branch list for a match using these rules in priority order:

1. **Topic keyword match** — any remote branch whose name contains a keyword from the group label (e.g. group `component:stat-card` matches `feature/stat-card-tdd`, `fix/stat-card-overflow`, `chore/stat-card-cleanup`)
2. **Today's WIP branch** — a `chore/YYYYMMDD*` branch where the date is today's date
3. **No match** — proceed to Phase 5

Print the decision for every group before touching any files:

```
[my-app]   component:stat-card  →  feature/stat-card-tdd  (existing remote — keyword match)
[my-lib]   docs                 →  no match → will create docs/session-wrap-model-tracking
[my-site]  chore:config         →  no match → will create chore/eslint-rule-updates
```

If a match would require switching away from a branch that has its own unstaged work, warn and treat it as no-match instead — never silently discard local state.

---

## Phase 5 — Create a new branch when no remote match exists

Derive the branch name from the group label and the changed file names:

| Group prefix       | Branch name formula               | Example                            |
| ------------------ | --------------------------------- | ---------------------------------- |
| `component:<name>` | `feature/<name>-updates`          | `feature/stat-card-updates`        |
| `docs`             | `docs/<2-3-word-slug>`            | `docs/session-wrap-model-tracking` |
| `data`             | `data/<2-3-word-slug>`            | `data/task-status-updates`         |
| `chore:scripts`    | `chore/scripts-<slug>`            | `chore/scripts-seed-asana`         |
| `chore:config`     | `chore/<slug>`                    | `chore/eslint-rule-updates`        |
| `wip`              | `chore/YYYYMMDD-<dominant-topic>` | `chore/20260523-mixed-config`      |

The `<slug>` is 2–4 kebab-case words describing what the files are about — read the file names and changed content to produce a meaningful slug, not a generic one.

If `fix` context is clear from the changed files (e.g. a known bug file, a hotfix commit message, a `*.fix.ts` convention), prefer `fix/<slug>` over `feature/<slug>`.

```sh
git -C <repo-path> checkout -b <new-branch-name>
```

If the branch name already exists locally, append `-2`, `-3`, etc.

---

## Phase 6 — Commit each group to its branch

For each group, in the order determined by Phases 4–5:

```sh
# Check out the target branch (create if Phase 5 applied)
git -C <repo-path> checkout <branch-name>

# Stage only the files belonging to this group
git -C <repo-path> add <file1> <file2> ...

# Commit with a meaningful save-state message (Conventional Commit format)
git -C <repo-path> commit -m "chore: wip snapshot — <group label>"

# Push, setting upstream on new branches
git -C <repo-path> push -u origin HEAD
```

If push fails (network, branch protection), commit locally and flag the failure — do not abort the remaining groups or repos.

---

## Phase 7 — Summary

Print a table when done:

```
Repo          Group                Branch                         Files  Status
──────────── ──────────────────── ────────────────────────────── ────── ────────────────────
my-app         component:stat-card  feature/stat-card-tdd          4      ✅ committed + pushed
my-lib         docs                 docs/session-wrap-model-track  2      ✅ new branch + pushed
my-site        chore:config         chore/eslint-rule-updates       1      ✅ new branch + pushed
my-other-repo  —                    —                              —      ✓ already clean
```

List any push failures separately with the error message.

---

## Notes

- This skill does **not** run tests, lint, or any quality gate — it only stages and commits. Dirty WIP may not be in a passing state. The goal is safety, not correctness.
- Commit messages use `chore: wip snapshot — <label>` format. These are easy to grep and squash or amend before opening a PR.
- Branch matching is heuristic — it is intentionally conservative. When in doubt, a new branch is always safer than committing to the wrong existing branch.
- The `fix/` prefix is never assumed automatically for ambiguous files — only when the context makes it unambiguous (e.g. the file name, a prior commit message, or the user explicitly says so).
