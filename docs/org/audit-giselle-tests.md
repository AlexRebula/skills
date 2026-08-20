## What it does

`audit-giselle-tests` reviews the existing test files in `giselle-mui` and sorts every one of them into a bucket before proposing a single fix. It exists because AI-generated test suites in this codebase tend to fail in one of two specific, recognizable ways, and the audit is what tells you which files are actually broken before you start rewriting anything.

## When to reach for it

Run it once before starting new component work, so you know what baseline you're building on top of. It is not meant to run continuously; it's a point-in-time inventory.

| Your situation | Where to go |
| --- | --- |
| Starting component work in `giselle-mui` and want to know the state of existing tests first | `audit-giselle-tests` |
| Building a brand new component from scratch | [create-giselle-component](./create-giselle-component.md), which carries the same test patterns forward |
| The tests are fine but the code itself needs a broader review | [code-review](https://aihero.dev/skills-code-review) |
| A behaviour needs building test-first | [tdd](https://aihero.dev/skills-tdd) |

## Prerequisites

Nothing beyond a `giselle-mui` checkout. The audit reads test files; it doesn't need `src/test-utils.ts` to already exist, though the fix step creates it if missing.

## The three buckets

Every `*.test.ts` file gets classified into exactly one bucket before any fix is proposed.

| Bucket | What it looks like | Action |
| --- | --- | --- |
| A — Placeholder stubs | `it.todo` only, no `expect` calls | Leave alone. This is the two-phase scaffold pattern the quality gate itself enforces. |
| B — MUI-mock anti-pattern | Contains `vi.mock('@mui/material/...')` or `vi.mock('@mui/material/styles')` | Rewrite. The test is verifying the mock, not the component. |
| C — Good tests | Imports through the barrel, uses `renderWithTheme` or `@testing-library/react` with no MUI mocks | Check for missing required cases, top up if needed. |

Bucket B is the one that costs real time to fix, and it's worth understanding why it's wrong rather than just applying the rewrite mechanically: if a component's internal structure changes but the mocked-out pieces stay the same shape, the test still passes. It has stopped testing the component.

## The five required cases

For every Bucket C file, the audit checks for smoke render, each required prop, each optional variant, `...other` passthrough, and `ref` forwarding (only if the component uses `forwardRef`). Missing cases get reported as a list, not silently added, because adding them is a judgment call about what the component's actual contract is.

## The workflow stops for you once, on purpose

Step 3 is a hard stop: bucket counts, the list of Bucket C files missing cases, and an estimate of how many files need touching, all presented before a single file gets rewritten. This isn't a formality. Bucket B rewrites touch behavior-facing test code across a component library; knowing the blast radius before it starts is the point.

## Common questions

**Why not just delete and regenerate the Bucket B tests?**

Because the fix is mechanical and cheap once you know the pattern: swap `vi.mock` calls and `renderToStaticMarkup` for `renderWithTheme`, keep the assertions, drop anything that only existed to check a mock's fake `data-testid`. Regenerating from scratch throws away test intent that's usually still correct.

**What if `src/test-utils.ts` already exists but doesn't export `renderWithTheme`?**

Add it there rather than creating a second helper file. The point of the helper is that every component test in the repo wraps in `GiselleThemeProvider` the same way; a second helper with the same job defeats that.

**Does this ever touch Bucket A?**

No. Bucket A stubs are compliant with the two-phase scaffold rule on purpose, and the quality gate itself checks for their presence on new files. Leave them exactly as they are.

## It's working if

- The bucket counts get reported before any file is touched, and you approve the scope before the audit proceeds.
- Every Bucket B file ends up with zero `vi.mock` calls for MUI modules once the pass is done.
- `src/test-utils.ts` exists and every rewritten file imports `renderWithTheme` from it, rather than redefining it locally.
- Each component's fixes land as its own commit, not one commit for the whole audit.
- `npm run check` is green at the end, and a grep for `vi.mock('@mui/material` across active test files comes back empty.

## Where it fits

`audit-giselle-tests` is a standalone health check you run before new work starts, not a step in a chain. Its natural neighbour is [create-giselle-component](./create-giselle-component.md), since both use the same `renderWithTheme` pattern and the same required-case checklist; running the audit first means new components are held to the same bar the existing ones are being brought up to.
