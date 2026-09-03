## What it does

`sync-up` promotes a chosen file list from your working repo into your target repo via a reviewed PR, but only after every configured gate passes: your own quality-gate command, a built-in privacy/secret scan (always on, no configuration needed), and an optional banned-content check (only if you've set one up). A single failing gate blocks the promotion entirely and leaves the target repo completely untouched. On a full pass, it opens a normal PR using your own already-authenticated `gh` session. It never merges that PR: reviewing and merging stays your own call.

It's the last skill in a three-skill family: `sync-status` reports drift with no side effects, `sync-down` pulls incoming changes in behind a quality gate, and `sync-up` (this one) promotes your own changes back out behind three gates and a reviewed PR.

## When to reach for it

Ask for it with "sync up," "promote this to production," or "open a promotion PR." Run it once you've built something in your working repo worth promoting out, and you've chosen exactly which files should move.

## The three gates

1. **Your quality-gate command**, run against the chosen files staged in a throwaway copy of your target repo, same mechanism `sync-down` uses.
2. **The built-in privacy/secret scan**, run directly against the chosen files in your working repo: email addresses (with a documented allowlist for placeholder addresses), phone numbers, and common secret-key shapes (cloud access keys, PEM private key blocks). Detection only, never modifies anything, and needs no configuration.
3. **The optional banned-content check**: patterns you supply yourself in a gitignored `.banned-patterns.local` file at your working repo's root, one per line, `#`-comments and blank lines skipped. Skipped entirely, not an error, if you never create that file.

All three must pass for a PR to open at all.

## It's working if

- A full pass opens a real PR into your target repo, and any single failing gate opens nothing and changes nothing there.
- The privacy scan and banned-content check never modify the files they check.
- A promotion PR is never auto-merged: it's a normal PR, awaiting your own review.
- A `.banned-patterns.local` file you create is picked up automatically on the next run and added to `.gitignore` the first time `sync-up` sees it.

## Where it fits

`sync-up` shares its config and quality-gate logic with `sync-status` and `sync-down` via `skills/_shared/sync-core/`, the same tested module underlying all three, so a fix there fixes it everywhere. Run `sync-status` first if you want to confirm what's drifted before choosing what to promote.
