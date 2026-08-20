## What it does

`sync-branches` brings every local branch in a repo, or in several repos at once, up to date against both origin and the repo's own default branch. It resolves the default branch per repo rather than assuming `main` (some repos use `master`, `develop`, or `trunk`), flags branches already merged into that default, pulls stale branches from origin, and merges the default into every branch that is still active.

The work is split into a read-only triage phase and three phases that actually touch branches, and the triage phase runs first, across every repo in the sweep, before a single checkout happens anywhere.

## When to reach for it

Ask for it with "sync branches," "update local branches," "merge main into all branches," "branch hygiene," or "cleanup local branches." Run it whenever a workspace has accumulated stale local branches that have drifted behind origin or the default branch.

## Phase 1 is read-only, on purpose

Triage runs a script (`triage.sh`, shipped next to the skill, not in the repo being triaged) that fetches, resolves the true default branch per repo, and reports everything Phases 2 to 4 need, without ever checking out, merging, pushing, committing, or deleting anything.

Resolving the default branch matters more than it looks. `origin/HEAD` is written once at clone time and is never updated by `git fetch`, even with `--prune`, so a repo whose remote default branch moved since it was cloned can carry a stale local pointer that resolves cleanly and is silently wrong. The triage script re-queries the remote unconditionally to correct for this, and if it genuinely cannot resolve a default branch, it stops and asks rather than falling back to the literal string `main`. A wrong answer with no failure signal is the exact failure mode this guards against, because the merged-branch list it produces feeds real deletions later.

The triage report is presented as a table before anything proceeds, with the resolved default branch stated in the header so it is visible that it was resolved, not assumed.

## Phases 2 to 4 are one git command at a time

Pulling stale branches uses `--ff-only`, which fails safely on any divergence rather than creating an unintended merge commit. Merging the default branch into active branches happens branch by branch, with conflicts resolved in place rather than aborted (`git merge --abort` on Windows/MINGW64 triggers an interactive prompt per file, so it is avoided entirely). Deleting a merged branch checks whether it is protected on the remote first; a protected branch only gets its local copy removed, never the remote one.

These phases are deliberately written out as individual commands rather than scripted, because each one checks out, merges, pushes, or deletes, and each deserves to be read and approved on its own rather than run as an unreviewable batch.

## Common questions

**Why not just assume every repo uses `main`?**

Because it fails in two different ways that both look fine at a glance: a repo with no `origin/main` ref at all can still exit as if it succeeded if the diagnostic swallows the error, and a repo where `origin/main` exists but is not actually the default silently computes the merged-branch list against the wrong base. Both give a wrong answer with no visible failure.

**What if a branch is ahead of origin but has no upstream set?**

The triage output has a specific bucket for this: a same-name branch exists on origin but local tracking was never configured. It is not treated as local-only; depending on whether it is ahead, behind, or both, it gets pulled, merged and pushed with upstream set, or reconciled first if diverged.

## It's working if

- The header of every report states the resolved default branch by name, and it is never the literal string `main` unless that repo's remote actually resolved to it.
- Triage never checks out a branch, and Phases 2 to 4 never run before you have seen and confirmed the triage table.
- A branch marked `[ahead N, behind M]` (diverged) is flagged for manual review, never auto-merged.
- A protected branch is never deleted on the remote, only locally, and the report says so explicitly.

## Where it fits

`sync-branches` is workspace maintenance, run independently of the PR flow rather than as a step inside it. It pairs naturally with [repo-status](./repo-status.md): once you know which repos have dirty working trees, `sync-branches` is what keeps the clean ones from drifting behind origin and the default branch in the meantime.
