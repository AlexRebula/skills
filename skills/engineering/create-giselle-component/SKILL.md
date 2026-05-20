---
name: create-giselle-component
description: Scaffold and TDD a new Giselle MUI component from scratch. Enforces oss-quality-standards structure, API contract, and test patterns. Use when creating any new component in giselle-mui.
---

# Create Giselle MUI Component

## Before writing any code

Ask the user exactly:
1. Component name (will derive all file names and exports from this)
2. Layer folder: `material/`, `chart/`, `motion/`, `lab/`, `theming/` or `section/`
3. Category subfolder within that layer (e.g. `data-display`, `inputs`, `feedback`)
4. MUI root component it wraps (e.g. `Card`, `Button`, `Box`) — or `none`
5. Required props and their types
6. Optional props and their variants
7. Does it need `ref` forwarding? (yes for anything wrapping a DOM element or MUI component)
8. Does it use `useTheme` or `sx`? (determines test helper needed)

Do not proceed until you have answers to all 8. This is the alignment step — no code until it is locked.

## Naming rules (from oss-quality-standards §7)

- Folder: kebab-case (`metric-card/`)
- Main file: `<name>.tsx` (or `.ts` for non-JSX)
- Barrel: `index.ts`
- Tests: `<name>.test.ts`
- Style tests: `<name>.styles.test.ts`
- Stories: `<name>.stories.tsx`
- Styles: `<name>.styles.ts`
- Constants: `<name>.const.ts`
- Defaults: `<name>.defaults.tsx`
- Utilities: `<name>.utils.ts`
- Animations: `<name>.animations.ts`
- Story-specific styles (rare): `<name>.stories.styles.ts`

Suffix vocabulary: `Card`, `Row`, `List`, `Table`, `Section`, `Layout`, `Label`, `Sheet`,
`Strip`, `Dialog`, `Drawer`, `Form`, `Field`, `Icon`, `Avatar`, `Chip`, `Tab`.
Adding a new suffix requires explicit approval from the user.

## Scaffold order (strict — do not reorder)

```
1. CONTEXT.md — does this component introduce any new domain terms? Add them.
2. Folder and files — create the empty structure first.
3. Types — write the Props interface in <name>.tsx before any JSX.
4. Tests — write all required tests BEFORE implementation (red phase).
5. Implementation — minimal code to make each test pass (green phase).
6. Refactor — clean up after all tests pass. Never refactor while red.
7. Styles — if needed, add <name>.styles.ts and write style tests.
8. Stories — Default story + one story per variant.
9. Barrel — update index.ts exports.
10. Library index — update src/index.ts (or the correct layer index).
```

## Folder structure to create

```
src/components/<layer>/<category>/<name>/
├── <name>.tsx          ← component + Props interface
├── <name>.test.ts      ← unit tests (interaction + rendering)
├── <name>.styles.ts    ← style functions (only if needed)
├── <name>.styles.test.ts ← style tests (only if .styles.ts exists)
├── <name>.stories.tsx  ← Storybook stories
└── index.ts            ← barrel export
```

## Component implementation rules (oss-quality-standards §5–§6)

```ts
// ✅ Correct pattern
import React from 'react';
import { Card, type CardProps } from '@mui/material';

export interface MyCardProps extends CardProps {
  /** Required prop goes first. */
  label: string;
  /** Optional variant prop. */
  variant?: 'filled' | 'outlined';
}

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

Rules to enforce:
- Props interface extends the MUI root component's props (or `React.HTMLAttributes`)
- `sx` merged with array syntax — never `sx={{ ...sx, myProp: value }}`
- `...other` spread onto root element
- No hardcoded colours — use MUI theme tokens only
- No `React.FC` — use function declarations or `forwardRef`
- `displayName` set on every component

## Test patterns (oss-quality-standards §10 + Matt Pocock TDD)

### Required test cases for every component

```ts
// 1. Smoke render — proves it mounts without crashing
it('renders without crashing', () => { ... });

// 2. Required props — proves key content appears
it('renders the label', () => { ... });

// 3. Each optional variant — proves variants produce different output
it('applies outlined styles when variant is outlined', () => { ... });

// 4. ...other passthrough — proves data-* and aria-* reach the root
it('forwards arbitrary props to the root element', () => { ... });

// 5. ref forwarding — only if forwardRef is used
it('forwards ref to the root element', () => { ... });
```

### Test helper — ThemeProvider wrapper (DO NOT mock MUI)

When the component uses `useTheme`, `sx`, or any MUI component, wrap with a real
ThemeProvider instead of mocking MUI modules. Create this helper once per project at
`src/test-utils.ts` if it does not already exist:

```ts
// src/test-utils.ts
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';

const theme = createTheme();

export function renderWithTheme(element: React.ReactElement) {
  return renderToStaticMarkup(
    React.createElement(ThemeProvider, { theme }, element)
  );
}

export function renderInteractiveWithTheme(element: React.ReactElement) {
  return render(
    React.createElement(ThemeProvider, { theme }, element)
  );
}
```

Then in tests:
```ts
// Pure rendering (no interaction needed)
import { renderWithTheme } from '../../../../test-utils';

it('renders the label', () => {
  const html = renderWithTheme(<MyCard label="Revenue" />);
  expect(html).toContain('Revenue');
});

// Interaction tests
import { renderInteractiveWithTheme } from '../../../../test-utils';
import userEvent from '@testing-library/user-event';

it('calls onClick when clicked', async () => {
  const onClick = vi.fn();
  const { getByRole } = renderInteractiveWithTheme(<MyCard label="x" onClick={onClick} />);
  await userEvent.click(getByRole('button'));
  expect(onClick).toHaveBeenCalledOnce();
});
```

**Never use `vi.mock` to mock MUI components or `useTheme`.** This produces tests that
test the mocks, not the component. Use `renderWithTheme` instead.

**Use `renderToStaticMarkup` for pure rendering. Use `@testing-library/react` only when
you need user events or state transitions.**

### TDD loop (vertical slices — one test at a time)

```
RED:   Write first required test case → run → confirm it fails
GREEN: Write minimal implementation to pass it
REPEAT for each remaining required test case
REFACTOR: After all pass — extract duplication, deepen modules
```

Never write all tests before writing any implementation.
Never refactor while any test is red.

### Mocking rules

- Mock at module boundaries only (external APIs, `window.fetch`, date, random)
- Never mock MUI components or hooks — use ThemeProvider instead
- Never mock a function that lives in the same package
- Never mock `react-dom/server`

## Style tests pattern

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

## Stories pattern

```ts
// <name>.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyCard } from './my-card';

const meta: Meta<typeof MyCard> = {
  component: MyCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof MyCard>;

export const Default: Story = {
  args: { label: 'Revenue' },
};

export const Outlined: Story = {
  args: { label: 'Revenue', variant: 'outlined' },
};
```

Story names: PascalCase. Never repeat the component name in the story name.
No real names, emails, or client data in any story — use generic placeholders.

## After implementation — checklist before PR

- [ ] Quality gate green: `npm run check`
- [ ] All required test cases present and passing
- [ ] 80%+ line coverage on the component file
- [ ] No `vi.mock` for MUI modules
- [ ] No hardcoded colours
- [ ] `sx` array-safe
- [ ] `...other` passthrough present
- [ ] `displayName` set
- [ ] `ref` forwarding if wrapping a DOM element
- [ ] Barrel `index.ts` exports Props type and component
- [ ] Library index updated
- [ ] At least `Default` story present
- [ ] Zero-personal-data in tests and stories
- [ ] CONTEXT.md updated if new domain terms introduced
