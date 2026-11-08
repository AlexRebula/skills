---
'alexrebula-skills': patch
---

Every skill that runs a quality gate now runs the repo's smart gate (the affected-only one, for example `npm run check:verify:smart`) when it has one, and runs the full gate only when the owner asks. The session guidelines gain a Step 8 that states the rule for every agent in every repo. `create-pr`, `implement`, `cleanup-component`, `canary-publish` and `dependabot-sweep` follow it.
