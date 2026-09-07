## What it does

`session-wrap` closes out a working session: it writes a summary document of what happened, saves it into your sessions folder, updates the session index, and hands off to `/wip-sweep` to commit whatever the session actually touched. It is deliberately not a narrative recap. Anything already captured in a commit, a PR, an issue, or an ADR is referenced by path or URL rather than duplicated into the wrap itself.

This exists alongside Mat Pocock's `/handoff`, not as a replacement forced on anyone who already uses it: `handoff` compacts a conversation into one ephemeral document in the OS temp folder for another agent to pick up right now, and nothing more. `session-wrap` was built as its own, original skill rather than a fork of `handoff`, specifically to add what `handoff` was never meant to do: track the flow of an entire session across multiple wraps, store that history permanently inside a real wiki repository, and keep every session searchable and linked to the ones before and after it, not thrown away once the immediate handoff is read.

Before it writes anything new, it runs a set of automatic housekeeping passes: collapsing any duplicate same-day session folders, repairing broken `→ Next` navigation links left by earlier renumbering, and recovering the full transcript history rather than trusting an in-context summary that may already be missing detail from an earlier compaction.

## Why session-wrap, not just handoff

Mat Pocock's `/handoff` already existed long before I wrote this. It does one thing well: compact the current conversation into a single document, written to the OS temp folder, so a fresh agent can pick up the work. I didn't want to lock myself into that shape.

What I actually needed was something that behaved like `handoff` at the moment of writing — recover the full transcript, not just what survived context compaction — but that also did three things `handoff` was never designed to do:

1. **Track the flow of a session, not just its endpoint.** A single session can produce more than one wrap (`01-`, `02-`, `03-`...) as it moves through distinct phases of work, each one linked to the next via a `→ Next` chain, so the whole session reads as a sequence, not a single flat snapshot.
2. **Store history permanently, in my own wiki — not the OS temp folder.** Every wrap is a real file, in a real git repository, committed and opened as a PR like everything else in my projects. Nothing here disappears the next time the OS clears its temp directory. Six months later, `sessions-index.md` still has the row.
3. **Keep that history genuinely usable later, not just written once.** A `sessions-index.md` catalog spans the entire project's lifetime, so a later session — mine, or another agent's — can search across every prior session, not just the one it was handed directly. `/load-session-context` reads a prior wrap back in at the start of the next session; `/standup-prep` reads the whole index.

There's real shared lineage here, not a rewrite for its own sake. `session-wrap`'s own Step 2a — recovering the full transcript from the session log rather than trusting a possibly-incomplete in-context summary — is directly inspired by `handoff`'s Step 1, which does the same thing. That part, I kept, because it's exactly right. Everything downstream of it — the folder structure, the index, the `→ Next` chain, the automatic same-day-folder collapsing, and the hand-off into `/wip-sweep` to commit and (by default, since the `auto` mode described below) push and open a PR for the wrap itself — is what doesn't exist in `handoff`, because `handoff` was never trying to be a permanent record. `session-wrap` is.

One smaller, practical difference: `handoff` sets `disable-model-invocation: true` — it only ever runs when explicitly called. `session-wrap` doesn't set that, on purpose. I wanted the model itself able to reach for it at high context or after finishing real work, not only when I remember to ask.

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

Every artifact this skill produces (the wrap file, the index update, any link repair) goes through a branch and a PR like anything else in the repo, with no exception carved out for "just a session wrap file." That holds in both hand-off modes: by default, `/wip-sweep` commits, pushes, and opens the PR unattended for a private, docs-only sweep-group (see "Automatic by default" below) — it still never merges, and it still never pushes straight to main. Pass `--pause` to get today's fully interactive tier gates back, reviewed and approved by hand at every step.

## Automatic by default, `--pause` for the old behavior

`session-wrap` used to hand off to `/wip-sweep` and stop there, leaving every commit, push, and PR-open for a human to approve one at a time — even though the answer was always yes, since this skill's own artifacts are always private, low-stakes markdown. That's no longer the default.

Without any argument, `session-wrap` computes the exact repos it touched and calls `/wip-sweep auto` with that list. `wip-sweep`'s own `auto` mode decides, per sweep-group, whether it's eligible to run unattended: the repo has to be private (checked live, every time, never assumed), and every file in that specific group has to be docs-only. A public repo never qualifies, regardless of content — it always falls back to a normal interactive prompt, and it's called out explicitly wherever the dirty-state table is shown, so it never looks like just another auto-eligible row. A repo dirty outside the session's own known scope is never swept and never silently ignored either — it's surfaced as soon as it's found.

Pass `/session-wrap --pause` to skip all of that and get the original behavior: a plain `/wip-sweep` call that asks which repos to sweep and confirms every commit, push, and PR-open by hand, for every repo, regardless of visibility or content.

Automatic doesn't mean silent, either way: the dirty-state table, the commit plan, and every action taken still print as they happen — the only thing `auto` mode removes is the wait for a reply.

## Common questions

**Why does it re-read the whole transcript instead of trusting what's in context?**
Because a compacted conversation's in-context summary is, by construction, missing whatever the compaction dropped. Trusting it produces a wrap that looks complete and isn't.

**What if `VSCODE_TARGET_SESSION_LOG` isn't available?**
The checklist still gets built, from context alone, but the wrap document carries an explicit warning that skills invoked and GitHub writes may be incomplete, so the gap is visible rather than silently assumed away.

**Does it commit the wrap file itself?**
No. It hands off to `/wip-sweep`, telling it exactly which repos were dirtied and what changed in each. By default that hand-off runs unattended for a private, docs-only sweep-group — `wip-sweep`'s own commit, push, and PR-open still happen, just without waiting for approval. Pass `--pause` to get the original behavior back, where `wip-sweep`'s own tiered approval gates decide what actually gets pushed.

**What does `--pause` actually change?**
Nothing about what gets written or how — only whether the hand-off to `/wip-sweep` waits for approval at each step. Without it, `wip-sweep` runs in `auto` mode, scoped to exactly the repos this session touched. With it, the hand-off is identical to how this skill always worked before `auto` mode existed.

**What happens to pending tasks that reference a GitHub issue that got closed this session?**
They're dropped from the list rather than carried forward as if the issue were still open. If real follow-up remains, it's stated as a concrete action, not tied to a closed issue number.

## It's working if

- The wrap reads as a continuity pointer, short enough that the next session can act on it immediately, not a transcript.
- Every item in it traces to something the evidence checklist actually found.
- There is exactly one folder for today, and every `→ Next` link in it resolves.
- The handoff to `/wip-sweep` names the specific repos and changes that need committing, not a blanket "sweep everything," and anything outside that scope gets surfaced rather than swept.

## Where it fits

`session-wrap` is the last step of a working session and the first thing a well-run next one reads. It depends on `/resolve-ai-paths` for its own path resolution, and it hands off one-way into `/wip-sweep` for the actual commit: the dependency never loops back. On the standup side, `/standup-prep`'s `/load-session-context` step is what reads a prior wrap back in at the start of the next session.
