## What it does

`edit-article` restructures and tightens an existing article draft. It works in two passes. First it divides the piece into sections based on its own headings and checks the order those sections appear in: information is treated as a graph, not a line, so a section that depends on an idea introduced later has to move before it, not after. That reordering gets confirmed with you before anything else happens.

Only once the structure is agreed does it move section by section, rewriting each one for clarity, coherence and flow, with a hard cap of 240 characters per paragraph. The cap is there to force short paragraphs rather than to hit a number for its own sake; a paragraph that wants to run long is usually two ideas that should have been split anyway.

## When to reach for it

Ask to edit, revise, or improve an article draft, or invoke the skill directly. It does not fire on its own; it has to be asked for.

| Your situation | Fit |
| --- | --- |
| A draft exists and needs tightening, reordering, or clarity work | `edit-article` |
| Nothing is written yet, you're still deciding what to say | Not this: write a rough draft first |
| The piece is fine as structured and just needs a line-level pass | Still fits, the section-order step is a no-op if nothing needs to move |

## Structure before prose

The two passes are deliberately sequenced. Rewriting a paragraph that's about to move to a different section is wasted work, so the skill settles the shape of the piece, checks it against you, and only then touches sentences. The dependency check is the part worth watching: if section three assumes something section five explains, that's a real ordering bug in the draft, not a style issue, and it's worth catching before any line editing starts.

## Common questions

**Why the 240-character paragraph limit?**
It's a proxy for one-idea-per-paragraph. A paragraph that needs more than 240 characters to land its point is usually carrying a second point that deserves its own paragraph.

**What if I disagree with the proposed section order?**
Say so before the rewriting pass starts. The reorder is confirmed with you specifically so it can be pushed back on; nothing downstream depends on the first proposal being right.

**Does it rewrite everything in one pass?**
No, it goes section by section. That keeps each rewrite scoped to one part of the argument instead of trying to hold the whole article's voice in mind at once.

## It's working if

- The confirmed section order respects what each section assumes the reader already knows.
- Every paragraph in the rewritten sections is under the 240-character cap.
- The piece reads as tighter, not just shorter: no paragraph lost its point on the way to being smaller.
- You were asked to confirm the structure before any sentence-level rewriting began.

## Where it fits

`edit-article` is a standalone editing pass with no dependency on any other skill here. It's invoked directly against a draft you already have, and it stops once the rewrite is done; there's no hand-off to a publishing or review step.
