---
name: capture
description: Capture a freeform thought, task, or note mid-session — routes it to the correct content project, creates a real Asana task, writes a schema-compliant local markdown file, and commits it. Use when the user says /capture or "capture this".
---

# Capture

Capture freeform input into the correct content project in a single command without breaking flow.

## Prerequisites

- `.asana-config.json` exists at the project root (run `npm run setup-asana` to create it)
- `ASANA_TOKEN` is set in `.env`
- The project provides a `npm run capture` script (or equivalent) that accepts freeform text

## Arguments

`/capture "<text>"` — required. Ask if omitted.

---

## Step 1 — Get the text

If no argument was provided, ask:

> "What would you like to capture?"

---

## Step 2 — Run the capture script

```sh
ASANA_TOKEN=$(grep ASANA_TOKEN .env | cut -d= -f2) \
  npm run capture "<text>"
```

Save the exit code and stdout.

---

## Step 3 — Handle the result

**Exit 0 — success:**

Parse the JSON from stdout. Report:

> "Captured → **<project>** / <section>
> File: `<filePath>`
> Asana: https://app.asana.com/0/<asanaGid>
> Committed: <yes/no>"

Done.

---

**Exit 2 — ambiguous routing:**

Parse the JSON from stdout. The `suggestedProject` is the safe default. Show the user:

> "Routing is ambiguous. Suggested: **<suggestedProject>**.
>
> Available projects: <allProjects from JSON>
>
> Which project should this go to? (Enter to accept suggested)"

Wait for the user's choice. Then re-run with the confirmed project:

```sh
ASANA_TOKEN=$(grep ASANA_TOKEN .env | cut -d= -f2) \
  npm run capture "<text>" --project <confirmed>
```

Report success as in Exit 0.

---

**Exit 1 — error:**

Print the stderr message. Common causes and fixes:

- `.asana-config.json` not found → run `npm run setup-asana`
- `ASANA_TOKEN` missing → add `ASANA_TOKEN=<token>` to `.env`
- Project not in config → run `npm run setup-asana` to add it

## Setup

This skill depends on a project-provided capture script that:

1. Reads routing rules from project config or `.asana-config.json`
2. Calls Asana to create the task (using the real GID in the filename — no rename needed)
3. Writes a frontmatter-compliant markdown file to the configured output folder
4. Verifies the target repo is on `main` before committing — aborts with exit 1 if not
5. Commits the file to the repository
6. Outputs JSON: `{ status, project, section, asanaGid, filePath, committed }`
7. Exits 2 (not 0) when routing is ambiguous, with `{ status: "ambiguous", suggestedProject, allProjects, text }`
