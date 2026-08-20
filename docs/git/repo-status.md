## What it does

`repo-status` finds every git repo in your workspace and prints a single dirty state table: repo, branch, dirty file count, clean or uncommitted. It does not touch anything. Its whole job is to answer one question before any other git skill runs: which repos actually need attention right now.

Repo paths are never hardcoded. It pulls candidates from your workspace context first, falls back to scanning `dependency-chain.md` for path references, and only asks you directly if fewer than two repos turn up from either source. Every candidate is verified as a real git repo before it lands in the table; anything that is not gets discarded quietly.

## When to reach for it

Run it before [wip-sweep](./wip-sweep.md) or before writing a morning brief. It is the discovery step the other git skills assume already happened.

| Your situation | Where to go |
| --- | --- |
| You want to know what is dirty across your whole workspace | `repo-status` |
| A repo you expect to see is missing from the table | Check `dependency-chain.md` for the path, or answer the fallback prompt with the correct root directory |
| You already know which repos are dirty and just want them committed | Skip straight to [wip-sweep](./wip-sweep.md) or [commit-wip](./commit-wip.md) |

## Missing repos are never skipped silently

If an expected repo cannot be located on disk, it is logged explicitly with its last known path, and after all candidates are checked, the full list of missing repos is presented for you to correct or explicitly exclude. Nothing gets dropped from the table without you seeing it happen.

## Common questions

**Why doesn't it just hardcode my repo paths?**

Because the set of repos in a workspace changes over time, and a hardcoded list silently goes stale, giving you false confidence that the workspace is clean when a repo just is not in the list anymore. Reading from workspace context and `dependency-chain.md` keeps the list live.

**What counts as "clean"?**

Zero files in `git status --porcelain` output. Anything else, however small, is reported as uncommitted with its dirty file count.

## It's working if

- The table covers every repo you actually have open, not just the ones you remembered to mention.
- A repo missing from disk is reported by name with its last known path, never dropped without a trace.
- Every row's dirty count matches what `git status` would show you directly.

## Where it fits

`repo-status` is the discovery step at the front of the git housekeeping flow:

```txt
repo-status -> wip-sweep -> commit-wip -> create-pr
```

Its output feeds directly into [wip-sweep](./wip-sweep.md), which turns the dirty state table into grouped snapshot commits, and into [commit-wip](./commit-wip.md), which routes those same dirty files onto the branch each group actually belongs on. Run it first whenever you are not sure what state your workspace is in.
