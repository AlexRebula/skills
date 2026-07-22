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

## Pairing with `/next-issue`

If you want the skill to also fetch and identify the next candidate issue automatically (using `gh` and a wiki-based principles index), see the private wrapper pattern described in the [LittleBranches wiki skill](../../personal/README.md) — `next-issue` wraps this audit with GitHub integration on top.
