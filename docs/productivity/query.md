## What it does

`query` answers a question using your personal wiki. It reads the index to decide which pages are actually relevant before opening any of them, reads those pages (following one level of `[[wikilinks]]` when they lead somewhere directly useful), and writes an answer with citations back to the pages it used. Pass `--save` and the answer becomes a new wiki page in its own right, filed and indexed like any other.

It does not read the whole wiki to answer one question. The index is the map; the skill decides where to walk from that map, and tells you which pages it chose and why before it starts reading them.

## When to reach for it

Type `/query <question>`, or say you want the wiki to answer something. Reach for it whenever the answer to a question should already live somewhere in your own notes rather than in the model's general knowledge: a decision you made and wrote down, a comparison you already worked through, a fact you ingested from a source months ago and would otherwise have to dig for by hand.

If the wiki doesn't have enough to answer well, the skill says so and points at which raw sources would close the gap, rather than quietly filling the gap with a plausible-sounding guess.

## The format follows the question

Different questions get different shapes: a factual question gets a direct answer with inline citations, a comparison gets a table, a how-to gets numbered steps, anything more open-ended gets short paragraphs under headings. Every format still ends with citations back to the pages used, either inline as `([[page-name]])` or as a `## Sources` list.

## Saving an answer

`--save` writes the answer as a new page, and the skill picks the location based on what kind of answer it is: a comparison or analysis goes to `wiki/concepts/`, something about a specific project to `wiki/projects/`, about a person to `wiki/people/`, a personal reflection to `wiki/personal/`. The saved page carries the right frontmatter and a `## Query` section noting the original question and date, gets added to `wiki/index.md` under the right section, and gets logged in `wiki/log.md`.

Even without `--save`, the query itself still gets a one-line entry in `wiki/log.md`, so a later `/wiki-lint` or `/query` pass on a related topic can see that the question was already asked.

## Common questions

**What if none of the index pages look relevant?**
The skill says so directly and offers to search `raw/` sources instead, rather than stretching a loosely-related page into an answer.

**Does it read the whole page or skim?**
It reads every page it identified as relevant in full, not a summary of it. The savings come from not opening the pages it decided weren't relevant in the first place.

**Will it invent an answer if the wiki is thin on the topic?**
No. It says what's missing and suggests what to ingest next to actually close the gap, which is more useful than a confident answer built on too little.

## It's working if

- The pages it read are the ones you'd have picked yourself.
- Every claim in the answer traces back to a citation, not to general world knowledge.
- A `--save`d answer reads like a page you'd have written, not a transcript of the question and answer.
- When the wiki comes up short, it tells you what to ingest rather than papering over the gap.

## Where it fits

`query` is the read side of the wiki loop; `ingest` is the write side that fills it, and `wiki-lint` is the maintenance pass that keeps what's already in there trustworthy. A `query` that keeps turning up gaps on the same topic is a signal worth acting on with `ingest`, and a `--save`d answer becomes exactly the kind of page a later `wiki-lint` checks for cross-references and staleness.
