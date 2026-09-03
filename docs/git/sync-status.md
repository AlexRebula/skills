## What it does

`sync-status` reports drift between two repos you've paired up: files added, removed, or changed on either side, without touching either one. It's the read-only member of a three-skill family: `sync-status` reports, [sync-down](./sync-down.md) pulls incoming changes in behind a quality gate, and `sync-up` promotes your own changes back out behind a quality gate, a privacy scan, and a reviewed PR. (`sync-up` is tracked as follow-on work and doesn't exist in this repo yet.)

The typical pairing this exists for is an isolated playground repo and its production counterpart: somewhere you can experiment freely, with a way to see what's drifted in either direction before deciding what to do about it.

## When to reach for it

Ask for it with "sync status," "what's drifted," or "check sync drift." Run it any time you want to know whether your playground has fallen behind production, or whether you've built something in the playground worth promoting out, before running either of the skills that actually move files.

## First run bootstraps your config

The first time you run any of the three sync-core skills in a project, there's no `.sync-config.json` yet, so `sync-status` shows the disclaimer (an MIT-style AS-IS/NO-WARRANTY notice, stating the author isn't responsible for anything you leak through your own configuration) and asks for the two repo paths, plus the quality-gate command `sync-down` and `sync-up` will later run (asked upfront so you only answer it once across all three skills, even though `sync-status` itself never runs it). That answer is written to `.sync-config.json` at your project's root, and a `.gitignore` entry is added for it in the same step, since it holds paths and settings that are yours alone.

Every run after that reuses the existing config as-is. Nothing is re-prompted, and nothing is overwritten: deleting the file is the only way to redo the interview. (A config created before the gate command existed gets it backfilled with one extra prompt, without touching the repo paths you already answered.)

## The diff is real, not git-based

Drift is computed by walking both directory trees directly and comparing file contents byte-for-byte; no shared git history is assumed or required between the two repos. `node_modules`, `.git`, `dist`, `build`, `coverage`, `.turbo`, `.next`, and `.cache` are ignored by default.

## It's working if

- Running it in a fresh project walks you through the disclaimer and the full interview exactly once, and never again after `.sync-config.json` exists.
- `.sync-config.json` never appears in `git status` as trackable: it's gitignored from the moment it's created.
- The report names every added, removed, and changed file by path, and states a total drift count.
- Neither configured repo has a single byte changed by running this skill.

## Where it fits

`sync-status` shares its config-bootstrap and directory-diff logic with `sync-down` and `sync-up` via `skills/_shared/sync-core/`, the same tested module underlying all three, so a fix there fixes it everywhere. Run it before either of the other two, so you know what you're about to pull or promote before you gate it through a quality check.
