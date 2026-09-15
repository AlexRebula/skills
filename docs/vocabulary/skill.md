## What it means

One packaged procedure: a `SKILL.md`, plus whatever optional scripts or reference files it ships with. It teaches the agent *how* to do one task, and either loads automatically when the task fits (model-invoked) or waits for a human to type its name (user-invoked).

## In this fork

`/tdd`, `/diagnosing-bugs`, and `/create-pr` are all skills in this sense: each is a single folder under `skills/<category>/`, with a `SKILL.md` at its root. A skill is the smallest unit in this pack — it does not call other skills the way a [flow](flow.md) does, beyond the user-invoked/model-invoked calling rules described in [Skills, flows, and harnesses](../skills-flows-harnesses.md).

## See also

- [Skills, flows, and harnesses](../skills-flows-harnesses.md) — the fuller "four layers" picture this term is one layer of.
