## What it does

`load-oss-standards` is the session-start check for any work touching a LittleBranches repository. It verifies you can actually reach the OSS Quality Standards AGENTS.md files, public and private, prints a one-screen health check, and carries the handful of rules that matter every session (branch prefixes, commit format, who approves a new branch) directly in the skill body.

It does not load the full AGENTS.md into context. That file runs to roughly 300 lines, and paying that cost every session for rules you mostly already know is exactly the waste the skill exists to avoid. The full text is fetched on demand, and only when a specific rule is actually in dispute.

## When to reach for it

Type `/load-oss-standards` at the start of any session that will touch a LittleBranches repo. Pass `--standards-url <url>` when you want to check a different org's public standards file instead of the LittleBranches default; that skips the private-repo check entirely, since a custom URL means the caller brought their own source.

| Your situation | Where to go |
| --- | --- |
| Starting a session against a LittleBranches repo | `load-oss-standards` |
| A specific rule in the health check needs the full text | The on-demand fetch inside this skill, not a proactive read |
| You need the actual PR review workflow, not just the rule summary | [respond-giselle-pr-review](./respond-giselle-pr-review.md), which loads it for you |
| Session-start needs deadline and critical-path context too | [load-dependency-chain](./load-dependency-chain.md), run alongside this one |

## Prerequisites

`gh` needs to be authenticated for the private standards check to succeed. If it isn't, the skill doesn't fail; it reports `⚠️ not authenticated` and continues on public standards alone. Nothing else is required, and the skill writes no files.

## What the health check actually verifies

Two `gh api` calls, not two full-file downloads: one against `LittleBranches/oss-quality-standards` (public, always reachable), one against `LittleBranches/oss-quality-standards-private` (requires auth). Each call asks only for the file's name, never its content, so a green check costs nothing more than confirming the door opens.

The table that gets printed also reports the active model, an estimate of how much context budget is already spent, and how many local skill prompts are on disk against the expected index. None of that needs the standards files at all; it rides along because session start is the one moment you actually want all of it in front of you at once.

## The rules it carries inline

Four rules ship in the skill body instead of behind a fetch, because they come up in nearly every session:

- **Branch prefixes** (§2.1): only `feature/`, `fix/`, `chore/`, `docs/`, `data/`, `refactor/`, `test/`, `style/`. `wip/` is explicitly banned.
- **Commit format** (§2.2): Conventional Commits, imperative mood, subject line under 72 characters.
- **Branch approval** (§1.2): the branch owner signs off before a new branch gets created.
- **Quality gate timing** (§3.3): don't run it proactively. The pre-push hook is what enforces it, at push time.

## Common questions

**Why not just load the whole AGENTS.md every time and be done with it?**

Because the rules above cover what actually recurs, and the other ~95% of the file is detail you only need when a specific line is being argued about. Loading all of it every session spends context on rules you already carry, session after session, for no benefit over fetching the one paragraph you need when you need it.

**What happens if the private repo check fails?**

The session continues on public standards only, with an explicit `⚠️` in the health check rather than a silent gap. Anything gated by the private repo (typically the encryption and banned-content rules) should be treated as unchecked for that session, not assumed to be fine.

**Does this replace reading the AGENTS.md file at all?**

No. It replaces reading it *every session*. The first time a rule is disputed, or the first time you touch a section this skill doesn't summarize, go fetch that section directly.

## It's working if

- The health check table prints before any repo work starts, with real status values, not placeholders.
- A failed private-repo check shows up as an explicit warning, not a silent skip.
- You never see the full AGENTS.md dumped into the conversation unless a rule was actually being disputed.
- The four inline rules are the ones that actually get followed for the rest of the session, without a re-fetch.

## Where it fits

`load-oss-standards` is a session-start check, not a step in a build chain. It pairs naturally with [load-dependency-chain](./load-dependency-chain.md) at the top of any LittleBranches session, and hands off to [respond-giselle-pr-review](./respond-giselle-pr-review.md) when the actual PR review workflow (not just the rule summary) is needed.
