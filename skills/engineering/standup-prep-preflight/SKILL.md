---
name: standup-prep-preflight
description: Composite pre-flight for daily standup. Runs /check-prior-work, /load-oss-standards, and /load-dependency-chain in sequence. Use as the first step of /standup-prep or any session-startup workflow that needs session continuity, OSS rule verification, and critical-path context loaded before any repo work begins.
---

# Standup Prep Pre-flight

Run these three skills in order. Do not skip any.

## 1. Check prior work

Run `/check-prior-work`.

Scan the current context for a `<conversation-summary>` block. If present, extract completed tasks, files edited, git actions taken, and decisions made. Store as **"pre-standup work"** to be merged into the morning brief later. If absent, continue.

## 2. Load standards *(optional — skip or replace if you don't use LittleBranches OSS Quality Standards)*

Run `/load-oss-standards` — or your own standards-loading skill.

> **Adapting this skill?** If you don't use LittleBranches OSS Quality Standards, replace this step with your own standards-loading skill, or skip it entirely. The rest of the preflight is fully general.

Verify access to the standards AGENTS.md files. Print the session health table (standards status, skills count, context budget). Carry key rules inline — do not load the full file unless a specific rule is disputed.

## 3. Load dependency chain

Run `/load-dependency-chain`.

Read `{{AI_ROOT}}\Agents\Context\dependency-chain.md` in full. Extract the hard deadline, the critical path, and current phase status for each active repo.

---

Pre-flight complete. Return control to the calling skill or workflow.
