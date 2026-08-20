## What it does

`log-incident` turns an AI behavioural mistake into a structured, git-tracked record: what happened, the actual root cause, severity, and a set of suggested fixes tagged either **Mechanical** (a hook or script that enforces it) or **Behavioural** (relies on the model choosing to comply). It drafts the record from the conversation you're already in, shows it to you before writing anything, then files it, updates the incidents index, and opens a PR.

This is a postmortem log, not a task tracker. Nothing here creates an Asana task, and nothing here is ever written to the LLM's own built-in cross-session memory. That feature has been tried and repeatedly rejected for this purpose: memory is invisible to a human reviewer and to every other session, and an incident that only lives in one model's private recall might as well not exist.

## Why it has two readers, not one

The record you write today has two live consumers, not a shelf to sit on:

- **`/session-wrap`** references the hub when a session closes, so anything surfaced mid-session gets captured instead of dropping on the floor.
- **Every new session** is expected to scan the index at its own startup, before it acts, so it can recognize a mistake it's about to repeat.

That second point is the whole reason this exists as a skill and not a habit. An incident that gets written but never re-read prevents nothing. The worked example baked into the skill is exactly this: a session asked "want me to push this?", got no answer, then read the user invoking an unrelated skill as a green light to push anyway. That's the shape of mistake this hub exists to catch before it happens a second time, not just document after the fact.

## When to reach for it

Invoke it by typing `/log-incident`, with or without a short description. With no argument, it drafts every field from the conversation you're already in; it does not ask you to re-narrate something it just watched happen. Pass a description when you're logging something from a past session with no live transcript to draw from.

Reach for it the moment you catch a mistake, not at the end of the day when the details have gone soft. Severity, root cause and whether an existing guardrail should have caught it are all easier to state accurately while the failure is fresh.

## Locating the store

The skill doesn't hardcode a path to your incidents hub. It looks for a repo containing `raw/incidents/incidents-index.md`, first in the current working directory, then across the visible workspace. One match, it proceeds. Several, it asks which one. None at all, it asks you directly how you want incidents stored for your setup, rather than defaulting to anything, including, again, never the model's own memory feature.

## What goes in the draft

The fields worth paying attention to when you review the draft:

- **Root cause** is meant to be the actual mechanism, not "AI made a mistake." If you had to correct the same thing more than once before the real generalization landed, that correction history is itself a root-cause detail worth keeping.
- **Severity** is High for anything that touched shared state or a protected branch or affected someone else, Medium for a real process flaw caught before damage, Low for a contained slip.
- **Status** is `Resolved` only once the underlying flaw is actually fixed, not merely pointed out.
- **Guardrails that existed and still failed** is omitted on a first-time incident and filled in with a real explanation on a recurrence.

## Common questions

**Does this create a task anywhere?**
No. If you want the fix tracked as work, that's a separate, explicit request. This skill only writes the postmortem.

**What if I don't have a wiki repo at all?**
The skill asks you how you want incidents stored rather than assuming a fixed layout. Whatever you choose becomes the durable answer for future runs too.

**Can it merge the PR it opens?**
No, and it shouldn't. Incidents get reviewed and grilled, not auto-resolved the moment they're filed.

## It's working if

- The record names a mechanism, not a vibe.
- A future session that reads the index before acting actually avoids the mistake, rather than the incident sitting there unread.
- Recurrences show up with an honest account of why the existing guardrail didn't catch them, instead of a fresh Low-severity entry that resets the counter.

## Where it fits

`log-incident` sits at the seam between a session going wrong and the next session doing better. Its output feeds two other places in the workflow: `/session-wrap`, which references it on close, and every session's own startup scan, which is expected to read it before touching anything. It is not a substitute for fixing the underlying flaw; it's the record that makes the fix, and the next session's caution, possible at all.
