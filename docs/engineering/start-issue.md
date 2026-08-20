## What it does

`start-issue` bootstraps a session from a GitHub issue number. It fetches the issue, checks that nothing is blocking it, looks for a branch or PR already in flight, pulls in a parent issue's context if there is one, reads any file paths the issue body mentions, and prints all of it as a single structured brief before handing off.

It is a loader, not a doer. Everything it produces is context and a routing decision; it never implements anything itself. The point is that the session which picks up the ticket starts with the same picture a person would have built by hand: what's asked, what's already in progress, what's blocked, and which files matter.

## When to reach for it

Type `/start-issue <issue-number>`, optionally followed by `owner/repo` if the issue lives outside the repo your current directory points at.

| Your situation | Where to go |
| --- | --- |
| You have an issue number and want to start work on it cold | `/start-issue <number>` |
| The issue isn't triaged yet, or you're not sure it's ready | Run [triage](./triage.md) on it first |
| You already know exactly what to build and don't need the issue loaded | Skip straight to [tdd](./tdd.md) or `/implement` |
| You want to plan a build across many sessions, not start one | [wayfinder](./wayfinder.md) or [to-tickets](./to-tickets.md) |

## Prerequisites

`gh` needs to be authenticated against the target repo. If the current directory isn't a git repo with a resolvable remote, the skill asks which `owner/repo` to use instead of guessing.

## What the brief contains

The brief is built in a fixed order, and each step can stop the whole thing before the next one runs:

1. **Resolve the repo.** From the current git remote, or from an explicit `owner/repo` argument.
2. **Fetch the issue.** Its number, title, body, labels, URL, and state. A closed or missing issue stops the skill immediately, before any of the later steps run.
3. **Check blockers.** Any `## Blocked by` references in the issue body get checked for state. A bare `#75` resolves against the current repo; `owner/repo#75` resolves against the named one. Any blocker still open halts the whole thing with the list of what's still open, and nothing past this point runs until they're closed.
4. **Check for existing work.** A search across PR titles and bodies for the issue number, plus a look for a branch already prefixed with it, so the brief tells you if someone (or a previous session) already started.
5. **Read the parent.** If the issue names a `## Parent` issue, that gets fetched too, and its title and a short summary go into the brief.
6. **Read file hints.** Any file path mentioned in the issue body gets opened and summarized in one sentence. Nothing gets read speculatively. Only paths the issue text actually names.

Everything above lands in one printed block: labels, parent, branch or PR state, blockers, the "what to build" and "acceptance criteria" sections trimmed from the issue body, the file summaries, and a suggested next skill.

## Routing

The only automatic route the skill takes today is from an issue labeled `ready-for-agent` to [tdd](./tdd.md), and it asks for confirmation before handing off. Anything not in that state gets a stop, not a guess: the skill tells you to run [triage](./triage.md) first or say directly which skill to invoke. It does not try to infer a route from a category label instead.

Confirming the handoff passes the built brief, not just the issue number, into the next skill's opening message, so the session that takes over doesn't have to re-fetch anything it already gathered.

## Common questions

**What if the issue isn't ready for an agent yet?**
The skill stops and tells you to run [triage](./triage.md) on it, or name the skill yourself. It won't guess a route for an issue that hasn't been through triage, since guessing wrong wastes a whole session's context on the wrong starting point.

**Does it read every file in the repo to build context?**
No. Only the paths the issue body explicitly names, and only up to the first 80 lines of anything large. Reading speculatively would burn context on files that might not even matter to the ticket.

**What happens if a PR already exists for the issue?**
The brief notes the PR number and branch instead of treating the issue as unstarted, so you don't accidentally open a second branch for work already in flight.

## It's working if

- A closed or missing issue stops the skill before it reads anything else.
- An open blocker halts the whole thing and names exactly which issue is still open.
- The brief's file summaries only ever cover paths the issue body actually mentioned.
- Handing off to the next skill carries the brief with it, so nothing gets re-fetched.
- An issue that isn't `ready-for-agent` gets a stop and a pointer to [triage](./triage.md), never a guessed route.

## Where it fits

`start-issue` is the entry point that sits in front of the main build chain: `triage` (or `to-tickets`) produces a `ready-for-agent` issue, and `start-issue` is how a fresh session picks it up and hands off into [tdd](./tdd.md). It has nothing to say about issues that aren't triaged yet, that's [triage](./triage.md)'s job, and nothing to say about the build itself once the handoff is made.
