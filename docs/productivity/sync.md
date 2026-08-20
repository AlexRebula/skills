## What it does

`sync` runs a bidirectional sync between a configured set of Asana projects and their local markdown files: it pulls new or updated tasks from Asana into local files, pushes local changes back to Asana, resolves any conflict in favor of the local file, and commits whatever changed. It's the skill you reach for on an Asana-backed content workspace where the markdown files and the Asana tasks are meant to represent the same state.

## Prerequisites

Three things need to already be in place, and the skill checks the first two before doing anything else:

- `.asana-config.json` at the project root, created by `npm run setup-asana`
- `ASANA_TOKEN` set in `.env`
- a project-provided `npm run sync-mill` script (or an equivalent) that actually performs the sync

If `.asana-config.json` is missing, the skill stops and tells you to run the setup script rather than guessing at a config. It doesn't independently verify the token's presence before running the script; a missing token surfaces as whatever error the script itself produces.

## When to reach for it

Type `/sync`, no arguments needed. Reach for it whenever local markdown content and its Asana counterpart may have drifted apart in either direction (you edited a file locally, or someone updated the task in Asana) and you want both sides reconciled and the change committed in one step.

## Local wins on conflict

The one policy worth knowing before you rely on this: if both sides changed since the last sync, the local file's version wins and Asana gets updated to match it. That's a deliberate choice, not an accident of the implementation. The markdown files are the source of truth this skill treats as authoritative, and it says so plainly in its report whenever a conflict actually gets resolved this way.

## What actually happens under the hood

The skill itself is a thin wrapper. The real logic lives in the project's `sync-mill` script, which:

1. reads project config (workspace GID, project GIDs, section GIDs, local paths) from `.asana-config.json`
2. fetches every task per configured project from Asana
3. compares modification timestamps against a per-project `.sync-state.json`
4. pulls anything newer on the Asana side into local markdown (frontmatter overwritten, body preserved)
5. pushes anything newer locally back to Asana
6. resolves conflicts local-wins, updating Asana
7. writes the updated `.sync-state.json`
8. does nothing at all (no writes, no API calls) if nothing changed on either side

The skill's own job after that is narrow: stage and commit whatever the script changed in the configured content folder, with a `sync: <YYYY-MM-DD>` message, and skip the commit entirely if nothing changed.

## Common questions

**What if the config file doesn't exist yet?**
The skill tells you to run `npm run setup-asana` with `ASANA_TOKEN` set, and stops there. It won't attempt to bootstrap the config itself.

**Does it commit even when nothing changed?**
No. A no-op sync (0 pulled, 0 pushed, 0 conflicts) produces no commit and says so explicitly.

**What happens on an Asana API error?**
The skill prints the error and stops. It doesn't commit a partial result; a sync that failed halfway through doesn't get treated as if it succeeded.

## It's working if

- Running it twice in a row with no intervening edits produces no commit the second time.
- A conflict resolves the way the report says it did: local content wins, and Asana actually reflects it afterward.
- The commit message and diff correspond exactly to what the sync report claimed changed.

## Where it fits

`sync` is the maintenance loop for any Asana-backed content workspace set up this way, the equivalent, for task-tracked content, of what `/ingest` is for wiki sources. It depends entirely on a project having already run the Asana setup and provided its own `sync-mill` script; without those two things in place, there's nothing for this skill to wrap.
