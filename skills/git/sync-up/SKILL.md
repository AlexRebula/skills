---
name: sync-up
description: Promote a chosen file list from your working repo into your target repo via a reviewed PR, gated by your own quality-gate command, a built-in privacy scan, and an optional banned-content check. Never merges. Use when the user says "sync up", "promote this to production", "open a promotion PR", or invokes /sync-up.
---

# Sync Up

Promotes files you choose from your working repo into your target repo, but only after every configured gate passes: your own quality-gate command, a built-in privacy/secret scan (always on, no configuration needed), and an optional banned-content check (only if you've set one up). A single failing gate blocks the promotion entirely and leaves the target repo untouched. On a full pass, this skill opens a normal PR into your target repo using your own already-authenticated `gh` session. **It never merges that PR.** Reviewing and merging stays your own call.

## Prerequisites

- An already-authenticated `git`/`gh` session (this skill and its sibling skills, `sync-status` and `sync-down`, ride on your existing session, so none of them ever need their own credentials).
- Node.js 23.6+ (or 22.18+), sufficient to run TypeScript files directly via Node's native type-stripping. No build step, no `ts-node`, no `tsx`.

## Disclaimer

> THIS TOOLING IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THE AUTHOR IS NOT LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM ANYTHING YOU SYNC, EXPOSE, OR LEAK THROUGH YOUR OWN CONFIGURATION OR USE OF THESE SKILLS.

This is shown in your terminal the first time you run any sync-core skill in a project (whichever of `sync-status`, `sync-down`, or `sync-up` you reach for first), the moment `.sync-config.json` is created. It matters especially here: the privacy scan and banned-content check are best-effort heuristics, not a guarantee. You are always the one responsible for what a promotion PR exposes.

## Usage

```
node skills/git/sync-up/cli.ts <file1> [file2 ...]
```

Run from the working repo you're promoting files out of, naming the files you've already chosen to promote (this skill doesn't pick files for you: that decision is always yours). On first run, with no `.sync-config.json` present, you'll be walked through the same interview `sync-status` and `sync-down` drive: the disclaimer, the two repo paths, and the quality-gate command. If you already ran either of the other two skills first, that config is reused as-is.

What happens on each run:

1. Runs your configured quality-gate command against the chosen files, staged in a throwaway copy of your target repo.
2. Runs the built-in privacy/secret scan against the chosen files in your working repo (emails, phone numbers, and common secret-key shapes like cloud access keys or PEM private key blocks; a documented allowlist covers placeholder addresses like `you@example.com` or `git@github.com`).
3. Runs your optional banned-content check, if you've set one up (see below). Skipped cleanly, not an error, if you haven't.
4. Only if all three pass: opens a PR into your target repo with the chosen files, via `gh`.

```
Promoting:
  from: ~/code/playground
  into: ~/code/production

Files: 1
  - src/new-component.ts

Quality gate: PASS
Privacy scan: CLEAN
Banned-content check: PASS

All gates passed. Promotion PR opened: https://github.com/your-org/your-repo/pull/42
Nothing merged: review and merge the PR yourself when ready.
```

On any failing gate, nothing is opened and the target repo is left completely untouched:

```
Quality gate: PASS
Privacy scan: FOUND 1 issue(s)
  - email in src/leaky.ts: jane.doe@example.io
Banned-content check: PASS

One or more gates failed. No PR opened, target repo left untouched.
```

**This skill never merges the PR it opens.** Reviewing and merging is always your own separate, manual step.

## Setting up your own banned-content check (optional)

The privacy scan above is generic and always on. The banned-content check is a second, optional layer for terms specific to your own project or organization, things a generic scanner could never know about (an internal codename, a client name, an unreleased product name). It's entirely opt-in: if you never set it up, it's simply skipped, no error, no nagging.

To set one up, create a file named `.banned-patterns.local` at your working repo's root, one pattern per line. Blank lines and lines starting with `#` are ignored:

```
# .banned-patterns.local
# One pattern per line. Comments (lines starting with #) and blank lines
# are ignored. This file is never committed: sync-up adds it to .gitignore
# for you the first time it finds one here.

internal-project-codename
Acme-Corp-Confidential
unreleased-feature-name
```

(The terms above are a worked example, not real banned terms: you always supply your own.) The next time you run `sync-up`, this file is picked up automatically and every pattern is checked against every file you're promoting.

## Notes

- Shares its config and quality-gate logic with `sync-status` and `sync-down` via `skills/_shared/sync-core/`, so fixing a bug there fixes it for all three.
- The privacy scan and banned-content check both run against your working repo's own copy of the files, not the staged copy: they're plain content checks, not something that needs your quality-gate command's toolchain.
- A promotion PR's commit and branch name are generic (`chore: promote N file(s) via sync-up`, `promote/sync-up-<timestamp>`): nothing project-specific is hardcoded.
