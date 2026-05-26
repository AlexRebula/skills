---
name: open-pr-sweep
description: Discover all non-draft open pull requests across LittleBranches and AlexRebula GitHub organisations. Pure discovery — no writes. Produces a table of open PRs for use in a morning brief or session triage. Run after /repo-status or independently whenever you need to know what PRs need attention.
---

# Open PR Sweep

Discover all repos:

```sh
gh repo list --limit 50 --json nameWithOwner,isPrivate \
  --jq '.[] | select(.nameWithOwner | test("LittleBranches|AlexRebula"; "i")) | .nameWithOwner'
```

For each repo returned:
```sh
gh pr list --repo <owner>/<repo> --state open \
  --json number,title,headRefName,reviewDecision,isDraft \
  --jq '.[] | select(.isDraft == false)'
```

Collect all non-draft open PRs. Produce a table:

| # | Repo | Title | Action needed |
|---|---|---|---|
| ... | ... | ... | ... |

*(or "No open PRs.")*
