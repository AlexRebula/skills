## What it does

`deslopify` strips the tells that mark text or code as AI-generated and puts a human voice back. It runs as two independent passes that share one process: calibrate how dense the result should be, scan for a pattern, rewrite it, add back what generic output tends to strip out, then self-audit for anything left over.

The two passes are not treated the same way. The prose pass is always on: any text meant for a human reader (a PR description, a commit message, a wiki page, a session summary, a chat reply) gets scanned and rewritten before it ships, the way a careful writer would pass over their own first draft, with one exception. A live chat or agent-session reply that isn't being saved to a file is allowed to keep its em dashes; everything else on that list isn't. The code pass is opt-in only, triggered by `/deslopify <file>` or as an explicit step inside a review. It never fires on its own, because rewriting code nobody asked you to touch is a good way to turn a small diff into a large, unreviewable one.

## When to reach for it

The prose half doesn't need reaching for. Text about to be shown to a person runs through it as a matter of course. The code half you invoke directly.

| Your situation | Where to go |
| --- | --- |
| Any text you're about to show someone: a PR body, a commit message, a doc page, a summary | Runs automatically, no invocation needed |
| A file has leftover generation tells you want gone: dead comments, impossible try/catch, placeholder docstrings | `/deslopify <file>` |
| You want to check whether a diff is well designed, simple, or follows repo conventions | [code-review](./code-review.md), not this skill |
| You want the diff simplified or de-duplicated | `/simplify` |

## Prerequisites

None. The skill is stateless and reads only the text or file in front of it.

## The prose pass

The pattern list is long, but it groups into a handful of families: puffery and promotional language ("pivotal moment", "vibrant", "groundbreaking"), a specific vocabulary of words that read as AI shorthand rather than plain English (delve, underscore, tapestry, showcase, fostering), stylistic tells (em dashes, colon-as-connector, title case headings, bolded inline labels that just restate the sentence), and communication artifacts left over from chat (`I hope this helps!`, cutoff disclaimers, sycophantic openers).

Finding and cutting those patterns is only half the job. Sterile, voiceless prose with every tell removed is its own kind of obvious. The pass also has to put opinion and rhythm back: react to what happened instead of listing it neutrally, vary sentence length instead of settling into one cadence, use "I" where it fits, and let a little unevenness stay rather than sanding every paragraph into the same shape.

Not every target gets the same treatment. A blog draft or a wiki page meant to be read straight through gets flattened into real prose, written the way an experienced writer would write it. A research answer or an engineering Q&A meant to be scanned keeps its bullets, bold labels, and tables, since forcing a scannable list into paragraphs just makes it slower to read, not more human. Em dashes follow a similar split: banned from anything being written to a file, allowed in a live chat or agent-session reply that isn't being saved to disk.

The last step is a self-audit: read the result and ask what still gives it away. Whatever's left gets fixed before the text is shown.

## The code pass

The code pass hunts a narrower thing: leftovers from a generation pass that a careful human wouldn't have left in, not general code quality. A restated comment above the line it restates, a `try`/`catch` around code that can't actually throw, a null check guarding against a state the types already rule out, a docstring that just repeats the function's name in sentence form, an over-long name where a short one was already clear, a stray `TODO` that isn't tracking anything real. Each one gets fixed directly, not written up as a list of findings to act on later.

Questions about whether a design is the simplest one, whether logic is duplicated elsewhere, or whether the diff matches the repo's conventions belong to other skills. If a code-pass finding is really about design rather than a generation tell, `deslopify` names it and leaves the fix to [code-review](./code-review.md) or `/simplify`.

Because the code pass touches files without the same turn-by-turn visibility the prose pass has (nobody's watching a chat response get edited before it lands), it reports what changed and why, file and line, in the same reply. It doesn't make the edits and stay quiet about them.

## Common questions

**Why does the prose pass run on everything and the code pass run on nothing by default?**
Because the risk is different in each direction. Skipping the prose pass means a puffed-up, dashed-up first draft reaches a human reader with no one catching it first. Running the code pass unasked means editing files that weren't part of the task, which is a worse failure than leaving one restated comment in place. The asymmetry is deliberate, not an oversight.

**Does it replace a design review?**
No. It only fixes things that look machine-generated: dead branches, restated comments, placeholder docstrings. It has nothing to say about whether the design itself is right, reused elsewhere, or the simplest shape for the problem. That's [code-review](./code-review.md) and `/simplify`.

**What if a `TODO` is genuinely tracking future work?**
It stays. The code pass only removes scaffolding that isn't a real, intended follow-up: stub functions and placeholder values left behind by a generation pass, not comments that describe an actual plan.

## It's working if

- Nothing written to a file still reads as a first-draft AI dump: no puffery, no em dashes, no "I hope this helps!"
- A narrative piece reads like an experienced writer wrote it; a reference answer stays scannable, bullets and bold labels intact, not flattened into longer paragraphs that say the same thing.
- The code pass only ever runs when asked, and never as a side effect of a design review.
- Every code-pass edit is reported with file and line in the same reply it was made in, not silently applied.
- A finding that's really about design or duplication gets named and handed off, not force-fit into a rewrite.

## Where it fits

`deslopify` sits alongside the main build chain rather than inside it. The prose half applies wherever text is about to be shown, regardless of which skill produced it: [tdd](./tdd.md), [code-review](./code-review.md), [to-tickets](./to-tickets.md), and every other skill's output all pass through it before a human sees them. The code half is a tool you reach for directly, most often paired with a `/code-review` pass or run on its own against a specific file.
