---
name: sync-status
description: Report drift between two repos you've configured as a synced pair (e.g. an isolated playground and its production counterpart), with no side effects. Use when the user says "sync status", "what's drifted", "check sync drift", or invokes /sync-status.
---

# Sync Status

Reports which files differ between two repos you've paired up: additions, removals, and content changes in either direction. Read-only: this skill never writes to either repo.

## Prerequisites

- An already-authenticated `git`/`gh` session (this skill and its sibling skills, `sync-down` and `sync-up`, ride on your existing session, so none of them ever need their own credentials).
- Node.js 23.6+ (or 22.18+), sufficient to run TypeScript files directly via Node's native type-stripping. No build step, no `ts-node`, no `tsx`.

## Disclaimer

> THIS TOOLING IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THE AUTHOR IS NOT LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM ANYTHING YOU SYNC, EXPOSE, OR LEAK THROUGH YOUR OWN CONFIGURATION OR USE OF THESE SKILLS.

This is shown in your terminal the first time you run any sync-core skill in a project (whichever of `sync-status`, `sync-down`, or `sync-up` you reach for first), the moment `.sync-config.json` is created.

## Usage

```
node skills/git/sync-status/cli.ts
```

Run from the project you want to track drift for (or pass its path as an argument). On first run, with no `.sync-config.json` present, you'll be walked through:

1. The disclaimer above.
2. A prompt for the path to your first repo (e.g. your playground).
3. A prompt for the path to your second repo (e.g. production).
4. A prompt for the quality-gate command `sync-down` and `sync-up` will run before landing anything (e.g. `npm run check`). `sync-status` itself never runs this command, but the interview asks for it upfront so you only answer it once across all three skills.

This writes `.sync-config.json` at your project's root and adds it to `.gitignore`, since it's never meant to be committed: it holds your own local repo paths and gate command. On every later run, the existing config is reused as-is; nothing is prompted or overwritten. (If you already have a `.sync-config.json` from before the quality-gate command was added, `sync-status` will prompt just for that one missing field, without touching your existing repo paths.)

Once configured, the skill prints a report like:

```
Comparing:
  A: ~/code/playground
  B: ~/code/production

Only in A (missing from B): 1
  - src/only-a.ts

Only in B (new in B, not in A): 0

Changed (present in both, content differs): 1
  ~ src/shared.ts

Total drift: 2 file(s). Report only, nothing applied.
```

Nothing is ever applied by this skill, since it only reports. To act on drift, use `sync-down` (pull incoming changes from repo A into repo B, gated by your own quality check) or `sync-up` (promote your own changes from repo B into repo A via a reviewed PR).

## Notes

- Default ignore patterns (`node_modules`, `.git`, `dist`, `build`, `coverage`, `.turbo`, `.next`, `.cache`) are applied automatically; the underlying `diffTrees` function in `skills/_shared/sync-core/diff.ts` accepts an extended ignore list for callers that need one.
- This skill shares its config and diff logic with `sync-down` and `sync-up` via `skills/_shared/sync-core/`, so fixing a bug there fixes it for all three.
