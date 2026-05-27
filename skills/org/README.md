# Org

Skills specific to the LittleBranches organisation and its OSS quality standards. These skills require access to `LittleBranches/oss-quality-standards` and the companion private repo.

- **[audit-giselle-tests](./audit-giselle-tests/SKILL.md)** — Audit existing AI-generated tests in `giselle-mui` for quality problems: placeholder stubs, MUI-mock anti-patterns, and missing required test cases.
- **[create-giselle-component](./create-giselle-component/SKILL.md)** — Scaffold and TDD a new `giselle-mui` component from scratch. Enforces the OSS quality standards structure, API contract, and test patterns.
- **[create-giselle-pr](./create-giselle-pr/SKILL.md)** — Prepare a branch for a pull request in a LittleBranches repository: pre-loads AGENTS.md, runs the quality gate including banned-content scan, creates the PR with a complete description, and triggers a Copilot review.
- **[load-dependency-chain](./load-dependency-chain/SKILL.md)** — Read the `dependency-chain.md` file and extract the hard deadline, critical path, and phase status for each active repo.
- **[load-oss-standards](./load-oss-standards/SKILL.md)** — Verify access to the public and private LittleBranches AGENTS.md barrels and print a session health-check table.
- **[respond-giselle-pr-review](./respond-giselle-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in a LittleBranches repo: pre-load AGENTS.md + workflow rules, triage every thread, reply inline before fixing, batch valid fixes, and post SHA follow-ups.
- **[review-giselle-pr](./review-giselle-pr/SKILL.md)** — Review an open GitHub PR in a LittleBranches repository against the full OSS quality standards ruleset. Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-roadmap](./sync-roadmap/SKILL.md)** — Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and `data.tsx` `done` flags. Asana is the master; this skill flows changes downstream.
