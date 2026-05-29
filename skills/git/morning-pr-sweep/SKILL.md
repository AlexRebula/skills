---
name: morning-pr-sweep
description: Clear all open PR review debt across your repos in one session. Discovers every open PR, triages ALL threads across ALL PRs before touching any code, batches fixes into one commit per PR, posts SHA confirmations, and reports which PRs are merge-ready. Replaces running /respond-giselle-pr-review N times with a single morning ritual that takes 20–30 minutes regardless of how many PRs are open.
---

# Morning PR Sweep

Run this at the start of each working day. Its job is simple: **no PR should leave the session with an unacknowledged review thread**. By the end of the sweep, every open thread has been triaged, replied to, fixed (if valid), and confirmed — leaving only the manual merge step for you.

The key difference from calling `/respond-pr-review` (or `/respond-giselle-pr-review` for LittleBranches repos) N times: all threads across all PRs are triaged **together, before any code is touched**. This means one context load, one standards load, one pass through all the code, one commit per PR. Not N context loads, N fix cycles, N pushes.

---

## ⚠️ Before you run this

**This skill makes real, public writes.** Understand what it does before you invoke it:

| Action | Scope | Visibility |
| --- | --- | --- |
| Posts acknowledgement replies to open review threads | Per thread, before any fix | Public — visible to anyone with repo access |
| Pushes fix commits to the PR branch | Per PR, after fixes | Public — appears in the PR timeline |
| Posts SHA confirmation replies to every thread | Per thread, after push | Public — visible to anyone with repo access |

**This applies to both private and public repositories.** On a public repo, your replies are visible to the entire internet.

Do not run this skill:

- On PRs you are not authorised to respond to
- In repositories where AI-authored replies are unwelcome or against contribution guidelines
- Without reviewing the discovery table in Phase 0e before confirming

The skill always shows a full impact table and waits for your explicit confirmation before posting anything (Phase 0e). You can stop at that point if the scope is not what you expected.

---

## Arguments

`/morning-pr-sweep` — discovers and sweeps all repos owned by the authenticated GitHub user. `/morning-pr-sweep <owner>/<repo>` — sweeps a single repo only. `/morning-pr-sweep --repos <owner>/<repo>,<owner>/<repo>` — sweeps a specific set of repos. `/morning-pr-sweep --orgs <org1>,<org2>` — sweeps all repos in the specified orgs instead of the authenticated user's repos. `/morning-pr-sweep --standards-url <url>` — loads a shared standards file (AGENTS.md) for all repos in the sweep instead of per-repo discovery.

---

## Phase 0 — Discover

### 0a. Load the standards _(if available)_

Check whether each target repo carries an `AGENTS.md` at its root:

```sh
gh api repos/<owner>/<repo>/contents/AGENTS.md --jq '.name' 2>/dev/null
```

- **Found:** fetch the full file and load its rules for that repo's PR reviews.
- **Not found:** proceed without standards. Note in the report that no standards file was found for this repo.

**Override:** Pass `--standards-url <url>` to load a shared standards file for all repos in the sweep — useful when your org maintains a central AGENTS.md. This overrides per-repo discovery.

> **LittleBranches contributors:** Your standards are at: `https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md` Pass this as `--standards-url` or ensure each repo's `AGENTS.md` references it.

### 0b. Build the repo list

If no repos were specified as arguments, discover repos:

- If `--orgs <org1>,<org2>` was passed: list repos for each specified org.
- Otherwise: list repos for the current authenticated GitHub user.

```sh
gh repo list --limit 200 --json nameWithOwner,isPrivate \
  --jq '.[] | "\(.nameWithOwner) (\(if .isPrivate then "private" else "public" end))"'
```

> **Scoping to specific orgs:** If you want to limit discovery to certain organisations, add a `select` filter:
>
> ```sh
> gh repo list --limit 200 --json nameWithOwner,isPrivate \
>   --jq '.[] | select(.nameWithOwner | startswith("MyOrg/")) | "\(.nameWithOwner) (\(if .isPrivate then "private" else "public" end))"'
> ```
>
> Replace `MyOrg` with your organisation name. For multiple orgs use `test("(?i)(Org1|Org2)")`.

Include any repo explicitly passed as a `--repos` argument.

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
# For each bot review comment, check if the author has already replied with a SHA
gh api --paginate repos/<owner>/<repo>/pulls/<N>/comments \
  --jq '
    [.[] | select(.user.login | test("copilot|github-advanced-security"; "i"))] as $bot |
    if ($bot | length) == 0 then "no-bot-threads"
    else
      ($bot | map(.id) | map(
        . as $id |
        # a thread is handled when a non-bot reply containing a 7-char hex SHA exists
        [$bot[] | select(.id == $id or .in_reply_to_id == $id)] |
        any(.user.login | test("copilot|github-advanced-security"; "i") | not) and
        any(.body | test("[0-9a-f]{7}"; "i"))
      ) | all) |
      if . then "merge-ready" else "needs-response" end
    end'
```

| State | Condition | What sweep does |
| --- | --- | --- |
| `needs-response` | Bot review threads exist with no author SHA reply | Runs respond protocol (Phases 1–4) |
| `needs-review` | PR open but no review posted yet | Flags in report; skip |
| `merge-ready` | Every bot thread has an author reply containing a commit SHA | Reports for manual merge |
| `blocked` | CI failing, merge conflicts, or draft | Flags; skip |

### 0e. Show the discovery table — wait for confirmation

Present the full picture before doing anything:

```
MORNING PR SWEEP — 22 May 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Repo                             Vis      PR    State            Branch
MyOrg/repo-a                     public   #63   needs-response   feature/stat-card
MyOrg/repo-a                     public   #64   needs-response   feature/theme-preset
MyOrg/repo-b                     private  #12   needs-review     feature/admin-ui
MyOrg/repo-c                     public   #8    merge-ready      chore/pr-workflow

⚠️  WRITE IMPACT: Proceeding will post public replies to open threads in #63
    and #64, push fix commits to both branches, and post SHA confirmations.
    This is visible to all collaborators (and the public, if the repo is public).

Proceed? (yes / no / list only)
```

**`yes`** — proceed with full sweep. **`no`** — abort. No writes made. **`list only`** — print the discovery table but make no writes. Useful for reviewing scope before committing.

Wait for explicit confirmation before proceeding.

**If the user answers `list only`: stop here.** Print the discovery table and make no further writes. Do not proceed to Phase 1, 2, 3, or 4.

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

Before each commit, run the repo's quality gate. Discover it first:

1. Check the repo's `AGENTS.md` for a `quality gate` or `check` command.
2. If `package.json` exists and defines `check:verify` or `check`, use that.
3. Fallback for non-Node repos: look for a `Makefile` target named `check`, `lint`, or `test`.

For Node/npm repos the command is typically:

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

| Commitment            | Required artifact            |
| --------------------- | ---------------------------- |
| Fix in this PR        | Commit SHA posted in thread  |
| Open a tracking issue | Issue opened and link posted |
| Update PR description | PR description updated       |

If any artifact is missing, create it now.

---

## Phase 6 — Morning report

Print the final status table:

```
MORNING PR SWEEP — COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Repo                          PR    Status          Threads  Commit    Action
LittleBranches/giselle-mui    #63   ✅ merge-ready  3/3      a1b2c3d   Resolve threads + merge in GitHub
LittleBranches/giselle-mui    #64   ✅ merge-ready  2/2      e4f5g6h   Resolve threads + merge in GitHub
alexrebula/first-branch        #12   ⏸️ no review    —        —         Waiting for Copilot review to appear
LittleBranches/oss-quality-standards #8 ✅ merge-ready 0/0   —         Ready to merge

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
