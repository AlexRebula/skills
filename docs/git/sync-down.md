## What it does

`sync-down` pulls incoming changes from your configured source repo into your working repo, but only after your own quality-gate command passes against them staged in a throwaway copy of your working tree. A failing gate leaves your working tree completely untouched. It never commits anything: landing the files is as far as it goes, and reviewing and committing what landed stays your own manual step.

It's the middle skill of a three-skill family: `sync-status` reports drift with no side effects, `sync-down` (this one) pulls incoming changes in behind a quality gate, and `sync-up` promotes your own changes back out behind a quality gate, a privacy scan, and a reviewed PR.

## When to reach for it

Ask for it with "sync down," "pull in the changes," or "pull production into my playground." Run it once `sync-status` has told you there's incoming drift worth pulling, or any time you want your working repo caught up with the source without risking an unreviewed or already-broken change landing in it.

## How the gate works

Every file that's new in the source repo, or changed relative to your working repo, gets staged into a full copy of your working repo (so dependencies like `node_modules` are already present), with the incoming changes overlaid on top. Your quality-gate command runs against that staged copy, never the real one. Only on a pass does `sync-down` copy the incoming files into your real working tree; the staged copy is discarded either way.

The gate command is a single string you configure once in `.sync-config.json` (shared with `sync-status`), not a hardcoded list of steps: it can be `npm run check`, `make ci`, a shell script, anything that exits non-zero on failure, for any language or toolchain.

## It's working if

- A passing gate lands every incoming file in your real working tree, and a failing gate changes nothing there at all.
- The gate always runs against a throwaway staged copy, never your real source or target trees.
- Nothing is ever committed by this skill, on either outcome.
- Running it with no incoming drift reports that clearly and skips the gate entirely (nothing to check).

## Where it fits

`sync-down` shares its config, diff, and quality-gate logic with `sync-status` and `sync-up` via `skills/_shared/sync-core/`, the same tested module underlying all three, so a fix there fixes it everywhere. Run `sync-status` first if you want to see what's incoming before deciding whether to pull it.
