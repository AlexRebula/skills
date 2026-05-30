---
name: sync-branches
description: Syncs all local branches in a git repo against origin and main — fetches latest, flags already-merged branches, pulls each stale branch from origin, then merges main into every active branch. Use when asked to "sync branches", "update local branches", "merge main into all branches", "branch hygiene", or "cleanup local branches".
---

# Sync Branches

Brings every local branch up to date with origin and with main. Works on one repo or many.

## Phase 1 — Fetch and triage (read-only, no checkout switches)

Run this single diagnostic in the repo root. It produces everything needed to plan Phases 2–4.

```sh
git fetch --prune origin && \
  echo "=== MERGED ===" && \
  git branch --merged origin/main | grep -vE '^\*|^  main$|^  master$' && \
  echo "=== ALL BRANCHES ===" && \
  git for-each-ref \
    --format='%(refname:short)|%(upstream:short)|%(upstream:track)' \
    refs/heads/ && \
  echo "=== SAME-NAME ORIGIN WITHOUT UPSTREAM ===" && \
  for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do \
    upstream=$(git for-each-ref --format='%(upstream:short)' "refs/heads/$branch"); \
    if [[ -z "$upstream" ]] && git show-ref --verify --quiet "refs/remotes/origin/$branch"; then \
      counts=$(git rev-list --left-right --count "origin/$branch...$branch"); \
      behind=$(echo "$counts" | awk '{print $1}'); \
      ahead=$(echo "$counts" | awk '{print $2}'); \
      echo "$branch|origin/$branch|[same-name remote, no upstream]|behind=$behind|ahead=$ahead"; \
    fi; \
  done
```

**Reading the output:**

| Section | What it means |
|---|---|
| `=== MERGED ===` block | Branches **fully merged into main on origin** — flag these; skip them in Phases 2–4; candidates for deletion |
| `branch\|origin/branch\|` (no track) | In sync with origin |
| `branch\|origin/branch\|[behind N]` | Stale local — pull needed (Phase 2) |
| `branch\|origin/branch\|[ahead N]` | Local is ahead of origin — push needed (out of scope) |
| `branch\|origin/branch\|[ahead N, behind M]` | Diverged — skip auto-pull; flag for manual review |
| `branch\|\|` (no upstream) | Ambiguous — check the `=== SAME-NAME ORIGIN WITHOUT UPSTREAM ===` block before calling it local-only |
| `branch\|origin/branch\|[same-name remote, no upstream]\|behind=N\|ahead=M` | Remote branch exists but local tracking was never set; treat it like the matching tracked state |

**Important:** `branch||` does **not** automatically mean local-only. First check whether `origin/<branch>` exists. If it does, the branch was missed by tracking config, not by Git history.

**Present a triage table to the developer before proceeding:**

```
Branch              | Merged? | Status       | Action
--------------------|---------|--------------|-----------------------------
feature/my-work     | No      | In sync      | Merge main only
docs/old-stuff      | YES     | —            | Skip — merged, flag for delete
chore/update        | No      | Behind 3     | Pull then merge main
fix/bug             | No      | Diverged     | Flag — manual review needed
docs/missed-branch  | No      | No upstream, remote exists, ahead 12 | Merge main; push with `-u`
```

Confirm the plan with the developer before Phase 2.

---

## Phase 2 — Pull stale branches

For each `[behind N]` branch (not diverged, not merged):

```sh
git checkout <branch> && git pull --ff-only origin <branch> && echo "PULLED_OK" || echo "PULL_FAILED"
```

`--ff-only` is safe: fails if histories have diverged, preventing unintended merge commits. If it fails, move the branch to the "manual review" list.

### Branches with no upstream but a same-name origin branch

If `=== SAME-NAME ORIGIN WITHOUT UPSTREAM ===` reports `origin/<branch>` exists, do **not** treat the branch as local-only.

- `behind > 0` and `ahead = 0` → stale local; run:

```sh
git checkout <branch> && git pull --ff-only origin <branch> && echo "PULLED_OK" || echo "PULL_FAILED"
```

- `behind = 0` and `ahead > 0` → remote exists and local is ahead; merge `main` in Phase 3, then push with upstream set:

```sh
git push -u origin <branch>
```

- `behind > 0` and `ahead > 0` → diverged; do **not** bulk-push blindly. First reconcile the remote branch into the local branch, then push with upstream set:

```sh
git checkout <branch> && git merge origin/<branch> --no-edit && echo "REMOTE_MERGED" || echo "REMOTE_CONFLICTS"
git push -u origin <branch>
```

If the remote merge conflicts, resolve it in place using the same no-abort rule as Phase 3.

---

## Phase 3 — Merge main into active branches

For each branch that is **not** in the merged list and not flagged for manual review:

```sh
git checkout <branch> && git merge main --no-edit && echo "DONE_CLEAN" || echo "CONFLICTS"
```

**Conflict resolution — in-place only (never abort):**

```sh
# Take main's version for known conflict files:
git checkout --theirs <file1> <file2>
git add -A
git commit --no-edit
```

**Never use `git merge --abort` on Windows/MINGW64** — it triggers interactive
directory-deletion prompts that must be answered one by one.

### Phase 3 push follow-up for no-upstream branches

If a branch was handled successfully but came from the `same-name remote, no upstream` bucket, set upstream when pushing it so future runs classify it correctly:

```sh
git push -u origin <branch>
```

---

## Phase 4 — Final report

After all merges, print a summary:

```
Branch              | Merged into main? | Was stale? | Merge result
--------------------|-------------------|------------|-------------
feature/my-work     | No                | No         | ✅ Clean
chore/update        | No                | Yes        | ✅ Clean
docs/missed-branch  | No                | No upstream, remote existed | ✅ Clean + upstream set
docs/old-stuff      | YES — delete?     | —          | Skipped
fix/bug             | No                | Diverged   | ⚠️ Manual
```

Offer to delete the flagged merged branches if the developer confirms:

```sh
git branch -d <merged-branch>        # local delete (safe — won't delete unmerged)
# git push origin --delete <branch>  # remote delete — ask explicitly before running
```

---

## Multi-repo usage

Run Phase 1 for all repos first (read-only), aggregate the triage tables, then do Phases 2–4
one repo at a time. This batches all planning before any checkout switches happen.

```sh
for repo in <path1> <path2> <path3>; do
  echo "====== REPO: $repo ======"
  cd "$repo" && \
    git fetch --prune origin && \
    echo "=== MERGED ===" && \
    git branch --merged origin/main | grep -vE '^\*|^  main$|^  master$' && \
    echo "=== ALL BRANCHES ===" && \
    git for-each-ref \
      --format='%(refname:short)|%(upstream:short)|%(upstream:track)' \
      refs/heads/ && \
    echo "=== SAME-NAME ORIGIN WITHOUT UPSTREAM ===" && \
    for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/); do \
      upstream=$(git for-each-ref --format='%(upstream:short)' "refs/heads/$branch"); \
      if [[ -z "$upstream" ]] && git show-ref --verify --quiet "refs/remotes/origin/$branch"; then \
        counts=$(git rev-list --left-right --count "origin/$branch...$branch"); \
        behind=$(echo "$counts" | awk '{print $1}'); \
        ahead=$(echo "$counts" | awk '{print $2}'); \
        echo "$branch|origin/$branch|[same-name remote, no upstream]|behind=$behind|ahead=$ahead"; \
      fi; \
    done
done
```

---

## Windows / MINGW64 notes

`git checkout` to a branch that removes directories triggers an interactive
`Deletion of directory X failed. Should I try again? (y/n)` prompt.
Answer `n` to each — git still completes the checkout. This is cosmetic and non-fatal.
