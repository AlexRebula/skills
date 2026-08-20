## What it does

`session-wrap` closes out a working session: it writes a summary document of what happened, saves it into your sessions folder, updates the session index, and hands off to `/wip-sweep` to commit whatever the session actually touched. It is deliberately not a narrative recap. Anything already captured in a commit, a PR, an issue, or an ADR is referenced by path or URL rather than duplicated into the wrap itself.

Before it writes anything new, it runs a set of automatic housekeeping passes: collapsing any duplicate same-day session folders, repairing broken `→ Next` navigation links left by earlier renumbering, and recovering the full transcript history rather than trusting an in-context summary that may already be missing detail from an earlier compaction.

## When to reach for it

Reach for it at context above roughly 55%, right after finishing a substantial piece of work, or before ending a session for the day. It needs `SESSIONS_ROOT` and `PROMPTS_ROOT` resolved: if either is still a literal placeholder, it stops immediately and tells you to run `/resolve-ai-paths` first rather than writing a wrap file to the wrong place.

## The evidence checklist is not optional

The step most worth understanding is 2a: recovering history from the actual session transcript rather than from memory. Every conversation that's been compacted even once has an in-context summary that's incomplete by construction, and the skill treats "the context feels complete" as insufficient reason to skip re-reading the transcript.

What comes out is a checklist across four fixed categories (skills invoked, GitHub writes, files edited, user decisions), shown to you before the wrap document gets written at all, so you can correct an omission before it's committed to disk. Every line in the eventual wrap has to trace back to one of those four categories; nothing gets added from recall.

One consequence worth knowing: if any edited file matches a locally installed skill's `SKILL.md`, the skill automatically adds a pending task to sync that change back to the canonical skills repo. That's mandatory, not conditional on the session otherwise feeling done. A skill edited locally and never synced back is a quiet source of drift.

## The one-folder-per-day rule

Every session on the same calendar day belongs in one folder, with multiple wrap files (`01-`, `02-`, `03-`...) inside it rather than multiple folders. This isn't a style preference; the skill actively enforces it at two points: once before writing (in case an earlier session left a duplicate) and once after saving the new file (in case this session is the one that just created the duplicate). If it ever finds two folders sharing today's date prefix, it collapses them before continuing.

The other invariant enforced the same way: every non-last file in a session folder must end with a `→ Next` link to the file after it, and the last file must carry the "next session not yet started" marker. A missing link breaks navigation for whatever session opens the folder next, so the skill checks and repairs the whole chain as its last step before handing off.

## Never straight to main

Every artifact this skill produces (the wrap file, the index update, any link repair) goes through a branch and a PR like anything else in the repo, with no exception carved out for "just a session wrap file." If `/wip-sweep` ends up handling the commit, its own tier gates are what a user reviews and approves; this skill doesn't bypass that by pushing directly itself.

## Common questions

**Why does it re-read the whole transcript instead of trusting what's in context?**
Because a compacted conversation's in-context summary is, by construction, missing whatever the compaction dropped. Trusting it produces a wrap that looks complete and isn't.

**What if `VSCODE_TARGET_SESSION_LOG` isn't available?**
The checklist still gets built, from context alone, but the wrap document carries an explicit warning that skills invoked and GitHub writes may be incomplete, so the gap is visible rather than silently assumed away.

**Does it commit the wrap file itself?**
No. It hands off to `/wip-sweep`, telling it exactly which repos were dirtied and what changed in each, and lets wip-sweep's own tiered approval gates decide what actually gets pushed.

**What happens to pending tasks that reference a GitHub issue that got closed this session?**
They're dropped from the list rather than carried forward as if the issue were still open. If real follow-up remains, it's stated as a concrete action, not tied to a closed issue number.

## It's working if

- The wrap reads as a continuity pointer, short enough that the next session can act on it immediately, not a transcript.
- Every item in it traces to something the evidence checklist actually found.
- There is exactly one folder for today, and every `→ Next` link in it resolves.
- The handoff to `/wip-sweep` names the specific repos and changes that need committing, not a blanket "sweep everything."

## Where it fits

`session-wrap` is the last step of a working session and the first thing a well-run next one reads. It depends on `/resolve-ai-paths` for its own path resolution, and it hands off one-way into `/wip-sweep` for the actual commit: the dependency never loops back. On the standup side, `/standup-prep`'s `/load-session-context` step is what reads a prior wrap back in at the start of the next session.
