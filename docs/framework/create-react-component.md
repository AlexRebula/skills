## What it does

`create-react-component` builds a new React component from nothing, in two phases you commit separately. Phase one is a scaffold: types, an `it.todo` test file, a README, and a stub barrel, with no component file yet. Phase two is the implementation, done as a strict red-green loop, one test at a time.

The component file's absence during phase one is deliberate. It is the signal, readable by you or by whoever picks this up next, that the shape has been agreed but nothing has been built. Skipping straight to phase two collapses that signal and is the most common way this skill goes wrong.

## When to reach for it

Type `/create-react-component`, or the agent reaches for it when you ask for a new React component built from scratch. It is framework-agnostic React: no MUI, no design-system assumptions baked in. If the target is a Giselle MUI component specifically, use `create-giselle-component` instead, which carries that library's structure and API contract.

Reach for it when you are starting a component with nothing behind it yet, not when you are extending or fixing one that already exists.

## Before any code: seven required answers

The skill will not proceed until you have answered:

1. Component name, PascalCase
2. Folder path, relative to `src/`
3. What it renders, one sentence (this becomes the README's "why it exists")
4. Required props and their types
5. Optional props and their variants
6. Whether it needs `ref` forwarding (yes, for anything wrapping a native element)
7. Any external dependencies, named up front, not discovered mid-build

Skipping ahead of these produces the thing the questions exist to prevent: a component whose props interface is guessed rather than agreed.

## Phase 1: scaffold, then commit

Four files, no component:

```
src/<path>/<name>/
├── types.ts          ← props interface stub
├── <name>.test.tsx   ← it.todo stubs only
├── README.md         ← why it exists, planned API
└── index.ts           ← stub barrel
```

The README's "Planned API" table and the two `it.todo` entries are the contract for phase two. Commit here before writing a line of JSX.

## Phase 2: implementation, one test at a time

Types come first, filled in before any template. The component itself always extends the right HTML attributes, forwards `ref` when it wraps a native element, spreads `...other` onto the root, and sets `displayName`. No `React.FC`, no `dangerouslySetInnerHTML`, no hardcoded colours.

The loop underneath is the same red-green discipline as [tdd](../engineering/tdd.md): replace one `it.todo` with a real test, watch it fail, write only enough to pass it, repeat. Refactor only once everything is green. The required test set covers the smoke render, each prop and each variant, the `...other` passthrough, and `ref` forwarding where it applies. Mocking stays at module boundaries, `fetch`, `Date`, external modules, never at the component's own siblings, and never at React itself.

Stories are optional and only apply if the project already has Storybook. If you write them, use generic placeholder data, never a real name or client detail.

## Common questions

**Why not just write the component first?**
Because the scaffold's absence is the signal that nothing is implemented yet. A reviewer, or a future you, can tell at a glance whether a component folder represents an agreed shape with no build, or a real component, just from which files exist.

**Do I need Storybook?**
No. Stories are generated only if the project already has Storybook wired up. Nothing in the skill requires it.

**What if the component needs a provider (router, context, i18n) in tests?**
Add a `src/test-utils.tsx` wrapper only once a component actually needs it, not as a default every test file reaches for.

## It's working if

- The scaffold commit has no `<name>.tsx`, only types, test stubs, README, and barrel.
- Each `it.todo` was replaced one at a time, watched red, then made to pass, not written in a batch.
- The props interface lives in `types.ts`, never inline in the component file.
- `ref` forwarding and `displayName` are present on anything wrapping a native element.
- Mocks appear only at real boundaries, never around the component's own module or React itself.

## Where it fits

`create-react-component` is a standalone, user-invoked skill: reach for it directly whenever a plain React component needs to exist and nothing about it is settled yet. Its siblings are [create-vue-component](./create-vue-component.md) and [create-angular-component](./create-angular-component.md), which apply the same scaffold-then-implement shape to their own frameworks. For a Giselle MUI component specifically, use `create-giselle-component` instead of this one.
