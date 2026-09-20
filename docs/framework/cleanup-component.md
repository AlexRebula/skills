## What it does

`cleanup-component` diagnoses a target component against two independent axes: structural
(OSS Quality Standards §5 Component Structure Rules / §6 Component API Contract: inline
`sx`, un-extracted constants/utils, missing `types.ts`, folder-per-component) and
naming/decomposition (`naming-conventions.md`'s element-first handler and `Inputs`
prop-bag rules, `component-refactor-conventions.md`'s cascading-state-decomposition and
one-group-at-a-time sequencing rules), then fixes only what the diagnosis actually finds.
It never assumes a target needs one axis, the other, both, or neither; it checks both,
every time, before writing a single fix.

For a `giselle-mui`/`giselle-mui-poc` target, it additionally delegates to
`migrate-giselle-subcomponent`'s remaining Giselle-specific phase (DoD scoring, brand
tokens, taxonomy, `yalc`-validate) after its own fixes land. Every other target repo skips
that phase entirely: there's no Giselle tooling to run it against.

## When to reach for it

Triggered by "cleanup component X" or "refactor component X" for any target component file
or folder, in any project.

| Your situation | Where to go |
| --- | --- |
| A component may have structural debt, naming/decomposition debt, both, or you don't know which | `cleanup-component` |
| A flat sub-component file just needs mechanically moved into its own folder, and you already know it's correctly named and decomposed | `migrate-react-subcomponent` (or `migrate-giselle-subcomponent` for `giselle-mui`), narrower and cheaper for that one case |
| The component doesn't exist yet, so there's nothing to clean up | `create-react-component` (or its framework/`giselle-mui` siblings) instead |

## Prerequisites

A reachable OSS Quality Standards `AGENTS.md` (the public LittleBranches URL by default, or
your own via `--standards-url`), and the target repo's own quality gate command.

## Why it's not `migrate-giselle-subcomponent` or `migrate-react-subcomponent`

Both of those skills are structural-only mechanical moves: they take a component that's
already correctly named, already correctly decomposed, and already working, and relocate
it into its own folder. Neither one inspects handler names, prop-bag naming, or cascading
state logic, and both explicitly assume that work is already done. `cleanup-component`
makes no such assumption; it diagnoses both axes independently, and where a target's
diagnosis comes back structural-only on a flat Giselle sub-component, it delegates the
mechanical move to `migrate-giselle-subcomponent` rather than re-implementing it.

Two confirmed real-world targets are why both checks always run, independently, every
time: `TimelineTwoColumn` (`giselle-mui-poc#223`) had zero structural debt but needed
naming/decomposition work; a private consumer app's home-page component had zero
naming/decomposition debt but needed structural extraction. A skill that assumed either
axis would have missed the real problem on one of the two.

## Common questions

**What if the target needs no cleanup at all?**

That's a valid diagnosis outcome. If neither check finds a violation, report that the
target is already compliant and stop without changing anything.

**Why does the Giselle-specific delegation only trigger for two repos?**

`migrate-giselle-subcomponent`'s remaining phase (DoD scoring, brand tokens, taxonomy,
`yalc`-validate) depends on Giselle-only tooling: a component-inventory DoD score, Giselle
brand tokens, the Giselle layer taxonomy, and `yalc`-linked consumers. A non-Giselle
consumer app has none of that to check against, so running it there would either no-op or
fail outright.

## It's working if

- Both axes were checked independently, even when the target "looked like" it only needed
  one kind of work.
- Only the axis(es) the diagnosis actually flagged got fixed; an axis with zero findings
  stayed untouched.
- For a `giselle-mui`/`giselle-mui-poc` target, the Giselle-specific phase ran after the
  generic fixes landed; for every other target, it didn't run at all.
- The target repo's own quality gate is green after the fixes.

## Where it fits

The diagnose-first counterpart to `migrate-react-subcomponent` and
`migrate-giselle-subcomponent`: those two assume the mechanical-move case is the only
problem and fix it directly; this skill figures out which problem (if any) a given target
actually has before reaching for either axis's fix, including, where appropriate, handing
the purely structural case back to one of those two skills instead of duplicating it.
