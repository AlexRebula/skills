## What it does

`implement-tickets` closes the gap `implement`'s own docs name explicitly: `implement` builds exactly one ticket per invocation, on purpose, and has no batch mode. `implement-tickets` is the thin loop on top: point it at a parent issue whose children were already ticketed by [to-tickets](https://aihero.dev/skills-to-tickets), and it repeatedly computes the frontier — every child whose blockers are satisfied — and drives `/implement` on each, one at a time, until the whole batch is built.

It does not reimplement TDD, review, or commit logic. All of that stays inside `/implement`. This skill's entire job is sequencing: working out which ticket can go next, and what to branch it off.

## The stacking decision

The obvious way to sequence a dependency chain is to wait for each ticket's PR to actually merge before starting the next one. This skill deliberately does not do that. Waiting for a human to click merge between every single ticket defeats the point of running a batch unattended — so a ticket counts as "done enough to unblock its dependents" once `/implement` has produced a PR, not once that PR is merged. The next ticket branches directly off the still-open PR's branch: an intentional stack.

This is a real tradeoff, not a free lunch. `create-pr`'s own branch-hygiene check treats any stacked branch as the fastest path to a PR review-debt snowball, and normally halts to ask whether the stack is intentional. `implement-tickets` already knows the answer for branches it created itself within the same batch, so it answers that check automatically instead of stopping to ask nobody. A stack against something outside the current batch's known branches still halts — that would mean something unexpected happened.

The output, at the end, is an ordered stack of unmerged PRs. Nothing gets merged by this skill. Merging stays a human decision, in dependency order, same as everywhere else in this ecosystem.

## When to reach for it

You invoke this by typing `/implement-tickets` yourself — it ships with `disable-model-invocation: true`, the same as `implement` and `to-tickets`, so nothing reaches for it on your behalf.

| The work is… | Reach for |
| --- | --- |
| One ticket | `/implement #42` directly |
| A parent issue with several GitHub-native sub-issues, ready to build end to end | `/implement-tickets <parent>` |
| Not yet split into tickets | [to-tickets](https://aihero.dev/skills-to-tickets) first |
| On a tracker other than GitHub issues, or the sub-issues aren't GitHub-native | Not supported yet — v1 is GitHub-native sub-issues only |

## Prerequisites

- The parent issue's children must already exist as GitHub-native sub-issues (what `to-tickets` produces when publishing to a real tracker), each with a "Blocked by" section naming the issues that gate it.
- Every blocker outside the parent's own child set must already be closed before starting — this skill will not implement work belonging to a different batch, and stops to tell you which child is waiting on what if one isn't.

## What one run does

1. Fetch the parent's sub-issues and read each child's declared blockers, split into in-batch and external.
2. Verify every external blocker is already closed. Stop if not.
3. Loop: compute the frontier (children whose blockers are all satisfied), then for each ticket in it — one at a time, never in parallel, for the same reasons `implement` itself refuses to run concurrently in one checkout — branch off the right base (default branch, or the most recent in-batch blocker's branch if stacking), run `/implement`, then `/create-pr skip-hygiene auto-approve` to open the PR.
4. Repeat until every child has a PR.
5. Report the full ticket → branch → PR chain, and that nothing is merged yet.

Pass `--board` to also publish (and keep updating) an HTML status-board artifact tracking each ticket through Blocked → Ready → In Progress → Done, styled to match this project's prior "Closure Sprint" boards.

## What it does not do

- Merge anything, ever.
- Close or modify the parent issue. Its sub-issue tracking reflects completion automatically once the human merges the stack and runs `/pr-merged` on each PR; closing the parent itself is still a human call.
- Support non-GitHub trackers, or stacking across two separate `/implement-tickets` runs (two sibling parent specs each get their own run, their own stack).

## Where it fits

`implement-tickets` sits directly next to `implement` in the main chain, as an optional batch wrapper:

```txt
grill-with-docs → to-spec → to-tickets → implement → review-pr
                                      ↳ implement-tickets (loops implement across a whole parent's children)
```

It trusts `to-tickets`' blocking edges the same way `implement` trusts the shape of a single ticket — a badly-ordered dependency graph gets built in whatever order it declares, not re-validated.
