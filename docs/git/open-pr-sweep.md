## What it does

`open-pr-sweep` discovers every non-draft open pull request across one or more GitHub organisations or users and prints a single table: repo, title, and what action is needed. It makes no writes of any kind. Its job ends at the table.

## When to reach for it

`/open-pr-sweep` discovers PRs across every repo owned by the authenticated GitHub user. `/open-pr-sweep --orgs <org1>,<org2>` narrows discovery to the named organisations or users instead.

Run it after [repo-status](./repo-status.md) as part of a morning brief, or on its own whenever you need a plain answer to "what PRs are open right now and what needs attention."

## Pure discovery, nothing else

The whole skill is two API calls per repo: list the repos, then list each repo's open non-draft PRs with number, title, branch, review decision. Draft PRs are excluded because they are not yet ready for anyone's attention. There is no triage, no reply, no fix, no push. If you want any of that, this is the discovery step that feeds it, not the step that does it.

## Common questions

**Why exclude drafts?**

A draft PR is explicitly signalling "not ready yet." Including it in a sweep meant to surface what needs attention would just add noise you have to filter back out by hand.

**How is this different from `morning-pr-sweep`?**

`open-pr-sweep` only lists. [morning-pr-sweep](./morning-pr-sweep.md) reads the review threads on each PR, classifies them, and then replies, fixes, and pushes. If all you want is the list, `open-pr-sweep` is the whole answer; if you want the threads actually cleared, that is a different skill and a different level of write risk.

## It's working if

- Every non-draft open PR you own or watch shows up in the table, across every repo scoped in.
- Draft PRs never appear.
- No API call in this skill's process makes a write, ever.

## Where it fits

`open-pr-sweep` is a pure-discovery peer to [repo-status](./repo-status.md), and both commonly feed a morning brief:

```txt
repo-status + open-pr-sweep -> morning-pr-sweep (or manual triage)
```

Where `repo-status` answers "what is dirty locally," `open-pr-sweep` answers "what is open remotely." Once you know which PRs actually need review responses rather than just a glance, hand them to [morning-pr-sweep](./morning-pr-sweep.md) to clear the debt, or to [respond-pr-review](./respond-pr-review.md) one at a time.
