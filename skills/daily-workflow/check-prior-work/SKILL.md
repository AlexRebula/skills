---
name: check-prior-work
description: Pre-flight check for session continuity. Scans the current context for a <conversation-summary> block and extracts prior work from the same session before any other steps run. Use at the start of any session-startup skill (e.g. /standup-prep-preflight).
---

# Check Prior Work

Before doing anything else, look for a `<conversation-summary>` block in the current context.

If one is present:

- It describes **earlier work from THIS same session** that was compacted — not a different session.
- Read it fully. Extract: completed tasks, files edited, git actions taken, decisions made.
- Store this as **"pre-standup work"** — it will be merged into the morning brief later.
- Do NOT label it as "previous session work".

If none is present, continue normally.
