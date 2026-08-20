## What it does

`sync-roadmap` pulls task statuses out of Asana and writes them back into each repo's `docs/roadmap.md`, and into `data.tsx` where one exists, updating the `done` flags that drive a visual timeline. The direction is fixed and one-way: Asana is the master, and this skill only ever flows changes downstream from it. If a phase is already marked done in the markdown and Asana agrees, nothing gets touched.

## When to reach for it

Run it whenever Asana has moved and the docs haven't caught up: after marking phases or milestones done in Asana, at the start of a session where you want `roadmap.md` accurate before work begins, or after a seed run to confirm the round trip actually holds.

| Your situation | Where to go |
| --- | --- |
| Asana statuses changed and the docs need to reflect it | `sync-roadmap`, or `sync-roadmap <repo-name>` for just one |
| You want every configured repo synced | `sync-roadmap all`, or omit the argument |
| The roadmap and Asana have actually diverged in what they mean, not just in status | Fix the mismatch in Asana or the file by hand first, then sync |

Argument: a repo name (e.g. `giselle-mui`) to sync just that one, or `all` / omitted to sync everything listed in the config.

## Prerequisites

`.asana-config.json` at the project root, holding the Asana token, a map of repo name to project GID, and the status custom field's GID plus its option-label-to-GID map. Without an entry for a given repo in that `projects` map, the skill skips it and logs a warning rather than guessing a project.

## Matching is by name, and only by name

Phases in `roadmap.md` get matched to Asana tasks by name, case-insensitive, ignoring emoji prefixes; milestones under a phase get matched to Asana subtasks the same way. If a phase was renamed in Asana but not in the markdown, or the reverse, it stops matching and nothing updates for that row. There's no fuzzy semantic matching layered on top of that; a rename in one place and not the other is a manual fix, then a re-run.

## What actually gets touched, and what doesn't

In `roadmap.md`, only the leading status symbol (`⬜`, `🔄`, `✅`) on a phase row and the checkbox on a milestone bullet change. Headings, descriptions, and table structure are left alone. In `data.tsx`, only the `done` boolean on each `TimelinePhase` and its milestones changes; icon, side, variant, color, and description are untouched. If `data.tsx` can't be parsed reliably (nonstandard formatting, nested expressions the skill isn't confident rewriting), it's skipped with a warning rather than risking a corrupted file.

Status mapping is fixed: an Asana task with `completed: true` counts as done regardless of what its custom field says; otherwise `done`/`completed` maps to `✅`, `in-progress`/`in_progress` to `🔄`, and anything else (including no status set) to `⬜`.

## Common questions

**Why is the sync one-way? What if I want to push a local edit back up to Asana?**

That's a different tool. This skill is specifically the Asana-is-master downstream flow; pushing a local change up would mean the master isn't actually Asana, which changes what "sync" means for every other repo relying on this direction being fixed.

**A phase matched but no milestones under it did. Why?**

Milestone matching runs independently of phase matching, against Asana subtask names under that same task. A milestone bullet whose wording drifted from the subtask name (even by punctuation) won't match even though its parent phase did.

**Does this commit automatically?**

Yes, per repo, only when that repo's diff is non-empty, with a `chore: sync roadmap status from Asana` commit dated to the run. It does not push; pushing is left to you.

**What about custom fields beyond status, like icon or side?**

Not synced. The skill only reads the status custom field. Extending Phase 4 to cover more fields requires those fields to exist on the Asana project first.

## It's working if

- A phase already showing `✅` in the markdown that Asana also marks done produces no diff at all.
- Every repo with an entry in `.asana-config.json`'s `projects` map gets attempted; every repo without one gets a skip warning, not a silent no-op.
- `data.tsx` files that don't parse cleanly get skipped and reported, never partially rewritten.
- The end-of-run summary lists every repo with either what changed, "no matches found," or "already in sync," and nothing is missing from that list.
- Nothing beyond `roadmap.md` and `data.tsx`'s `done` flags changes in a repo this skill touched.

## Where it fits

`sync-roadmap` is a standalone, one-way flow rather than a step in a build chain. It's typically run at session start alongside [load-dependency-chain](./load-dependency-chain.md) when the day's work depends on the roadmap actually reflecting where each repo stands in Asana.
