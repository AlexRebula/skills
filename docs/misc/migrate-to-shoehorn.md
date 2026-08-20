## What it does

`migrate-to-shoehorn` rewrites `as` type assertions in test files into calls to [`@total-typescript/shoehorn`](https://www.npmjs.com/package/@total-typescript/shoehorn): `fromPartial()` in place of `as Type`, and `fromAny()` in place of the double-assertion `as unknown as Type`.

The problem it's solving is specific to tests, not code generally. A test that needs a `Request` object but only cares about `body.id` still has to satisfy TypeScript for all twenty of that type's other properties if it builds the object with `as`. `shoehorn` lets the test supply only what it uses and keeps the rest type-checked as "don't know, don't care" instead of faked.

**This is a test-only tool.** Nothing here recommends using `fromPartial` or `fromAny` in production code, and the skill doesn't touch non-test files.

## When to reach for it

Type `/migrate-to-shoehorn`, or mention wanting to replace `as` in tests, or needing partial test data, and the agent will reach for it.

| Your situation | Fits? |
| --- | --- |
| Test files building large fake objects just to satisfy a type, using only a few fields | Yes |
| Test intentionally passes wrong-shaped data to check error handling, via `as unknown as Type` | Yes |
| Assertions in production code | No, out of scope by design |
| A type genuinely needs to be exact in a test (no partial allowed) | Use `fromExact()` once installed, not a reason to skip this skill |

## The two replacements

| Before | After | Why |
| --- | --- | --- |
| `{ body: { id: '123' } } as Request` | `fromPartial({ body: { id: '123' } })` | Only the fields you set are checked; the rest type-check as unknown rather than being faked |
| `{ body: { id: 123 } } as unknown as Request` | `fromAny({ body: { id: 123 } })` | Keeps autocomplete while deliberately passing the wrong shape, for testing how the code handles bad input |

A third function, `fromExact()`, exists for the opposite case: forcing a full object where you'd otherwise reach for `fromPartial()`, useful if you want a test to fail loudly the moment a new required field appears.

## Workflow

1. Ask what test files have `as` assertions causing friction, whether they're mostly the "large object, few fields matter" shape or the "intentionally wrong data" shape, or both.
2. Install: `npm i @total-typescript/shoehorn` (adjust for your package manager).
3. Find candidates: `grep -r " as [A-Z]" --include="*.test.ts" --include="*.spec.ts"`.
4. Replace `as Type` with `fromPartial()`, and `as unknown as Type` with `fromAny()`, adding the import as each file needs it.
5. Run the type checker to confirm nothing regressed.

## Common questions

**Why not just use `Partial<Request>` as the parameter type instead?**
That changes the production function's signature to accept partial input everywhere, which is a much bigger and riskier change than the test needs. `shoehorn` keeps the real type in the signature and only relaxes what the *test* has to supply.

**Does this change runtime behavior?**
No. `fromPartial` and `fromAny` are identity functions at runtime; they exist purely to change what TypeScript will accept at the call site. If a test passes today, it still passes after the migration, and if it fails, that's an existing test problem the migration exposed rather than introduced.

**What if a test is deliberately checking a "wrong type" error path with `as unknown as Type`?**
That's exactly the `fromAny()` case; the intent is preserved, you just keep the editor's autocomplete on the object literal instead of losing it inside a double assertion.

## It's working if

- Test files that used to fake unrelated properties now only specify the ones the test actually reads.
- No `as Type` or `as unknown as Type` remains in the migrated files, and no such assertion crept into a non-test file as a side effect.
- The type checker passes after the migration with no changes to production signatures.
- Tests that were checking bad-input handling still check the same bad input, just through `fromAny()` instead of a double assertion.

## Where it fits

A narrow, standalone cleanup you run against test files whenever `as` friction shows up; nothing else in this collection depends on it and it depends on nothing else. It's a natural companion to any TDD-flavored skill in this collection, since tests that construct partial fixtures are exactly what those skills produce.
