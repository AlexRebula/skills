---
name: audit-giselle-tests
description: Audit existing AI-generated tests in giselle-mui for quality problems. Identifies placeholder stubs, MUI-mock anti-patterns, and missing required test cases. Use before starting new component work to establish a quality baseline.
---

# Audit Giselle MUI Tests

Use this skill to review existing tests in `giselle-mui` and produce an actionable fix plan.
Run it once before starting new component work so you know what baseline you are building on.

## What to look for

There are three buckets. Classify every test file into one before proposing any fixes.

### Bucket A — Placeholder stubs (leave alone)

Compliant with **AGENTS.md §5.5 two-phase scaffold** — `it.todo` stubs only, no
implementation yet:

```ts
// @vitest-environment jsdom
import { describe, it } from 'vitest';

describe('<ComponentName>', () => {
  it.todo('renders without crashing');
  it.todo('forwards arbitrary props to the root element');
});
```

The quality-gate (`src/quality-gate/two-phase-scaffold.test.ts`) enforces this pattern
automatically — any new `.test.ts` file without `it.todo` stubs will fail CI.

**Action: leave as-is. Do not delete or rewrite.**

### Bucket B — MUI-mock anti-pattern (rewrite)

Symptom: the test file contains `vi.mock('@mui/material/...')` or `vi.mock('@mui/material/styles')`.

```ts
vi.mock('@mui/material/Card', () => ({ default: ... }));
vi.mock('@mui/material/styles', () => ({ useTheme: vi.fn(() => ...) }));
```

**Why this is bad:** Tests mock the very components they are supposed to test. If the
component's internal structure changes, tests still pass. They test the mocks, not the behavior.

**Action: rewrite using `renderWithTheme` helper (see fix pattern below).**

### Bucket C — Good tests (leave alone)

Tests that:
- Import through the barrel (`from './component-name'`)
- Use `renderToStaticMarkup` or `@testing-library/react` without MUI mocks
- Test observable behavior through the public API

**Action: verify required test cases are present, add any missing ones.**

---

## Audit workflow

### Step 1 — Inventory

Scan for each pattern across all `*.test.ts` files:

```
1. Files with only it.todo stubs (no expect calls) → Bucket A
2. Files with vi.mock('@mui/material' or vi.mock('@mui/material/styles' → Bucket B
3. Files with real it() blocks and no MUI mocks → Bucket C
```

Report the count in each bucket before doing anything else.

### Step 2 — Check required test cases in Bucket C

For each Bucket C file, verify these test cases exist:

| Required case | Pattern |
|---|---|
| Smoke render | `it('renders without crashing', ...)` |
| Required props | `it('renders the <prop>', ...)` |
| Optional variants | `it('applies <variant>...', ...)` — one per variant |
| `...other` passthrough | `it('forwards arbitrary props', ...)` |
| `ref` forwarding | `it('forwards ref', ...)` — only if `forwardRef` used |

Report missing cases as a list before rewriting anything.

### Step 3 — Confirm fix scope with user

Before touching a single file, present:
- Count of Bucket A (stubs to leave)
- Count of Bucket B (files to rewrite)
- Count of Bucket C (files to check/top-up)
- List of Bucket C files missing required cases
- Estimated scope: how many files need touching

**Wait for user approval before proceeding.**

---

## Fix pattern — replacing MUI mocks with GiselleThemeProvider

### First: create or verify `src/test-utils.ts` exists

`giselle-mui` uses MUI CSS variables mode (`extendTheme`). Plain `createTheme` does **not**
populate `theme.vars.*` — any `sx` callback referencing those tokens crashes at render time.
`GiselleThemeProvider` is the only correct wrapper for component tests in this codebase.

```ts
// src/test-utils.ts
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';
import { GiselleThemeProvider } from './components/theming/theme-provider/giselle/giselle';

/** Use for pure rendering checks (no interaction needed). */
export function renderWithTheme(element: React.ReactElement): string {
  return renderToStaticMarkup(
    React.createElement(GiselleThemeProvider, null, element)
  );
}

/** Use when you need user events or state transitions. */
export function renderInteractiveWithTheme(element: React.ReactElement) {
  return render(React.createElement(GiselleThemeProvider, null, element));
}
```

### Then: rewrite each Bucket B file

**Before (anti-pattern):**
```ts
vi.mock('@mui/material/Card', () => ({ default: ({ children }) => <div>{children}</div> }));
vi.mock('@mui/material/styles', () => ({ useTheme: vi.fn(() => ({ palette: {} })) }));

it('renders the card container', () => {
  const html = renderToStaticMarkup(<MyCard label="x" />);
  expect(html).toContain('data-testid="my-card"');
});
```

**After (correct pattern):**
```ts
import { renderWithTheme } from '../../../../test-utils';

it('renders without crashing', () => {
  const html = renderWithTheme(<MyCard label="x" />);
  expect(html.length).toBeGreaterThan(0);
});

it('renders the label', () => {
  const html = renderWithTheme(<MyCard label="Revenue" />);
  expect(html).toContain('Revenue');
});
```

### Rules when rewriting

- Remove ALL `vi.mock` calls for MUI modules
- Replace `renderToStaticMarkup` calls with `renderWithTheme`
- Keep test descriptions focused on behavior, not structure
- Do not test `data-testid` values added by mocks — those testids belonged to the fake components
- One test file at a time — run `npm run check` after each file before moving on

---

## Branch strategy

All test rewrites go on a dedicated `test/audit-existing-tests` branch.
Do not mix test rewrites with feature work or component creation.

One commit per component (not one commit for everything):
```
test(radial-progress-card): replace MUI mocks with ThemeProvider wrapper
test(metric-card): replace MUI mocks with ThemeProvider wrapper
```

This makes the PR reviewable and allows reverting a single component if needed.

---

## Definition of done for the audit

- [ ] All Bucket B files rewritten — zero `vi.mock('@mui/material/...')` calls remain
- [ ] All Bucket C files have the 5 required test cases (or N/A with reason)
- [ ] `src/test-utils.ts` exists and is used consistently
- [ ] Quality gate green: `npm run check`
- [ ] No `vi.mock` for MUI remains in any active (non-skipped) test file
