---
name: sync-down
description: Pull incoming changes from your configured source repo into your working repo, gated by your own quality-gate command. Never commits. Use when the user says "sync down", "pull in the changes", "pull production into my playground", or invokes /sync-down.
---

# Sync Down

Pulls files that exist only in your source repo, or differ from it, into your working repo, but only after your own quality-gate command passes against them. A failing gate leaves your working tree completely untouched. This skill never commits anything: landing the files in your working tree is as far as it goes.

## Prerequisites

- An already-authenticated `git`/`gh` session (this skill and its sibling skills, `sync-status` and `sync-up`, ride on your existing session, so none of them ever need their own credentials).
- Node.js 23.6+ (or 22.18+), sufficient to run TypeScript files directly via Node's native type-stripping. No build step, no `ts-node`, no `tsx`.

## Disclaimer

> THIS TOOLING IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THE AUTHOR IS NOT LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM ANYTHING YOU SYNC, EXPOSE, OR LEAK THROUGH YOUR OWN CONFIGURATION OR USE OF THESE SKILLS.

This is shown in your terminal the first time you run any sync-core skill in a project (whichever of `sync-status`, `sync-down`, or `sync-up` you reach for first), the moment `.sync-config.json` is created.

## Usage

```
node skills/git/sync-down/cli.ts
```

Run from the project you want to pull changes into (or pass its path as an argument). On first run, with no `.sync-config.json` present, you'll be walked through the same interview `sync-status` drives: the disclaimer, the two repo paths, and the quality-gate command to run before landing anything (e.g. `npm run check`). If you already ran `sync-status` first, that config is reused as-is, no re-prompting.

What happens on each run:

1. Diffs your two configured repos (same logic as `sync-status`).
2. Stages every file that's new in the source repo, or changed relative to the target, into a throwaway copy of your target repo.
3. Runs your configured quality-gate command against that staged copy.
4. On a pass, copies those files into your real working tree. On a failure, changes nothing at all.

```
Down-syncing:
  from: ~/code/production
  into: ~/code/playground

Incoming: 2
  - src/new-component.ts
  - src/shared.ts

Quality gate passed. Applied 2 file(s) to the working tree.
Nothing committed: review with `git status`/`git diff` and commit yourself when ready.
```

On a failing gate:

```
Incoming: 1
  - src/broken.ts

Quality gate FAILED. Working tree left untouched.
<your gate command's output>
```

**This skill never commits.** Committing what landed is always your own separate, manual step, whatever your gate result.

## Notes

- Shares its config, diff, and quality-gate logic with `sync-status` and `sync-up` via `skills/_shared/sync-core/`, so fixing a bug there fixes it for all three.
- The quality-gate command is a single string you configure once, not a hardcoded list of steps: it can be `npm run check`, `make ci`, a shell script, anything that exits non-zero on failure, for any language or toolchain.
- The staged copy the gate command runs against is a full copy of your target repo (so dependencies like `node_modules` are already present), not just the incoming files in isolation; your gate command sees the working tree it would actually run against, plus the incoming changes overlaid on top.
