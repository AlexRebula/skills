## What it means

One user-invoked skill that names all the other skills and when to reach for each, so a human has one thing to remember instead of many. A router can only point at other skills, never fire them itself: naming is all it does.

## In this fork

`/ask-alex` is the router over this whole set: describe a situation, and it names the skill or sequence that fits, plus where the human decisions in that sequence sit. It is not a step inside any [flow](flow.md) — every flow is a destination the router can point you to, not the other way around.

## See also

- [Skills, flows, and harnesses](../skills-flows-harnesses.md) — where the router fits among the other layers.
- [`SKILL-MECHANICS.md`'s "Router skills" section](https://github.com/AlexRebula/skills/blob/main/skills/engineering/writing-for-agents/SKILL-MECHANICS.md#router-skills) — the mechanical reasoning for why router skills exist, for anyone writing a new one.
