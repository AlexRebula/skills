## What it means

The permanent record a session leaves behind: a numbered, searchable entry in the session index, written when a session ends rather than mid-task. Unlike a [handoff](handoff.md), it is not built to travel anywhere — it stays put, as a durable log of what happened.

## In this fork

`/session-wrap` is the skill that writes this record: it summarises what happened, updates `sessions-index.md`, chains a `→ Next` link, and hands off to `/wip-sweep` for the actual commit. A fresh session picks it back up through `/load-session-context`, not by being handed a file directly the way a [handoff](handoff.md) works.

## See also

- [Handoff](handoff.md) — the ephemeral counterpart this term is easy to conflate with.
- [Skills, flows, and harnesses](../skills-flows-harnesses.md)'s "Durable handoff" section — how wrap and handoff work together as one mechanism.
