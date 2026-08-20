## What it does

`scaffold-exercises` builds the directory structure for a course section: numbered section folders, numbered exercise folders inside them, and the `problem/`, `solution/`, and `explainer/` subfolders each exercise needs, each with a real (not empty) `readme.md`. The result is built to pass `pnpm ai-hero-cli internal lint` on the first try, not to be fixed up afterward.

It's a scaffolding skill in the same spirit as this collection's `create-*-component` skills: get the shape right and lint-clean before any real content goes in, so writing the actual exercise is the only thing left to do.

## When to reach for it

Type `/scaffold-exercises`, or ask to scaffold exercises, create exercise stubs, or set up a new course section, and the agent will reach for it.

Reach for it right after you've decided on a section's shape (names, numbering, which exercises need `problem/solution` pairs versus a plain `explainer`) and before you've written any real content. It's not the tool for filling in an exercise that already has its folders; that's just writing.

## Naming and numbering

- Sections live directly under `exercises/`, named `XX-section-name/` (e.g. `01-retrieval-skill-building`).
- Exercises live inside a section, named `XX.YY-exercise-name/` (e.g. `01.03-retrieval-with-bm25`), where `XX` matches the parent section number.
- All names are dash-case: lowercase, hyphen-separated.

## Variant subfolders

Every exercise needs at least one of:

- `problem/` - the student's workspace, with TODOs.
- `solution/` - the reference implementation.
- `explainer/` - conceptual material with no TODOs.

Default to `explainer/` alone when stubbing from a plan that doesn't specify which variants a given exercise needs.

## What the linter actually checks

`pnpm ai-hero-cli internal lint` is the source of truth, not a suggestion:

- Each exercise has at least one of `problem/`, `explainer/`, or `explainer.1/`.
- `readme.md` exists and has real content (a title line is enough) in the primary subfolder.
- No `.gitkeep` files, no `speaker-notes.md` files.
- No broken links inside readmes.
- No `pnpm run exercise` commands inside readmes.
- A `main.ts` file (more than one line) if the subfolder has code; a readme-only exercise is fine without one.

## Workflow

1. Parse the plan: section names, exercise names, and which variants each needs.
2. `mkdir -p` every path up front.
3. Write a minimal `readme.md` per variant folder: a title line plus a one-line description is enough for a stub.
4. Run `pnpm ai-hero-cli internal lint`.
5. Fix whatever it flags and re-run until it's clean.

## Moving or renaming exercises

Use `git mv`, never a plain `mv`: it preserves history for content that's about to be renumbered as the section grows. Update the numeric prefix to keep ordering correct, then re-run the linter, since a renumber can silently break a cross-reference elsewhere.

```bash
git mv exercises/01-retrieval/01.03-embeddings exercises/01-retrieval/01.04-embeddings
```

## Common questions

**Do I need `problem/`, `solution/`, and `explainer/` for every exercise?**
No, only at least one. Plenty of exercises are explainer-only. Add `problem/` and `solution/` together, as a pair, only when the plan actually calls for a hands-on exercise.

**What goes in a stub readme versus a finished one?**
A stub only needs a title and a short description; that's enough to pass lint and hold the exercise's place. The real content comes later, as its own pass, once the section's shape is settled.

**What if lint fails after scaffolding?**
Read what it names specifically; the common misses are an empty readme, a missing `main.ts` in a code-bearing subfolder, or a stray `.gitkeep` left over from an earlier manual attempt. Fix the specific thing, don't restructure the whole section.

## It's working if

- `pnpm ai-hero-cli internal lint` passes clean on the first run after scaffolding, not after several rounds of fixes.
- Every exercise folder has at least one variant subfolder with a non-empty `readme.md`.
- Numeric prefixes are consistent between a section and the exercises inside it.
- A rename used `git mv`, and history for that content is intact.

## Where it fits

A standalone scaffolding skill with no dependency on the rest of this collection; its closest relatives are the `create-*-component` skills, which follow the same shape-first, lint-clean-before-content approach for application code instead of course material.
