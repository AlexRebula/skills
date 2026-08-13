---
name: extract-session-worktree
description: Split one Claude Code session's uncommitted changes out of a working directory that multiple concurrent sessions share, into its own isolated git worktree, branch, and PR — without touching any other session's pending work. Use when several sessions are running against the same checkout and each one needs its own branch/PR from only the files it actually touched.
---

# Extract Session Worktree

Moves one session's slice of a shared, multi-session-dirty working directory into its own git
worktree, ready for `/create-pr` (or a manual commit/push/`gh pr create`). Composes with
`/session-wrap` (run first) and `/create-pr`/`/wip-sweep` (run after) — this skill does not
duplicate either.

**Do not use this when the whole working directory belongs to one piece of work.** If `git status`
shows only files you yourself touched this session, this skill is overkill — go straight to
`/wip-sweep` or `/create-pr`. This skill exists specifically for the case where `git status` shows
a mix of files from multiple concurrent sessions and you need to extract only your own slice.

## Why this exists, not `git stash`

A stash stack is shared across every session touching the repo. Two real failure modes come from
treating it as a per-session hand-off point:

1. **Ambiguity.** `stash@{0}` could belong to any session. A prior incident
   (`raw/incidents/2026-07-02--blind-stash-pop-recurrence.md`) shows what happens when a stash
   belonging to unrelated work gets popped by mistake — merge conflicts, a leaked directory.
2. **HEAD collision.** Two sessions sharing one working directory cannot have two different
   branches checked out at once. Whichever session runs `git checkout -b` second yanks the branch
   out from under the first mid-flight.

Separate git worktrees solve both: each session gets its own directory *and* its own checked-out
branch simultaneously, off the same `.git`. No stash, no shared mutable ref, no HEAD race.

---

## Phase 1 — Confirm this is actually a multi-session situation

```sh
git worktree list
git status --short
```

If `git worktree list` shows more than one entry already, another session may already be isolated
— check before assuming the shared directory is the only copy. If `git status` shows only files
you recognize from this session, stop here and use `/wip-sweep` or `/create-pr` directly instead.

## Phase 2 — Run `/session-wrap` first

Do this before extracting anything — the wrap file and its `sessions-index.md` row become part of
this session's own file set, extracted right alongside the rest.

**Known gap: session-wrap assumes one linear thread per day.** If today's session folder under
`{{SESSIONS_ROOT}}` already belongs to a different, still-active concurrent session, `/session-wrap`
will want to wire a `→ Next` backlink into that session's last file. Don't do that — it means
editing a file that isn't yours. Skip the backlink for this run; leave a note in your own wrap file
under Pending Tasks that the chain is expected to self-heal via `/session-wrap`'s own Step 0b link
integrity check, the next time anyone runs it after both sessions' PRs have landed in the default
branch. Do not "fix" the chain by hand — that means touching the other session's file, which is
exactly what this skill exists to avoid.

## Phase 3 — Enumerate exactly what's yours

This is a judgment step — nothing here is scriptable, because "which lines are mine" depends on
this conversation's own history, not on anything derivable from the file alone.

Sort every dirty/untracked path from `git status --short` into three buckets:

- **A — fully yours.** You created the file, or every line in its diff is something you wrote this
  session. Confirm with `git diff -- <path>`; if the diff is 100% recognizable as yours, it's bucket A.
- **B — shared append-only file, partially yours.** Files every session's skills write to
  (`wiki/log.md`, `raw/sessions/sessions-index.md`, and similar) accumulate lines from *every*
  concurrent session in the same uncommitted diff. Run `git diff -- <path>` and read every added
  line — do not assume the whole diff is yours just because you touched the file. If some lines are
  yours and some aren't, it's bucket B.
- **C — not yours at all.** You never touched it. Leave it completely alone, for the owning
  session to extract the same way.

Bucket A files go through Phases 4–6 as whole files. **Bucket B files never go through
`copy-to-worktree.sh` or `revert-in-source.sh`** — copying or reverting the whole file would drag
another session's uncommitted lines into your branch, or strand them. Bucket B gets the manual
surgical treatment in Phase 5b.

## Phase 4 — Create the worktree

> **Locating the scripts.** `scripts/*.sh` sit **next to this file, in the skill directory** — not
> in the repo you're extracting from. Substitute your own skill directory for `$SKILL` below; for a
> default install that is `~/.claude/skills/extract-session-worktree`.

```sh
"$SKILL/scripts/new-worktree.sh" <repo-root> <worktree-path> <branch-name>
```

This cuts the new branch from the repo's fetched `origin/<default-branch>` tip — **never the
current local HEAD**, which can be stale without anyone noticing (already merged into the default
branch, sitting one or more commits behind `origin`). Verify the branch name against this repo's
own naming convention (check `wiki/concepts/pr-conventions.md` or equivalent, and recent merged PR
branch names via `git log --oneline --merges`) rather than inventing one — conventions drift from
what's documented to what's actually used, so prefer real precedent over a stale doc.

## Phase 5 — Extract

### 5a. Bucket A — whole files

```sh
"$SKILL/scripts/copy-to-worktree.sh" <repo-root> <worktree-path> <file1> [file2 ...]
```

Copies each file, verifying byte-identical afterward. Non-destructive — the source repo is
untouched at this point. Regular files only — a directory or symlink isn't expanded; if a
whole new directory belongs to bucket A, pass its member files individually.

**Before reverting anything in the source, verify the copy is correct** — run the new worktree's
own test suite / lint / build if it has one, not just a file diff, so a broken extraction is caught
before the source repo's only copy is removed.

### 5b. Bucket B — shared append-only files

By hand, in two steps:

1. **In the new worktree**, starting from its clean `origin/<default-branch>` baseline copy of the
   file, append *only* your lines (the ones you identified as yours in Phase 3).
2. **In the source repo**, remove *only* your lines from the file, leaving every other session's
   lines exactly as they were — same line ordering, same content, untouched.

Do this with a text-editing tool that shows you the exact before/after diff (not a script) — the
whole point of bucket B is that "whole file" operations are unsafe here.

## Phase 6 — Revert bucket A in the source repo

**Only after Phase 5's verification passes:**

```sh
"$SKILL/scripts/revert-in-source.sh" <repo-root> <file1> [file2 ...]
```

Restores files that existed in HEAD to their committed content (index + working tree); deletes
files that didn't exist in HEAD (new this session), whether or not they were staged. Self-verifies
and exits nonzero if anything is still dirty afterward — treat a nonzero exit as a hard stop, not
something to retry blindly.

## Phase 7 — Final verification (do not skip this)

**This is the step that's easiest to get wrong.** Re-check both repos explicitly:

```sh
# In the source repo — bucket A files must show zero diff; bucket B files
# must show only other sessions' lines (re-read them, don't just skim):
git diff --stat -- <bucket-A-files>
git diff -- <bucket-B-files>

# In the new worktree — should contain exactly this session's slice, nothing more:
git status --short
git diff --stat
```

A first pass that "looks right" is not the same as verified. On the run that produced this skill,
a bucket B file (`wiki/log.md`) was correctly appended to in the new worktree but the corresponding
removal in the source repo was simply forgotten — the mistake was only caught because Phase 7's
diff check was run explicitly afterward, not because anything failed loudly. Don't skip this phase
because Phases 5–6 "went fine."

## Phase 8 — Commit, push, PR

Hand off to `/create-pr` (or commit/push/`gh pr create` directly) from inside the new worktree.
This skill's job ends once the worktree contains exactly the right files, verified — it does not
duplicate PR-creation logic.

If the session touched more than one repo, repeat Phases 1–8 once per repo — each repo gets its own
worktree, branch, and PR. There is no way to combine changes from two different repos into one PR.
