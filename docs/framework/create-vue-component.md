## What it does

`create-vue-component` builds a new Vue 3 single-file component in the same two phases as its React and Angular siblings: a scaffold you commit first, then an implementation built as a strict red-green loop. It targets the Composition API only, `<script setup lang="ts">`, `defineProps` and `defineEmits` in their type-generic form. No Options API, no `defineComponent`.

As in the scaffold, the `.vue` file itself does not exist yet. Its absence marks the folder as agreed-but-unbuilt, the same signal `create-react-component` and `create-angular-component` use, so anyone looking at the folder can tell design from delivery without reading a line of code.

## When to reach for it

Type `/create-vue-component`, or the agent reaches for it when you ask for a new Vue component built from scratch. Reach for it when there is nothing behind the component yet, not when extending or fixing an existing one.

## Before any code: seven required answers

The skill will not proceed until you have answered:

1. Component name, PascalCase
2. Folder path, relative to `src/`
3. What it renders, one sentence
4. Required props and their types
5. Events it emits, name and payload type
6. Whether it exposes any methods via `defineExpose`
7. Any external dependencies, named up front

## Phase 1: scaffold, then commit

Four files, no `.vue`:

```
src/<path>/<name>/
├── types.ts          ← props and emits interfaces
├── <name>.test.ts    ← it.todo stubs only
├── README.md         ← why it exists, planned API
└── index.ts           ← stub barrel
```

`types.ts` carries both the props interface and the emits interface from the start, even before either has real fields, because Vue's emit contract is part of the component's public surface just as much as its props are.

## Phase 2: implementation, one test at a time

Types are filled in first: props via `defineProps<PropsInterface>()`, emits via `defineEmits<EmitsInterface>()`, both the type-generic form rather than the object syntax. The root element inherits attrs automatically, Vue 3's default; only reach for `inheritAttrs: false` when a non-root element needs the passthrough explicitly. `v-html` never appears without DOMPurify sanitisation at the call site.

The loop is the same red-green discipline as [tdd](../engineering/tdd.md) and its React and Angular siblings here: one `it.todo` replaced with a real test, watched red, made to pass with the minimum code, then the next. The required test set covers the smoke render, each prop and variant, one test per emitted event, and attrs passthrough. Mocking stays at real boundaries, `fetch`, composables that hit external APIs, never at Vue's own composables (`ref`, `computed`, `watch`) and never at a sibling component in the same package.

Stories are optional, generated only if the project has `@storybook/vue3` installed, and use placeholder data only.

## Common questions

**Why does `types.ts` define an emits interface before any events are decided?**
Because emits are part of the public contract the same way props are. Naming the interface up front, even empty, keeps the two surfaces symmetric and stops emits from being bolted on ad hoc during implementation.

**Do I need `@vue/test-utils` instead of Testing Library?**
The default here is `@testing-library/vue`, matching the behaviour-first style used across the other `create-*` skills. If the project already standardises on `@vue/test-utils`, adapt the required test cases to it rather than mixing both in one codebase.

**What happens to `$attrs` if I set `inheritAttrs: false`?**
You take over placement: bind `v-bind="$attrs"` manually on whichever element should receive them. Only do this when the root element genuinely isn't the right target; it is not the default.

## It's working if

- The scaffold commit has no `<name>.vue`, only types, test stubs, README, and barrel.
- Props and emits are both typed via the generic form, never the object-literal syntax.
- Each `it.todo` was replaced one at a time and watched fail before being made to pass.
- `v-html` never appears without sanitisation at the call site.
- Mocks stay at real boundaries, never around Vue itself or a sibling component.

## Where it fits

`create-vue-component` is a standalone, user-invoked skill: reach for it directly whenever a new Vue 3 component needs to exist and nothing about it is settled yet. Its siblings, [create-react-component](./create-react-component.md) and [create-angular-component](./create-angular-component.md), apply the same scaffold-then-implement shape to their own frameworks, so switching between them costs no relearning beyond the framework's own idioms.
