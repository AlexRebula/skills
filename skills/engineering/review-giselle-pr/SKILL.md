---
name: review-giselle-pr
description: Review an open GitHub PR in a LittleBranches repository against the full oss-quality-standards AGENTS.md ruleset. Pre-loads the public and private AGENTS.md barrels, maps each changed file to the relevant sections, and posts findings via the GitHub PR Reviews API with inline line comments. Use instead of /review-pr when working in giselle-mui, giselle-ui, giselle-sections-sdk, or any other LittleBranches repo.
---

# Review Giselle PR

Same GitHub PR Reviews API workflow as `/review-pr`, with one key difference: standards are **pre-loaded from LittleBranches AGENTS.md** rather than discovered dynamically from the repo.

Use this skill for any LittleBranches repository. Use `/review-pr` for all other repos.

## Arguments

`/review-giselle-pr <N>` — PR number. Required. Ask if omitted.
`/review-giselle-pr <N> <owner>/<repo>` — if the repo cannot be inferred from context.

---

## Process

### 1. Identify the repo

```sh
gh repo view --json nameWithOwner --jq '.nameWithOwner'
```

### 2. Load the standards (always, before reading the diff)

Fetch both AGENTS.md barrels:

```
Public:  https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md
Private: https://raw.githubusercontent.com/LittleBranches/oss-quality-standards-private/main/AGENTS.md
```

If the private barrel is inaccessible (permission error), proceed with the public barrel only and note this in the review body.

### 3. Fetch PR metadata and diff

```sh
gh pr view <N> --repo <owner>/<repo> --json title,body,headRefOid,headRefName,baseRefName
gh pr diff <N> --repo <owner>/<repo>
```

Save `headRefOid` for the Reviews API call.

### 4. Find the spec

Same as `/review-pr` step 3 — look for issue references in the PR body, then docs/, specs/, .scratch/.

### 5. Map changed files to AGENTS.md sections

For each changed file in the diff, apply the section map:

| File pattern | Sections to apply |
|---|---|
| `*.tsx` (component) | §5 Component Structure, §6 API Contract, §9 Accessibility, §10 Testing |
| `*.stories.tsx` | §8.3 Storybook conventions |
| `*.test.ts` / `*.test.tsx` | §10 Testing (all subsections) |
| `*.styles.ts` | §6.2 sx array-safety, §6.4 no hardcoded colours |
| `index.ts` (barrel) | §5.3 Barrel exports, §6.1 Props re-export |
| `types.ts` | §5.4 Naming, §6.1 Props interface |
| `README.md` / `roadmap.md` | §8.1 Three tiers, §8.2 Zero-personal-data |
| `scripts/*` | §3 Quality gate |
| `.github/*` | §4 PR review workflow |
| Any file | §1 AI Collaboration Protocol, §2 Branch Hygiene, §11 DoD, §12 Encryption |

Note: per the AGENTS.md Scope section — §5–§10 apply only to React + MUI repos. §1–§4 and §11 are framework-agnostic.

### 6. Blocking findings — check these first

Flag immediately if any of the following appear in the diff. These are always `blocking`:

| Finding | Rule |
|---|---|
| `dangerouslySetInnerHTML` | §6.11 |
| `vi.mock('@mui/material` | §10.6 + custom test quality rule |
| Props interface inline in `.tsx` (not in `types.ts`) | §5.4 |
| Storybook `title` does not mirror folder path | §8.3 |
| Hardcoded hex or RGB colour | §6.4 |
| `sx` not array-safe (not using spread syntax) | §6.2 |
| `React.FC` | §6.5 |
| Real name, email, or client data in test or story | §8.2 |
| URL prop without `javascript:` scheme validation (input components) | §6.12 |
| Missing `aria-label` on icon-only button | §9.3 |

### 7. Spawn two sub-agents in parallel

**Standards sub-agent prompt — include all of:**
- The full diff text
- The section map for changed files (from step 5)
- The full public AGENTS.md content
- This brief: "You are reviewing a LittleBranches PR for standards compliance. The section map tells you which AGENTS.md sections apply to each file. Check the diff against every applicable section. Label each finding: `blocking` / `non-blocking` / `suggestion`. For blocking findings, state the exact section number. Under 400 words."

**Spec sub-agent prompt** — same as `/review-pr` step 5.

### 8. Aggregate, post, and report

Follow `/review-pr` steps 6–8 exactly — aggregate line-specific vs general findings, post via the GitHub PR Reviews API, report in chat.

One addition to the review body: if the private AGENTS.md was loaded, include a footnote:

```
*Private AGENTS.md (banned content + encryption rules) was included in this review.*
```

If it was not accessible, include:

```
*Private AGENTS.md was not accessible — banned content and encryption rules were not checked.*
```

### 9. Close-out audit (mandatory — do not skip)

Before handing back to the user, scan **every reply posted under Alex's name** in this session (inline thread replies and top-level PR comments). For each reply, check whether it contains any of these commitment signals:

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

**Retrieving comments to scan:**

```sh
# Determine author identity
AUTHOR=$(gh api user --jq '.login')

# All PR review thread comments (paginated)
gh api repos/<owner>/<repo>/pulls/<N>/comments --paginate \
  --jq --arg author "$AUTHOR" '.[] | select(.user.login == $author)'

# All top-level PR issue comments (paginated)
gh api repos/<owner>/<repo>/issues/<N>/comments --paginate \
  --jq --arg author "$AUTHOR" '.[] | select(.user.login == $author)'
```

Pagination is required — without `--paginate`, comments beyond the first page are silently missed.
