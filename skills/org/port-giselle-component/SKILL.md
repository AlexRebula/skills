---
name: port-giselle-component
description: Bring an already-built, already-tested component in from a different repo entirely into giselle-mui, without a from-scratch TDD rebuild. Not create-giselle-component (that requires the target .tsx to not exist yet and TDDs from stub templates) and not migrate-giselle-subcomponent (that's for a file already living inside giselle-mui). Use when a working component exists in a different repo and the goal is to land it here with its existing, passing tests intact.
---

# Port Giselle MUI Component

Formalizes a convention that already existed informally in giselle-mui's own docs
(`docs/standalone-gap-analysis.md`, `docs/components/home-components-extraction-plan.md` —
a "source / target / what already exists / blockers to fix" note, landed as one commit,
used for several components that already had a working implementation elsewhere before
landing here). This skill turns that into a repeatable, guarded procedure.

**Not `create-giselle-component`.** That skill's Phase 1 requires the target `.tsx` to
*not* exist yet, and its whole workflow is red-green-refactor TDD from stub templates. A
component that's already built and already tested elsewhere doesn't need that — forcing
it through Phase 1/2 means throwing away working, already-reviewed code to re-derive it by
hand. The test: does the source already have real (non-stub) passing tests in its origin
repo? Yes → this skill. No, or its tests are `it.todo` stubs → `create-giselle-component`.

**Not `migrate-giselle-subcomponent`.** That skill moves a file that's already inside
giselle-mui into its own subfolder — it never crosses a repo boundary. This skill is for a
source living in a different repo entirely.

**The self-limiting guardrail, stated up front:** this skill only applies when the ported
tests pass in their new home with import-path edits alone — **zero behavioral changes**.
If a test needs its assertions, setup, or mocks rewritten to pass, the component isn't
actually cheap to move; stop and hand off to `create-giselle-component` instead. This is
mechanically checked in Step 5, not something to eyeball.

---

## Step 1 — Alignment (before touching any file)

Ask the user, in addition to `create-giselle-component`'s questions 1–4 and 7–9 (component
name, layer folder, category subfolder, MUI root wrapped, ref forwarding, `useTheme`/`sx`,
multi-component sub-pieces — reuse those verbatim, don't re-derive them):

1. **Source file path and source repo** — the exact `.tsx` and its git remote.
2. **Does the source already import giselle-mui's own published package** (or a subpath)?
   If yes, from which published version (check its `package.json`/lockfile), and does that
   version's API still match what giselle-mui exports today? A source built against an
   older or forked build of the same package name is the single biggest risk this skill
   exists to catch — see Step 2.
3. **Has the source already been through `cleanup-component` in its origin repo?** Don't
   just accept a claim — look for structural evidence (folder-per-component, `types.ts`/
   `.const.ts`/`.styles.ts` extraction, a README) or ask to see the origin repo's git log
   for a cleanup-style commit. If there's no evidence either way, treat it as "no" and stop
   — `cleanup-component` in the origin repo first, then come back.
4. **Does the source have real, non-stub tests today?** Open the test file; `it.todo`/
   `test.todo` markers mean this isn't a port candidate — `create-giselle-component`
   instead.

If 3 or 4 comes back "no," stop here and hand off to `create-giselle-component`. Don't
proceed with a partial port and plan to "finish TDD later" — that's exactly the
scaffold-abandonment failure mode `two-phase-scaffold.test.ts` exists to catch (see Step
6).

## Step 2 — Reconnaissance: does the source's giselle-mui usage still match the target?

If the source imports anything from giselle-mui's own package, don't assume the version it
was built against still matches this repo's current API. A shared package name doesn't
guarantee a shared API surface — a source repo may have pinned an older release, patched a
local fork, or consumed a staging/pre-release build that later diverged from what actually
ships here. Treat every such import as unverified until checked, never as given.

For each such import: find the real export in giselle-mui's own source (`grep` its
`src/*-index.ts` barrels), and diff its prop/API shape against what the source component
actually uses. oss-quality-standards §6 (Component API Contract) governs the shape those
exports should have — extend-not-redeclare, `sx` array-safety, `...other` passthrough — so
a mismatch here usually means the *source* was built against an older or divergent
contract, not that giselle-mui's own current export is wrong. Note: §6 has no explicit rule
for detecting this kind of drift — that gap is exactly what this reconnaissance step exists
to cover; treat any mismatch found here as a blocker to resolve before Step 4, not a
footnote.

Write down, plainly: what already exists correctly, and the short "blockers to fix" list
(import path changes, one or two prop-shape reconciliations) — the same shape as the
`home-components-extraction-plan.md` precedent. If the blockers list is more than a
handful of mechanical edits, that's a signal this port is not "genuinely cheap to move";
reconsider whether `create-giselle-component` is the better path after all.

## Step 3 — Land the files

Use `create-giselle-component`'s folder shape and naming rules (oss-quality-standards §5 +
§7) exactly — `types.ts`, `<name>.tsx`, `<name>.styles.ts`, `<name>.const.ts`,
`<name>.test.ts`, `<name>.styles.test.ts`, `README.md`, `roadmap.md`, `index.ts` — but
populated with the ported implementation directly, not stub templates. Unlike Phase 1,
`<name>.tsx` is present from the first commit — that's the entire point of this skill.

For a multi-component source (sub-components already split into their own files/folders
in the origin repo), carry that split over 1:1 rather than re-flattening and re-splitting —
`create-giselle-component`'s multi-component rule (every named sub-piece gets its own
subfolder from the first commit) already matches what a properly-`cleanup-component`'d
source should look like.

**README provenance note:** oss-quality-standards §8 (Documentation Strategy) has no
explicit rule about noting where ported code came from — this is this skill's own
convention, not an upstream-mandated one (same relationship `create-giselle-component` has
to `cleanup-component`'s own opinions). Add one line to the ported README under "Design
decisions": source repo, source path, and the commit/PR it was ported at — ask the user for
the source repo's name rather than assuming or hardcoding one here, the same way
`create-giselle-component`'s own checklist treats any project-specific tracking doc.

## Step 4 — Precondition check before wiring tests in

Confirm Step 1's guardrail conditions are still true against the files as landed: real
tests, not stubs; structurally already `cleanup-component`-shaped. If landing the files
surfaced something that wasn't visible from the source repo alone (inline `sx`, a missing
`types.ts` split), fix it now as part of the move — same principle
`migrate-giselle-subcomponent` Step 4 uses ("verification, not construction," but real
defects found along the way get fixed, not deferred).

## Step 5 — Make the tests pass, unmodified, against giselle-mui's real runner

Run the ported test file(s) as-is first, expecting failures from import paths alone (the
source's giselle-mui package import needs to become this repo's own internal relative
import, e.g. `GiselleThemeProvider` from
`./components/theming/theme-provider/giselle/giselle` — see `create-giselle-component`'s
test-helper section). Fix only import specifiers, verified the same mechanical way
`migrate-giselle-subcomponent` Step 7 does: `rg` for the old specifier before and after,
zero matches after is the completion criterion, `tsc --noEmit` as a second witness.

oss-quality-standards §10 (Testing) governs what "passing" means here: no
`vi.mock('@mui/material/...')`, `GiselleThemeProvider` not `createTheme()` for anything
touching `theme.vars.*`. If the source's tests already follow this (likely, if Step 1's
`cleanup-component` precondition held), they should need nothing beyond import paths.

**If any test requires an assertion, mock, or setup change beyond import paths to pass:
stop.** That's the guardrail tripping, not a bug to route around. Hand off to
`create-giselle-component` for that component (or that specific sub-component, in a
multi-component feature) instead of forcing a modified test through.

## Step 6 — Graduate via the existing exempt-list mechanism (no gate changes)

`two-phase-scaffold.test.ts` doesn't check whether `<name>.tsx` exists — it checks whether
every `*.test.ts`/`*.test.tsx` under `src/components` contains `it.todo`/`test.todo`,
unless listed in `src/quality-gate/two-phase-scaffold-exempt.json`. A ported component with
real, passing tests already satisfies the gate's actual intent; it just needs to graduate
the same way an in-repo Phase-2-completed component would. Add the new test file path(s) to
`exemptFiles`, with a reason documenting provenance:

```json
"src/components/<layer>/<category>/<name>/<name>.test.ts"
```
with a commit/PR note like: `"reason": "ported from <source repo>'s <SourceComponentName>,
tests carried over with import-path changes only, see PR #NNN"`.

No change to `two-phase-scaffold.test.ts` itself, ever — this only exercises a path the
gate's own documentation already describes ("to graduate a component: add its path to the
exemptFiles array and document the reason").

## Step 7 — Run `cleanup-component` again, in the new home

Even though Step 1 required the source to have already been through `cleanup-component`,
run it again now against the landed component in giselle-mui. The origin repo's pass
checked against oss-quality-standards generally; it did not and could not check giselle-mui's
own layer/category taxonomy, story-title-mirrors-folder-path rule, or component-refactor
conventions (§15) that only apply once something is actually inside this library. Same
principle as `create-giselle-component`'s own "Final pass: cleanup-component" step — this
isn't optional because the source was already clean elsewhere.

## Step 8 — Everything else: `create-giselle-component`'s checklist, unchanged

Complete the rest of `create-giselle-component`'s "After implementation: checklist before
PR" exactly as written — accessibility (§9), no hardcoded colours, `sx` array-safe,
`displayName`, `forwardRef`, Storybook story with title mirroring the folder path,
`docs/component-compliance.md` / `docs/component-inventory.md` rows, the private
migration/porting matrix row if this project maintains one (ask, don't assume). This skill
only changes *how the implementation and tests got written* (Steps 3–6); nothing else about
what "done" means changes.

## Step 9 — Commit and PR

One commit for the port (mirrors the `home-components-extraction-plan.md` precedent's
single-commit shape), citing the source repo/path/commit in the message body:

```
feature(<name>): port from <source repo>'s <SourceComponentName>

Source: <source repo>, <path/to/source-component/>, commit <sha>.
Already cleanup-component'd there; tests carried over with import-path changes only.
```

Same one-component-per-PR rule as `create-giselle-component`.

---

## Where this differs from a plain doc-convention

The extraction-plan-note convention this formalizes already worked without any of this —
Steps 1–2 and 4–5 are the actual addition: a guardrail that's mechanically checked (tests
pass unmodified or the skill refuses) rather than a human remembering to eyeball "is this
really cheap to move," and an explicit reconnaissance step for cross-repo giselle-mui API
drift that the earlier convention's precedent cases (plain-MUI sources) never needed to
think about.
