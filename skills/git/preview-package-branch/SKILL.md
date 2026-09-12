---
name: preview-package-branch
description: Keep a live, running preview of a local package/library's feature branch inside a consumer app via yalc, refreshed after every commit, with a full dev-server restart rather than relying on hot-reload. Use the moment work starts on such a branch, and re-run the sync yourself after each commit, never wait to be asked. Config-driven — the package repo, consumer worktree, sync script name, and port are never hardcoded, so this applies to any package/consumer pair, not one specific project. Only applies where the package repo already defines the configured sync script.
---

# Preview a package branch inside its consumer app

Storybook (or an equivalent isolated-component viewer) shows a changed component on its own. This shows the same change running inside a real consumer app, the only way to catch an integration problem while it still belongs to the PR that caused it, instead of a new ticket opened after merge.

This is deliberately narrow: one package, one consumer, one preview at a time, no CI involvement. It assumes the package repo already has a script that builds the package, publishes it to the local yalc store, links it into the consumer, and restarts the consumer's dev server — this skill documents when and how to run that script, it doesn't implement it. Check the package repo's `package.json` for the script named in your config (see below) before assuming this skill applies; if no such script exists yet, building one is a separate, per-project engineering task.

## Config

Reads `.preview-sync-config.json` from the package repo's root (gitignored, never committed — same convention as this repo's `canary-publish`/`sync-up`/`sync-down` skills' own config files). If it's missing, ask once before doing anything else:

1. **Consumer worktree path** — the dedicated, persistent worktree of the consumer app that this skill refreshes. If it doesn't exist yet, create it first (see One-time setup below), then record its path here.
2. **Sync script** — the name of the npm script in the package repo that performs the build → publish → link → restart sequence. Never assume a name; ask, or read `package.json` to confirm it exists.
3. **Port** — optional; omit if the script picks one on its own.

Write the answers to `.preview-sync-config.json` and add it to `.gitignore` if not already there. On every later run, load it silently, never re-interview once it exists.

```json
{
  "consumerWorktreePath": "/absolute/path/to/the/consumer-app-worktrees/preview/live",
  "syncScript": "preview:sync",
  "port": 4100
}
```

## When this applies

You are working in a package/library repo's own checkout (not its consumer) on a feature branch (not the default branch) that will become a PR, and that repo already defines the npm script named in `syncScript`.

- **The moment you create or check out that branch**: run the one-time setup below if the dedicated preview worktree doesn't exist yet, then run a sync so the preview reflects the branch from its first commit.
- **After every commit you make on that branch**: run the sync again immediately, unprompted. The repo owner should never have to ask "is the preview updated"; it already is by the time they look.
- **Switching which branch is under review**: just check out the new branch in the package repo and run the sync again. The consumer worktree itself never changes branch, only the yalc-linked build inside it does.

If the change is docs-only, CI-only, or otherwise has no runtime effect on the consumer, use judgment: a sync that rebuilds and restarts a dev server for a `.md` change is wasted motion. When in doubt, sync anyway, since it's cheap.

## One-time setup: the dedicated preview worktree

Only needed the first time, if the consumer app has no dedicated preview worktree yet. Create it once, next to the consumer app's own checkout, and reuse it forever: never tear it down and recreate it per PR.

```bash
mkdir -p <consumer-app-parent-dir>/<consumer-app>-worktrees/preview
cd <consumer-app-parent-dir>/<consumer-app>
git worktree add -b preview/live \
  <consumer-app-parent-dir>/<consumer-app>-worktrees/preview/live \
  origin/main
```

This worktree stays on its own local `preview/live` branch (never pushed, never merged), precisely because the consumer app's default branch is already checked out in its primary worktree: git refuses to check out the same branch twice. The consumer side of the preview never needs to track a real feature branch of its own, since only the package build inside it changes between syncs, via yalc.

Don't run `npm install` yourself here; a well-built sync script does it automatically on first run.

## Refreshing the preview: run this after every commit

```bash
npm run <syncScript> -- <consumerWorktreePath from config> [--port <port>]
```

Run from the package repo. A well-built sync script builds the package, `yalc publish`es it, installs the consumer's dependencies on first run only, `yalc add`s the fresh build into the worktree, clears the consumer's build cache (a live dev server plus a swapped-out `node_modules` package is a known corruption risk, so clearing it every time is safer than relying on the bundler noticing), and does a full stop-and-restart of the consumer's dev server, never a hot-reload.

The preview is then live at `http://localhost:<port>`.

## Why `yalc publish`, not `yalc push`

`yalc push` looks like the obvious choice: it publishes and pushes to every consumer that's ever yalc-added the package. That's exactly the problem. On a shared development machine, "every consumer" can include unrelated repos that happened to yalc-add this same package in a past session. This was caught during development, the hard way: a test run of an earlier sync script silently rewrote vendored yalc snapshots in unrelated repos. `yalc publish` only touches the local store; the sync script should do its own explicit `yalc add` into just the one worktree it targets.

## Reading the result

- **Exit code 0**: the script printed a ready message with the preview URL and actually confirmed the server answers requests. Tell the repo owner the preview is updated and where.
- **Non-zero exit before the dev-server restart** (a bad build, a failed yalc step, a failed install): the previously-working preview was never touched, so it's still running exactly as before. Report the failure verbatim and say the _old_ preview is still what's live.
- **Non-zero exit during the dev-server restart itself** (the new server never becomes healthy): the old server has already been stopped and the new one failed too, so nothing is running until the next successful sync. Never say a preview is up in this case.
- Either way: report the failure exactly as printed, and don't silently retry in a way that could mask a real break.

## Out of scope (by design, not an oversight)

- No canary publish, no GitHub Actions involvement, no registry of any kind in this path. That's what the package repo's own CI/canary-publish workflow is for, separately, on merge — see [canary-publish](../canary-publish/SKILL.md).
- No parallel previews: one worktree, one port, one branch under review at a time.
- No orchestration script of its own. If the package repo doesn't yet have a script matching this shape, write one for that project — this skill only covers when/how to run it once it exists.
