<p>
  <img alt="Skills For Real Engineers — AlexRebula Fork" src="./public/images/mattpocock-alexrebula-skills-banner.png" width="738">
</p>

# Skills For Real Engineers — AlexRebula Fork

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

A fork of [mattpocock/skills](https://github.com/mattpocock/skills) by [Matt Pocock](https://github.com/mattpocock). I try my best keeping this repo up to sync with Matt's upstream, so that every his skill are included here — most byte-for-byte identical, with a handful carrying my own edits (some functional, some only repo-wide Prettier formatting). This fork extends Matt's skills with:

- **Framework scaffolding** — React, Vue, and Angular component creation with a consistent two-phase scaffold + TDD loop
- **Git & PR lifecycle** — WIP commits, PR creation, PR review, and morning review-debt sweeps
- **LittleBranches org** — component scaffolding, quality-gate enforcement, and PR review workflows for the [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards)
- **Daily workflow** — session wrapping, Asana sync, and standup orchestration

> **Before you install:** I maintain this fork solo, use it daily, and write it with AI assistance. It is not a polished product — and some skills ship with shell scripts in an area where my own experience is limited. Please read [Quality, Maintenance and Risk](#quality-maintenance-and-risk) before relying on it.

## Install

```bash
npx skills@latest add AlexRebula/skills
```

Then run `/setup-matt-pocock-skills` once per repo to configure the issue tracker, domain docs, and triage labels.

---

## Install as a Claude Code plugin

Prefer a plug-and-play install you don't maintain by hand? These skills also ship as a native [Claude Code plugin](https://code.claude.com/docs/en/plugins). Instead of copying editable files into your repo, the plugin installs the whole skill set as a managed bundle that updates when I ship a new version — you subscribe rather than fork.

Inside Claude Code:

```
/plugin marketplace add AlexRebula/skills
/plugin install alexrebula-skills@AlexRebula
```

Or from your shell:

```bash
claude plugin marketplace add AlexRebula/skills
claude plugin install alexrebula-skills@AlexRebula
```

Then run `/setup-matt-pocock-skills` once per repo, exactly as in the quickstart above.

Two ways to install, two philosophies:

- **[skills.sh](https://skills.sh/mattpocock/skills)** copies the skills into your project so you can hack on them and make them your own.
- **The plugin** keeps them as a read-only, always-current bundle you don't edit — best when you just want my set to work and follow along as it evolves.

> Using Codex or another agent? The [skills.sh installer](https://skills.sh/mattpocock/skills) already installs these skills into Codex and other Agent-Skills-standard harnesses today. A native Codex plugin is on the roadmap — see [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](./.agents/adr/0002-ship-as-a-claude-code-plugin.md).

## Why These Skills Exist

I built these skills as a way to fix common failure modes I see with Claude Code, Codex, and other coding agents.

### #1: The Agent Didn't Do What I Want

> "No-one knows exactly what they want"
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**. The most common failure mode in software development is misalignment. You think the dev knows what you want. Then you see what they've built - and you realize it didn't understand you at all.

This is just the same in the AI age. There is a communication gap between you and the agent. The fix for this is a **grilling session** - getting the agent to ask you detailed questions about what you're building.

**The Fix** is to use:

- [`/grill-me`](./skills/productivity/grill-me/SKILL.md) - for non-code uses
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md) - same as [`/grill-me`](./skills/productivity/grill-me/SKILL.md), but adds more goodies (see below)

These are my most popular skills. They help you align with the agent before you get started, and think deeply about the change you're making. Use them _every_ time you want to make a change.

### #2: The Agent Is Way Too Verbose

> With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model.
>
> Eric Evans, [Domain-Driven-Design](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

**The Problem**: At the start of a project, devs and the people they're building the software for (the domain experts) are usually speaking different languages.

I felt the same tension with my agents. Agents are usually dropped into a project and asked to figure out the jargon as they go. So they use 20 words where 1 will do.

**The Fix** for this is a shared language. It's a document that helps agents decode the jargon used in the project.

<details>
<summary>
Example
</summary>

Here's an example [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md), from my `course-video-manager` repo. Which one is easier to read?

- **BEFORE**: "There's a problem when a lesson inside a section of a course is made 'real' (i.e. given a spot in the file system)"
- **AFTER**: "There's a problem with the materialization cascade"

This concision pays off session after session.

</details>

This is built into [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md). It's a grilling session, but that helps you build a shared language with the AI, and document hard-to-explain decisions in ADR's.

It's hard to explain how powerful this is. It might be the single coolest technique in this repo. Try it, and see.

> [!TIP]
> A shared language has many other benefits than reducing verbosity:
>
> - **Variables, functions and files are named consistently**, using the shared language
> - As a result, the **codebase is easier to navigate** for the agent
> - The agent also **spends fewer tokens on thinking**, because it has access to a more concise language

### #3: The Code Doesn't Work

> "Always take small, deliberate steps. The rate of feedback is your speed limit. Never take on a task that’s too big."
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**: Let's say that you and the agent are aligned on what to build. What happens when the agent _still_ produces crap?

It's time to look at your feedback loops. Without feedback on how the code it produces actually runs, the agent will be flying blind.

**The Fix**: You need the usual tranche of feedback loops: static types, browser access, and automated tests.

For automated tests, a red-green-refactor loop is critical. This is where the agent writes a failing test first, then fixes the test. This helps give the agent a consistent level of feedback that results in far better code.

I've built a **[`/tdd`](./skills/engineering/tdd/SKILL.md) skill** you can slot into any project. It encourages red-green-refactor and gives the agent plenty of guidance on what makes good and bad tests.

For debugging, I've also built a **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md)** skill that wraps best debugging practices into a simple loop.

### #4: We Built A Ball Of Mud

> "Invest in the design of the system _every day_."
>
> Kent Beck, [Extreme Programming Explained](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)

> "The best modules are deep. They allow a lot of functionality to be accessed through a simple interface."
>
> John Ousterhout, [A Philosophy Of Software Design](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X)

**The Problem**: Most apps built with agents are complex and hard to change. Because agents can radically speed up coding, they also accelerate software entropy. Codebases get more complex at an unprecedented rate.

**The Fix** for this is a radical new approach to AI-powered development: caring about the design of the code.

This is built in to every layer of these skills:

- [`/to-spec`](./skills/engineering/to-spec/SKILL.md) quizzes you about which modules you're touching before creating a spec

And crucially, [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) helps you rescue a codebase that has become a ball of mud. I recommend running it on your codebase once every few days.

### Summary

Software engineering fundamentals matter more than ever. These skills are my best effort at condensing these fundamentals into repeatable practices, to help you ship the best apps of your career. Enjoy.

## Reference

These split on one axis — who can invoke them. **User-invoked** skills are reachable only when you type them (e.g. `/grill-me`); their job is to orchestrate. **Model-invoked** skills can be invoked by you _or_ reached for automatically by the agent when the task fits; they hold the reusable discipline. A user-invoked skill may invoke model-invoked skills, but never another user-invoked one.

### Engineering

Skills I use daily for code work.

**User-invoked**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** — Ask which skill or flow fits your situation. A router over the user-invoked skills in this repo.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — Grilling session that also builds your project's domain model, sharpening terminology and updating `CONTEXT.md` and ADRs inline.
- **[triage](./skills/engineering/triage/SKILL.md)** — Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo before using the other engineering skills.
- **[start-issue](./skills/engineering/start-issue/SKILL.md)** — Bootstrap a session from a GitHub issue number: reads the issue, checks blockers, loads codebase context, and routes to `/tdd` or `/grill-me` based on the triage label.
- **[sync](./skills/engineering/sync/SKILL.md)** — Bidirectional sync between configured Asana projects and their local markdown files. Pulls new/updated tasks, pushes local changes, resolves conflicts (local wins).
- **[to-spec](./skills/engineering/to-spec/SKILL.md)** — Turn the current conversation into a spec and publish it to the issue tracker. No interview — just synthesizes what you've already discussed.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)** — Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges — written as text in a local file, or as native blocking links on a real tracker.
- **[implement](./skills/engineering/implement/SKILL.md)** — Build the work described by a spec or set of tickets, driving `/tdd` at pre-agreed seams and closing out with `/code-review` before committing.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)** — Plan a huge chunk of work, more than one agent session can hold, as a shared map of investigation tickets on the issue tracker — resolve them one at a time until the way to the destination is clear.

**Model-invoked**

- **[prototype](./skills/engineering/prototype/SKILL.md)** — Build a throwaway prototype to answer a design question — a runnable terminal app for state/logic questions, or several radically different UI variations toggleable from one route.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[research](./skills/engineering/research/SKILL.md)** — Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](./skills/engineering/tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)** — Actively build and sharpen a project's domain model — challenge terms against the glossary, stress-test with edge-case scenarios, and update `CONTEXT.md` and ADRs inline.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** — Shared discipline and vocabulary for designing deep modules: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface.
- **[code-review](./skills/engineering/code-review/SKILL.md)** — Two-axis review of the diff since a fixed point: **Standards** (does it follow the repo's coding standards, plus a Fowler smell baseline?) and **Spec** (does it faithfully implement the originating issue/PRD?), run as parallel sub-agents so neither pollutes the other.
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)** — Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation — never `--abort`.

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
- **[query-issues](./skills/git/query-issues/SKILL.md)** — Query GitHub issues for a repo filtered by one or more labels (AND logic) and print a formatted list in chat. Pure discovery — no writes. Run at session start to find pending cross-repo work.
- **[repo-status](./skills/git/repo-status/SKILL.md)** — Discover all workspace repos dynamically and produce a dirty-state table (repo, branch, dirty file count, clean/uncommitted status).
- **[respond-pr-review](./skills/git/respond-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in any repo: gather every thread, reply inline before fixing, batch valid fixes into one commit, and post SHA follow-ups.
- **[review-pr](./skills/git/review-pr/SKILL.md)** — Review an open GitHub PR on two axes — Standards (does the code follow the repo's own conventions?) and Spec (does it match the originating issue/PRD?). Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-branches](./skills/git/sync-branches/SKILL.md)** — Fetch latest main, flag already-merged branches, pull each stale branch from origin, then merge main into every active branch. Works on one repo or many.
- **[wip-sweep](./skills/git/wip-sweep/SKILL.md)** — Scope selection + tiered WIP commit/push/PR model (T1 scope → T2 local commit → T3 push → T4 draft PRs) with confirmation gates at each tier.

---

## Organisation (LittleBranches)

Skills specific to the [LittleBranches](https://github.com/LittleBranches) organisation and its [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards). These skills require access to the LittleBranches AGENTS.md barrels.

- **[audit-giselle-tests](./skills/org/audit-giselle-tests/SKILL.md)** — Audit existing AI-generated tests in `giselle-mui` for quality problems: placeholder stubs, MUI-mock anti-patterns, and missing required test cases.
- **[create-giselle-component](./skills/org/create-giselle-component/SKILL.md)** — Scaffold and TDD a new `giselle-mui` component following OSS Quality Standards rules — two-phase: scaffold (types, test stubs, README), then implement (TDD vertical slices with real ThemeProvider).
- **[load-dependency-chain](./skills/org/load-dependency-chain/SKILL.md)** — Read the `dependency-chain.md` file and extract the hard deadline, critical path, and phase status for each active repo.
- **[load-oss-standards](./skills/org/load-oss-standards/SKILL.md)** — Verify access to the public and private LittleBranches AGENTS.md barrels and print a session health-check table.
- **[respond-giselle-pr-review](./skills/org/respond-giselle-pr-review/SKILL.md)** — Respond to an existing Copilot PR review in a LittleBranches repo: pre-load AGENTS.md + workflow rules, triage every thread, reply inline before fixing, batch valid fixes, and post SHA follow-ups.
- **[review-giselle-pr](./skills/org/review-giselle-pr/SKILL.md)** — Review an open GitHub PR in a LittleBranches repository against the full OSS quality standards ruleset. Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-roadmap](./skills/org/sync-roadmap/SKILL.md)** — Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and `data.tsx` `done` flags. Asana is the master; this skill flows changes downstream.

---

## Productivity

General workflow tools, not code-specific.

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[teach](./skills/productivity/teach/SKILL.md)** — Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
- **[writing-great-skills](./skills/productivity/writing-great-skills/SKILL.md)** — Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable.

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.md)** — Interview the user relentlessly about a plan, decision, or idea until every branch of the decision tree is resolved. The reusable loop behind `grill-me` and `grill-with-docs`.

**AlexRebula extensions** (not in upstream)

- **[capture](./skills/productivity/capture/SKILL.md)** — Capture a freeform thought, task, or note mid-session — routes it to the correct content project, creates a real Asana task, writes a local markdown file, and commits it.
- **[sync](./skills/productivity/sync/SKILL.md)** — Bidirectional Asana ↔ local markdown sync: pulls new/updated tasks from Asana, pushes local changes, resolves conflicts (local wins), and commits.
- **[asana-sync](./skills/productivity/asana-sync/SKILL.md)** — Opt-in Asana sync for morning briefs: locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[check-prior-work](./skills/productivity/check-prior-work/SKILL.md)** — Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[ingest](./skills/productivity/ingest/SKILL.md)** — Ingest a raw source file into the personal wiki — reads the source, extracts metadata, writes a wiki/sources/ synthesis page, updates related wiki pages, and updates wiki/index.md and wiki/log.md. Add --deep to also write a long-form deep dive at wiki/deep/<slug>-deep.md.
- **[extract-vocabulary](./skills/productivity/extract-vocabulary/SKILL.md)** — Companion to `/ingest`: pull jargon out of an already-ingested source and file it into a per-concept vocabulary cheat-sheet (ELI5/junior-dev level), cross-linked from the concept page, a flat A–Z barrel index, and the source page. Opt-in — run manually on jargon-heavy sources, not every ingest.
- **[load-session-context](./skills/productivity/load-session-context/SKILL.md)** — Load the session index and latest wrap file; check for an existing morning brief for today.
- **[collapse-session-folder](./skills/productivity/collapse-session-folder/SKILL.md)** — Collapse all same-day session wrap folders into one combined folder. Repairs → Next footer links and updates sessions-index.md. Called automatically by /session-wrap.
- **[resolve-ai-paths](./skills/productivity/resolve-ai-paths/SKILL.md)** — Resolve `SESSIONS_ROOT` and `PROMPTS_ROOT` for AI workflow skills. Call this at the start of any skill that reads/writes sessions or prompts folders.
- **[query](./skills/productivity/query/SKILL.md)** — Answer a question using the personal wiki — reads the index, drills into relevant pages, synthesises an answer with citations, and optionally files the answer as a new wiki page.
- **[session-wrap](./skills/productivity/session-wrap/SKILL.md)** — Write a session wrap doc, update the session index, and hand off to `/wip-sweep`. More powerful sibling of `/handoff`. Use at context >55% or after completing major work.
- **[standup-prep](./skills/productivity/standup-prep/SKILL.md)** — Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync.
- **[standup-prep-preflight](./skills/productivity/standup-prep-preflight/SKILL.md)** — Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[wiki-lint](./skills/productivity/wiki-lint/SKILL.md)** — Health-check the personal wiki — scans for contradictions, orphan pages, stale claims, missing cross-references, and data gaps. Produces a prioritised finding list and suggests next ingests.
- **[learner-history](./skills/productivity/learner-history/SKILL.md)** — Build a factual, source-verified history of a learner's GitHub issue work across an org. Call this before `/audit-issue` or `/next-issue` to establish what concepts the learner has already encountered and at what quality.
- **[log-incident](./skills/productivity/log-incident/SKILL.md)** — Log an AI behavioural incident or workflow violation to the wiki's incidents hub. Drafts the structured record from the current conversation, gets approval, then writes the file, updates the index, and opens a PR. No Asana involved.
- **[next-issue](./skills/productivity/next-issue/SKILL.md)** — Identify, audit, and prepare the next GitHub issue for a student or apprentice. GitHub-integrated wrapper around `/audit-issue` that adds automatic issue fetching, principles file discovery, and learner progression checks via `/learner-history`.
- **[rebuild-root-index](./skills/productivity/rebuild-root-index/SKILL.md)** — Rescan every git repo under `$AR_ROOT` and refresh the master barrel index. Diffs against a content-hash manifest so only new/changed/deleted files are re-summarized. Chained from `/ingest` or run standalone.
- **[load-session-guidelines](./skills/productivity/load-session-guidelines/SKILL.md)** — Load all session guidelines in one go: Karpathy coding rules, OSS quality standards, and PR/branch conventions. Run at the start of every session before any user task.
- **[extract-session-worktree](./skills/productivity/extract-session-worktree/SKILL.md)** — Split one session's uncommitted changes out of a working directory shared by multiple concurrent sessions, into its own isolated git worktree and branch, without touching any other session's pending work.

---

## Misc

Tools kept around but rarely used.

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.
- **[karpathy-guidelines](./skills/misc/karpathy-guidelines/SKILL.md)** — Behavioral guardrails for LLM coding: think before coding, keep changes surgical, and drive work by verifiable success criteria.
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — Migrate test files from `as` type assertions to @total-typescript/shoehorn.
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — Create exercise directory structures with sections, problems, solutions, and explainers.
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

---

## Quality, Maintenance and Risk

**Read this before you rely on this repo.**

I maintain this fork myself, daily, alongside my own work — it is not a polished product with a dedicated QA process. I use these skills every day on real projects, which is the main quality signal I can offer: if something were badly broken, I'd have hit it myself by now. I want to be upfront about the gaps rather than let you find them the hard way.

**Some skills ship with accompanying shell scripts.** Shell is not my strongest area — I have far less experience writing and reviewing it than the TypeScript/React work I do daily. That means some scripts here are probably not written the way an experienced shell engineer would write them. I review everything I merge, including with AI-assisted testing and static analysis, but I can't personally vouch for shell the way I can for code in a language I know deeply.

**I use AI to write and audit these skills.** I review every change to the best of my ability and available time, but mistakes or AI-generated "slop" can still creep in. **Use this repo at your own risk.** What I can tell you honestly is that I run these skills myself, every day — I can't promise perfection.

**Why this fork exists in the first place:** I wanted to keep building on [Matt Pocock's original skills](https://github.com/mattpocock/skills) without being blocked on whether or when upstream adds something I need. This repo is where every skill I actually use daily lives, and it doubles as a place for me to try different LLMs and learn more about how agentic coding tools work. Because of that, skills and scripts here are expected to keep evolving — this is a living workspace I use, not a finished library.

**I try to track upstream**, syncing from [mattpocock/skills](https://github.com/mattpocock/skills) regularly and keeping the original skills unchanged where I can. As this fork diverges further, staying in sync gets harder, and I'd rather say that plainly than let it go unstated.

**When I hit something outside my experience** — like a shell script that needs more scrutiny than I can personally give it — I try to flag it honestly rather than quietly ship it, in line with the [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards) I hold myself to elsewhere.

If I've missed something, [please open an issue](https://github.com/AlexRebula/skills/issues) — I'd rather know.

---

## About the upstream repo

The original `mattpocock/skills` covers the core engineering philosophy: grilling sessions to align with the agent before writing a line of code, TDD loops for consistent feedback, architecture reviews to prevent entropy. For the full motivation and background, see [mattpocock/skills](https://github.com/mattpocock/skills).
