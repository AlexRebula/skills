---
'alexrebula-skills': patch
---

Three skill fixes found in real use. `pr-merged` now gates its cleanup on the PR state with a command that stops, since `gh pr view` exits 0 for an open PR too and a chained cleanup ran anyway. `link-pr-to-issue` recognises `feat/` branches as well as `feature/`. `canary-publish` exports `NODE_AUTH_TOKEN` before the first npm command and explains that a 401 from `npm ci`, `npm install`, `npm view` or `npm pack` usually means that variable is unset, not that the token expired.
