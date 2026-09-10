---
name: canary-publish
description: Publish a giselle-mui-poc canary snapshot to GitHub Packages and bump a consuming app (default alexrebula-portfolio-poc) onto it, verifying the app still resolves cleanly. Use when the user says "publish a canary", "bump the canary", "update the giselle-mui canary", asks to see recent giselle-mui-poc work live in a consumer app, or invokes /canary-publish. Also use when a consumer's typecheck/build fails on missing exports from `@littlebranches/giselle-mui` — that's the signature of a stale pinned canary.
---

# Canary Publish

Two phases: **publish** a fresh canary from `giselle-mui-poc`, then **bump** a consumer onto it. `Canary Publish` (the GitHub Actions workflow) normally does the publish phase automatically on every merge to `giselle-mui-poc`'s `main` — check its state first, since that decides whether you run the publish phase by hand at all.

## Arguments

`/canary-publish [consumer-path]`: full flow — publish, then bump. `consumer-path` defaults to `alexrebula-portfolio-poc`'s primary checkout.
`/canary-publish --bump-only [consumer-path]`: skip the publish phase — just bump the consumer onto whatever canary is already live.
`/canary-publish --publish-only`: publish a fresh canary, skip bumping any consumer.

## Phase 1: Publish

Check first: `gh workflow list --repo LittleBranches/giselle-mui-poc --all` — if `Canary Publish` shows `active`, a merge to `main` already published one; skip straight to the version check at the end of this phase. Only run the commands below if it's `disabled_manually` (the current state, kept off to conserve Actions minutes).

```bash
cd /Users/alex/work/projects/ar/giselle-mui-poc
git pull
npm ci
npm run check:verify
```

**Gotcha, real one**: `check:verify`'s banned-content step also scans against `.banned-patterns.local` if present — a gitignored, machine-local file, stricter than what real CI enforces (CI never has this file). If it fails on a term like a vendor name inside a migration/copyright-tracking doc, that's the local file being stricter than upstream, not a real gate failure. Confirm by moving it aside, re-running, and putting it straight back:
```bash
mv .banned-patterns.local /tmp/canary-publish-banned-patterns.bak
npm run check:verify
mv /tmp/canary-publish-banned-patterns.bak .banned-patterns.local
```
A genuine failure (present even with the file moved aside) blocks the publish — fix it before continuing, never route around it.

```bash
node scripts/ensure-canary-changeset/ensure-canary-changeset.ts   # only if the merged PR(s) added no changeset of their own
npx changeset version --snapshot canary
```

Publishing needs a token in `NODE_AUTH_TOKEN` with both `read:packages` and `write:packages` scope, SSO-authorized for `LittleBranches` if the org enforces it (classic PAT, at github.com/settings/tokens — a fine-grained token has had unreliable GitHub Packages support and needs org-owner approval for org-owned resources, so prefer classic). Store it in `~/.npmrc` (global, outside every repo, never gitignore-relevant):
```
//npm.pkg.github.com/:_authToken=<token>
```
The project's own `.npmrc` reads `${NODE_AUTH_TOKEN}` at publish time and **overrides** the user-level file for that key — export it before publishing, don't rely on `~/.npmrc` alone:
```bash
export NODE_AUTH_TOKEN=$(grep _authToken ~/.npmrc | sed 's/.*_authToken=//')
npx changeset publish --tag canary
```

**You just ran a CI step on a real, permanent checkout, not a throwaway runner — undo the side effects it would never leave behind:**
```bash
git tag -d $(git tag --points-at HEAD)     # changeset publish tags the commit it published from
git checkout -- package.json
rm -f CHANGELOG.md
git status --short                          # only .changeset/<new-entry>.md should remain untracked-and-gone —
                                             # NEVER delete .changeset/README.md, that one's permanent
```

Completion: `git status --short` on `giselle-mui-poc` shows clean, and:
```bash
curl -s -H "Authorization: Bearer $NODE_AUTH_TOKEN" "https://npm.pkg.github.com/@littlebranches%2fgiselle-mui" | python3 -c "import json,sys; print(json.load(sys.stdin)['dist-tags'])"
```
shows a `canary` version newer than what the consumer currently pins.

## Phase 2: Bump the consumer

```bash
cd <consumer-path>          # e.g. the alexrebula-portfolio-poc checkout/worktree in play
# edit package.json: "@littlebranches/giselle-mui" -> the version from the dist-tags check above
export NODE_AUTH_TOKEN=$(grep _authToken ~/.npmrc | sed 's/.*_authToken=//')
npm install
rm -rf .next   # stale Next.js route-type cache references the old build; clear it before typechecking
npm run typecheck && npm run lint && npm run test && npm run build
```

Completion: all four green. Then:
```bash
git add package.json package-lock.json
git commit -m "chore(deps): bump giselle-mui canary to <version>"
git push
```

Never mark this done on a red typecheck/lint/test/build — a stale canary missing exports is exactly what a red typecheck looks like, and it means the version you bumped to genuinely doesn't have what the consumer needs yet.
