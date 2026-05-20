---
name: create-vue-component
description: Scaffold and TDD a new Vue 3 single-file component. Uses Composition API with <script setup>, defineProps with TypeScript generics, defineEmits, and @testing-library/vue for tests. Same two-phase scaffold/implement workflow as the other create-* skills.
---

# Create Vue Component

Two phases. Scaffold first — commit before implementing.

---

## Before writing any code — alignment (7 required answers)

Ask the user:

1. Component name — PascalCase
2. Folder path where it will live (relative to `src/`)
3. What it renders — one sentence
4. Required props and their types
5. Events it emits (name + payload type)
6. Does it expose any methods via `defineExpose`?
7. Does it need any external dependencies? (list them)

Do not proceed until all 7 are answered.

---

## Naming rules

| File | Convention |
|---|---|
| Folder | kebab-case — `user-avatar/` |
| Component file | `<name>.vue` |
| Types | `types.ts` — props interface always separate, never inline |
| Barrel | `index.ts` |
| Tests | `<name>.test.ts` |
| Stories | `<name>.stories.ts` (if Storybook is in the project) |
| Docs | `README.md` |

---

## Phase 1 — Scaffold (commit before implementing)

### Files to create

```
src/<path>/<name>/
├── types.ts          ← props and emits interfaces
├── <name>.test.ts    ← it.todo stubs only
├── README.md         ← why it exists, planned API
└── index.ts          ← stub barrel
```

Do NOT create `<name>.vue` yet. Its absence signals the component is not implemented.

### `types.ts` — scaffold template

```ts
/**
 * Props for `<ComponentName>`.
 *
 * @todo Fill in props when implementation begins.
 */
export interface <ComponentName>Props {
  /** CSS class forwarded to the root element. */
  class?: string;
}

/**
 * Events emitted by `<ComponentName>`.
 */
export interface <ComponentName>Emits {
  // 'update:modelValue': [value: string];
}
```

### `<name>.test.ts` — scaffold template

```ts
import { describe, it } from 'vitest';

describe('<ComponentName>', () => {
  it.todo('renders without crashing');
  it.todo('forwards arbitrary attrs to the root element');
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
| `class` | `string` | — | Forwarded to root element |

## Design decisions

_Key choices made during design._
```

### `index.ts` — scaffold template

```ts
// Placeholder — not yet implemented.
// When <ComponentName> is built, replace with:
// export { default as <ComponentName> } from './<name>.vue';
// export type { <ComponentName>Props } from './types';
```

---

## Phase 2 — Implementation (TDD loop)

### Types first — fill in `types.ts` before any template

```ts
export interface UserAvatarProps {
  /** Required: display name shown as initials fallback. */
  name: string;
  /** Optional: URL to the avatar image. */
  src?: string;
  /** Optional: size variant. */
  size?: 'sm' | 'md' | 'lg';
}

export interface UserAvatarEmits {
  /** Fired when the avatar image fails to load. */
  'image-error': [event: Event];
}
```

### Component file — `<name>.vue`

```vue
<script setup lang="ts">
import type { UserAvatarProps, UserAvatarEmits } from './types';

const props = withDefaults(defineProps<UserAvatarProps>(), {
  size: 'md',
});

const emit = defineEmits<UserAvatarEmits>();

function onImageError(event: Event) {
  emit('image-error', event);
}

const initials = computed(() =>
  props.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
);
</script>

<template>
  <div :data-size="size">
    <img v-if="src" :src="src" :alt="name" @error="onImageError" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
```

**Rules:**
- Always `<script setup lang="ts">` — no Options API, no `defineComponent`
- `defineProps<PropsInterface>()` — type-generic form, not the object syntax
- `defineEmits<EmitsInterface>()` — type-generic form
- Inherit attrs on root element automatically (Vue 3 default) — set `inheritAttrs: false` only when you need to manually place `v-bind="$attrs"` on a non-root element
- Never use `dangerouslySetInnerHTML` equivalent (`v-html`) without explicit DOMPurify sanitisation at the call site

### Barrel `index.ts` — replace stub

```ts
export { default as UserAvatar } from './user-avatar.vue';
export type { UserAvatarProps, UserAvatarEmits } from './types';
```

### TDD loop

```
RED:     Replace first it.todo with a real failing test → run → confirm it fails
GREEN:   Write minimal code to pass → run → confirm it passes
REPEAT:  One test at a time
REFACTOR: After all tests pass
```

### Required test cases

Use `@testing-library/vue`. If the project uses `@vue/test-utils`, adapt accordingly.

```ts
import { render, screen } from '@testing-library/vue';
import UserAvatar from './user-avatar.vue';

// 1. Smoke render
it('renders without crashing', () => {
  render(UserAvatar, { props: { name: 'Jane Doe' } });
  expect(document.body.firstChild).not.toBeNull();
});

// 2. Required props
it('renders initials when no src is provided', () => {
  render(UserAvatar, { props: { name: 'Jane Doe' } });
  expect(screen.getByText('JA')).toBeInTheDocument();
});

// 3. Each variant — one test per variant
it('sets data-size attribute for the sm variant', () => {
  const { container } = render(UserAvatar, { props: { name: 'Jane Doe', size: 'sm' } });
  expect(container.firstChild).toHaveAttribute('data-size', 'sm');
});

// 4. Emits — one test per event
it('emits image-error when the image fails to load', async () => {
  const { emitted } = render(UserAvatar, {
    props: { name: 'Jane Doe', src: 'bad.jpg' },
  });
  const img = screen.getByRole('img');
  await fireEvent.error(img);
  expect(emitted()['image-error']).toHaveLength(1);
});

// 5. Attrs passthrough (inheritAttrs)
it('forwards data-testid to the root element', () => {
  const { container } = render(UserAvatar, {
    props: { name: 'Jane Doe' },
    attrs: { 'data-testid': 'avatar' },
  });
  expect(container.firstChild).toHaveAttribute('data-testid', 'avatar');
});
```

**Mocking rules:**
- Mock at module boundaries only: `fetch`, composables that call external APIs
- Never mock Vue itself or Vue core composables (`ref`, `computed`, `watch`)
- Never mock child components that live in the same package

---

## Stories — `<name>.stories.ts`

Only create if the project has Storybook. Requires `@storybook/vue3`.

```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import UserAvatar from './user-avatar.vue';

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
```

No real names, emails, or client data in stories.

---

## Checklist before PR

- [ ] All `it.todo` stubs replaced with passing tests
- [ ] `<script setup lang="ts">` used; no Options API
- [ ] Props typed via `defineProps<PropsInterface>()`
- [ ] Emits typed via `defineEmits<EmitsInterface>()`
- [ ] Props interface in `types.ts`, not inline
- [ ] Barrel exports component and `type { Props, Emits }`
- [ ] No `v-html` without sanitisation
- [ ] No hardcoded colours
- [ ] No real personal data in tests or stories
- [ ] Quality gate green
