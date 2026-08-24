## What it does

`extract-vocabulary` goes back over a source that has already been ingested into the wiki and pulls out every piece of jargon a complete beginner would stumble on, filing each term into a per-concept vocabulary cheat-sheet written at an ELI5 level. It is not a step inside `ingest`; it is a separate, deliberate pass you choose to run afterward, on the sources where unfamiliar terminology was actually the pain point.

## When to reach for it

Type `/extract-vocabulary <source-page>`, pointing at an existing `wiki/sources/<group>/<slug>.md` page. If the path given is not a real source page, the skill stops and asks for a valid one rather than guessing.

Run it after `ingest`, and only on sources that are genuinely jargon-dense: reaction videos, podcasts, interviews. Skip it for sources with no real jargon density, like personal or legal entries and internal docs, where a glossary pass would just be noise.

## How exhaustive it actually is

The extraction bar is deliberately wide: acronyms no matter how basic they feel to an experienced engineer, tool and library names used as shorthand, general technical vocabulary a true beginner would not already have, and named patterns or techniques used as shorthand. Only the handful of names so ubiquitous that anyone glancingly adjacent to tech already knows them get excluded, along with anything already covered by an existing term file anywhere in the vault. A single jargon-dense video easily surfacing twenty or more terms is the expected result, not a sign to narrow down: a false positive costs a few lines, a false negative is exactly what this skill exists to prevent.

## Where a term lands

Every term defaults to the concept the source itself is primarily about, even when the term is more general-purpose than that concept's core subject. A term only earns its own new concept page when it is substantial and central enough to the source to deserve independent treatment. If a term fits no existing concept and is not a natural fit for the source's own concept either, the skill collects those and asks before creating any new concept page, since this wiki enforces a strict no-orphans rule: every vocabulary term belongs to a concept, full stop.

Before a term file is written, the skill checks the vault-wide barrel for a duplicate. An exact match under the same concept gets a short added note rather than a second file. A match under a different concept gets merged: the existing file picks up a citation to the new source, and the term stays exactly where it already lives rather than moving.

## What gets touched

A full run updates several places at once: the new term file itself, the owning concept page's glossary section and first-mention inline link, the concept's own vocabulary folder index, the vault-wide vocabulary barrel, a link back from the source page, `wiki/index.md` if this is the first vocabulary folder in the wiki, and a line appended to `wiki/log.md`.

## Common questions

**Does it touch the raw source file?**
No, by default. Raw files stay frozen, verbatim records, consistent with how the rest of the wiki treats them. If you specifically want the raw file edited too, say so explicitly.

**What happens to a term with no good concept match?**
It is held back and named explicitly, with a proposed new concept page, and nothing is created until you approve it. If you decline, the term is simply dropped from that run rather than forced into a concept it does not belong to.

**Can the same term end up filed under two different concepts?**
No. If a term already exists under a different concept, the skill merges into the existing file and lists every concept that now uses it, rather than creating a duplicate.

## Where it fits

`extract-vocabulary` is a companion to `ingest`, always run afterward and always by choice, never automatically. It exists specifically for the sources where jargon density, not the underlying idea, was the actual barrier to understanding.
