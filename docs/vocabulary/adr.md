## What it means

**ADR** stands for **architecture decision record**: a short, numbered note that records one decision and *why* it was made, meaning the situation at the time, the choice, and what follows from it. It's written once and never edited. If the decision changes later, a new ADR replaces it and says so, and the old one stays as history. Code and git history show *what* changed; an ADR is where the *why* survives after everyone has forgotten the conversation.

## In this fork

The [`domain-modeling`](../engineering/domain-modeling.md) skill offers to write an ADR when a decision is hard to reverse, isn't obvious from the code, or would otherwise need re-explaining to every future reader. Its [ADR format](https://github.com/AlexRebula/skills/blob/main/skills/engineering/domain-modeling/ADR-FORMAT.md) keeps them small:
- They live in `docs/adr/` at the project root, numbered `0001-slug.md`, `0002-slug.md`, and so on.
- The folder is created only when the first ADR is needed.
- A single paragraph is enough. Status, Considered Options and Consequences sections are optional, and are only added when they earn their place.

## See also

- [Wrap](wrap.md): a session's permanent record. A wrap logs *what happened in a session*; an ADR records *one decision*, whichever sessions it took.
- [`domain-modeling`](../engineering/domain-modeling.md): the skill that writes both `CONTEXT.md`, the project's glossary of domain terms, and its ADRs.
