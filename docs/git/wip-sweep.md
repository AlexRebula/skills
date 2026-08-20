## What it does

`wip-sweep` takes the dirty state table [repo-status](./repo-status.md) produced and turns it into OSS-compliant snapshot branches, one confirmation gate at a time. It runs as a tiered action model: T2 commits locally, T3 pushes to remote, T4 opens a draft PR. Each tier asks before it runs, and each tier only processes what the previous one confirmed.

Unlike [commit-wip](./commit-wip.md), which prefers matching an existing remote branch, `wip-sweep` always creates a fresh dated branch (`<prefix>/YYYYMMDD-<group-slug>`) per logical group. It is the tool for turning end-of-session mess into a clean, reviewable snapshot rather than for continuing yesterday's branch.

## When to reach for it

Run it right after [repo-status](./repo-status.md) has shown you which repos are dirty. It is not a discovery tool; it assumes the table already exists.

## The four tiers

**T1 - scope selection (automatic).** Shows the dirty state table and asks which repos to sweep: all, a selection, or none. Also asks whether you want a suggested group name per repo, based on the dirty file contents.

**T2 - stage and commit locally.** For each selected repo, dirty files are grouped by logical concern (docs, config, source, tests, or mixed), each group gets an OSS section 2.1 branch prefix, and the full plan is shown before anything is staged. `wip/` is never a valid prefix. Nothing runs without a yes.

**T3 - push to remote.** Asks per repo whether to push. If a branch that gets pushed already has an open PR, the PR description is updated as a non-negotiable follow-up (delegated to [create-pr](./create-pr.md) with an update flag, never constructed inline) so a stale description never survives a new push.

**T4 - open pull requests.** Defaults to no. If confirmed, PR creation is always delegated to [create-pr](./create-pr.md) (or your project's own PR skill), never called directly as `gh pr create --body`, because that bypasses the repo's PR template. PRs from this tier are always opened as drafts.

## Common questions

**Why does T4 refuse to call `gh pr create` directly, even for a "simple" PR?**

Because doing so skips `.github/pull_request_template.md` and produces a PR description with none of the required sections filled in. The rule holds for every PR this tier opens, no exceptions, and the fallback if the delegated skill is unavailable is to stop and say so, not to fall back to an inline call.

**Why does a push to an already-open PR always update its description, even for a small follow-up commit?**

Because a stale PR description that no longer matches the branch is worse than no description at all, and there is no way to know in advance which pushes are "small enough" to skip the update.

## It's working if

- Nothing is staged, pushed, or opened as a PR without an explicit confirmation at that tier.
- Every branch created uses a real OSS-compliant prefix; `wip/` never appears.
- A push to a branch with an existing open PR always triggers a description update, without exception.
- Every PR this skill opens lands as a draft, and its description was built from the repo's own template, not typed inline.

## Where it fits

`wip-sweep` is the confirmation-gated counterpart to [commit-wip](./commit-wip.md) in the housekeeping flow:

```txt
repo-status -> wip-sweep -> create-pr
```

It reads its input from [repo-status](./repo-status.md), and both T3's description updates and T4's PR creation delegate outward to [create-pr](./create-pr.md) rather than duplicating that logic. Reach for `commit-wip` instead when the goal is simply landing dirty files on the branch they already belong to with minimal ceremony; reach for `wip-sweep` when you want a deliberate, tier-by-tier snapshot with a chance to stop at each step.
