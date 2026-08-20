## What it does

`collapse-session-folder` merges every same-day session wrap folder into one. When a day ends up with more than one `YYYY-MM-DD-*` folder because you ran several separate sessions, this skill scans for all of them, builds a combined slug out of the individual folder names, renumbers every file sequentially into the merged folder, repairs the "next" links between files that the renumbering would otherwise break, updates `sessions-index.md` to match, and deletes the now-empty originals.

It is called automatically at the end of `session-wrap`, but it is a complete skill in its own right and can be run any time a day's folders were left uncollapsed.

## When to reach for it

Run it whenever `git status` or a quick look at the sessions folder shows more than one folder for the same date. If only one folder (or none) matches the target date, there is nothing to do and the skill says so and stops.

By default it targets today. Pass a different date if you need to collapse an older day, but read the safety note below first.

## Path resolution

The skill does not hardcode where sessions live. It invokes `resolve-ai-paths` to resolve `SESSIONS_ROOT` (skipping the step that also resolves `PROMPTS_ROOT`, since it is not needed here) and substitutes that value everywhere it needs a path.

## Collapsing a past date is not free

Collapsing rewrites file paths and the `→ Next` links between them, which counts as rewriting committed history if those files have already been pushed. The skill will not do this silently for a past date: only collapse a day's folders if they have not yet reached a remote, or the rewrite is genuinely intended and the branch has not been shared. It will not collapse folders that are already part of a shared or public branch without you explicitly confirming that first.

## What the script actually does

Once the plan is printed (which folders, how many wraps each, and the combined slug they are collapsing into), the mechanical work is handed to a script rather than done step by step in conversation:

- Creates the combined folder
- Moves every file into it and reassigns the `NN-` prefix sequentially
- Merges the corresponding `sessions-index.md` rows, deduping projects and topics and summing wrap counts
- Repairs every `→ Next` link across the affected files, and adds a bridge link at folder junctions that never had one
- Deletes the original, now-empty folders

A non-zero exit from the script is treated as a hard stop: the skill shows the error and does not attempt to patch anything up itself.

## Common questions

**What if I only have one folder for the date?**
Nothing to collapse. The skill reports that and stops immediately.

**How is the combined slug chosen?**
From the existing folder names only, without reading file content: three to six kebab-case words pulled from the individual slugs, never a generic word like "session" or "misc".

**Is this safe to run on a folder that's already been pushed?**
Only with explicit confirmation, and only if you understand the rewrite touches file paths and links that other people may already be looking at.

## Where it fits

`collapse-session-folder` is a cleanup step inside the same-day session-wrap flow, not a standalone habit. Its closest neighbor is `extract-session-worktree`, which solves a different same-day problem: multiple concurrent sessions sharing one working directory rather than one session's own folders needing to be merged.
