## What it does

`migrate-giselle-subcomponent` moves an existing, already-implemented sub-component out of a flat sibling `.tsx` file and into its own named subfolder, matching `docs/components/cleanup-workflow.md`'s Scenario A structure in the `giselle-mui` repo. It is a mechanical move: `git mv` the file, split shared vs. private types, fix every import, then verify — never a rewrite, and never new tests written from scratch.

It also carries the parts of that migration that live only in `scripts/check-structure.js`'s source rather than in any doc: the structure gate's `PARENT_DIRS_TO_CHECK` list can go stale (pointing at a folder that no longer exists after a move), and it only recurses one level deep per registered domain, so a sub-component nested inside an already-compliant sub-component folder needs its own, deeper domain entry to ever become visible to the gate at all.

## When to reach for it

Use it whenever a capital-letter, JSX-returning function is sitting flat next to its parent component instead of in its own subfolder — whether `npm run check`'s Structure check already caught it, or you found it by inspection.

| Your situation | Where to go |
| --- | --- |
| A `.tsx` file with a real implementation is sitting flat and needs its own subfolder | `migrate-giselle-subcomponent` |
| The component doesn't exist yet — no `.tsx` file, nothing to move | [create-giselle-component](./create-giselle-component.md) instead |
| The component is independently usable (exported from `src/index.ts`, or a second consumer could import it standalone) | Scenario B in `cleanup-workflow.md`, not this skill — different checklist, different companion files |
| You're not sure whether a flagged file is a real violation or a heuristic false positive | Step 2 of this skill — check the actual export, not just the companion-file count |

## Prerequisites

None beyond a local `giselle-mui` checkout and `rg`/`tsc` on `PATH` for the import-verification step. The skill writes no files outside the component tree it's asked to migrate.

## Why "mechanical move," not "rebuild"

`create-giselle-component`'s two-phase scaffold-then-TDD workflow assumes the component doesn't exist: `<name>.tsx` must be absent in its first phase, and its quality gate (`src/quality-gate/two-phase-scaffold.test.ts`) enforces `it.todo` stubs before real tests. Running that workflow against an already-working component would mean discarding validated logic and tests to rebuild them from stubs — pure risk, no benefit, and it fights the two-phase-scaffold gate directly. This skill exists specifically for the other case: the code is done, tested, and shipping; it's just sitting in the wrong place in the folder tree.

## The two things `cleanup-workflow.md` doesn't tell you

**Subfolder naming comes from the exported symbol, not the current filename.** A file named `milestone-modal.tsx` that actually exports `TaskDetailsModal` doesn't become `milestone-modal/` — it becomes `task-details-modal/`, and every import of the old specifier needs a text change. `naming-conventions.md` rule 3 makes this explicit; `cleanup-workflow.md`'s own Scenario A section doesn't spell it out directly.

**The structure gate's recursion is exactly one level per registered domain.** `scripts/check-structure.js`'s `findNestedSubComponentViolations` reads a registered domain's immediate subdirectories and checks *those* for flat siblings — it never recurses a level deeper. Migrating a helper that lives inside an already-Scenario-A-compliant sub-component folder (e.g. a card's own internal badge component) needs that sub-component folder registered as its own domain entry, separately from its parent's.

## Common questions

**What if fixing a stale `PARENT_DIRS_TO_CHECK` entry surfaces a dozen violations at once?**

Seed `KNOWN_VIOLATIONS` with all of them (plus any confirmed false positives, documented with a comment explaining why) in the same commit that fixes the domain registration. That lands the gate fix green, with zero new failures, and turns the rest of the work into shrinking the baseline one entry at a time — the same ratchet pattern the rest of `check-structure.js` already uses.

**How do I know if a flagged file is a real sub-component or a heuristic false positive?**

The companion-file-count heuristic (`countCompanions` in `check-structure.js`) ranks candidates by how many sibling files share their stem — it's a proxy for "which file is the folder's primary composition file," not a parser of the actual rule. Open the file and confirm it exports a function that starts with a capital letter and returns JSX. A constants or hooks file with zero companions can rank as a "violation" under the heuristic alone despite never being a component at all.

**How do I know an import-path fix is actually complete?**

Re-run the same `rg` search for the old specifier after editing — zero matches is the completion criterion, not "I fixed the ones I found." Follow with `tsc --noEmit` as a second, independent check, since a dynamic `import()` can slip past a text search.

## It's working if

- `git mv` is the only thing that touches the component's own logic — the diff for the `.tsx` file itself, beyond its import lines, is empty.
- `node scripts/check-structure.js` reports the migrated path is gone from its violations, and the corresponding `KNOWN_VIOLATIONS` entry has been removed.
- `npm run check:verify` exits 0 with no new test failures — the same tests that passed before the move still pass after it.
- A stale `PARENT_DIRS_TO_CHECK` entry, once found, gets fixed and re-seeded in its own commit before any file is actually moved.

## Where it fits

`migrate-giselle-subcomponent` is a structural-cleanup skill, not a build-chain step — it's reached for opportunistically, whenever a Scenario A violation surfaces, rather than run on a schedule. It complements [create-giselle-component](./create-giselle-component.md) (new components) and [audit-giselle-tests](./audit-giselle-tests.md) (test-quality cleanup on existing components) as the third leg of "keep an existing `giselle-mui` component tree honest," without overlapping either.
