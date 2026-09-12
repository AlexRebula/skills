## What it does

`preview-package-branch` keeps a real, running preview of a package/library's feature branch live inside its consumer app (the actual consumer app, not an isolated component viewer like Storybook), refreshed after every commit. It builds the package, publishes it to the local yalc store, links it into a dedicated preview worktree, and does a full stop-and-restart of that worktree's dev server so the change is visible before the branch ever merges.

Nothing about it is hardcoded to one project. The first run bootstraps a `.preview-sync-config.json` at the package repo's root — same convention as this repo's `canary-publish`/`sync-up`/`sync-down` skills' own config files — asking for the consumer's dedicated preview worktree path, the name of the sync script in the package repo, and an optional port. It exists because the isolated-component view only shows a change in a vacuum. The only way to see a change's real, integrated effect used to be merging the PR, publishing a canary, and bumping the consumer, by which point a problem found belongs to a new ticket, not the PR that caused it.

This only applies to a package/consumer pair that's actually had the underlying sync script wired up in the package repo. Check its `package.json` for the script named in your config before assuming this skill is relevant — building that script is a separate, per-project task, not something this skill does.

## When to reach for it

| Your situation | Where to go |
| --- | --- |
| You're implementing on a feature branch in a package repo that has its configured sync script, and just made the first or a later commit | `preview-package-branch`, run the sync yourself, unprompted |
| You want to check a component in isolation before it's ready for the consumer app | Storybook or your project's own isolated-component viewer |
| The branch is ready and its PR just merged | Nothing further here; the package's own CI/canary-publish workflow takes over from there |
| You need to bump a consumer onto an already-published canary version | [canary-publish](./canary-publish.md) |

## Prerequisites

- `yalc` installed globally (`npm install -g yalc`).
- A `.preview-sync-config.json` in the package repo's root (gitignored, interviewed for once if missing), holding the consumer app's dedicated preview worktree path and the sync script's name.
- That preview worktree already exists, on its own local branch never pushed or merged, created once and reused indefinitely. `SKILL.md` has the exact `git worktree add` command.

## The one command that matters

Run from the package repo: `npm run <syncScript> -- <consumerWorktreePath from config> [--port <port>]`.

A well-built sync script runs these steps in order, every one of them fatal on failure: build the package, publish it to the local yalc store, install the consumer's dependencies (first run only), link the fresh build into the worktree, clear the consumer's build cache, and restart the consumer's dev server for real, never a hot-reload.

## Why `yalc publish`, not `yalc push`

`yalc push` looks like the obvious choice: it publishes and pushes to every consumer that's ever yalc-added the package. That's exactly the problem. On a shared development machine, "every consumer" can include unrelated repos that happened to yalc-add this same package in a past session. This was caught during development, the hard way: a test run of an earlier sync script silently rewrote vendored yalc snapshots in unrelated repos. `yalc publish` only touches the local store; the sync script should do its own explicit `yalc add` into just the one worktree it targets.

## What "failure is loud" actually guarantees

A broken build, a failed yalc step, or a failed install all happen before the dev-server restart, so they never touch a currently-running preview: the last-known-good preview stays up, and the failure is reported clearly. A failure during the restart itself (the new server never becomes healthy) is different: the old server has already been stopped by that point, so nothing is running until the next successful sync. Both cases should produce a non-zero exit with a clear error; neither should ever report success without having confirmed it.

## It's working if

- You run the sync yourself immediately after every commit on the branch under review; the repo owner should never have to ask whether the preview is current.
- A successful run ends with a ready message naming the preview URL, and that URL actually answers requests.
- Switching which branch you're reviewing is just checking out the new branch in the package repo and re-running the sync; the consumer worktree's own branch never changes.
- No GitHub Actions, package registry, or canary version was touched by any of this.

## Where it fits

This is a local, pre-merge-only tool. It has no relationship to the package's own CI/canary-publish workflow beyond both belonging to the same overall dev-workflow toolchain. Once a branch merges, this skill's job is done; [canary-publish](./canary-publish.md) is what carries a component forward from there.
