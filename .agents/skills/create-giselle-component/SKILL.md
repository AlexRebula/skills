---
name: create-giselle-component
description: Scaffold and TDD a new Giselle MUI component from scratch. Enforces oss-quality-standards structure, API contract, and test patterns. Use when creating any new component in giselle-mui. Covers both the scaffold phase (folder + types + stubs) and the implementation phase (TDD loop, stories, barrel).
---

# Create Giselle MUI Component

Two phases. The scaffold phase creates the folder structure and stubs. The implementation
phase fills them in using a strict TDD red-green-refactor loop.
Do not start the implementation phase until the scaffold phase is committed.

---

## Before writing any code — alignment (8 required answers)

Ask the user:
1. Component name — PascalCase (derives all file names from this)
2. Layer folder: `material/`, `chart/`, `motion/`, `lab/`, `theming/`, or `section/`
3. Category subfolder within that layer (mirrors MUI taxonomy: `data-display/`, `inputs/`, `surfaces/`, `navigation/`, `layout/`, `feedback/`)
4. MUI root component it wraps (e.g. `Card`, `Button`, `Box`) — or `none`
5. Required props and their types
6. Optional props and their variants
7. Does it need `ref` forwarding? (yes for anything wrapping a DOM element or MUI component)
8. Does it use `useTheme` or `sx`? (determines whether the ThemeProvider test helper is needed)

Do not proceed until all 8 are answered. No code until alignment is locked.

---

## Naming rules (oss-quality-standards §5.4 + §7)

| File | Convention |
|---|---|
| Folder | kebab-case — `metric-card/` |
| Main component | `<name>.tsx` — or role-based for deep nesting (see below) |
| Types | `types.ts` — always a separate file, never inline in the component |
| Barrel | `index.ts` |
| Tests | `<name>.test.ts` |
| Style tests | `<name>.styles.test.ts` |
| Stories | `<name>.stories.tsx` |
| Styles | `<name>.styles.ts` |
| Constants | `<name>.const.ts` |
| Defaults | `<name>.defaults.tsx` |
| Utilities | `<name>.utils.ts` |
| Animations | `<name>.animations.ts` |
| Docs | `README.md` + `roadmap.md` |

**Role-based file naming** — when a component folder has 3+ nesting levels, the file is
named after its role within that level, not after the full component name:
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

**Suffix vocabulary**: `Card`, `Row`, `List`, `Table`, `Section`, `Layout`, `Label`, `Sheet`,
`Strip`, `Dialog`, `Drawer`, `Form`, `Field`, `Icon`, `Avatar`, `Chip`, `Tab`.
Adding a new suffix requires explicit user approval.

---

## Phase 1 — Scaffold (commit before implementing)

> **Two-phase scaffold — AGENTS.md §5.5.**
> Phase 1 is a commit with stubs only. The `<name>.tsx` component file must NOT exist.
> The quality-gate (`src/quality-gate/two-phase-scaffold.test.ts`) enforces this automatically:
> any new `.test.ts` added without `it.todo` stubs fails CI immediately via the
> `two-phase-scaffold-legacy-missing-todo.json` baseline check.
> Do not start Phase 2 until Phase 1 is committed.

### Files to create in the scaffold phase

```
src/components/<layer>/<category>/<name>/
├── types.ts          ← Props interface stub with JSDoc skeleton
├── <name>.test.ts    ← it.todo stubs only — no implementation yet
├── README.md         ← why it exists, planned API, design decisions
├── roadmap.md        ← planned status and open improvements (initially empty)
└── index.ts          ← stub barrel (commented-out exports)
```

**Do NOT create in the scaffold phase:**
- `<name>.tsx` — its existence = component is implemented; absence = still a placeholder
- `<name>.styles.ts` — created when implementation begins
- `<name>.const.ts` — created when implementation begins
- `<name>.stories.tsx` — created when implementation begins

### `types.ts` — scaffold template

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
  /** MUI sx prop — forwarded to root element. */
  sx?: SxProps<Theme>;
}
```

### `<name>.test.ts` — scaffold template (it.todo stubs only)

```ts
// @vitest-environment jsdom
import { describe, it } from 'vitest';

// Placeholder test file — stubs filled in before implementation begins.
// See README.md for planned behaviours.

describe('<ComponentName>', () => {
  it.todo('renders without crashing');
  it.todo('forwards arbitrary props to the root element');
  // Add component-specific behaviour stubs from the planned API
});
```

### `README.md` — scaffold template

```md
# <ComponentName>

## Why it exists

_One paragraph: the recurring problem this component solves.
What would a developer write by hand without it?_

## Why it belongs in giselle-mui

_One paragraph: why this is reusable across projects (not project-specific)._

## Planned API

| Prop | Type | Default | Description |
|---|---|---|---|
| `sx` | `SxProps<Theme>` | — | MUI sx forwarded to root |

## Design decisions

_Key choices made during design — preserved so they survive future refactors._

## Phase

Phase: `<phase-label>` | Priority tier: `T<N>`

## File structure

_Filled in when implementation begins._
```

### `roadmap.md` — scaffold template

```md
# <ComponentName> — Component Roadmap

## Status

Planned — not yet implemented.

## Open improvements

_Filled in as the component evolves._

## Completed tasks

_None yet._
```

### `index.ts` — scaffold template (stub)

```ts
// Placeholder — not yet implemented.
// When <ComponentName> is built, replace with:
// export { <ComponentName> } from './<name>';
// export type { <ComponentName>Props } from './types';
```

---

## Phase 2 — Implementation (TDD loop)

### Types — fill in `types.ts` first, before any JSX

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

### Component file — `<name>.tsx`

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
- `sx` merged with array syntax — never `sx={{ ...sx, prop: value }}`
- `...other` spread onto root element — forwards `data-*`, `aria-*`, event handlers
- No hardcoded colours — use MUI theme tokens only (`palette.text.primary`, `background.paper`)
- No `React.FC` — use function declarations or `forwardRef`
- `displayName` set on every component
- `forwardRef` required for anything wrapping a DOM element or MUI component
- Never use `dangerouslySetInnerHTML`

### Barrel `index.ts` — final (replace stub)

```ts
export { MyCard } from './my-card';
export type { MyCardProps } from './types';
```

### TDD loop — replace `it.todo` stubs with real tests one at a time

```
RED:   Replace first it.todo with a real test → run → confirm it fails
GREEN: Write minimal implementation to pass it → run → confirm it passes
REPEAT for each remaining test case
REFACTOR: After all tests pass — extract duplication, deepen modules
```

Never write all tests before any implementation (horizontal slicing).
Never refactor while any test is red.

### Required test cases — replace each it.todo stub

```ts
// 1. Smoke render
it('renders without crashing', () => { ... });

// 2. Required props appear in output
it('renders the label', () => { ... });

// 3. Each optional variant — one test per variant
it('applies outlined variant', () => { ... });

// 4. ...other passthrough
it('forwards arbitrary props to the root element', () => { ... });

// 5. ref forwarding — only if forwardRef is used
it('forwards ref to the root element', () => { ... });
```

### Test helper — use ThemeProvider, never mock MUI

Create `src/test-utils.ts` if it does not already exist:

```ts
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';

const theme = createTheme();

/** Pure rendering checks — no interaction needed. */
export function renderWithTheme(element: React.ReactElement): string {
  return renderToStaticMarkup(
    React.createElement(ThemeProvider, { theme }, element)
  );
}

/** Interaction tests — user events, state transitions. */
export function renderInteractiveWithTheme(element: React.ReactElement) {
  return render(React.createElement(ThemeProvider, { theme }, element));
}
```

**Never use `vi.mock('@mui/material/...')` or `vi.mock('@mui/material/styles')`.** This
makes tests verify mocks rather than the component. Use `renderWithTheme` instead.

Use `renderToStaticMarkup` for pure rendering. Use `@testing-library/react` + `userEvent`
only when you need user events or state transitions.

### Mocking rules (oss-quality-standards §10.6)

- Mock at module boundaries only: external APIs, `window.fetch`, `Date`, `Math.random`
- Never mock MUI components, MUI hooks, or `react-dom/server`
- Never mock a function from the same package

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

## Stories — `<name>.stories.tsx`

**CRITICAL: The `title` must mirror the `src/components/` folder path exactly.**

```
src/components/material/surfaces/card/metric/   → 'Material/Surfaces/Cards/Metric'
src/components/chart/radial-progress/           → 'Chart/Radial Progress'
src/components/motion/floating-side-nav/        → 'Motion/Floating Side Nav'
src/components/section/hero/                    → 'Section/Hero'
```

Rule: folder path = story title. If they ever disagree, fix the story title — never the folder.

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

Story names: PascalCase. Never repeat the component name in the story name.
No real names, emails, or client data in any story — use generic placeholders.

---

## Update README.md — fill in the File structure section

After implementation, update the `README.md` File structure section with the actual files:

```md
## File structure

src/components/<layer>/<category>/<name>/
  <name>.tsx          — component
  <name>.styles.ts    — style functions
  <name>.test.ts      — unit tests
  <name>.styles.test.ts — style tests
  <name>.stories.tsx  — Storybook stories
  types.ts            — Props interface
  index.ts            — barrel export
  README.md           — this file
  roadmap.md          — open improvements and completed tasks
```

---

## After implementation — checklist before PR

- [ ] Quality gate green: `npm run check`
- [ ] All `it.todo` stubs replaced with real passing tests
- [ ] 80%+ line coverage on the component file
- [ ] No `vi.mock` for MUI modules — `renderWithTheme` used instead
- [ ] No hardcoded colours
- [ ] `sx` array-safe
- [ ] `...other` passthrough present
- [ ] `displayName` set
- [ ] `ref` forwarding if wrapping a DOM element
- [ ] Props interface in `types.ts` (not in component file)
- [ ] Barrel `index.ts` exports component and `type { Props }` from `./types`
- [ ] Library index updated (`src/index.ts` or the correct layer index)
- [ ] At least `Default` story present
- [ ] Storybook `title` mirrors folder path exactly
- [ ] README.md File structure section filled in
- [ ] `roadmap.md` updated if any open improvements identified
- [ ] Zero-personal-data in tests and stories
- [ ] CONTEXT.md updated if new domain terms introduced
