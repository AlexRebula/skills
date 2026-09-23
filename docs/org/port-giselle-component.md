## What it does

`port-giselle-component` brings an already-built, already-tested component in from a
different repo entirely into giselle-mui, without forcing it through a from-scratch TDD
rebuild. It formalizes a convention that already existed informally in `giselle-mui`'s own
docs (`docs/standalone-gap-analysis.md`, `docs/components/home-components-extraction-plan.md`
— a "source / target / what already exists / blockers to fix" note, landed as one commit)
into a repeatable, guarded procedure.

The guardrail is mechanical, not a judgment call: the ported tests must pass in their new
home with import-path edits alone. If a test needs its assertions, mocks, or setup rewritten
to pass, the component isn't actually cheap to move — the skill stops and hands off to
`create-giselle-component` instead of forcing a modified test through.

## When to reach for it

| Your situation | Where to go |
| --- | --- |
| A working component with real, passing tests exists in a different repo, and you want to land it here as-is | `port-giselle-component` |
| The component doesn't exist yet — no `.tsx` file, no real tests, nothing to carry over | [create-giselle-component](./create-giselle-component.md) instead |
| The component already lives inside `giselle-mui`, just in the wrong place in the folder tree | [migrate-giselle-subcomponent](./migrate-giselle-subcomponent.md) instead — no repo boundary is crossed |
| The source's tests are still `it.todo` stubs, or it hasn't been through `cleanup-component` in its origin repo yet | Not a port candidate yet — `cleanup-component` there first, or use `create-giselle-component` |

## Prerequisites

A source repo with a component that has real (non-stub) passing tests and has already been
through `cleanup-component` in its own repo. `rg`/`tsc` on `PATH` for the same
mechanical import-path verification `migrate-giselle-subcomponent` uses. Read/write access
to both the source repo and `giselle-mui`.

## Why this isn't a CI gate change

`giselle-mui`'s two-phase scaffold gate (`src/quality-gate/two-phase-scaffold.test.ts`) is
commonly described as "the `.tsx` file must not exist yet," but that's not what the test
actually checks. It scans every `*.test.ts`/`*.test.tsx` under `src/components` and fails
only if a test file lacks `it.todo`/`test.todo` and isn't listed in
`src/quality-gate/two-phase-scaffold-exempt.json` — a baseline whose own description already
documents a graduation path: add the file's path with a reason once its `it.todo` stubs are
replaced with real tests. A ported component with real, passing tests satisfies the gate's
actual intent; it just graduates through the same exempt-list mechanism an in-repo
Phase-2-completed component would, with the reason citing its source repo and commit. No
change to the gate's own logic, ever.

## Where oss-quality-standards has a real gap

Two places in this skill note explicitly that the org's published standards don't yet cover
what's being checked, rather than citing a rule that doesn't exist: §6 (Component API
Contract) has no rule for detecting drift between a source component's giselle-mui import and
the version actually shipping in the target repo — a source may have been built against an
older release, a local fork, or a pre-release build that later diverged — so the skill's own
reconnaissance step exists to cover that gap by checking the real exports directly rather than
assuming a shared package name means a shared API. And §8 (Documentation Strategy) has no rule
about documenting a component's origin repo when it's ported — the README provenance note this
skill asks for is its own convention layered on top, the same relationship
`create-giselle-component` already has with `cleanup-component`'s own opinions.
