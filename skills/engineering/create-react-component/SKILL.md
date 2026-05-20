---
name: create-react-component
description: Scaffold and TDD a new React component from scratch. Framework-agnostic scaffold rules — types first, it.todo stubs, README, roadmap, then a strict red-green-refactor TDD loop. No MUI dependency. Use for any React project that is not giselle-mui (use /create-giselle-component for that).
---

# Create React Component

Two phases. Scaffold first — commit before implementing.

---

## Before writing any code — alignment (7 required answers)

Ask the user:

1. Component name — PascalCase
2. Folder path where it will live (relative to `src/`)
3. What it renders — one sentence (drives the README "why it exists")
4. Required props and their types
5. Optional props and their variants
6. Does it need `ref` forwarding? (yes for anything wrapping a native element)
7. Does it need any external dependencies? (list them — no undisclosed deps)

Do not proceed until all 7 are answered.

---

## Naming rules

| File | Convention |
|---|---|
| Folder | kebab-case — `user-avatar/` |
| Component file | `<name>.tsx` |
| Types | `types.ts` — props interface always separate, never inline |
| Barrel | `index.ts` |
| Tests | `<name>.test.tsx` |
| Stories | `<name>.stories.tsx` (if Storybook is in the project) |
| Styles | `<name>.module.css` or `<name>.styles.ts` depending on project convention |
| Docs | `README.md` |

---

## Phase 1 — Scaffold (commit before implementing)

### Files to create

```
src/<path>/<name>/
├── types.ts          ← props interface stub
├── <name>.test.tsx   ← it.todo stubs only
├── README.md         ← why it exists, planned API
└── index.ts          ← stub barrel
```

Do NOT create `<name>.tsx` yet. Its absence signals the component is not implemented.

### `types.ts` — scaffold template

```ts
/**
 * Props for `<ComponentName>`.
 *
 * @todo Fill in props when implementation begins.
 */
export interface <ComponentName>Props {
  /** Class name forwarded to the root element. */
  className?: string;
}
```

### `<name>.test.tsx` — scaffold template

```tsx
import { describe, it } from 'vitest';

describe('<ComponentName>', () => {
  it.todo('renders without crashing');
  it.todo('forwards arbitrary props to the root element');
});
```

### `README.md` — scaffold template

```md
# <ComponentName>

## Why it exists

_One paragraph: the recurring problem this component solves._

## Planned API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Forwarded to root element |

## Design decisions

_Key choices made during design._
```

### `index.ts` — scaffold template

```ts
// Placeholder — not yet implemented.
// When <ComponentName> is built, replace with:
// export { <ComponentName> } from './<name>';
// export type { <ComponentName>Props } from './types';
```

---

## Phase 2 — Implementation (TDD loop)

### Types first — fill in `types.ts` before any JSX

```ts
import type { HTMLAttributes } from 'react';

export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Required: display name shown as initials fallback. */
  name: string;
  /** Optional: URL to the avatar image. */
  src?: string;
  /** Optional: size variant. */
  size?: 'sm' | 'md' | 'lg';
}
```

**Rules:**
- Props interface extends the appropriate HTML element's attributes (or `React.HTMLAttributes`)
- Always in `types.ts`, never in the component file
- Exported via barrel as `export type { ComponentProps } from './types'`

### Component file — `<name>.tsx`

```tsx
import { forwardRef } from 'react';
import type { UserAvatarProps } from './types';

export const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  function UserAvatar({ name, src, size = 'md', className, ...other }, ref) {
    return (
      <div ref={ref} className={className} data-size={size} {...other}>
        {src ? <img src={src} alt={name} /> : name.slice(0, 2).toUpperCase()}
      </div>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';
```

**Rules:**
- `...other` spread onto root element — forwards `data-*`, `aria-*`, event handlers
- `forwardRef` required for anything wrapping a native element
- `displayName` set on every component
- No `React.FC`
- No hardcoded colours — use CSS variables or class names
- Never use `dangerouslySetInnerHTML`

### Barrel `index.ts` — replace stub

```ts
export { UserAvatar } from './user-avatar';
export type { UserAvatarProps } from './types';
```

### TDD loop

```
RED:     Replace first it.todo with a real failing test → run → confirm it fails
GREEN:   Write minimal code to pass → run → confirm it passes
REPEAT:  One test at a time until all stubs are replaced
REFACTOR: After all tests pass — clean up duplication, no new behaviour
```

Never write all tests before any implementation. Never refactor while a test is red.

### Required test cases

```tsx
import { render, screen } from '@testing-library/react';
import { UserAvatar } from '.';

// 1. Smoke render
it('renders without crashing', () => {
  render(<UserAvatar name="Jane Doe" />);
  expect(document.body.firstChild).not.toBeNull();
});

// 2. Required props appear in output
it('renders initials when no src is provided', () => {
  render(<UserAvatar name="Jane Doe" />);
  expect(screen.getByText('JA')).toBeInTheDocument();
});

// 3. Each optional variant — one test per variant
it('sets data-size attribute for the sm variant', () => {
  const { container } = render(<UserAvatar name="Jane Doe" size="sm" />);
  expect(container.firstChild).toHaveAttribute('data-size', 'sm');
});

// 4. ...other passthrough
it('forwards arbitrary props to the root element', () => {
  const { container } = render(<UserAvatar name="Jane Doe" data-testid="avatar" />);
  expect(container.firstChild).toHaveAttribute('data-testid', 'avatar');
});

// 5. ref forwarding — only if forwardRef is used
it('forwards ref to the root element', () => {
  const ref = { current: null };
  render(<UserAvatar name="Jane Doe" ref={ref} />);
  expect(ref.current).not.toBeNull();
});
```

### Test setup

No ThemeProvider needed for plain React components. Use `@testing-library/react` directly.

If the project uses a custom provider (router, context, i18n), create a `src/test-utils.tsx` wrapper:

```tsx
// src/test-utils.tsx
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: BrowserRouter });
}
```

Use it only when the component actually needs the provider — not as a blanket default.

**Mocking rules:**
- Mock at module boundaries only: `fetch`, `Date`, `Math.random`, external modules
- Never mock components from the same package
- Never mock React itself

---

## Stories — `<name>.stories.tsx`

Only create if the project has Storybook. Match the title to the folder path.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { UserAvatar } from '.';

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',  // ← mirrors folder path
  component: UserAvatar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: { name: 'Jane Doe' },
};

export const WithImage: Story = {
  args: { name: 'Jane Doe', src: 'https://example.com/avatar.jpg' },
};
```

No real names, emails, or client data in stories — use generic placeholders.

---

## Checklist before PR

- [ ] All `it.todo` stubs replaced with passing tests
- [ ] `forwardRef` used if wrapping a native element; `displayName` set
- [ ] `...other` spread on root element
- [ ] Props interface in `types.ts`, not inline
- [ ] Barrel exports component and `type { Props }`
- [ ] No `dangerouslySetInnerHTML`
- [ ] No hardcoded colours
- [ ] No real personal data in tests or stories
- [ ] Quality gate green
