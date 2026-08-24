---
name: log-incident
description: Log an AI behavioural incident or workflow violation to the wiki's incidents hub — drafts the structured record from the current conversation (or from a short description), shows it for approval, then writes the file, updates the index, and opens a PR. Two consumers depend on this hub existing and being current — `/session-wrap` and every new session's own startup scan — so a future session can recognize a mistake it's about to repeat. Use when the user says /log-incident, "log this incident", or asks to record a mistake so it can be reviewed/grilled later.
---

# Log Incident

Record an AI behavioural incident (a mistake, a rule violation, a recurring failure mode) as a
structured, git-tracked file. Incidents are postmortems, not work items: no Asana project is
involved anywhere in this skill, and nothing here is ever stored in the LLM's own built-in
cross-session memory feature (that mechanism is out of scope entirely — this repo has separately,
repeatedly forbidden relying on it; see the incidents this hub already holds about it). The record
lives in the user's own chosen structured store instead — a wiki repo by default in this setup, or
whatever equivalent the user designates (see Step 0's fallback if no such store exists yet). Never
as an ad-hoc raw doc with no index, either — the whole point is that it's findable later, by both a
human and a future session, not just written down once and forgotten.

## Purpose — why this hub has two consumers, not one

This isn't just a postmortem log for a human to read later. It has two live consumers:

1. **`/session-wrap`** references it when closing out a session, so incidents surfaced during that
   session are captured, not lost.
2. **Every new session, at its own startup**, is expected to scan the index for open incidents
   relevant to the work ahead — *before* acting, not after making the same mistake again. An
   incident that sits in this hub but is never actually re-read at the start of the next relevant
   session has done nothing to prevent a recurrence; the write is only half the point.

**Worked example of exactly the failure mode this exists to catch:** a session asked "want me to
push this?", got no direct answer, and the user instead invoked a different skill
(`/session-wrap`). The session treated that as license to proceed — it committed, merged, and
pushed to a shared branch with no further confirmation, reading an unrelated answer to a *different*
question as if it covered the push too. That specific pattern — assuming a green light because a
question went unanswered and the user moved on to something else, rather than treating the original
question as still open — is exactly the class of mistake a future session should catch by reading
this hub first, not repeat because nobody looked.

## Prerequisites

- Ideally a wiki repo already exists somewhere on disk containing `raw/incidents/incidents-index.md`.
  See **Step 0** below for how to find it without assuming a fixed path — and for what to do when no
  such store exists yet at all.
- `gh` is authenticated for whichever repo ends up hosting the incident.

## Arguments

`/log-incident` — no argument. Drafts the incident from the current conversation.
`/log-incident "<short description>"` — use when there's no live conversation to draw from (e.g.
reporting something that happened in a past session). Falls back to asking for the missing fields.

---

## Step 0 — Locate (or establish) the incident store

Do not hardcode a path. Resolve `WIKI_ROOT` the same way `resolve-ai-paths` resolves other roots:

1. If the current working directory is inside a repo containing `raw/incidents/incidents-index.md`
   at its root, that repo is `WIKI_ROOT`.
2. Otherwise, scan visible workspace folders for a directory containing
   `raw/incidents/incidents-index.md`.
   - **One result** → announce `"Detected wiki repo: <path>"` and proceed.
   - **Multiple results** → list all candidates and ask which one to use.
   - **No result at all — this user has no wiki-style incident store anywhere:** do not assume one
     must exist, and do not silently default to any fallback (and never, under any circumstances,
     the LLM's own built-in cross-session memory feature — that is not a valid answer here, full
     stop). Ask the user directly how they want incidents like this stored for their setup: a new
     `raw/incidents/` structure in an existing repo they name, a different existing log/journal
     they already keep, or something else entirely. Whatever they choose, confirm the exact path
     and file format before writing anything, and treat their answer as the durable `WIKI_ROOT` for
     this and future runs — this skill must work regardless of how the user's workspace is laid
     out, including for a user who has never set up a wiki at all.

## Step 1 — Draft the incident

**No argument (default path):** Read back over the current conversation and draft every field of
the template below from what actually happened — do not ask the user to re-describe something you
already watched happen. Pay particular attention to:

- **What happened** — one paragraph, factual, no editorializing.
- **Root cause** — the actual mechanism, not just "AI made a mistake." If the user corrected you
  more than once before the real generalization landed, say so — that's a root-cause detail, not
  noise (see the pattern in `2026-07-30--generalized-fix-from-sample-size-of-one.md` for the shape
  of this).
- **Severity** — High if it changed shared state, touched a protected branch, or affected another
  person; Medium if it was caught before any action was taken but represents a real design/process
  flaw; Low for a minor, contained slip.
- **Status** — `Resolved` only if the underlying flaw was actually fixed (not just "the user pointed
  it out"); otherwise `Open`.
- **Guardrails that existed and still failed** — omit this section entirely if this is the first
  recorded instance of the failure mode. Include it, with a real explanation of *why* each guardrail
  didn't catch it, if this is a recurrence.
- **Suggested fixes** — always tag each fix `Mechanical` (enforced by code/hooks/scripts) or
  `Behavioural` (LLM compliance only). Prefer proposing at least one Mechanical option; if none
  exists, say so explicitly rather than leaving only Behavioural fixes on the table.

**With a description argument:** Use it as the "What happened" seed and ask the user directly for
whatever the description doesn't cover — root cause, severity, status, evidence. Do not guess at
facts you don't have.

## Step 2 — Show the draft, wait for approval

Print the full filled-in template and ask:

```
Log this incident? [yes / edit / no]
```

Do not write anything until the user confirms. If they say `edit`, apply their changes and show the
draft again.

## Step 3 — Write the file

- Filename: `<WIKI_ROOT>/raw/incidents/<YYYY-MM-DD>--<slug>.md`, where `<slug>` is a short kebab-case
  summary (3-6 words) of the incident title. Use today's date unless the user specifies the incident
  happened on a different date.
- If a file for that exact date+slug already exists, ask before overwriting.

## Step 4 — Update the index

Open `<WIKI_ROOT>/raw/incidents/incidents-index.md`. This file has an append-only table under
`## Index` — **read the actual last row before editing**. Do not anchor an edit on a nearby line
from memory; find the true end of the table. (This exact mistake — editing near a remembered line
instead of the real end of an append-only file — is itself a recorded incident:
`2026-06-07--ignoring-file-instructions.md`. Do not repeat it.)

Append one new row: `| <date> | [<filename>](./<filename>) | <one-line summary> | <severity> | <status> |`.

## Step 5 — Commit, push, open a PR

Never commit directly to `main` — every change goes through a branch and PR, no exceptions (this is
also a recorded incident: `2026-06-07--direct-push-to-main.md` and its recurrence,
`2026-06-20--direct-push-to-main-oss-skills-repo.md`).

```sh
git -C <WIKI_ROOT> checkout -b chore/<YYYYMMDD>-incident-<slug> origin/main
git -C <WIKI_ROOT> add raw/incidents/<new-file>.md raw/incidents/incidents-index.md
git -C <WIKI_ROOT> commit -m "chore(incidents): log <slug>"
git -C <WIKI_ROOT> push -u origin HEAD
```

Then open a PR (read `.github/pull_request_template.md` in `WIKI_ROOT` if present, and fill it
properly — do not pass a bare `--body` string):

```sh
gh pr create --repo <owner>/<wiki-repo> --title "chore(incidents): log <slug>" --body-file <file>
```

Report the PR URL. Do not merge it — incidents are logged for later review (`/grill-me`), not
auto-resolved.

## Non-goals

- **No Asana task is ever created.** If the user wants incidents tracked as actionable work items,
  that's a different, explicit request — this skill does not do it silently.
- **No auto-synthesis into a `wiki/` concept page.** The incident file's own template fields already
  are the synthesis. If a real cross-incident pattern emerges later, that's a manual `/ingest`-style
  write, not something this skill should force on every run.
