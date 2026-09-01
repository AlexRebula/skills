## What it does

`audit-issue` checks a GitHub issue body against a set of principles before it goes anywhere near a student, apprentice, or junior contributor. You paste the issue body and your principles (structured or free-form), and the skill scans the body against every principle, flags each failure with the exact offending text, drafts a replacement, and stops. Nothing touches GitHub. You get a corrected issue body to paste in yourself once you approve it.

## When to reach for it

Invoke it with `/audit-issue`, pasting the issue body and your principles inline. There is no `gh` CLI dependency and no file path requirement: everything the skill needs comes from what you paste into the conversation.

Reach for it before assigning any issue to someone who is still learning the codebase or the team's conventions, particularly one you wrote in a hurry. It catches the class of mistake that is obvious once named but easy to miss while drafting: a file path the assignee cannot reach, a deliverable count left implicit, a payment figure that does not match what the tracker says.

## Principles, structured or not

Principles work best written down with a name, a one-sentence rule, and a checklist of concrete things to look for in the issue body. A starter template for exactly this shape sits at the bottom of the skill file, ready to copy into `<student-name>-issue-principles.md`.

Free-form prose works too. The skill extracts the implied rules before auditing, but structured principles produce a more reliable audit, because each checklist item is something the skill can actually go looking for rather than something it has to infer.

The report itself follows a fixed shape: a pass/fail line per principle, a verdict, and then a draft fix for every failure, shown as current text next to proposed text. You choose yes, no, or edit first, and edit-first walks through each fix one at a time rather than dumping them all at once.

## Sharpening it with learner history

Run `/learner-history <github-username>` first if you want the audit to include a progression check: is this issue pitched at the right level for where this learner actually is? That skill returns a table of concepts already encountered and at what quality, and `audit-issue` reads it from context to add a progression verdict rather than re-implementing the lookup itself.

## Closing the loop

An audit that only fixes the issue in front of you gets run again next month on the same mistake. When a failed check was a genuinely blocking one, not a cosmetic note, the skill can help you turn it into a standing principle: name the rule so it applies to the next issue rather than this one, check it is not already covered by an existing principle, and draft both the principle and the incident record that shows why it matters. The incident is delegated to `log-incident` rather than written here, since that skill already owns the format, the approval step, and the index update.

## Common questions

**Does it ever edit the issue on GitHub directly?**
No. It only ever produces text for you to paste. Every apply decision is yours.

**What if I only have loose notes instead of a principles file?**
Paste them as-is. The skill will do its best to extract the rules, though a structured file with explicit checklists gets you a more reliable audit.

**Can it also check a linked guide file, like a STEPS.md?**
Yes, as an optional second phase, after the issue body itself is audited: workspace scope, hardcoded specifics that should be generic, terminal-only steps missing a GUI alternative, and irreversible actions that skip a confirmation.

**Does it need to know anything about a specific project ahead of time?**
No. It is self-contained: you supply the issue and the principles, and everything else the skill needs is documented in the skill itself.

## Where it fits

`audit-issue` sits right before you hand off work, and it pairs naturally with `learner-history` for the progression check and `log-incident` for turning a caught mistake into a durable rule. If you also want the next candidate issue fetched and pre-filled automatically rather than pasted by hand, that is a `next-issue`-style wrapper layered on top, not something this skill does itself.
