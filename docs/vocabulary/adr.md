## What it means

**ADR** stands for **architecture decision record**: a short, numbered note that records one decision, meaning its context, the choice and the reason, in one to three sentences. It's written once and never edited; if the decision changes later, a new ADR replaces it.

## In this fork

The [`domain-modeling`](../engineering/domain-modeling.md) skill offers an ADR, and never assumes one, only when a decision passes **all three** tests:
- it's hard to reverse;
- it would be surprising without context;
- it's the result of a real trade-off.

Miss any one and there's no ADR. ADRs live in `docs/adr/` as `0001-slug.md`, `0002-slug.md`, and so on, in the small [ADR format](https://github.com/AlexRebula/skills/blob/main/skills/engineering/domain-modeling/ADR-FORMAT.md).

An ADR is not the glossary. `CONTEXT.md` holds *terms* (what a thing **is**); an ADR holds *one decision*. The full comparison of the two is in [`domain-modeling`'s "Two artifacts, two bars"](../engineering/domain-modeling.md#two-artifacts-two-bars).

## See also

- [Wrap](wrap.md): a session's permanent record. A wrap logs *what happened in a session*; an ADR records *one decision*, whichever sessions it took.
