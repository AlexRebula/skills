---
name: load-session-guidelines
description: >
  Load all session guidelines in one go: Karpathy coding rules, OSS quality
  standards (public + private), and PR conventions. Run at the start of every
  session before any user task. Designed to be minimal — no full file
  ingestion, only inline rules and access checks.
---

# Load Session Guidelines

Runs three loads in sequence. Keep each step minimal.

## Step 1 — Karpathy guidelines

Run `/karpathy-guidelines`. Confirm rules are active for the session.

## Step 2 — OSS quality standards

Run `/load-oss-standards`. This verifies access to the configured standards repos and carries
the inline rules for the session.

Print the health table. If private is inaccessible, log ⚠️ and continue —
public rules still apply.

## Step 3 — PR conventions (inline, always active)

Apply these rules to all PRs in this session. Do not load any file — these are carried inline.

**PR body template:**

```markdown
## What does this PR do?
<!-- Delete if self-evident from title -->

## Why
<!-- Delete if self-evident from title -->

## Type of change
- [ ] Feature — new section, component, or page
- [ ] Fix — bug fix or regression
- [ ] Chore — tooling, config, dependency update
- [ ] Docs — markdown only
- [ ] Data — data/tasks.json changes only

## Checklist
- [ ] All changes are on a branch — no direct commits to `main`

## Notes for reviewer
<!-- Delete if none -->
```

**Branch naming:**

| Prefix | Use for |
|---|---|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `chore/` | Tooling, config, deps, Dependabot bumps |
| `docs/` | Markdown only |
| `data/` | data/tasks.json changes only |
| `refactor/` | Refactoring |
| `test/` | Tests only |
| `style/` | Style/formatting only |
| `claude/` | AI agent sessions |

Never push directly to `main` — every change goes through a branch and PR.

## Step 4 — Reporting conventions (always active)

Apply this rule to every response in this session without exception:

**Always qualify branch names, PR numbers, and issue numbers with the full `org/repo` name.**

| Wrong | Correct |
|---|---|
| branch `chore/foo` | `myorg/myrepo` branch `chore/foo` |
| PR #42 | `myorg/myrepo` PR #42 |
| issue #7 | `myorg/myrepo` issue #7 |

Never reference a branch, PR, or issue without its `org/repo` qualifier.
The reader must never have to guess which repository is being discussed.

## Step 5 — Skills update policy (always active)

When writing or updating a skill in this session:

**Skills must contain no private or project-specific information.** A skill that references
private repo names, personal org names, internal GIDs, or workspace-specific identifiers
cannot be published to a public skills repo. Every skill must be written so that any user
on any project can adopt it by substituting their own values.

Before committing any skill change, verify:
- [ ] No private org or repo names (replace with `myorg/myrepo` or a configurable placeholder)
- [ ] No personal email addresses, GIDs, or account identifiers
- [ ] Any project-specific paths or commands are marked as **⚙️ Configurable**

## Done

Confirm: "Session guidelines loaded ✓" then proceed with the user's task.
