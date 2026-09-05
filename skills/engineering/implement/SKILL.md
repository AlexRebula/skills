---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

## Arguments

`/implement <ticket-or-spec-reference>`: a spec path, an issue number, or a URL. Fetch it and read its full body and comments before starting — never assume the invocation alone (e.g. a bare ticket number passed by `/implement-tickets`) already carries everything the ticket specifies. A ticket's own Definition of Done, acceptance criteria, and any compliance requirements section are load-bearing, not optional context to skip past.

**If the ticket's own body names a different build skill to use** (e.g. "scaffold and implement via `/create-giselle-component`, not generic `/implement`"), defer to that skill instead — the ticket's own instruction takes priority over this one.

`/implement` (no argument): implement the work already described in the current conversation.

### Pre-flight checks (when invoked with a ticket/spec reference)

Run these before writing any code, not after:

1. **Ready-state check**: if the tracker has a triage/state label and it is not in a ready-to-implement state (e.g. still `to-grill`, `needs-info`, `needs-triage`), stop and tell the user rather than proceeding on an unsettled ticket.
2. **Blocker check**: if the ticket has a `## Blocked by` section, verify every referenced blocker is actually closed/completed before starting. `/implement-tickets` already does this at batch scale for its own children; a standalone `/implement <ticket>` invocation needs the same check for the single-ticket case.
3. **Existing work check**: check whether a branch or open PR already exists for this ticket before starting fresh, to avoid quietly duplicating in-progress work.
4. **Existing-equivalent check**: search the actual codebase — not just a tracker doc, inventory table, or the ticket's own pre-analysis — for a component or module that might already satisfy this ticket under a different name or location. A ticket's claim that something is "unbuilt" or "distinct from X" is a claim to verify by reading the code, the same way its own Phase 0 classification says to verify against `cleanup-workflow.md`'s decision table rather than trusting the ticket's word for it. Grep for related exports, skim neighboring components in the same layer/category, and check any component whose description sounds similar before writing new code. Trusting a planning document's claims without checking them against the actual current codebase is a recorded failure mode this process exists to prevent, not just for Phase 0 folder structure but for whether the work is needed at all.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

## Independent-review gate (required, not optional)

Before this work can be reported done, run `/review-pr --branch`, passing the current branch's name. This is a hard gate, not an advisory step: self-review by the same session that wrote the code has already been shown to miss real structural issues (duplicated logic, oversized files, scope creep) even when the quality gate passes cleanly — passing tests and lint is not evidence the structure is sound.

`/review-pr --branch`'s sub-agents are the fresh reviewer this gate requires: they receive only the diff and the spec, with no memory of the implementation session's own reasoning or shortcuts. Do not substitute a self-review pass (re-reading your own diff in this same conversation) for actually invoking the skill.

- Address every `blocking` finding before reporting done.
- `non-blocking` and `suggestion` findings may be deferred, but only with the user's explicit sign-off on what's being deferred and why — silently dropping them is not acceptable.
- If the ticket carries a Definition of Done section (see `/to-tickets`), this gate is one of its required items — do not check that box without actually having run it.

Commit your work to the current branch.
