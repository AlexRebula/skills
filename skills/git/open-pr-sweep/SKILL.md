---
name: open-pr-sweep
description: Discover all non-draft open pull requests across one or more GitHub organisations or users. Pure discovery — no writes. Produces a table of open PRs for use in a morning brief or session triage. Run after /repo-status or independently whenever you need to know what PRs need attention.
---

# Open PR Sweep

## Arguments

`/open-pr-sweep` — discovers PRs across repos owned by the authenticated GitHub user. `/open-pr-sweep --orgs <org1>,<org2>` — filters to the specified GitHub organisations or users (comma-separated, e.g. `--orgs LittleBranches,AlexRebula`).

Discover all repos (capped at 200 per owner):

```sh
# Without --orgs: repos for the current authenticated user
gh repo list --limit 200 --json nameWithOwner,isPrivate --jq '.[] | .nameWithOwner'

# With --orgs org1,org2: run for each specified org
# e.g. --orgs LittleBranches,AlexRebula
gh repo list LittleBranches --limit 200 --json nameWithOwner --jq '.[] | .nameWithOwner'
gh repo list AlexRebula --limit 200 --json nameWithOwner --jq '.[] | .nameWithOwner'
```

For each repo returned:

```sh
gh pr list --repo <owner>/<repo> --state open \
  --json number,title,headRefName,reviewDecision,isDraft \
  --jq '.[] | select(.isDraft == false)'
```

Collect all non-draft open PRs. Produce a table:

| #   | Repo | Title | Action needed |
| --- | ---- | ----- | ------------- |
| ... | ...  | ...   | ...           |

_(or "No open PRs.")_
