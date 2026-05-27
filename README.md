<p>
  <img alt="Skills For Real Engineers — AlexRebula Fork" src="./public/images/mattpocock-alexrebula-skills-banner.png" width="738">
</p>

# Skills For Real Engineers — AlexRebula Fork

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

A fork of [mattpocock/skills](https://github.com/mattpocock/skills) by [Matt Pocock](https://github.com/mattpocock). All original skills are unchanged and included here. This fork extends them with:

- **Framework scaffolding** — React, Vue, and Angular component creation with a consistent two-phase scaffold + TDD loop
- **Git & PR lifecycle** — WIP commits, PR creation, PR review, and morning review-debt sweeps
- **LittleBranches org** — component scaffolding, quality-gate enforcement, and PR review workflows for the [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards)
- **Daily workflow** — session wrapping, Asana sync, and standup orchestration

## Install

```bash
npx skills@latest add AlexRebula/skills
```

Then run `/setup-matt-pocock-skills` once per repo to configure the issue tracker, domain docs, and triage labels.

---

## Engineering

Framework-agnostic skills for code craft, architecture, and problem-solving.

- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates `CONTEXT.md` and ADRs inline.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — Find deepening opportunities in a codebase, informed by the domain language in `CONTEXT.md` and the decisions in `docs/adr/`.
- **[prototype](./skills/engineering/prototype/SKILL.md)** — Build a throwaway prototype to flesh out a design — either a runnable terminal app for state/business-logic questions, or several radically different UI variations.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — Scaffold the per-repo config (issue tracker, triage label vocabulary, domain doc layout) that the other engineering skills consume.
- **[tdd](./skills/engineering/tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[to-issues](./skills/engineering/to-issues/SKILL.md)** — Break any plan, spec, or PRD into independently-grabbable GitHub issues using vertical slices.
- **[to-prd](./skills/engineering/to-prd/SKILL.md)** — Turn the current conversation context into a PRD and submit it as a GitHub issue.
- **[triage](./skills/engineering/triage/SKILL.md)** — Triage issues through a state machine of triage roles.
- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — Tell the agent to zoom out and give broader context or a higher-level perspective on an unfamiliar section of code.

---

## Framework

Framework-specific scaffolding. Each skill follows a consistent two-phase workflow: scaffold first (types, test stubs, README), then implement (TDD vertical slices).

- **[create-angular-component](./skills/framework/create-angular-component/SKILL.md)** — Scaffold and TDD a new Angular 17+ standalone component. Uses signal-based inputs/outputs and Angular Testing Library.
- **[create-react-component](./skills/framework/create-react-component/SKILL.md)** — Scaffold and TDD a new React component from scratch. Framework-agnostic — no MUI dependency.
- **[create-vue-component](./skills/framework/create-vue-component/SKILL.md)** — Scaffold and TDD a new Vue 3 single-file component. Uses Composition API with `<script setup>`, `defineProps` generics, and `@testing-library/vue`.

---

## Git

Skills for the full git and PR lifecycle — from discovering what needs committing to sweeping review debt across all repos.

- **[commit-wip](./skills/git/commit-wip/SKILL.md)** — Scan all workspace repos for uncommitted changes, group files by topic, match each group to an existing remote branch (or create a categorised new one), and commit there.
- **[create-pr](./skills/git/create-pr/SKILL.md)** — Verify branch hygiene, run the quality gate, and open a PR with a complete description via `gh pr create`. Optionally triggers a review bot.
- **[morning-pr-sweep](./skills/git/morning-pr-sweep/SKILL.md)** — Clear all open PR review debt across your repos in one session. Triages all threads before touching any code, batches fixes into one commit per PR, and reports which PRs are merge-ready.
- **[open-pr-sweep](./skills/git/open-pr-sweep/SKILL.md)** — Discover all non-draft open PRs across one or more GitHub orgs or users. Pure discovery — no writes.
- **[repo-status](./skills/git/repo-status/SKILL.md)** — Discover all workspace repos dynamically and produce a dirty-state table (repo, branch, dirty file count, clean/uncommitted status).
- **[respond-pr-review](./skills/git/respond-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in any repo: gather every thread, reply inline before fixing, batch valid fixes into one commit, and post SHA follow-ups.
- **[review-pr](./skills/git/review-pr/SKILL.md)** — Review an open GitHub PR on two axes — Standards (does the code follow the repo's own conventions?) and Spec (does it match the originating issue/PRD?). Posts findings via the GitHub PR Reviews API with inline line comments.
- **[wip-sweep](./skills/git/wip-sweep/SKILL.md)** — Scope selection + tiered WIP commit/push/PR model (T1 scope → T2 local commit → T3 push → T4 draft PRs) with confirmation gates at each tier.

---

## Organisation (LittleBranches)

Skills specific to the [LittleBranches](https://github.com/LittleBranches) organisation and its [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards). These skills require access to the LittleBranches AGENTS.md barrels.

- **[audit-giselle-tests](./skills/org/audit-giselle-tests/SKILL.md)** — Audit existing AI-generated tests in `giselle-mui` for quality problems: placeholder stubs, MUI-mock anti-patterns, and missing required test cases.
- **[create-giselle-component](./skills/org/create-giselle-component/SKILL.md)** — Scaffold and TDD a new `giselle-mui` component following OSS Quality Standards rules — two-phase: scaffold (types, test stubs, README), then implement (TDD vertical slices with real ThemeProvider).
- **[create-giselle-pr](./skills/org/create-giselle-pr/SKILL.md)** — Prepare a branch for a PR in a LittleBranches repo: pre-loads AGENTS.md, runs the quality gate including banned-content scan, creates the PR with a complete description, and triggers a Copilot review.
- **[load-dependency-chain](./skills/org/load-dependency-chain/SKILL.md)** — Read the `dependency-chain.md` file and extract the hard deadline, critical path, and phase status for each active repo.
- **[load-oss-standards](./skills/org/load-oss-standards/SKILL.md)** — Verify access to the public and private LittleBranches AGENTS.md barrels and print a session health-check table.
- **[respond-giselle-pr-review](./skills/org/respond-giselle-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in a LittleBranches repo: pre-load AGENTS.md + workflow rules, triage every thread, reply inline before fixing, batch valid fixes, and post SHA follow-ups.
- **[review-giselle-pr](./skills/org/review-giselle-pr/SKILL.md)** — Review an open GitHub PR in a LittleBranches repository against the full OSS quality standards ruleset. Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-roadmap](./skills/org/sync-roadmap/SKILL.md)** — Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and `data.tsx` `done` flags. Asana is the master; this skill flows changes downstream.

---

## Productivity

General workflow tools, not code-specific.

- **[asana-sync](./skills/productivity/asana-sync/SKILL.md)** — Opt-in Asana sync for morning briefs: locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[caveman](./skills/productivity/caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[check-prior-work](./skills/productivity/check-prior-work/SKILL.md)** — Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[load-session-context](./skills/productivity/load-session-context/SKILL.md)** — Load the session index and latest wrap file; check for an existing morning brief for today.
- **[collapse-session-folder](./skills/productivity/collapse-session-folder/SKILL.md)** — Collapse all same-day session wrap folders into one combined folder. Repairs → Next footer links and updates sessions-index.md. Called automatically by /session-wrap.
- **[resolve-ai-paths](./skills/productivity/resolve-ai-paths/SKILL.md)** — Resolve `SESSIONS_ROOT` and `PROMPTS_ROOT` for AI workflow skills. Call this at the start of any skill that reads/writes sessions or prompts folders.
- **[session-wrap](./skills/productivity/session-wrap/SKILL.md)** — Write a session wrap doc, update the session index, and hand off to `/wip-sweep`. More powerful sibling of `/handoff`. Use at context >55% or after completing major work.
- **[standup-prep](./skills/productivity/standup-prep/SKILL.md)** — Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync.
- **[standup-prep-preflight](./skills/productivity/standup-prep-preflight/SKILL.md)** — Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[write-a-skill](./skills/productivity/write-a-skill/SKILL.md)** — Create new skills with proper structure, progressive disclosure, and bundled resources.

---

## Misc

Tools kept around but rarely used.

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — Migrate test files from `as` type assertions to @total-typescript/shoehorn.
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — Create exercise directory structures with sections, problems, solutions, and explainers.
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

---

## About the upstream repo

The original `mattpocock/skills` covers the core engineering philosophy: grilling sessions to align with the agent before writing a line of code, TDD loops for consistent feedback, architecture reviews to prevent entropy. For the full motivation and background, see [mattpocock/skills](https://github.com/mattpocock/skills).
