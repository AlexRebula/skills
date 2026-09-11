## What it does

`dependabot-sweep` clears a repo's pile of open Dependabot PRs by classifying each one on real risk
— dependency type (dev-only vs. shipped to consumers) crossed with semver bump size, not bump size
alone — then merging every low-risk PR's branch into one combined branch, running the quality gate
once against the result, and opening a single batch PR if it passes. High-risk PRs (a major bump to
something the repo actually ships, a failing check, a changelog that reads as breaking) are left
open, untouched, each carrying a one-time comment explaining exactly why.

The risk model is the point: a major bump to a dev-only linter is lower real risk than a minor bump
to a peer dependency your own consumers must also satisfy. Semver alone can't tell those apart;
`package.json`'s own `devDependencies`/`dependencies`/`peerDependencies` split can.

## When to reach for it

Say something like "clean up dependabot PRs" or "sweep dependency updates" — the skill's own
description is written to match. `/dependabot-sweep [owner/repo]` also works explicitly, with
`auto` for the same unattended semantics `wip-sweep` uses (every classification still prints, only
the confirmation prompts skip, and only for PRs the classifier actually marks eligible).

## The risk model

|              | dev-only               | shipped                                      |
| ------------ | ------------------------ | ----------------------------------------------- |
| patch/minor  | near-zero risk            | changelog scan first, batch if clean             |
| major        | low risk, CI-gated only   | changelog scan for the record; **never auto-batched** |

A patch/minor bump whose own changelog scan surfaces breaking-change language gets treated exactly
like a major bump — excluded, with the scan's finding in the comment.

## Consumer-trial verification is opt-in, never automatic

For the highest-risk cell (major, shipped), the default is a changelog scan — cheap, no extra
publish cycle. Passing `--consumer-verify` goes further for that one PR: publishes a throwaway
canary with just that bump, bumps a registered consumer (read from a sibling
[canary-publish](./canary-publish.md) config, if one exists) onto it, and runs the consumer's own
verify command as real evidence. It never moves the PR into the automatic batch either way — it
only makes the human decision that follows better-informed.

## Common questions

**Why not just batch everything that's currently green in CI?**

Because a shipped dependency's own CI can be green while still breaking a consumer that exercises
the API differently — CI-green is necessary, not sufficient, for anything shipped. Dev-only tools
don't have this problem at all, since they never reach a consumer regardless of what breaks.

**What happens to the original Dependabot PRs once they're batched?**

Closed, each with a comment pointing at the new combined PR and naming what else was batched with
it — nothing silently disappears.

**What if the combined batch fails the quality gate?**

With more than 2 PRs in the batch, it bisects (drops the most recently merged one, re-runs, repeats)
to name the actual culprit rather than failing the whole batch opaquely. With 2 or fewer, there's
nothing meaningful to narrow down — it reports the full failure and leaves every original PR alone.

**Won't Dependabot just reopen the same pile next week?**

On a repo's first sweep, the skill checks whether `dependabot.yml` already groups updates and, if
not, offers to add a `groups:` block as its own separate PR — addressing the recurrence, kept
deliberately apart from the dependency-batch PR itself.

## It's working if

- A dev-only patch/minor PR batches without a changelog scan ever running against it.
- A shipped major-version PR is excluded even when its own CI is fully green.
- Closing a batched PR always references the specific combined PR it was superseded by.
- Re-running the sweep a week later doesn't re-comment on a PR whose exclusion reason hasn't
  changed.

## Where it fits

```txt
Dependabot opens N individual PRs -> dependabot-sweep classifies each ->
  low-risk set -> one combined branch -> one quality-gate run -> one batch PR
  high-risk set -> left open, one-time comment explaining why
```

`create-pr` opens the resulting batch PR (never a raw `gh pr create`); `canary-publish`'s consumer
config is reused, read-only, for the opt-in consumer-trial tier.
