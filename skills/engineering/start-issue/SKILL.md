---
name: start-issue
description: Bootstrap a Claude session from a GitHub issue number. Reads the issue, loads codebase context, checks for blockers, and hands off to /tdd or /grill-me based on the issue's triage label. Use when the user says "start issue #N", "pick up #N", or "work on issue #N".
---

# Start Issue

Load everything needed to begin working on a GitHub issue and hand off to the right skill.

This skill is a **loader, not a doer**. It gathers context and routes — it does not implement anything itself.

## Input

`/start-issue <issue-number> [owner/repo]`

- `<issue-number>` — required. The GitHub issue number to start.
- `[owner/repo]` — optional. Explicit repo override. Defaults to the repo inferred from the current working directory's git remote.

## Process

### 1. Resolve the repo

If no `owner/repo` was provided, run:

```bash
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

If that fails (not inside a git repo, or no remote), ask the user: "Which repo is this issue in? (e.g. `owner/repo`)"

### 2. Fetch the issue

```bash
gh issue view <number> --repo <owner/repo> --json number,title,body,labels,comments,url,state
```

If the issue does not exist or is already closed, tell the user and stop.

### 3. Check for open blockers

Scan the issue body for a `## Blocked by` section. Extract any referenced issue numbers (e.g. `#75`, `owner/repo#75`).

For each referenced blocker, check whether it is open or closed. The target repo depends on
how the reference is written:

- **Bare `#N`** (e.g. `#75`) — use the repo already resolved in Step 1.
- **`owner/repo#N`** (e.g. `other/repo#75`) — extract `other/repo` from the reference and
  use that repo instead.

- If the reference is a bare `#N` (no owner/repo prefix), use the current repo:

  ```bash
  gh issue view <N> --repo <current-owner/repo> --json state,title --jq '.state + " — " + .title'
  ```

- If the reference is `owner/repo#N`, parse the owner and repo from the prefix:

  ```bash
  gh issue view <N> --repo <owner/repo> --json state,title --jq '.state + " — " + .title'
  ```

If **any blocker is still open**, list them clearly and halt:

```
⚠️  Blocked — cannot start yet.

Open blockers:
  - #75 Add npm script wrappers (open)

Resolve these first, or pick a different issue.
```

Do not proceed past this point until all blockers are closed.

### 4. Check for an existing branch or PR

Look for a branch or open PR already linked to this issue.

First, search PR titles and bodies for a reference to the issue number (`issue:` is not a valid GitHub PR search qualifier — search by `#<number>` instead):

```bash
gh pr list --repo <owner/repo> --search "#<number>" --json number,title,headRefName,state
```

Also check for a branch named with the issue number as a prefix (e.g. `75-slug`, `issue-75`):

```bash
git branch -a | grep -E "(^|[[:space:]])[[:alnum:]_/-]*\b<number>[-/]"
```

If a PR already exists, note its number and branch name in the briefing block. If a branch exists but no PR, note the branch name.

### 5. Read the parent issue (if any)

If the issue body contains a `## Parent` section with an issue reference, fetch that parent issue using the same `gh issue view` command and include its title and a one-paragraph summary in the briefing block.

### 6. Scan file hints in the issue body

Read the issue body for mentions of file paths (e.g. `src/lib/md/frontmatter.ts`, `scripts/sync-ideas.ts`). For each path hint:

- Read the file if it exists (or the first 80 lines if large)
- Note its purpose in one sentence

Do not attempt to read files speculatively — only files explicitly mentioned.

### 7. Build the briefing block

Print a structured briefing to the conversation:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ISSUE BRIEF — #<number> <title>
  <url>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LABELS        <label1>, <label2>
PARENT        #<parent-number> <parent-title>  (or "none")
BRANCH / PR   <branch-name>  /  PR #<pr-number> (<state>)  (or "none yet")
BLOCKERS      none  (or listed + confirmed closed)

WHAT TO BUILD
<issue body, trimmed to the "## What to build" section if present,
 otherwise the full body — max 40 lines>

ACCEPTANCE CRITERIA
<"## Acceptance criteria" checklist from issue body, or "not specified">

CODEBASE CONTEXT
<one bullet per file hint read: path → one-sentence summary>

SUGGESTED NEXT SKILL
<see routing table below>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 8. Route and confirm

Read the issue labels and apply the routing table:

| State role        | Suggested skill | Notes                                            |
| ----------------- | --------------- | ------------------------------------------------ |
| `ready-for-agent` | `/tdd`          | Fully specified — proceed regardless of category |
| anything else     | warn + halt     | See below                                        |

**If the issue is not in `ready-for-agent` state**, tell the user:

```
⚠️  Issue is not in ready-for-agent state.
    Run /triage on this issue first, or tell me which skill to invoke.
```

And stop. Do not guess.

**If `ready-for-agent`**, present the suggested skill and ask once:

```
Ready to hand off to /tdd. Proceed? [y/n]
```

On **y**: invoke the skill immediately. Pass the issue title and briefing block as the opening context.

On **n**: stop. Tell the user they can invoke the skill manually when ready.

## Handoff format

When invoking `/tdd`, open with:

```
We're implementing issue #<number>: <title>.

<paste the WHAT TO BUILD and ACCEPTANCE CRITERIA sections>

Key files already loaded:
<list from CODEBASE CONTEXT>
```

When invoking `/grill-me`, open with:

```
Grill me on the design for issue #<number>: <title>.

<paste the WHAT TO BUILD section>

Context already loaded:
<list from CODEBASE CONTEXT>
```
