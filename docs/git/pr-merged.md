## What it does

`pr-merged` runs the local half of closing out a PR after you've already merged it on GitHub and deleted its remote branch yourself: it verifies the PR actually shows `MERGED` (never acts on an unconfirmed claim), closes any issue the PR referenced with a summary comment if one isn't already there, deletes the local branch (and its worktree, if it lived in one), prunes the now-stale remote-tracking ref, and fast-forwards the base branch if it's checked out.

It exists as its own skill so it can be triggered standalone, in a fresh session, without `create-pr` having opened the PR earlier in the same conversation — the common case being you merge on GitHub after the session that opened the PR has already ended. [create-pr](./create-pr.md) points here once a PR it opened is confirmed merged, rather than inlining the same cleanup steps itself.

## When to reach for it

Say something like "PR 209 merged, remote branch deleted, cleanup locally" — the skill's own description is written to match that pattern directly. `/pr-merged <PR-number>` also works explicitly, with an optional `<owner>/<repo>` when the repo can't be inferred from the current directory or the conversation.

Reach for it any time you merge on GitHub outside of an active `create-pr` session — the common case being: you close your laptop mid-review, merge later in your own time, then come back and want the local repo caught up.

## Verify before doing anything else

The first and only mandatory step before any cleanup happens: `gh pr view <N> --json state,mergedAt,headRefName,title,body,baseRefName`. If `state` isn't `MERGED`, the skill stops and reports the actual state rather than guessing or proceeding on your word alone.

## Common questions

**Does this skill merge the PR for me?**

No. It only ever runs after a PR is already merged, and its first action is to verify that against GitHub directly. Neither this skill nor `create-pr` calls `gh pr merge` anywhere.

**What if the branch I'm deleting is the one currently checked out?**

The skill switches to the base branch first — you cannot delete a branch you're standing on. If the branch lived in a dedicated worktree, the worktree is removed too, not just the branch ref.

**What if `git branch -d` refuses to delete the branch?**

That's `-d`'s safe-delete check refusing an apparently-unmerged branch — usually a squash merge, whose commits never actually land in the base branch's history under their original SHAs. The skill confirms this reasoning with you explicitly before falling back to `-D`; it never force-deletes silently.

## It's working if

- Every cleanup step only ran after `gh pr view` genuinely showed `MERGED`.
- A PR whose linked issue was still open (or auto-closed with no summary) ends up with a substantive closing comment.
- The local branch and any dedicated worktree are gone, the stale remote-tracking ref is pruned, and the base branch is fast-forwarded if it was checked out.
- Running it again for a different PR number in the same session works independently — no state carried over from the previous invocation.

## Where it fits

```txt
create-pr -> (PR merged on GitHub, remote branch deleted) -> pr-merged
```

`create-pr` is where a PR starts; `pr-merged` is where it ends, once you've closed it out on GitHub's side. Keeping the cleanup routine in its own skill means there's one place to fix if it ever needs to change, rather than two copies drifting apart.
