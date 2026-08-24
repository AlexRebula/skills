## What this page is

`ask-matt` already answers "which skill fits my situation" one question at a time. This page is the other direction: read straight through once, and see how all 77 skills in this fork actually fit together, not as a keyword index but as the shape of a real day.

Matt Pocock's own site groups his ~48 skills into Main Flow, Shaping, Upkeep, Productivity Skills, and Reference Skills. That grouping doesn't fit here: this fork carries a full git and PR lifecycle, a personal wiki, session bookkeeping, apprentice mentoring, and LittleBranches org-specific tooling that he has no equivalent for. The stages below are this fork's own, built around when in a session you'd actually reach for something, not a reskin of his.

Nothing on this page changes what bucket a skill's files live in (`skills/engineering/`, `skills/wiki/`, and so on stay exactly as they are). This is a second way to navigate the same 77 skills, not a second copy of them.

Every skill below is named the same way regardless of where it came from: in backticks, never a link. Credit for the ones with real Matt Pocock lineage already lives on each skill's own doc page; repeating it here, or guessing at an aihero.dev URL for each one, would just be a second, less accurate copy of that.

## Start the day

Before touching any actual work, know what state you're picking up.

`/standup-prep` runs the whole morning routine in one call: it chains `/standup-prep-preflight` (which itself runs `/check-prior-work` and loads dependency context), `/load-session-context` (the last session's wrap file and any pending tasks), and `/load-session-guidelines` (coding standards and branch conventions), then sweeps every repo for uncommitted work and open PRs before writing a prioritised brief.

Run the whole thing, or reach for any one of its parts standalone when that's all a given session needs.

## The router

`/ask-matt` doesn't belong to any one stage below. It's a standalone router over the whole set: describe the situation you're in, and it names the skill or sequence that fits, plus where the human decisions in that sequence sit. Every other stage on this page is a destination `/ask-matt` can point you to; it's never a step inside one of them.

## Shape it

Before any code exists, settle what you're building and how big the decision actually is.

`/grill-me` and `/grill-with-docs` run the same interview (a relentless round-by-round decision tree) with one difference: `/grill-with-docs` also writes what it settles into `CONTEXT.md` and ADRs as it goes, for when you're in a real repo and want that record; `/grill-me` is for when you aren't. Both lean on `grilling`, the shared interview primitive underneath them. `/wait-what` is the same instinct turned inward: fire it the moment a reply of yours didn't land, and it re-pitches itself with whatever context was missing.

Once the shape is settled, `/to-spec` turns the conversation into a spec on the issue tracker (skip it entirely if the build fits one session), and `/to-tickets` breaks a spec, plan, or conversation into vertical-slice tickets with their blocking edges declared. `/wayfinder` is for the case one session can't hold at all: a shared map of decision tickets for work that spans many sessions. `/to-questionnaire` is the last resort when a decision is blocked on knowledge that lives in someone else's head, not yours.

## Build it

`/setup-engineering-skills` configures a repo for this stage once (issue tracker, triage labels, doc layout); `/start-issue` bootstraps a single session from a GitHub issue number straight into it.

`/implement` builds the work a spec or ticket describes, driving `/tdd`'s red-green loop at pre-agreed seams. `/tdd` is deliberately not a driver of its own: it's the reference for what a good test is and where the anti-patterns are, something else runs the loop. `/prototype` exists for the narrower question a full build doesn't answer yet: a throwaway runnable check on whether a state model or piece of logic actually holds up. `/wizard` is for the step no agent can take for you: generating an interactive script that walks a human through infrastructure or credentials setup by hand.

Building a new UI component specifically has its own three skills, one per framework: `/create-react-component`, `/create-vue-component`, `/create-angular-component`. All three follow the same two-phase scaffold-then-TDD shape as `/implement`, just framework-flavoured.

## Words for the codebase

Two skills underneath everything above, pulled in whenever the problem is the vocabulary itself rather than the process: `/codebase-design` for the shared discipline of designing deep modules and finding where a seam belongs, and `/domain-modeling` for actively building and stress-testing a project's own terminology. `/writing-for-agents` is the same instinct pointed at a different audience: writing skills, `AGENTS.md`, and `CLAUDE.md` themselves well.

## Land it

Getting a change from a local branch into `main`.

`/commit-wip` finds uncommitted work across every repo in the workspace and matches it to the right branch; `/wip-sweep` takes it from there with a tiered commit/push/draft-PR model, gated at each tier. `/create-pr` verifies branch hygiene, runs the quality gate, and opens the actual pull request. `/review-pr` reviews it on two separated axes (does it follow this repo's conventions, does it do what the issue asked), in PR mode or as a pre-flight on a branch before a PR exists; `/respond-pr-review` works through an existing Copilot review thread by thread, replying before fixing, batching the fixes into one commit. `/sync-branches` keeps every local branch current against its own default branch once the dust settles.

`review-pr` is this fork's landing step, not `code-review`: `code-review` carries the same two-axis idea but predates `review-pr`'s PR-posting and pre-PR branch mode. It's still present today, but slated for removal once `review-pr` fully covers its ground (issue #135), so it isn't given its own stage here.

## When it breaks

Three on-ramps, each for a different way work arrives instead of being planned.

`/triage` moves an incoming issue or external PR through a state machine of roles: categorise, verify, grill if the ask is unclear, write an agent-ready brief. `/diagnosing-bugs` is the disciplined loop for a hard bug or performance regression once you're already looking at one: reproduce, minimise, hypothesise, instrument, fix, regression-test. `/resolving-merge-conflicts` is for the one you're already sitting in: working through an in-progress git merge or rebase hunk by hunk, resolved by intent rather than by picking a side blind.

## Sweep for debt

Not urgent, not tied to one ticket, but worth doing on a cadence.

`/improve-codebase-architecture` scans for deepening opportunities and turns them into a visual report to grill through. `/research` investigates a question against high-trust primary sources and writes the findings up as a cited file. `/deslopify` strips AI tells back out of prose or code and restores a human voice. On the PR side, `/morning-pr-sweep` clears every open PR's review debt across every repo in one session, `/open-pr-sweep` is the read-only discovery pass behind it, and `/repo-status` produces the dirty-state table both of those (and `/standup-prep`) build on. `/query-issues` is the same kind of discovery, aimed at GitHub issues filtered by label instead of PR state.

## Run the wiki

A separate track from the code work above: keeping a personal knowledge base current, not building software.

`/ingest` reads a raw source (an article, a transcript, a paper) into the wiki, writing a synthesis page and updating the index and log. `/extract-quotes` and `/extract-vocabulary` both work from an already-ingested source: the first pulls the most quotable verbatim lines into a per-source page, the second pulls out unfamiliar jargon into a glossary. `/query` answers a question by reading the index and drilling into the relevant pages; `/wiki-lint` health-checks the whole thing for contradictions, orphan pages, and stale claims. `/rebuild-root-index` rescans every repo in the workspace and refreshes the master index that sits above the wiki itself. `/log-incident` records an AI behavioural mistake to the wiki's incidents hub, so a future session has a chance of recognising it before repeating it.

## Close the session

The scaffolding around every session, from the moment context starts running low to the moment the next one picks up.

`/session-wrap` is the main exit: it writes a summary of what happened, updates the session index, and hands off to `/wip-sweep` for the actual commit. `/handoff` is the lighter version, for compacting a conversation into a document for a different agent, harness, or person to continue, mid-task rather than at a natural end. `/extract-session-worktree` is for a narrower problem: pulling one session's uncommitted changes out of a working directory several concurrent sessions share, into its own isolated branch. `/collapse-session-folder` tidies up after the fact, merging same-day session-wrap folders into one. `/resolve-ai-paths` underlies several of these, resolving where the sessions, prompts, and morning-briefs folders actually live for a given workspace. `/capture` is for the freeform thought that doesn't belong to the current task: it routes straight to the right content project and opens its own PR. `/sync` and `/asana-sync` both push and pull against Asana, the first for a whole content workspace's tasks, the second specifically for the morning brief.

## Grow a contributor

A track about someone else's work, not your own.

`/learner-history` builds a factual, source-verified record of a learner's GitHub issue work so `/audit-issue` and `/next-issue` don't have to re-derive it. `/audit-issue` checks a specific issue body against a principles index and drafts fixes before it reaches a student. `/next-issue` picks which issue a learner should tackle next and runs that same audit on it first. `/teach` is the broadest of the four: teaching a new skill or concept over multiple sessions, using the working directory itself as a stateful teaching workspace.

## LittleBranches specifics

Org-specific instances of the stages above, gated on access to the LittleBranches `AGENTS.md` barrels: `/create-giselle-component` (this org's flavour of the framework-scaffolding skills in Build it), `/audit-giselle-tests` (a QA pass on AI-generated test quality), `/respond-giselle-pr-review` (this org's flavour of `/respond-pr-review`), `/load-oss-standards` and `/load-dependency-chain` (org-specific context-loading), and `/sync-roadmap` (pulling Asana task status back into each repo's own roadmap doc).

## Reach for on their own

Skills tied to one person's own setup or rarely reached for, outside any of the stages above: `/anonimise`, `/caveman`, `/edit-article`, and `/obsidian-vault` assume one particular local setup and aren't promoted for that reason; `/git-guardrails-claude-code`, `/karpathy-guidelines`, `/migrate-to-shoehorn`, `/scaffold-exercises`, and `/setup-pre-commit` are each a one-off tool for a specific, occasional need rather than something you'd reach for every session.
