---
name: respond-pr-review
description: Respond to an existing Copilot PR review in any repository as the branch owner's assistant. Gathers every thread, triages each one, replies inline before fixing, batches valid fixes into one commit, posts SHA follow-ups, and leaves resolution to the branch owner. Use when asked to "respond pr review <N>", "address Copilot review", or work through open PR review threads.
---

# Respond PR Review

Use this when a PR already has Copilot review threads and the job is to respond and fix them, not to perform the initial review.

If your project has an org-specific variant of this skill that preloads custom standards, use that instead.

## Arguments

`/respond-pr-review <N>` — PR number. Required. Ask if omitted. `/respond-pr-review <N> <owner>/<repo>` — if the repo cannot be inferred from context.

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

If the repo has a custom PR review skill with its own standards loading, stop and switch to that instead.

### 2. Verify the branch

```sh
gh pr view <N> --repo <owner>/<repo> --json headRefName,headRefOid,baseRefName
git branch --show-current
```

The `baseRefName` field gives `<base-branch>` for use in the conflict resolution section.

If the current branch is not the PR branch, switch to it before editing.

### 2b. Check merge state and CI

This step is **mandatory**. Merge conflicts and CI failures have different blocking behaviors:

- **Merge conflicts** (`mergeable: CONFLICTING` or `mergeStateStatus: DIRTY`) — block everything. Resolve before proceeding to step 3.
- **CI failures** — allow proceeding to gather threads. Diagnose and capture logs first, then include the CI fix in the step 6 batch commit.

```sh
gh pr view <N> --repo <owner>/<repo> --json mergeable,mergeStateStatus
gh pr checks <N> --repo <owner>/<repo>
```

> **Important:** A clean local working tree (`git status` showing nothing to commit) does **not** mean the branch is conflict-free with `main`. It only means the branch has no uncommitted local changes. Always trust the API response: if `mergeable` is `CONFLICTING` or `mergeStateStatus` is `DIRTY`, real merge conflicts exist and must be resolved — even when `git status` shows clean.

**If `mergeable` is `CONFLICTING` or `mergeStateStatus` is `DIRTY`:**

Resolve all conflicts before doing anything else. Switch to the PR branch and merge the base:

```sh
git checkout <pr-branch>
git fetch origin
git merge origin/<base-branch> --no-commit --no-ff
```

Resolve each conflicting file using the following strategy:

| File type | Resolution strategy |
| --- | --- |
| Generated/vendored artifacts (`.yalc/`, `dist/`, `package-lock.json`) | `git checkout --theirs <file>` — always take base branch (latest build) |
| Data files (`*.json`, `*.csv`) | Read both sides carefully; preserve all new entries from both HEAD and base — never discard either side's additions |
| Source files (`*.ts`, `*.tsx`, `*.md`) | Manual merge — read conflict sections, apply both sets of meaningful changes |

After resolving:

```sh
git add -A
git commit -m "chore: merge <base-branch> — resolve conflicts before PR review response"
git push origin <pr-branch>
```

Note the merge commit SHA. Include it in your report to the branch owner.

**If any CI check is failing:**

Read the failing output before touching any code:

```sh
gh run list --repo <owner>/<repo> --branch <pr-branch> --limit 5
gh run view <run-id> --log-failed --repo <owner>/<repo>
```

Diagnose the root cause, then proceed to gather review threads (step 3). Include the CI fix in the step 6 batch commit together with the valid review fixes. CI must be green before handing back to the branch owner.

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

After running these commands, build a deduplication index from your own replies:

- **Acknowledged threads**: any thread where your account already has an inline reply (look for your login in `in_reply_to_id` reply chains, or as the root comment author). Step 5 must skip these — do not post a second verdict reply.
- **SHA-replied threads**: any thread where one of your existing replies contains `"Fixed in "` or `"Deferred"`. Step 7 must skip these — do not post a second SHA follow-up.

Triage and code fixes are always idempotent and must never be skipped. Only the reply steps (5 and 7) are gated by this check.

### 4. Triage each thread

Assign one verdict per thread:

- `✅ Valid` — fix it in the batch commit
- `❌ Not valid` — explain why the concern does not apply
- `⚠️ Partially valid` — fix the valid part, reject the wrong part
- `⏸️ Needs branch owner input` — missing business context; do not guess
- `⏭️ Valid but deferred` — real issue, but out of scope for this PR; open an issue and link it

Security and WCAG comments are treated as valid unless you have a specific technical reason they are false positives.

### 5. Reply inline before fixing

Every thread gets a reply in the same thread before any code change — **unless you already have a reply in that thread**. Before posting, check the acknowledged set from Step 3: if your account has any existing reply in the thread, skip this step for that thread. Do not post a second verdict reply.

For threads with no existing reply from you, use the nested reply endpoint. Do not use a tool or command that creates a top-level review instead of replying inside the thread.

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

If a thread includes a GitHub suggested change block, explicitly accept it into the batch fix or reject it in-thread. Never ignore suggested changes silently. When a suggestion is present, the verdict reply must include the accept/reject declaration:

```text
✅ Valid. <why it matters>. Accepting Copilot suggestion verbatim.

⚠️ Partially valid. <what is right> but <what is overstated or incorrect>. Rejecting suggestion — fixing with <alternative> because <reason>.
```

If a deferred thread is valid, open the issue first, then post the `⏭️` reply with the issue link.

### 5b. Record a suggestion disposition for every suggested-change thread

This step is **mandatory** and runs before the Step 6 batch fix and the Step 7 SHA follow-up.

For each thread that contains a GitHub suggested change block:

- **Option A (Accept):** apply the exact suggested diff to the file verbatim. In the ack reply, state: "Accepting Copilot suggestion verbatim."
- **Option B (Reject):** do NOT apply the suggestion. In the ack reply, state why: "Rejecting suggestion — fixing with [alternative] because [reason]."
- Never write a custom fix for a thread that has a suggestion without first recording Option A or B.
- Do not proceed to the SHA follow-up reply for a thread until its suggestion disposition is recorded.

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

After the push, reply to every fixed thread with the short SHA — **unless you already posted a SHA follow-up for that thread**. Before posting, check the SHA-replied set from Step 3: if your account already has a `"Fixed in"` or `"Deferred"` reply in the thread, skip it.

For threads without an existing SHA reply:

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

A thread becomes outdated when a new commit shifts the diff position of the lines it referenced. GitHub collapses outdated threads in the UI with an "Outdated" badge, and the `line` field on the comment is `null`.

**Outdated threads are fully replyable inline.** The `POST .../pulls/comments/<id>/replies` endpoint works normally for outdated threads — no fallback to top-level PR comments is needed. Reply using Steps 5 and 7 exactly as you would for any active thread.

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
