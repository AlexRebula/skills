---
name: port-mui-theme-override
description: Independently re-author a draft per-component MUI theme override — however it originated (hand-copied from an existing theme, generated, ported from another codebase) — into a clean, MUI-spec-compliant override that copies no literal source values, using a three-source method (functional target, official MUI documentation, live computed-style verification). Use when a component's theme override needs its literal values re-derived independently rather than copied, when retiring a draft/scratch override file in favor of a real one, or when adding a new `Mui<X>` entry to a theme config's `components` merge.
---

# Port a MUI theme override

Turns one draft, not-yet-independent per-component MUI theme override file — the kind
that exists in a project as a placeholder, a hand-copied starting point, or an
auto-generated draft, and is not yet safe to ship because its literal values (colors,
pixel numbers, easing curves) were copied from somewhere else — into a real,
independently-authored override that reproduces the same visual result without carrying
any copied values forward.

This applies to any `@mui/material` or MUI X component. It assumes nothing about your
project's folder layout: every path below is a placeholder you fill in for your own
codebase.

**Standing rule — applies to every step, not just Step 2:** never copy literal values
(colors, pixel numbers, easing curves, class-key strings) from the draft file into the
output. Every value in the output is re-derived independently, either from rendered,
computed output or from MUI's own documented defaults. If a value can't be traced back to
one of those two things, it doesn't belong in the output yet.

## Step 0 — Identify the input and check for a peer-dependency gap

Input is one file: the draft override for `<name>` (e.g. `chip.tsx`, `button.tsx`) —
wherever your project currently keeps not-yet-independent draft overrides.

Before doing anything else, check what MUI element(s) the draft overrides (its
`Components<Theme>['Mui<X>']` keys) against your own project's `package.json`
`peerDependencies` / `peerDependenciesMeta` (or plain `dependencies`, if your project
doesn't split them):

- **A plain `@mui/material` component** — proceed normally.
- **A MUI X component your project already depends on** (present in `dependencies` or
  declared as an adopted optional peer) — proceed normally.
- **A MUI X component your project does *not* yet depend on** — **stop and flag it**
  rather than either silently porting it (shipping an override for a package your project
  doesn't declare) or silently skipping it (leaving it as undocumented dead weight).
  Surface it as an explicit decision point for whoever owns the project: does this
  override even belong here before its target package is adopted as a real dependency?
  Do not proceed past this step for a flagged file without an explicit go-ahead.

## Step 1 — Source 1: the functional/behavioral target

Work out, in plain English, *what the component actually does* — not its source code:
which props change its look, which states exist (hover, focus, disabled, expanded/
collapsed, selected), what visually happens on each interaction. If the draft file has a
runnable rendering somewhere in your project (a story, a demo page, a test render), use
that as your live reference. If it doesn't, read the draft file only for its *intent*,
never for its literal values — this becomes the spec the rewrite is judged against, not a
value bank to copy from (see the standing rule above).

## Step 2 — Source 2: official MUI structural shape

Fetch the correct official documentation for the MUI element(s) the override targets:

- **`@mui/material` component** — https://mui.com/material-ui/customization/theme-components/
  (the `defaultProps` / `styleOverrides` / `variants` shape documented there).
- **MUI X component** (only reached here if Step 0 didn't flag it) — the equivalent MUI X
  theming documentation for that package. MUI X has its own `theme-components`-equivalent
  page per package; do not assume the `@mui/material` page covers it.

Use this source for **structure only**: which `Components<Theme>['Mui<X>']` keys exist,
what `styleOverrides` slot names and `ownerState`/`theme` callback shapes are available,
how `variants` arrays are typed. Do not lift example values from the docs either — they
illustrate the shape, not your project's own design decisions.

## Step 3 — Source 3: live computed-style verification

Never diff against the draft file's own source values — verify against **rendered,
computed** output only. Render the in-progress override in your own project (Storybook,
a scratch test render, or any live preview you have) and compare its actual computed
styles (`getComputedStyle`, or the values a browser inspector reports) against whatever
your project treats as the visual source of truth for this component, in the same
interaction state (same props, same expanded/hovered/disabled/etc. state). Compare every
property the override touches — colors, spacing, border-radius, shadows, transitions.

Every value that lands in the override's `styleOverrides`/`variants` must trace back to
one of two things: a computed value read off a live render, or a documented MUI default
(Step 2) intentionally left alone. If you cannot actually render a side-by-side
comparison (no access to the original visual source), say so explicitly wherever you
report this work — verify as far as Steps 1–2 allow and flag the gap, rather than
fabricating a computed-style comparison you didn't perform.

## Step 4 — Write the output files

Two files, in your project's canonical theme-override location:

- **`<name>.tsx`** — the override itself:
  - A header comment stating it's built from MUI's own theme-customization docs (cite the
    exact URL from Step 2), not copied from the draft file.
  - `Components<Theme>['Mui<X>']`-typed consts per MUI component key, each with
    `defaultProps`/`styleOverrides`/`variants` only where source 1 or source 2 actually
    calls for it — do not add a key or slot with nothing behind it.
  - Any variant array typed via `ComponentsVariants<Theme>['Mui<X>']`, passed through
    `satisfies` for compile-time shape checking.
  - A single named export bundling every `Mui<X>` key this file owns, named after the
    component (e.g. `export const button: Components<Theme> = { MuiButton, MuiButtonBase };`).
  - Any independently-drawn sub-elements (icons, decorations) called out explicitly as
    not sourced from any icon set or external asset.

- **`<name>.test.ts`** — co-located, asserting the override object's shape **directly**:
  import the named export, assert `defaultProps` with `toEqual`/`toMatchObject`, assert
  `styleOverrides.<slot>` values directly, assert each `variants` entry's `props`
  predicate and `style` output. Never assert against the draft file's own values; assert
  against what Steps 1–3 established the correct behavior should be. If your project
  already has one real, independently-authored override to use as a shape reference, match
  its file structure and test pattern for consistency — otherwise MUI's own documented
  shape is your only spec.

## Step 5 — Wire it into your theme config

Add the new named export to your theme config's `components` merge, alongside whatever
overrides already exist there:

```ts
import { <name> } from './overrides/<name>';
// ...
components: {
  ...<name>,
  // ...other overrides already wired here
},
```

Update any comment tracking which components are wired versus still pending, so it keeps
matching what's actually on disk.

## Step 6 — Retire the draft file

Once the ported replacement is in place and verified:

1. Delete the draft override file (and its entry, if any, in a barrel/index for that
   folder).
2. Remove the corresponding import and spread line from wherever it was wired in.
3. Update that folder's own header comment or tracking doc, if one exists, so a
   remaining-file count or list doesn't drift from what's actually left on disk.

## Step 7 — Gate and commit

Run your project's quality gate (lint, typecheck, test). One component's port is one
commit — new override + test, theme-config wiring, and draft-file retirement all land
together, since a half-migrated state (new file added but the old draft still present)
leaves both copies live with no compile-time signal telling anyone the old one is now
redundant.

## Definition of done, per component

- [ ] Step 0's peer-dependency check run and, if applicable, explicitly flagged rather
      than silently resolved either way
- [ ] `<name>.tsx` and `<name>.test.ts` added to your project's canonical theme-override
      location
- [ ] Every value in the override traces to Step 1 (rendered/computed target) or Step 2
      (MUI's documented default) — never to the draft file's literal source; any
      unavoidable verification gap is stated explicitly, not silently glossed over
- [ ] Your theme config's `components` merge includes the new override; any tracking
      comment updated to match
- [ ] The draft override file is deleted; any index/tracking doc updated to match what's
      actually left
- [ ] Your project's quality gate passes
