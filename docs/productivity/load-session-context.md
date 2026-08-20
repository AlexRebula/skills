## What it does

`load-session-context` gives a fresh session enough history to pick up where the last one left off, without reading everything that has ever happened. It opens the sessions index, reads the title and primary work of the five most recent rows, loads only the single latest wrap file from the most recent session, and surfaces whatever pending tasks or unresolved blockers that file contains, after checking each one is actually still relevant.

## When to reach for it

Run this at the start of any session, before the user's first real task. It is meant to run early and cheaply: one index read, one wrap file read, and a couple of verification checks, not a tour through the whole sessions history.

If `SESSIONS_ROOT` shows up as a literal, unsubstituted placeholder, the skill's first move is to invoke `resolve-ai-paths` to resolve it before doing anything else.

## Why only the latest wrap file

A session folder can contain several numbered wrap files if the session itself ran long, but only the highest-numbered one reflects where things actually ended up; the earlier ones in the same folder are superseded by it. The skill is explicit about not loading every wrap file in that folder, and about only skimming titles and projects for the four older sessions beyond the most recent, going deeper into an older session only if it is flagged as carrying a blocker relevant to today.

## Verifying before it surfaces anything

A pending task pulled straight from a wrap file is not necessarily still pending. Before including it in the report, the skill runs two checks: if the task references a GitHub issue number, it checks the issue's live state and drops the task if it is closed; separately, it does a quick grep or file-existence check to confirm the described work has not already landed. Only tasks that survive both checks make it into the final report, so the picture handed to the new session reflects what is actually still outstanding, not just what was outstanding when the wrap file was written.

## Common questions

**Does it read today's morning brief too?**
Yes, if one already exists for today's date, which tells the session whether a standup already ran today before it starts one of its own.

**What if a pending task's issue was closed since the wrap file was written?**
It gets filtered out silently. The report only shows tasks that pass the live-status check.

**How far back does it actually look?**
Five most recent sessions get their titles and projects noted; only the single latest wrap file gets read in full, and older sessions only get opened if they are flagged as relevant.

## Where it fits

`load-session-context` is one of the early steps in a session-startup flow, alongside `check-prior-work` and `load-session-guidelines`. Where `check-prior-work` looks for compacted history from the current session itself, this skill looks backward across the sessions index for the previous one.
