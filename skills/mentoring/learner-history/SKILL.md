---
name: learner-history
description: Build a factual, source-verified history of a learner's GitHub issue work across an org. Outputs a structured summary table. Call this before audit-issue or next-issue to establish what concepts the learner has already encountered and at what quality. Do not re-implement this lookup in those skills.
disable-model-invocation: true
---

# Learner History

Build a factual history of a learner's completed and in-progress GitHub issues across an org. Resolves each issue's completion type from the best available source of truth. Outputs a structured table for use by the calling skill. Never writes to a file.

## Input

`/learner-history <github-username>`

| Argument | Required | Notes |
|---|---|---|
| `github-username` | Yes | GitHub login of the learner |

## Source-of-truth hierarchy

Resolve each issue in this order. Stop at the first source that gives a clear answer:

1. **Git**: merged PR branches and commits on `main` / `master`
2. **GitHub PRs**: merged PRs from the learner whose branch name or body references the issue
3. **GitHub issue comments**: closing comments, partial-work records, admin-close notes
4. **Local session files**: optional; skip if not present

## Process

### Step 1: Resolve org

```bash
git remote get-url origin
```

Extract the org name from the URL. Examples:
- `https://github.com/MyOrg/my-repo.git` → `MyOrg`
- `git@github.com:MyOrg/my-repo.git` → `MyOrg`

If the command fails or the directory is not a git repo, ask: "What is the GitHub org to search? (e.g. `MyOrg`)"

### Step 2: Fetch all assigned issues in the org

```bash
gh search issues \
  --assignee <username> \
  --owner <org> \
  --state all \
  --json number,title,repository,labels,state,closedAt,url \
  --limit 100
```

If the learner has more than 100 issues, page with `--limit` and `--skip` until exhausted.

Sort results by `closedAt` ascending (nulls, open issues, last).

### Step 3: Fetch all PRs from the learner in the org

```bash
gh search prs \
  --author <username> \
  --owner <org> \
  --state all \
  --json number,title,repository,headRefName,mergedAt,url,state \
  --limit 100
```

Store this as the **PR index**, used in Step 4 to match issues to PRs.

### Step 4: Resolve each issue

For each issue from Step 2, run these checks in order:

#### 4a: Match PRs (sources 1 & 2)

Scan the PR index for PRs that reference this issue. Match on:
- Branch name contains the issue number (e.g. `feat/129-*`, `docs/issue-106-*`, `learn/93-*`)
- PR title or body contains `#<issue-number>`, `closes #<N>`, or `fixes #<N>`

If one or more PRs match:
- All matched PRs merged → `completion_type: full`, `evidence_source: pr-merge`
- At least one matched PR merged, others open/closed without merge → `completion_type: partial`, `evidence_source: pr-merge`
- Matched PR exists but is not merged → `completion_type: in-progress`, `evidence_source: pr-merge`

#### 4b: Check issue comments (source 3)

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

#### 4c: Local session files (source 4)

If the working directory contains a session index (e.g. `raw/sessions/sessions-index.md`), scan it for references to the issue number. Extract any completion notes found.

Set `evidence_source: session-file`.

If not found, skip silently. Do not report this as an error.

#### 4d: Determine completion_type for open issues

If the issue is still open:
- Learner has an open (unmerged) PR → `in-progress`
- No PR, assigned → `open-unstarted`
- No PR, unassigned → `open-unstarted`

### Step 5: Extract labels

For each issue, extract:
- `sequence_label`: the value of the label matching `sequence:*` (e.g. `sequence:2-guided-pr`), or `-` if absent
- `tier`: the value of the label matching `tier-*` (e.g. `tier-small`), or `-` if absent

### Step 6: Output the table

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
| 93 | owner/repo | JSDoc SectionTitle | seq:1 | small | 2026-07-06 | full | pr-merge | #112 | - |
| 106 | owner/repo | Wire StatCardRow | seq:1 | small | 2026-07-16 | admin-closed | issue-comment | - | closed by admin; reading + Storybook phases only |
| 107 | owner/repo | Build ProfileSummaryCard | seq:2 | medium | - | in-progress | pr-merge | - | no PR yet |

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

### Step 7: Print summary stats

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

The calling skill reads the table and summary from context.

### Step 8: Report learning artifacts

A learner's history is not only what they shipped, but also what they wrote down while
shipping it. Many apprenticeship setups ask the learner to keep a notes file per task, so
that the notes later seed their own knowledge base.

Look for per-task notes alongside the task materials:

```bash
find . -maxdepth 4 \( -iname "NOTES.md" -o -iname "LEARNING*.md" \) -not -path "*/node_modules/*"
```

For each one found, report:

- Which task it belongs to
- How many sections are filled versus left as prompts: a section whose body still matches
  its prompt text is **unfilled**
- Whether the file has ever been ingested into a wiki (see below)

Add a line to the summary:

```
  Notes files:  N found · M complete · K with unfilled sections
```

This matters for two reasons. Unfilled sections are concepts the learner passed through
without articulating: useful signal for the calling skill's progression check. And filled
ones are raw material: if the learner is heading toward building their own knowledge base,
these files are its first source pages.

If no notes files exist, skip silently. Not every setup uses them.

---

## Capturing this to an LLM wiki (optional)

This skill is conversation-only by default, and stays that way unless the user asks
otherwise. But a history run has a longer shelf life than the conversation it happens in:
at a milestone (end of a tier, end of a placement, a pay review), a dated snapshot is worth
keeping.

### W1: Detect a wiki

Only raise this if the user already keeps one:

```bash
find . .. -maxdepth 4 -name "index.md" -path "*wiki*" -not -path "*/node_modules/*" 2>/dev/null | head -5
```

- **One match** → continue.
- **Several** → ask which.
- **None** → **skip silently.** Never create a wiki, never mention this section again.

### W2: Ask before writing

```
Save this history as a dated snapshot for your wiki? [yes / no]
```

Default is no. A history run during routine issue selection is noise; only milestones are
worth recording.

### W3: Write a raw source, then hand off

Do **not** write into the wiki tree directly. Write a raw source file and let the wiki's own
ingest process place it: that process owns frontmatter, index and log updates, and PII
redaction, none of which this skill does.

Write to the raw area (commonly `raw/`, but follow whatever the detected wiki uses):

```
raw/learner-history/<YYYY-MM-DD>-<username>-history.md
```

Contents: the table and summary from Steps 6 and 7 verbatim, plus a one-line note of what
prompted the snapshot. Then tell the user:

```
Written to <path>. Run /ingest <path> to file it in your wiki.
```

### W4: Privacy

A learner history is about a real person, often a junior one, and may carry pay and
performance information. Before writing anything:

- Never include pay figures, performance judgements, or personal circumstances. Completion
  type and evidence source only.
- If the wiki has a placeholder vault for real names, use the placeholder rather than the
  learner's name in the body text.
- If the learner is a minor, or the wiki is shared beyond the mentor, ask explicitly before
  writing rather than relying on the Step W2 prompt.
