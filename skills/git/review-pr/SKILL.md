---
name: review-pr
description: Review an open PR or a branch diff (before a PR exists) on two axes — Standards and Spec. In PR mode, posts findings via the GitHub PR Reviews API with inline line comments. In branch mode (--branch), reports findings in chat only — use this to pre-flight a diff before opening a PR. Accepts --standards-url to pre-load org-level or team standards from any raw URL. Replaces review-giselle-pr — pass --standards-url with your org's AGENTS.md URL for the same pre-loaded standards experience. Use when asked to "review pr N", "review branch X before opening a PR", or "pre-flight this diff".
---

# Review PR

Two-axis review:

- **Standards** — does the code follow the repo's documented conventions?
- **Spec** — does the code implement what the originating issue / PRD asked for?

Works in two modes:

- **PR mode** (default): reviews an open PR and posts findings via the GitHub PR Reviews API.
- **Branch mode** (`--branch`): reviews a branch diff before a PR exists; reports findings in chat only. Use this to catch issues before opening a PR.

## Arguments

`/review-pr <N>` — PR number. Reviews the open PR.
`/review-pr --branch <name>` — branch name. Pre-PR review; no PR number required.
`/review-pr <N> standards-only` — skip Spec sub-agent (use when there is no spec).
`/review-pr <N> <owner>/<repo>` — if the repo cannot be inferred from context.
`/review-pr <N> --standards-url <url>` — pre-load additional standards from the given raw URL (e.g. your org's public AGENTS.md). Combined with repo-local standards, not a replacement.

---

## Process

### 1. Determine mode and fetch the diff

**PR mode** — a PR number was passed:

```sh
gh pr view <N> --repo <owner>/<repo> --json title,body,headRefOid,headRefName,baseRefName
gh pr diff <N> --repo <owner>/<repo>
```

Save `headRefOid` — required for the Reviews API call.

**Branch mode** — `--branch <name>` was passed:

```sh
DEFAULT_BRANCH=$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || echo 'main')
git diff ${DEFAULT_BRANCH}...<branch-name>
git log ${DEFAULT_BRANCH}..<branch-name> --oneline
```

If neither a PR number nor `--branch` was given, ask which the user wants before continuing.

---

### 2. Load standards

#### Repo standards (always)

Scan the repo for files that document how code should be written:

- `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`
- `CONTEXT.md`, `CONTEXT-MAP.md`
- `docs/adr/` — pass the file list + title and decision line of each ADR (not full bodies — ADR bodies can be large)
- `.editorconfig`, `eslint.config.*`, `prettier.config.*`, `tsconfig.json` — note them but do not re-check what tooling already enforces

**Scope extraction (mandatory):** If any standards file contains an explicit reviewer scope note — e.g. `CLAUDE.md` says "AI Reviewer Scope: §1–§4 only" — extract the list verbatim. Carry it into the sub-agent prompt. If no scope note is found, the sub-agent checks every section.

#### Org / external standards (optional)

If `--standards-url <url>` was passed, fetch the document:

```sh
curl -sS "<url>"
```

If it returns content: append to the standards context (do not replace repo standards).
If it fails with a non-200 status: note the failure in the review body, continue with repo standards only.

For a private org standards file, use the authenticated API if the caller knows the repo slug:

```sh
gh api repos/<org>/<private-repo>/contents/<path> --jq '.content | @base64d'
```

If `gh` returns a permission error: note "Private standards not accessible" in the review body.

---

### 3. Blocking patterns — check before sub-agents

Scan the diff for any of the patterns below. These are always `blocking`, regardless of what repo standards say:

| Pattern | Reason |
| --- | --- |
| `dangerouslySetInnerHTML` | XSS risk |
| URL prop with no `javascript:` scheme check on interactive/input components | XSS risk |
| Real name, email, or personal data in test or story fixtures | Privacy |
| IBAN, account number, or financial identifier in plain text | Sensitive data |
| Hardcoded secret, token, API key, or password | Security |
| Missing `aria-label` on icon-only interactive element | Accessibility |
| `console.log` / `console.error` / `console.warn` left in non-test production code | Debug artifact |

Flag these immediately before the sub-agents run. Do not wait for sub-agent output to report them.

---

### 4. Find the spec

Look in this order:

1. Issue references in the PR title or body (PR mode), or in commit messages (branch mode) — `Closes #45`, `#123`, `Fixes #67` — fetch with `gh issue view <N> --repo <owner>/<repo>`
2. A PRD or spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature keyword
3. If nothing found: ask the user. If they confirm there is no spec, skip the Spec sub-agent and note "No spec — Spec axis skipped" in the report.

---

### 5. Spawn sub-agents in parallel

Send a single message with one or two `Agent` tool calls. Spawn both in parallel unless `standards-only` was requested or no spec was found.

**Standards sub-agent prompt — include all of:**

- The full diff text
- All standards content (repo docs + org URL content if loaded)
- Scope restriction if extracted in step 2
- This brief: "Read the standards docs. Read the diff. Report every place the diff violates a documented standard — per file and line where relevant. Cite the standard (file + section). Label each finding: `blocking` / `non-blocking` / `suggestion`. Distinguish hard violations from judgement calls. Skip anything tooling (Prettier, ESLint, tsc) already enforces. Under 400 words."

**Spec sub-agent prompt — include all of:**

- The full diff text
- The spec content (fetched issue body, PRD, or spec file)
- This brief: "Read the spec. Read the diff. Report: (a) requirements the spec asked for that are missing or partial; (b) behaviour in the diff not asked for (scope creep); (c) requirements that look implemented but where the implementation is wrong. Quote the spec line for each finding. Label each: `blocking` / `non-blocking` / `suggestion`. Under 400 words."

---

### 6. Aggregate findings

From both sub-agent reports, extract:

- **Line-specific findings** — file path (as it appears in the diff) + right-side line number + finding + severity
- **General findings** — no specific line; goes into the review body

---

### 7. Output findings

**PR mode — post via the GitHub PR Reviews API:**

```sh
COMMIT=$(gh pr view <N> --repo <owner>/<repo> --json headRefOid --jq '.headRefOid')

gh api --method POST /repos/<owner>/<repo>/pulls/<N>/reviews \
  --input - <<'EOF'
{
  "commit_id": "<COMMIT>",
  "event": "COMMENT",
  "body": "<overall verdict + general findings>\n\n---\n*Review · in collaboration with Claude*",
  "comments": [
    { "path": "<file-path>", "line": <line-number>, "side": "RIGHT", "body": "<finding-text>" }
  ]
}
EOF
```

Rules:
- Always `event: "COMMENT"` — never `APPROVE` or `REQUEST_CHANGES` unilaterally
- Line-specific findings → `comments[]` array
- General verdict and findings without a line → `body`
- Post even with zero findings — body: "No findings."
- Every review body must end with: `---\n*Review · in collaboration with Claude*`

**Branch mode — report in chat only:**

Group findings by severity. Print a table:

```
| File | Line | Severity | Finding |
| ---- | ---- | -------- | ------- |
```

End with: "Fix blocking findings before opening the PR."

No Reviews API call is made in branch mode.

---

### 8. Report in chat

After posting (PR mode) or printing (branch mode):

- Total: N blocking, N non-blocking, N suggestions
- Link to posted review (PR mode) or inline summary (branch mode)
- Worst single finding (if any)

---

### 9. Close-out audit (PR mode only — skip in branch mode)

Before handing back to the user, scan **every reply posted under your account** in this session (inline thread replies, top-level PR comments, and PR review bodies). Collect all replies and check each for commitment signals:

- "will" (e.g. "will fix", "will extract", "will update")
- "follow-up" / "follow up"
- "separate issue" / "track" / "open an issue"
- "fix in this PR"

For every reply that contains one of these signals, verify a tracking artifact exists:

| Commitment type | Required artifact |
| --- | --- |
| "will fix in this PR" | Commit SHA posted as follow-up reply in the same thread |
| "will open an issue" / "separate issue" | GitHub issue opened; issue link posted as follow-up reply |
| "will update the PR description" | PR description updated; confirmation posted as follow-up reply |
| "will extract / follow-up PR" | GitHub issue opened; issue link posted as follow-up reply |

If any artifact is missing — create it before reporting back to the user. This step must be completed even if the session is resuming across a context boundary.
