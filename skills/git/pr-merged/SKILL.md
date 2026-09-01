---
name: pr-merged
description: Post-merge cleanup for one PR you've already merged on GitHub and whose remote branch you've already deleted. Verifies the PR actually shows MERGED, closes any linked issue with a summary comment (if not already closed with one), deletes the local branch (and its worktree, if any), prunes the remote-tracking ref, and fast-forwards the base branch if it's checked out. Use when told something like "pr <N> merged, remote branch deleted, cleanup locally", "PR <N> merged and branch deleted, clean up locally", or via "/pr-merged <N>". This is the same routine as create-pr's own Step 8 (post-merge cleanup), extracted so it can be triggered standalone, in a fresh session, without create-pr having opened the PR earlier in the same conversation.
argument-hint: '<PR-number> [<owner>/<repo>]'
---

# PR Merged — Post-Merge Cleanup

Runs after you've already merged a PR on GitHub's side and deleted its remote branch yourself. This skill only does the _local_ half: verify, close the linked issue, delete the local branch/worktree, prune the stale remote-tracking ref, fast-forward the base branch.

`create-pr`'s own Step 8 delegates to this skill rather than duplicating this logic — if you're editing the cleanup routine, edit it here, not there.

---

## Arguments

`/pr-merged <PR-number>`: repo inferred from conversation context (a PR/branch discussed earlier in this session) or from the current working directory's git remote, if unambiguous. `/pr-merged <PR-number> <owner>/<repo>`: explicit repo — use when it can't be inferred, or to be unambiguous in a multi-repo session.

If invoked via the trigger phrase (not the explicit slash form) and no PR number is stated, ask for it — never guess a PR number.

---

## Step 1: Identify the PR and repo

If `<owner>/<repo>` was passed explicitly, use it. Otherwise, try to infer it:

1. Check the current working directory: `git remote get-url origin` (parse `owner/repo` out of the URL).
2. Check recent conversation context for a repo this PR number was discussed against.

If both are silent or conflict, ask:

> "Which repo is PR #<N> in? (owner/repo)"

Do not guess between two candidate repos.

---

## Step 2: Verify merged (mandatory — do not skip)

```sh
gh pr view <N> --repo <owner>/<repo> --json state,mergedAt,headRefName,title,body,baseRefName
```

**Do not proceed past this point on an unconfirmed claim.** If `state` is not `MERGED`, stop and tell the user what the actual state is (`OPEN`, `CLOSED` without merging, or not found) — do not perform any of the steps below.

Save `headRefName` (the branch) and `baseRefName` (the base) for the rest of this skill.

---

## Step 3: Close the linked issue(s) with a summary comment

Scan the PR's `title` and `body` for an issue reference: `Closes #N`, `Fixes #N`, `Resolves #N`, or an explicit "Parent"/ticket link.

If no reference is found, skip this step silently — not every PR closes an issue.

If a reference is found:

```sh
gh issue view <N> --repo <owner>/<repo> --json state,comments
```

- **If the issue is already closed with a substantive comment** (mentions the PR, summarises what shipped): nothing to do.
- **If the issue is already closed but with no comment, or only GitHub's own auto-close event**: add one now.
- **If the issue is still open** (the `Closes #N` syntax didn't fire, e.g. it was in a commit message rather than the PR body): close it explicitly.

```sh
gh issue close <N> --repo <owner>/<repo> --comment "<one or two sentences: what shipped, link to PR #<N>>"
```

---

## Step 4: Clean up the branch and worktree

Check whether the branch lives in a dedicated worktree:

```sh
git worktree list | grep <headRefName>
```

**If it's the currently checked-out branch** in the repo you're operating in: switch to the base branch first (`git checkout <baseRefName>`) — you cannot delete a branch you're standing on.

**If it lived in a worktree:**

```sh
git worktree remove <worktree-path>
```

**Delete the local branch:**

```sh
git branch -d <headRefName>
```

Use `-d` (safe delete, refuses if unmerged), never `-D`, unless `git branch -d` refuses _and_ you've independently confirmed via Step 2 that the PR really did merge (in which case the safe-delete check is almost certainly confused by a squash-merge rewriting history — confirm this reasoning explicitly to the user before falling back to `-D`, don't do it silently).

If the branch doesn't exist locally at all (already cleaned up, or this session never had it checked out), skip this step — not an error.

---

## Step 5: Prune the remote-tracking ref

The remote branch is already gone (deleted by the user before invoking this skill) — clean up the now-stale local reference to it:

```sh
git fetch origin --prune
```

---

## Step 6: Fast-forward the base branch

If `<baseRefName>` is checked out locally (including just now, from Step 4's switch):

```sh
git pull --ff-only origin <baseRefName>
```

Use `--ff-only`, never a regular pull/merge — if it's not a clean fast-forward, something unexpected has happened locally; stop and surface it rather than merging over it.

---

## Step 7: Report back

Report, concisely:

- PR state confirmed (`MERGED`, with merge date)
- Issue closed: number + link, or "no linked issue found"
- Branch/worktree deleted (or "already gone, nothing to clean up")
- Remote-tracking ref pruned
- Base branch fast-forwarded to `<sha>` (or "not checked out, skipped")

If this skill is invoked multiple times in one session (e.g. cleaning up several PRs in sequence, per the user's own workflow), each invocation is independent — run the full process again for the next PR number, don't assume repo/branch state carries over.
