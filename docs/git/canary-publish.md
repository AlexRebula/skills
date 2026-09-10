## What it does

`canary-publish` runs the two-phase flow for getting recent work in a source package repo actually visible in a consumer app: **publish** a Changesets snapshot/canary release from the source repo to its registry, then **bump** a named consumer onto that version and verify it still resolves cleanly (install, typecheck, lint, test, build — whatever the consumer's own verify command covers).

Nothing about it is hardcoded to one repo pair. The first run bootstraps a `.canary-publish-config.json` at the source repo's root — same convention as this repo's own `sync-core` skills' `.sync-config.json` — asking for the source repo, one or more named consumer paths, the source's quality-gate command, and the consumer's verify command. The package name and registry are never asked for: those come straight from the source repo's own `package.json`, since restating an environment fact in config would just be a second place for it to go stale.

## When to reach for it

Say something like "publish a canary" or "bump the canary" — the skill's own description is written to match. `/canary-publish [consumer-name]` also works explicitly, with `--bump-only` or `--publish-only` when only one half of the flow is needed (the common case for `--bump-only`: the source repo's CI already auto-publishes on merge, so only the consumer side needs doing by hand).

It also fires on its own recognition of a specific symptom: a consumer's typecheck or build failing on missing exports from a package that has a canary/snapshot channel. That's what a stale pinned version looks like from the outside — the fix is exactly this skill's Phase 2, possibly preceded by Phase 1 if nothing newer has been published yet either.

## Check CI first

Most Changesets-based canary setups publish automatically via CI on every merge to the source repo's main branch. Before running Phase 1's commands by hand, check whether that automation is actually active — if it is, a merge already published a canary, and the skill only needs to run its version check and Phase 2. Only run the manual publish commands if the automation is off (a frozen CI budget being the most common reason) or doesn't exist yet.

## Common questions

**Why does this need a config file instead of just asking for the repo paths every time?**

Because the repo pair doesn't change from one canary bump to the next — asking every single time would be pure repetition. The interview happens once; every later invocation loads the config silently.

**What if I ran the publish commands by hand on a real checkout, not a CI runner?**

That's the expected case whenever CI's automation is off. The skill's own steps include cleaning up exactly what a throwaway CI runner would never leave behind: the git tag `changeset publish` creates, the version bump to `package.json`, and the generated `CHANGELOG.md`.

**What if my quality gate includes a check that isn't part of real CI (a local-only safety net)?**

That's a real gotcha this skill documents explicitly: a local-only check can be stricter than what upstream actually enforces, and a failure there can look identical to a genuine gate failure. Confirm which one it is before treating it as blocking — move the local-only file aside, re-run, and restore it immediately either way.

## It's working if

- The config bootstrap only runs once per source repo — every later invocation loads it silently.
- The published canary's `dist-tags` show a version newer than what the consumer currently pins, before Phase 2 starts.
- The consumer's verify command exits clean after the bump — never marked done on a red run, since that's exactly what a still-stale version looks like.
- Running `--bump-only` or `--publish-only` skips the other phase entirely, rather than doing both regardless of the flag.

## Where it fits

```txt
(merge to source repo's main) -> Canary Publish CI (if active) -> canary-publish --bump-only
                                                 or
(CI off) -> canary-publish (full flow: publish + bump)
```

Either way, the consumer app ends up pinned to a real, installable version that actually contains the work you just want to see live.
