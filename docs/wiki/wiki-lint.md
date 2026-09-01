## What it does

`wiki-lint` health-checks your personal wiki: contradictions between pages, orphan pages nothing links to, claims that look stale against a more recent ingest, missing cross-references, and gaps in the index's own structure. It produces a severity-ranked finding list, then two forward-looking lists: fixes to apply now, and sources worth ingesting to close the gaps it found.

`--fix` applies the safe, mechanical fixes automatically (missing wikilinks where the target page already exists, stale `updated:` dates) but still asks before anything structural: creating a stub page, removing or rewriting content, or resolving a contradiction, because those all require a judgment call about which version of the truth to keep.

## When to reach for it

Say "lint the wiki," "health check the wiki," or "what's wrong with the wiki," or invoke `/wiki-lint` directly. Reach for it periodically as general upkeep, or right after you suspect an ingest introduced a claim that contradicts something already in there. The contradiction check exists specifically to catch that before it sits unnoticed for months.

## The index gets checked before the pages do

Before opening a single wiki page, the skill checks `wiki/index.md` itself: does every category and subcategory heading carry the short prose description `SCHEMA.md` requires, and does that description still match what's actually filed underneath it. A missing description is a Medium finding, an index gap rather than misleading content. A description that's gone stale relative to what's actually there is Critical, because the entire point of an index description is letting you skip the pages it summarizes; a wrong one is actively worse than no summary at all.

## What each page gets checked against

Two categories of check, run against every page listed in the index:

- **Structural**: valid frontmatter, not stub-only, has at least one outbound wikilink, is referenced by at least one other page.
- **Content**: not contradicted by another page, not superseded by a more recent source (cross-checked against `wiki/log.md`), mentions concepts/people/projects that themselves have pages, and source citations that actually resolve to files that exist.

## Severity is about consequence, not about size

Findings sort into three tiers by what happens if they're ignored, not by how big the fix is: 🔴 Critical is content that's actively wrong or contradicted, 🟡 Medium is a missing cross-reference or an orphan or an underfilled stub, ⚪ Low is cosmetic, a stale `updated:` field or a missing optional frontmatter value. A one-line fix can still be Critical if leaving it means someone trusts the wrong claim.

## Common questions

**What does `--fix` actually do without asking?**
Only two things: adding a `[[wikilink]]` where the target page genuinely exists, and refreshing `updated:` dates on pages it touched. A broken link with exactly one plausible match in the repo also gets fixed automatically; anything with multiple candidate matches gets surfaced for you to pick.

**Will it ever resolve a contradiction on its own?**
No, not even with `--fix`. It always asks which version to keep, because that's a judgment call about which page is actually right, not a mechanical correction.

**Does it flag something that was just ingested?**
It checks `wiki/log.md` first specifically to avoid re-flagging content that landed via a very recent ingest. The point is catching real staleness, not penalizing something for being new.

## It's working if

- Every Critical finding, if left alone, would actually mislead a future reader or session.
- The suggested-ingests list points at real gaps, not at pages that already exist but weren't read carefully.
- `--fix` leaves every structural change (stub creation, content rewrites, contradiction resolution) for you to decide, every time.
- The log entry it appends lets a later run see this pass happened, instead of re-running the same full scan from nothing.

## Where it fits

`wiki-lint` is the maintenance pass for a wiki that `/ingest` and `/query` are actively writing into and reading from. Ingests add content quickly; this skill is what keeps that content from quietly drifting into contradiction or orphaned isolation. Its suggested-ingests list is a natural handoff back into `/ingest`, and a page it flags as worth saving properly is the same shape of page `/query --save` produces.
