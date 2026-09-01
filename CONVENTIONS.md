# Coding Conventions

Applies to all code in this repo — Docusaurus site (`site/`), root-level scripts
(`scripts/`), and anywhere else TypeScript/React is written. Referenced from `AGENTS.md`
rather than restated there.

Adopted from principles that transfer well from `giselle-mui`'s own standards docs —
not copied from them. Most of giselle-mui's documentation (naming taxonomy, Storybook
readiness ladders, `roadmap.md` DoD mandates, `yalc` validation steps) solves a
multi-consumer public-component-library problem this repo doesn't have, so only the
underlying principles are adopted here, restated in this repo's own terms.

## Search before you build

Before writing a new component, function, or utility: check whether an equivalent
already exists — in this repo, and in giselle-mui's barrel exports
(`@littlebranches/giselle-mui`'s root/`utils`/`charts`/`motion`/`lab` subpaths). Writing a
near-duplicate of something that already exists is the most expensive form of technical
debt to review and unwind. This is distinct from the next rule — it's about not creating
a duplicate in the first place, not about when a duplicate becomes worth generalizing.

## Don't abstract until a second real caller exists

Don't extract a shared component, hook, or utility speculatively. Wait until a second
concrete call site actually needs the same thing. A single caller with a "just in case"
abstraction is premature; two real callers is the signal to extract.

## General TypeScript hygiene (applies everywhere)

- No `any`. If a type is genuinely unknown, narrow it or use `unknown` with a guard.
- Extract non-trivial types into their own `types.ts` rather than inlining them.
- No duplicated logic — if the same behavior appears twice, that's the signal to extract
  (once a second real caller exists — see above), not to copy-paste a third time.
- Know which document answers which question. Don't restate the same fact in two places
  (a comment repeating what a type already says, a README restating what JSDoc already
  covers).

## React-specific rules

- Extract style objects with more than 3 properties into a dedicated `.styles.ts` file
  rather than inlining them in the component.
- No inline functions that return JSX assigned to a variable inside a component body —
  extract them as their own named component instead.
- No `React.FC` — type props directly on the function signature.
- Use `forwardRef` + `displayName` for any component that forwards a ref.
- JSDoc only non-obvious, own props — never restate an inherited prop's own documentation.
- Tests are colocated with the component they test, not in a separate top-level test tree.
- No duplicated JSX — if the same markup shape appears twice, extract a component for it
  once a second real caller exists.

## Known gotchas

Concrete, repo-specific lessons discovered while building this site — add to this list as
new ones surface, rather than letting them get rediscovered by the next person or agent.

- **`useColorMode()` from `@docusaurus/theme-common` is unreachable from a swizzled
  `Root` component.** Docusaurus renders its `ColorModeProvider` as a *child* of `Root`,
  not an ancestor — a hook call in `Root` has no context to read. Use a `MutationObserver`
  on `<html data-theme>` instead if `Root` needs to react to color-mode changes.
- **`GiselleThemeProvider`'s default `colorSchemeSelector: 'media'` makes MUI's `setMode`
  silently no-op** (no error, just does nothing). Switching to `colorSchemeSelector:
  'class'` also fails silently in this repo specifically, because Docusaurus's router
  overwrites `document.documentElement.className` wholesale on every client-side
  navigation. Use a dedicated attribute (e.g. `data-mui-mode`) that Docusaurus never
  touches.
- **Don't use `useMediaQuery`/`useTheme` to switch between two structurally different
  components at a breakpoint** (e.g. a desktop vs. mobile layout). This site is statically
  generated (Docusaurus SSG): a JS breakpoint hook renders one variant on the server
  (there's no viewport at build time, so it defaults to a fixed guess) and can render the
  other on the client after hydration, producing a visible flash and risking a hydration
  mismatch if the two variants' DOM shapes actually differ. Render both variants and toggle
  visibility with a CSS media query instead (see `skill-timeline.module.css`). No
  server/client disagreement is possible that way, since CSS evaluates identically on both.
