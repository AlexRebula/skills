# Engineering

Skills I use daily for code work.

- **[diagnose](./diagnose/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates `CONTEXT.md` and ADRs inline.
- **[morning-pr-sweep](./morning-pr-sweep/SKILL.md)** — Clear all open PR review debt across every LittleBranches repo in one session. Discovers every open PR, triages all threads before touching any code, batches fixes into one commit per PR, posts SHA confirmations, and reports which PRs are merge-ready. Run this first every morning.
- **[respond-pr-review](./respond-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in any repo: gather every thread, reply inline before fixing, batch valid fixes into one commit, and post SHA follow-ups.
- **[respond-giselle-pr-review](./respond-giselle-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in a LittleBranches repo: preload AGENTS.md + workflow rules, reply inline before fixing, batch valid fixes, and audit commitments.
- **[triage](./triage/SKILL.md)** — Triage issues through a state machine of triage roles.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — Find deepening opportunities in a codebase, informed by the domain language in `CONTEXT.md` and the decisions in `docs/adr/`.
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — Scaffold the per-repo config (issue tracker, triage label vocabulary, domain doc layout) that the other engineering skills consume.
- **[tdd](./tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[to-issues](./to-issues/SKILL.md)** — Break any plan, spec, or PRD into independently-grabbable GitHub issues using vertical slices.
- **[to-prd](./to-prd/SKILL.md)** — Turn the current conversation context into a PRD and submit it as a GitHub issue.
- **[zoom-out](./zoom-out/SKILL.md)** — Tell the agent to zoom out and give broader context or a higher-level perspective on an unfamiliar section of code.
- **[prototype](./prototype/SKILL.md)** — Build a throwaway prototype to flesh out a design — either a runnable terminal app for state/business-logic questions, or several radically different UI variations toggleable from one route.
- **[commit-wip](./commit-wip/SKILL.md)** — Scan all workspace repos for uncommitted changes, group files by topic, match each group to an existing remote branch (or create a categorised new one), and commit there. Keeps WIP on the semantically correct branch from the start.
- **[sync-roadmap](./sync-roadmap/SKILL.md)** — Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and `data.tsx` `done` flags. Asana is master; this skill flows changes downstream.
- **[load-oss-standards](./load-oss-standards/SKILL.md)** — Verify access to public and private LittleBranches AGENTS.md files and print the session health table.
- **[load-dependency-chain](./load-dependency-chain/SKILL.md)** — Read the dependency-chain.md file and extract hard deadline, critical path, and phase status.
- **[repo-status](./repo-status/SKILL.md)** — Discover all workspace repos dynamically and produce a dirty state table.
- **[wip-sweep](./wip-sweep/SKILL.md)** — Scope selection + tiered WIP commit/push/PR model (T1 scope → T2 local commit → T3 push → T4 draft PRs).
- **[open-pr-sweep](./open-pr-sweep/SKILL.md)** — Discover all non-draft open PRs across LittleBranches and AlexRebula orgs.
- **[asana-sync](./asana-sync/SKILL.md)** — Opt-in Asana sync: create Morning Briefs section, seed tasks, post status update, and log results.
