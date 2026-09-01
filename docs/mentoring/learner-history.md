## What it does

`learner-history` builds a factual, source-verified history of a learner's GitHub issue work across an entire org, and hands back a structured table: what was completed, at what quality, evidenced by what. It never writes a file on its own; it is meant to be called by another skill and read straight out of context.

## When to reach for it

Run `/learner-history <github-username>` before `audit-issue` or before picking the next issue for that learner, so whichever skill you are running has a real answer to "what has this person already done, and how well." The skill's own description is explicit that this lookup should not be reimplemented inside those callers; it lives here once.

## How it resolves each issue

For every issue assigned to the learner in the org, the skill works down a fixed hierarchy of evidence and stops at the first source that gives a clear answer: merged PR branches and commits on the default branch, then GitHub PRs whose branch name or body references the issue, then issue comments (closing notes, partial-work records, admin-close explanations), and finally local session files if any exist. A PR that matched and merged gets `full`; one that merged alongside others that did not gets `partial`; a matched but unmerged PR gets `in-progress`. Where no PR gives a clear answer, the skill falls back to reading the issue's own comments for phrases like "closing on your behalf" or "partial completion" before settling on `admin-closed`.

Each issue also carries its sequence and tier labels, so the resulting table doubles as a map of where the learner sits in whatever progression the org uses, not just a list of what got closed.

## The notes-file pass

Beyond the issue table, the skill looks for per-task notes files (`NOTES.md`, `LEARNING*.md`) alongside the task materials, and reports how many exist, how many are actually filled in versus left matching their own prompt text, and whether any have been ingested into a wiki yet. An unfilled section is a concept the learner passed through without articulating it, which is useful signal on its own, and a filled one is raw material: often the first source pages for a learner's own knowledge base.

## Capturing a snapshot, deliberately

This is a conversation-only skill by default and stays that way unless you ask otherwise. A history run has a longer shelf life than the conversation that produced it, so at a real milestone (end of a tier, end of a placement, a pay review) it is worth keeping as a dated snapshot. The skill will only raise this if a wiki is already detected, defaults to no when it asks, and never writes into the wiki tree directly: it writes a raw source file to `raw/learner-history/<date>-<username>-history.md` and tells you to run `ingest` on it, so that process owns the frontmatter, index, and log updates, and the privacy redaction that go with it.

Because this is a history about a real person, often a junior one, the skill is explicit about what never gets written: no pay figures, no performance judgements, no personal circumstances. Only completion type and evidence source. If the wiki has a placeholder vault for real names, that placeholder is used in place of the learner's own name, and if the learner is a minor, or the wiki is shared beyond the mentor, the skill asks explicitly rather than relying on the default snapshot prompt.

## Common questions

**Does it ever write to a file by itself?**
Only the optional dated snapshot, and only after you say yes. Every other run is conversation-only.

**What if the learner has more than 100 issues?**
The skill pages through with `--limit` and `--skip` until it has exhausted the search.

**What if there's no git remote to resolve the org from?**
It asks you directly for the org name instead of guessing.

## Where it fits

`learner-history` is a lookup skill meant to be called from `audit-issue` or a next-issue-selection flow, and its snapshot output is meant to be picked up by `ingest` rather than filed directly.
