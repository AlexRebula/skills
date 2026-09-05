# Giselle MUI

`@littlebranches/giselle-mui` — small, focused MUI wrapper components that encode non-obvious design and
accessibility decisions — so consumers don't have to rediscover them.

Built on `@mui/material` v7 (CSS variables mode). TypeScript-first. MIT licensed.

> **License independence:** This library is **MIT licensed**. All peer dependencies are open-source: `@mui/material`, `@mui/lab`, `@iconify/react` (Apache 2.0), `framer-motion` (MIT), and optionally `apexcharts` / `react-apexcharts` (MIT). No code has been copied or derived from any proprietary theme. Every component is an original work. See [LICENSE](./LICENSE).

---

## The mango tree

The Giselle packages are a Philippine mango tree. The trunk is the shared foundation — design conventions, TypeScript patterns, test discipline — that all packages grow from. Each package is one mango on the tree, at its own stage of ripeness.

`giselle-mui` is the **yellow-green mango** 🟡 — the API is stabilising, components are tested and documented, and the first stable release is close. It is the widest branch on the tree: MUI wrapper components that encode non-obvious design and accessibility decisions so every consumer gets them right without rediscovering them.

Ripeness scale: 🟢 alpha → 🟡 beta → 🟠 stable → 🟤 LTS.

---

## What problems this solves

MUI gives you building blocks. giselle-mui gives you decisions.

Every component in this library captures a design decision that MUI intentionally leaves
to the consumer — accessibility patterns, CSS variables mode conventions, icon registration
discipline, and composable data shapes. The table below names the specific decision each
component encodes and why packaging it once is worth it.

| Component / utility                   | Decision left to the consumer by MUI                                                                                                                                                                         | What this library decides for you                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SelectableCard`                      | `<Paper onClick={...}>` is not keyboard accessible — `Tab` will not focus it and `Enter`/`Space` will not trigger it                                                                                         | `ButtonBase` as the root element — keyboard and pointer are identical, zero consumer code required                                                                     |
| `Accordion`                           | Adding a checkbox to the heading creates `<button><button>` — invalid HTML and an ARIA violation. The common workaround is `pointer-events: none` hacks that break keyboard                                  | `CheckIconButton` is a fully independent interactive element; expand/collapse and done-toggle never share a trigger                                                    |
| `channelAlpha`                        | In MUI v7 CSS variables mode `theme.palette.primary.main` does not respond to the active color scheme. The correct `rgba(var(--channel) / alpha)` pattern is underdocumented and easy to get wrong           | One function, correct in light AND dark mode, works wherever `theme.vars.palette.*Channel` is available                                                                |
| `GiselleIcon` + `createIconRegistrar` | `@iconify/react` silently fetches from `api.iconify.design` when an icon string is not pre-registered — a production CDN dependency and a render flash                                                       | Pre-registration is enforced at test time; a missing icon is a test failure, not a runtime surprise                                                                    |
| `TimelineTwoColumn`                   | MUI Lab has a basic `Timeline`. Nothing provides alternating columns, phase cards, milestone badges, expandable rows, or a `done` state API                                                                  | Full feature set, accessible eye-button interactions (WCAG 2.2 AA compliant where used), column-side invariants regression-tested, single `TimelinePhase[]` data shape |
| `TimelineCompact`                     | The two-column layout does not fit mobile widths. The usual fix is a separate data shape or complex responsive logic in the data layer                                                                       | Same `TimelinePhase[]` data shape — swap `TimelineTwoColumn` for `TimelineCompact` at `xs`/`sm`, one line of code, no data changes                                     |
| Root MUI wrappers (`sx` spread)       | Most third-party MUI wrappers accept `sx` as a single value. Passing an array silently drops every entry after the first — which is the MUI-recommended way to extend styles                                 | Components that expose root MUI styling props spread `sx` correctly: `sx={[base, ...(Array.isArray(sx) ? sx : [sx])]}`                                                 |
| `/charts`, `/motion` subpaths         | A library that bundles ApexCharts or framer-motion forces those dependencies on every consumer, even those who use neither                                                                                   | Separate tsup entries — `@littlebranches/giselle-mui` has zero chart or animation deps; opt in with `@littlebranches/giselle-mui/charts` or `.../motion`               |
| `useNestedChecklist`                  | No MUI equivalent for parent/child done-state cascade (mark a phase done → all its milestones become done; all milestones done → phase auto-completes)                                                       | Framework-agnostic hook, reusable across any nested tree structure                                                                                                     |
| `ToggleIconButton`                    | A toggle button that switches between pressed and not pressed states. Without it, moving the mouse too quickly results in the hover getting stuck. On top of that, the screen readers can not see it at all. | Fixes both issues by using CSS hover (instead of JS) and setting aria-pressed automatically.                                                                           |
| `MetricCard`, `StatCard`              | Color-tinted cards that work in both light and dark mode usually require `useColorScheme()` re-renders or hardcoded hex pairs for each mode                                                                  | `theme.vars.palette[color].mainChannel` — the CSS custom property flips automatically with the color scheme                                                            |
| `StatCardRow`                         | Building a responsive multi-card stat row normally means repeating `xs`/`sm`/`md` breakpoint logic in every layout that needs one                                                                            | Breakpoints baked in (`xs:12, sm:6, md:3`) and chart rendering is opt-in via `renderChart`, so the main bundle stays free of ApexCharts                                |

---

## API consistency contract

Short version (plain language): if a component looks like a normal MUI wrapper, it should act like one.

That means 3 things every time:

1. It accepts normal MUI props for its root (`BoxProps`, `CardProps`, etc.).
2. It merges `sx` safely, including `sx` arrays.
3. It forwards extra props (`id`, `data-*`, `aria-*`, `className`) with `...other`.

Technical rule we enforce:

- **Props type extends/omits from the matching MUI root type.**
  _In other words:_ your wrapper's TypeScript definition inherits everything from the real MUI component, so any valid MUI prop Just Works without you listing it manually. Where a prop means something different in the wrapper (e.g. `color`), it is stripped out and redefined rather than silently overridden.

- **Root `sx` is array-safe: `sx={[base, ...(Array.isArray(sx) ? sx : [sx])]}`.**
  _In other words:_ MUI lets you pass `sx` as an array — `sx={[myStyles, conditionalStyles]}` — which is the recommended way to extend a component's styles from outside. Most third-party wrappers silently drop every entry after the first because they spread `sx` naively. This library spreads it correctly so array-style overrides always work.

- **Root DOM passthrough uses `...other`.**
  _In other words:_ any prop not explicitly listed — `id`, `data-testid`, `aria-label`, `className` — passes straight through to the root element without needing a separate prop.

If a component is intentionally different (opinionated API), that exception must be clearly written in both `types.ts` and the component `README.md`.

The detailed cleanup checklist lives in [docs/components/cleanup-workflow.md](./docs/components/cleanup-workflow.md).

## Known defects and UX decisions

Open defects and design decisions are tracked in [docs/defects.md](./docs/defects.md).

Current high-priority timeline items include:

- Eye icon toggle behavior defects
- Eye icon placement/styling decision
- Per-mode requirement decision for viewed controls
- "NEW" label UX decision

---

## Status

> **Beta — active development. Not yet published to npm.**
>
> The API is stable and the test suite covers component structure, prop forwarding, ARIA
> semantics, and interaction behaviour across all shipped components. The package is fully
> built and tested locally. First public npm release is planned alongside the portfolio
> site launch (May/June 2026). Feedback and issues are welcome on [GitHub](https://github.com/LittleBranches/giselle-mui/issues).

Test coverage is functional and growing. The current suite covers component structure,
prop forwarding, ARIA semantics, and interaction behaviour. Coverage of edge cases
and visual logic (which requires a full MUI theme provider) is tracked in the component
READMEs and expanded with each release.

**The test suite will receive a full review and overhaul before the first npm publish.**
This includes edge-case coverage, negative assertion quality, and any gaps identified
during pre-release review. No package ships to npm until the tests meet the same
standard as the implementation.

Until the package is on npm, use it from disk — see [Local development](#local-development).

---

## ⚠️ ThemeProvider requirement

These components are built on **MUI v7 CSS variables mode**. They require a
`ThemeProvider` somewhere above them in the React tree.

Without a theme provider, `theme.vars.*` CSS custom properties are not injected, and
**components will render without meaningful colours or styles** — buttons without borders,
cards without backgrounds, icons without tint.

This is intentional: the library delegates theme ownership to the consuming application,
so it can integrate into any existing MUI theme without conflict.

**Basic setup:**

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({ cssVariables: true });

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <YourApp />
    </ThemeProvider>
  );
}
```

Full integration guides:

- [React — Vite / CRA](./docs/theming/react.md)
- [Next.js — App Router + Pages Router](./docs/theming/nextjs.md)

---

## Components

| Component                                         | What it solves                                                                                                                                                                                                                                      |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GiselleIcon`                                     | `@iconify/react` wrapper with full MUI `sx` support — fixes the `Box component={ThirdParty}` TypeScript pitfall and the CDN flicker problem.                                                                                                        |
| `createIconRegistrar`                             | Bundles icon SVG bodies offline — no CDN, no flicker, any framework.                                                                                                                                                                                |
| `MetricCard` + `MetricCardDecoration`             | Structured stat card (value / label / icon / decoration slots) with CSS-var colour tinting. Zero icon-library dependency.                                                                                                                           |
| `StatCard`                                        | Single-metric summary card (value / label / icon / trend) — data-layer driven via `StatCardItem`; palette-key colour prop.                                                                                                                          |
| `StatCardRow`                                     | Responsive grid of `StatCard` tiles built from a `StatCardItem[]` array — chart slot stays optional so the main bundle never pulls in a charting library.                                                                                           |
| `SelectableCard`                                  | Clickable card on `ButtonBase` — correct `aria-pressed`, keyboard focus ring, and hover state without rediscovering the `Paper onClick` pitfall.                                                                                                    |
| `QuoteCard`                                       | Testimonial card with CSS-var tinted border and conditional attribution row.                                                                                                                                                                        |
| `Accordion`                                       | Collapsible row with an independent done-toggle before the title — solves the nested-interactive-element WCAG violation that occurs when a checkbox sits inside a summary button.                                                                   |
| `TimelineTwoColumn` + `PhaseCard` + `TimelineDot` | Two-column alternating timeline for career or roadmap layouts — phase cards, milestone badges, animated active dot, checklist mode.                                                                                                                 |
| `TimelineCompact`                                 | Single-column accordion timeline for the same `TimelinePhase[]` data — swap in at `xs`/`sm` breakpoints, no data layer changes required.                                                                                                            |
| `TaskList`                                        | Flat or nested task checklist driven by `TimelinePhase[]` task arrays — done-state, priority badges, and optional eye-button viewed tracking.                                                                                                       |
| `RadialProgressCard`                              | Multi-segment radial bar chart card showing one aggregate metric with per-dimension breakdown — encodes the ApexCharts radial-bar configuration once. Imported from `@littlebranches/giselle-mui/charts`.                                           |
| `useNestedChecklist`                              | Framework-agnostic hook for parent/child done-state cascade — mark a phase done → all milestones become done; all milestones done → phase auto-completes.                                                                                           |
| `IconActionBar`                                   | Horizontal row of `Tooltip` + `IconButton` pairs — encodes the disabled-child `<span>` wrapper pattern so tooltips work on disabled buttons.                                                                                                        |
| `ToggleIconButton`                                | A toggle button that switches between pressed and not pressed states — built with CSS-driven hover instead of JavaScript, and with `aria-pressed` set automatically, so the hover never gets stuck and screen readers always know the toggle state. |
| `FloatingSubNav`                                  | Sticky / fixed floating pill navigation bar with `framer-motion` enter/exit animation — position-mode aware, scroll-offset configurable.                                                                                                            |
| `SectionTitle` + `SectionCaption`                 | Section heading with optional subtitle and colour accent, and a standalone caption primitive — consistent vertical rhythm across section layouts.                                                                                                   |
| `SectionContainer`                                | Standardised section wrapper with configurable max-width, padding, and background — ensures consistent outer spacing across all section layouts.                                                                                                    |
| `TwoColumnShowcaseRow`                            | Responsive two-column row (text + visual) for showcase/feature layouts — MUI v7 Grid v2 with configurable column widths.                                                                                                                            |

**Full API documentation, prop tables, and live examples → [Storybook](https://giselle-mui-storybook.vercel.app)** (or build locally with `npm run build-storybook` to preview unreleased changes before they reach `main`)

**Design decisions and architecture per component → [Docusaurus docs](https://giselle-docs.vercel.app/giselle-mui)**

Every component exists because it solves a problem that is either easy to get wrong or non-trivial to implement correctly with MUI alone.

Components live in a nested tree that mirrors the "Components" navigation a consumer sees in the docs site — the same convention MUI itself uses:

```
src/components/<layer>/<category>/<name>/
```

`<layer>` is one of `material`, `motion`, `section`, `chart`, `lab`, or `theming`. `<category>` follows MUI's own grouping for the `material` layer — `surfaces/card/`, `data-display/icon/`, `layout/`, `navigation/`, `input/`, `feedback/`. So `MetricCard` lives at `src/components/material/surfaces/card/metric/`, and `GiselleIcon` at `src/components/material/data-display/icon/giselle/`. Internal sub-components nest one level deeper inside their parent's folder, each in its own named folder.

Each component folder's `README.md` documents the design rationale, accessibility decisions, and library-safety notes; its `roadmap.md` tracks planned work. The full folder-by-folder listing is in [`docs/component-inventory.md`](./docs/component-inventory.md).

---

## Install

```bash
npm install @littlebranches/giselle-mui
```

Peer dependencies (install separately if not already in your project):

```bash
npm install @mui/material @mui/lab @emotion/react @emotion/styled react react-dom
```

Required if you use `FloatingSubNav`:

```bash
npm install framer-motion
```

Optional — only required if you use `GiselleIcon`:

```bash
npm install @iconify/react
```

Optional — only required if you use `RadialProgressCard`:

```bash
npm install apexcharts react-apexcharts
```

> **Icon registration required.** `GiselleIcon` renders from the `@iconify/react` store.
> Without pre-registration, icons load from the Iconify CDN — causing visible flicker.
> See [GiselleIcon and icon registration](#giselleicon-and-icon-registration) below.

---

## Usage

```tsx
import {
  GiselleIcon,
  MetricCard,
  MetricCardDecoration,
  SelectableCard,
  QuoteCard,
} from '@littlebranches/giselle-mui';

// Wrap your app in ThemeProvider — see docs/theming-react.md for full setup
<MetricCard
  value="20+"
  label="Years"
  sublabel="front-end, since 2005"
  color="primary"
  icon={<GiselleIcon icon="solar:clock-circle-bold-duotone" width={36} />}
  decoration={<MetricCardDecoration color="primary" />}
/>;
```

---

## GiselleIcon and icon registration

`GiselleIcon` renders icons from the `@iconify/react` module-level store. That store is
**empty by default**. If you don't pre-load it, `@iconify/react` falls back to the
Iconify CDN — icons load after a network round-trip and flicker visibly on first render.

### Online (CDN) — zero setup, not production-ready

Icon names from the [Iconify catalogue](https://icon-sets.iconify.design/) load
automatically with no configuration. Works in **any framework**. Acceptable for
prototyping; not suitable for production.

```tsx
// Works immediately — icons fetched from CDN on demand
<GiselleIcon icon="solar:rocket-bold-duotone" />
```

### Offline registration — recommended for production

Use `createIconRegistrar` to bundle icon SVG bodies directly in your JS output.
No CDN, no flicker, works in **any framework**.

```ts
// src/icon-sets.ts
import { createIconRegistrar } from '@littlebranches/giselle-mui';

export const registerIcons = createIconRegistrar({
  'solar:rocket-bold-duotone': {
    body: '<path fill="currentColor" d="..." />',
  },
  'logos:typescript-icon': {
    width: 256,
    height: 256, // logos: icons need explicit dims — see README
    body: '<path fill="#3178c6" d="..." />',
  },
});
```

Then call `registerIcons()` at module level before React renders:

- **Vite / CRA** — call it in `src/main.tsx` before `createRoot`
- **Next.js App Router** — call it at module level inside a `'use client'` component mounted in root layout
- **Next.js Pages Router** — call it in `pages/_app.tsx`

Full setup guide (framework examples, viewBox rules, monorepo caveats):
→ [GiselleIcon README](./src/components/material/data-display/icon/giselle/README.md)
→ [docs/components/icon/giselle/iconify-registration.md](./docs/components/icon/giselle/iconify-registration.md)

---

## Tech stack

- React 18+ with TypeScript — strict mode, no `any`
- `@mui/material` v7 (CSS variables mode — `theme.vars.palette.*`, not `theme.palette.*`)
- `@iconify/react` for icons (Apache 2.0 — only allowed icon peer dependency)
- Vitest + jsdom for unit tests
- Storybook for visual development and autodoc

---

## Local development

```bash
git clone git@github.com:LittleBranches/giselle-mui.git
cd giselle-mui
npm install
npm run typecheck
npm test
npm run build
```

**Developing alongside a consumer app (e.g. the alexrebula portfolio)?**
Use [yalc](https://github.com/wclr/yalc) — a local package registry that installs your
built dist as a real package (no symlinks, no junctions, Turbopack compatible):

```bash
# one-time setup
npm install -g yalc

# in giselle-mui — after any change
npm run build && yalc push

# in the consumer app — one-time
yalc add @littlebranches/giselle-mui
```

Full workflow, publishing steps, and the reasoning behind yalc:
→ [docs/local-development.md](./docs/local-development.md)

---

## Roadmap

| Phase                   | Status     | Description                                                                                                                                                               |
| ----------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core components         | ✅ Done    | `GiselleIcon`, `MetricCard`, `SelectableCard`, `QuoteCard`, `TimelineTwoColumn` — all with unit tests + READMEs                                                           |
| Storybook stories       | ✅ Done    | Stories shipped for all components. Publicly hosted at [giselle-mui-storybook.vercel.app](https://giselle-mui-storybook.vercel.app), redeployed on every merge to `main`. |
| Phase A theme utilities | ✅ Done    | `channelAlpha`, `hexToChannel`, `pxToRem`/`remToPx` — see [`docs/roadmap.md`](./docs/roadmap.md)                                                                          |
| Phase B brand theme     | ✅ Done    | `giselleTheme` preset + palette constants — import from `@littlebranches/giselle-mui/utils` — see [`docs/roadmap.md`](./docs/roadmap.md)                                  |
| npm publish             | ⬜ Planned | Alongside portfolio launch, May/June 2026                                                                                                                                 |
| Additional components   | ⬜ Planned | Components extracted from portfolio patterns as they meet the extraction checklist                                                                                        |

Full detail: [`docs/roadmap.md`](./docs/roadmap.md)

---

## Part of the Giselle UI ecosystem

| Package                                | Description                                              | Status |
| -------------------------------------- | -------------------------------------------------------- | ------ |
| `@littlebranches/giselle-mui`          | MUI wrapper components (this package)                    | Beta   |
| `@littlebranches/giselle-ui`           | Framework-agnostic component primitives                  | Beta   |
| `@littlebranches/giselle-sections-sdk` | Typed section data contracts for portfolio/product sites | Beta   |

All packages are in active development and will be published together.

---

## License

MIT — see [LICENSE](./LICENSE).

---

## Background

This library grew out of building production applications with commercial MUI themes — in particular the [Minimals MUI kit](https://minimals.cc). That work revealed which MUI design decisions are most commonly left to the consumer and most commonly gotten wrong. Every component here is an original implementation, written from scratch and licensed MIT. None of the source code from Minimals or any other proprietary theme has been copied or derived.

---

## Contributing

Issues and pull requests are welcome. Before opening a PR, please read the quality gate requirements — all checks (Structure, Prettier, ESLint, TypeScript, Vitest, tsup build, Storybook build) must pass. The pre-push hook runs them automatically.

See [docs/local-development.md](./docs/local-development.md) to get started.

---

— [Alex Rebula](https://github.com/AlexRebula)
