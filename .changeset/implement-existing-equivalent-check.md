---
"alexrebula-skills": patch
---

`/implement` gained a 4th pre-flight check: **existing-equivalent check**. Before writing any code, search the actual codebase — not just a tracker doc, inventory table, or the ticket's own pre-analysis — for a component or module that might already satisfy the ticket under a different name or location.

This closes a real gap surfaced while implementing a `FloatingSideNav` ticket in a LittleBranches consuming repo: the ticket's own body claimed it was "distinct from the existing `FloatingSubNav`", and that claim happened to be correct, but nothing in `/implement`'s process required verifying it against the actual codebase before starting — it would have been trusted either way. The session's own tracked spec (issue driving that work) exists specifically because a prior batch of work trusted a planning document's claims without checking them against the actual current codebase; `/implement` itself didn't operationalize that same lesson for the "is this genuinely unbuilt" question, only for branch/PR duplication of the same ticket.
