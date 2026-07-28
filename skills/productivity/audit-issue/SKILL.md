---
name: audit-issue
description: Audit a GitHub issue body against a principles index and draft fixes for approval. Use when preparing an issue for a student, apprentice, or junior contributor — paste the issue body and your principles, get a structured audit and proposed fixes before touching GitHub.
---

# Audit Issue

Audit an issue body against a set of known principles and produce draft fixes — without touching anything until you approve.

## What this skill does

You bring two inputs:
1. **The issue body** — paste it directly into the conversation
2. **Your principles** — paste your principles file or describe your rules inline

The skill audits the issue body against every principle, flags problems with the exact offending text, drafts replacement sections, and waits for your approval before you apply anything.

No `gh` CLI, no file paths, no external tools required.

---

## Input

Invoke this skill by pasting:

```
/audit-issue

ISSUE BODY:
<paste the full issue body here>

PRINCIPLES:
<paste your principles file here, or describe your rules>
```

If you omit either input, the skill will ask for it before proceeding.

---

## Principles format

Principles work best when structured. Each principle should have:

- A short name
- A rule (one sentence)
- A checklist of specific things to look for in the issue body

See the **starter template** at the bottom of this file.

Free-form prose also works — the skill will do its best — but structured principles produce more reliable audits.

---

## Process

### Step 1 — Parse inputs

Read the issue body and principles provided. If either is missing, ask for it.

If principles are free-form prose, extract the implied rules before proceeding.

### Step 2 — Audit

For each principle, scan the issue body and apply every checklist item. For each failed check, record:

- Which principle it violated
- The exact text from the issue body that triggered the failure
- Why it fails

### Step 3 — Build the report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ISSUE AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRINCIPLES AUDIT
  P<N> — <principle name>
    ✅  pass
    ⚠️  <finding — quote the offending text>

VERDICT
  <"No issues found — ready to assign" or "N issues found — see draft fixes below">
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4 — Draft fixes

For each failed check, produce a draft replacement:

```
--- CURRENT ---
<exact text from the issue body>

--- PROPOSED ---
<replacement text>
```

Present all drafts together.

### Step 5 — Wait for approval

Ask:

```
Apply these fixes? [yes / no / edit first]
```

- **yes** — output the full corrected issue body, ready to paste into GitHub
- **no** — stop; output nothing
- **edit first** — walk through each fix one at a time, wait for per-fix confirmation, then output the corrected body

The skill never touches GitHub directly — you copy the corrected body and apply it yourself.

---

## Starter template — copy and fill in

Save this as `<student-name>-issue-principles.md` and paste it when invoking `/audit-issue`.

```markdown
# Issue Principles — <Student Name>

## P1 — <Principle name>

**Rule:** <One sentence stating the rule.>

**Why:** <Why this matters for this learner — what went wrong before.>

**Checklist:**
- [ ] <Specific thing to look for in the issue body>
- [ ] <Another specific thing>

---

## P2 — <Principle name>

**Rule:** <One sentence stating the rule.>

**Why:** <Why this matters.>

**Checklist:**
- [ ] <Specific thing to look for>

---

## P_FORMAT — Body structure

**Rule:** The issue body must not contain embedded step-by-step instructions — those belong in a separate guide file (e.g. STEPS.md) referenced from the body.

**Why:** Long embedded steps conflate *what needs doing* (issue body) with *how to do it* (guide file), making issues harder to scan and maintain.

**Checklist:**
- [ ] Body contains no numbered lists longer than 3 items
- [ ] If detailed steps exist, they are in an external file referenced from the body
- [ ] Setup or "before you start" boilerplate is absent or reduced to a single sentence

---

## P_SCOPE — Assignee workspace

**Rule:** Every file path, directory, and repository referenced in the issue must exist in the assignee's local workspace.

**Why:** References to inaccessible repos or paths create dead-end instructions the assignee cannot follow.

**Checklist:**
- [ ] No file paths from repositories the assignee does not have locally
- [ ] No references to internal tools, files, or systems the assignee cannot access

---

## P_DELIVERABLES — Explicit output count

**Rule:** The DoD must explicitly state how many PRs (or other outputs) are expected, and in which repositories.

**Why:** Ambiguous deliverable count causes the assignee to believe they are done when only part of the work is complete — especially when a change has cross-repo ripple effects.

**Checklist:**
- [ ] DoD lists every repository where a PR is expected
- [ ] If a change propagates to a consuming repo (e.g. a package sync), each resulting PR is explicitly called out

---

## P_QUIZ — Understanding gate

**Rule:** If the project requires a comprehension check for each task, every issue must include a quiz or review session as the final DoD item, and a corresponding quiz file must exist in the issue's learn folder.

**Why:** Without an understanding gate, an assignee can complete all mechanical steps without demonstrating they know why they did them. The quiz turns task completion into learning.

**Checklist:**
- [ ] DoD includes a quiz or review session as its final item (e.g. `Quiz completed with [reviewer]`)
- [ ] A corresponding quiz file is referenced or exists in the issue's learn folder

---

## P_PAYMENT — Compensation visibility

**Rule:** If the project has a compensation policy for the assignee, every issue must state the agreed rate and the completion threshold at which full payment is earned.

**Why:** An assignee working for pay must know what they will earn before starting. A rate buried only in a task tracker is easy to miss; an invented rate in the issue body creates a mismatch with the authoritative record.

**Checklist:**
- [ ] Issue body states the agreed rate and full-completion threshold (e.g. `**Payment:** $X at 100%`)
- [ ] Rate matches the value in the project's task tracker — not invented inline
- [ ] Format is consistent with the project's compensation policy

---

## Issue sequencing criteria

When selecting the next issue, apply in order:
1. **Sequence** — lowest-numbered unassigned open issue first
2. **Progression** — issue builds on skills already taught; flag new concepts
3. **Difficulty ceiling** — flag if more than 2 new concepts introduced simultaneously

---

## Incident log

| Date | Issue | What went wrong | Principles violated |
|---|---|---|---|
| YYYY-MM-DD | #N | <brief description> | P1, P2 |
```

---

## Optional Phase 2 — Accompanying files audit

If the issue references an external guide file (e.g. STEPS.md, a quiz, a mission brief),
after completing Phase 1 ask:

> "Should I also audit `<filename>`?"

If yes, apply the same structured audit to that file, checking for:

- **Workspace scope** — file paths or repos the assignee cannot access
- **Hardcoded specifics** — filenames, counts, or paths that assume a predetermined outcome
  and should be expressed generically (e.g. `git add <path/to/file>` not `git add src/exact-file.ts`)
- **Tool alternatives** — terminal-only instructions that have a common GUI equivalent worth
  mentioning (e.g. VS Code Source Control alongside `git diff`)
- **Action gates** — irreversible or wide-impact actions (edits, pushes, deletions) should
  require the assignee to pause and confirm before proceeding

---

## Enriching with learner history

If you want the audit to include a **progression check** (is this issue appropriate for where the learner is at?), run `/learner-history <github-username>` before invoking this skill. The history table tells you:

- The highest sequence level the learner has completed at `full` quality
- Concepts already encountered vs. concepts this issue introduces for the first time
- Any `admin-closed` or `partial` completions — concepts introduced but not fully absorbed

Read the history from context and include a progression verdict in your audit report. Do not re-implement the history lookup here — that logic lives in `/learner-history`.

## Pairing with `/next-issue`

If you want the skill to also fetch and identify the next candidate issue automatically (using `gh` and a principles index), consider wrapping this skill with a `/next-issue` skill that adds GitHub integration on top — fetching open issues, filtering by assignee, and pre-populating the audit inputs.
