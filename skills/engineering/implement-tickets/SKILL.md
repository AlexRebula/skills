---
name: implement-tickets
description: "Given a parent issue with GitHub-native sub-issues, repeatedly compute the frontier (children whose blockers are done) and drive /implement on each — every ticket in a frontier round runs concurrently, each in its own isolated git worktree — until the whole batch is implemented, stacking branches for in-batch dependencies rather than waiting for merges. Optionally publishes/updates a visual status-board artifact."
disable-model-invocation: true
---

# Implement Tickets

A thin orchestration loop around `/implement`: given a parent issue whose children are already ticketed (via `/to-tickets`), repeatedly finds the frontier — every child whose blockers are satisfied — and implements each one, until the whole batch is done. Every ticket in a frontier round is dispatched **concurrently**, each into its own isolated git worktree, since nothing in the frontier depends on anything else still in that same round by definition. This skill does not reimplement TDD, review, or commit logic; all of that stays in `/implement`. Its only job is sequencing, isolation, and, optionally, visualizing progress.

**Scope for v1**: GitHub-native sub-issues only. The parent/child tracker issues may live in a different repo than the code PRs this skill opens (e.g. a shared tracker repo driving work across several code repos) — see Step 5a for the closing-syntax requirement that pattern needs. A blocker outside the current parent's child set (e.g. a sibling batch's ticket) is treated as external and must already be closed — this skill does not stack across two different `/implement-tickets` runs.

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

By construction, no two tickets in the same frontier round depend on each other — every in-batch blocker either sits in an earlier, already-implemented round or isn't a blocker for this round's members. That's what makes the whole round safe to dispatch **concurrently**, each into its own isolated git worktree, rather than one ticket at a time.

**The rule, stated plainly: every ticket that CAN run concurrently MUST — never fall back to one-at-a-time dispatch for a ticket sitting in the current frontier round.** Frontier membership *is* the concurrency test — a ticket only sits outside the current round because a real, declared blocker (checked in Step 1 and this step) isn't satisfied yet, never because of caution, a hunch about file overlap, or wanting to "be safe." A shared file between two same-round tickets is an acceptable, expected risk (resolved as an ordinary merge conflict at PR-merge time, per Step 2 step 3b) — it is not a reason to serialize them. The "if possible" in "run concurrently if possible" is answered entirely by whether a ticket is in the frontier, not by a fresh judgment call each round.

Repeat until every child has been implemented:

1. **Compute the frontier**: every not-yet-implemented child whose blockers are all satisfied.
2. If the frontier is empty and children remain un-implemented: stop and report a stall (this should only happen on a genuine dependency cycle, since Step 1 already validated external blockers) — do not guess an order.
3. **For every ticket in the frontier, set up its isolated worktree before dispatching any agent**:

   a. **Determine the base branch.** If the ticket has no in-batch blockers (or only external ones, already closed/merged), the base is the default branch. If it has one or more in-batch blockers, the base is the **most recently completed blocker's branch** — this is an intentional stack, not the accidental kind `create-pr`'s own hygiene check normally halts on.

   b. **Create the worktree**: `git worktree add -b <ticket-branch> <repo-parent-dir>/<repo-name>-worktrees/<ticket-branch> <base-branch>` (fetch the base branch first if it isn't the locally-checked-out one). This gives the ticket its own working directory and index sharing the same object store, so concurrent `git add`/`commit`/`checkout` across tickets never race — the only thing two tickets can still collide on is the *content* of a file both happen to touch, which surfaces as an ordinary merge conflict at PR-merge time, same as it would with any two independent branches.

4. **Dispatch every ticket in the frontier in one batch** — a single message containing one Agent tool call per ticket, each pointed at that ticket's own worktree path instead of the shared repo checkout, each instructed to do everything `/implement` normally does (fresh-context TDD, review gate, commit) but to stop after committing locally — no push, no PR, same as before. Sending them in one message is what makes them run concurrently; dispatching them across separate messages serializes them again by accident.

5. **As each agent reports back** (they will finish at different times — handle each on its own, don't wait for the whole batch to synchronize):

   a. **Push the branch**: `git push -u origin <ticket-branch>` from the ticket's worktree (or the main checkout — worktrees share the same remotes, it doesn't matter which one runs it). Do this before calling `create-pr`; a branch with no remote-tracking ref yet will make `gh pr create` fail with a confusing "no commits between" error rather than a clear "branch not found" one.

   b. **Open the PR.** `/implement`'s own scope ends at commit — it does not open a PR. Call `/create-pr <branch> skip-hygiene auto-approve` (skip-hygiene: `/implement` already ran review; auto-approve: no human is present to green-light each one individually during an AFK run). When `create-pr`'s Step 1b stacking check fires: if the branch it's stacked on belongs to a blocker **within this same batch** (tracked from step 3a), treat the stack as already-confirmed intentional and proceed — do not halt asking the user, since no one is present to answer. Only halt for a stack against something outside this batch's known branches, which would mean something genuinely unexpected happened.

      **If the parent/child tickets live in a different repo than the one this PR is being opened in** (a shared tracker repo driving `/implement` runs against one or more separate code repos): the PR body's closing keyword **must** use the fully-qualified `Closes <tracker-owner>/<tracker-repo>#<N>` form. A bare `Closes <tracker-repo>#<N>` (no owner) is not valid GitHub auto-close syntax anywhere, same-repo or not, and silently never fires — it will look like the reference worked (it reads fine in the PR body) but the tracker issue will sit open forever with no error surfaced. Verify the rendered PR body actually contains the qualified form before moving on.

      **If the code repo enforces a rule against naming or path-referencing a separate (e.g. private tracker) repo in its own public-facing or shared content** (checked via any repo-local guardrail — a pre-commit/pre-push hook, a CI lint, a documented convention): the fully-qualified closing keyword above may be exactly the kind of content that rule blocks. If so, drop the closing keyword from the PR body entirely rather than trying to route around the guardrail, and say so plainly in the PR body and in this skill's own completion report — the tracker ticket will need a manual close (`/pr-merged` still does this once told which tracker issue a PR corresponds to; it just won't auto-detect the link if the PR body carries no reference at all). Never weaken, disable, or bypass the guardrail to make the reference fit.

   c. **Remove the worktree** (`git worktree remove <path>`) now that its branch is pushed and the PR is open — the branch itself lives on in the main repo and on the remote, only the scratch working directory is scratch.

   d. If `--board` was passed, update the artifact (Step 3) to move this ticket from Ready → Done.

6. Once every ticket dispatched in this round (step 4 above) has reported back and had its PR opened, go back to this loop's own step 1 (recompute the frontier) and repeat.

## Step 3: Status-board artifact (only if `--board` was passed)

Publish (first ticket) or republish (every ticket after) an HTML artifact styled like this project's existing "Closure Sprint" boards — read one of the user's prior published artifacts first (ask which URL if not already known) to match its visual style exactly, rather than re-deriving a new look. Adapt the columns to this skill's own states, since the prior boards' columns don't all apply to a fully-automated run:

- **Blocked** — blockers not yet satisfied
- **Ready** — in the current frontier, about to be dispatched
- **In Progress** — dispatched to its own worktree, `/implement` currently running there — normal for several tickets to sit here at once, since a whole frontier round runs concurrently
- **Done** — PR opened (not necessarily merged yet)

Each ticket card links to its GitHub issue and, once done, its PR.

## Step 4: Completion report

Once every child has been implemented (a PR opened for each), report:

- The full ticket → branch → PR list, grouped by the frontier round each was built in, making the stack explicit (which branch sits on which).
- That **nothing has been merged** — merging stays the human's call, in dependency order (bottom of the stack first), same as everywhere else in this workflow.
- That the parent issue itself is untouched — this skill never closes or modifies the parent (same rule `/to-tickets` follows at publish time). Once the human merges the stack, GitHub auto-closes each ticket on its own **if and only if** every PR used the correctly-qualified closing keyword from Step 5a (cross-repo references need the `owner/repo#N` form, or GitHub silently ignores them). Running `/pr-merged` on each PR afterward is still the mechanical backstop that catches and fixes any ticket that didn't auto-close for that or any other reason — this includes any PR where Step 5a's guardrail check meant the closing keyword was deliberately dropped, which needs a manual close every time, not just as a backstop. The parent's sub-issue tracking then shows 100% completion, and the human can close it.
- The board artifact's URL, if `--board` was used.
- Any ticket where a repo-local guardrail blocked the fully-qualified closing keyword (Step 5a) — name which PRs, so the human knows which tracker issues need a manual close rather than assuming GitHub handled it.

## Out of scope for v1

- Non-GitHub trackers (local ticket files, Linear, etc.)
- Stacking across two separate `/implement-tickets` invocations (e.g. two sibling parent specs) — each run only knows its own batch's branches
- Streaming/rolling dispatch — starting a newly-unblocked ticket the moment its one specific blocker finishes, rather than waiting for the rest of its round to finish too. Concurrency here is *within* a frontier round only; round *N+1* is computed, and starts, only once every ticket in round *N* has reported back (Step 2 step 6)
- Auto-merging anything, ever
- Automatically closing the parent issue
