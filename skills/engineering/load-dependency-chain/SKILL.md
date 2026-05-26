---
name: load-dependency-chain
description: Load the dependency-chain.md context file and extract the hard deadline, critical path, and current phase status for each active repo. Use at the start of any session-startup workflow before checking repo state or producing a morning brief.
---

# Load Dependency Chain

Read this file in full:

```
{{AI_ROOT}}\Agents\Context\dependency-chain.md
```

Extract:

- The hard deadline and what depends on it
- The critical path (what is blocking what today)
- Current phase status for each active repo

## Expected file format

`dependency-chain.md` is a plain Markdown file. It must contain at least:

- **Hard deadline** — a specific date that something must be ready (launch, demo, handoff)
- **Critical path** — which task or repo is blocking all others today
- **Per-repo phase status** — one line per active repo: name, current phase, and blocked/unblocked state

**Minimum structure example:**

```md
# Dependency Chain

**Hard deadline:** 20 Jun 2026 — demo to stakeholder

## Critical path

repo-a Phase C → app-b Phase 3 → launch

## Repo status

| Repo   | Phase   | Status                       |
| ------ | ------- | ---------------------------- |
| repo-a | Phase C | 🔄 In progress               |
| app-b  | Phase 3 | ⬜ Blocked on repo-a Phase C |
```

> **Adapting this skill?** Create a `dependency-chain.md` using the format above. Set `{{AI_ROOT}}` to point to the folder that contains it.
