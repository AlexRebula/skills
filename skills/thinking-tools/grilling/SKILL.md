---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Each question should be formatted like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.

## Closing out a tracked issue

If this session was grilling a specific issue already on the tracker (referenced by number/URL in the conversation, or passed as an argument), and that issue carries the `to-grill` triage label: once the user confirms the shared understanding is reached, post a "Grilled and settled" summary comment on the issue (the settled decisions, in the same numbered form used during the session) and swap its label from `to-grill` to the tracker's "settled" role label (see `triage-labels.md` — `spec'd` in this repo's vocabulary). Do this immediately, in the same turn the user confirms — `to-grill` left on an issue after it has actually been settled is indistinguishable from an issue that was never grilled at all, and misleads the next session that filters by that label.

This does not apply to ad hoc grilling with no tracked issue behind it (e.g. grilling a plan still being drafted in chat) — there is nothing to relabel.
