## What it does

`create-giselle-component` scaffolds and builds a new component in `giselle-mui` from nothing, in two phases that are not allowed to blur together. Phase 1 creates the folder, the types stub, and `it.todo` test stubs, then commits. Phase 2 fills all of it in through a strict red-green TDD loop. The gap between the phases is enforced by the repo's own quality gate, not just by convention: a new test file that skips the `it.todo` stubs fails CI immediately.

## When to reach for it

Use it any time you're creating a new component in `giselle-mui`, from the very first file. It is not for editing an existing component; it assumes nothing in the target folder exists yet.

| Your situation | Where to go |
| --- | --- |
| A brand-new component in `giselle-mui`, nothing built yet | `create-giselle-component` |
| Existing tests need a quality pass before new work starts | [audit-giselle-tests](./audit-giselle-tests.md), run first |
| A behaviour needs building test-first, outside `giselle-mui`'s specific conventions | [tdd](https://aihero.dev/skills-tdd) |
| The new component's diff needs a standards-and-spec review before merging | [code-review](https://aihero.dev/skills-code-review) |

## Prerequisites

Eight answers, locked in before any code exists: component name, layer folder, category subfolder, the MUI root component it wraps (or none), required props, optional props and their variants, whether it needs `ref` forwarding, and whether it uses `useTheme` or `sx`. If a parent agent or a batch invocation already supplies all eight in the invoking message, the skill skips straight to Phase 1 instead of asking again.

## Two phases, one commit boundary between them

Phase 1 creates exactly five things: `types.ts` (a props stub with JSDoc, not the real interface), `<name>.test.ts` (`it.todo` stubs only), `README.md`, `roadmap.md`, and a commented-out `index.ts`. It deliberately does **not** create `<name>.tsx` — the component file's existence is the signal, elsewhere in the codebase, that a component is implemented rather than planned. Committing Phase 1 before starting Phase 2 is not optional; the quality gate's two-phase-scaffold check depends on that commit boundary existing.

Phase 2 replaces every stub for real: types first, then the component file, then each `it.todo` swapped for a real test one at a time, red before green, no batch of tests landing ahead of the implementation.

## Naming is not free-form

Folder names are kebab-case, file names follow a fixed table (`types.ts`, `index.ts`, `<name>.styles.ts`, `<name>.stories.tsx`, and so on), and components nested three or more levels deep are named after their *role* in that folder rather than repeating the full component name (`icon.tsx` inside `button/toggle/icon/`, not `toggle-icon-button.tsx`). The suffix vocabulary (`Card`, `Row`, `Dialog`, `Chip`, and a dozen others) is fixed too; adding a new suffix needs explicit sign-off rather than being picked ad hoc per component.

## The test helper is not optional

`giselle-mui` runs MUI in CSS-variables mode (`extendTheme`), which plain `createTheme()` does not populate. Any component whose `sx` touches `theme.vars.*` will crash under a plain `ThemeProvider`. `GiselleThemeProvider`, wrapped by the `renderWithTheme` helper in `src/test-utils.ts`, is the only correct wrapper for a component render test in this repo. Mocking MUI components or MUI hooks instead of using the real provider is the anti-pattern [audit-giselle-tests](./audit-giselle-tests.md) exists to find and undo.

## Common questions

**Why does the scaffold phase forbid the component file itself?**

Because the file's absence is what makes "planned but not built" checkable by machine. If `<name>.tsx` existed with a stub body, there'd be no automatic way to tell a real implementation from a placeholder. The quality gate checks for the file's absence directly.

**What if the component doesn't wrap a specific MUI root component?**

Answer "none" to that alignment question and extend `React.HTMLAttributes` instead of a MUI props interface. The rest of the process (types first, `sx` array-safe, `...other` forwarding) still applies.

**Does accessibility get checked automatically?**

Not by any gate mentioned here; it's a checklist item you carry through Phase 2 by hand; keyboard reachability, visible focus rings, `aria-label` placement, and respecting `prefers-reduced-motion` are all listed as required, and a gap found in review is always treated as blocking regardless of how small it looks.

**Can one PR cover more than one component?**

No. One component, one branch, one PR, so a rejected or reverted component never takes a sibling down with it.

## It's working if

- Phase 1 commits with no `<name>.tsx` present, and Phase 2 doesn't start until that commit exists.
- Every `it.todo` gets replaced one at a time, red before green, never as a batch ahead of the implementation.
- No `vi.mock` for a MUI module appears anywhere in the new test file.
- The Storybook `title` mirrors the folder path exactly, and if the two ever disagree, the story gets fixed, not the folder.
- The checklist before PR — quality gate green, coverage, no hardcoded colours, `ref` forwarding where needed, barrel exports both the component and its props type — is actually walked, not skimmed.

## Where it fits

`create-giselle-component` is the `giselle-mui`-specific version of the build loop that [tdd](https://aihero.dev/skills-tdd) documents generically, with the repo's own scaffold gate, naming rules, and theme-provider requirement layered on top. Run [audit-giselle-tests](./audit-giselle-tests.md) first if you want the existing suite audited against the same bar before adding to it, and hand the finished diff to [code-review](https://aihero.dev/skills-code-review) before merging.
