## What it does

`resolve-ai-paths` resolves the filesystem paths that a handful of other skills need before they can do anything: `SESSIONS_ROOT`, `PROMPTS_ROOT`, `MORNING_BRIEFS_ROOT`, and `SKILLS_ROOT`. It's called by those skills, not by you directly: a calling skill invokes it, gets back resolved values, and substitutes them through its own steps.

The reason it exists as a separate skill rather than logic duplicated inside `/session-wrap`, `/standup-prep`, and the rest: every one of those skills needs the same paths, resolved the same way, and inlining the resolution in each of them would mean fixing the same bug four times whenever the resolution logic needs to change.

## When it runs

If your setup supports template variable substitution, define `SESSIONS_ROOT`, `PROMPTS_ROOT`, `MORNING_BRIEFS_ROOT`, and `SKILLS_ROOT` in your tool's configuration and this skill has nothing to do: the values just arrive already substituted. When they don't, or when a calling skill notices one of them is still the literal placeholder text rather than a real path, it invokes `/resolve-ai-paths` before continuing.

## How each root gets found

Each path resolution stops at the first check that succeeds, in this order:

1. **Already substituted**: if the template variable is a real filesystem path rather than the literal placeholder text, use it.
2. **A workspace scan for the marker file**: `sessions-index.md` for `SESSIONS_ROOT`, `prompts-index.md` for `PROMPTS_ROOT`, `morning-briefs-index.md` (or a `morning-briefs` folder) for `MORNING_BRIEFS_ROOT`, `scripts/collapse-sessions.ts` for `SKILLS_ROOT`.
3. **Ask**: if the scan turns up nothing, or turns up more than one candidate, the skill asks directly rather than guessing.

`PROMPTS_ROOT` and `MORNING_BRIEFS_ROOT` get a small shortcut first: both are commonly siblings of `SESSIONS_ROOT` in the same parent folder, so that's checked before falling back to a full workspace scan.

`PROMPTS_ROOT` and `SKILLS_ROOT` are the two roots allowed to come back unresolved. A calling skill that doesn't use one of them skips that step entirely; a calling skill that does use it and gets `not found` back is expected to skip or hand-hold the affected step rather than fail outright.

## Common questions

**Do I ever invoke this myself?**
Rarely. It's designed to be called from inside another skill's own steps, right when that skill notices a path variable hasn't resolved. You'll see its output (the `✔`/`⚠` lines) surface inside whatever skill triggered it.

**What if the workspace scan finds two candidates?**
It lists both and asks which one to use rather than picking silently. A workspace with two sessions folders is unusual but not impossible, and guessing wrong here would misdirect every write that skill makes afterward.

**What happens if `SKILLS_ROOT` can't be found?**
Anything that would invoke `collapse-sessions.ts` gets skipped or handled manually. Nothing else in the calling skill needs to fail because of it.

## It's working if

- A calling skill never has to ask you for a path it could have resolved itself.
- The same workspace resolves to the same paths run after run, without re-scanning turning up a different answer.
- An unresolved optional root (`PROMPTS_ROOT`, `SKILLS_ROOT`) degrades the calling skill gracefully instead of stopping it cold.

## Where it fits

`resolve-ai-paths` is infrastructure for the rest of the productivity set rather than something you reach for on its own. `/session-wrap` and `/standup-prep` both lean on it at their own preflight, and anything you build that reads or writes to the sessions, prompts, or morning-briefs folders should call it too instead of inlining its own path-guessing logic.
