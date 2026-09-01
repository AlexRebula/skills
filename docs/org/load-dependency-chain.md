## What it does

`load-dependency-chain` reads a single file, `dependency-chain.md`, and pulls three things out of it before anything else happens in the session: the hard deadline and what depends on it, the critical path (what is blocking what today), and a phase status for each active repo. It is a small skill on purpose. Its whole job is making sure that context is in front of you before you start checking repo state or writing a morning brief, not after.

## When to reach for it

Run it at the very start of any session-startup workflow, before touching individual repos. It is meant to run early enough that repo state and PR sweeps get read against a critical path you already know, rather than assembling one from scratch per repo.

| Your situation | Where to go |
| --- | --- |
| Starting a session-startup workflow (morning brief, standup prep) | `load-dependency-chain`, first |
| You need the LittleBranches standards health check too | [load-oss-standards](./load-oss-standards.md), run alongside |
| The deadline or critical path itself needs updating | Edit `dependency-chain.md` directly, then re-run this skill |

## Prerequisites

A `dependency-chain.md` file has to exist at `{{WIKI_ROOT}}/wiki/projects/dependency-chain.md`, where `{{WIKI_ROOT}}` is the absolute path to your wiki root. Nothing else. If you're adapting this skill for a different layout, the path is the one thing to change, and the skill body says so explicitly rather than hardcoding it silently.

## Expected file shape

The skill doesn't parse structured data; it reads plain Markdown and extracts by section. At minimum, the file needs:

- **A hard deadline**: one specific date, stated with what it's for (launch, demo, handoff).
- **A critical path**: a chain showing which repo or task is blocking everything else today.
- **A per-repo status table**: one line per active repo: name, current phase, blocked or unblocked.

```md
# Dependency Chain

**Hard deadline:** 20 Jun 2026, demo to stakeholder

## Critical path

repo-a Phase C → app-b Phase 3 → launch

## Repo status

| Repo   | Phase   | Status                       |
| ------ | ------- | ----------------------------- |
| repo-a | Phase C | 🔄 In progress                |
| app-b  | Phase 3 | ⬜ Blocked on repo-a Phase C  |
```

If the file is missing any of the three, the extraction for that piece comes back empty rather than guessed. A dependency-chain file with no critical path section just means the skill reports "no critical path found," not a fabricated one.

## Common questions

**What if the file doesn't exist yet?**

Create it at the expected path using the minimum structure above. The skill is a reader, not a generator; it will not scaffold the file for you.

**Can this track more than the hard deadline and one critical path?**

The skill only extracts what the format above defines. If your project genuinely has parallel critical paths, that's a real modeling problem worth solving in the file itself (multiple named paths, one per initiative) before asking the skill to extract more than one meaning from a single "Critical path" heading.

**Does it write anything back to the file?**

No. It's a pure read: extract deadline, critical path, and per-repo status, then hand that to whatever workflow called it.

## It's working if

- The hard deadline and what depends on it are stated back to you before any repo is touched.
- The critical path names the actual blocking repo or task today, not a stale one from a prior session.
- Every active repo in the file gets a phase and a blocked/unblocked call, not a partial list.
- Running it against a file missing a section produces an honest gap, not an invented answer.

## Where it fits

`load-dependency-chain` is a building block other session-startup skills call, not a standalone destination. It runs first, typically alongside [load-oss-standards](./load-oss-standards.md), so that whatever repo-state or PR-sweep work follows is read against a critical path you already know instead of one assembled fresh per repo.
