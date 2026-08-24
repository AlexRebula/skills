---
name: load-session-guidelines
description: >
  Load all session guidelines in one go: Karpathy coding rules, OSS quality
  standards (public + private), PR conventions, and the commit/push approval
  gate. Run at the start of every session before any user task. Designed to
  be minimal: no full file ingestion, only inline rules and access checks.
disable-model-invocation: true
---

# Load Session Guidelines

Runs seven steps in sequence. Keep each step minimal.

## Step 1: Karpathy guidelines

Run `/karpathy-guidelines`. Confirm rules are active for the session.

## Step 2: OSS quality standards

Run `/load-oss-standards`. This verifies access to the configured standards repos and carries
the inline rules for the session.

Print the health table. If private is inaccessible, log ⚠️ and continue.
Public rules still apply.

## Step 3: PR conventions (inline, always active)

Apply these rules to all PRs in this session. Do not load any file: these are carried inline.

**PR body template:**

```markdown
## What does this PR do?
<!-- Delete if self-evident from title -->

## Why
<!-- Delete if self-evident from title -->

## Type of change
- [ ] Feature: new section, component, or page
- [ ] Fix: bug fix or regression
- [ ] Chore: tooling, config, dependency update
- [ ] Docs: markdown only
- [ ] Data: data/tasks.json changes only

## Checklist
- [ ] All changes are on a branch: no direct commits to `main`

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

Never push directly to `main`: every change goes through a branch and PR.

## Step 4: Commit and push approval (always active)

Before running any `git commit`, `git add`, or `git checkout -b`, or any `git push`, in any repo:

1. Show the user the exact files and diff that will be committed or pushed.
2. Wait for explicit approval ("y", "go ahead", "looks good").
3. Only then proceed.

This applies to every repo touched in a session, not just the one the session started in.
There are no exceptions for "trivial" or "obvious" changes. Approval for one action (a commit,
say) does not carry over to a later, different action (a push, a merge). Ask again for each one.

## Step 5: Reporting conventions (always active)

Apply this rule to every response in this session without exception:

**Always qualify branch names, PR numbers, and issue numbers with the full `org/repo` name.**

| Wrong | Correct |
|---|---|
| branch `chore/foo` | `myorg/myrepo` branch `chore/foo` |
| PR #42 | `myorg/myrepo` PR #42 |
| issue #7 | `myorg/myrepo` issue #7 |

Never reference a branch, PR, or issue without its `org/repo` qualifier.
The reader must never have to guess which repository is being discussed.

## Step 6: Skills update policy (always active)

When writing or updating a skill in this session:

**Skills must contain no private or project-specific information.** A skill that references
private repo names, personal org names, internal GIDs, or workspace-specific identifiers
cannot be published to a public skills repo. Every skill must be written so that any user
on any project can adopt it by substituting their own values.

Before committing any skill change, verify:
- [ ] No private org or repo names (replace with `myorg/myrepo` or a configurable placeholder)
- [ ] No personal email addresses, GIDs, or account identifiers
- [ ] Any project-specific paths or commands are marked as **⚙️ Configurable**

## Step 7: Skill authoring: no inline scripts (always active)

**Multi-line shell belongs in a script file, never inlined in SKILL.md.**

- Anything longer than a single command goes in `scripts/<name>.sh` beside SKILL.md. SKILL.md
  calls it and documents its arguments, output sections and exit codes.
- A single command may stay inline. A one-liner the developer reads and approves before running
  is documentation, not a script, and steps that check out, merge, push or delete **should**
  stay inline so each is approved individually rather than executed in an uninspectable batch.
- **Never write `&&`-chained, backslash-continued blocks.** They are unreviewable and
  undebuggable: no line numbers, no way to run one step in isolation, and a failure anywhere
  silently kills the rest of the chain.
- Scripts must be legible to a human: `#!/usr/bin/env bash`, a header comment giving
  purpose/usage/exit codes, named functions, quoted variables, one command per line, `--help`.
- **Never duplicate the same logic in two code blocks in one SKILL.md.** If two phases need it,
  it is a script that takes arguments. Duplicated blocks drift out of sync.
- Before claiming a script works, run it: against a real repo or a throwaway fixture that
  exercises the failure paths, not just the happy path.

**Why:** SKILL.md is simultaneously agent instructions and a document a human reviews and debugs.
Inline chained blocks fail the human half completely.

Reference implementation: `skills/git/sync-branches` (`scripts/triage.sh` holds the logic,
SKILL.md documents and calls it, and the destructive phases stay inline as single commands).

## Done

Confirm: "Session guidelines loaded ✓" then proceed with the user's task.
