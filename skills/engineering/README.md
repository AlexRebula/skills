# Engineering

Framework-agnostic skills for code craft, architecture, and problem-solving.

- **[create-pr](./create-pr/SKILL.md)** — Verify branch hygiene, run the quality gate, and create a PR with a complete description via `gh pr create`. Optionally triggers a review bot.
- **[create-giselle-pr](./create-giselle-pr/SKILL.md)** — Same as create-pr but for LittleBranches repos: pre-loads AGENTS.md, runs banned-content scan, includes `data/` branch prefix, triggers Copilot review by default, and optionally creates a companion doc in `docs/pr-messages/`.

> **Note:** Both skills have mirrors at `.agents/skills/create-pr/SKILL.md` and `.agents/skills/create-giselle-pr/SKILL.md` for Claude Code agent discovery.
- **[diagnose](./diagnose/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates `CONTEXT.md` and ADRs inline.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — Find deepening opportunities in a codebase, informed by the domain language in `CONTEXT.md` and the decisions in `docs/adr/`.
- **[prototype](./prototype/SKILL.md)** — Build a throwaway prototype to flesh out a design — either a runnable terminal app for state/business-logic questions, or several radically different UI variations toggleable from one route.
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — Scaffold the per-repo config (issue tracker, triage label vocabulary, domain doc layout) that the other engineering skills consume.
- **[start-issue](./start-issue/SKILL.md)** — Bootstrap a session from a GitHub issue number: reads the issue, checks blockers, loads codebase context, and routes to `/tdd` or `/grill-me` based on the triage label.
- **[tdd](./tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[to-issues](./to-issues/SKILL.md)** — Break any plan, spec, or PRD into independently-grabbable GitHub issues using vertical slices.
- **[to-prd](./to-prd/SKILL.md)** — Turn the current conversation context into a PRD and submit it as a GitHub issue.
- **[triage](./triage/SKILL.md)** — Triage issues through a state machine of triage roles.
- **[zoom-out](./zoom-out/SKILL.md)** — Tell the agent to zoom out and give broader context or a higher-level perspective on an unfamiliar section of code.
