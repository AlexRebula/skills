---
name: query-issues
description: Query GitHub issues for a given repo filtered by one or more labels (AND logic — an issue must carry every listed label) and return a formatted list in chat. Pure discovery — no writes. Run at session start to find pending cross-repo work directed at the current repo (e.g. /query-issues AlexRebula/skills handover), or whenever you need to know which issues carry a given label combination.
---

# Query Issues

## Arguments

`/query-issues <owner>/<repo> <label>[,<label>...] [--state open|closed|all]`

- `<owner>/<repo>` — **required**, the repository to query.
- `<label>[,<label>...]` — **required**, one or more labels, comma-separated. **AND logic**: an issue must carry **all** listed labels to match.
- `--state open|closed|all` — optional, defaults to `open`.

If the repo or the labels are missing, ask for them — do not guess.

## Fetch matching issues

**Preferred — `gh` CLI** (when available in the session):

```sh
gh issue list --repo <owner>/<repo> --state <state> \
  --label "<label1>" --label "<label2>" \
  --json number,title,labels,createdAt,url --limit 100
```

Repeating `--label` already applies AND logic. For `--state all`, pass `--state all`.

**Fallback — GitHub MCP tools** (remote container sessions where `gh` is not installed):

- Use `search_issues` with the query `repo:<owner>/<repo> is:issue label:"<label1>" label:"<label2>"` plus `state:open` or `state:closed` (omit the state qualifier for `all`). Multiple `label:` qualifiers are ANDed by GitHub search.
- Or use `list_issues` with its labels filter and the requested state.

**Always re-verify AND logic client-side**: discard any returned issue that does not carry every requested label. Some list endpoints OR their label filters — never trust the filter alone.

## Output

Print the result in chat — no file writes:

```
Issues in <owner>/<repo> matching [<label1>, <label2>] (<state>):

#<number> · <title>
  Labels: <all labels on the issue, comma-separated>
  Opened: <YYYY-MM-DD>
  <issue URL>

(<N> issues found)
```

List issues newest first. Use the singular `(1 issue found)` when there is exactly one match.

**Zero matches is a success, not an error.** Print:

```
Issues in <owner>/<repo> matching [<label1>, <label2>] (<state>):

No issues found — nothing pending for this label combination.
```

**Real errors** (repo not found, no access, API failure) must be reported as errors — state which call failed and why. Never present an error as "no issues found", and never present zero matches as an error.
