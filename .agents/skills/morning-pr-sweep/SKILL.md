---
name: morning-pr-sweep
description: Clear all open PR review debt across your repos in one session. Discovers every open PR, triages ALL threads across ALL PRs before touching any code, batches fixes into one commit per PR, posts SHA confirmations, and reports which PRs are merge-ready. Replaces running /respond-giselle-pr-review N times with a single morning ritual that takes 20–30 minutes regardless of how many PRs are open.
---

# Morning PR Sweep

Run this at the start of each working day. Its job is simple: **no PR should leave the session with an unacknowledged review thread**. By the end of the sweep, every open thread has been triaged, replied to, fixed (if valid), and confirmed — leaving only the manual merge step for you.

The key difference from calling `/respond-giselle-pr-review` N times: all threads across all PRs are triaged **together, before any code is touched**. This means one context load, one standards load, one pass through all the code, one commit per PR. Not N context loads, N fix cycles, N pushes.

---

## ⚠️ Before you run this

**This skill makes real, public writes.** Understand what it does before you invoke it:

| Action | Scope | Visibility |
|---|---|---|
| Posts acknowledgement replies to open review threads | Per thread, before any fix | Public — visible to anyone with repo access |
| Pushes fix commits to the PR branch | Per PR, after fixes | Public — appears in the PR timeline |
| Posts SHA confirmation replies to every thread | Per thread, after push | Public — visible to anyone with repo access |

**This applies to both private and public repositories.** On a public repo, your replies are visible to the entire internet.

Do not run this skill:
- On PRs you are not authorised to respond to
- In repositories where AI-authored replies are unwelcome or against contribution guidelines
- Without reviewing the triage table in Phase 0e before confirming

The skill will always show a full impact table and wait for your explicit confirmation before posting anything (Phase 0e). You can stop at that point if the scope is not what you expected.

---

## Arguments

`/morning-pr-sweep` — sweeps all repos in the default list (see Phase 0).
`/morning-pr-sweep <owner>/<repo>` — sweeps a single repo only.
`/morning-pr-sweep --repos <owner>/<repo>,<owner>/<repo>` — sweeps a specific set of repos.

---

## Phase 0 — Discover

### 0a. Load the standards (once, before reading any PR)

```
Public:   https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md
Workflow: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/pr-review-workflow.md
```

Private AGENTS.md barrel — use the authenticated `gh` CLI:

```sh
gh api repos/LittleBranches/oss-quality-standards-private/contents/AGENTS.md \
  --jq '.content | @base64d'
```

Only skip this if `gh` returns a permission error — if so, note that banned-content and encryption rules were not checked.

### 0b. Build the repo list

If no repos were specified as arguments, discover them from the authenticated account:

```sh
gh repo list --limit 50 --json nameWithOwner,isPrivate \
  --jq '.[] | .nameWithOwner'
```

Scope to specific orgs by adding a filter — for example, to sweep only `MyOrg` repos:

```sh
--jq '.[] | select(.nameWithOwner | test("MyOrg"; "i")) | .nameWithOwner'
```

Include any additional repos explicitly passed as an argument.

### 0c. List open PRs

For each repo, list open PRs:

```sh
gh pr list --repo <owner>/<repo> --state open \
  --json number,title,headRefName,headRefOid,reviewDecision,isDraft \
  --jq '.[] | select(.isDraft == false)'
```

Skip draft PRs — they are not ready for morning sweep.

### 0d. Classify each PR

For each open, non-draft PR, determine its state:

```sh
# Check if any Copilot review threads exist
gh api --paginate /repos/<owner>/<repo>/pulls/<N>/comments \
  --jq '[.[] | select(.user.login | test("copilot|github-advanced-security"; "i"))] | length'
```

| State | Condition | What sweep does |
|---|---|---|
| `needs-response` | Copilot/bot review comments exist | Runs respond protocol (Phases 1–4) |
| `needs-review` | PR open but no review posted yet | Flags in report; skip |
| `merge-ready` | All threads already have your SHA reply | Reports for manual merge |
| `blocked` | CI failing, merge conflicts, or draft | Flags; skip |

### 0e. Show the discovery table — wait for confirmation

Present the full picture before doing anything:

```
MORNING PR SWEEP — 22 May 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Repo                             PR    State            Branch
MyOrg/repo-a                     #63   needs-response   feature/stat-card
MyOrg/repo-a                     #64   needs-response   feature/theme-preset
MyOrg/repo-b                     #12   needs-review     feature/admin-ui
MyOrg/repo-c                     #8    merge-ready      chore/pr-workflow

⚠️  WRITE IMPACT: Proceeding will post public replies to open threads in #63
    and #64, push fix commits to both branches, and post SHA confirmations.
    This is visible to all collaborators (and the public, if the repo is public).

Proceed? (yes / no / list only)
```

**`yes`** — proceed with full sweep.
**`no`** — abort. No writes made.
**`list only`** — print the triage table but make no writes. Useful for reviewing scope before committing.

Wait for explicit confirmation before proceeding.

---

## Phase 1 — Unified triage

This is the most important phase. Do not touch any file until it is complete.

### 1a. Read every thread in every needs-response PR

For each PR in the `needs-response` list:

```sh
gh api --paginate /repos/<owner>/<repo>/pulls/<N>/comments --jq \
  '[.[] | {id, path, line, body: .body, user: .user.login, pr: "<N>", repo: "<owner>/<repo>"}] | sort_by(.path, .line)'
```

Also read your own existing replies to avoid re-replying:

```sh
AUTHOR=$(gh api user --jq '.login')
gh api repos/<owner>/<repo>/pulls/<N>/comments --paginate \
  --jq ".[] | select(.user.login == \"$AUTHOR\")"
```

Do not skip `--paginate` — large PRs silently omit older comments without it.

### 1b. Build the combined triage table

One table across all PRs. Assign a verdict to every unresponded thread:

- `✅ Valid` — fix it
- `❌ Not valid` — explain why
- `⚠️ Partially valid` — fix the valid part, reject the wrong part
- `⏸️ Needs branch owner input` — missing context; do not guess
- `⏭️ Valid but deferred` — real issue, out of scope; will open a tracking issue

Security and WCAG comments are always valid unless you have a specific technical reason they are false positives.

Example output:

```
TRIAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PR    File                                  Line  Verdict              Summary
#63   src/components/stat/stat.styles.ts    42    ✅ Valid             extract sx factory → styles file
#63   src/components/stat/types.ts          8     ❌ Not valid         interface in types.ts is correct per §3.1
#64   src/components/theme/preset.ts        17    ✅ Valid             use theme.vars.palette, not theme.palette
#64   src/components/theme/preset.ts        31    ⚠️ Partially valid   rename is wrong, but the null guard is missing

Awaiting your approval before replying or fixing anything.
```

Wait for triage approval.

---

## Phase 2 — Reply in-thread before fixing (all PRs)

For every thread in the triage table — in the order they appear — post a pre-fix reply using the nested reply endpoint:

```sh
gh api --method POST \
  /repos/<owner>/<repo>/pulls/comments/<comment-id>/replies \
  -f body="<response>"
```

**Never** use a top-level review API for thread replies. That posts in the main PR conversation instead of the diff thread.

Reply formats:

```text
✅ Valid. <one sentence confirming why it matters>. Fixing: <what will change>.

❌ Not valid. <one sentence explaining why>. <what the code actually does, if needed>.

⚠️ Partially valid. <what is right> but <what is wrong>. Fixing: <the actual issue only>.

⏸️ Needs branch owner input. <what context is missing and what decision it affects>.

⏭️ Valid but deferred. <why it cannot land in this PR>. Tracked in #<issue-number>.
```

For `⏭️` threads: open the tracking issue first, then reply with the issue link.

Handle GitHub suggested change blocks explicitly — accept them into the fix batch or reject them in-thread. Never silently skip a suggested change.

---

## Phase 3 — Batch fix (one commit per PR)

Group all `✅` and `⚠️` fixes by PR. Fix one PR at a time, all changes in one working pass.

Before each commit, run the repo's quality gate:

```sh
npm run check:verify
```

Commit once per PR:

```sh
git add -A
git commit -m "fix: address PR #<N> Copilot review comments"
git push origin <branch>
```

**One commit per PR. Not one commit per fix.** If the quality gate fails, fix the gate failure in the same commit — do not push a partial fix.

Switch branches between PRs as needed:

```sh
git checkout <branch-for-next-pr>
```

---

## Phase 4 — SHA confirmations (all threads)

After each push, reply to every fixed thread with the commit SHA:

```sh
gh api --method POST \
  /repos/<owner>/<repo>/pulls/comments/<comment-id>/replies \
  -f body="Fixed in <sha7>: <one sentence describing exactly what changed>."
```

For deferred threads, post the issue link instead of a SHA.

---

## Phase 5 — Close-out audit

Before reporting, scan every reply posted under your account in this session for unresolved commitment signals:

- `will` / `fix` / `fixing`
- `follow-up` / `open an issue` / `track`
- `extract` / `separate PR`

For each signal, verify the artifact exists:

| Commitment | Required artifact |
|---|---|
| Fix in this PR | Commit SHA posted in thread |
| Open a tracking issue | Issue opened and link posted |
| Update PR description | PR description updated |

If any artifact is missing, create it now.

---

## Phase 6 — Morning report

Print the final status table:

```
MORNING PR SWEEP — COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Repo                          PR    Status          Threads  Commit    Action
MyOrg/repo-a                  #63   ✅ merge-ready  3/3      a1b2c3d   Resolve threads + merge in GitHub
MyOrg/repo-a                  #64   ✅ merge-ready  2/2      e4f5g6h   Resolve threads + merge in GitHub
MyOrg/repo-b                  #12   ⏸️ no review    —        —         Waiting for Copilot review to appear
MyOrg/repo-c                  #8    ✅ merge-ready  0/0      —         Ready to merge

NEXT STEP: Go to GitHub UI → resolve threads → merge PRs #63 and #64.
Then return here to start fresh work.
```

**Leave thread resolution and merging to the branch owner.** Do not call any merge or resolve API.

---

## Edge cases

**Thread reply returns 404:** Stop immediately. Report to the user before trying any fallback. Do not silently fall back to a top-level PR comment.

**CI is failing on a PR marked needs-response:** Note it in the report as `⚠️ CI failing`. Still process review threads, but flag that the PR cannot merge until CI is green.

**No open PRs found:** Report clearly: "No open PRs found across [repos]. Nothing to sweep." Do not error out.

**Quality gate fails after fix:** Do not push. Fix the gate failure in the same pass and include it in the batch commit. If the gate failure is unrelated to the review comments, note it in the SHA reply: "Fixed in <sha7>: [review fix]. Note: also fixed pre-existing Prettier violation in same file."
