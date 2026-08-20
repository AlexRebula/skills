## What it does

`karpathy-guidelines` is a set of behavioral rules for how an agent should write and review code, drawn from Andrej Karpathy's public observations on where LLMs go wrong day to day: overcomplicating simple tasks, touching more code than the request called for, and declaring success without a way to check it.

It isn't a workflow with steps to run through. There's no install, no files it creates, nothing it drives. It's a standing posture: think before coding, keep changes minimal, keep edits surgical, and define what "done" means before starting.

**Tradeoff, stated up front:** these rules favor caution over speed. On a genuinely trivial task, applying all four in full is more overhead than the task deserves. Use judgment rather than treating the list as a checklist to satisfy every time.

## When to reach for it

There's no slash command here; this is guidance an agent (or a `CLAUDE.md`) applies while working, not a tool you invoke mid-task. Point Claude at it when you want a session to default toward caution: reviewing a diff, writing new code, or refactoring something that already works.

| Your situation | Why this fits |
| --- | --- |
| An agent keeps adding features you didn't ask for | Rule 2, simplicity first |
| A small fix turns into a drive-by rewrite of the surrounding file | Rule 3, surgical changes |
| A task finishes with no way to tell if it actually worked | Rule 4, goal-driven execution |
| The agent picked an interpretation of an ambiguous request without saying so | Rule 1, think before coding |

## The four rules

**1. Think before coding.** State assumptions instead of silently picking one. If more than one reading of the request is plausible, say so before writing anything. If something is genuinely unclear, stop and ask rather than guessing forward.

**2. Simplicity first.** Write the minimum code the problem needs. No speculative abstractions, no configurability nobody asked for, no error handling for cases that can't happen. If a change comes out at 200 lines and could be 50, that's a sign to rewrite it, not to add a comment explaining why it's long.

**3. Surgical changes.** Touch only what the task requires. Don't tidy up adjacent code, rename things you noticed in passing, or refactor something that isn't broken, even if you'd have written it differently. Match the existing style. If your change makes something else unused (an import, a variable), remove that; if you spot pre-existing dead code that has nothing to do with your change, mention it and leave it alone.

**4. Goal-driven execution.** Turn the task into something checkable before starting: a bug fix pairs with a test that reproduces the bug, a refactor pairs with tests that pass before and after. Vague success criteria ("make it work") force you to keep asking what "working" means; concrete ones let the loop run on its own.

## Common questions

**Isn't this just "use good judgment"?**
That's the honest description, and it's also why the tradeoff is stated explicitly rather than left implicit. Good judgment scales badly across a long session without something written down to check against; this gives that judgment four concrete names, so a review can point at "this violates rule 3" instead of relitigating taste from scratch.

**Does this replace `karpathy-guidelines`-style instructions I already have in `CLAUDE.md`?**
No, it's meant to sit inside one. If your project already states some of this, don't duplicate it; point at whichever version is closer to the repo and drop the other.

**What does it mean for a "senior engineer" test in rule 2?**
It's a gut check, not a formal metric: if a reviewer with more context than the agent had would call the result overcomplicated, that's the signal to cut it down, independent of whether the code technically works.

## It's working if

- The agent states an assumption out loud instead of picking one silently and moving on.
- A diff for a small fix is small; nothing unrelated got touched.
- Every task that could be verified has a stated check attached to it, before the work starts, not invented afterward to justify what already happened.
- Renaming or reformatting code you didn't ask about doesn't show up in the diff.

## Where it fits

This is a standalone reference, not a step in any chain. It has the same relationship to a session that a project's coding standards have: read once, applied continuously, and never invoked as its own action. It pairs naturally with anything that produces or reviews code in this collection, since none of those skills define "keep the diff small" or "state your assumptions" on their own.
