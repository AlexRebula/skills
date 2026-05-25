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
