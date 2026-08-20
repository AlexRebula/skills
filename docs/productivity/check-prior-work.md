## What it does

`check-prior-work` is a small, single-purpose pre-flight check: before any session-startup skill does its own work, this one looks for a `<conversation-summary>` block already sitting in context and, if one is there, reads it as a record of earlier work from this same session that got compacted, not a different one.

It extracts completed tasks, files edited, git actions taken, and decisions made from that block, and holds them as "pre-standup work" for the calling skill to merge into whatever it produces later. If no summary block is present, it does nothing and lets the caller continue normally.

## When to reach for it

This is not something you type on its own. It runs as the first step inside another session-startup skill, most commonly `standup-prep-preflight`, before that skill checks anything else.

Reach for it (or rather, wire it in) any time a session-startup flow needs to know whether the conversation it is running in already has history worth folding in, rather than treating everything as brand new.

## The one distinction that matters

The whole skill exists to enforce a single labeling rule: a `<conversation-summary>` block describes work from *this* session that got compacted, not a handoff from a previous session. Mislabeling it as "previous session work" changes how a downstream skill like a morning brief presents it, so the skill is explicit that this gets tagged "pre-standup work" and nothing else.

## Common questions

**What if there's no summary block in context?**
Nothing happens. The skill continues normally and the calling skill proceeds as if this step were never there.

**Does it write anything to disk?**
No. It only reads from context and holds the extracted facts for the calling skill to use.

**Why is this a separate skill instead of being inlined into standup-prep-preflight?**
So any session-startup flow can reuse the same check without duplicating the extraction logic, and so the labeling rule lives in exactly one place.

## Where it fits

`check-prior-work` is the first of several pre-flight steps that `standup-prep-preflight` runs in sequence, ahead of loading dependency-chain context or session guidelines. It is intentionally the smallest of the set: one check, one label, nothing else.
