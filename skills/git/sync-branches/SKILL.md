---
name: sync-branches
description: Syncs all local branches in a git repo against origin and against the repo's default branch — resolves the default branch per repo (main, master, or other), fetches latest, flags already-merged branches, pulls each stale branch from origin, then merges the default branch into every active branch. Use when asked to "sync branches", "update local branches", "merge main into all branches", "branch hygiene", or "cleanup local branches".
---

# Sync Branches

Brings every local branch up to date with origin and with the repo's default branch. Works on one
repo or many, including a mix of `main` and `master` repos in the same sweep.

## Phase 1 — Triage (read-only, no checkout switches)

Run `scripts/triage.sh`. It fetches, resolves each repo's default branch, and prints everything
needed to plan Phases 2–4. It never checks out, merges, pushes, commits, or deletes a branch.

```bash
scripts/triage.sh
```

For several repos at once — pass every path in one call so all planning happens before any
checkout switches:

```bash
scripts/triage.sh /path/to/repo-a /path/to/repo-b /path/to/repo-c
```

Exit codes: `0` all repos triaged · `2` at least one repo could not be triaged (look for `!!`
lines; the sweep continues past a failure rather than aborting). Run `scripts/triage.sh --help`
for usage.

### Why the script resolves the default branch instead of assuming `main`

**Never hardcode `origin/main`.** Not every repo uses `main` — `master` is still common, and some
repos use `develop` or `trunk`. A `main`-hardcoded triage fails two different ways:

| Repo state | What happens |
| --- | --- |
| No `origin/main` ref at all | `fatal: malformed object name origin/main` — aborting the diagnostic with no branch listing |
| `origin/main` exists but is not the default (stale or abandoned) | No error. The merged list is computed against the wrong base and is **silently wrong** — the dangerous case, since it feeds branch deletions |

The script resolves `origin/HEAD` per repo, repairs it with `git remote set-head origin --auto`
when absent (a **local** ref write — it mutates nothing on the remote), and **stops with `!!` if
it still cannot resolve.** It never falls back to `main`. If you see that, ask the developer which
branch is the default rather than guessing.

Below, `$DEFAULT_REF` means the remote-tracking default the script reported (e.g. `origin/master`)
and `$DEFAULT_BRANCH` the bare name (e.g. `master`). Substitute the reported values — never the
literal string `main`.

**Reading the output:**

| Section | What it means |
| --- | --- |
| `=== DEFAULT: … ===` | The resolved default branch for that repo. Check it before acting — this is what everything else is measured against. |
| `=== MERGED … ===` block | Branches **fully merged into `$DEFAULT_REF`** — flag these; skip them in Phases 2–4; candidates for deletion |
| `=== CURRENT BRANCH ===` | The branch you are on, reported separately because `MERGED` filters it out. `ahead=0` means it is merged and is itself a deletion candidate. |
| `=== WORKING TREE ===` | `clean`, or the dirty files. Do not start Phases 2–4 with uncommitted work you care about. |
| `branch\|origin/branch\|` (no track) | In sync with origin |
| `branch\|origin/branch\|[behind N]` | Stale local — pull needed (Phase 2) |
| `branch\|origin/branch\|[ahead N]` | Local is ahead of origin — push needed (out of scope) |
| `branch\|origin/branch\|[ahead N, behind M]` | Diverged — skip auto-pull; flag for manual review |
| `branch\|\|` (no upstream) | Ambiguous — check the `=== SAME-NAME ORIGIN WITHOUT UPSTREAM ===` block before calling it local-only |
| `branch\|origin/branch\|[same-name remote, no upstream]\|behind=N\|ahead=M` | Remote branch exists but local tracking was never set; treat it like the matching tracked state |

**Important:** `branch||` does **not** automatically mean local-only. First check whether `origin/<branch>` exists. If it does, the branch was missed by tracking config, not by Git history.

**Present a triage table to the developer before proceeding:**

State the resolved default branch in the table header so the developer can see it was not assumed:

```
Default branch: master (origin/master)

Branch              | Merged? | Status       | Action
--------------------|---------|--------------|-----------------------------
feature/my-work     | No      | In sync      | Merge default only
docs/old-stuff      | YES     | —            | Skip — merged, flag for delete
chore/update        | No      | Behind 3     | Pull then merge default
fix/bug             | No      | Diverged     | Flag — manual review needed
docs/missed-branch  | No      | No upstream, remote exists, ahead 12 | Merge default; push with `-u`
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

- `behind = 0` and `ahead > 0` → remote exists and local is ahead; merge `$DEFAULT_REF` in Phase 3, then push with upstream set:

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

## Phase 3 — Merge the default branch into active branches

For each branch that is **not** in the merged list and not flagged for manual review:

```sh
git checkout <branch> && git merge "$DEFAULT_REF" --no-edit && echo "DONE_CLEAN" || echo "CONFLICTS"
```

**Conflict resolution — in-place only (never abort):**

```sh
# Take the default branch's version for known conflict files:
git checkout --theirs <file1> <file2>
git add -A
git commit --no-edit
```

**Never use `git merge --abort` on Windows/MINGW64** — it triggers interactive directory-deletion prompts that must be answered one by one.

### Phase 3 push follow-up for no-upstream branches

If a branch was handled successfully but came from the `same-name remote, no upstream` bucket, set upstream when pushing it so future runs classify it correctly:

```sh
git push -u origin <branch>
```

---

## Phase 4 — Final report

After all merges, print a summary:

```
Default branch: master (origin/master)

Branch              | Merged into default? | Was stale? | Merge result
--------------------|----------------------|------------|-------------
feature/my-work     | No                   | No         | ✅ Clean
chore/update        | No                   | Yes        | ✅ Clean
docs/missed-branch  | No                   | No upstream, remote existed | ✅ Clean + upstream set
docs/old-stuff      | YES — delete?        | —          | Skipped
fix/bug             | No                   | Diverged   | ⚠️ Manual
```

Offer to delete the flagged merged branches if the developer confirms.

**Before any remote delete, check if the branch is protected:**

```sh
gh api repos/<owner>/<repo>/branches/<branch-url-encoded> --jq '.protected' 2>&1
```

- Returns `true` → **skip remote delete**; delete local only and note it in the report
- Returns `false` → safe to delete remote after developer confirms
- Returns an error → treat as unknown; skip remote delete and flag for manual review

Branch names with `/` must be URL-encoded (replace `/` with `%2F`) in the API path.

```sh
git branch -d <merged-branch>               # local delete (safe — won't delete unmerged)
git push origin --delete <merged-branch>    # remote delete — only after protection check passes AND developer confirms
```

Extend the Phase 4 table with a Protected? column for all merged branches that have a remote:

```
Branch          | Merged? | Protected? | Local delete | Remote delete
----------------|---------|------------|--------------|---------------
docs/old-stuff  | YES     | false      | ✅ Done      | ✅ Done
fix/shipped     | YES     | true       | ✅ Done      | ⛔ Skipped — protected
```

---

## Multi-repo usage

Triage every repo first (read-only), aggregate the tables, then do Phases 2–4 one repo at a time.
This batches all planning before any checkout switches happen.

```bash
scripts/triage.sh /path/to/repo-a /path/to/repo-b /path/to/repo-c
```

The script resolves the default branch **per repo** — a workspace routinely mixes `main` and
`master`, and one unresolvable repo does not abort the sweep of the rest.

---

## Files

| Path | What it does |
| --- | --- |
| `scripts/triage.sh` | Phase 1 — fetch, resolve default branch, print the read-only triage report. One repo or many. |

Phases 2–4 are single git commands run one branch at a time, with a developer decision between
each. They are written out inline below rather than scripted, deliberately: they check out,
merge, push and delete, so each one should be read and approved on its own rather than executed
in a batch you cannot inspect.

---

## Windows / MINGW64 notes

`git checkout` to a branch that removes directories triggers an interactive `Deletion of directory X failed. Should I try again? (y/n)` prompt. Answer `n` to each — git still completes the checkout. This is cosmetic and non-fatal.
