## What it does

`create-angular-component` builds a new Angular 17+ standalone component in the same two phases as its React and Vue siblings: a scaffold committed on its own, then an implementation driven by a strict red-green loop. It assumes the signal-based API throughout: `input()`, `input.required<T>()`, `output()`, and `computed()` for anything derived. The decorator-based `@Input()` / `@Output()` style is a different world; if the project is on Angular below 17, say so and the skill asks rather than guessing.

The component file does not exist during the scaffold. That absence is the same signal used across all three `create-*` skills: it marks the folder as agreed-but-unbuilt, so anyone reading the folder can tell design from delivery without opening a single file.

## When to reach for it

Type `/create-angular-component`, or the agent reaches for it when you ask for a new standalone Angular component built from scratch. Reach for it when there is nothing behind the component yet, not when extending or fixing an existing one.

## Before any code: eight required answers

The skill will not proceed until you have answered:

1. Component name, PascalCase with a `Component` suffix (e.g. `UserAvatarComponent`)
2. Selector, kebab-case (e.g. `app-user-avatar`)
3. Folder path, relative to `src/`
4. What it renders, one sentence
5. Required inputs and their types
6. Optional inputs and their defaults
7. Outputs, event names and payload types
8. Any DI tokens or services it needs, named up front

Angular carries one extra question the other two frameworks don't: undisclosed service dependencies are harder to retrofit once a component is wired into a module tree, so they get pinned down before any code exists.

## Phase 1: scaffold, then commit

Four files, no `.component.ts`:

```
src/<path>/<name>/
├── types.ts                    ← input/output type aliases
├── <name>.component.spec.ts    ← it.todo stubs only
├── README.md                   ← why it exists, planned API
└── index.ts                     ← stub barrel
```

## Phase 2: implementation, one test at a time

Types are filled in first. The component itself is always `standalone: true` with `ChangeDetectionStrategy.OnPush`, no NgModule, no exceptions for new components. Template logic uses the `@if` / `@for` / `@switch` block syntax, never `*ngIf` or `*ngFor`. Anything derived goes through `computed()`, never calculated inline in the template. `innerHTML` binding never appears without explicit DOMPurify sanitisation at the call site, and there is no reaching for `document.querySelector` or other direct DOM manipulation when an Angular API already does the job.

The loop is the same red-green discipline as [tdd](../engineering/tdd.md) and this skill's React and Vue siblings: one `it.todo` replaced with a real test, watched red, made to pass with the minimum code, then the next. The required test set, written against `@testing-library/angular`, covers the smoke render, each input and each variant, one test per output, and a check that computed values react to input changes. Mocking happens only at the DI boundary, a spy or stub provided through `TestBed`, never against Angular core (`Component`, `input`, `computed`, `ChangeDetectorRef`) and never against a child component living in the same module or library.

## Common questions

**Can I use `@Input()` / `@Output()` decorators instead of signals?**
Only if the project is genuinely below Angular 17. Say so up front; the skill will ask and adapt rather than defaulting to the signal API on an older codebase.

**Why does this skill ask about DI tokens when React and Vue don't ask about dependencies the same way?**
They do ask about external dependencies too, but Angular's DI graph is structural in a way import lists aren't: a service pulled in after the fact can ripple into providers and test setup across the module tree. Naming services during alignment avoids that rework.

**What if my project uses `TestBed` directly instead of `@testing-library/angular`?**
Adapt the required test cases to `TestBed`, but keep the same coverage: smoke render, each input and variant, each output, and computed reactivity to input changes.

## It's working if

- The scaffold commit has no `<name>.component.ts`, only types, spec stubs, README, and barrel.
- Every new component is `standalone: true` with `ChangeDetectionStrategy.OnPush`.
- Inputs and outputs use the signal API (`input()`, `output()`), not decorators, unless the project was flagged as pre-17.
- Template blocks use `@if` / `@for` / `@switch`, never the structural directives.
- Mocks appear only at the DI boundary, never against Angular core or a sibling component.

## Where it fits

`create-angular-component` is a standalone, user-invoked skill: reach for it directly whenever a new standalone Angular component needs to exist and nothing about it is settled yet. Its siblings, [create-react-component](./create-react-component.md) and [create-vue-component](./create-vue-component.md), apply the same scaffold-then-implement shape to their own frameworks, so the workflow transfers even though the signal API is Angular's own idiom.
