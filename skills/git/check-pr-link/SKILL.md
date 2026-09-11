---
name: check-pr-link
description: Verify a pull request is actually linked to the issue it implements, and that the issue's acceptance-criteria checkboxes reflect what the PR's own checklist confirms is done. Read-only — reports findings, never edits a PR or issue. Call this from pr-merged before closing a linked issue, or run directly to audit an already-open or already-merged PR.
argument-hint: '<PR-number> [<owner>/<repo>]'
---

# Check PR Link

Two independent, read-only checks against one PR and the issue it implements: does a real link
exist, and do the issue's acceptance criteria reflect what the PR's checklist already confirmed.
Never writes anything — `pr-merged` decides what to do with the findings, and `link-pr-to-issue` is
the skill that fixes a missing link.

---

## Arguments

`/check-pr-link <PR-number>`: repo inferred the same way as `pr-merged`/`link-pr-to-issue`.
`/check-pr-link <PR-number> <owner>/<repo>`: explicit repo.

---

## Step 1: Resolve the PR and the corresponding issue

```sh
gh pr view <N> --repo <owner>/<repo> --json headRefName,title,body,state
```

Resolve the issue using **exactly `link-pr-to-issue`'s Step 2** (branch-name ticket number →
same-repo lookup → `.issue-tracker-config.json` tracker-repo fallback). Do not reimplement that
logic here — if it needs to change, it changes in one place.

If `link-pr-to-issue`'s Step 2 finds no ticket number at all, stop and report "no tracked issue —
nothing to check."

---

## Step 2: Check whether a link actually exists

**Same-repo issue:**

- Check the PR's `body`/`title` for a working closing keyword: `Closes|Fixes|Resolves #<N>`.
- Watch for the **invalid bare shorthand**: `Closes <reponame>#<N>` with no owner looks like a
  cross-repo reference but is not valid GitHub auto-close syntax anywhere — treat this as **not
  linked**, even though text matching `#<N>` is present.
- Also check `gh issue view <N> --repo <issue-repo> --json closedByPullRequestsReferences` — a
  non-empty result confirms GitHub's own native link exists regardless of what the PR text says.

**Cross-repo issue:**

- Check the issue's own comments for a reference to this PR:
  `gh issue view <N> --repo <issue-repo> --json comments` — look for `<owner>/<repo>#<N>` or the
  PR's URL.
- A same-repo-style `Closes owner/repo#N` keyword in the PR body does not reliably auto-close
  cross-repo (confirmed: GitHub does not document cross-repo auto-close, and it's unreliable in
  practice) — its presence is worth noting but never counts as sufficient on its own for a
  cross-repo issue. The issue-side comment is what counts.

Report: **linked** (and by which mechanism) or **not linked**.

---

## Step 3: Check acceptance-criteria alignment

Read the issue body's checklist (`- [ ]` / `- [x]` lines) and the PR body's own checklist section
(`Mergeable bar`, `Type of change`, or `Checklist`, whichever the PR actually has).

For each unchecked issue box, use judgment to decide whether the PR's checklist confirms the
equivalent item as done (wording won't match verbatim — match on meaning, not string equality).
Flag any issue checkbox that looks satisfied per the PR but is still unchecked.

If the issue has no checklist at all, or the PR has no checklist section, report that plainly
rather than forcing a comparison that doesn't apply.

---

## Step 4: Report back

- Link status: linked (mechanism) / not linked
- Criteria status: N of M issue checkboxes appear done-but-unchecked (list them), or "no mismatch
  found", or "not applicable"
- Never take action on these findings — that's `link-pr-to-issue`'s job for the link, and a human
  or calling skill's judgment call for the checkboxes.
