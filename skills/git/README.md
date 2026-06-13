# Git

Skills for the full git and PR lifecycle — from discovering what needs committing to sweeping review debt across all repos.

- **[commit-wip](./commit-wip/SKILL.md)** — Scan all workspace repos for uncommitted changes, group files by topic, match each group to an existing remote branch (or create a categorised new one), and commit there. Keeps WIP on the semantically correct branch from the start.
- **[create-pr](./create-pr/SKILL.md)** — Verify branch hygiene, run the quality gate, and open a PR with a complete description via `gh pr create`. Optionally triggers a review bot.
- **[morning-pr-sweep](./morning-pr-sweep/SKILL.md)** — Clear all open PR review debt across your repos in one session. Triages all threads before touching any code, batches fixes into one commit per PR, posts SHA confirmations, and reports which PRs are merge-ready.
- **[open-pr-sweep](./open-pr-sweep/SKILL.md)** — Discover all non-draft open PRs across one or more GitHub orgs or users. Pure discovery — no writes.
- **[query-issues](./query-issues/SKILL.md)** — Query GitHub issues for a repo filtered by one or more labels (AND logic) and print a formatted list in chat. Pure discovery — no writes. Run at session start to find pending cross-repo work.
- **[repo-status](./repo-status/SKILL.md)** — Discover all workspace repos dynamically and produce a dirty-state table (repo, branch, dirty file count, clean/uncommitted status).
- **[respond-pr-review](./respond-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in any repo: gather every thread, reply inline before fixing, batch valid fixes into one commit, and post SHA follow-ups.
- **[review-pr](./review-pr/SKILL.md)** — Review an open GitHub PR on two axes — Standards (does the code follow the repo's own conventions?) and Spec (does it match the originating issue/PRD?). Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-branches](./sync-branches/SKILL.md)** — Fetch latest main, flag already-merged branches, pull each stale branch from origin, then merge main into every active branch. Works on one repo or many.
- **[wip-sweep](./wip-sweep/SKILL.md)** — Scope selection + tiered WIP commit/push/PR model (T1 scope → T2 local commit → T3 push → T4 draft PRs) with confirmation gates at each tier.
