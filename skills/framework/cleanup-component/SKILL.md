---
name: cleanup-component
description: Diagnose and fix component quality debt across two independent axes, structural (OSS Quality Standards §5 Component Structure Rules / §6 Component API Contract: inline `sx`, un-extracted constants/utils, missing `types.ts`, folder-per-component) and naming/decomposition (`naming-conventions.md`'s element-first handler naming and `Inputs` prop-bag sections, `component-refactor-conventions.md`'s cascading-state-decomposition and one-group-at-a-time sequencing sections), applying only the fixes a target actually needs, since a real component may need one axis, the other, both, or neither. Not `migrate-giselle-subcomponent` or `migrate-react-subcomponent`: those are structural-only mechanical moves that assume the component is already correctly named and decomposed and only relocate it. For `giselle-mui`/`giselle-mui-poc` targets only, additionally delegates to `migrate-giselle-subcomponent`'s remaining Giselle-specific phase (DoD scoring, brand tokens, taxonomy, yalc-validate); every other target skips that phase entirely. Use when asked to "cleanup component X" or "refactor component X" for any target file or folder.
---

# Cleanup Component

Triggered by **"cleanup component X"** or **"refactor component X"**, for any target
component file or folder in any project. This skill **diagnoses before it fixes**: it
never assumes a target has structural debt, naming/decomposition debt, both, or neither.
It checks each axis independently against the loaded standards, then applies only the
fixes the diagnosis actually found.

## Not `migrate-giselle-subcomponent` or `migrate-react-subcomponent`

Both of those skills are **structural-only mechanical moves**: they take a component that
is already correctly named, already correctly decomposed, and already working (its only
problem is that it's a flat sibling file instead of living in its own folder), and move it,
extracting `types.ts`/styles/tests along the way. Neither skill inspects handler names,
prop-bag naming, or cascading state logic; both explicitly assume that work is already
done.

This skill makes no such assumption. It runs a diagnostic pass over **both** the
structural axis (the same folder-per-component/`types.ts`/`sx`-extraction territory those
two skills mechanically fix) **and** the naming/decomposition axis (handler naming,
`Inputs` prop-bag naming, cascading-logic decomposition, refactor sequencing) that neither
of those skills ever looks at. A target this skill is asked to clean up may turn out to
need exactly what `migrate-giselle-subcomponent`/`migrate-react-subcomponent` already
handle, need only naming/decomposition work, need both, or need neither: this skill is the
one that figures out which, before touching anything. Where a target's diagnosis comes back
structural-only and the target is a flat Giselle sub-component, this skill's fix step
delegates the mechanical move to `migrate-giselle-subcomponent` instead of re-implementing
it (see step 4), so it never duplicates that logic.

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
the other, both, or neither. Never assume: two confirmed real-world cases show why both
checks must always run, independently, every time:

- `TimelineTwoColumn` (`giselle-mui-poc#223`): already fully compliant on folder/file
  structure (**zero structural debt**) but needed element-first handler renames,
  `Ctx`→`Inputs` renames, and cascading-logic decomposition. Structural fixes here would
  have been a no-op; skipping the naming/decomposition check would have missed the actual
  problem entirely.
- A private consumer app's home-page component: an async Next.js Server Component with
  zero handlers, zero prop-bags, zero state (**zero naming/decomposition debt**) but with
  inline `sx={{}}` blocks, un-extracted padding constants, and a utility function all
  defined directly in the `.tsx`, needing extraction per §5/§6. Naming/decomposition fixes
  here would have been a no-op; skipping the structural check would have missed the actual
  problem entirely.

If neither check finds a violation, the target is already compliant: report that and stop
without changing anything.

### 3. Apply only the diagnosed fixes

Fix only what step 2 actually flagged. A structural-only violation gets only structural
fixes; a naming/decomposition-only violation gets only naming/decomposition fixes. Never
apply the other axis's fixes speculatively "while you're in there"; an untouched axis with
zero findings stays untouched.

### 4. Conditional org-layer delegation: Giselle repos only

**If, and only if, the target's repo is `giselle-mui` or `giselle-mui-poc`**: after the
fixes in step 3 land, delegate to `migrate-giselle-subcomponent`'s remaining
Giselle-specific phase: DoD scoring, brand tokens, taxonomy, and yalc-validate. That
phase is Giselle/`giselle-mui`-specific tooling (component-inventory DoD scoring, brand
token compliance, the `material/`/`chart/`/`motion/`/`lab/`/`section/` layer taxonomy, and
`yalc`-linked consumer validation) with no equivalent in a non-Giselle codebase.

**Every other target repo skips that phase entirely.** A non-Giselle consumer app (for
example `alexrebula-portfolio-poc`) has no component-inventory DoD score, no Giselle brand
tokens, no Giselle layer taxonomy, and nothing yalc-linked to validate against, so running
that phase there would either no-op against nonexistent tooling or fail outright. Do not
run it, and do not ask the user whether to run it, for any repo other than `giselle-mui` or
`giselle-mui-poc`.

### 5. Run the target repo's own quality gate

Confirm nothing broke: run whatever this target repo's own quality gate script is (e.g.
`npm run check` / `npm run check:verify`; check `package.json`). Fix anything it flags
before finishing.

---

## Out of scope

- Running this skill against any real component as part of authoring it.

The four caller skills (`migrate-giselle-subcomponent`, `create-giselle-component`,
`create-react-component`, `migrate-react-subcomponent`) now delegate to this skill.
