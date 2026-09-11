## What it does

`check-pr-link` verifies, read-only, that a PR is actually linked to the issue it implements, and
that the issue's acceptance-criteria checkboxes reflect what the PR's own checklist already
confirmed. It never edits a PR or an issue — it resolves the issue the same way
[link-pr-to-issue](./link-pr-to-issue.md) does (by reference, not by reimplementing that logic),
then checks whether a working link already exists and whether the two checklists agree.

It also catches a link that looks valid but isn't: a same-repo-style `Closes reponame#N` (no
owner) reads as a cross-repo reference but is not valid GitHub auto-close syntax anywhere — this
skill flags that as **not linked**, not as a false positive.

## When to reach for it

`pr-merged` calls this automatically before closing a linked issue, to decide whether
`link-pr-to-issue` needs to run first. Run it by hand to audit an already-merged PR you suspect
was never properly linked — which is exactly how the gap in `wiki#659` (closed the same day its
PR merged, with zero reference back to that PR and every acceptance-criteria box left unchecked)
was found and fixed.

## Two independent checks, not one

Link existence and acceptance-criteria alignment are checked separately and reported separately.
A PR can be perfectly linked with a completely stale checklist, or vice versa — collapsing them
into one pass/fail would hide which one actually needs attention.

## Common questions

**Does this fix anything it finds wrong?**

No. It's read-only by design — `link-pr-to-issue` is the skill that establishes a missing link,
and checking off issue checkboxes or editing issue text is left to a human or the calling skill's
own judgment, since acceptance-criteria matching is a wording judgment call, not an exact diff.

**What if the issue has no checklist, or the PR has no checklist section?**

Reported plainly as "not applicable" — never forced into a comparison that doesn't exist.

## It's working if

- A PR with a valid same-repo `Closes #N` or a cross-repo issue-side comment reports **linked**.
- A PR with only a bare `Closes reponame#N` (no owner) reports **not linked**, not a false pass.
- An issue checkbox the PR's own checklist already confirms, but which is still unchecked, gets
  named explicitly rather than folded into a generic "some are unchecked" summary.

## Where it fits

```txt
pr-merged (Step 3) -> check-pr-link -> (if not linked) link-pr-to-issue -> close the issue
```
