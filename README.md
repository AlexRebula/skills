<p>
  <img alt="Skills For Real Engineers: AlexRebula Fork" src="./public/images/mattpocock-alexrebula-skills-banner.png" width="738">
</p>

# Skills For Real Engineers: AlexRebula Fork

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

[Browse the docs](https://skills-two-cyan.vercel.app) for a reference page on every skill in this fork.

This is a fork of [mattpocock/skills](https://github.com/mattpocock/skills) by [Matt Pocock](https://github.com/mattpocock). I try my best to keep it in sync with Matt's upstream, so every one of his skills is included here. Most are byte-for-byte identical, with a handful carrying my own edits (some functional, some only repo-wide Prettier formatting).

This fork extends Matt's skills with:

- **Framework scaffolding**: React, Vue, and Angular component creation with a consistent two-phase scaffold + TDD loop
- **Git & PR lifecycle**: WIP commits, PR creation, PR review, and morning review-debt sweeps
- **LittleBranches org**: component scaffolding, quality-gate enforcement, and PR review workflows for the [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards)
- **Daily workflow**: session wrapping, Asana sync, and standup orchestration
- **Apprentice mentoring**: issue auditing, learner-history tracking, and next-issue sequencing for a student or apprentice contributor

> **Before you install.** I maintain this fork solo, use it daily, and write it with AI assistance. It is not a polished product, and some skills ship with shell scripts in an area where my own experience is limited. Please read [Quality, maintenance and risk](#quality-maintenance-and-risk) before relying on it.

## Install

```bash
npx skills@latest add AlexRebula/skills
```

Then run `/setup-engineering-skills` once per repo to configure the issue tracker, domain docs, and triage labels.

---

## Install as a Claude Code plugin

Prefer a plug-and-play install you don't maintain by hand? These skills also ship as a native [Claude Code plugin](https://code.claude.com/docs/en/plugins). Instead of copying editable files into your repo, the plugin installs the whole skill set as a managed bundle that updates when I ship a new version. You subscribe rather than fork.

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

Then run `/setup-engineering-skills` once per repo, exactly as in the quickstart above.

Two ways to install, two philosophies:

- **[skills.sh](https://skills.sh/mattpocock/skills)** copies the skills into your project so you can hack on them and make them your own.
- **The plugin** keeps them as a read-only, always-current bundle you don't edit, best when you just want my set to work and follow along as it evolves.

> Using Codex or another agent? The [skills.sh installer](https://skills.sh/mattpocock/skills) already installs these skills into Codex and other Agent-Skills-standard harnesses today. A native Codex plugin is on the roadmap: see [`.agents/adr/0002-ship-as-a-claude-code-plugin.md`](./.agents/adr/0002-ship-as-a-claude-code-plugin.md).

## Why these skills exist

I built these skills as a way to fix common failure modes I see with Claude Code, Codex, and other coding agents.

### #1: The agent didn't do what I want

> "No-one knows exactly what they want"
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**. The most common failure mode in software development is misalignment. You think the dev knows what you want. Then you see what they've built, and you realize it didn't understand you at all.

This is just the same in the AI age. There is a communication gap between you and the agent. The fix for this is a **grilling session**, getting the agent to ask you detailed questions about what you're building.

**The Fix** is to use:

- [`/grill-me`](./skills/thinking-tools/grill-me/SKILL.md), for non-code uses
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md), same as [`/grill-me`](./skills/thinking-tools/grill-me/SKILL.md), but adds more goodies (see below)

These are my most popular skills. They help you align with the agent before you get started, and think deeply about the change you're making. Use them _every_ time you want to make a change.

### #2: The agent is way too verbose

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

### #3: The code doesn't work

> "Always take small, deliberate steps. The rate of feedback is your speed limit. Never take on a task that's too big."
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**: Let's say that you and the agent are aligned on what to build. What happens when the agent _still_ produces crap?

It's time to look at your feedback loops. Without feedback on how the code it produces actually runs, the agent will be flying blind.

**The Fix**: You need the usual tranche of feedback loops: static types, browser access, and automated tests.

For automated tests, a red-green-refactor loop is critical. This is where the agent writes a failing test first, then fixes the test. This helps give the agent a consistent level of feedback that results in far better code.

I've built a **[`/tdd`](./skills/engineering/tdd/SKILL.md) skill** you can slot into any project. It encourages red-green-refactor and gives the agent plenty of guidance on what makes good and bad tests.

For debugging, I've also built a **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md)** skill that wraps best debugging practices into a disciplined loop, gated phase by phase.

### #4: We built a ball of mud

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

And importantly, [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md) surveys a codebase for deepening opportunities and hands you the candidates. I recommend running it on your codebase once every few days. It is a survey, not a rescue: on a genuinely old codebase it will find real candidates, but it won't untangle the mud for you.

### Summary

Software engineering fundamentals matter more than ever. These skills are my best effort at condensing these fundamentals into repeatable practices, to help you ship the best apps of your career. Enjoy.

## Reference

These split on one axis: who can invoke them. **User-invoked** skills are reachable only when you type them (e.g. `/grill-me`); their job is to orchestrate. **Model-invoked** skills can be invoked by you _or_ reached for automatically by the agent when the task fits; they hold the reusable discipline. A user-invoked skill may invoke model-invoked skills, but never another user-invoked one.

### Engineering

Skills I use daily for code work.

**User-invoked**

- **[ask-alex](./skills/engineering/ask-alex/SKILL.md)**: Ask which skill or flow fits your situation. A router over the whole skill set in this repo.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that also builds your project's domain model, sharpening terminology and updating `CONTEXT.md` and ADRs inline — the stateful front door onto the same `grilling` primitive `grill-me` uses, plus `domain-modeling`.
- **[triage](./skills/engineering/triage/SKILL.md)**: Move issues (and, where configured, external PRs) through a state machine of triage roles: categorise, verify, grill if needed, write agent-ready briefs.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-engineering-skills](./skills/engineering/setup-engineering-skills/SKILL.md)**: Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo before using the other engineering skills.
- **[start-issue](./skills/engineering/start-issue/SKILL.md)**: Bootstrap a session from a GitHub issue number: reads the issue, checks blockers, loads codebase context, and routes to `/tdd` or `/grill-me` based on the triage label.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Turn the current conversation into a spec and publish it to the issue tracker. No interview, just synthesizes what you've already discussed.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges, written as text in a local file, or as native blocking links on a real tracker.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build the work described by a spec or set of tickets, driving `/tdd` at pre-agreed seams and closing out with `/review-pr` before committing.
- **[implement-tickets](./skills/engineering/implement-tickets/SKILL.md)**: Given a parent issue with GitHub-native sub-issues, loop `/implement` across its children in dependency order until the whole batch is built, stacking branches rather than waiting for merges. Optional status-board artifact.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: Plan a huge chunk of work, more than one agent session can hold, as a shared map of investigation tickets on the issue tracker, resolved one at a time until the way to the destination is clear.

**Model-invoked**

- **[prototype](./skills/engineering/prototype/SKILL.md)**: Build a throwaway prototype to answer a design question: a runnable terminal app for state/logic questions, or several radically different UI variations toggleable from one route.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Disciplined diagnosis loop for hard bugs and performance regressions: reproduce → minimise → hypothesise → instrument → fix → regression-test.
- **[research](./skills/engineering/research/SKILL.md)**: Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Actively build and sharpen a project's domain model: challenge terms against the glossary, stress-test with edge-case scenarios, and update `CONTEXT.md` and ADRs inline.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Shared discipline and vocabulary for designing deep modules: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface.
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)**: Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation, never `--abort`.
- **[deslopify](./skills/engineering/deslopify/SKILL.md)**: Strip AI tells from prose and code and restore a human voice. Always applies to prose meant for a human reader (blog drafts, PR descriptions, commit messages, docs); the code half is manual-only (`/deslopify <file>`) and scoped to generation tells (restating comments, impossible error handling, dead defensive branches), not general design review.
- **[wizard](./skills/engineering/wizard/SKILL.md)**: Generate an interactive bash wizard that walks a human through steps only they can perform: provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover.
- **[writing-for-agents](./skills/engineering/writing-for-agents/SKILL.md)**: Writing documents for agents: skills, AGENTS.md/CLAUDE.md, and any doc an agent reaches by a pointer.

---

## Framework

Framework-specific scaffolding. Each skill follows a consistent two-phase workflow: scaffold first (types, test stubs, README), then implement (TDD vertical slices).

- **[create-angular-component](./skills/framework/create-angular-component/SKILL.md)**: Scaffold and TDD a new Angular 17+ standalone component. Uses signal-based inputs/outputs and Angular Testing Library.
- **[create-react-component](./skills/framework/create-react-component/SKILL.md)**: Scaffold and TDD a new React component from scratch. Framework-agnostic, no MUI dependency.
- **[create-vue-component](./skills/framework/create-vue-component/SKILL.md)**: Scaffold and TDD a new Vue 3 single-file component. Uses Composition API with `<script setup>`, `defineProps` generics, and `@testing-library/vue`.
- **[migrate-react-subcomponent](./skills/framework/migrate-react-subcomponent/SKILL.md)**: Migrate an existing, already-implemented flat sub-component into its own subfolder — a mechanical move of working code, not a scaffold-from-scratch rebuild.

---

## Git

Skills for the full git and PR lifecycle, from discovering what needs committing to sweeping review debt across all repos.

- **[commit-wip](./skills/git/commit-wip/SKILL.md)**: Scan all workspace repos for uncommitted changes, group files by topic, match each group to an existing remote branch (or create a categorised new one), and commit there.
- **[create-pr](./skills/git/create-pr/SKILL.md)**: Verify branch hygiene, run the quality gate, and open a PR with a complete description via `gh pr create`. Optionally triggers a review bot.
- **[morning-pr-sweep](./skills/git/morning-pr-sweep/SKILL.md)**: Clear all open PR review debt across your repos in one session. Triages all threads before touching any code, batches fixes into one commit per PR, and reports which PRs are merge-ready.
- **[open-pr-sweep](./skills/git/open-pr-sweep/SKILL.md)**: Discover all non-draft open PRs across one or more GitHub orgs or users. Pure discovery, no writes.
- **[pr-merged](./skills/git/pr-merged/SKILL.md)**: Post-merge cleanup for one PR already merged on GitHub with its remote branch already deleted: verify it shows `MERGED`, close the linked issue with a summary comment, delete the local branch/worktree, prune the remote-tracking ref, fast-forward the base branch.
- **[query-issues](./skills/git/query-issues/SKILL.md)**: Query GitHub issues for a repo filtered by one or more labels (AND logic) and print a formatted list in chat. Pure discovery, no writes. Run at session start to find pending cross-repo work.
- **[repo-status](./skills/git/repo-status/SKILL.md)**: Discover all workspace repos dynamically and produce a dirty-state table (repo, branch, dirty file count, clean/uncommitted status).
- **[respond-pr-review](./skills/git/respond-pr-review/SKILL.md)**: Respond to an existing Copilot PR review in any repo: gather every thread, reply inline before fixing, batch valid fixes into one commit, and post SHA follow-ups.
- **[review-pr](./skills/git/review-pr/SKILL.md)**: Review an open GitHub PR on two axes: Standards (does the code follow the repo's own conventions?) and Spec (does it match the originating issue/PRD?). Posts findings via the GitHub PR Reviews API with inline line comments.
- **[sync-branches](./skills/git/sync-branches/SKILL.md)**: Resolve each repo's default branch (main, master, or other), fetch latest, flag already-merged branches, pull each stale branch from origin, then merge the default branch into every active branch. Works on one repo or many.
- **[sync-status](./skills/git/sync-status/SKILL.md)**: Report drift between two repos you've configured as a synced pair (e.g. an isolated playground and its production counterpart), with no side effects.
- **[wip-sweep](./skills/git/wip-sweep/SKILL.md)**: Scope selection + tiered WIP commit/push/PR model (T1 scope → T2 local commit → T3 push → T4 draft PRs) with confirmation gates at each tier.

---

## Organisation (LittleBranches)

Skills specific to the [LittleBranches](https://github.com/LittleBranches) organisation and its [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards). These skills require access to the LittleBranches AGENTS.md barrels.

- **[audit-giselle-tests](./skills/org/audit-giselle-tests/SKILL.md)**: Audit existing AI-generated tests in `giselle-mui` for quality problems: placeholder stubs, MUI-mock anti-patterns, and missing required test cases.
- **[create-giselle-component](./skills/org/create-giselle-component/SKILL.md)**: Scaffold and TDD a new `giselle-mui` component following OSS Quality Standards rules, two-phase: scaffold (types, test stubs, README), then implement (TDD vertical slices with real ThemeProvider).
- **[load-dependency-chain](./skills/org/load-dependency-chain/SKILL.md)**: Read the `dependency-chain.md` file and extract the hard deadline, critical path, and phase status for each active repo.
- **[load-oss-standards](./skills/org/load-oss-standards/SKILL.md)**: Verify access to the public and private LittleBranches AGENTS.md barrels and print a session health-check table.
- **[migrate-giselle-subcomponent](./skills/org/migrate-giselle-subcomponent/SKILL.md)**: Migrate an existing, already-implemented flat sub-component into its own Scenario A subfolder per `cleanup-workflow.md` — a mechanical move of working code, not a scaffold-from-scratch rebuild.
- **[respond-giselle-pr-review](./skills/org/respond-giselle-pr-review/SKILL.md)**: Respond to an existing Copilot PR review in a LittleBranches repo: pre-load AGENTS.md + workflow rules, triage every thread, reply inline before fixing, batch valid fixes, and post SHA follow-ups.
- **[sync-roadmap](./skills/org/sync-roadmap/SKILL.md)**: Pull current task statuses from Asana and write them back into each repo's `docs/roadmap.md` and `data.tsx` `done` flags. Asana is the master; this skill flows changes downstream.

---

## Wiki

Skills for keeping a personal knowledge base current: ingesting sources, extracting what's quotable or jargon-heavy out of them, answering questions from it, and health-checking the whole thing.

- **[ingest](./skills/wiki/ingest/SKILL.md)**: Ingest a raw source file into the personal wiki: reads the source, extracts metadata, writes a wiki/sources/ synthesis page, updates related wiki pages, and updates wiki/index.md and wiki/log.md. Add --deep to also write a long-form deep dive at wiki/deep/<slug>-deep.md.
- **[query](./skills/wiki/query/SKILL.md)**: Answer a question using the personal wiki: reads the index, drills into relevant pages, synthesises an answer with citations, and optionally files the answer as a new wiki page.
- **[wiki-lint](./skills/wiki/wiki-lint/SKILL.md)**: Health-check the personal wiki: scans for contradictions, orphan pages, stale claims, missing cross-references, and data gaps. Produces a prioritised finding list and suggests next ingests.
- **[extract-quotes](./skills/wiki/extract-quotes/SKILL.md)**: Companion to `/ingest`: pull the most quotable verbatim lines from a source into a per-source quotes page and a vault-wide speaker-grouped barrel. Works without a completed ingest (from a raw file, URL, or pasted text), staging unfiled quotes until ingest files them. Optional topic argument narrows or expands focus. Opt-in, curatorial not exhaustive.
- **[extract-vocabulary](./skills/wiki/extract-vocabulary/SKILL.md)**: Companion to `/ingest`: pull jargon out of an already-ingested source and file each term into its own vocabulary file under the owning concept's folder (ELI5/junior-dev level), cross-linked from the concept page, a flat A-Z barrel index, and the source page. Opt-in: run manually on jargon-heavy sources, not every ingest.
- **[rebuild-root-index](./skills/wiki/rebuild-root-index/SKILL.md)**: Rescan every git repo under `$AR_ROOT` and refresh the master barrel index. Diffs against a content-hash manifest so only new/changed/deleted files are re-summarized. Chained from `/ingest` or run standalone.
- **[log-incident](./skills/wiki/log-incident/SKILL.md)**: Log an AI behavioural incident or workflow violation to the wiki's incidents hub. Drafts the structured record from the current conversation, gets approval, then writes the file, updates the index, and opens a PR. No Asana involved.
- **[archive-file](./skills/wiki/archive-file/SKILL.md)**: Archive a stale file: move it to the repo's archive folder, stamp its frontmatter (created, summary, archived-date, parent/children/related), log the move, and flag dangling references. Minimal v1 primitive: no staleness detection, no auto-rewriting of other pages.
- **[capture](./skills/daily-workflow/capture/SKILL.md)**: Routes a freeform note or task to the right content project — often the wiki itself. Full detail under Daily Workflow.

---

## Daily Workflow

The scaffolding around every session: starting the day, keeping Asana in sync, and closing out cleanly when context runs low or the work is done.

- **[standup-prep](./skills/daily-workflow/standup-prep/SKILL.md)**: Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync.
- **[standup-prep-preflight](./skills/daily-workflow/standup-prep-preflight/SKILL.md)**: Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[session-wrap](./skills/daily-workflow/session-wrap/SKILL.md)**: Write a session wrap doc, update the session index, and hand off to `/wip-sweep`. More powerful sibling of `/handoff`. Use at context >55% or after completing major work.
- **[check-prior-work](./skills/daily-workflow/check-prior-work/SKILL.md)**: Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[load-session-context](./skills/daily-workflow/load-session-context/SKILL.md)**: Load the session index and latest wrap file; check for an existing morning brief for today.
- **[load-session-guidelines](./skills/daily-workflow/load-session-guidelines/SKILL.md)**: Load all session guidelines in one go: Karpathy coding rules, OSS quality standards, and PR/branch conventions. Run at the start of every session before any user task.
- **[handoff](./skills/daily-workflow/handoff/SKILL.md)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[collapse-session-folder](./skills/daily-workflow/collapse-session-folder/SKILL.md)**: Collapse all same-day session wrap folders into one combined folder. Repairs → Next footer links and updates sessions-index.md. Called automatically by /session-wrap.
- **[extract-session-worktree](./skills/daily-workflow/extract-session-worktree/SKILL.md)**: Split one session's uncommitted changes out of a working directory shared by multiple concurrent sessions, into its own isolated git worktree and branch, without touching any other session's pending work.
- **[resolve-ai-paths](./skills/daily-workflow/resolve-ai-paths/SKILL.md)**: Resolve `SESSIONS_ROOT`, `PROMPTS_ROOT`, `MORNING_BRIEFS_ROOT`, and `SKILLS_ROOT` for AI workflow skills. Call this at the start of any skill that reads/writes the sessions, morning-briefs, prompts, or skills-repo folders.
- **[asana-sync](./skills/daily-workflow/asana-sync/SKILL.md)**: Opt-in Asana sync for morning briefs: locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[sync](./skills/daily-workflow/sync/SKILL.md)**: Bidirectional Asana ↔ local markdown sync: pulls new/updated tasks from Asana, pushes local changes, resolves conflicts (local wins), and commits.
- **[capture](./skills/daily-workflow/capture/SKILL.md)**: Capture a freeform thought, task, or note mid-session: routes it to the correct content project, creates a real Asana task, writes a local markdown file, and commits it.
- **[repo-status](./skills/git/repo-status/SKILL.md)**: The `standup-prep` precursor step that surveys dirty state across every workspace repo. Full detail under Git.
- **[commit-wip](./skills/git/commit-wip/SKILL.md)**: The `standup-prep` precursor step that sweeps and commits uncommitted work across every workspace repo. Full detail under Git.

---

## Mentoring

Skills about growing someone else's work, not your own: preparing and auditing GitHub issues for a student or apprentice contributor.

- **[audit-issue](./skills/mentoring/audit-issue/SKILL.md)**: Audit a GitHub issue body against a principles index and draft fixes for approval before touching GitHub. Paste the issue body and your principles directly in chat: no `gh` CLI or file paths required. The lower-level primitive that `/next-issue` wraps with automatic issue fetching.
- **[learner-history](./skills/mentoring/learner-history/SKILL.md)**: Build a factual, source-verified history of a learner's GitHub issue work across an org. Call this before `/audit-issue` or `/next-issue` to establish what concepts the learner has already encountered and at what quality.
- **[next-issue](./skills/mentoring/next-issue/SKILL.md)**: Identify, audit, and prepare the next GitHub issue for a student or apprentice. GitHub-integrated wrapper around `/audit-issue` that adds automatic issue fetching, principles file discovery, and learner progression checks via `/learner-history`.
- **[teach](./skills/mentoring/teach/SKILL.md)**: Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.

---

## Thinking Tools

Interview and communication-repair primitives, reached for directly or run underneath other skills.

- **[grill-me](./skills/thinking-tools/grill-me/SKILL.md)**: Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved — the stateless, user-invoked front door onto the `grilling` primitive.
- **[grilling](./skills/thinking-tools/grilling/SKILL.md)**: Interview the user relentlessly about a plan, decision, or idea until every branch of the decision tree is resolved. The reusable interview primitive behind `grill-me`, `grill-with-docs`, `triage`, `wayfinder`, and `improve-codebase-architecture`.
- **[to-questionnaire](./skills/thinking-tools/to-questionnaire/SKILL.md)**: Turn a decision you can't answer alone into a Markdown questionnaire for the one person who can, filled in async, or together over a meeting. It grills you about the send (who it's for, what you need back), not the subject.
- **[wait-what](./skills/thinking-tools/wait-what/SKILL.md)**: Fire this the moment a message doesn't land. The agent re-pitches it with the context you're missing, in plain English, using your `CONTEXT.md` vocabulary.

---

## Misc

Tools kept around but rarely used.

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)**: Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.
- **[karpathy-guidelines](./skills/misc/karpathy-guidelines/SKILL.md)**: Behavioral guardrails for LLM coding: think before coding, keep changes surgical, and drive work by verifiable success criteria.
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)**: Migrate test files from `as` type assertions to @total-typescript/shoehorn.
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)**: Create exercise directory structures with sections, problems, solutions, and explainers.
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)**: Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.

---

## Personal

Skills tied to my own setup: not promoted in the plugin, since they assume my own tools and data layout.

- **[anonimise](./skills/personal/anonimise/SKILL.md)**: Anonymise sensitive personal data in wiki files using `{{SCREAMING_SNAKE_CASE}}` placeholders, with real values stored locally in a gitignored vault file. Also resolves placeholders back for local-context work.
- **[caveman](./skills/personal/caveman/SKILL.md)**: Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[edit-article](./skills/personal/edit-article/SKILL.md)**: Edit and improve articles by restructuring sections, improving clarity, and tightening prose.
- **[obsidian-vault](./skills/personal/obsidian-vault/SKILL.md)**: Search, create, and manage notes in an Obsidian vault with wikilinks and index notes.

---

## Quality, maintenance and risk

**Read this before you rely on this repo.**

I maintain this fork myself, daily, alongside my own work. It is not a polished product with a dedicated QA process. I use these skills every day on real projects, which is the main quality signal I can offer: if something were badly broken, I'd have hit it myself by now. I want to be upfront about the gaps rather than let you find them the hard way.

**Some skills ship with accompanying shell scripts.** Shell is not my strongest area. I have far less experience writing and reviewing it than the TypeScript/React work I do daily. That means some scripts here are probably not written the way an experienced shell engineer would write them. I review everything I merge, including with AI-assisted testing and static analysis, but I can't personally vouch for shell the way I can for code in a language I know deeply.

**I use AI to write and audit these skills.** I review every change to the best of my ability and available time, but mistakes or AI-generated "slop" can still creep in. **Use this repo at your own risk.** What I can tell you honestly is that I run these skills myself, every day. I can't promise perfection.

**Why this fork exists in the first place.** I wanted to keep building on [Matt Pocock's original skills](https://github.com/mattpocock/skills) without being blocked on whether or when upstream adds something I need. This repo is where every skill I actually use daily lives, and it doubles as a place for me to try different LLMs and learn more about how agentic coding tools work. Because of that, skills and scripts here are expected to keep evolving: this is a living workspace I use, not a finished library.

**I try to track upstream**, syncing from [mattpocock/skills](https://github.com/mattpocock/skills) regularly and keeping the original skills unchanged where I can. As this fork diverges further, staying in sync gets harder, and I'd rather say that plainly than let it go unstated.

**When I hit something outside my experience**, like a shell script that needs more scrutiny than I can personally give it, I try to flag it honestly rather than quietly ship it, in line with the [OSS Quality Standards](https://github.com/LittleBranches/oss-quality-standards) I hold myself to elsewhere.

If I've missed something, [please open an issue](https://github.com/AlexRebula/skills/issues). I'd rather know.

---

## About the upstream repo

The original `mattpocock/skills` covers the core engineering philosophy: grilling sessions to align with the agent before writing a line of code, TDD loops for consistent feedback, architecture reviews to prevent entropy. For the full motivation and background, see [mattpocock/skills](https://github.com/mattpocock/skills).
