## What it does

`port-mui-theme-override` turns a draft, not-yet-independent per-component MUI theme override — a placeholder, a hand-copied starting point, or an auto-generated draft that isn't safe to ship because its literal values came from somewhere else — into a real, independently-authored override that reproduces the same visual result without carrying any copied values forward.

It works by triangulating three sources rather than trusting any single one: what the component actually does (functional target), the structural shape MUI's own documentation defines for that component's theme keys, and a live, rendered, computed-style comparison. A value only makes it into the output if it traces back to one of the last two — never to the draft file's own literal source.

## When to reach for it

| Your situation | Where to go |
| --- | --- |
| You have a draft MUI theme override (hand-copied, auto-generated, or ported) that needs independent re-authoring before it can ship | `port-mui-theme-override` |
| You're building a brand-new component from scratch, not porting an override | [create-react-component](./create-react-component.md) or a framework-specific sibling — different problem |
| The component already has an independent, shippable override and you just need to move its file location | `migrate-react-subcomponent` |

## Prerequisites

Access to whatever your project treats as the visual source of truth for the component (a live render, a story, a demo page) for the Step 3 computed-style comparison. If you don't have that access, the skill still works through Steps 1–2, but its own Definition of Done requires you to say so explicitly rather than fabricate a comparison that didn't happen.

## Why three sources, not one

Diffing against a draft file's own values is the fastest way to reproduce whatever copyright or licensing risk that draft carried, even unintentionally — a single-line, trivial-looking default is still a copied value if it came from somewhere you don't have rights to redistribute. Structural shape (what keys and slots exist) and literal values (what those slots actually contain) are separable: MUI's own documentation gives you the former for free, legitimately, for any component. The live computed-style comparison gives you the latter independently, by observing what a browser actually renders rather than reading what a source file says it renders — the two aren't always the same, since MUI resolves many defaults dynamically.

## Framework-agnostic on paths, not on MUI

This skill assumes your project uses MUI's `Components<Theme>` theming API — that's non-negotiable, the whole method is built around it. It assumes nothing else: no fixed folder layout, no fixed naming for your theme config file, no assumption that a prior independently-authored override already exists as a template (Step 4 tells you what to do either way). Fill in every path placeholder for your own project's structure.

## Common questions

**What if I can't access the original visual reference at all?**

Say so explicitly in whatever you report — a PR description, a commit message, wherever this work gets reviewed. Verify as far as Steps 1–2 (functional intent plus MUI's documented shape) allow, and flag the gap rather than presenting a computed-style comparison you didn't actually perform. The Definition of Done treats an honestly-flagged gap as acceptable; a fabricated comparison is not.

**My project doesn't depend on the MUI X package this override targets. What do I do?**

Stop at Step 0 and flag it as a decision point rather than resolving it either way yourself. Shipping an override for a package your project doesn't declare is a real dependency-surface change, not a mechanical one — that's a call for whoever owns the project, not something to decide silently mid-port.

**Can I write this skill to reference my own project's specific paths and prior tickets?**

Not in this skill file. If your skill lives in a shared or public skills repo, keep it generic — parameterize paths, avoid naming internal ticket numbers, and avoid describing your project's specific provenance (e.g. "ported from our internal design system") in terms that could reveal private tooling or licensing arrangements you don't want documented publicly. A project-specific wrapper that calls this generic skill, kept in your own project's private tooling, is the right place for anything that genuinely needs to reference your own setup.

## It's working if

- Every value in the output override traces to a live computed-style comparison or a documented MUI default — never to the draft file's own literal source.
- The co-located test asserts the override's own shape (`defaultProps`/`styleOverrides`/`variants`) directly, not a snapshot of the draft file.
- The draft file is deleted in the same commit as its replacement lands, so no half-migrated state (two copies, one silently dead) survives past a single commit.
- Any MUI X dependency gap found at Step 0 was surfaced as a decision, not resolved unilaterally.

## Where it fits

A focused, one-component-at-a-time porting skill — reach for it once per component, not as a batch operation. It complements [migrate-react-subcomponent](./migrate-react-subcomponent.md) as a different kind of "existing code that isn't where it should be yet" problem: one relocates already-independent code, the other makes not-yet-independent code safe to keep.
