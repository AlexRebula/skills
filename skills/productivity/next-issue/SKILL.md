---
name: next-issue
description: Identify the next GitHub issue to assign to a student or apprentice. Audits the candidate issue body against a principles index, produces a list of problems, and drafts fixes for approval before touching GitHub. Student, repo, and principles file are all configurable — works for any learner on any repo.
disable-model-invocation: true
---

# Next Issue

Identify, audit, and prepare the next issue for a student — without touching GitHub until you approve the draft.

## Input

`/next-issue [current-issue-number] [--repo owner/repo] [--student github-username] [--principles path/to/principles.md]`

| Argument | Required | Default |
|---|---|---|
| `current-issue-number` | No | Derived from open assigned issues |
| `--repo` | No | Derived from current working directory's git remote |
| `--student` | No | Derived from open assigned issues (whoever is assigned) |
| `--principles` | No | Searches wiki for a `*-issue-principles.md` file matching the student or repo |

## Process

### Step 1 — Resolve inputs

**Repo:** If `--repo` was not provided, run:

```bash
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

If that fails, ask: "Which repo is this issue in? (e.g. `owner/repo`)"

**Student:** If `--student` was not provided, find whoever is assigned to the current issue (Step 2). If still unknown, ask: "What is the student's GitHub username?"

**Principles file:** If `--principles` was not provided, search the wiki for a principles index:

```bash
find . -name "*issue-principles*" -o -name "*principles-index*" | grep -v node_modules
```

- One result → use it
- Multiple results → list them and ask: "Which principles file should I use?"
- None → warn: "No principles index found. Audit will be skipped. Create a principles index at `wiki/sources/<repo-name>/<student>-issue-principles.md` to enable auditing."

### Step 2 — Resolve the current issue

If `current-issue-number` was provided, fetch it:

```bash
gh issue view <number> --repo <repo> --json number,title,state,assignees
```

If omitted, find the lowest-numbered open issue assigned to the student:

```bash
gh issue list --repo <repo> --assignee <student> --state open --json number,title --jq 'sort_by(.number) | .[0]'
```

If nothing is found either way, tell the user and stop.

### Step 3 — Build learner history

Before evaluating any candidate, run:

```
/learner-history <student>
```

This produces a structured summary table of every issue the learner has completed, partially completed, or left open — with sequence labels, tiers, completion types, and evidence sources. Read the table from context; do not re-implement this lookup here.

Use the history to:
- Identify the highest `sequence` label the learner has completed at `full` quality
- List concepts already encountered (from prior issue titles and sequence labels)
- Note any `admin-closed` or `partial` entries — these are concepts introduced but not fully absorbed

### Step 4 — Identify the next candidate

Fetch all open, unassigned issues sorted by number ascending:

```bash
gh issue list --repo <repo> --state open --assignee "" --json number,title,labels,body --jq 'sort_by(.number)'
```

**Sequencing rule:** Take the lowest-numbered issue as the primary candidate.

**Progression check:** Read the candidate's body. Identify any skills or concepts it requires. Compare against the learner history from Step 3. Flag any concept that has not appeared in a prior issue.

**Difficulty ceiling:** Count distinct new concepts introduced. If more than 2 are new, flag it.

If the primary candidate fails progression or difficulty checks, note the flags — do not silently skip to the next issue. Present the flags and let the user decide.

### Step 5 — Load the principles index

Read the resolved principles file. Extract all principles (P1, P2, P3 …) and the issue sequencing criteria.

If no principles file was found (warned in Step 1), skip the audit and note it in the output.

### Step 6 — Audit the candidate issue body

For each principle in the index, check the candidate issue body. The specific checks depend on the principles defined in the index — read them from the file rather than hardcoding them here.

For each failed check, note the exact line or section in the issue body that fails it.

### Step 7 — Build the output

Print a structured report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NEXT ISSUE RECOMMENDATION
  Student:   <github-username>
  Repo:      <owner/repo>
  Current:   #<N> <title>
  Candidate: #<M> <title>
  <url>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEQUENCING     Issue #<M> — next unassigned by number ✅
PROGRESSION    <list new concepts introduced — or "no new concepts" ✅>
DIFFICULTY     <N new concepts — pass ✅ / exceeds ceiling ⚠️>

PRINCIPLES AUDIT
  <for each principle from the index:>
  P<N> — <principle name>
    ✅ / ⚠️ <finding>

  (Skipped — no principles index found) if applicable

VERDICT
  <"Ready to assign" if all pass, or "N issues found — see draft fixes below">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 8 — Draft fixes (if any issues found)

For each failed principle check, produce a draft replacement for the offending section. Format as:

```
--- CURRENT ---
<exact text from the issue body>

--- PROPOSED ---
<replacement text>
```

Present all drafts together. Do not touch GitHub yet.

### Step 9 — Wait for approval

After presenting the report and any draft fixes, ask:

```
Apply fixes to issue #<M> on GitHub? [yes / no / edit first]
```

- **yes** — apply all proposed replacements to the issue body via `gh issue edit`
- **no** — stop; leave the issue unchanged
- **edit first** — show each draft fix one at a time and wait for per-fix confirmation

Only after explicit approval does the skill touch GitHub.

## Adding a new student

For each new student, create a principles index at:

```
wiki/sources/<repo-name>/<student-name>-issue-principles.md
```

Follow the starter template in `/audit-issue` as a format reference. The skill will discover and use the principles file automatically.

## Pattern reference

This skill is the GitHub-integrated wrapper around the public [`audit-issue`](https://github.com/AlexRebula/skills/blob/main/skills/productivity/audit-issue/SKILL.md) pattern. The audit logic, output format, and starter template are documented there. This wrapper adds: automatic issue fetching via `gh`, principles file discovery from the wiki, and candidate selection.
