---
name: create-angular-component
description: Scaffold and TDD a new Angular 17+ standalone component. Uses signal-based inputs/outputs, Angular Testing Library for tests, and the same two-phase scaffold/implement workflow as the other create-* skills.
---

# Create Angular Component

Two phases. Scaffold first — commit before implementing.

Angular 17+ only. Uses standalone components, `input()` signals, and `output()` functions. For older Angular (< 17), ask the user — the decorator-based `@Input()` / `@Output()` variants apply.

---

## Before writing any code — alignment (8 required answers)

Ask the user:

1. Component name — PascalCase with `Component` suffix (e.g. `UserAvatarComponent`)
2. Selector — kebab-case (e.g. `app-user-avatar` or `lb-user-avatar`)
3. Folder path where it will live (relative to `src/`)
4. What it renders — one sentence
5. Required inputs and their types
6. Optional inputs and their defaults
7. Outputs (event names + payload types)
8. Does it need any DI tokens or services? (list them — no undisclosed deps)

Do not proceed until all 8 are answered.

---

## Naming rules

| File           | Convention                                               |
| -------------- | -------------------------------------------------------- |
| Folder         | kebab-case — `user-avatar/`                              |
| Component file | `<name>.component.ts`                                    |
| Template       | `<name>.component.html` (or inline for small components) |
| Styles         | `<name>.component.scss` (or `.css`)                      |
| Types          | `types.ts` — input/output interfaces always separate     |
| Barrel         | `index.ts`                                               |
| Tests          | `<name>.component.spec.ts`                               |
| Docs           | `README.md`                                              |

---

## Phase 1 — Scaffold (commit before implementing)

### Files to create

```
src/<path>/<name>/
├── types.ts                  ← input/output type aliases
├── <name>.component.spec.ts  ← it.todo stubs only
├── README.md                 ← why it exists, planned API
└── index.ts                  ← stub barrel
```

Do NOT create `<name>.component.ts` yet.

### `types.ts` — scaffold template

```ts
/**
 * Input types for `<ComponentName>Component`.
 *
 * @todo Fill in inputs when implementation begins.
 */
export interface <ComponentName>Inputs {
  // name: string;
}
```

### `<name>.component.spec.ts` — scaffold template

```ts
import { describe, it } from '@jest/globals'; // or vitest

describe('<ComponentName>Component', () => {
  it.todo('renders without crashing');
  it.todo('reflects input changes in the view');
});
```

### `README.md` — scaffold template

```md
# <ComponentName>Component

## Why it exists

_One paragraph: the recurring problem this component solves._

## Planned API

| Input | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

| Output | Payload | Description |
| ------ | ------- | ----------- |

## Design decisions

_Key choices made during design._
```

### `index.ts` — scaffold template

```ts
// Placeholder — not yet implemented.
// When <ComponentName>Component is built, replace with:
// export { <ComponentName>Component } from './<name>.component';
// export type { <ComponentName>Inputs } from './types';
```

---

## Phase 2 — Implementation (TDD loop)

### Types first — fill in `types.ts` before any template

```ts
export interface UserAvatarInputs {
  /** Required: display name shown as initials fallback. */
  name: string;
  /** Optional: URL to the avatar image. */
  src?: string;
  /** Optional: size variant. */
  size?: 'sm' | 'md' | 'lg';
}
```

### Component file — `<name>.component.ts`

```ts
import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [attr.data-size]="size()">
      @if (src()) {
        <img [src]="src()" [alt]="name()" (error)="imageError.emit($event)" />
      } @else {
        <span>{{ initials() }}</span>
      }
    </div>
  `,
})
export class UserAvatarComponent {
  readonly name = input.required<string>();
  readonly src = input<string | undefined>(undefined);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly imageError = output<Event>();

  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  );
}
```

**Rules:**

- `standalone: true` — always; no NgModule for new components
- `ChangeDetectionStrategy.OnPush` — always for new components
- `input()` / `input.required<T>()` / `output<T>()` — signal-based API (Angular 17+)
- `computed()` for derived values — never calculate in the template
- Use `@if` / `@for` / `@switch` block syntax — never `*ngIf`, `*ngFor`, or `NgIf` imports
- Never use `document.querySelector` or direct DOM manipulation — use Angular APIs
- Inline template only for components under ~10 lines of HTML; otherwise use `.html` file
- Never use `innerHTML` binding without explicit DOMPurify sanitisation at the call site

### Barrel `index.ts` — replace stub

```ts
export { UserAvatarComponent } from './user-avatar.component';
export type { UserAvatarInputs } from './types';
```

### TDD loop

```
RED:     Replace first it.todo with a real failing test → run → confirm it fails
GREEN:   Write minimal code to pass → run → confirm it passes
REPEAT:  One test at a time
REFACTOR: After all tests pass
```

### Required test cases

Use `@testing-library/angular`. If the project uses `TestBed` directly, adapt accordingly.

```ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { UserAvatarComponent } from './user-avatar.component';

// 1. Smoke render
it('renders without crashing', async () => {
  await render(UserAvatarComponent, { componentInputs: { name: 'Jane Doe' } });
  expect(document.body.firstChild).not.toBeNull();
});

// 2. Required inputs appear in output
it('renders initials when no src is provided', async () => {
  await render(UserAvatarComponent, { componentInputs: { name: 'Jane Doe' } });
  expect(screen.getByText('JA')).toBeInTheDocument();
});

// 3. Each variant — one test per variant
it('sets data-size attribute for the sm variant', async () => {
  const { container } = await render(UserAvatarComponent, {
    componentInputs: { name: 'Jane Doe', size: 'sm' },
  });
  expect(container.firstChild).toHaveAttribute('data-size', 'sm');
});

// 4. Outputs — one test per output
it('emits imageError when the image fails to load', async () => {
  const imageError = jest.fn();
  await render(UserAvatarComponent, {
    componentInputs: { name: 'Jane Doe', src: 'bad.jpg' },
    componentOutputs: { imageError },
  });
  const img = screen.getByRole('img');
  fireEvent.error(img);
  expect(imageError).toHaveBeenCalledTimes(1);
});

// 5. Computed values react to input changes
it('updates initials when name input changes', async () => {
  const { rerender } = await render(UserAvatarComponent, {
    componentInputs: { name: 'Jane Doe' },
  });
  expect(screen.getByText('JA')).toBeInTheDocument();
  await rerender({ componentInputs: { name: 'Bob Smith' } });
  expect(screen.getByText('BS')).toBeInTheDocument();
});
```

**Mocking rules:**

- Mock services at the DI boundary — provide a spy or stub via `TestBed` providers
- Never mock Angular core (`Component`, `input`, `computed`, `ChangeDetectorRef`)
- Never mock child components that live in the same module/library

---

## Checklist before PR

- [ ] All `it.todo` stubs replaced with passing tests
- [ ] `standalone: true` and `ChangeDetectionStrategy.OnPush`
- [ ] `input()` / `output()` signal API used (not `@Input` / `@Output` decorators)
- [ ] `computed()` for all derived state
- [ ] Types in `types.ts`, not inline
- [ ] Barrel exports component and `type { Inputs }`
- [ ] No `innerHTML` binding without sanitisation
- [ ] No hardcoded colours
- [ ] No direct DOM manipulation (`document.querySelector` etc.)
- [ ] No real personal data in tests
- [ ] Quality gate green
