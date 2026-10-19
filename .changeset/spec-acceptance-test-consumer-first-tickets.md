---
'alexrebula-skills': patch
---

`to-spec` now requires an `## Acceptance Test`: the real consumer file and the exact code it must be writable as. Its process has a step to pin that with the user before the spec is written, and it refuses to publish a spec whose acceptance test is missing or empty (or says explicitly that there is no known consumer). `to-tickets` now orders the consumer first: the first ticket must make the consumer's code work against the new API, even crudely. It also bans placeholder visual criteria ("simple demo blocks") for UI work, and adds a question to the quiz: does the first ticket prove the Acceptance Test against the real consumer? Every gate used to check the work against the spec and none checked the spec against the intent.
