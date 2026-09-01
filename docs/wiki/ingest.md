## What it does

`ingest` takes a raw source file (an article, a YouTube transcript, a gist, a podcast, a paper) and turns it into a proper wiki entry: it reads the source, pulls out metadata, writes a synthesis page under `wiki/sources/`, updates any wiki pages the source genuinely informs, and updates both `wiki/index.md` and `wiki/log.md` to reflect the addition. Pass `--deep` and it also writes a long-form deep dive at `wiki/deep/<slug>-deep.md` once the short source page is done.

## When to reach for it

Run `/ingest <path>` on a raw source file, or `/ingest <youtube-url>` and the skill will fetch the transcript itself (CLI-first, browser as fallback) before continuing into the normal flow. Ask for a path if none is given; the skill will not guess at what you meant to ingest.

It will refuse certain paths outright rather than ingest them: files under `tasks/` are structured task-manager records, not knowledge sources; files already under `wiki/` are already synthesized content, so re-ingesting them would create a source page about a wiki page; and files under `morning-briefs/` or `sessions/` are session artifacts, not things worth treating as sources.

## The privacy screen

Before anything is written, the skill scans the source for personally identifiable information belonging to private individuals: full names, contact details, ID or document numbers, financial specifics tied to a named person, sensitive personal content. The user's own data is replaced with `{{VAULT_KEY}}`-style placeholders that resolve against a gitignored secrets file. Third parties get a consistent role label instead of their name (`family-member`, `legal-contact`, `colleague`) used everywhere that person is referenced, including in their own person-page filename. Sensitive numbers get a plain descriptive placeholder like `[CASE REF]` rather than a resolvable variable. Raw source files themselves may keep the verbatim original as the archival record, but their file and folder names still follow the same privacy rule. Where the PII is significant, the skill tells you before writing anything and waits for confirmation; minor incidental mentions get handled silently and just noted in the final report.

## Slugs never carry a private name

The generated slug becomes a file name that ends up in git history, PR diffs, and commit messages, so it can never contain a private individual's real name, even when the source itself does. A topic- or role-based slug replaces it: `document-type-2026` rather than `firstname-surname-topic`. Public figures, meaning authors, researchers, and public business owners, are the exception and may appear in slugs as themselves.

## Before writing, a conversation

The skill presents a short summary and five to seven candidate takeaways and asks whether that looks right before writing a single file. It also checks whether a source page already exists for this exact raw file and, if so, asks whether you want to update it (merge new takeaways in) or fully replace it, rather than silently creating a duplicate.

## Keeping dated claims honest

Whenever a concept page is created or substantially updated from a source whose publish date is more than a few months old, the skill adds a source-vintage callout to that page, judging honestly whether the framing has likely aged (a fast-moving tooling landscape) or held up (a philosophy or topology debate). This applies even to sources that "feel current"; that feeling is exactly what the callout exists to check.

## Common questions

**What if the source references other things worth ingesting?**
The final report names them as suggested next ingests, rather than pulling them in automatically.

**Can I run it on something already ingested?**
Yes. The skill detects the existing source page by its `raw_path` and asks whether you want to update or replace it, rather than creating a second page for the same file.

**Does `--deep` replace the short source page?**
No, it is written in addition, as a long-form companion once the short page already exists, working through each major topic in depth and closing with a set of open questions.

## Where it fits

`ingest` is the entry point for turning any raw source into wiki content, and `extract-vocabulary` runs afterward, by choice, on the subset of sources where jargon density was the real obstacle. `learner-history` also writes a raw file meant to be picked up by `ingest` rather than placing itself directly into the wiki tree.
