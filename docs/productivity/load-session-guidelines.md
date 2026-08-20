## What it does

`load-session-guidelines` loads every standing rule a session needs in one pass: Karpathy coding guidelines, OSS quality standards (public and private), and PR conventions, plus a couple of always-active reporting and skill-authoring rules carried inline rather than read from a file. It is deliberately minimal: no full document ingestion, just the rules that actually change behavior.

## When to reach for it

Run this at the start of every session, before any user task. It is model-invoked and designed to disable-model-invocation on purpose in the frontmatter, meaning it will not fire itself; it is meant to be called explicitly, typically from a broader session-startup flow.

## What actually loads

**Karpathy guidelines** are pulled in first, by running `karpathy-guidelines` and confirming the rules are active for the session.

**OSS quality standards** come next, by running `load-oss-standards`, which verifies access to the configured standards repos and carries their inline rules. If the private standards repo is inaccessible, the skill logs a warning and continues rather than stopping; the public rules still apply on their own.

**PR conventions** are carried inline and always active, with no file read at all: a standard PR body template, and a table mapping branch prefixes (`feature/`, `fix/`, `chore/`, `docs/`, `data/`, `refactor/`, `test/`, `style/`, `claude/`) to what each is for. The one rule that never bends: nothing gets pushed directly to `main`; every change goes through a branch and a PR.

## The rules that apply to everything after loading

Two more rules stay active for the rest of the session, independent of whatever task comes next.

**Reporting conventions** require every branch, PR, and issue mentioned anywhere in the session to carry its full `org/repo` qualifier. A bare "PR #42" is wrong; "myorg/myrepo PR #42" is right. The point is that the reader should never have to guess which repository is being discussed.

**Skills update policy** applies whenever a skill is written or edited in the session: a skill can carry no private or project-specific information at all, since it may end up on a public skills repo. Before committing any skill change, the checklist is explicit: no private org or repo names, no personal email addresses or account identifiers, and any genuinely project-specific path or command marked as configurable rather than hardcoded.

**Skill authoring: no inline scripts** is the other standing rule, and it is specific about where the line sits. Anything longer than a single command belongs in a `scripts/<name>.sh` file next to `SKILL.md`, which documents its arguments and exit codes rather than embedding the logic. A single command a developer reads and approves before running stays inline, and steps that check out, merge, push, or delete should stay inline precisely so each one gets approved individually rather than executed as an unreviewable batch. Chained `&&` blocks are explicitly disallowed, because a failure partway through kills the rest of the chain silently and there is no way to run one step in isolation to debug it.

## Common questions

**What happens if the private standards repo is unreachable?**
The skill logs it and continues with the public rules still in force; it does not block the session.

**Do the PR conventions come from a file I need to keep updated?**
No. They are carried inline in this skill, on purpose, so there is no extra file to go stale.

**Where's a working example of the no-inline-scripts rule done correctly?**
`skills/git/sync-branches`, where the logic lives in `scripts/triage.sh` and the destructive phases stay inline as individually approved commands.

## Where it fits

`load-session-guidelines` runs alongside `check-prior-work` and `load-session-context` at the start of a session, and its output (the loaded rules, not a file) stays active for everything that follows in that session, including any skill authoring the session goes on to do.
