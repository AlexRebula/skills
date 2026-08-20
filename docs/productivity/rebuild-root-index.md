## What it does

`rebuild-root-index` regenerates the one file that gives any session awareness of every markdown document across every repo in your workspace, not just the wiki: `$AR_ROOT/index.md`. It discovers every repo under your workspace root by looking for a `.git` folder, treats the wiki repo specially (its own curated `index.md` is reproduced rather than rescanned), and for every other repo, diffs the current file set against a content-hash manifest so only new or changed files actually get read and re-summarized.

It's chained automatically from the last step of `/ingest`, so the common case needs no separate invocation at all. Run it standalone when a doc changes somewhere `/ingest` doesn't reach: a component library's README, a project repo's roadmap.

## When to reach for it

Reach for it directly when you've edited or added documentation outside the wiki and want the root index to reflect it before the next session starts. If you only ever touch docs through `/ingest`, you may never need to run this by hand at all.

## Why the diff matters

The manifest (`$AR_ROOT/.index-manifest.json`) maps every scanned file's relative path to its content hash and the one-line description already written for it. On each run:

- unchanged hash → the existing description is reused, the file is never reopened
- new or changed hash → the file gets read and genuinely re-summarized
- in the manifest but gone from disk → the entry drops

That's what keeps repeated runs cheap. A workspace with hundreds of markdown files across a dozen repos doesn't mean hundreds of files get re-read every time; only the ones that actually moved do.

## First-party versus vendored

Not every markdown file deserves the same depth of summary. Anything you authored, whether `docs/`, a root README or `AGENTS.md`, `cases/`, `incidents/`, or a topic folder, gets read properly and a real synthesized description. Recognizable vendored trees (a bundled design system's docs, a template's own README) get a lighter description: what the package is, not a deep read of its contents. When a repo has more than about thirty files needing summaries in one run, that read-and-summarize work gets delegated to a subagent per repo (or per subfolder for a very large one) so it happens in parallel.

## PII redaction is not optional

Some repos in a workspace can carry real names or sensitive detail that the wiki's own ingest flow would normally redact through role-based placeholders. Before any description string gets written into the index, it's checked against the wiki's `vault.md` for an existing placeholder mapping. If it would otherwise contain PII with no existing mapping, the skill doesn't invent a new placeholder on its own: it writes something generic instead ("personal legal case notes" rather than the specifics) and flags in the run report that a new PII pattern turned up, so you can decide whether it earns a permanent vault entry. `vault.md`'s content itself is never echoed back to you verbatim; it's used only to perform the substitution.

## Common questions

**Does it rescan the wiki repo's files too?**
No. The wiki already has its own curated index, so that section is reproduced from `wiki/wiki/index.md` verbatim (with links rewritten to be relative from `$AR_ROOT`) rather than walked file by file.

**What happens if a new repo gets cloned into the workspace?**
It's picked up automatically on the next run: the repo set is discovered by scanning for `.git` folders each time, never hardcoded.

**Is the manifest safe to delete?**
It's a cache, not a source of truth. Deleting it just means the next run treats every file as new and re-summarizes everything once.

## It's working if

- Running it twice in a row with no changes touches nothing and reads nothing.
- A file's description reads like an actual synthesis of its content, not a restatement of its filename.
- A new repo shows up in the index without you having told the skill it exists.
- Any PII pattern with no vault mapping gets flagged in the report rather than written straight into the index.

## Where it fits

`rebuild-root-index` is the workspace-wide counterpart to what `/ingest` does for the wiki alone: `/ingest` keeps `wiki/index.md` current as sources land, and this skill folds that curated result together with everything else in the workspace into one file any session can read for full context. Run manually, it's the fix for the gap between "I edited a doc" and "a session next week actually knows about it."
