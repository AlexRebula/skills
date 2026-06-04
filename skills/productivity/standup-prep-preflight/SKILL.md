---
name: standup-prep-preflight
description: Composite pre-flight for daily standup. Runs /check-prior-work and /load-dependency-chain; optionally runs /load-oss-standards (skip or replace with your own standards-loading skill). Use as the first step of /standup-prep or any session-startup workflow that needs session continuity, standards loading, and critical-path context loaded before any repo work begins.
---

# Standup Prep Pre-flight

Run these steps in order. Step 2 is optional — see the adapting note in that step.

## 1. Check prior work

Run `/check-prior-work`.

Scan the current context for a `<conversation-summary>` block. If present, extract completed tasks, files edited, git actions taken, and decisions made. Store as **"pre-standup work"** to be merged into the morning brief later. If absent, continue.

## 2. Load standards _(optional — skip or replace with your own standards-loading skill)_

Run `/load-oss-standards` — or your own standards-loading skill.

> **Adapting this skill?** Replace this step with your own standards-loading skill, or skip it entirely if you don't use a shared standards file. The rest of the preflight is fully general.

Verify access to the standards AGENTS.md files. Print the session health table (standards status, skills count, context budget). Carry key rules inline — do not load the full file unless a specific rule is disputed.

## 3. Load dependency chain

Run `/load-dependency-chain`.

Read `{{WIKI_ROOT}}\wiki\projects\dependency-chain.md` in full. Extract the hard deadline, the critical path, and current phase status for each active repo.

---

Pre-flight complete. Return control to the calling skill or workflow.
