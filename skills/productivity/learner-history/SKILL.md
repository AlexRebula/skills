---
name: learner-history
description: Build a factual, source-verified history of a learner's GitHub issue work across an org. Outputs a structured summary table. Call this before audit-issue or next-issue to establish what concepts the learner has already encountered and at what quality — do not re-implement this lookup in those skills.
disable-model-invocation: true
---

# Learner History

Build a factual history of a learner's completed and in-progress GitHub issues across an org. Resolves each issue's completion type from the best available source of truth. Outputs a structured table for use by the calling skill — never writes to a file.

## Input

`/learner-history <github-username>`

| Argument | Required | Notes |
|---|---|---|
| `github-username` | Yes | GitHub login of the learner |

## Source-of-truth hierarchy

Resolve each issue in this order — stop at the first source that gives a clear answer:

1. **Git** — merged PR branches and commits on `main` / `master`
2. **GitHub PRs** — merged PRs from the learner whose branch name or body references the issue
3. **GitHub issue comments** — closing comments, partial-work records, admin-close notes
4. **Local session files** — optional; skip if not present

## Process

### Step 1 — Resolve org

```bash
git remote get-url origin
```

Extract the org name from the URL. Examples:
- `https://github.com/MyOrg/my-repo.git` → `MyOrg`
- `git@github.com:MyOrg/my-repo.git` → `MyOrg`

If the command fails or the directory is not a git repo, ask: "What is the GitHub org to search? (e.g. `MyOrg`)"

### Step 2 — Fetch all assigned issues in the org

```bash
gh search issues \
  --assignee <username> \
  --owner <org> \
  --state all \
  --json number,title,repository,labels,state,closedAt,url \
  --limit 100
```

If the learner has more than 100 issues, page with `--limit` and `--skip` until exhausted.

Sort results by `closedAt` ascending (nulls — open issues — last).

### Step 3 — Fetch all PRs from the learner in the org

```bash
gh search prs \
  --author <username> \
  --owner <org> \
  --state all \
  --json number,title,repository,headRefName,mergedAt,url,state \
  --limit 100
```

Store this as the **PR index** — used in Step 4 to match issues to PRs.

### Step 4 — Resolve each issue

For each issue from Step 2, run these checks in order:

#### 4a — Match PRs (sources 1 & 2)

Scan the PR index for PRs that reference this issue. Match on:
- Branch name contains the issue number (e.g. `feat/129-*`, `docs/issue-106-*`, `learn/93-*`)
- PR title or body contains `#<issue-number>`, `closes #<N>`, or `fixes #<N>`

If one or more PRs match:
- All matched PRs merged → `completion_type: full`, `evidence_source: pr-merge`
- At least one matched PR merged, others open/closed without merge → `completion_type: partial`, `evidence_source: pr-merge`
- Matched PR exists but is not merged → `completion_type: in-progress`, `evidence_source: pr-merge`

#### 4b — Check issue comments (source 3)

Only run this if Step 4a did not produce a clear answer, or if the issue is closed with no matched PRs.

```bash
gh issue view <number> --repo <owner/repo> \
  --json comments --jq '.comments[] | {author: .author.login, body, createdAt}'
```

Look for:
- Phrases like "closing on your behalf", "closed by admin", "partial completion" → `completion_type: admin-closed` or `partial`
- Phrases like "full payment", "issue complete", explicit sign-off → `completion_type: full`
- No comments and issue is closed → `completion_type: admin-closed` (unknown reason)

Set `evidence_source: issue-comment`.

#### 4c — Local session files (source 4)

If the working directory contains a session index (e.g. `raw/sessions/sessions-index.md`), scan it for references to the issue number. Extract any completion notes found.

Set `evidence_source: session-file`.

If not found, skip silently — do not report this as an error.

#### 4d — Determine completion_type for open issues

If the issue is still open:
- Learner has an open (unmerged) PR → `in-progress`
- No PR, assigned → `open-unstarted`
- No PR, unassigned → `open-unstarted`

### Step 5 — Extract labels

For each issue, extract:
- `sequence_label` — the value of the label matching `sequence:*` (e.g. `sequence:2-guided-pr`), or `—` if absent
- `tier` — the value of the label matching `tier-*` (e.g. `tier-small`), or `—` if absent

### Step 6 — Output the table

Print the summary to conversation. Do not write to any file.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LEARNER HISTORY
  Learner:  <github-username>
  Org:      <org>
  Scanned:  <N> issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then a table, one row per issue, sorted by `closed_date` ascending (open issues at the bottom):

| # | repo | title | sequence | tier | closed | completion | evidence | prs | notes |
|---|---|---|---|---|---|---|---|---|---|
| 93 | owner/repo | JSDoc SectionTitle | seq:1 | small | 2026-07-06 | full | pr-merge | #112 | — |
| 106 | owner/repo | Wire StatCardRow | seq:1 | small | 2026-07-16 | admin-closed | issue-comment | — | closed by admin; reading + Storybook phases only |
| 107 | owner/repo | Build ProfileSummaryCard | seq:2 | medium | — | in-progress | pr-merge | — | no PR yet |

**Completion type key:**

| Value | Meaning |
|---|---|
| `full` | All expected PRs merged; or issue closed by the learner with confirmed deliverables |
| `partial` | Some PRs merged or some DoD items completed; issue closed before full completion |
| `admin-closed` | Issue closed by a maintainer, not the learner; often with partial work or learning credit |
| `in-progress` | Issue open; learner has an open PR or recent branch activity |
| `open-unstarted` | Issue open; no PR or branch activity found |

**Evidence source key:**

| Value | Meaning |
|---|---|
| `git-commit` | Determined from commit history on main or a merged branch |
| `pr-merge` | Determined from a merged PR linked to this issue |
| `issue-comment` | Determined from a comment on the issue (e.g. admin close with explanation) |
| `session-file` | Determined from a local session tracker file |

### Step 7 — Print summary stats

After the table:

```
SUMMARY
  Completed (full):        N
  Partial / admin-closed:  N
  In progress:             N
  Open unstarted:          N
  Highest sequence seen:   sequence:N-<label>
  Repos with activity:     owner/repo-a, owner/repo-b
```

The calling skill reads the table and summary from context. Nothing is written to disk.
