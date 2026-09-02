---
name: migrate-react-subcomponent
description: Migrate an existing, already-implemented flat sub-component file (React, framework-agnostic) into its own subfolder, alongside its own types/tests/styles, without rewriting its logic. A mechanical move of working code, not a scaffold-from-scratch rebuild — if the component does not exist yet, use create-react-component instead. Use when a capital-letter, JSX-returning component sits as a flat sibling file next to its parent instead of in its own subfolder, or when asked to extract/relocate/fix a flat sub-component.
---

# Migrate React Sub-component

Moves an already-working, already-tested sub-component out of a flat sibling file and
into its own named subfolder. Every step here is a **move or an extraction of existing
code** — never new implementation, never tests written from scratch.

**Not `create-react-component`** (or its framework siblings `create-vue-component`,
`create-angular-component`). Those scaffold a brand-new component from nothing, via a
two-phase scaffold-then-TDD workflow that explicitly requires the component file to *not*
exist yet. This skill is the opposite case: the component is done, tested, and shipping;
it just lives in the wrong place. The test: does the component file already exist with a
real implementation? Yes → this skill. No → the matching `create-*-component` skill.

**Not a standalone-component relocation.** If the component is used by more than one
unrelated consumer, exported from your project's public entry point or barrel, or
documented as independently reusable, stop — moving *that* kind of component is a
different, bigger job (its own companion files are usually mandatory, its export path
is public API), not what this skill covers. This skill is for a component that only ever
makes sense inside the one parent it currently lives next to.

If your project has its own written convention for this exact distinction (check for a
`CONTRIBUTING.md`, a components-conventions doc, or similar), defer to it over the
general test above.

---

## Step 1 — Confirm scope

Check: is this component imported only by files inside its own current folder (siblings
and the parent)? Is it absent from any public barrel/entry point? If either answer is
"no," it's a standalone relocation, not a sub-component migration — hand off instead of
proceeding.

## Step 2 — Find every flat sub-component in the target folder

List every component file sitting directly in the target folder (excluding stories,
default-export fixtures, `index.*`, `types.*`, and any shared hooks). If there's more
than one, rank candidates by companion-file count: for each file's own stem, count
sibling files starting with `<stem>.` (its own test file, styles file, etc. — whatever
your project's own naming convention uses). The richest family is the folder's own
primary composition file and stays put; every other flat file exporting a component is a
migration candidate.

**Do not trust the count blindly.** It's a heuristic, not a parser — it doesn't check
what the file actually exports. Before adding a candidate to your list, open it and
confirm it exports a function that starts with a capital letter and returns JSX. A flat
file exporting constants, hooks, or a barrel re-export is not a sub-component, even with
zero companions — leave it flat.

## Step 3 — Check for a stale structure gate, if your project has one

If your project has an automated check for "every component lives in its own folder"
(a custom lint rule, a repo script, a CI job), verify it's actually looking at this
folder's *current* path — not a path the folder moved away from at some point. A check
that silently scans a folder that no longer exists will report success while checking
nothing, which is exactly how flat sub-components accumulate undetected after a
directory reorganization. If you find and fix a stale reference like this, expect it to
surface every existing violation in the newly-visible folder at once — seed whatever
baseline/exemption mechanism the gate uses with all of them in the same commit that fixes
the path, so the gate lands green rather than failing the build for everyone until every
file is migrated.

If your project has no such gate at all, that's fine — just don't assume "no complaints"
means "no violations, elsewhere in the tree."

## Step 4 — Reconnaissance (per file, before touching it)

Verify, don't construct: does the file already have its props type separated out (if
that's your project's convention)? Does a test file already exist and pass? Is there any
duplicated JSX in it that should be a shared helper instead? Is there inline conditional
logic producing a derived value that should be its own function? Because this is a
mechanical move of working code, most of this should already be true. If reconnaissance
does surface a real defect, fix it as part of the move rather than letting it grow into
an unrelated refactor.

## Step 5 — Name the new subfolder

The folder (and file, if your convention uses `<name>.tsx`) is named from the **exported
component name**, kebab-cased — not necessarily the current filename.

1. Read the file's actual `export function`/`export const` — that name is authoritative,
   not the filename.
2. kebab-case it.
3. Compare to the current filename's stem. If they match, the move needs no
   import-specifier text changes anywhere (see Step 7). If they differ — the file was
   already misnamed relative to its own export — every import of the old specifier needs
   a text update, and this move is the right time to fix it.

## Step 6 — Perform the move

```sh
mkdir -p <parent>/<folder-name>
git mv <parent>/<old-name>.tsx <parent>/<folder-name>/<new-basename>.tsx
```

One `git mv` per file, so history follows the rename. Move any companion files
(a dedicated test file, a styles file) into the new folder alongside it, renamed to the
new basename in lockstep.

**Types.** Decide per-field, not per-file: a prop used only by this sub-component moves
into the new folder's own types file (or stays inline, if that's your project's
convention for small components). A prop also read by a sibling or the parent stays
where it is and gets imported, never duplicated.

**Tests.** If the sub-component already has dedicated test cases mixed into the parent's
own test file rather than co-located, cut those exact cases into the new folder's own
test file, adjusting only the import path — moving real, passing tests, not writing new
ones.

**Barrel.** If the folder uses an `index.ts`, create one in the new subfolder re-exporting
the component (and its prop type, if separated), then update the **parent's** own barrel
to re-export from the new subfolder path — this line changes even when nothing else does,
since a directory import replaces a file import unless Step 5 found no rename.

## Step 7 — Update every import path (mechanically, verifiably)

Before editing anything, enumerate every consumer of the old specifier:

```sh
rg -n "['\"](\.\./)*<old-basename>['\"]" src/
```

**No rename case:** module resolution treats a bare `from './<stem>'` identically whether
`<stem>.tsx` is a file or `<stem>/index.ts` is a directory barrel — the move alone is
sufficient, zero text changes needed. Run the `rg` above anyway to confirm nothing
references a deeper path.

**Rename case:** every match is a file that must change. Edit each, then re-run the same
`rg` for the **old** name — zero results is the actual completion criterion, not "I found
and fixed the ones I saw." Follow with your project's typecheck or build step as a
second, independent verifier: a missed import surfaces as a compile error there even if
the text search missed it (a dynamic `import()`, for instance).

## Step 8 — Definition of done

- [ ] Own named subfolder, nested inside the parent folder
- [ ] Props type separated from the component file (if that's your project's convention)
- [ ] No duplicated JSX blocks
- [ ] Derived-value conditional logic extracted to a named function, not left inline
- [ ] `displayName` set and `ref` forwarding used, if it wraps a native element (matching
      whatever your project already requires for other components)
- [ ] At least one test file, co-located in the new folder
- [ ] Barrel updated on both ends (new folder's own, and the parent's re-export)
- [ ] Your project's full quality gate (lint, typecheck, tests, build) passes
- [ ] If a structure gate exists and needed a stale-path fix: the migrated path is
      confirmed clean in its output, and any baseline/exemption entry for it is removed

## Step 9 — Commit and repeat

One sub-component (or one tight, obviously-related batch) per commit, with a message
that says what moved and why. If Step 3 surfaced a stale gate, land that fix as its own
first commit, separate from any component moves, so it's independently reviewable and
green on its own. Repeat Steps 4–8 for the next candidate until the folder has none left.
