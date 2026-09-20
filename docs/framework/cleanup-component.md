## What it does

`cleanup-component` diagnoses a target component against two independent axes: structural
(OSS Quality Standards §5 Component Structure Rules / §6 Component API Contract: inline
`sx`, un-extracted constants/utils, missing `types.ts`, folder-per-component) and
naming/decomposition (`naming-conventions.md`'s element-first handler and `Inputs`
prop-bag rules, `component-refactor-conventions.md`'s cascading-state-decomposition and
one-group-at-a-time sequencing rules), then fixes only what the diagnosis actually finds.
It never assumes a target needs one axis, the other, both, or neither; it checks both,
every time, before writing a single fix.

This skill is generic and organization-agnostic by design: it never behaves differently
for a specific repo, brand, or organization's own tooling. A project that wants extra
project-specific checks layered on top should build that into its own project-scoped
caller skill, which calls this one for the generic pass and then continues with its own
steps — never the other way around.

## When to reach for it

Triggered by "cleanup component X" or "refactor component X" for any target component file
or folder, in any project.

| Your situation | Where to go |
| --- | --- |
| A component may have structural debt, naming/decomposition debt, both, or you don't know which | `cleanup-component` |
| A flat sub-component file just needs mechanically moved into its own folder, and you already know it's correctly named and decomposed | `migrate-react-subcomponent`, narrower and cheaper for that one case |
| The component doesn't exist yet, so there's nothing to clean up | `create-react-component` instead |

## Prerequisites

A reachable OSS Quality Standards `AGENTS.md` (the public LittleBranches URL by default, or
your own via `--standards-url`), and the target repo's own quality gate command.

## Why it's not `migrate-react-subcomponent`

`migrate-react-subcomponent` is a structural-only mechanical move: it takes a component
that's already correctly named, already correctly decomposed, and already working, and
relocates it into its own folder. It never inspects handler names, prop-bag naming, or
cascading state logic, and explicitly assumes that work is already done.
`cleanup-component` makes no such assumption; it diagnoses both axes independently, and
where a target's diagnosis comes back structural-only and a project-specific
structural-migration skill already exists for that case, it prefers delegating the
mechanical move to that skill rather than re-implementing it.

Consider two contrasting cases for why both checks always run, independently, every time:
a component already living in its own folder with everything correctly extracted (zero
structural debt) but with `handle*`-prefixed handlers, a `Ctx`-named prop bag, and inline
cascading toggle logic; and a page-composition component with zero handlers, prop-bags, or
state (zero naming/decomposition debt) but with inline `sx` blocks and un-extracted
constants. A skill that assumed either axis would have missed the real problem on one of
the two.

## Common questions

**What if the target needs no cleanup at all?**

That's a valid diagnosis outcome. If neither check finds a violation, report that the
target is already compliant and stop without changing anything.

**Can a project extend this with its own extra checks?**

Yes, but never by teaching this skill about that project. Build a thin, project-scoped
caller skill that runs `cleanup-component` first for the generic pass, then continues with
whatever project-specific checks (a scoring system, a branded token audit, an extra
validation step) that project needs. This skill itself stays silent on every project it's
ever used in.

## It's working if

- Both axes were checked independently, even when the target "looked like" it only needed
  one kind of work.
- Only the axis(es) the diagnosis actually flagged got fixed; an axis with zero findings
  stayed untouched.
- The target repo's own quality gate is green after the fixes.
- Nothing in the diagnosis or fix step referenced a specific organization, repo, or brand.

## Where it fits

The diagnose-first counterpart to `migrate-react-subcomponent`: that skill assumes the
mechanical-move case is the only problem and fixes it directly; this skill figures out
which problem (if any) a given target actually has before reaching for either axis's fix,
including, where appropriate, handing the purely structural case back to a
structural-migration skill instead of duplicating it.
