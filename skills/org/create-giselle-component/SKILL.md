---
name: create-giselle-component
description: Scaffold and TDD a new Giselle MUI component from scratch. Enforces oss-quality-standards structure, API contract, and test patterns. Use when creating any new component in giselle-mui. Covers both the scaffold phase (folder + types + stubs) and the implementation phase (TDD loop, stories, barrel). Also covers multi-component features — a parent component built from several internal sub-components.
---

# Create Giselle MUI Component

Two phases. The scaffold phase creates the folder structure and stubs. The implementation phase fills them in using a strict TDD red-green-refactor loop. Do not start the implementation phase until the scaffold phase is committed.

Some components are really a parent plus several internal sub-components (`HeroSection`, `FaqSection`, `TimelineTwoColumn`, `FeatureFlowSection` all turned out this way). Alignment question 9 below decides whether you're on the single-component path or the **multi-component feature** path — see "Multi-component features" for the scaffold shape and "Multi-component implementation" for Phase 2. Everything else in this skill (naming rules, TDD loop, checklist) applies to both; the multi-component sections only add what's different.

---

## Before writing any code: alignment (9 required answers)

**Before the alignment questions below**: does this component have an associated ticket or spec in whatever tracker/planning-store this project uses? If so, read it in full first — its acceptance criteria and already-settled decisions take priority over guessing answers to the questions below. If you don't know where such specs are tracked for this project, ask the user rather than assuming there is or isn't one.

**Also before the alignment questions**: search the codebase for an existing folder or stub matching this component's likely name (the exact name, common synonyms, and any prior-art naming already used for similar concepts nearby) — a partially-scaffolded stub with no `.tsx` yet still counts as already existing, and its folder is where this component belongs, not a freshly derived path. If one is found, questions 2 and 3 below (layer folder, category subfolder) are already answered by that existing path — don't re-derive them from scratch.

Ask the user:

1. Component name: PascalCase (derives all file names from this)
2. Layer folder: `material/`, `chart/`, `motion/`, `lab/`, `theming/`, or `section/`
3. Category subfolder within that layer (mirrors MUI taxonomy: `data-display/`, `inputs/`, `surfaces/`, `navigation/`, `layout/`, `feedback/`)
4. MUI root component it wraps (e.g. `Card`, `Button`, `Box`), or `none`
5. Required props and their types
6. Optional props and their variants
7. Does it need `ref` forwarding? (yes for anything wrapping a DOM element or MUI component)
8. Does it use `useTheme` or `sx`? (determines whether the GiselleThemeProvider test helper is needed)
9. Does this feature need internal sub-components — a parent built from several distinct pieces that each render their own markup or behaviour (not just a prop-driven variant of the same markup)? If yes, name each sub-component and its one-line role. Answers 4–8 above then apply per sub-component, not only to the parent — go to "Multi-component features" below for the scaffold shape.

Do not proceed until all 9 are answered, unless batch invocation applies (see below). No code until alignment is locked.

**Batch invocation:** If all 9 answers are already provided in the invocation message (e.g. when delegating from a parent agent or running multiple components in parallel), skip the questions and proceed directly to Phase 1. Example:

```
/create-giselle-component
Component: MetricCard
Layer: material/surfaces
Wraps: Card
Required props: label (string), value (string)
Optional props: trend ('up' | 'down' | 'flat')
ref forwarding: yes
Uses sx: yes
```

A batch invocation for a multi-component feature adds a `Sub-components:` line naming each one and its role, e.g. `Sub-components: HighlightCarousel (scrollable list of feature highlights), ImageColumn (sticky reactive image tied to the active highlight)`.

---

## Naming rules (oss-quality-standards §5.4 + §7)

| File           | Convention                                                         |
| -------------- | ------------------------------------------------------------------ |
| Folder         | kebab-case: `metric-card/`                                        |
| Main component | `<name>.tsx`, or role-based for deep nesting (see below)          |
| Types          | `types.ts`: always a separate file, never inline in the component |
| Barrel         | `index.ts`                                                         |
| Tests          | `<name>.test.ts`                                                   |
| Style tests    | `<name>.styles.test.ts`                                            |
| Stories        | `<name>.stories.tsx`                                               |
| Styles         | `<name>.styles.ts`                                                 |
| Constants      | `<name>.const.ts`                                                  |
| Defaults       | `<name>.defaults.tsx`                                              |
| Utilities      | `<name>.utils.ts`                                                  |
| Animations     | `<name>.animations.ts`                                             |
| Docs           | `README.md` + `roadmap.md`                                         |

**Role-based file naming**: when a component folder has 3+ nesting levels, the file is named after its role within that level, not after the full component name:

```
src/components/inputs/button/toggle/icon/
  icon.tsx          ← role: "icon" (not toggle-icon-button.tsx)
  icon.styles.ts
  icon.test.ts
  types.ts
  index.ts
```

Shallower components (1–2 nesting levels) use the full folder name:

```
src/components/chart/radial-progress/
  radial-progress-card.tsx    ← full name
```

**Suffix vocabulary**: `Card`, `Row`, `List`, `Table`, `Section`, `Layout`, `Label`, `Sheet`, `Strip`, `Dialog`, `Drawer`, `Form`, `Field`, `Icon`, `Avatar`, `Chip`, `Tab`. Adding a new suffix requires explicit user approval.

**Folders drop redundant category suffixes; files keep the full name.** A folder never repeats a word already supplied by its own parent path segment — the layer, the category, a generic type suffix that segment implies (`-section`, `-card`), or (in a multi-component feature) an ancestor component's own name. The `.tsx`/`.test.ts`/etc. files inside stay fully named regardless; only the folder is pruned. Confirmed by the shipped shapes in giselle-mui:

| Folder                          | Not                                     | File inside keeps           |
| -------------------------------- | ---------------------------------------- | ---------------------------- |
| `section/feature-flow/`          | `section/feature-flow-section/`          | `feature-flow-section.tsx`   |
| `chart/radial-progress/`         | `chart/radial-progress-card/`            | `radial-progress-card.tsx`   |
| `section/hero/buttons-row/`      | `section/hero/hero-buttons-row/`         | `hero-buttons-row.tsx`       |
| `section/hero/scroll-parallax/`  | `section/hero/hero-scroll-parallax/`     | `scroll-parallax-hero.tsx`   |
| `section/faq/accordion/`         | `section/faq/faq-accordion/`             | `faq-accordion.tsx`          |

Apply this to both the top-level component folder and, in a multi-component feature, every sub-component folder (see "Multi-component features" below).

---

## Phase 1: Scaffold (commit before implementing)

> **Two-phase scaffold: AGENTS.md §5.5.** Phase 1 is a commit with stubs only. The `<name>.tsx` component file must NOT exist. The quality-gate (`src/quality-gate/two-phase-scaffold.test.ts`) enforces this automatically: any new `.test.ts` added without `it.todo` stubs fails CI immediately via the `two-phase-scaffold-legacy-missing-todo.json` baseline check. Do not start Phase 2 until Phase 1 is committed.

### Files to create in the scaffold phase

```
src/components/<layer>/<category>/<name>/
├── types.ts          ← Props interface stub with JSDoc skeleton
├── <name>.test.ts    ← it.todo stubs only: no implementation yet
├── README.md         ← why it exists, planned API, design decisions
├── roadmap.md        ← planned status and open improvements (initially empty)
└── index.ts          ← stub barrel (commented-out exports)
```

**Do NOT create in the scaffold phase:**

- `<name>.tsx`: its existence = component is implemented; absence = still a placeholder
- `<name>.styles.ts`: created when implementation begins
- `<name>.const.ts`: created when implementation begins
- `<name>.stories.tsx`: created when implementation begins

### `types.ts`: scaffold template

```ts
import type { SxProps, Theme } from '@mui/material/styles';
// Import the MUI root component's props if extending:
// import type { CardProps } from '@mui/material/Card';

/**
 * Props for `<ComponentName>`.
 *
 * @todo Fill in props when implementation begins.
 * See README.md for the planned API.
 */
export interface <ComponentName>Props {
  /** MUI sx prop: forwarded to root element. */
  sx?: SxProps<Theme>;
}
```

### `<name>.test.ts`: scaffold template (it.todo stubs only)

```ts
// @vitest-environment jsdom
import { describe, it } from 'vitest';

// Placeholder test file: stubs filled in before implementation begins.
// See README.md for planned behaviours.

describe('<ComponentName>', () => {
  it.todo('renders without crashing');
  it.todo('forwards arbitrary props to the root element');
  // Add component-specific behaviour stubs from the planned API
});
```

### `README.md`: scaffold template

```md
# <ComponentName>

## Why it exists

_One paragraph: the recurring problem this component solves. What would a developer write by hand without it?_

## Why it belongs in giselle-mui

_One paragraph: why this is reusable across projects (not project-specific)._

## Planned API

| Prop | Type             | Default | Description              |
| ---- | ---------------- | ------- | ------------------------ |
| `sx` | `SxProps<Theme>` | None       | MUI sx forwarded to root |

## Design decisions

_Key choices made during design, preserved so they survive future refactors._

## Phase

Phase: `<phase-label>` | Priority tier: `T<N>`

## File structure

_Filled in when implementation begins._
```

### `roadmap.md`: scaffold template

```md
# <ComponentName>: Component Roadmap

## Status

Planned: not yet implemented.

## Open improvements

_Filled in as the component evolves._

## Completed tasks

_None yet._
```

### `index.ts`: scaffold template (stub)

```ts
// Placeholder: not yet implemented.
// When <ComponentName> is built, replace with:
// export { <ComponentName> } from './<name>';
// export type { <ComponentName>Props } from './types';
```

---

## Multi-component features (when alignment Q9 is yes)

Trigger: the feature is a parent built from several distinct internal pieces, not a single component with variants. Real precedent that needed this: `HeroSection` (→ `buttons-row/`, `interactive-logo/`, `scroll-parallax/`), `TimelineTwoColumn` (→ `milestone-badge/`, `phase-card/`, `phase-warning-popover/`, `spine-connector/`, `timeline-dot/`), `FeatureFlowSection` (→ `highlight-carousel/`, `image-column/`, `item-detail/`).

**The rule, unconditional:** every sub-component named in Q9 gets its own subfolder from the first commit — no size threshold, no exception for a piece that's internal or never exported outside the parent. A sub-component sitting flat as a loose file in the parent folder is the single most common review-time rewrite this skill exists to prevent. If you're unsure whether some internal piece is significant enough to count as a named sub-component versus a private helper that can stay flat, that judgment call is `docs/components/cleanup-workflow.md` Phase 0 in giselle-mui (Scenario A vs B) — don't re-derive it here; when in doubt, ask the user during alignment instead of guessing.

### Scaffold folder structure

```
src/components/<layer>/<category>/<feature-name>/
├── types.ts                    ← parent Props interface stub
├── <feature-name>-*.test.ts    ← it.todo stubs for the parent
├── README.md                   ← parent feature: why it exists, planned composition
├── roadmap.md
├── index.ts                    ← stub barrel
├── <sub-1>/
│   ├── types.ts                ← only if the sub-component takes props
│   ├── <sub-1>.test.ts         ← it.todo stubs
│   ├── README.md
│   ├── roadmap.md
│   └── index.ts                ← stub barrel
├── <sub-2>/
│   └── (same 5 files as <sub-1>)
└── <sub-N>/
    └── (same 5 files as <sub-1>)
```

Every sub-component folder uses the exact same five scaffold templates as the single-component Phase 1 above (`types.ts`, `<name>.test.ts`, `README.md`, `roadmap.md`, `index.ts`) — copy them verbatim, substituting the sub-component's own name. `<sub-N>.tsx` stays absent from every sub-component folder in this phase, same as the parent: Phase 1's no-implementation-yet discipline applies per sub-component, not only to the parent.

In each sub-component's `README.md`, replace "Why it belongs in giselle-mui" with a one-line "why it's split out" note (what would live inline in the parent if this weren't its own piece) — that section is about package-level reuse, which usually doesn't apply to an internal piece.

### Folder naming

Drop the parent feature's own name from every sub-component folder, same as `hero/buttons-row/` drops `hero-` (not `hero/hero-buttons-row/`). See the redundant-suffix table above.

---

## Phase 2: Implementation (TDD loop)

### Types: fill in `types.ts` first, before any JSX

```ts
import type { SxProps, Theme } from '@mui/material/styles';
import type { CardProps } from '@mui/material/Card';

export interface MyCardProps extends CardProps {
  /** Required prop goes first. */
  label: string;
  /** Optional variant prop. */
  variant?: 'filled' | 'outlined';
}
```

**Rules:**

- Props interface extends the MUI root component's props (or `React.HTMLAttributes`)
- Props are always in `types.ts`, never inline in the component file
- Props type is exported from the barrel (`index.ts`) via `export type { MyCardProps } from './types'`

### Component file: `<name>.tsx`

```ts
import React from 'react';
import Card from '@mui/material/Card';
import type { MyCardProps } from './types';

export const MyCard = React.forwardRef<HTMLDivElement, MyCardProps>(
  function MyCard({ label, variant = 'filled', sx, ...other }, ref) {
    return (
      <Card
        ref={ref}
        sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
        {...other}
      >
        {label}
      </Card>
    );
  }
);

MyCard.displayName = 'MyCard';
```

**Rules (oss-quality-standards §5–§6):**

- `sx` merged with array syntax: never `sx={{ ...sx, prop: value }}`
- `...other` spread onto root element: forwards `data-*`, `aria-*`, event handlers
- No hardcoded colours: use MUI theme tokens only (`palette.text.primary`, `background.paper`)
- No `React.FC`: use function declarations or `forwardRef`
- `displayName` set on every component
- `forwardRef` required for anything wrapping a DOM element or MUI component
- Never use `dangerouslySetInnerHTML`
- No bare `<Box>` with semantic meaning: `<Box>` is a layout primitive only; elements with roles, ARIA attributes, or meaningful visual styling must be named components (§6.6)
- `shouldForwardProp` required on any `styled()` component with custom props that must not reach the DOM (§6.7)
- Icon slots: accept icons as `React.ReactNode`; decorative icons must have `aria-hidden="true"`; icon-only buttons carry `aria-label` on the `<button>`, not on the icon (§6.10)

### Multi-component implementation

Implement each sub-component exactly like a standalone Phase 2 component: `types.ts` first, then `<sub>.tsx` with `forwardRef` + `displayName` if it wraps a DOM element or MUI component, and `...other` passthrough. **No exception for a sub-component that's never imported outside the parent folder** — `displayName` and `forwardRef` apply the same as the root component, from the first draft of the sub-component's `.tsx`, not as a follow-up fix. This is the concrete gap that shipped wrong in `FeatureFlowSection`: all three sub-components needed `forwardRef`, `displayName`, and `...other` passthrough added in a review-round fix instead of being correct from the scaffold. Don't repeat it.

Each sub-component keeps its own barrel: `<sub>/index.ts` exports the sub-component and its `Props` type (if it has one). The parent's `index.ts` re-exports only what the parent chooses to make public — most sub-components stay private to the feature, imported by the parent via relative path rather than re-exported, unless a sub-component is independently useful enough to earn a public export. Use the same export-decision framework as `docs/components/cleanup-workflow.md` Phase 0b in giselle-mui (could a second project use this exactly as-is, is it used in more than one place, etc.) rather than exporting by default.

**Input security: applies to any component in the `inputs/` layer (§6.12):**

- URL props (`href`, `src`, `action`) must reject the `javascript:` scheme: validate at the component boundary
- Password fields must use `type="password"` and must not expose the value in `data-*` or ARIA attributes
- The `sx` prop must never accept raw user-provided strings as property values
- Client-side validation is UX only: never document it as a security boundary

### Barrel `index.ts`: final (replace stub)

```ts
export { MyCard } from './my-card';
export type { MyCardProps } from './types';
```

### TDD loop: replace `it.todo` stubs with real tests one at a time

```
RED:   Replace first it.todo with a real test → run → confirm it fails
GREEN: Write minimal implementation to pass it → run → confirm it passes
REPEAT for each remaining test case
REFACTOR: After all tests pass, extract duplication, deepen modules
```

Never write all tests before any implementation (horizontal slicing). Never refactor while any test is red.

### Required test cases: replace each it.todo stub

```ts
// 1. Smoke render
it('renders without crashing', () => { ... });

// 2. Required props appear in output
it('renders the label', () => { ... });

// 3. Each optional variant: one test per variant
it('applies outlined variant', () => { ... });

// 4. ...other passthrough
it('forwards arbitrary props to the root element', () => { ... });

// 5. ref forwarding: only if forwardRef is used
it('forwards ref to the root element', () => { ... });
```

### Test helper: use GiselleThemeProvider, never mock MUI

Check whether `src/test-utils.ts` already exists in the repo. If it does, import from it. If it does not, create it:

```ts
// src/test-utils.ts
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiselleThemeProvider } from './components/theming/theme-provider/giselle/giselle';

/** Use for pure rendering checks: no interaction needed. */
export function renderWithTheme(element: React.ReactElement): string {
  return renderToStaticMarkup(React.createElement(GiselleThemeProvider, null, element));
}
```

**Why `GiselleThemeProvider` and not `ThemeProvider + createTheme()`:** giselle-mui uses MUI CSS variables mode (`extendTheme`). This populates `theme.vars.*` as CSS variable strings. Plain `createTheme()` does NOT do this. Any component whose `sx` prop references `theme.vars.*` will crash at render time without a proper provider. `GiselleThemeProvider` is the only correct wrapper for component render tests in this codebase. Style tests (which test style functions in isolation via `createTheme()`) are exempt. They never call `theme.vars.*` directly.

For interaction tests that need user events or state transitions:

```ts
import { GiselleThemeProvider } from '../../components/theming/theme-provider/giselle/giselle';
import { render } from '@testing-library/react';

export function renderInteractiveWithTheme(element: React.ReactElement) {
  return render(React.createElement(GiselleThemeProvider, null, element));
}
```

**Never use `vi.mock('@mui/material/...')` or `vi.mock('@mui/material/styles')`.** This makes tests verify mocks rather than the component. Use `renderWithTheme` instead.

Use `renderToStaticMarkup` for pure rendering. Use `@testing-library/react` + `userEvent` only when you need user events or state transitions.

### Mocking rules (oss-quality-standards §10.6)

- Mock at module boundaries only: external APIs, `window.fetch`, `Date`, `Math.random`
- Never mock MUI components, MUI hooks, or `react-dom/server`
- Never mock a function from the same package

### Accessibility (oss-quality-standards §9)

Every component must meet **WCAG 2.2 Level AA**. Accessibility gaps found in PR review are always blocking. No counter-argument overrides this.

| Rule | Requirement |
| --- | --- |
| Keyboard-first | Every interactive element reachable and activatable by keyboard |
| Focus rings | Never suppress `outline` without a visible replacement |
| Icon-only buttons | `aria-label` on the `<button>`, not on the icon |
| Decorative icons | `aria-hidden="true"` on the icon element |
| Loading states | `aria-busy` + `aria-live` on the container |
| Error messages | `aria-describedby` pointing to the error element |
| Toggle buttons | `aria-pressed` reflects current state |
| Animations | Respect `prefers-reduced-motion`: wrap in the appropriate media query or hook |

Add accessibility test cases alongside behaviour tests:

```ts
it('icon-only button has aria-label', () => {
  const html = renderWithTheme(<MyIconButton aria-label="Edit" />);
  expect(html).toContain('aria-label="Edit"');
});
```

### Style tests

```ts
// <name>.styles.test.ts
import { createTheme } from '@mui/material/styles';
import { myCardStyles } from './my-card.styles';

const theme = createTheme();

it('returns correct padding from theme spacing', () => {
  const styles = myCardStyles({ theme });
  expect(styles.padding).toBe(theme.spacing(2));
});
```

---

## Stories: `<name>.stories.tsx`

**CRITICAL: The `title` must mirror the `src/components/` folder path exactly.**

```
src/components/material/surfaces/card/metric/   → 'Material/Surfaces/Cards/Metric'
src/components/chart/radial-progress/           → 'Chart/Radial Progress'
src/components/motion/floating-side-nav/        → 'Motion/Floating Side Nav'
src/components/section/hero/                    → 'Section/Hero'
```

Rule: folder path = story title. If they ever disagree, fix the story title, never the folder.

```ts
// metric-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './metric-card';

const meta: Meta<typeof MetricCard> = {
  title: 'Material/Surfaces/Cards/Metric',   ← mirrors folder path exactly
  component: MetricCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: { label: 'Revenue' },
};

export const Outlined: Story = {
  args: { label: 'Revenue', variant: 'outlined' },
};
```

Story names: PascalCase. Never repeat the component name in the story name. No real names, emails, or client data in any story: use generic placeholders.

**Demo/fixture content that's more than a trivial literal (oss-quality-standards §8.4):** a single short value like `args: { label: 'Revenue' }` above is fine written directly in the story. But once a story's content grows past that — multiple paragraphs, a multi-item array, anything that reads as real sample data rather than a placeholder — pull it into a small local data module instead of inlining it in `.stories.tsx`. Follow the same `sections-api`-style convention used elsewhere: factory function(s) + types, colocated with the component (e.g. `__fixtures__/<name>.fixtures.ts`), imported by the story:

```ts
// __fixtures__/testimonial-card.fixtures.ts
export interface TestimonialCardDemoData {
  quote: string;
  author: string;
}

export function createTestimonialCardDemoData(): TestimonialCardDemoData {
  return {
    quote: 'Working with this team turned our biggest blocker into a two-week win...',
    author: 'Jane Doe, Acme Corp',
  };
}
```

```ts
// testimonial-card.stories.tsx
import { createTestimonialCardDemoData } from './__fixtures__/testimonial-card.fixtures';

export const Default: Story = {
  args: createTestimonialCardDemoData(),
};
```

No JSX-as-logic in the fixture file and no runtime validation needed — it just returns a typed literal.

---

## Update README.md: fill in the File structure section

After implementation, update the `README.md` File structure section with the actual files:

```md
## File structure

src/components/<layer>/<category>/<name>/
  <name>.tsx            : component
  <name>.styles.ts      : style functions
  <name>.test.ts        : unit tests
  <name>.styles.test.ts : style tests
  <name>.stories.tsx    : Storybook stories
  types.ts              : Props interface
  index.ts              : barrel export
  README.md             : this file
  roadmap.md            : open improvements and completed tasks
```

---

## Commit convention (oss-quality-standards §2.2)

Format: `<type>(<scope>): <description>`: scope is the component name in kebab-case.

```
feature(metric-card): scaffold folder structure and it.todo stubs
feature(metric-card): implement label and variant props
test(metric-card): replace MUI mocks with GiselleThemeProvider
```

For a multi-component feature, scope is the parent feature name, and the scaffold commit covers the parent plus every sub-component folder in one commit:

```
feature(feature-flow): scaffold parent + 3 sub-component folders with it.todo stubs
feature(feature-flow): implement highlight-carousel and image-column sub-components
```

Use `feature` for new component work, `fix` for bug corrections, `test` for test-only changes.

---

## After implementation: open a PR

Create a branch before starting Phase 1:

```sh
git checkout -b feature/<component-name>
```

After Phase 2 is complete and the quality gate is green, open a pull request:

```sh
gh pr create --title "feature(<component-name>): add <ComponentName>" --body "..."
```

One component = one branch = one PR. Do not mix multiple components in a single PR. A multi-component feature is one component for this purpose: the parent and all its sub-components ship together in one branch and one PR — they are one deliverable, not N.

---

## After implementation: checklist before PR

### Code

- [ ] Quality gate green: `npm run check`
- [ ] All `it.todo` stubs replaced with real passing tests
- [ ] 80%+ line coverage on the component file
- [ ] No `vi.mock` for MUI modules: `renderWithTheme` used instead
- [ ] No hardcoded colours
- [ ] `sx` array-safe
- [ ] `...other` passthrough present
- [ ] `displayName` set
- [ ] `ref` forwarding if wrapping a DOM element
- [ ] Multi-component feature: every sub-component has its own subfolder, `displayName`, `forwardRef` (if applicable), and `...other` passthrough — no exception for pieces that are internal or unexported
- [ ] Props interface in `types.ts` (not in component file)
- [ ] Barrel `index.ts` exports component and `type { Props }` from `./types`
- [ ] Library index updated (`src/index.ts` or the correct layer index)
- [ ] No bare `<Box>` with semantic meaning
- [ ] No `dangerouslySetInnerHTML`
- [ ] Input components: URL props validated, `type="password"` for password fields (§6.12)
- [ ] No commented-out code, `console.log`, `TODO`, or `FIXME`
- [ ] No new undisclosed dependencies
- [ ] No secrets in committed files

### Accessibility

- [ ] All interactive elements reachable by keyboard
- [ ] Focus rings visible
- [ ] Icon-only buttons have `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Animations respect `prefers-reduced-motion`

### Docs & stories

- [ ] At least `Default` story present
- [ ] Storybook `title` mirrors folder path exactly
- [ ] README.md File structure section filled in
- [ ] `roadmap.md` updated if any open improvements identified
- [ ] Zero-personal-data in tests and stories
- [ ] CONTEXT.md updated if new domain terms introduced

### Tracking docs

- [ ] `docs/component-compliance.md`'s row updated for this component (per `docs/components/cleanup-workflow.md`'s tracking step)
- [ ] `docs/component-inventory.md`'s row updated (DoD score against the Scenario A/B checklist, Last audited date) — if this repo maintains that file
- [ ] If the project maintains a private, non-public migration/porting-tracking matrix, its row for this component is updated too — ask the user for its name/location; never assume or hardcode one here
