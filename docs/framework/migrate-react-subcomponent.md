## What it does

`migrate-react-subcomponent` moves an already-implemented, already-tested sub-component out of a flat sibling file and into its own named subfolder — a mechanical move, never a rewrite. `git mv` the file, decide which props are private to it versus shared with the parent, fix every import, then verify. No new tests get written from scratch, and nothing about the component's own logic changes.

It also carries a caution that's easy to miss without deliberately looking for it: an automated "every component lives in its own folder" check can go silently stale after a directory reorganization, scanning a path that no longer exists and reporting success while checking nothing. That's exactly how flat sub-components accumulate undetected — not because anyone broke a rule, but because the gate stopped watching.

## When to reach for it

Reach for it whenever a capital-letter, JSX-returning component sits flat next to its parent instead of in its own subfolder — whether an existing structure check caught it, or you found it by inspection.

| Your situation | Where to go |
| --- | --- |
| A component file with a real implementation is sitting flat and needs its own subfolder | `migrate-react-subcomponent` |
| The component doesn't exist yet — nothing to move | [create-react-component](./create-react-component.md) (or its Vue/Angular siblings) instead |
| The component is used by more than one unrelated consumer, or exported from your project's public entry point | A standalone relocation, not this skill — its companion files and export path carry different requirements |
| You're building this for `giselle-mui` specifically | [create-giselle-component](../org/create-giselle-component.md) for new components, or `migrate-giselle-subcomponent` for this exact same migration with giselle-mui's own conventions baked in |

## Prerequisites

A local checkout of the project, and `rg` plus whatever your project uses for typechecking/building, for the import-verification step. The skill writes no files outside the component folder it's asked to migrate.

## Why "mechanical move," not "rebuild"

`create-react-component`'s two-phase scaffold-then-TDD workflow assumes the component doesn't exist yet: it explicitly withholds the component file until phase two, then drives it into existence one failing test at a time. Running that workflow against an already-working component would mean discarding validated logic and tests to rebuild them from stubs — pure risk, no benefit. This skill exists for the other case: the code is done and shipping, it's just sitting in the wrong place in the folder tree.

## Framework-agnostic on purpose

Unlike `migrate-giselle-subcomponent` (its `org/`-bucket counterpart, built specifically around giselle-mui's own `cleanup-workflow.md` and `check-structure.js`), this skill assumes nothing about your project's specific structure-checking tooling, naming doc, or component-library conventions. Where a step depends on a project-specific choice — how types are separated, what a structure gate looks like, whether one exists at all — it says so explicitly and defers to whatever your project already does, rather than assuming a doc or script that may not exist.

## Common questions

**How do I know if a flagged file is a real sub-component or a heuristic false positive?**

The companion-file-count heuristic (rank candidates by how many sibling files share their stem) is a proxy for "which file is the folder's primary composition file," not a parser of the actual rule. Open the file and confirm it exports a function that starts with a capital letter and returns JSX. A constants or hooks file with zero companions can rank as a "violation" under the heuristic alone despite never being a component at all.

**What if my project has no automated structure check at all?**

That's fine — the skill doesn't require one. It just means a future recurrence of the same problem won't be caught automatically; that's worth knowing, not something this skill fixes for you.

**How do I know an import-path fix is actually complete?**

Re-run the same search for the old specifier after editing — zero matches is the completion criterion, not "I fixed the ones I found." Follow with a typecheck or build as a second, independent check, since a dynamic import can slip past a text search.

## It's working if

- `git mv` is the only thing that touches the component's own logic — the diff for the component file itself, beyond its import lines, is empty.
- Your project's full quality gate passes with no new failures — the same tests that passed before the move still pass after it.
- A stale structure-gate path, once found, gets fixed and re-seeded in its own commit before any file is actually moved.

## Where it fits

A structural-cleanup skill, reached for opportunistically whenever a flat sub-component surfaces, not run on a schedule. It complements [create-react-component](./create-react-component.md) (and its Vue/Angular siblings) as the other half of "keep an existing component tree honest": one builds new components correctly from the start, the other fixes ones that ended up in the wrong place.
