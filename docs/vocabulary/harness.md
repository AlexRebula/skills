## What it means

The runtime around a model: the loop, the tools, isolation, process supervision, and anything that can advance or block work even if the model does not feel like cooperating. A harness is the thing this pack installs *into* — it is not something this pack ships itself.

## In this fork

Claude Code and Codex are harnesses. So is SwarmForge, in a heavier, more independent sense: see [Skills, flows, and harnesses](../skills-flows-harnesses.md) for the full comparison. A useful test for whether something is a harness rather than a [skill](skill.md) or [flow](flow.md): if the model ignores the markdown, does the next step still happen anyway? If yes — a daemon, a test gate, an approval UI, a worktree supervisor — that's a harness.

## See also

- [Skills, flows, and harnesses](../skills-flows-harnesses.md) — the fuller "four layers" picture this term is one layer of.
- [aihero.dev's harness entry](https://www.aihero.dev/ai-coding-dictionary/harness) — the general, industry-wide definition this page narrows for this fork specifically.
