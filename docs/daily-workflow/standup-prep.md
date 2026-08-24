## What it does

`standup-prep` is the daily session-startup coordinator. It runs a fixed sequence of sub-skills (preflight, session context, repo status, WIP sweep, open-PR sweep, and an optional Asana sync), then assembles everything into one morning brief, writes it to disk, and prints a per-repo summary you can act on immediately. It is meant to run before any coding work starts, not partway through a day.

## When to reach for it

Run it at the start of the day, or at the start of any session where you're not sure what state your repos are actually in. It does the sweeping so you don't open five repos by hand to find out which ones have uncommitted work or an open PR waiting on you.

If `MORNING_BRIEFS_ROOT` is still an unresolved placeholder, the skill calls `/resolve-ai-paths` itself before it needs to write the brief to disk, so you don't have to remember to do that first.

## The fixed order matters

Each step feeds the next, which is why the skill insists on running them in sequence rather than letting you skip ahead:

1. **Preflight** (`/standup-prep-preflight`): surfaces any work already done earlier in the session and loads critical-path context, before anything else runs.
2. **Session context** (`/load-session-context`): pulls in what the last session actually left off on.
3. **Repo status and WIP sweep**: `/repo-status` builds the dirty-state table, then `/wip-sweep` acts on it.
4. **Open PR sweep** (`/open-pr-sweep`): surfaces every PR waiting on review or response.
5. **The brief itself**: assembled from steps 0 through 3, written to disk, and synced to Asana.
6. **Asana sync** (`/asana-sync`): opt-in, run last.

Skipping a step means the brief downstream is working from stale or missing information. A critical-path item that `load-dependency-chain` would have surfaced, or a PR the open-PR sweep would have flagged, simply doesn't make it into the printed brief.

## What the brief actually contains

The brief is built from real data at each step, not a template filled with placeholders: the hard deadline and critical path from `dependency-chain.md`, the WIP commits created this run with their push status, open PRs with what action each needs, a suggested first task (clear PR debt first if any PR is open, otherwise the single most important critical-path item), the last five sessions, and what to explicitly skip today despite being tempting.

## Where it's saved

Every brief is written to `{{MORNING_BRIEFS_ROOT}}/YYYY-MM-DD/NN.md`, always inside a dated subfolder, never as a flat file, with `NN` always the next unused number for that date. An existing numbered file is never overwritten or appended to; a second standup on the same day gets `02.md`, not a rewrite of `01.md`. After it's written, the brief is synced automatically to the Morning Briefs Asana project. That part isn't opt-in; only the broader Asana task sync in step 6 is.

## Common questions

**Can I run just one of the sub-skills instead of the whole sequence?**
Yes. `/repo-status`, `/wip-sweep`, `/open-pr-sweep` and the rest all work standalone. `standup-prep` is the convenience wrapper for the case where you want the whole morning routine in one command with the outputs actually stitched together into a brief.

**What if there are no open PRs and no dirty repos?**
The brief says so plainly ("All repos clean" / "No open PRs") rather than leaving an empty table, and the suggested first task falls back to the top critical-path item instead of a PR-review nudge.

**Does the Asana sync in step 6 duplicate the brief sync in step 5?**
No. Step 5's sync creates one task with the brief content in the Morning Briefs project; step 6's `/asana-sync` is the broader, opt-in sync of actual work tasks and is a separate concern.

## It's working if

- Every value in the printed brief traces back to a real step's output, not to a placeholder.
- The suggested first task is genuinely the highest-leverage thing to start on, not just the first item alphabetically.
- Running it twice in one day produces two numbered briefs, never a silently overwritten one.
- You end the routine in a normal coding session, already pointed at a specific file and task.

## Where it fits

`standup-prep` is the entry point for a day of work, and everything else in the daily-workflow set is either a step it calls (`/repo-status`, `/wip-sweep`, `/open-pr-sweep`, `/asana-sync`) or the thing it eventually hands off to (a normal coding session, ending later in `/session-wrap`). `/standup-prep-preflight` is its own first step, not a separate routine you'd normally run on its own.
