---
name: cleanup-component
description: "Diagnose and fix component quality debt across two independent axes, structural (OSS Quality Standards §5 Component Structure Rules / §6 Component API Contract: inline `sx`, un-extracted constants/utils, missing `types.ts`, folder-per-component) and naming/decomposition (`naming-conventions.md`'s element-first handler naming and `Inputs` prop-bag sections, `component-refactor-conventions.md`'s cascading-state-decomposition and one-group-at-a-time sequencing sections), applying only the fixes a target actually needs, since a real component may need one axis, the other, both, or neither. Not `migrate-react-subcomponent` or any similar structural-only migration skill: those assume the component is already correctly named and decomposed and only relocate it. Use when asked to \"cleanup component X\" or \"refactor component X\" for any target file or folder, in any project."
---

# Cleanup Component

Triggered by **"cleanup component X"** or **"refactor component X"**, for any target
component file or folder in any project. This skill **diagnoses before it fixes**: it
never assumes a target has structural debt, naming/decomposition debt, both, or neither.
It checks each axis independently against the loaded standards, then applies only the
fixes the diagnosis actually found.

## Not `migrate-react-subcomponent` or any similar structural-only migration skill

A structural-only mechanical-move skill takes a component that is already correctly
named, already correctly decomposed, and already working (its only problem is that it's a
flat sibling file instead of living in its own folder), and moves it, extracting
`types.ts`/styles/tests along the way. It never inspects handler names, prop-bag naming,
or cascading state logic; it explicitly assumes that work is already done.

This skill makes no such assumption. It runs a diagnostic pass over **both** the
structural axis (the same folder-per-component/`types.ts`/`sx`-extraction territory a
structural-only skill mechanically fixes) **and** the naming/decomposition axis (handler
naming, `Inputs` prop-bag naming, cascading-logic decomposition, refactor sequencing) that
a structural-only skill never looks at. A target this skill is asked to clean up may turn
out to need exactly what a structural-only migration skill already handles, need only
naming/decomposition work, need both, or need neither: this skill is the one that figures
out which, before touching anything. Where a target's diagnosis comes back structural-only
and a project-specific structural-migration skill already exists for that case, prefer
delegating the mechanical move to it instead of re-implementing that logic here — this
skill's own job is diagnosis plus the naming/decomposition fix, not reinventing every
project's own structural tooling.

## Arguments

`cleanup component <target>` / `refactor component <target>`: path to the target component
file or folder.

`--standards-url <url>`: optional, defaults to the public LittleBranches OSS Quality
Standards raw URL,
`https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md`.
Mirrors `review-pr`'s own `--standards-url` flag and default-URL convention exactly: this
skill does not invent a new flag name or a new default-URL scheme.

---

## Process

### 1. Load OSS Quality Standards

Fetch the barrel document from `--standards-url` (or the default URL above) the same way
`review-pr`'s "Org / external standards" step does:

```sh
curl -sS "<standards-url>"
```

Step 2's naming/decomposition diagnosis needs two expanded docs the barrel only summarizes:
`naming-conventions.md` and `component-refactor-conventions.md`. Fetch both from the same
base path (swap `AGENTS.md` in `--standards-url` for each filename, per the barrel's own
"Raw base URL for expanded docs" convention), not just their section names cited below.

If any fetch fails with a non-200 status, note the failure and stop: the diagnostic pass in
step 2 has nothing to check against until the standards docs are reachable, so a failed
fetch is a hard stop for this skill (unlike `review-pr`, which can fall back to repo-local
standards alone).

### 2. Diagnose both axes: never assume either one

Run both checks below **independently**. Do not infer one from the other, and do not skip
either check just because the target "looks like" it only needs one kind of work; confirm
it.

**Structural-rule violations** (AGENTS.md §5 Component Structure Rules / §6 Component API
Contract):

- Inline `sx={{ ... }}` left in the component file instead of extracted to
  `<name>.styles.ts` (§5.4 / §6.2)
- Constants or utility logic defined directly in the `.tsx` instead of extracted to
  `<name>.const.ts` / `<name>.utils.ts` (§5.4)
- Missing `types.ts`: a props interface declared inline instead of in its own file
  (§5.4 / §5.5)
- Not living in its own folder-per-component (§5.1)

**Naming/decomposition-rule violations**: `naming-conventions.md`'s "Element-first handler naming" section
and its "Inputs prop-bag naming" section, plus `component-refactor-conventions.md`'s §15.1
"Decomposing cascading state-sync logic" section and its §15.2 "Sequencing one group at a time" section:

- Handlers not named element-first (`<Element><Event>`, e.g. `metricCardExpand`); a
  `handle*`-prefixed or bare name used instead
- A prop-bag type named `Ctx`/`Context` instead of `<Component>Inputs`, or a local variable
  holding one that isn't the exact camelCase of its type name
- A cascading state update (a child toggle that may flip a parent's state, which may
  cascade further) left inline in a callback instead of split into named, independently
  tested pure sync steps
- A batched, tree-wide refactor pass with no quality-gate checkpoint between components,
  instead of one tightly-coupled group at a time

**Apply only the fixes the diagnosis actually found.** A real target may need one axis,
the other, both, or neither. Never assume: consider two contrasting cases that show why
both checks must always run, independently, every time:

- A component already living in its own folder with `types.ts`, `.styles.ts`, and tests
  all correctly extracted (**zero structural debt**), but whose handlers are named
  `handleClick`/`handleChange` instead of element-first, whose shared prop-bag type is
  called `Ctx` instead of `<Component>Inputs`, and whose parent-child toggle logic is
  written inline instead of decomposed into named, tested sync steps. Structural fixes
  here would have been a no-op; skipping the naming/decomposition check would have missed
  the actual problem entirely.
- A page-composition component with zero handlers, zero prop-bags, zero state (**zero
  naming/decomposition debt**) but with inline `sx={{}}` blocks, un-extracted layout
  constants, and a small utility function all defined directly in the file, needing
  extraction per §5/§6. Naming/decomposition fixes here would have been a no-op; skipping
  the structural check would have missed the actual problem entirely.

If neither check finds a violation, the target is already compliant: report that and stop
without changing anything.

### 3. Apply only the diagnosed fixes, including the test coverage each one requires

Fix only what step 2 actually flagged. A structural-only violation gets only structural
fixes; a naming/decomposition-only violation gets only naming/decomposition fixes. Never
apply the other axis's fixes speculatively "while you're in there"; an untouched axis with
zero findings stays untouched.

**Test coverage is part of applying a fix, not a separate step to remember afterward.**
Both standards already say so directly: AGENTS.md §5.4 lists `<name>.styles.test.ts` as a
real sibling file the naming convention expects, and `component-refactor-conventions.md`
§15.1 requires cascading-state decomposition's extracted derivation functions to be
"independently unit-tested" as part of the pattern itself, not an optional follow-up.
Before writing any test, find this target repo's own existing test framework and pattern
by reading one real sibling example (a neighboring `*.styles.test.ts`, `*.utils.test.ts`,
or component `*.test.ts`) — the same reconnaissance step 4 already does for the quality
gate script, applied here to testing conventions instead of assuming Vitest, Jest, or any
other framework.

- **Extracted `<name>.styles.ts`** → a `<name>.styles.test.ts` asserting each exported `sx`
  object or factory's shape directly (property/shape assertions), matching whatever
  rendering-vs-plain-object convention this repo's own existing style tests already use.
- **Extracted `<name>.const.ts`** → not a separate `<name>.const.test.ts` file. Add a test
  only for a constant that carries a real invariant worth guarding (a minimum size, a
  required format) as a describe block inside the component's own existing `<name>.test.ts`
  — a plain configuration or tuning value with no invariant to violate needs no test.
- **Extracted `<name>.utils.ts`** → a real `<name>.utils.test.ts` unit-testing each pure
  function's actual behavior, not merely that it exists. Verify the correct behavior
  yourself (e.g. by running the function directly) before asserting it — do not guess at a
  language edge case and write an assertion for the guess.
- **Pure derivation functions extracted while decomposing cascading state-sync logic**
  (§15.1) → unit tests for each one, independent of any framework/rendering dependency,
  exactly as that section's own rule already requires.

**Not living in its own folder-per-component (§5.1): perform the move yourself unless a
delegate skill already covers this exact case.** Check whether this target repo has a
project-specific structural-migration skill (the kind this skill disambiguates itself from,
above) and whether that skill's own stated scope actually covers this target — most such
skills are scoped to *internal-only* sub-components (used by exactly one sibling file in
their own folder) and explicitly exclude a standalone or independently-exported component.
Delegate only when the delegate skill's own scope genuinely covers this target; do not
delegate to a skill whose own documented scope excludes it, and do not leave the violation
unfixed just because a same-named skill exists somewhere in the repo. When no delegate skill
covers this exact case, do the move yourself:

1. Create `<name>/`, move `<name>.tsx` into it unchanged (only import specifiers that need
   an extra `./` level change), and move every already-extracted or newly-extracted
   `<name>.styles.ts`/`.const.ts`/`.utils.ts`/`.defaults.tsx` (with their tests) into the
   same folder, dropping the now-redundant `<name>.` file-name prefix as they land inside
   `<name>/` (e.g. `<name>.styles.ts` becomes `styles.ts`) unless this repo's own existing
   convention for a comparable component already keeps the prefix — check one real sibling
   example first, the same reconnaissance step 3 already does for test framework/pattern.
2. Extract the props interface into `<name>/types.ts` if it isn't already in one.
3. Create `<name>/index.ts`, re-exporting the component and its props type — this is the
   only import path every external caller should use afterward.
4. Move the component's existing test file into the folder alongside it.
5. Update every import site across the repo that referenced the old flat path (grep for it;
   don't rely on the type checker alone to surface every call site, since a JS-only consumer
   or a dynamic import won't fail typecheck).

**Whether to also add `README.md`, `roadmap.md`, or a `.stories.tsx`**: use §5.6's own
standalone-vs-sub-component test, not a blanket rule. These three exist to document and
preview a *reusable, published* component for other consumers — add them only when §5.6's
signals say this target is standalone (exported from a public barrel, listed in a component
inventory/tracking doc). A component with exactly one caller inside one application gets the
folder, `types.ts`, barrel, and tests above, and nothing more; treating every folder-per-
component move as if it were scaffolding a new library component adds ceremony the target
never asked for and this skill has no standing to impose.

### 4. Run the target repo's own quality gate

Confirm nothing broke: run whatever this target repo's own quality gate script is (e.g.
`npm run check` / `npm run check:verify`; check `package.json`). Fix anything it flags
before finishing.

---

## Out of scope

- Running this skill against any real component as part of authoring it.
- Knowing about, or behaving differently for, any specific organization's own repos,
  branding, or tooling. Any project that wants extra project-specific checks layered on
  top (its own additional structural conventions, its own scoring or tracking system, its
  own extra validation step) should build that into its own project-scoped caller skill,
  which calls this one for the generic pass and then continues with its own steps — never
  the other way around. This skill stays silent on every specific project it's ever used
  in, by design.

Other component-authoring skills in a given repository may delegate to this skill for its
diagnostic-and-fix pass; see their own `SKILL.md` files for which ones do, in that
repository.
