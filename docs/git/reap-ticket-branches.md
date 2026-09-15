## What it does

`reap-ticket-branches` finds local git branches and worktrees left behind by a ticket that was closed or abandoned without ever getting a merged PR of its own — the case a PR-merge cleanup has no trigger for. Given a ticket reference (or an exact branch name) and one or more repo paths, it scans for every branch whose name contains that ticket's number as a delimited segment (`841` matches `fix/841-foo`, never `fix/8410-foo` or `fix/1841-foo`), finds any dedicated worktree it lives in via `git worktree list`, and classifies each match against GitHub: merged via PR, open PR never merged, closed PR never merged, no PR found, or PR state unavailable (no `gh`, no auth, no GitHub remote).

It is strictly read-only. It never deletes anything itself — it prints findings and the exact `git` command(s) to run, so the actual destructive step stays a deliberate, visible action, still subject to whatever safety hooks gate a directly-run branch delete.

[pr-merged](./pr-merged.md)'s own branch/worktree cleanup step (Step 4) delegates here in direct-branch mode, passing the exact branch it already knows rather than re-running ticket matching. That keeps one implementation behind both the "PR merged" and "ticket closed without a PR" paths instead of two that can drift apart.

## When to reach for it

Say something like "check for stale branches for ticket 841" or "clean up leftover worktrees from issue 840" — the skill's own description matches that pattern directly. `/reap-ticket-branches <ticket-ref> --repo <path>` also works explicitly, repeating `--repo` for more than one repo.

Reach for it any time a ticket gets closed by hand (superseded, abandoned, fixed a different way) with no PR of its own — the exact gap `pr-merged` doesn't cover, since its cleanup only fires on a PR-merge event.

## Why "ticket," not "issue"

This skill is deliberately tracker-agnostic: the reference it matches is just a number embedded in a branch name, regardless of whether the source is GitHub Issues, Jira, Linear, or Asana. It never calls an Issue-tracker API for that number — only local git and `gh pr list` for PR-state classification. So it isn't tied to any one tracker's naming, and works from an explicit repo path with no config file and no assumption about tracker conventions.

## Common questions

**Does this skill delete anything?**

No. Every finding comes with the command(s) to run, never a command it runs for you. A safe `git branch -d` for a confirmed-merged branch; both the safe `-d` attempt and a force `-D` fallback (explicitly labeled as needing your own confirmation) for every other state.

**What if the branch is the one currently checked out?**

No delete command is offered for it at all — switch away first, then re-run.

**What if a branch lives in a dedicated worktree?**

The worktree remove command is listed ahead of the branch delete, since `git worktree remove` fails on a path git still considers checked out.

**What if there's no GitHub remote, or `gh` isn't set up?**

The git-level finding (branch, commit, worktree) is still reported; PR state is reported as unavailable rather than guessed at.

## It's working if

- Every match is reported with its branch, short commit, worktree path (if any), and GitHub PR state.
- The currently checked-out branch is flagged but never offered a delete command.
- A merged branch gets a safe `-d` recommendation; anything else gets both `-d` and a labeled `-D` fallback.
- Nothing is deleted by the script itself — only printed.

## Where it fits

```txt
ticket closed without a merged PR -> reap-ticket-branches (--ticket mode)
PR merged, remote branch deleted  -> pr-merged -> reap-ticket-branches (--branch mode, internal)
```

Two different triggers, one shared implementation for the actual branch/worktree discovery and classification underneath both.
