---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

## Arguments

`/implement <ticket-or-spec-reference>`: a spec path, an issue number, or a URL. Fetch it and read its full body and comments before starting — never assume the invocation alone (e.g. a bare ticket number passed by `/implement-tickets`) already carries everything the ticket specifies. A ticket's own Definition of Done, acceptance criteria, and any compliance requirements section are load-bearing, not optional context to skip past.

`/implement` (no argument): implement the work already described in the current conversation.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

## Independent-review gate (required, not optional)

Before this work can be reported done, run `/review-pr --branch`, passing the current branch's name. This is a hard gate, not an advisory step: self-review by the same session that wrote the code has already been shown to miss real structural issues (duplicated logic, oversized files, scope creep) even when the quality gate passes cleanly — passing tests and lint is not evidence the structure is sound.

`/review-pr --branch`'s sub-agents are the fresh reviewer this gate requires: they receive only the diff and the spec, with no memory of the implementation session's own reasoning or shortcuts. Do not substitute a self-review pass (re-reading your own diff in this same conversation) for actually invoking the skill.

- Address every `blocking` finding before reporting done.
- `non-blocking` and `suggestion` findings may be deferred, but only with the user's explicit sign-off on what's being deferred and why — silently dropping them is not acceptable.
- If the ticket carries a Definition of Done section (see `/to-tickets`), this gate is one of its required items — do not check that box without actually having run it.

Commit your work to the current branch.
