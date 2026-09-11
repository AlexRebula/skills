## What it does

`link-pr-to-issue` connects a PR to the issue it implements. It resolves which issue that is from
the PR's own branch name (this repo's `type/NNN-slug` convention), checking the PR's own repo
first and falling back to a configured tracker repo — then links it the way that's actually
reliable for the relationship: a real `Closes #N` keyword when the issue is in the same repo
(GitHub auto-closes it on merge, no further action needed), or a comment posted on the issue
itself, from inside the issue's own repo, when it's cross-repo.

The cross-repo case exists because no combination of GitHub features gets you both an auto-close
*and* a guarantee that a private repo's name never ends up written into a public repo's PR body.
Cross-repo closing keywords don't reliably auto-close anyway (undocumented, unreliable in
practice), and GitHub's manual "Development panel" link has no public API — so the one mechanism
that's both reliable and always safe is the issue-side comment, and that's what this skill relies
on rather than treating the keyword as a best-effort nicety.

## When to reach for it

`create-pr` calls this automatically right after opening a PR — you don't normally invoke it
directly for that path. Run it by hand to retroactively link a PR that was opened before this
skill existed, or whenever `check-pr-link` reports a PR isn't linked yet.

## The tracker-repo fallback

Most branches' ticket numbers resolve against the PR's own repo. When they don't (a private
tracker repo separate from the code repo), this skill reads `.issue-tracker-config.json` from the
repo root — gitignored, bootstrapped once via a short interview, same convention as
[canary-publish](./canary-publish.md)'s `.canary-publish-config.json`. Nothing about the tracker
repo's name is hardcoded into this skill.

## Common questions

**What happens if the branch name doesn't have a ticket number in it?**

Nothing — the skill reports "no ticket number found, nothing to link" and stops. Not every PR
traces back to a tracked issue (a dependency bump, a docs typo fix), and that's fine.

**Why not just always write the closing keyword, even cross-repo?**

Because it doesn't reliably auto-close anything cross-repo, and if either repo is private, writing
its name into the other repo's PR body is exactly the leak a separate guardrail hook in this
environment exists to block. The issue-side comment is the only mechanism that works in every
case, so it's the one this skill actually relies on for cross-repo links.

**Does this ever bypass the private-repo-name guardrail hook?**

No. The bonus PR-body mention (cross-repo case) goes through the hook like any other `gh pr edit`
— if it's blocked, that's expected and fine, since the required issue-side comment already
succeeded independently of it.

## It's working if

- A same-repo PR merges and its issue closes automatically, with no manual `gh issue close` needed.
- A cross-repo PR's issue has a comment referencing the PR, regardless of either repo's visibility.
- A ticket-less branch is reported as out of scope, never forced into a fabricated link.

## Where it fits

```txt
create-pr (Step 6b) -> link-pr-to-issue -> (later) check-pr-link verifies it stuck
```

`check-pr-link` reuses this skill's issue-resolution step rather than re-deriving it — if that
resolution logic ever needs to change, it changes here, once.
