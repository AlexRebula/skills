---
name: migrate-giselle-subcomponent
description: Migrate an existing, already-implemented flat sub-component .tsx file in giselle-mui into its own Scenario A subfolder (own types.ts, index.ts barrel, co-located tests), per docs/components/cleanup-workflow.md. A mechanical move of working code, not a scaffold-from-scratch rebuild — if <name>.tsx does not exist yet, use create-giselle-component instead. Use when a capital-letter, JSX-returning function sits as a flat sibling .tsx next to its parent component, when `npm run check` reports a Structure check failure, or when asked to extract/relocate/fix a flat sub-component.
---

# Migrate Giselle Sub-component

Moves an already-working, already-tested sub-component out of a flat sibling `.tsx` file
and into its own named subfolder, per `docs/components/cleanup-workflow.md`'s Scenario A.
Every step here is a **move or an extraction of existing code** — never new implementation,
new tests written from scratch, or `it.todo` scaffolding.

**Not `create-giselle-component`.** That skill's Phase 1 requires `<name>.tsx` to *not*
exist yet — it scaffolds a brand-new component and TDDs it into being. This skill is the
opposite case: the component is done, tested, and shipping; it just lives in the wrong
place. The test: does the `.tsx` file already exist with a real implementation? Yes →
this skill. No → `create-giselle-component`.

**Not Scenario B.** If Phase 0 of `cleanup-workflow.md` says the component is
independently usable (exported from `src/index.ts`, listed in
`docs/component-inventory.md`, or a plausible standalone import for a second consumer),
stop — that's a standalone-component relocation with its own checklist and companion
files (`.const.ts`, `.stories.tsx` mandatory, README mandatory, package barrel export).
This skill only handles Scenario A: a component that only ever makes sense inside one
specific parent.

---

## Step 1 — Confirm scope

Read `cleanup-workflow.md` Phase 0's decision table against the file in front of you.
Confirm every "no": not exported from `src/index.ts`, not in
`docs/component-inventory.md`, only imported by siblings in the same folder. If any
answer flips to "yes", hand off to Scenario B instead of proceeding.

## Step 2 — Find every flat sub-component in the target domain

Given a parent folder (e.g. `src/components/lab/timeline/two-column/`), list every
`.tsx` file sitting directly in it (excluding `*.stories.tsx`, `*.defaults.tsx`, and
anything matching `scripts/check-structure.js`'s `isAllowedFlat` — `index.ts`, `types.ts`,
`use-*.ts`). If there is more than one, rank candidates by companion-file count: for each
stem, count sibling files starting with `<stem>.` (its own `.styles.ts`, `.const.ts`,
`.test.ts`, etc.). The richest family is the folder's own primary composition file and
stays put; every other flat `.tsx` is a migration candidate. This mirrors
`findNestedSubComponentViolations`/`countCompanions` in `scripts/check-structure.js`
exactly — when in doubt, that script's logic is the tie-breaker, not intuition.

**Do not trust the count blindly.** It's a heuristic, not a parser — it doesn't check
what the file actually exports. Before adding a candidate to your migration list, open it
and confirm it exports a function that starts with a capital letter and returns JSX (the
real Phase-2-Step-5 rule). A flat file exporting constants, hooks, or re-exports (e.g. an
`icons.tsx` holding `ReactNode` icon constants, not components) is not a sub-component,
even with zero companions. Leave it flat and, if the domain is newly registered in the
gate (Step 3), add its exact path to `KNOWN_VIOLATIONS` as a permanent, documented
exception rather than forcing a nonsensical folder split.

## Step 3 — Make the domain visible to the structure gate

Check `scripts/check-structure.js`'s `PARENT_DIRS_TO_CHECK` for an entry matching your
target folder's **current** path. A stale entry (pointing at a path that no longer
exists) fails silently — `findFlatFileViolations`/`findNestedSubComponentViolations` both
early-return `[]` via `existsSync`, so the gate reports success while checking nothing.
`git log --follow` on the parent folder will tell you if it moved.

Remember the recursion depth: each registered domain is scanned exactly one level deep
for flat files, and one level of *its* subdirectories for nested flat files. If the
domain already contains a properly-nested sub-component folder (e.g. `two-column/`
containing `phase-card/`) that itself has flat helper files one level further down, that
inner folder needs its **own** entry in `PARENT_DIRS_TO_CHECK` — the parent domain's
registration does not reach that deep.

Once the domain (and any needed nested domain) is correctly registered, run
`node scripts/check-structure.js` once before migrating anything. It will report every
violation newly visible in that domain — cross-check this list against Step 2's manual
list (including your semantic exclusions). Any mismatch means either the heuristic caught
a false positive (exclude it, per Step 2) or you missed a real violation (add it).

**Seed the ratchet baseline before committing the gate fix.** Adding a domain surfaces
every violation in it as `newViolations` immediately, which fails the gate for everyone
until every file is migrated — not viable for more than one or two files. Instead, add
every genuine violation just discovered (plus any documented semantic exclusions) to
`KNOWN_VIOLATIONS` in the same commit that fixes/adds the `PARENT_DIRS_TO_CHECK`
entries. This lands the gate fix on its own, green, with zero new violations, and turns
the rest of this skill into "shrink the baseline one entry at a time."

## Step 4 — Reconnaissance (per file, before touching it)

Run `cleanup-workflow.md`'s Scenario A reconnaissance checks against the file: `types.ts`
already covers its Props (flag anything declared inline in the `.tsx`), every `sx`
constant it imports actually exists in the parent's styles file, every `utils.ts` call
matches the real signature, SonarQube is clean, a dedicated `describe` block exists in
the parent's test file (or doesn't — see Step 6), it's exercised in a story if it has a
non-trivial variant, JSDoc covers all props including behaviour flags, and it's already
exported from the parent's `index.ts`.

Because this is a mechanical move of working code, most of these should already be true —
treat this step as **verification**, not construction. If reconnaissance does surface a
real defect (an inline `type`, a duplicated JSX block, dead conditional logic), fix it as
part of this move since Scenario A's Definition of Done requires it anyway, but do not
let it grow into an unrelated refactor.

## Step 5 — Name the new subfolder

The folder/file basename is **kebab-case of the exported component name**, not
necessarily the current flat filename — `naming-conventions.md` rule 3 ("folder name =
component name in kebab") plus the redundant-prefix exception ("drop the parent's
name/scope from the sub-component's folder name, but keep the sub-component's own full
name on its exported symbol and file"). Concretely:

1. Read the file's actual `export function `/`export const ` — that PascalCase name is
   authoritative, not the filename.
2. kebab-case it. If a leading segment duplicates a word already supplied by an ancestor
   path (e.g. the parent's own name), drop it from the **folder** only — the `.tsx`
   basename and the exported symbol keep the full name regardless.
3. Compare the result to the current flat filename stem. If they match (the common case —
   `chevron-down-icon.tsx` → `ChevronDownIcon` → `chevron-down-icon/`), the move needs no
   import-specifier text changes anywhere (see Step 7). If they differ — a
   `naming-conventions.md` violation, like a `milestone-modal.tsx` file exporting
   `TaskDetailsModal` — the correct folder/file name is `task-details-modal/`, and every
   import of the old specifier must be textually updated.

## Step 6 — Perform the move

```sh
mkdir -p <parent>/<folder-name>
git mv <parent>/<old-name>.tsx <parent>/<folder-name>/<new-basename>.tsx
```

Use one `git mv` per file so history follows the rename. If companion files already
exist flat next to it (a `.styles.ts`, `.const.ts` specific to just this sub-component),
`git mv` those into the new folder too, renamed to the new basename in lockstep.

**Types.** Decide per-field, not per-file: a Props field used only by this sub-component
moves into the new folder's own `types.ts`. A field also read by a sibling or the parent
(check by grepping the type name across the folder) stays in the parent's `../types.ts`
and gets imported, never duplicated — this is `cleanup-workflow.md`'s explicit rule
("Import any shared types the parent or siblings also use from the parent's
`../types.ts` — do not duplicate them"). If the whole Props type is genuinely private,
move the whole declaration; if only some fields are shared, keep the type where it is and
have the sub-component import it, rather than partially duplicating it.

**Tests.** If the sub-component already has dedicated test cases living inside the
parent's `<parent>.test.ts` (mixed in, not co-located — check for a `describe` block
whose name matches this sub-component), cut those exact test cases into the new folder's
own `<basename>.test.ts`, adjusting only the import path. This is moving real, passing
tests, not writing new ones — if no dedicated block exists, add one covering the same
behaviour the reconnaissance pass already found the file to have (still not new
behaviour, just newly-covered).

**Barrel.** Create `index.ts` in the new folder:

```ts
export { <ExportName> } from './<basename>';
export type { <ExportName>Props } from './types'; // only if this folder defines its own Props
```

Then update the **parent's** `index.ts` to re-export from the new subfolder path instead
of the old flat path — this line's specifier changes even when nothing else does, since
`./<folder-name>` (a directory) replaces `./<old-basename>` (a file), and they're the same
string only when Step 5 found no rename.

## Step 7 — Update every import path (mechanically, verifiably)

Before editing anything, enumerate every consumer of the old specifier:

```sh
rg -n "['\"](\.\./)*<old-basename>['\"]" src/
```

**No rename case (folder name matches old filename stem):** module resolution treats
`./<stem>` identically whether `<stem>.tsx` is a file or `<stem>/index.ts` is a directory
barrel. Every import written as a bare `from './<stem>'` needs **zero** text changes —
the move alone is sufficient. Run the `rg` above anyway to confirm nothing references a
deeper path (`./<stem>/anything` would have been broken before the move and stays broken
— that's pre-existing, not something this migration introduces).

**Rename case:** every match from the `rg` above is a file that must change. Edit each,
then re-run the same `rg` for the **old** name — zero results is the completion
criterion for this step, not "I found and fixed the ones I saw." Follow with
`npm run typecheck` (or plain `tsc --noEmit`) as a second, independent verifier: a missed
import surfaces as a compile error there even if `rg`'s pattern missed it (e.g. a dynamic
`import()`).

## Step 8 — Gate, Definition of Done, ratchet cleanup

> **Inventory / matrix ports:** Scenario A checklist below is unchanged. If this work is also a Minimals↔giselle **inventory** port, the row is not fully done until matrix **G C P M N U** are green **and** this folder DoD is met — matrix **D** is the rollup. See `cleanup-workflow.md` **Inventory / migration DoD** and the wiki matrix legend. Pure Scenario A folder moves (no inventory row) ignore matrix gates.

Definition of done for a sub-component (from `cleanup-workflow.md` Scenario A — this list
is reproduced here because every invocation of this skill ends on it; if it and the
source file ever disagree, the source file wins and this list needs updating to match):

- [ ] Own named subfolder, nested inside the parent folder
- [ ] No `type`/`interface` in the `.tsx` — all in this folder's own `types.ts` (shared
      types imported from parent `../types`, never duplicated)
- [ ] No inline `sx` — extracted regardless of property count
- [ ] No duplicated JSX blocks
- [ ] Derived-value conditional logic lives in `utils.ts`
- [ ] JSDoc covers all props including behaviour flags
- [ ] `displayName` set; `React.forwardRef` used if it wraps a DOM/MUI element
- [ ] At least one test file, co-located in this folder
- [ ] Own `index.ts`, re-exported from the parent's `index.ts`
- [ ] SonarQube: zero violations
- [ ] `npm run check:verify` exits 0
- [ ] Quality status line added to the component's JSDoc (`DoD n/12`)

Run `node scripts/check-structure.js` — the path you just migrated must no longer appear
in its output. Remove that exact path string from `KNOWN_VIOLATIONS`. If the console
prints that a `KNOWN_VIOLATIONS` baseline entry no longer exists on disk, that's
confirming you removed the right one.

## Step 9 — Commit and repeat

One sub-component (or one tight, obviously-related batch — e.g. every flat sub-component
in the same folder) per commit: `refactor(<parent-scope>): extract <ExportName> into its
own Scenario A subfolder`. Land the gate-registration-plus-ratchet-seed from Step 3 as its
own first commit, separate from any component moves, so it's independently reviewable
and immediately green. Repeat Steps 4–8 for the next entry in `KNOWN_VIOLATIONS` until
the domain's baseline is empty.

---

## Where the checklist needed interpretation

`cleanup-workflow.md`'s Scenario A section describes the destination shape well but
leaves several mechanics implicit. This skill resolves them as follows — if you find a
case these resolutions don't cover, update this section rather than guessing silently
next time:

- **Subfolder naming derives from the exported symbol, not the current filename** (see
  Step 5) — `naming-conventions.md` rule 3 makes this explicit, but `cleanup-workflow.md`
  itself doesn't say it directly.
- **Shared vs. private types is a field-level decision, not a file-level one** (see
  Step 6) — avoids both over-extracting (breaking a sibling that reads the same field)
  and under-extracting (leaving a genuinely private field in a shared file that now has
  to import it back).
- **"Update every import path" is mechanical and verifiable, not a vibe** (see Step 7):
  `rg` for the old specifier before and after (zero matches after is the actual
  completion criterion), `tsc --noEmit` as a second, independent witness. Most single-file
  renames where the folder name matches the old stem need zero import edits at all —
  worth confirming explicitly rather than assuming either way.
- **The structure gate's own recursion depth is one level per registered domain** (see
  Step 3) — a detail that lives only in `check-structure.js`'s source, not in any doc.
  Migrating a component that's already nested one level (e.g. a helper inside an
  already-Scenario-A-compliant sub-component folder) needs its own, deeper domain
  registration to become visible to the gate at all.
- **The companion-count heuristic is a proxy, not the rule** (see Step 2) — it can flag a
  constants/hooks file with zero companions as if it were an under-extracted component.
  Always confirm the real rule (capital-letter, JSX-returning export) before trusting the
  heuristic's ranking.
