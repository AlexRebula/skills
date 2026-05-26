<p>
  <img alt="Skills For Real Engineers — LittleBranches Fork" src="./public/images/mattpocock-alexrebula-skills-banner.png" width="738">
</p>

# Skills For Real Engineers — LittleBranches Fork

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

> **This is a fork of [mattpocock/skills](https://github.com/mattpocock/skills)** by [Matt Pocock](https://github.com/mattpocock).
> The original skills are unchanged and fully included here.
> This fork adds purpose-built skills designed to work alongside the
> [LittleBranches OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards).

## Installing this fork

```bash
npx skills@latest add AlexRebula/skills
```

Then run `/setup-matt-pocock-skills` once per repo to configure the issue tracker, domain docs, and triage labels.

## Why this fork exists

The original `mattpocock/skills` repo is model-agnostic and project-agnostic by design. This fork adds skills that grew out of the [LittleBranches](https://github.com/LittleBranches) open-source project and the [giselle-mui](https://github.com/LittleBranches/giselle-mui) component library — but most of them encode general-purpose workflows:

- **Component creation** (`create-react-component`, `create-vue-component`, `create-angular-component`) — two-phase scaffold + TDD, independent of any specific project or framework opinions.
- **PR review and response** — there are 269+ AI code review tools on GitHub. All of them stop at "post the review and walk away". These two skills model both sides of the review conversation: `/review-pr` runs a **two-axis** review (Standards: your repo's own `AGENTS.md`/ADRs, not generic rules; Spec: the originating issue or PRD) with parallel sub-agents; `/respond-pr-review` automates the **author's response** — triage every thread, reply inline before touching code, batch fixes into one commit, post SHA confirmations. The upstream `mattpocock/skills` has no PR review skill at all.
- **Daily workflow tools** (`repo-status`, `wip-sweep`, `commit-wip`, `open-pr-sweep`, `session-wrap`) — work in any multi-repo git workspace.
- **Asana integration** (`asana-sync`, `sync-roadmap`) — work with any project that has an `.asana-config.json`.

A handful of skills still carry specific hardcoding — org names, standards URLs, or file path conventions — and are tracked for generalization in [docs/generalization.md](./docs/generalization.md).

For the philosophy behind the base skills, see [mattpocock/skills → Why These Skills Exist](https://github.com/mattpocock/skills#why-these-skills-exist).

---

## Reference

### LittleBranches additions

Skills added by this fork — not in the upstream `mattpocock/skills`. Most work in any project; a few still carry specific hardcoding and are tracked for generalization in [docs/generalization.md](./docs/generalization.md).

#### Component creation

| Skill | What it does |
| --- | --- |
| [`/create-giselle-component`](./skills/engineering/create-giselle-component/SKILL.md) | Scaffold and TDD a new giselle-mui component following OSS Quality Standards rules — two-phase: scaffold first (types, test stubs, README, roadmap), then implement one vertical slice at a time. |
| [`/audit-giselle-tests`](./skills/engineering/audit-giselle-tests/SKILL.md) | Classify and fix AI-generated tests that use the MUI-mocking anti-pattern (`vi.mock("@mui/material/...")`), replacing them with real-ThemeProvider tests via `renderWithTheme`. |
| [`/create-react-component`](./skills/engineering/create-react-component/SKILL.md) | Scaffold and TDD a new React component — no framework dependency, plain RTL, same two-phase scaffold/TDD workflow. |
| [`/create-vue-component`](./skills/engineering/create-vue-component/SKILL.md) | Scaffold and TDD a new Vue 3 standalone component — `<script setup>`, `defineProps` generics, `@testing-library/vue`. |
| [`/create-angular-component`](./skills/engineering/create-angular-component/SKILL.md) | Scaffold and TDD a new Angular 17+ standalone component — signal-based `input()`/`output()`, `OnPush`, Angular Testing Library. |
| [`/create-pr`](./skills/engineering/create-pr/SKILL.md) | Prepare a branch for a PR — verify branch hygiene, run the quality gate, create the PR via `gh pr create` with a well-formed description, and optionally request a review. |
| [`/create-giselle-pr`](./skills/engineering/create-giselle-pr/SKILL.md) | LittleBranches variant of `/create-pr` — pre-loads OSS quality standards and banned-content scan, triggers Copilot review by default, optionally creates a companion doc in `docs/pr-messages/`. |

#### PR review

| Skill | What it does |
| --- | --- |
| [`/review-giselle-pr`](./skills/engineering/review-giselle-pr/SKILL.md) | Review an open GitHub PR in any LittleBranches repo — pre-loads public and private AGENTS.md barrels, maps changed files to relevant sections, posts findings via the GitHub PR Reviews API with inline line comments. |
| [`/review-pr`](./skills/engineering/review-pr/SKILL.md) | Two-axis review of any open GitHub PR. **Standards axis**: reads your repo's own `AGENTS.md`, `CLAUDE.md`, ADRs — and extracts any reviewer-scope note (e.g. "only §1–§4 apply") to constrain the review. **Spec axis**: fetches the linked issue or PRD and checks whether the diff faithfully implements it. Both axes run as parallel sub-agents and post findings as inline line comments via the GitHub PR Reviews API. |
| [`/respond-giselle-pr-review`](./skills/engineering/respond-giselle-pr-review/SKILL.md) | Respond to an existing Copilot PR review in a LittleBranches repo — pre-load the public and private AGENTS.md barrels plus the review workflow, triage every thread, reply inline before fixing, batch valid fixes, and post SHA follow-ups. |
| [`/respond-pr-review`](./skills/engineering/respond-pr-review/SKILL.md) | The **author's response** workflow — automates the side of code review that no other tool touches. Gathers every review thread, triages each with a 5-way verdict (✅ valid / ❌ not valid / ⚠️ partial / ⏸️ needs branch-owner input / ⏭️ valid but deferred → open an issue first), replies inline **before** touching any code, batches all fixes into one commit, and posts SHA follow-ups in the correct nested thread (not as a new top-level review). |
| [`/morning-pr-sweep`](./skills/engineering/morning-pr-sweep/SKILL.md) | Clear all open PR review debt across your repos in one session — triages ALL threads across ALL PRs before touching any code, batches fixes into one commit per PR, posts SHA confirmations. |

#### Daily workflow

| Skill | What it does |
| --- | --- |
| [`/standup-prep`](./skills/productivity/standup-prep/SKILL.md) | Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync. |
| [`/standup-prep-preflight`](./skills/productivity/standup-prep-preflight/SKILL.md) | Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence. |
| [`/check-prior-work`](./skills/productivity/check-prior-work/SKILL.md) | Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity before standup. |
| [`/load-session-context`](./skills/productivity/load-session-context/SKILL.md) | Load the session index and latest wrap file only; check for an existing morning brief for today. |
| [`/session-wrap`](./skills/productivity/session-wrap/SKILL.md) | Write a session wrap doc, update the session index, and hand off to `/wip-sweep`. Use at context >55% or after completing major work. |
| [`/repo-status`](./skills/engineering/repo-status/SKILL.md) | Dynamically discover all workspace repos and produce a dirty state table (branch, dirty file count, clean/uncommitted). |
| [`/wip-sweep`](./skills/engineering/wip-sweep/SKILL.md) | Scope selection + tiered WIP commit/push/PR model: T1 scope selection → T2 local commit → T3 push → T4 draft PRs. |
| [`/commit-wip`](./skills/engineering/commit-wip/SKILL.md) | Scan every workspace repo for uncommitted changes, group by topic, and commit each group to the most semantically appropriate existing branch. Creates a new branch only when no remote match exists. |
| [`/open-pr-sweep`](./skills/engineering/open-pr-sweep/SKILL.md) | Discover all non-draft open PRs across LittleBranches and AlexRebula orgs and output a summary table. |

#### Standards & context loading

| Skill | What it does |
| --- | --- |
| [`/load-oss-standards`](./skills/engineering/load-oss-standards/SKILL.md) | Verify access to public and private LittleBranches AGENTS.md files and print the session health table. |
| [`/load-dependency-chain`](./skills/engineering/load-dependency-chain/SKILL.md) | Read `dependency-chain.md` and extract the hard deadline, critical path, and current phase status for each active repo. |

#### Asana / roadmap

| Skill | What it does |
| --- | --- |
| [`/asana-sync`](./skills/engineering/asana-sync/SKILL.md) | Opt-in Asana sync: locate config, check write access, create Morning Briefs section, seed tasks, post status update, log results. |
| [`/sync-roadmap`](./skills/engineering/sync-roadmap/SKILL.md) | Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and companion `data.tsx` files. Asana is the master. |

---

### Engineering (upstream — mattpocock/skills)

Skills from the original `mattpocock/skills`. Full descriptions and philosophy at [mattpocock/skills → Reference → Engineering](https://github.com/mattpocock/skills#engineering).

- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates `CONTEXT.md` and ADRs inline.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — Find deepening opportunities in a codebase, informed by the domain language in `CONTEXT.md` and the decisions in `docs/adr/`.
- **[prototype](./skills/engineering/prototype/SKILL.md)** — Build a throwaway prototype — either a runnable terminal app for state/business-logic questions, or several radically different UI variations toggleable from one route.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — Scaffold the per-repo config (issue tracker, triage label vocabulary, domain doc layout). Run once per repo before using `to-issues`, `to-prd`, `triage`, `diagnose`, `tdd`, `improve-codebase-architecture`, or `zoom-out`.
- **[tdd](./skills/engineering/tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[to-issues](./skills/engineering/to-issues/SKILL.md)** — Break any plan, spec, or PRD into independently-grabbable GitHub issues using vertical slices.
- **[to-prd](./skills/engineering/to-prd/SKILL.md)** — Turn the current conversation context into a PRD and submit it as a GitHub issue.
- **[triage](./skills/engineering/triage/SKILL.md)** — Triage issues through a state machine of triage roles.
- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — Tell the agent to zoom out and give broader context or a higher-level perspective on an unfamiliar section of code.

---

### Productivity (upstream — mattpocock/skills)

Full descriptions at [mattpocock/skills → Reference → Productivity](https://github.com/mattpocock/skills#productivity).

- **[caveman](./skills/productivity/caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[write-a-skill](./skills/productivity/write-a-skill/SKILL.md)** — Create new skills with proper structure, progressive disclosure, and bundled resources.

---

### Misc (upstream — mattpocock/skills)

Tools kept around but rarely used. Full descriptions at [mattpocock/skills → Reference → Misc](https://github.com/mattpocock/skills#misc).

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — Migrate test files from `as` type assertions to `@total-typescript/shoehorn`.
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — Create exercise directory structures with sections, problems, solutions, and explainers.
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

---

### In-progress

Drafts that work but aren't fully polished. Not promoted to a named bucket yet.

- **[review](./skills/in-progress/review/SKILL.md)** — Local diff review before a PR opens — two-axis (Standards + Spec), parallel sub-agents, no GitHub API.
- **[writing-beats](./skills/in-progress/writing-beats/SKILL.md)** — Shape an article as a journey of beats, choose-your-own-adventure style. Picks a starting beat, writes only that beat, then offers options for where to pivot next.
- **[writing-fragments](./skills/in-progress/writing-fragments/SKILL.md)** — Grilling session that mines for fragments — claims, vignettes, sharp sentences, half-thoughts — and appends them to a single document as raw material for a future article.
- **[writing-shape](./skills/in-progress/writing-shape/SKILL.md)** — Take a markdown file of raw material and shape it into an article — drafting candidate openings, growing the piece paragraph by paragraph, arguing about format at each step.

---

### Personal

Tied to my personal setup. Not installed via `skills@latest`. Not promoted.

- **[edit-article](./skills/personal/edit-article/SKILL.md)** — Edit and improve articles by restructuring sections, improving clarity, and tightening prose.
- **[obsidian-vault](./skills/personal/obsidian-vault/SKILL.md)** — Search, create, and manage notes in the Obsidian vault with wikilinks and index notes.