## What it does

`extract-quotes` pulls the most quotable verbatim lines out of a source and writes them to a per-source quotes page, then rolls each quote into a vault-wide barrel grouped by speaker. It can work from an already-ingested `wiki/sources/<group>/<slug>.md` page, but it doesn't require one: a raw file, a URL, or pasted text with nothing saved yet all work too. A full `/ingest` is not a precondition.

## When to reach for it

Type `/extract-quotes <input> [topic]`. `<input>` is one of: a source page, a raw file with no source page yet, a URL, or pasted text. The optional `[topic]` narrows the pass to a keyword or theme; give it and the skill goes near-exhaustive on that topic while leaving everything else curated. Point it at a source already extracted with a new topic and it appends the new matches (deduped by exact quote text) rather than starting over.

For a URL or pasted text with nothing filed yet, the skill fetches the raw content the same way `/ingest` does (its YouTube fetch flow, or the pasted-text privacy screen), then stops there. It pulls quotes from that raw content; it doesn't go on to build a source page.

## How curatorial it actually is

The default is curatorial, not exhaustive: a two-hour talk should yield roughly 8 to 15 quotes, not eighty. A line earns a spot only if it's self-contained, says something (a claim, a fact, a framing, not filler), and is short, trimmed with `…` where needed but never reworded. Giving a `[topic]` flips that ratio for that slice only: near-exhaustive on the topic, curated everywhere else in the same source.

## Getting the attribution right

The speaker on a quote is whoever actually said it, not the source. For a relayed quote, where the source is retelling someone else's words, that means attributing the original speaker and citing the original event's date and venue, kept separate from the retelling's own date and venue. That original date and venue take real research, not a default to the source's publish date; if they can't be established, the page says so plainly rather than substituting the publish date silently.

## Filed or unfiled

A source page already exists → the quote page is written to `wiki/quotes/<group>/<slug>-quotes.md`, with `<group>` and `<slug>` matching the source page exactly, and linked back from it.

No source page yet → the quote page goes to `wiki/quotes/_unfiled/<slug>-quotes.md` instead, marked `status: unfiled`, with a note in place of the source link explaining that running `/ingest` on the raw file will file it automatically. Nothing about the quotes themselves changes; only where the page lives and whether it's linked from a source.

## What gets touched

A run updates: the quote page itself; `wiki/quotes/quotes-index.md`, the vault-wide barrel grouped by speaker and kept alphabetical, with unfiled entries marked `*(unfiled)*`; the source page's "Related pages" section, when one exists; `wiki/index.md`, only when this is the first quotes page in the wiki (it adds a whole `## Quotes` category); and a line appended to `wiki/log.md`.

## Common questions

**Do I need to run `/ingest` first?**
No. `extract-quotes` reads a raw file, a URL, or pasted text directly. Running `/ingest` first only matters if you want the quote page filed against a real source page from the start, rather than landing in `_unfiled` until later.

**What happens to an unfiled quote page once the source gets ingested?**
Running `/ingest` on that same raw file files it automatically, matching it up by `raw_path`. Nothing needs to be re-run on the quotes side.

**Can I add more quotes to a source I already extracted?**
Yes. Passing a `[topic]` on a source already extracted appends only the new matches for that topic, deduplicated by exact quote text, rather than rebuilding the page.

## It's working if

- The quoted wording matches the source exactly, with only `…` trims, never a rephrase.
- A long, general pass lands around 8 to 15 quotes rather than eighty, unless a `[topic]` argument was deliberately given.
- A relayed quote's byline names the original speaker and the original event, not the retelling's speaker or venue.
- Running it again with a topic adds only the new matches instead of duplicating what's already there.

## Where it fits

`extract-quotes` is a companion to `/ingest`, not a step inside it: it can run standalone before a source page exists, filing into `_unfiled` until `/ingest` catches up and links the two together. It sits alongside `/extract-vocabulary` as a second optional pass over an already-ingested source, that one pulling out unfamiliar jargon where this one pulls out the lines worth quoting.
