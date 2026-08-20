## What it does

`respond-pr-review` works through an existing Copilot review on one PR as the branch owner's assistant: it gathers every thread, assigns each one a verdict, replies inline before touching any code, batches every valid fix into a single commit, posts a SHA follow-up per fixed thread, and stops there. Resolving threads and merging is left to the branch owner every time.

## When to reach for it

Ask for it as "respond pr review `<N>`" or "address Copilot review." `/respond-pr-review <N>` is required; the skill asks for the PR number if it is missing, and takes `<owner>/<repo>` when the repo cannot be inferred. If the project has its own variant with preloaded standards, that variant is used instead.

## Merge conflicts block; CI failures do not

Before any thread is read, the PR's mergeable state and CI checks are pulled directly from the API, not inferred from a clean local `git status`, because a clean working tree only means there are no *uncommitted local* changes, not that the branch is conflict-free with the base. A `CONFLICTING` or `DIRTY` state blocks everything until resolved. A failing CI check does not block gathering threads; the failure is diagnosed and its fix folded into the same batch commit as the review fixes, so the branch is green again before handing back.

## Every thread gets a verdict before any code changes

Verdicts are one of five: valid (fix it), not valid (explain why), partially valid (fix the real part, reject the rest), needs branch owner input (missing context, do not guess), or valid but deferred (open a tracking issue, link it). Security and accessibility comments are always treated as valid unless there is a specific technical reason they are not.

Every thread with no existing reply from this account gets a reply in that verdict format before the batch fix touches any file. A GitHub suggested-change block inside a thread is never silently skipped; it gets an explicit accept-verbatim or reject-with-reason recorded before the fix or the SHA follow-up for that thread happens. All the valid and partially-valid fixes then land in one commit, the quality gate runs before that push, and every fixed thread gets a short-SHA reply afterward confirming exactly what changed.

Before gathering threads, the skill also reads its own prior replies on the PR, so a thread already acknowledged in an earlier session is not replied to twice, and a thread that already has a SHA follow-up is not double-confirmed. Triage and the fixes themselves are never skipped by this check; only the two reply steps are gated by it.

## Common questions

**Why check the API's mergeable state instead of trusting `git status`?**

Because a clean local tree tells you nothing about whether the branch has diverged from the base on the remote. Trusting it would mean missing real conflicts that only show up once you try to merge.

**What happens to a thread that carries a suggested change block?**

It cannot be skipped silently. The reply for that thread has to record either "accepting the suggestion verbatim" or "rejecting it, fixing with X instead" before the batch fix or the SHA follow-up for that thread proceeds.

**Does the skill resolve threads once the fix lands?**

No, never. The branch owner verifies the fixes and resolves them by hand, and decides separately whether to re-request review.

## It's working if

- Every thread has exactly one verdict reply, never zero and never two.
- Every suggested-change block has a recorded accept or reject decision before its fix lands.
- The fix batch is one commit per PR, not one commit per thread.
- Every fixed thread has a SHA follow-up reply after the push, and every deferred thread has an issue link instead.
- No thread gets resolved by this skill; that is always left to you.

## Where it fits

`respond-pr-review` is the single-PR version of the loop [morning-pr-sweep](./morning-pr-sweep.md) runs across every open PR at once:

```txt
create-pr -> respond-pr-review (one PR) / morning-pr-sweep (all PRs)
```

Reach for this skill when exactly one PR needs a response; reach for [morning-pr-sweep](./morning-pr-sweep.md) when several PRs all have open threads and you want one context load and one pass through all of them instead of running this skill N times.
