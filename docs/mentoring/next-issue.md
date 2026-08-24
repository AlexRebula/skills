## What it does

`next-issue` picks the next GitHub issue to hand a student or apprentice, and audits it before it reaches them. It resolves the repo, the student, and a principles file; checks the candidate against a learner history so it doesn't repeat a concept or jump too many difficulty steps at once; then runs the issue body against a principles index and drafts fixes for anything that fails. Nothing touches GitHub until you approve the draft.

It doesn't reach for itself. You invoke it by name, because deciding what a specific learner is ready for next is a judgment call, not something that should fire automatically off a keyword.

## When to reach for it

Type `/next-issue`, optionally with a current issue number, `--repo`, `--student`, or `--principles`. Everything you don't pass gets resolved: the repo from your git remote, the student from whoever is assigned to the current issue, the principles file by searching the wiki for one matching the student or repo.

Reach for it whenever you're about to hand a learner their next piece of work and want a second pair of eyes on both the sequencing (is this actually next, does it introduce too much at once) and the wording (does the issue body meet the standard your principles index sets).

## Sequencing before wording

Before the audit even starts, the skill builds a learner history: every issue the student has completed, partially completed, or left open, with sequence labels and completion quality. That history feeds two checks on the candidate:

- **Progression**: does the candidate require a concept the learner hasn't seen in a prior issue?
- **Difficulty ceiling**: how many genuinely new concepts does it introduce? More than two gets flagged.

A failed check doesn't make the skill silently reach for a different issue. It surfaces the flag and leaves the choice with you, because sometimes the next issue by number really is the right one to assign despite the flag.

## The audit

With sequencing settled, the skill loads your principles index (P1, P2, P3, however you've numbered them) and checks the issue body against each one, citing the exact line or section that fails. Where it finds a problem, it drafts a replacement, shown as current text next to proposed text, all at once, before anything is applied.

You get three options: apply everything, apply nothing, or step through each fix one at a time. Only after you say yes does anything land on GitHub via `gh issue edit`.

## Two things worth checking before handing the issue over

If the project keeps a per-task folder with steps, a quiz, or notes, verify two things that don't show up as a failure until much later:

- **A notes file**, if the setup expects one per task. A habit that skips three tasks running has already ended, and by the time it's noticed the pattern is well established.
- **A Definition of Done derived from a comparable merged PR**, not from the task description alone. Diffing a recently-merged change of the same kind (`gh pr diff <PR> --name-only`) routinely turns up documentation the description never mentioned: index tables, a component's own README, a roadmap file. A DoD written only from the description misses exactly those items, and the learner ends up marked complete on work that's half done.

## Adding a new student

Create a principles index at `wiki/sources/<repo-name>/<student-name>-issue-principles.md`, following the starter template from `audit-issue`. The skill discovers it automatically from then on; no other setup is required per student.

## Common questions

**What if there's no principles file yet?**
The audit step is skipped and the output says so plainly. Sequencing and the progression/difficulty checks still run; those don't depend on a principles index.

**Does it ever skip past a flagged issue to the next one?**
No. It always presents the lowest-numbered candidate and its flags together, and leaves the call to you.

**Where does a real finding from the audit go?**
Into a principle, ideally, not just into this one issue's fix. See `audit-issue`'s notes on closing the loop: naming the rule so it generalises, and encoding it so the next issue author inherits it rather than having to remember it.

## Where it fits

`next-issue` is the GitHub-integrated wrapper around the public `audit-issue` pattern: the audit logic, output format, and starter template all live there. This skill adds automatic issue fetching, principles discovery from the wiki, and learner-aware candidate selection on top. When a finding is worth generalising, or the result needs filing to a wiki, those handoffs follow the same shared contract the rest of this set uses: write a raw source, then hand off rather than writing into the wiki tree directly.
