---
name: reap-ticket-branches
description: Find local git branches and worktrees left behind by a ticket that was closed or abandoned without a merged PR of its own, and report what is safe to remove. Read-only: prints findings and the exact git commands to run, never deletes anything itself. Classifies each match via a GitHub PR lookup (merged / open / no PR found) when a GitHub remote is available. Use when told something like "check for stale branches for ticket 841", "clean up leftover worktrees from issue 840", or via "/reap-ticket-branches 841".
argument-hint: '(--ticket <ref> | --branch <name>) --repo <path> [--repo <path> ...]'
---

# Reap Ticket Branches

Closing a ticket that never had a merged PR (superseded, abandoned, fixed a different way) has no natural cleanup trigger the way a PR merge does. This skill fills that gap: given a ticket reference, it finds every local branch or worktree still hanging around because of it, classifies each one against GitHub, and tells you exactly what to run to clean it up. It never runs a destructive command itself: that stays a deliberate, visible action, not something buried inside a script.

`pr-merged`'s own branch/worktree cleanup step delegates here too (see its `SKILL.md`), so both paths (merged-via-PR and closed-without-a-PR) share one implementation instead of two copies that can drift apart.

---

## Arguments

`/reap-ticket-branches <ticket-ref> --repo <path> [--repo <path> ...]`: scans each given repo for a branch whose name contains `<ticket-ref>`'s trailing digits as a delimited segment (`841` matches `fix/841-foo`, not `fix/8410-foo` or `fix/1841-foo`). Accepts a bare number or a prefixed one (`#841`, `tracker#841`): only the digits are used.

`/reap-ticket-branches --branch <exact-name> --repo <path>`: skip matching, report on this one branch. Used internally by `pr-merged` when it already knows the branch.

At least one `--repo` is required. Pass one per repo you want scanned; there is no config file and no auto-discovery of repos you didn't name.

A repo's own dedicated worktrees (created via `git worktree add`) are found automatically: `git worktree list` already reports every worktree linked to that repository, wherever it lives on disk, so there is nothing extra to configure for the common "a worktree per ticket, in a sibling folder" layout.

---

## Step 1: Run the script

```sh
npx tsx "{{SKILLS_ROOT}}/scripts/reap-ticket-branches.ts" --ticket <ticket-ref> --repo <path>
```

(repeat `--repo` for more than one repo; substitute `--branch <name>` for `--ticket <ticket-ref>` in direct-branch mode)

The script is read-only. It prints, for every match:

- the branch name, short commit, and which repo it is in
- whether it lives in a dedicated worktree (and that worktree's path)
- whether it is the branch currently checked out there (if so, no delete command is offered: switch away first)
- its GitHub PR state, one of:
  - **merged via PR #N**: safe to delete with `git branch -d`
  - **open PR #N, never merged**: a real PR is still sitting open against this abandoned work; consider closing it, not just deleting the branch
  - **closed PR #N, never merged**: closed without merging
  - **no PR found**: never pushed, or pushed and never opened as a PR
  - **PR state unavailable**: no `gh`, no auth, or no GitHub remote on this repo; only the git-level finding is reported
- the exact command(s) to run for that finding

---

## Step 2: Review and run the recommended commands

For a **merged** branch, the script recommends the safe `git branch -d` (refuses if somehow still unmerged, which would be worth investigating on its own).

For every other state (open, closed-unmerged, no PR, or unavailable), the script prints both the safe `-d` attempt and the force `-D` fallback, explicitly labeled as needing your own confirmation that the branch really is abandoned before running it. Never run the `-D` line automatically; read the classification first.

If a worktree remove command is listed, run it before the branch delete: `git worktree remove` on a path git still considers checked out will fail on its own, so ordering matters.

---

## Step 3: Report back

State which branches/worktrees were found, what was actually removed (or left for the user to confirm), and any that were skipped because they were checked out at scan time.
