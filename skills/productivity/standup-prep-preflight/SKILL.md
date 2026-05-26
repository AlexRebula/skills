---
name: standup-prep-preflight
description: Composite pre-flight for daily standup. Runs /check-prior-work, /load-oss-standards, and /load-dependency-chain in sequence. Use as the first step of /standup-prep or any session-startup workflow that needs session continuity, OSS rule verification, and critical-path context loaded before any repo work begins.
---

# Standup Prep Pre-flight

Run these three skills in order. Do not skip any.

## 1. Check prior work

Run `/check-prior-work`.

Scan the current context for a `<conversation-summary>` block. If present, extract completed tasks, files edited, git actions taken, and decisions made. Store as **"pre-standup work"** to be merged into the morning brief later. If absent, continue.

## 2. Load OSS standards

Run `/load-oss-standards`.

Verify access to the public and private LittleBranches AGENTS.md files. Print the session health table (standards status, skills count, context budget). Carry §2.1/§2.2/§1.2/§3.3 rules inline — do not load the full file unless a specific rule is disputed.

## 3. Load dependency chain

Run `/load-dependency-chain`.

Read `{{AI_ROOT}}\Agents\Context\dependency-chain.md` in full. Extract the hard deadline, the critical path, and current phase status for each active repo.

---

Pre-flight complete. Return control to the calling skill or workflow.
