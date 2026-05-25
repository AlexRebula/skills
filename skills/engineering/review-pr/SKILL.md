---
name: review-pr
description: Review an open GitHub PR on two axes — Standards (does the code follow the repo's own documented conventions?) and Spec (does it match the originating issue/PRD?). Runs both axes as parallel sub-agents and posts findings via the GitHub PR Reviews API with inline line comments. Use when asked to "review pr <N>" or "review pull request <N>".
---

# Review PR

Two-axis review of an open GitHub PR:

- **Standards** — does the code follow the repo's documented coding conventions?
- **Spec** — does the code faithfully implement the originating issue / PRD / spec?

Findings are posted to the PR via the GitHub PR Reviews API with inline line comments — not as a top-level comment.

## Arguments

`/review-pr <N>` — PR number. Required. Ask if omitted.
`/review-pr <N> standards-only` — skip Spec sub-agent (use when there is no spec).
`/review-pr <N> <owner>/<repo>` — if the repo cannot be inferred from context.

---

## Process

### 1. Identify the repo

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

If the user passed `<owner>/<repo>` as an argument, use that instead.

### 2. Fetch PR metadata and diff

```sh
gh pr view <N> --repo <owner>/<repo> --json title,body,headRefOid,headRefName,baseRefName
gh pr diff <N> --repo <owner>/<repo>
```

Save `headRefOid` — the exact commit SHA required for the Reviews API call.

### 3. Find the spec

Look in this order:

1. Issue references in the PR title or body (`Closes #45`, `#123`, `Fixes #67`) — fetch with `gh issue view <issue-N> --repo <owner>/<repo>`
2. A PRD or spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature keyword
3. If nothing found: ask the user. If they confirm there is no spec, skip the Spec sub-agent and note this in the report body.

### 4. Find the standards sources

Scan the repo for any file that documents how code should be written:

- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`
- `CONTEXT.md`, `CONTEXT-MAP.md`
- `docs/adr/` — ADRs are enforced standards
- `.editorconfig`, `eslint.config.*`, `prettier.config.*`, `tsconfig.json` — note them but do not re-check what tooling already enforces

Collect the list of files. The Standards sub-agent reads them all.

**Scope extraction (mandatory):** If any standards file contains an explicit reviewer scope note — e.g. `CLAUDE.md` says "only §1–§4 and §11 apply" or "AI Reviewer Instructions: Scope: ..." — extract that list verbatim. Carry it forward to the sub-agent prompt in step 5. If no scope note is found, the sub-agent checks every section in every standards file.

### 5. Spawn sub-agents in parallel where both axes apply

Send a single message with one or two Agent tool calls (`subagent_type: general-purpose`). Spawn both in parallel unless `standards-only` was requested or no spec was found — in those cases send only the Standards sub-agent.

**Standards sub-agent prompt — include all of:**
- The full diff text
- Standards files: include `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md` in full; for `docs/adr/` pass the file list plus the title and decision line of each ADR (not full content — ADR bodies can be large)
- If a scope was extracted in step 4: "Check **only** these sections: `<section list>`. For each section, state whether you checked it and what you found. Do not check sections outside this list."
- If no scope was extracted: "Check every section in every standards doc provided."
- This brief: "Read the standards docs. Read the diff. Report every place the diff violates a documented standard — per file and line where relevant. Cite the standard (file + section). Label each finding: `blocking` / `non-blocking` / `suggestion`. Distinguish hard violations from judgement calls. Skip anything tooling (Prettier, ESLint, tsc) already enforces. Under 400 words."

**Spec sub-agent prompt — include all of:**
- The full diff text
- The spec content (fetched issue body, PRD, or spec file)
- This brief: "Read the spec. Read the diff. Report: (a) requirements the spec asked for that are missing or partial; (b) behaviour in the diff not asked for (scope creep); (c) requirements that look implemented but where the implementation is wrong. Quote the spec line for each finding. Label each: `blocking` / `non-blocking` / `suggestion`. Under 400 words."

If the spec is missing, skip this sub-agent. Note "No spec found — Spec axis skipped." in the review body.

### 6. Aggregate findings

From both sub-agent reports, extract:

- **Line-specific findings** — file path + line number (right side of diff) + finding text + severity
- **General findings** — no specific line; goes into the review body

Every line-specific finding needs an exact file path as it appears in the diff (e.g. `src/components/button/button.tsx`) and a line number from the **right-hand side** of the unified diff.

### 7. Post via the GitHub PR Reviews API

```sh
COMMIT=$(gh pr view <N> --repo <owner>/<repo> --json headRefOid --jq '.headRefOid')

gh api --method POST /repos/<owner>/<repo>/pulls/<N>/reviews \
  --input - <<'EOF'
{
  "commit_id": "<COMMIT>",
  "event": "COMMENT",
  "body": "<overall verdict + general findings>\n\n---\n*Review by <gh-username> · in collaboration with Claude*",
  "comments": [
    { "path": "<file-path>", "line": <line-number>, "side": "RIGHT", "body": "<finding-text>" }
  ]
}
EOF
```

**Rules:**
- Always `event: "COMMENT"` — never `APPROVE` or `REQUEST_CHANGES` unilaterally
- Line-specific findings → `comments[]` array
- General verdict and findings without a specific line → `body`
- Post even when there are zero findings — submit with empty `comments` array, body = "No findings."
- Every review body must end with: `---\n*Review by <gh-username> · in collaboration with Claude*`

### 8. Report in chat

After posting, summarise:
- Total: N blocking, N non-blocking, N suggestions
- Link to the posted review thread
- Worst single finding (if any)

### 9. Close-out audit (mandatory — do not skip)

Before handing back to the user, scan **every reply posted under the reviewer's name** in this session (inline thread replies and top-level PR comments). For each reply, check whether it contains any of these commitment signals:

- "will" (e.g. "will fix", "will extract", "will update")
- "follow-up" / "follow up"
- "separate issue" / "track" / "open an issue"
- "fix in this PR"

For every reply that contains one of these signals, verify a tracking artifact exists:

| Commitment type | Required artifact |
|---|---|
| "will fix in this PR" | Commit SHA posted as follow-up reply in the same thread |
| "will open an issue" / "separate issue" | GitHub issue opened; issue link posted as follow-up reply |
| "will update the PR description" | PR description updated; confirmation posted as follow-up reply |
| "will extract / follow-up PR" | GitHub issue opened; issue link posted as follow-up reply |

If any artifact is missing — create it before reporting back to the user. This step must be completed even if the session is resuming across a context boundary.
