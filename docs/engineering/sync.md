## What it does

`sync` runs a bidirectional sync between configured Asana projects and the local markdown files that mirror them. It pulls tasks that changed on Asana's side into local files, pushes local files that changed since the last sync back to Asana, and resolves anything that changed on both sides by letting the local file win. Changed files get committed to the repo as the last step.

This is the engineering-category `sync`: it operates on a code repository's own content folder and commits the result with git. It is not the productivity-category skill of the same name, which syncs a morning brief into Asana tasks rather than a content folder's markdown files.

## When to reach for it

Type `/sync`. It takes no arguments.

| Your situation | Where to go |
| --- | --- |
| Local markdown files and their Asana tasks have drifted and you want them reconciled | `/sync` |
| You want a morning brief turned into Asana tasks | The productivity-category `sync` skill, not this one |
| Asana config doesn't exist yet for this repo | Run `npm run setup-asana` first |
| You only want to push local changes, never pull | Not supported here; every run checks both directions |

## Prerequisites

- `.asana-config.json` at the project root, created by `npm run setup-asana`. It holds the workspace GID, project GIDs, section GIDs, and the local paths each project maps to.
- `ASANA_TOKEN` set in `.env`.
- A project-provided sync script, exposed as `npm run sync-workspace` (or an equivalent the repo wires up), that does the actual work described below.

If either the config file or the token is missing, the skill says so and stops rather than guessing at defaults.

## How the sync works

The skill itself is a thin wrapper: check prerequisites, run the sync script, commit whatever it changed, report a summary. The sync script it calls is where the real logic lives, and it follows a fixed sequence:

1. Read the per-project config: workspace, project and section GIDs, and the local folder each project maps to.
2. Fetch every task for each configured project from Asana.
3. Compare each task's modification timestamp against a per-project `.sync-state.json` left over from the previous run.
4. For anything newer on Asana, write or update the local markdown file. Frontmatter gets overwritten with the Asana fields; the body text is preserved.
5. For anything newer locally, push the change up to the matching Asana task.
6. Where both sides changed since the last sync, the local file wins and Asana gets updated to match it.
7. Write a fresh `.sync-state.json` once the run succeeds.

The script is idempotent: run it twice in a row with nothing changed on either side, and the second run makes no writes and no API calls.

After the script returns, the skill stages and commits only the configured content folder, and only if something in it actually changed. An unchanged run produces no commit.

## Common questions

**Why does local always win a conflict instead of asking?**
Because the files live in the repo and are meant to be the source of truth for anyone reading the codebase; a conflict means someone edited the Asana task directly instead of through the file, and the sync treats that as the exception to reconcile rather than a decision to relitigate on every run.

**What happens if the Asana API call fails partway through?**
The skill prints the error and stops without committing. A partial sync never gets written to git, so a failed run can be re-tried without risk of the repo and Asana ending up in two different half-updated states.

**Does it touch anything outside the configured content folder?**
No. The commit step only stages the folder named in `.asana-config.json`. Nothing else in the repo is touched by this skill.

## It's working if

- Running it twice with nothing changed produces "nothing changed on either side" and no commit.
- A file edited locally since the last sync ends up matching on the Asana side, and vice versa.
- A task changed on both sides ends up matching the local file's version, with Asana updated to match.
- A missing `.asana-config.json` or `ASANA_TOKEN` stops the skill with a clear message instead of a stack trace.
- The commit it creates touches only the configured content folder, never anything else in the repo.

## Where it fits

`sync` stands on its own. It doesn't feed into or depend on the main build chain (`grill-with-docs` through `code-review`); it's a standing maintenance task you run whenever the local content and its Asana mirror might have drifted, most often at the start or end of a working session.
