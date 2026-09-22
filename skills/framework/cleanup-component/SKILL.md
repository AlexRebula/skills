---
name: cleanup-component
description: "LittleBranches' own opinionated component-cleanup skill. Diagnoses and fixes component quality debt across two independent axes — structural (folder-per-component, `types.ts`/`.const.ts`/`.utils.ts` extraction, one-component-per-file, README-for-rationale, sourcing demo/list/heading-copy data from a dedicated module, compared against sibling
components of a similar shape) and naming/decomposition (element-first handlers, `Inputs` prop-bags, cascading-state decomposition, refactor sequencing) — checked against the full text of every relevant LittleBranches OSS Quality Standards doc, not a fixed excerpt, plus this skill's own conventions the standards docs don't yet cover. Applies only the fixes a target actually needs, since a real component may need one axis, the other, both, or neither. Not `migrate-react-subcomponent` or any similar structural-only migration skill: those assume the component is already correctly named and decomposed and only relocate it. Use when asked to \"cleanup component X\" or \"refactor component X\" for any target file or folder in a LittleBranches repo."
---

# Cleanup Component

Triggered by **"cleanup component X"** or **"refactor component X"**, for any target
component file or folder in a LittleBranches repo. This skill **diagnoses before it
fixes**: it never assumes a target has structural debt, naming/decomposition debt, both,
or neither. It checks each axis independently against the full text of the loaded
standards — not a fixed excerpt of them — then applies only the fixes the diagnosis
actually found.

This skill encodes LittleBranches' own opinionated best practices. It is not meant to be a
neutral, organization-agnostic tool a different company would install as-is; the specific
rules below (one-component-per-file, README-for-rationale, `.utils.tsx` for JSX-bearing
helpers, preferring a project's own dedicated data-sourcing module) are LittleBranches
conventions, some written in the OSS Quality Standards docs already, some added directly
here because no written doc covers them yet.

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
skill does not invent a new flag name or a new default-URL scheme. Override this only when
a specific repo's own standards live somewhere else — the LittleBranches-only conventions
this skill adds directly (below) apply regardless of which URL is loaded.

---

## Process

### 1. Load the full OSS Quality Standards

Fetch the barrel document from `--standards-url` (or the default URL above) the same way
`review-pr`'s "Org / external standards" step does:

```sh
curl -sS "<standards-url>"
```

Step 2's diagnosis needs the full text of every doc the barrel only summarizes — not just
the sections named below. A fixed excerpt list goes stale the moment the org adds a new
section upstream and nobody remembers to update this skill to match, or the moment a doc
this skill never fetches at all turns out to be the one that actually covers a gap: this
has already happened twice — `component-refactor-conventions.md` grew a §15.3 this skill's
own checklist never mentioned; `typescript-conventions.md` was never fetched at all despite
AGENTS.md's own cross-reference table pointing to it; and, a pass later, `component-api-
contract.md` (the actual expansion of §6, an axis this skill already claimed to check) and
`documentation-strategy.md` (which owns the real README rule this skill cites) were *both*
still missing, found only when someone asked directly whether this rule existed anywhere.
Fetch all six of the following from the same base path (swap `AGENTS.md` in
`--standards-url` for each filename, per the barrel's own "Raw base URL for expanded docs"
convention), and read each one's full text, not just the section names cited in step 2:

- `naming-conventions.md`
- `component-refactor-conventions.md`
- `component-structure.md`
- `typescript-conventions.md`
- `component-api-contract.md`
- `documentation-strategy.md`

If any fetch fails with a non-200 status, note the failure and stop: the diagnostic pass in
step 2 has nothing to check against until the standards docs are reachable, so a failed
fetch is a hard stop for this skill (unlike `review-pr`, which can fall back to repo-local
standards alone).

### 2. Diagnose both axes: never assume either one, and never treat the lists below as exhaustive

Run both checks below **independently**. Do not infer one from the other, and do not skip
either check just because the target "looks like" it only needs one kind of work; confirm
it.

**The bullets below are a floor, not a ceiling.** They name violations worth calling out
explicitly, but they are not the full content of the six documents fetched in step 1 —
read each document's full text and treat every rule stated there as in scope, not only the
ones named here.

**Structural-rule violations** (AGENTS.md §5 Component Structure Rules / §6 Component API
Contract, `component-structure.md`, `typescript-conventions.md`, `component-api-contract.md`,
`documentation-strategy.md`):

- Inline `sx={{ ... }}` — including one buried inside an `sx` array
  (`sx={[someSx, { ... }]}`), not only the literal `sx={{` shape — left in the component
  file instead of extracted to `<name>.styles.ts` (§5.4 / §6.2)
- **Inline configuration-object (or configuration-call) literals on any prop other than
  `sx`** — not only a responsive breakpoint object passed directly to `size`, `rowSpacing`,
  `columnSpacing`, `spacing`, or any other layout-shaping prop (e.g.
  `<Grid size={{ xs: 12, md: 6, lg: 5 }}>`), but the same shape of violation on an
  animation/motion prop too: `variants={{ initial: {...}, animate: {...} }}` written
  inline, or a call like `variants={fade("inUp", { distance: 24 })}` invoked directly in
  the JSX with its literal arguments in place, instead of a named export in
  `<name>.const.ts`. Same extraction principle as `sx` above, generalized further: `sx`
  isn't the only prop that carries an inline literal worth naming and reusing, and layout
  props aren't the only *other* category either — any prop taking a hardcoded
  configuration value (layout, animation timing/easing, or any other non-content setting)
  qualifies. Name each extracted constant in `SCREAMING_SNAKE_CASE` in the component's own
  `.const.ts`, not `camelCase` — this is a deliberate, distinct convention from
  `.styles.ts`'s own `camelCase` `sx` exports, chosen so every tunable setting for a
  component is visible in one glance down that one file, making repeated patterns across
  components easier to spot later, and so any of these constants can later become a real
  component prop (caller-overridable) with the extracted constant demoted to just its
  default value, without a rename. This is layout/behavior, not content — it stays a named
  constant in the component's own `.const.ts`, not something sourced from `sections-api`
  or any other data layer (see the data-sourcing bullet below for where that line sits).
  **A plain object/array literal extracted this way must carry an explicit type annotation
  naming the exact prop type it configures** (e.g.
  `const HUGEPACK_ELEMENTS_GRID_ROW_SPACING: GridProps["rowSpacing"] = { xs: 3, md: 0 }`,
  importing `GridProps` — or the equivalent named type the library exports — from the same
  library the prop belongs to), not left to bare structural inference. Two independent
  reasons: (1) inference alone means the constant only gets checked against the real prop
  type at its JSX usage site, so a copy-paste into the wrong prop, or a shape that's valid
  object-literal TypeScript but wrong for that specific prop, still typechecks at the
  `.const.ts` declaration and only surfaces (if at all) somewhere else in the file; an
  explicit annotation catches that mismatch at the declaration itself. (2) the constant
  becomes self-documenting — a reader of `.const.ts` alone, without cross-referencing the
  component's JSX, can already see which prop's shape this value has to satisfy. A value
  produced by a typed function call instead of a raw literal (e.g.
  `const HUGEPACK_ELEMENTS_INTRO_VARIANTS = fade("inUp", { distance: 24 })`) already carries
  this guarantee from the call's own return type — the explicit-annotation requirement is
  specifically for the plain-literal case, where nothing else supplies a type.
- Constants or utility logic defined directly in the `.tsx` instead of extracted to
  `<name>.const.ts` / `<name>.utils.ts` (§5.4). When the extracted logic returns JSX (a
  render-helper function), use `<name>.utils.tsx` instead — `.ts` cannot hold JSX, and the
  written standards only name the `.ts` extension; this is this skill's own extension of
  that rule to the JSX case
- Missing `types.ts`: **any type the module declares**, not only a props interface
  (`typescript-conventions.md` §T.1 — a companion types file is owed to every declared
  type, promoted to a shared `types.ts` only on a second real consumer per §T.2), left
  inline instead of in its own companion file
- Not living in its own folder-per-component (§5.1)
- **More than one independently-consumed component exported from one file.** If a second
  component in the same file is imported directly by some *other* file (not a private,
  first-only helper the primary component itself renders internally), that export has its
  own external caller and needs its own file, at minimum — split it out, following the
  folder-per-component treatment below if it's standalone per §5.6, or into its own flat
  sibling file (still separate from the primary export) if it's a tightly-scoped,
  single-caller companion that doesn't clear that bar. This matches this org's own
  precedent for exactly this shape: `create-giselle-component`'s "Multi-component
  features" convention already gives every internal sub-component its own subfolder from
  the moment it's scaffolded, "no exception for pieces that are internal or unexported" —
  the question for an *already-existing* violation is only whether it needs that same full
  folder treatment (§5.6-gated) or the lighter flat-file split, never whether splitting is
  warranted at all. Two components sharing one file only because they happen to share a
  few local helpers or constants is not reason enough to keep them merged: extract the
  shared helpers to `<name>.utils.ts`/`.const.ts` instead, so each component's own file
  only imports what it needs. Detect this by checking, for every top-level exported
  component in the target file, whether some file *other than* the target itself imports
  it directly.
- **Missing `README.md` for a documented reason to have one** (`documentation-strategy.md`
  — "Component folder READMEs"): a component folder *may* have its own `README.md`, but
  only when it has a non-obvious setup requirement — a required context provider, a peer
  dependency that must be installed separately, a known accessibility constraint. These
  are "rare"; "most components do not need one" — do not add a README just because a
  component exists, and do not treat an existing README as license to also dump unrelated
  content into it.
- **A long historical or migration-rationale comment block** — explaining how the code
  arrived at its current shape across more than one past change, not a short, local *why*
  for the current line — sitting inline in the source. This is this skill's own
  convention, not the setup-requirement README rule above and not a restatement of it: even
  a component with no non-obvious setup requirement at all can still be carrying a
  multi-paragraph history lecture inline that doesn't belong there. Extract it to the
  component's own `README.md` (create one, or add a short "History"/"Design rationale"
  section to an existing one — a second, independent reason a README may exist,
  alongside the setup-requirement one above, not instead of it) and leave only a 1–2 line
  pointer comment behind in the source. This is also separate from, and does not override,
  the standalone-vs-sub-component gate below for the *full* scaffolding suite (README +
  roadmap + stories): a one-off, single-caller component still doesn't need that full
  suite, but it still doesn't get to carry a multi-paragraph history lecture inline
  either.
- **Demo, list, heading/caption copy, or any other content data hardcoded directly in the
  component's own render/build logic**, instead of sourced from a dedicated data module
  (§15.3) — prefer this repo's own already-established data-sourcing pattern (e.g. a
  `sections-api`/equivalent module already used by sibling components in the same repo)
  over inventing a new one; fall back to a dedicated fixtures file per §8.4 only when no
  such pattern exists yet in this repo. **Do not scope this check to "the big list of
  content" alone** — a real run against a live target flagged a hardcoded showcase-content
  array but missed that the very same component, and its own sibling `PageSection`-
  composing section, both hardcoded their own heading/caption/intro/CTA copy inline, while
  a third sibling section sourced the identical *kind* of content (title/caption/txtGradient
  passed straight to the same `SectionTitle` component) from that repo's own `sections-api`.
  Detect this by comparing the target against every sibling component of a similar shape
  (e.g. every other `PageSection`-composing section in the same folder tree): if siblings
  take a given kind of content as a props-sourced value and the target hardcodes that same
  kind of content instead, that is a violation too, regardless of whether the hardcoded
  value is a whole array or a single heading string. **This bullet is about content, not
  layout** — a real run also proposed extending it to `Grid`/`Stack` layout props (`size`,
  `rowSpacing`, `columnSpacing`), and that's the wrong axis: no sibling anywhere in that
  same codebase sources layout breakpoints from `sections-api`, including the exact
  component this rule's own precedent-check is modeled on. Content (text, images, hrefs,
  lists of real data) is what moves to a data layer; layout/structure (breakpoints,
  spacing) stays a named constant in the component's own `.const.ts` (see the bullet above)
  — never in `sections-api` or an equivalent data layer, unless a real, repo-wide decision
  to make layout itself data-driven has actually been made, which is a far bigger call than
  this skill has standing to make unilaterally.

**Naming/decomposition-rule violations**: `naming-conventions.md`'s "Element-first handler
naming" section and its "Inputs prop-bag naming" section, plus
`component-refactor-conventions.md`'s §15.1 "Decomposing cascading state-sync logic"
section and its §15.2 "Sequencing one group at a time" section:

- Handlers not named element-first (`<Element><Event>`, e.g. `metricCardExpand`); a
  `handle*`-prefixed or bare name used instead
- A prop-bag type named `Ctx`/`Context` instead of `<Component>Inputs`, or a local variable
  holding one that isn't the exact camelCase of its type name
- A cascading state update (a child toggle that may flip a parent's state, which may
  cascade further) left inline in a callback instead of split into named, independently
  tested pure sync steps (§15.1)
- A batched, tree-wide refactor pass with no quality-gate checkpoint between components,
  instead of one tightly-coupled group at a time (§15.2)

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
  constants, a second independently-imported component sharing its file, a hardcoded
  content array instead of a dedicated data module, and a small utility function all
  defined directly in the file, needing extraction per §5/§6/§15.3. Naming/decomposition
  fixes here would have been a no-op; skipping the structural check would have missed the
  actual problem entirely.

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
- **Extracted `<name>.utils.ts` or `<name>.utils.tsx`** → a real `<name>.utils.test.ts` (or
  `.test.tsx` for the JSX-returning case) unit-testing each function's actual behavior, not
  merely that it exists. Verify the correct behavior yourself (e.g. by running the function
  directly) before asserting it — do not guess at a language edge case and write an
  assertion for the guess.
- **Pure derivation functions extracted while decomposing cascading state-sync logic**
  (§15.1) → unit tests for each one, independent of any framework/rendering dependency,
  exactly as that section's own rule already requires.
- **A second component split out of a shared file into its own file** → verify every
  import site of the moved export is updated (grep for it; don't rely on the type checker
  alone to surface every call site), and that the moved component's own existing tests, if
  any, still pass unchanged — this is a relocation, not a behavior change.
- **Demo/list data moved to a dedicated data module** (a `sections-api`/equivalent module,
  or a new fixtures file) → spot-check every affected render to confirm it still renders
  exactly as before the data relocation (§15.3's own instruction) — a pure data move, not a
  design change, so any visible diff is a bug in the extraction.
- **A rationale block extracted to `README.md`** → no test needed, since it's documentation
  rather than runtime code; just confirm the short pointer comment left behind in the
  source still makes sense read on its own.

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
   `<name>.styles.ts`/`.const.ts`/`.utils.ts`/`.utils.tsx`/`.defaults.tsx` (with their
   tests) into the same folder, dropping the now-redundant `<name>.` file-name prefix as
   they land inside `<name>/` (e.g. `<name>.styles.ts` becomes `styles.ts`) unless this
   repo's own existing convention for a comparable component already keeps the prefix —
   check one real sibling example first, the same reconnaissance step 3 already does for
   test framework/pattern.
2. Extract every type the module declares (not only its props interface, per §T.1 above)
   into `<name>/types.ts` if it isn't already in one.
3. Create `<name>/index.ts`, re-exporting the component and its types — this is the
   only import path every external caller should use afterward.
4. Move the component's existing test file into the folder alongside it.
5. Update every import site across the repo that referenced the old flat path (grep for it;
   don't rely on the type checker alone to surface every call site, since a JS-only consumer
   or a dynamic import won't fail typecheck).

**Whether to also add the full `README.md` + `roadmap.md` + `.stories.tsx` scaffolding
suite**: use §5.6's own standalone-vs-sub-component test, not a blanket rule. These three
exist to document and preview a *reusable, published* component for other consumers — add
the full suite only when §5.6's signals say this target is standalone (exported from a
public barrel, listed in a component inventory/tracking doc). A component with exactly one
caller inside one application gets the folder, `types.ts`, barrel, and tests above, and
does not get `roadmap.md` or `.stories.tsx`; treating every folder-per-component move as if
it were scaffolding a new library component adds ceremony the target never asked for and
this skill has no standing to impose. This is unrelated to, and doesn't excuse, the
narrower README-for-rationale rule above: even a one-off, single-caller component still
gets a plain `README.md` the moment it's carrying a long rationale block worth extracting —
that's a documentation-hygiene fix, not scaffolding ceremony.

### 4. Run the target repo's own quality gate

Confirm nothing broke: run whatever this target repo's own quality gate script is (e.g.
`npm run check` / `npm run check:verify`; check `package.json`). Fix anything it flags
before finishing.

---

## Out of scope

- Running this skill against any real component as part of authoring it.
- A project's own *extra* checks beyond the LittleBranches-wide conventions above — e.g.
  `giselle-mui`'s own DoD scoring, its `docs/component-inventory.md` tracking, or its
  layer/category taxonomy — still belong in that project's own caller skill, which calls
  this one first and then continues with its own steps, never the other way around. This
  skill's own job is the LittleBranches-wide conventions above; it does not reinvent any
  single project's own additional tooling.

Other component-authoring skills in a given repository may delegate to this skill for its
diagnostic-and-fix pass; see their own `SKILL.md` files for which ones do, in that
repository.
