---
name: respond-pr-review
description: Respond to an existing Copilot PR review in any repository as the branch owner's assistant. Gathers every thread, triages each one, replies inline before fixing, batches valid fixes into one commit, posts SHA follow-ups, and leaves resolution to the branch owner. Use when asked to "respond pr review <N>", "address Copilot review", or work through open PR review threads outside the LittleBranches repos.
---

# Respond PR Review

Use this when a PR already has Copilot review threads and the job is to respond and fix them, not to perform the initial review.

Use `/respond-giselle-pr-review` instead when working in a LittleBranches repository that should preload the public and private AGENTS.md barrels.

## Arguments

`/respond-pr-review <N>` — PR number. Required. Ask if omitted.
`/respond-pr-review <N> <owner>/<repo>` — if the repo cannot be inferred from context.

---

## Process

### 1. Identify the repo and load the response workflow

Start by identifying the repo and finding the standards/workflow docs that govern PR review response in that codebase.

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

Look in this order:

1. `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`
2. Review workflow docs under `docs/`, `specs/`, or `.scratch/`
3. If nothing explicit exists: fall back to the response pattern in this skill

If the repo is a LittleBranches repo, stop and switch to `/respond-giselle-pr-review` instead.

### 2. Verify the branch

```sh
gh pr view <N> --repo <owner>/<repo> --json headRefName,headRefOid
git branch --show-current
```

If the current branch is not the PR branch, switch to it before editing.

### 3. Gather every existing review thread first

Do not answer any comment until you have read all of them.

```sh
gh api --paginate /repos/<owner>/<repo>/pulls/<N>/comments --jq \
  '[.[] | {id, path, line, body: .body, user: .user.login}] | sort_by(.path, .line)'
```

Also gather your own existing replies and top-level PR comments so the session does not lose track of prior commitments:

```sh
AUTHOR=$(gh api user --jq '.login')

gh api repos/<owner>/<repo>/pulls/<N>/comments --paginate \
  --jq ".[] | select(.user.login == \"$AUTHOR\")"

gh api repos/<owner>/<repo>/issues/<N>/comments --paginate \
  --jq ".[] | select(.user.login == \"$AUTHOR\")"
```

### 4. Triage each thread

Assign one verdict per thread:

- `✅ Valid` — fix it in the batch commit
- `❌ Not valid` — explain why the concern does not apply
- `⚠️ Partially valid` — fix the valid part, reject the wrong part
- `⏸️ Needs branch owner input` — missing business context; do not guess
- `⏭️ Valid but deferred` — real issue, but out of scope for this PR; open an issue and link it

Security and WCAG comments are treated as valid unless you have a specific technical reason they are false positives.

### 5. Reply inline before fixing

Every thread gets a reply in the same thread before any code change.

For thread replies, use the nested reply endpoint. Do not use a tool or command that creates a top-level review instead of replying inside the thread.

```sh
gh api --method POST \
  /repos/<owner>/<repo>/pulls/comments/<comment-id>/replies \
  -f body="<response>"
```

Never use a general PR review submission API for these acknowledgements. Those create top-level reviews and break the thread-by-thread workflow.

Use these formats:

```text
✅ Valid. <why it matters>. Will fix in the batch commit — <what will change>.

❌ Not valid. <why the concern does not apply>. <what the code is doing instead, if needed>.

⚠️ Partially valid. <what is right> but <what is overstated or incorrect>. Will fix <the actual issue>.

⏸️ Needs branch owner input. <what context is missing and what decision depends on it>.

⏭️ Valid but deferred. <why it cannot be done in this PR>. Tracked in #<issue-number>.
```

If a deferred thread is valid, open the issue first, then post the `⏭️` reply with the issue link.

### 6. Fix all valid items in one batch

Collect every `✅` and the valid portion of every `⚠️`, then fix them in one working session.

Right before pushing, run the repo quality gate, commit once, and push once:

```sh
git add -A
git commit -m "fix: address PR #<N> Copilot review comments"
git push origin <branch>
```

The fix commit should be a single batch commit that covers all valid threads.

### 7. Post follow-up SHA replies

After the push, reply to every fixed thread with the short SHA:

```sh
gh api --method POST \
  /repos/<owner>/<repo>/pulls/comments/<comment-id>/replies \
  -f body="Fixed in <sha7> — <one sentence describing exactly what changed>."
```

If the thread was deferred, confirm the issue link instead of a commit SHA.

### 8. Leave resolution to the branch owner

Do not resolve threads yourself. The branch owner verifies the fixes, resolves threads manually, and decides whether to re-request Copilot review.

If the fix batch changed the PR scope, update the PR description before handing back.

### 9. Edge cases

#### Outdated threads (line: null)

Before attempting any reply, check whether the threads from a given review are outdated:

```sh
gh api repos/<owner>/<repo>/pulls/<N>/reviews/<review-id>/comments \
  --jq '[.[] | {id, line, path}]'
```

If any thread has `"line": null`, GitHub has marked it outdated — the diff positions it referenced changed after a new commit or merge commit was pushed onto the branch. The reply endpoint (`POST .../pulls/comments/<id>/replies`) returns `404` for all outdated threads and cannot be used.

**Surface this to the branch owner before proceeding:**

> "N threads from review `<review-id>` are outdated — GitHub shifted their diff positions after `<commit-sha>` was pushed. The standard pre-fix and post-fix inline replies are not possible for these threads. I can apply all fixes and post a structured top-level summary comment mapping each thread to its fix and the SHA. Proceed?"

If confirmed:

1. Skip Steps 5 and 7 for outdated threads — inline replies are technically impossible.
2. Apply all fixes normally (Step 6).
3. Post a single top-level PR comment after the push:

```sh
gh pr comment <N> --repo <owner>/<repo> --body "## Copilot review — fixed at \`<sha>\`

All N threads from review \`<review-id>\` are addressed below. The threads are outdated (diff positions changed after \`<merge-commit>\`) so inline replies are not possible — fixes are documented here.

| Thread | File | Issue | Fix |
|---|---|---|---|
| <id> | <path> | <one-line summary> | <what changed> |
..."
```

This replaces both the pre-fix acknowledgement and the post-fix SHA reply for the affected threads. Non-outdated threads from the same PR should still receive standard inline replies.

#### Top-level comments only

If the PR only has top-level comments and no line-thread comments, reply with:

```sh
gh pr comment <N> --body "<response>"
```

#### No threads

If Copilot review failed and there are no threads, tell the branch owner and ask whether to re-request review or run a manual review pass instead.

## Output

Report back with:

- triage summary: counts for `✅`, `❌`, `⚠️`, `⏸️`, `⏭️`
- the fix commit SHA
- any deferred issue links
- whether the PR description was updated
- explicit note that threads remain unresolved for branch-owner sign-off
