## What it does

`standup-prep-preflight` is the composite first step of `/standup-prep`: it runs `/check-prior-work` and `/load-dependency-chain` in order, and optionally a standards-loading skill in between. On its own it produces no brief and makes no changes; it just gathers the context that everything after it depends on, so the rest of the day's work doesn't start from a blank slate.

## When to reach for it

You'll usually meet it indirectly, as the first step `/standup-prep` runs for you. Reach for it directly if you're building your own session-startup workflow and want the same three pieces of groundwork (session continuity, standards, and critical-path context) without wiring `/standup-prep`'s repo-status and PR-sweep machinery on top.

## The three steps, in order

1. **Check prior work**: scans the current context for a `<conversation-summary>` block. If one's present (meaning this session is a continuation of an earlier one that got compacted), it pulls out completed tasks, files edited, git actions, and decisions already made, and stores them as "pre-standup work" to merge into the morning brief later rather than losing them. If there's no such block, it just continues.
2. **Load standards** *(optional)*: runs `/load-oss-standards` or whatever standards-loading skill you've substituted, verifies access to the relevant `AGENTS.md` files, and prints a session health table. The rule here is to carry key rules inline rather than loading the whole file unless a specific rule gets disputed later.
3. **Load dependency chain**: reads `dependency-chain.md` in full and extracts the hard deadline, the critical path, and the current phase status for each active repo.

## Why step 2 is the one built to be swapped

The skill says outright: if you're adapting it, replace step 2 with your own standards-loading skill, or drop it entirely if there's no shared standards file in your setup. Steps 1 and 3 are fully general: every workspace has *some* notion of prior work and *some* notion of what's next. But "load our shared coding standards" is specific to a setup that has such a document in the first place. Rather than force every adopter to fake one, the skill names the seam explicitly.

## Common questions

**Do I need to run this separately from `/standup-prep`?**
No. `/standup-prep` calls it as its own Step 0. Run it directly only if you're assembling a different startup sequence that needs the same groundwork without the rest of `/standup-prep`'s steps.

**What happens if there's no `dependency-chain.md`?**
Step 3 has nothing to extract, and whatever calls this preflight inherits an empty critical path. That's worth noticing early rather than discovering later that the brief's "critical path today" section came up blank.

**I don't have a shared standards file. Do I need to fake one?**
No. Skip step 2 outright; it's explicitly marked optional for exactly this reason.

## It's working if

- A continuation session picks up prior work instead of re-deriving it from scratch.
- The critical path and hard deadline it surfaces are the ones actually driving the day's priorities.
- Swapping in your own standards-loading skill at step 2 requires no change to steps 1 or 3.

## Where it fits

`standup-prep-preflight` exists purely to be step 0 of `/standup-prep`, or of any session-startup workflow you build that needs the same three pieces of groundwork first. It has no output of its own beyond what it hands back to whatever called it: the actual brief, repo sweep, and PR sweep all live one level up, in `/standup-prep` itself.
