## What it does

`create-pr` takes a branch that is ready to leave your machine and turns it into a proper pull request: it checks branch hygiene, runs the quality gate, fills in a complete PR description from the repo's own template (or a sensible fallback), and opens the PR through `gh pr create`. It never uses the GitHub web UI for creation, because the UI leaves every template section empty for you to fill by hand.

Six points in the workflow are opinionated on purpose and called out inline as configurable: branch prefixes, the quality gate command, whether it waits for your explicit go-ahead before opening the PR, the PR description template, the title format, and the base branch. None of this is presented as the only correct way to do it.

## When to reach for it

`/create-pr <branch>` is required, ask if it is missing. Add `skip-hygiene` to skip the branch hygiene phase (useful when [wip-sweep](./wip-sweep.md) already did it in this session), `request-review` to trigger a review bot after creation, `auto-approve` to skip the wait-for-go-ahead gate, or `<owner>/<repo>` when the repo cannot be inferred.

## Branch hygiene, before anything gets opened

Every commit on the branch is checked against the branch's stated purpose (`feature/`, `fix/`, `chore/`, `refactor/`, `docs/`). An unrelated commit, one that has nothing to do with the branch's job, gets moved to the branch it actually belongs on rather than left in place.

Before any of that, the skill checks whether the branch is stacked on another branch that still has an open PR. A child branch cannot merge until its parent does, and stacking review debt is the fastest way into a review snowball. If it is stacked, the skill stops and surfaces the two ways out rather than opening the PR anyway.

The quality gate runs last in this phase. If it fails, the skill does not proceed to writing the PR description.

## The description is never left half filled

If `.github/pull_request_template.md` exists, every section gets filled with real content from the branch's commits and the conversation, never a placeholder. If it does not exist, a fallback template covers what the PR does, why, the type of change, and a checklist, plus one section that is mandatory either way: **Mergeable bar**, the agreed done-condition stating which review threads are blocking versus deferred versus won't-fix. A PR with no stated done-condition is the shape that lets review threads multiply with no exit.

If the diff touches a locally installed skill file, a mandatory checklist item is added reminding you to sync the change to the canonical skills repo before merge, since a local-only edit to a skill silently diverges from the source of truth.

## Common questions

**Why does it wait for an explicit go-ahead before opening the PR by default?**

To prevent an accidental PR from being created mid-task, before you actually meant to open one. Pass `auto-approve` when you want it to skip that wait.

**Can I request a bot review automatically?**

Only by passing `request-review`, and only if a review bot is already configured for the repo (the skill checks whether it was auto-added before trying to trigger it). There is no reliable API path for requesting a bot review; if it was not auto-added, the GitHub UI is the only way.

## It's working if

- The PR description has no empty section and no placeholder text anywhere.
- The Mergeable bar section states an actual done-condition, not a restatement of the PR title.
- A stacked branch is caught and surfaced before the PR opens, not after.
- Nothing is created through the GitHub web UI.

## Where it fits

`create-pr` is the hinge between local work and open review, and every other git skill that needs to open a PR delegates to it rather than calling `gh pr create` directly:

```txt
commit-wip / wip-sweep -> create-pr -> respond-pr-review / review-pr
```

[wip-sweep](./wip-sweep.md) calls it with `skip-hygiene` in its T4 tier and with an `update` flag from T3. Once the PR exists, [respond-pr-review](./respond-pr-review.md) and [review-pr](./review-pr.md) pick up from here; this skill stops the moment the PR is created and does not touch review threads itself.
