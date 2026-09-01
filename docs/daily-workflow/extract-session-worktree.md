## What it does

`extract-session-worktree` pulls one session's uncommitted changes out of a working directory that several concurrent sessions are sharing, and moves that slice, and only that slice, into its own isolated git worktree, branch, and eventually a PR. Nothing belonging to any other session's pending work gets touched.

## When to reach for it

This is for a specific and fairly narrow situation: `git status` in a shared checkout shows a mix of files from more than one active session, and you need to peel your own contribution out without disturbing anyone else's. If `git status` shows only files you yourself touched this session, this skill is overkill; go straight to `wip-sweep` or `create-pr`. And if your setup already gives every session its own dedicated worktree, there is nothing to extract in the first place, because `git status` in your own worktree only ever shows your own files.

## Why not just `git stash`

A stash stack is shared across every session touching the repo, which creates two real failure modes rather than hypothetical ones. A stash entry like `stash@{0}` could belong to any session, and a stash belonging to unrelated work has already been popped by mistake in practice, causing merge conflicts and a leaked directory. Separately, two sessions sharing one working directory cannot have two branches checked out at once, so whichever session runs `git checkout -b` second yanks the branch out from under the first mid-flight. Separate worktrees solve both at once: each session gets its own directory and its own checked-out branch simultaneously, off the same `.git`, with no shared mutable ref and no HEAD race.

## The eight phases

1. **Confirm this is actually a multi-session situation.** Check `git worktree list` and `git status --short` before assuming the shared directory is the only copy.
2. **Run `session-wrap` first**, so the wrap file becomes part of this session's own file set and gets extracted along with everything else. If today's session folder already belongs to a different, still-active session, do not wire a "next" backlink into it; leave a note in your own wrap file instead and let the chain self-heal later.
3. **Sort every dirty path into three buckets.** Bucket A is fully yours: you wrote every line of that diff. Bucket B is a shared append-only file (things like a shared log or session index) that carries lines from multiple concurrent sessions in one diff, and needs every added line read individually rather than assumed. Bucket C is not yours at all, and gets left completely alone.
4. **Create the worktree**, cut from the fetched `origin/<default-branch>` tip, never from local HEAD, which can be stale without anyone noticing.
5. **Extract bucket A** with a copy script that verifies the copy is byte-identical, and run the new worktree's own tests, lint, or build before touching the source repo.
6. **Extract bucket B by hand**: append only your lines to the new worktree's clean baseline copy, and separately remove only your lines from the source repo, leaving every other session's lines exactly as they were. This step deliberately avoids scripting, because whole-file operations are unsafe here.
7. **Revert bucket A in the source repo**, only after phase 5's verification passed, using a script that self-verifies and exits non-zero if anything is still dirty afterward.
8. **Verify both repos explicitly**, one more time: zero diff on bucket A files in the source, only other sessions' lines on bucket B files, and exactly your own slice in the new worktree. This phase is the one most likely to get skipped because phases 5 and 6 "went fine", and it is exactly the phase that caught a real forgotten removal on the run that produced this skill.

Once the worktree contains exactly the right files, verified, the skill hands off to `create-pr` (or a manual commit, push, and `gh pr create`) rather than duplicating any of that logic itself.

## Common questions

**What if my session touched more than one repo?**
Repeat the whole flow once per repo. There is no way to combine changes from two different repos into one PR.

**Where do the helper scripts live?**
Next to the skill file itself, not in the repo being extracted from. For a default install that is `~/.claude/skills/extract-session-worktree/scripts/`.

**What if I skip the final verification phase?**
That is the one documented way this has actually gone wrong: a bucket B file was correctly appended to in the new worktree, but the matching removal in the source repo was simply forgotten, and only an explicit diff check afterward caught it.

## Where it fits

`extract-session-worktree` composes with `session-wrap`, which it expects to have already run, and hands off to `create-pr` once the new worktree is clean. It solves a problem that only exists in a shared, multi-session checkout; if every session already runs in its own worktree, this skill has nothing to do.
