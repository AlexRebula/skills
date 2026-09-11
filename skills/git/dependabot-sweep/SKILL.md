---
name: dependabot-sweep
description: Sweep every open Dependabot PR in a repo, classify each by real risk (dependency type — dev-only vs shipped to consumers — × semver bump size, not semver alone), batch the low-risk ones into one combined PR tested with a single quality-gate run, and leave high-risk ones open with a one-time explanatory comment. Use when asked to "clean up dependabot PRs", "sweep dependency updates", "batch dependabot PRs", or when a repo has several open Dependabot PRs piling up.
---

# Dependabot Sweep

Turns a pile of individual Dependabot PRs into: one combined PR for everything genuinely safe to
batch, and a small number of untouched originals — each carrying a comment explaining exactly why
it wasn't included. Never batches by semver label alone: a major bump to a dev-only tool and a
patch bump to a dependency your consumers inherit carry opposite risk, and the classifier treats
them that way.

## Config

Reads `.dependabot-sweep-config.json` from the repo root (gitignored, never committed — same
convention as `canary-publish`'s `.canary-publish-config.json`). If missing, run a short interview:

1. **Quality-gate command** — the command that must pass on the combined branch (e.g.
   `npm run check:verify`).
2. **Package manager** — `npm`/`pnpm`/`yarn` (decides the lockfile and install command).

```json
{
  "qualityGateCommand": "npm run check:verify",
  "packageManager": "npm"
}
```

If the repo also has a `.canary-publish-config.json` (i.e. it's a package other repos consume),
read its `consumers` and `consumerVerifyCommand` fields too — used only by the opt-in consumer-trial
tier below, never required for anything else this skill does.

## Arguments

`/dependabot-sweep [owner/repo]`: interactive — repo inferred from cwd if omitted. Shows the
classification table, asks before building the combined branch, asks before opening the batch PR.
`/dependabot-sweep auto [owner/repo]`: non-interactive for eligible PRs only — mirrors `wip-sweep`'s
`auto` semantics exactly: every classification and plan still prints, only the confirmation prompts
are skipped, and only for PRs the classifier actually marks eligible. Nothing ineligible is ever
touched without asking, in either mode.
`--consumer-verify`: opt-in only, never implied by `auto`. When a major-shipped-dependency PR would
otherwise just get the changelog-scan-and-exclude treatment, also run the real consumer-trial
check (Step 3c) before finalizing the exclusion comment.

---

## Step 1: Discover open Dependabot PRs

```sh
gh pr list --repo <owner>/<repo> --state open --json number,title,headRefName,author,statusCheckRollup \
  --author "app/dependabot"
```

For each, also pull the diff to identify the exact package + version range:

```sh
gh pr view <N> --repo <owner>/<repo> --json files,body
```

Dependabot's own PR body states the old→new version and (usually) the semver bump size directly —
prefer parsing that over re-deriving it, falling back to comparing versions yourself only if the
body doesn't state it plainly.

If there are zero open Dependabot PRs, report that and stop — nothing to sweep.

---

## Step 2: Classify each PR

For each PR, determine two independent facts:

**Dependency type** — read the repo's `package.json` at `main`: is the changed package listed under
`devDependencies` (dev-only — never reaches a consumer, since it isn't in the published bundle) or
under `dependencies`/`peerDependencies` (shipped — consumers directly inherit this, and
`peerDependencies` means consumers must independently satisfy the new version range too)?

**Bump size** — patch / minor / major, from Dependabot's own PR body.

|              | dev-only              | shipped                                    |
| ------------ | ---------------------- | ------------------------------------------- |
| patch/minor  | near-zero risk          | changelog scan (Step 3), then batch if clean |
| major        | low risk, CI-gated only | changelog scan for the comment; **never auto-batched** |

This is the risk model, not semver bump size alone — a major bump to a dev-only linter is lower
real risk than a minor bump to a peer dependency your consumers must also satisfy.

**CI status** — from `statusCheckRollup`: if anything is failing, the PR is excluded regardless of
its cell above; note the actual failing check names for the exclusion comment, don't just say "CI
red."

---

## Step 3: Changelog scan (shipped dependencies only, any bump size)

Skip this step entirely for dev-only PRs — CI status alone decides those.

For a shipped dependency, find its own repository (`npm view <pkg> repository.url`, or read it from
the lockfile's registry metadata) and fetch what changed between the two versions:

```sh
gh api repos/<dep-owner>/<dep-repo>/releases --jq '.[] | select(.tag_name | test("<old>|<new>|in-between"))'
```

Fall back to `WebFetch` on the package's npm page or GitHub releases page if the GitHub API path
doesn't resolve (not every package's repo field points somewhere releases-queryable). Summarize
anything that reads as a breaking change ("breaking", "removed", "renamed", "no longer", a major
version's own release notes almost always self-describe this) into one or two sentences.

This is best-effort — treat it as a real, if imperfect, second opinion, not a database lookup.
**A patch/minor bump whose changelog scan itself surfaces breaking-change language is treated
exactly like a major bump**: excluded from the batch, comment includes the scan's finding.

### Step 3c: Consumer-trial verification (opt-in only, `--consumer-verify` flag)

Only runs when explicitly requested, and only for a major-shipped-dependency PR that would
otherwise just get excluded with the changelog scan's summary. Requires `.canary-publish-config.json`
to already list at least one consumer — skip with a note if it doesn't exist, don't ask to bootstrap
one just for this.

1. Build the source repo with just this one dependency bumped (its own branch, not the shared batch).
2. Publish a throwaway canary from it (same mechanism as `canary-publish`'s Phase 1, same cleanup
   afterward — this is a real publish + install cycle, not a dry run).
3. Bump a registered consumer onto that throwaway canary and run **its own** `consumerVerifyCommand`.
4. Report the real result (pass/fail) in the exclusion comment instead of just the changelog guess.
   A pass here doesn't move the PR into the batch — Step 2's rule (major-shipped never auto-batched)
   still holds; this only makes the human decision that follows better-informed.

---

## Step 4: Present the classification table

```
Dependabot PRs — <owner>/<repo>

PR   Package              Bump    Type      CI      Verdict
#66  @types/react-dom      patch   dev-only  ✅ pass  batch
#65  @mui/material          minor   shipped   ✅ pass  batch (changelog clean)
#64  @mui/lab               minor   shipped   ✅ pass  batch (changelog clean)
#63  framer-motion          major   shipped   ✅ pass  EXCLUDE — major, shipped (see comment)
#5   typescript             major   dev-only  ❌ fail  EXCLUDE — CI red (Prettier/ESLint/TS/Vitest, MUI-v7 peer compat)
```

**Interactive mode:** ask "Proceed with batching the N eligible PRs into one combined PR? [y/n/edit]"
before Step 5.
**`auto` mode:** print the same table, skip the question, proceed straight to Step 5 for the
eligible set.

---

## Step 5: Build the combined branch

```sh
git fetch origin
git checkout -b chore/dependabot-batch-<YYYYMMDD> origin/main
```

Merge each eligible PR's branch in turn — **merge, not cherry-pick**, since each Dependabot commit
is a paired manifest+lockfile change that cherry-picking would split awkwardly:

```sh
git merge origin/<dependabot-branch-1> --no-edit
git merge origin/<dependabot-branch-2> --no-edit
```

**Lockfile conflicts are expected and mechanical**, not a real blocker: resolve by re-running the
package manager's install after all merges land, letting it regenerate the lockfile from the
merged manifest, rather than hand-resolving conflict markers inside it.

```sh
<packageManager> install   # e.g. npm install — regenerates package-lock.json cleanly
```

If a merge produces an actual `package.json` conflict (not just the lockfile), stop — that's a real
incompatibility between two of the batched bumps, not something to force through. Drop the
later-conflicting PR back to "excluded" with a comment explaining the conflict, and retry the batch
without it.

---

## Step 6: Run the quality gate once

```sh
<qualityGateCommand>
```

**If it passes**, this combined branch becomes the batch PR (Step 7).

**If it fails and more than 2 PRs are in the batch**, bisect: drop the most recently merged PR,
re-run the gate, repeat until it's green or only one PR remains. This tells you which specific bump
broke it — report that PR's identity plainly, exclude it, and re-attempt the batch (once) with the
remaining eligible set.

**If it fails and 2 or fewer PRs are in the batch**, there's nothing meaningful to bisect — report
the full failure output, leave all originals untouched, and stop. Don't guess at a culprit from a
sample size of two.

---

## Step 7: Open the batch PR (or don't)

**If the gate passed:**

```sh
git push -u origin chore/dependabot-batch-<YYYYMMDD>
```

Delegate PR creation to `/create-pr chore/dependabot-batch-<YYYYMMDD> skip-hygiene` (`auto` mode also
passes `auto-approve`) — never a raw `gh pr create`, per the org-wide non-negotiable rule already
established for `wip-sweep`. The description should list every dependency actually included, each
with its old→new version.

Then close every original PR that's now part of the batch:

```sh
gh pr close <N> --repo <owner>/<repo> --comment "Superseded by #<batch-PR-number> — batched with N other low-risk updates, single combined quality-gate run. See that PR for the full list."
```

**If the gate never passed** (Step 6's fallback), nothing gets pushed or opened — report the
failure and stop.

---

## Step 8: Comment on excluded PRs (once per reason)

For every PR excluded in Step 2/3 (major-shipped, CI-red, changelog-flagged, or dropped during
Step 6's bisection), check first whether it already carries this skill's own marker for the *same*
reason:

```sh
gh pr view <N> --repo <owner>/<repo> --json comments --jq '.comments[].body' | grep -F "<!-- dependabot-sweep:reason="
```

Only post a new comment if no marker exists yet, or the existing marker's reason differs from this
run's finding (e.g. it flips from "major bump" to "major bump, also now has a merge conflict") —
otherwise a weekly Dependabot cadence would re-comment the same unchanged verdict forever.

```sh
gh pr comment <N> --repo <owner>/<repo> --body "<!-- dependabot-sweep:reason=major-shipped -->
Excluded from the automatic batch: <package> is a major bump (<old> → <new>) to a dependency this repo ships to its own consumers, not just a dev tool — <changelog-scan summary, or consumer-trial result if --consumer-verify ran>.

Suggested next step: <a concrete action — review the linked release notes yourself, or merge individually after manual testing>."
```

---

## Step 9: Offer native grouping (first run per repo only, separate from everything above)

Check whether `.github/dependabot.yml` already has a `groups:` key under its npm `update` entry. If
not, this is worth fixing once so the pile-up stops recurring — but it's a standing repo-config
change, not part of today's cleanup, so keep it as its own proposal and its own PR:

> "This repo's `dependabot.yml` doesn't group updates yet, so Dependabot will keep opening one PR
> per dependency going forward. Want me to add a `groups:` block (e.g. one group for related
> packages like `@mui/*`, patch/minor updates grouped separately from major) as its own small PR?"

If yes, edit `.github/dependabot.yml`, open that PR via `/create-pr` same as any other change — never
bundle it into the dependency-batch PR from Step 7.

---

## Output

Report, concisely:

- Classification table (Step 4), final verdicts
- Batch PR opened (URL) + which originals it superseded, or "gate failed, nothing merged" +
  the failure detail
- Excluded PRs and why, noting which got a fresh comment vs. already had one for the same reason
- Whether the `dependabot.yml` grouping proposal was offered/accepted this run
