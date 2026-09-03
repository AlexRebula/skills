---
name: implement-tickets
description: "Given a parent issue with GitHub-native sub-issues, repeatedly compute the frontier (children whose blockers are done) and drive /implement on each until the whole batch is implemented, stacking branches for in-batch dependencies rather than waiting for merges. Optionally publishes/updates a visual status-board artifact."
disable-model-invocation: true
---

# Implement Tickets

A thin orchestration loop around `/implement`: given a parent issue whose children are already ticketed (via `/to-tickets`), repeatedly finds the frontier — every child whose blockers are satisfied — and implements each one, until the whole batch is done. This skill does not reimplement TDD, review, or commit logic; all of that stays in `/implement`. Its only job is sequencing and, optionally, visualizing progress.

**Scope for v1**: GitHub-native sub-issues only, one repo at a time. A blocker outside the current parent's child set (e.g. a sibling batch's ticket) is treated as external and must already be closed — this skill does not stack across two different `/implement-tickets` runs.

## Arguments

`/implement-tickets <parent-issue-number>`: work through every child of this issue until each has been implemented.

`/implement-tickets <parent-issue-number> --board`: same, plus publish/update a status-board artifact tracking progress as you go.

---

## Step 1: Resolve the child set and dependency graph

1. Fetch the parent's native sub-issues: `gh api repos/<owner>/<repo>/issues/<parent>/sub_issues`.
2. For each child, read its body's "Blocked by" section and extract every referenced issue number.
3. Classify each blocker: **in-batch** (it's one of this parent's own children) or **external** (anything else).
4. For every external blocker, check its state (`gh issue view <N> --json state`). If any is still open, stop and tell the user which child is waiting on which external issue — this skill does not implement work outside the current parent's tree.

## Step 2: Loop the frontier

A child is **advanceable** once every one of its blockers is satisfied:
- an **in-batch** blocker is satisfied once that ticket's own `/implement` run has completed (a PR exists) — not once it's merged. This is deliberate: waiting for a human to merge between every ticket would defeat running this AFK.
- an **external** blocker is satisfied once it's closed (already verified in Step 1).

Repeat until every child has been implemented:

1. **Compute the frontier**: every not-yet-implemented child whose blockers are all satisfied.
2. If the frontier is empty and children remain un-implemented: stop and report a stall (this should only happen on a genuine dependency cycle, since Step 1 already validated external blockers) — do not guess an order.
3. For each ticket in the frontier, **one at a time** (never in parallel — each `/implement` run gets its own fresh context, per this repo's own convention for ticket work):

   a. **Determine the base branch.** If the ticket has no in-batch blockers (or only external ones, already closed/merged), branch off the default branch as usual. If it has one or more in-batch blockers, branch off the **most recently completed blocker's branch** — this is an intentional stack, not the accidental kind `create-pr`'s own hygiene check normally halts on.

   b. **Invoke `/implement <ticket-number>`** against that base branch.

   c. **Open the PR.** `/implement`'s own scope ends at commit — it does not open a PR. Call `/create-pr <branch> skip-hygiene auto-approve` (skip-hygiene: `/implement` already ran review; auto-approve: no human is present to green-light each one individually during an AFK run). When `create-pr`'s Step 1b stacking check fires: if the branch it's stacked on belongs to a blocker **within this same batch** (tracked from step 3a), treat the stack as already-confirmed intentional and proceed — do not halt asking the user, since no one is present to answer. Only halt for a stack against something outside this batch's known branches, which would mean something genuinely unexpected happened.

   d. If `--board` was passed, update the artifact (Step 3) to move this ticket from Ready → Done.

4. Recompute the frontier and repeat.

## Step 3: Status-board artifact (only if `--board` was passed)

Publish (first ticket) or republish (every ticket after) an HTML artifact styled like this project's existing "Closure Sprint" boards — read one of the user's prior published artifacts first (ask which URL if not already known) to match its visual style exactly, rather than re-deriving a new look. Adapt the columns to this skill's own states, since the prior boards' columns don't all apply to a fully-automated run:

- **Blocked** — blockers not yet satisfied
- **Ready** — in the current frontier, about to be implemented
- **In Progress** — `/implement` currently running
- **Done** — PR opened (not necessarily merged yet)

Each ticket card links to its GitHub issue and, once done, its PR.

## Step 4: Completion report

Once every child has been implemented (a PR opened for each), report:

- The full ticket → branch → PR list, in the order they were built, making the stack explicit (which branch sits on which).
- That **nothing has been merged** — merging stays the human's call, in dependency order (bottom of the stack first), same as everywhere else in this workflow.
- That the parent issue itself is untouched — this skill never closes or modifies the parent (same rule `/to-tickets` follows at publish time). Once the human has merged the stack and run `/pr-merged` on each PR (which closes each ticket), the parent's sub-issue tracking will show 100% completion on its own, and the human can close it.
- The board artifact's URL, if `--board` was used.

## Out of scope for v1

- Non-GitHub trackers (local ticket files, Linear, etc.)
- Stacking across two separate `/implement-tickets` invocations (e.g. two sibling parent specs) — each run only knows its own batch's branches
- Auto-merging anything, ever
- Automatically closing the parent issue
