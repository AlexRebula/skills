---
name: link-pr-to-issue
description: Link a pull request to the issue it implements. Resolves which issue from the branch's ticket number, then links natively (a real `Closes #N` keyword) when the issue is same-repo, or via a comment posted on the issue itself (in the issue's own repo) when cross-repo — the only mechanism that can never leak a private repo's name into a public PR. Call this from create-pr right after opening a PR, from pr-merged when check-pr-link reports no link exists, or run directly to retroactively link an already-open or merged PR.
argument-hint: '<PR-number> [<owner>/<repo>]'
---

# Link PR to Issue

Establishes the connection between a PR and the issue it implements. This is the only skill that
*writes* a link — resolving which issue a PR corresponds to is also done here, canonically:
`check-pr-link` and `pr-merged` both point back to this skill's Step 2 rather than re-deriving it.

---

## Arguments

`/link-pr-to-issue <PR-number>`: repo inferred from conversation context or the current working
directory's git remote, same as `pr-merged`'s own argument handling.
`/link-pr-to-issue <PR-number> <owner>/<repo>`: explicit repo.

---

## Step 1: Identify the PR and repo

Same resolution as `pr-merged`'s Step 1: use the explicit `<owner>/<repo>` if passed, otherwise
infer from `git remote get-url origin` or recent conversation context. Ask rather than guess if
both are silent or conflict.

```sh
gh pr view <N> --repo <owner>/<repo> --json headRefName,body,baseRefName
```

---

## Step 2: Resolve the corresponding issue

This is the canonical resolution method — `check-pr-link` and `pr-merged` both reuse it by
reference rather than reimplementing it.

1. Extract a ticket number from `headRefName` using this repo's branch-prefix convention (see
   `create-pr`'s prefix table): `^(feature|fix|chore|refactor|docs)/(\d+)-`. If no number matches,
   **stop here** — report "no ticket number in branch name, nothing to link" and treat the PR as
   out of scope. This is not a failure: not every PR (a chore bump, a docs fix, this very skill's
   own incident-log housekeeping) has a tracked issue behind it.
2. Try the PR's own repo first: `gh issue view <N> --repo <owner>/<repo>`.
3. If not found there, read `.issue-tracker-config.json` from the repo root (gitignored, never
   committed — same convention as `sync-core`'s `.sync-config.json` and `canary-publish`'s
   `.canary-publish-config.json`). If missing, interview once:

   > "What repo tracks issues for this project when they aren't filed here directly? (leave
   > blank if this repo tracks its own issues only)"

   Write the answer to `.issue-tracker-config.json` and add it to `.gitignore` if not already
   there:
   ```json
   { "trackerRepo": "owner/repo" }
   ```
   or `{ "trackerRepo": null }` if the answer was blank — never re-interview once the file exists.
4. If `trackerRepo` is set, try `gh issue view <N> --repo <trackerRepo>`.
5. If the issue still isn't found anywhere, report which repos were checked and stop — do not
   guess or fabricate an issue number.

The result of this step is `<issue-repo>` and `<issue-number>`, plus whether the relationship is
**same-repo** (`<issue-repo> == <owner>/<repo>`) or **cross-repo**.

---

## Step 3: Link, branching on the relationship

### Same-repo

Check whether the PR body already contains a valid closing keyword for this issue
(`Closes|Fixes|Resolves #<issue-number>`, any case). If not, append one:

```sh
gh pr edit <N> --repo <owner>/<repo> --body "$(printf '%s\n\nCloses #%s' "$CURRENT_BODY" "<issue-number>")"
```

This is a real, native GitHub link: merging the PR auto-closes the issue and populates the
Development panel. Nothing further is needed on this branch.

### Cross-repo

There is no scriptable mechanism that both auto-closes across repos *and* respects the
private-repo-name guardrail — GitHub's cross-repo closing keyword doesn't reliably auto-close, and
its Development-panel manual link has no public API. The only mechanism that is both reliable and
always safe is a comment on the issue, posted from the issue's own repo:

```sh
gh issue comment <issue-number> --repo <issue-repo> --body "Implemented by <owner>/<repo>#<N>."
```

This always succeeds regardless of the two repos' public/private status, since the private repo's
name (if either side is private) never has to appear inside the *other* repo's content — it's
written from inside its own repo.

As a bonus, optionally also try a plain `<owner>/<repo>#<issue-number>` mention appended to the PR
body, for the extra cross-reference timeline entry on the PR side. Run this through the existing
privacy hook exactly as any other `gh pr edit` — never bypass it. If it's blocked, that's fine and
expected in the private/public case: the issue-side comment above is already the required,
sufficient link. Do not retry or work around the block.

---

## Step 4: Report back

- Issue resolved: `<issue-repo>#<issue-number>`, or "no ticket number found — nothing to link"
- Relationship: same-repo (native `Closes` keyword added) or cross-repo (issue-side comment
  posted, plus whether the bonus PR-body mention succeeded or was blocked)
