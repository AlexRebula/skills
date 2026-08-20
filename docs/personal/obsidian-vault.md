## What it does

`obsidian-vault` finds, creates, and organises notes in an Obsidian vault, following the conventions that vault already uses: `[[wikilinks]]` for connecting notes, index notes that are little more than a list of links to a topic's members, and a flat folder layout where structure comes from links rather than directories.

It does not invent a new note-taking system. It reads the vault's existing rules (title-case filenames, no folders for organisation, index notes named things like "Skills Index") and works inside them, so a note it creates looks like one you wrote by hand.

## When to reach for it

Ask to find, create, or organise notes in Obsidian, or point at a topic you want captured or connected.

| Your situation | What happens |
| --- | --- |
| You want to find a note by name or by content | Filename search or content grep across the vault |
| You have something worth writing down as a new note | Title-case filename, one unit of learning, wikilinks to related notes at the bottom |
| You want to know what links to a given note | Backlink search for `[[Note Title]]` across the vault |
| You want the index notes for a topic | Search for files with "Index" in the name |

## Conventions it follows

**Naming.** Every note filename is Title Case. Index notes aggregate a topic ("Skills Index", "RAG Index") and are themselves just a list of `[[wikilinks]]`, nothing more.

**Linking, not folders.** The vault stays mostly flat. Instead of a folder per topic, notes link to what they depend on or relate to, usually at the bottom of the note, and an index note collects the links for a topic in one place. Finding what connects to a note is a backlink search, not a directory listing.

**One note, one idea.** A new note is written as a single unit of learning rather than a catch-all page that accumulates unrelated points over time. Where a sequence of notes builds on each other, a hierarchical numbering scheme keeps the order visible in the filenames themselves.

## Common questions

**Why no folders?**
Folders force a single hierarchy on ideas that usually belong to more than one topic at once. A note on caching can sit under "performance" and "databases" simultaneously if it's linked from both index notes; it could only live in one folder.

**How does it decide a new note is warranted instead of appending to an existing one?**
By the one-note-one-idea rule. If what you want to capture doesn't fit as a coherent unit alongside what's already in a note, it's a new note with a link back, not an addition that dilutes the original.

**What if I don't know whether a note already exists?**
That's what the search step is for, by filename or by content, before anything new gets created. Reusing or linking to an existing note beats creating a near-duplicate under a slightly different title.

## It's working if

- A new note's filename is Title Case and it links to at least the notes it clearly depends on.
- An index note stays a plain list of links, not a place where actual content accumulates.
- A backlink search for a note's title turns up everything that references it.
- The vault stays flat: no new folder appeared to solve an organisation problem links could have solved.

## Where it fits

`obsidian-vault` is a standalone note-management skill scoped to one vault and its conventions. It has no dependency on any other skill here and nothing hands off to it or from it; it's reached for directly whenever the task is finding, writing, or connecting notes.
