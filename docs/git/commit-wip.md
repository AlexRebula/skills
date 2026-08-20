## What it does

`commit-wip` scans every dirty repo in your workspace, groups the uncommitted files by topic (a component, docs, config, scripts, or an unclassifiable pile it calls `wip`), and commits each group to the branch it actually belongs on. It checks remote branches first: if an existing branch's name matches the topic (a keyword match, or today's dated WIP branch), the commit goes there. A brand new categorised branch only gets created when nothing on the remote fits.

The point is not just committing. It is committing to the *right* place. A group that clearly continues work on `feature/stat-card-tdd` should land there, not on a fresh throwaway branch that fragments the history.

## When to reach for it

Run it at the start of a session, when switching branches or repos mid-session, or right before any command that reads the working tree (a quality gate, a CI run). Anywhere uncommitted work is at risk of being lost or read against the wrong branch.

`/commit-wip <path>` scopes the scan to a single repo. Omit the argument to scan every repo in the workspace.

## How grouping and branch matching work

Files are assigned to a topic group by path pattern; a `src/components/stat-card/` file becomes `component:stat-card`, a root `*.md` becomes `docs`, config files become `chore:config`, and anything that will not separate cleanly becomes `wip`. Test and story files merge into their component's group rather than forming their own.

Each group is then matched against the remote branch list, in priority order: a keyword match against an existing branch name, then today's dated `chore/YYYYMMDD*` branch, then no match at all. Every decision is printed before any file is touched, for example:

```
[my-app]   component:stat-card  ->  feature/stat-card-tdd  (existing remote - keyword match)
[my-lib]   docs                 ->  no match -> will create docs/session-wrap-model-tracking
```

If matching a group would mean switching away from a branch that has its own unstaged work, the skill treats it as no-match instead of discarding that work.

## Common questions

**Why does it prefer an existing branch over creating a new one?**

Because a new branch per session fragments related work across a dozen tiny branches that all say the same thing in different words. If a remote branch already carries the topic, the commit belongs there.

**Does it run tests or lint before committing?**

No. It only stages and commits; it makes no claim that the result is in a passing state. The goal here is not losing work, not correctness. Run your quality gate separately before opening a PR.

**What happens if a push fails?**

The commit still happens locally, and the failure is flagged in the summary table rather than aborting the rest of the groups or repos.

## It's working if

- Every dirty file lands in exactly one topic group, and the group's branch decision is shown to you before anything is staged.
- A file that clearly continues existing work on a remote branch lands there, not on a new one.
- A failed push does not stop the sweep from continuing to the next group or repo.
- The final summary table accounts for every dirty repo, including ones that were already clean.

## Where it fits

`commit-wip` sits between discovery and PR creation:

```txt
repo-status -> commit-wip -> create-pr
```

It reads its repo list from [repo-status](./repo-status.md) (or scans on its own when given a path), and its commits are the raw material [create-pr](./create-pr.md) turns into a pull request. Where [wip-sweep](./wip-sweep.md) asks for confirmation at every tier and can push and draft a PR, `commit-wip` is the leaner version: it only ever commits, and it prefers an existing branch over a new one whenever it reasonably can.
