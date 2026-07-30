---
name: log-incident
description: Log an AI behavioural incident or workflow violation to the wiki's incidents hub — drafts the structured record from the current conversation (or from a short description), shows it for approval, then writes the file, updates the index, and opens a PR. Use when the user says /log-incident, "log this incident", or asks to record a mistake so it can be reviewed/grilled later.
---

# Log Incident

Record an AI behavioural incident (a mistake, a rule violation, a recurring failure mode) as a
structured, git-tracked file — never as an Asana task, a local memory file, or an ad-hoc raw doc.
Incidents are postmortems, not work items: no Asana project is involved anywhere in this skill.

## Prerequisites

- The wiki repo exists somewhere on disk and contains `raw/incidents/incidents-index.md`. See
  **Step 0** below for how to find it without assuming a fixed path.
- `gh` is authenticated for that repo.

## Arguments

`/log-incident` — no argument. Drafts the incident from the current conversation.
`/log-incident "<short description>"` — use when there's no live conversation to draw from (e.g.
reporting something that happened in a past session). Falls back to asking for the missing fields.

---

## Step 0 — Locate the wiki repo

Do not hardcode a path. Resolve `WIKI_ROOT` the same way `resolve-ai-paths` resolves other roots:

1. If the current working directory is inside a repo containing `raw/incidents/incidents-index.md`
   at its root, that repo is `WIKI_ROOT`.
2. Otherwise, scan visible workspace folders for a directory containing
   `raw/incidents/incidents-index.md`.
   - **One result** → announce `"Detected wiki repo: <path>"` and proceed.
   - **Multiple results** → list all candidates and ask which one to use.
   - **No result** → ask the user for the path. Do not assume a folder named `wiki` exists, and do
     not assume any particular parent directory structure — this skill must work regardless of how
     the user's workspace is laid out.

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
