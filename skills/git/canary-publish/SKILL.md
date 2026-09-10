---
name: canary-publish
description: Publish a Changesets snapshot/canary release from a source package repo to its registry, then bump a named consumer app onto it and verify it still resolves cleanly. Use when the user says "publish a canary", "bump the canary", "update the canary version", asks to see recent work from a package repo live in a consumer app, or invokes /canary-publish. Also use when a consumer's typecheck/build fails on missing exports from a package that has a canary/snapshot release channel — that's the signature of a stale pinned version.
---

# Canary Publish

Two phases: **publish** a fresh canary from the source package repo, then **bump** a consumer onto it. Most Changesets-based canary setups publish automatically on every merge via CI — check that first, since it decides whether you run the publish phase by hand at all.

## Config

Reads `.canary-publish-config.json` from the source repo's root (gitignored, never committed — same convention as this repo's `sync-core` skills' `.sync-config.json`). If it's missing, run a short interview before doing anything else:

1. **Source repo path** — the package repo whose `main` gets published as a canary. Read its `package.json` for the package `name` and `publishConfig.registry`/`access` directly; never ask for these, they're already in the environment.
2. **Consumers** — one or more `{ name, path }` pairs: apps that pin this package's canary and need bumping. Ask for at least a `default`.
3. **Source quality-gate command** — the command that must pass before publishing (e.g. `npm run check:verify`). Package-script names vary per project; don't assume one.
4. **Consumer verify command** — the command(s), run in a consumer after bumping, that decide whether the bump actually worked (e.g. `npm run typecheck && npm run lint && npm run test && npm run build`).

Write the answers to `.canary-publish-config.json` and add it to `.gitignore` if not already there. On every later run, load it silently — never re-interview once it exists.

```json
{
  "sourceRepo": "/absolute/path/to/source-repo",
  "consumers": { "default": "/absolute/path/to/consumer-repo" },
  "qualityGateCommand": "npm run check:verify",
  "consumerVerifyCommand": "npm run typecheck && npm run lint && npm run test && npm run build"
}
```

## Arguments

`/canary-publish [consumer-name]`: full flow — publish, then bump. `consumer-name` looks up a path in the config's `consumers` map, defaulting to `default`.
`/canary-publish --bump-only [consumer-name]`: skip the publish phase — just bump the named consumer onto whatever canary is already live.
`/canary-publish --publish-only`: publish a fresh canary, skip bumping any consumer.

## Phase 1: Publish

Check the source repo's CI first (e.g. `gh workflow list --repo <owner>/<source-repo> --all`) — if its canary-publish workflow shows active, a merge to `main` already published one; skip straight to the version check at the end of this phase. Only run the commands below if it's disabled or doesn't exist.

```bash
cd <sourceRepo>
git pull
npm ci
<qualityGateCommand>
```

**Gotcha to check for, not assume away**: if the quality gate includes any local-only safety check (gitignored, not part of the repo's real CI — e.g. a personal banned-terms list), a failure there can be that check being stricter than what CI actually enforces, not a real gate failure. Confirm by moving the local-only file aside, re-running the gate, and restoring it immediately after — never leave it moved, and never treat a genuine failure (one that persists with the file moved aside) as anything but a real blocker.

```bash
npx changeset add            # only if no changeset is already pending for the merged work —
                              # check the source repo's own tooling first: some repos script this
                              # step (e.g. an "ensure a changeset exists" helper) to keep every
                              # canary installable even for changeset-less merges
npx changeset version --snapshot canary
```

Publishing needs a token in `NODE_AUTH_TOKEN` with both read and write package-registry scope (GitHub Packages: `read:packages` + `write:packages`; classic PATs have more reliable registry support than fine-grained ones, which also need org-owner approval for org-owned resources). Store it in the user-level `~/.npmrc` (global, outside every repo):
```
//<registry-host>/:_authToken=<token>
```
**Check whether the source repo's own project-level `.npmrc` overrides this** — a line like `//<registry-host>/:_authToken=${NODE_AUTH_TOKEN}` there beats the user-level file for that key, so export the token into the shell instead of relying on `~/.npmrc` alone:
```bash
export NODE_AUTH_TOKEN=$(grep _authToken ~/.npmrc | sed 's/.*_authToken=//')
npx changeset publish --tag canary
```

**You just ran a CI step on a real, permanent checkout, not a throwaway runner — undo the side effects it would never leave behind:**
```bash
git tag -d $(git tag --points-at HEAD)     # changeset publish tags the commit it published from
git checkout -- package.json
rm -f CHANGELOG.md
git status --short   # only the new changeset entry under .changeset/ should be gone —
                      # NEVER delete .changeset/README.md, that one's permanent
```

Completion: `git status --short` on the source repo shows clean, and the registry's `dist-tags` for the package show a `canary` (or equivalent) version newer than what the target consumer currently pins.

## Phase 2: Bump the consumer

```bash
cd <consumers[consumer-name]>
# edit package.json: the package's dependency line -> the new version from Phase 1
export NODE_AUTH_TOKEN=$(grep _authToken ~/.npmrc | sed 's/.*_authToken=//')
npm install
rm -rf .next    # or the consumer's own framework build-cache dir, if its typecheck reads stale
                # generated types referencing a since-moved/renamed source path
<consumerVerifyCommand>
```

Completion: the whole verify command exits clean. Then:
```bash
git add package.json package-lock.json
git commit -m "chore(deps): bump <package> canary to <version>"
git push
```

Never mark this done on a red verify command — a stale canary missing exports is exactly what that looks like, and it means the version you bumped to genuinely doesn't have what the consumer needs yet.
