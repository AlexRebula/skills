---
name: respond-giselle-pr-review
description: Respond to an existing Copilot PR review in a LittleBranches repository as the branch owner's assistant. Pre-loads the public and private AGENTS.md barrels plus the oss-quality-standards PR review workflow, triages every thread, replies inline before fixing, batches valid fixes into one commit, posts SHA follow-ups, and leaves resolution to the branch owner. Use instead of /respond-pr-review when working in giselle-mui, giselle-ui, giselle-sections-sdk, first-branch, or other LittleBranches repos.
---

# Respond Giselle PR Review

Same thread-response workflow as `/respond-pr-review`, with one key difference: standards and review-response rules are pre-loaded from LittleBranches OSS Quality Standards instead of being discovered dynamically.

Use this skill for any LittleBranches repository. Use `/respond-pr-review` for all other repos.

## Arguments

`/respond-giselle-pr-review <N>` — PR number. Required. Ask if omitted.
`/respond-giselle-pr-review <N> <owner>/<repo>` — if the repo cannot be inferred from context.
`/respond-giselle-pr-review <N> --standards-url <url>` — load standards from a custom raw URL instead of the default LittleBranches AGENTS.md.

---

## Process

### 1. Load the standards and workflow first

Always load these before reading any thread.

**If `--standards-url` was provided:** Fetch that URL for the public barrel. Skip the private barrel unconditionally — the caller supplied their own standards source. Also load the workflow doc:

```
Public:   <standards-url>
Workflow: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/pr-review-workflow.md
```

**Default flow (no `--standards-url`):** Use the LittleBranches defaults below.

```
Public:   https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md
Workflow: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/pr-review-workflow.md
```

For the private AGENTS.md, use the authenticated `gh` CLI to fetch via the GitHub Contents API.
`fetch_webpage` will always 404 — the repo is private and raw.githubusercontent.com requires auth.

```sh
gh api repos/LittleBranches/oss-quality-standards-private/contents/AGENTS.md \
  --jq '.content | @base64d'
```

This works on any machine where `gh` is authenticated. No hardcoded paths.
Only skip the private barrel if `gh` itself returns a permission error — and if so, note explicitly
that banned-content and encryption rules were not checked.

### 2. Identify the repo and verify the branch

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
gh pr view <N> --repo <owner>/<repo> --json headRefName,headRefOid
git branch --show-current
```

If the current branch is not the PR branch, switch to it before editing.

### 3. Gather every review thread first

Do not answer any comment until you have read all of them.

```sh
gh api --paginate /repos/<owner>/<repo>/pulls/<N>/comments --jq \
  '[.[] | {id, path, line, body: .body, user: .user.login}] | sort_by(.path, .line)'
```

Also gather your own existing inline replies and top-level PR comments so close-out tracking does not miss earlier commitments:

```sh
AUTHOR=$(gh api user --jq '.login')

# Inline PR review comments (diff threads)
gh api repos/<owner>/<repo>/pulls/<N>/comments --paginate \
  --jq ".[] | select(.user.login == \"$AUTHOR\")"

# Top-level PR discussion comments
gh api repos/<owner>/<repo>/issues/<N>/comments --paginate \
  --jq ".[] | select(.user.login == \"$AUTHOR\")"
```

Do not skip `--paginate`; large PRs can silently omit older comments without it.

### 4. Triage each thread

Assign one verdict per thread:

- `✅ Valid` — fix it in the batch commit
- `❌ Not valid` — explain why the concern does not apply
- `⚠️ Partially valid` — fix the valid part, reject the wrong part
- `⏸️ Needs branch owner input` — missing business context; do not guess
- `⏭️ Valid but deferred` — real issue, but out of scope for this PR; open an issue and link it

Security and WCAG comments are treated as valid unless you have a specific technical reason they are false positives.

### 5. Reply inline before fixing

Every thread gets a reply in the same thread before any code change:

```sh
gh api --method POST \
  /repos/<owner>/<repo>/pulls/comments/<comment-id>/replies \
  -f body="<response>"
```

This nested reply endpoint is mandatory. Never use a top-level review tool or API for thread replies. In this workflow, a general review API call is wrong because it posts in the main PR conversation instead of under the original diff thread.

Use these formats:

```text
✅ Valid. <one sentence confirming the issue and why it matters>. Fixing: <what will change>.

❌ Not valid. <one sentence explaining why the concern does not apply>. <what the code is actually doing, if needed>.

⚠️ Partially valid. <what is right> but <what is overstated or incorrect>. Fixing: <the actual issue>.

⏸️ Needs branch owner input. <what context is missing and what decision depends on it>.

⏭️ Valid but deferred. <why it cannot be done in this PR>. Tracked in #<issue-number>.
```

If a thread includes a GitHub suggested change block, explicitly accept it into the batch fix or reject it in-thread. Never ignore suggested changes silently.

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
  -f body="Fixed in <sha7>: <one sentence describing exactly what changed>."
```

If the thread was deferred, confirm the issue link instead of a commit SHA.

### 8. Close-out audit for your own commitments

Before handing back to the user, scan every reply posted under your account in this session and look for commitment signals:

- `will`
- `follow-up` / `follow up`
- `separate issue` / `track` / `open an issue`
- `fix in this PR`

For every such reply, verify a matching artifact exists:

| Commitment type                | Required artifact                                              |
| ------------------------------ | -------------------------------------------------------------- |
| fix in this PR                 | Commit SHA posted as follow-up reply in the same thread        |
| open an issue / separate issue | GitHub issue opened; issue link posted as follow-up reply      |
| update the PR description      | PR description updated; confirmation posted as follow-up reply |
| extract / follow-up PR         | GitHub issue opened; issue link posted as follow-up reply      |

If any artifact is missing, create it before reporting back.

### 9. Leave resolution to the branch owner

Do not resolve threads yourself. The branch owner verifies the fixes, resolves threads manually, and decides whether to re-request Copilot review.

If the fix batch changed the PR scope, update the PR description before handing back.

### 10. Edge cases

If the thread reply endpoint returns `404`, stop and tell the branch owner before falling back to a top-level PR comment.

If the PR only has top-level comments and no line-thread comments, reply with:

```sh
gh pr comment <N> --body "<response>"
```

If Copilot review failed and there are no threads, tell the branch owner and ask whether to re-request review or run a manual `review-giselle-pr` pass instead.

## Output

Report back with:

- triage summary: counts for `✅`, `❌`, `⚠️`, `⏸️`, `⏭️`
- the fix commit SHA
- any deferred issue links
- whether the PR description was updated
- explicit note that threads remain unresolved for branch-owner sign-off
