This page is the vocabulary for how this fork is built, and how that differs from what people call an "agent harness." The words get mixed in public discussion. They are not the same layer.

## Four layers

**1. Session bootstrap (before useful work)**
Files and skills that load identity and repo law: `CLAUDE.md`, `AGENTS.md`, memory, `/load-session-guidelines`, `/load-session-context`, `/standup-prep`. These answer "who are we and what state are we walking into?" They are not a harness. They are onboarding.

**2. Skill**
One packaged procedure: a `SKILL.md`, optional scripts, optional references. Anthropic's split still holds: a skill teaches *how* to do a task and loads when relevant. `/tdd`, `/diagnosing-bugs`, `/create-pr` are skills.

**3. Flow**
A composed sequence of skills with a stated order, gates, and human decision points. `/standup-prep` chains preflight → context → guidelines → sweeps → brief. `/implement` drives `/tdd` at agreed seams. `/implement-tickets` loops `/implement` across a dependency frontier. `/triage` is a state machine of roles. This fork's overview stages (Start the day → Shape it → Build it → Land it → When it breaks → Sweep for debt → Close the session) are flows, not a second copy of the skill folders.

**4. Harness**
The runtime around a model: the loop, tools, isolation, process supervision, and anything that can advance or block work *even if the model does not feel like cooperating*. Claude Code and Codex are harnesses. SwarmForge is a harness. This skill set *installs into* those harnesses. It is not itself the process that launches tmux windows.

A useful test: if the model ignores the markdown, does the next step still happen? If no, you are still in skills/flows. If yes (a daemon, a test gate, an approval UI, a worktree supervisor), you are in a harness.

## What this fork actually is

It is a **soft control plane**: opinionated flows encoded as user-invoked skills, reusable discipline encoded as model-invoked skills, plus deterministic scripts where a prompt is not enough.

The README split is load-bearing:

- **User-invoked** skills orchestrate. You type them. They may call model-invoked skills. They must not call another user-invoked skill.
- **Model-invoked** skills hold the method (`/tdd`, grilling primitive, review axes). The agent may reach for them when the task fits.
- **`/ask-alex`** is the router over the set. It names a skill or a sequence and where the human decisions sit. It is not a step inside a flow.

That is harness *thinking* implemented as skills. It is not a second Claude.

## Mechanisms this fork already has

These are easy to undersell as "just slash commands." They are not.

**Isolation.**
`/extract-session-worktree` splits one session's uncommitted files out of a shared, multi-session-dirty checkout into its own worktree, branch, and PR. Scripts cut the branch from `origin/<default>` (not local HEAD), copy owned files, revert them in the source tree, and leave other sessions alone. Use it when several sessions share one working directory. Skip it when each session already has its own worktree.

**Parallel dispatch.**
`/implement-tickets` computes the frontier of unblocked child issues, puts each ticket on its own branch in its own worktree, and requires every frontier ticket to run concurrently. It stacks on the latest in-batch blocker branch. Worktrees go away after the PR. That is multi-agent / multi-session shape inside the host harness.

**Durable handoff.**
`/session-wrap` writes a numbered wrap under `{{SESSIONS_ROOT}}`, updates `sessions-index.md`, and chains `→ Next` so a fresh session can continue after the context window goes bad. `/handoff` is the mid-task packet for another agent, harness, or person. `/load-session-context` is the intake side. This is file state, not chat memory.

**Deterministic tools and gates.**
Not every step is prose. Worktree extract ships shell scripts. `/wip-sweep` has tiered commit/push/draft-PR gates. `/create-pr` has a quality gate. `/tdd` is a red-green loop another skill drives. `/triage` moves work through named roles. `/review-pr` splits Standards vs Spec.

**Session lifecycle.**
Start the day and Close the session are first-class, not afterthoughts. The wiki track (`/ingest`, `/query`, `/wiki-lint`, `/log-incident`) is a second product line on the same skill mechanism.

## Comparison: this fork vs a hard harness

Uncle Bob's SwarmForge is the usual public example of a hard harness: tmux roles, git worktrees, committed handoffs, a dashboard, tests and approval gates as a pipeline around agents. The interesting comparison is not "we don't isolate." We do. It is who owns the control plane.

| | This fork (soft control plane) | SwarmForge-style harness (hard control plane) |
|---|---|---|
| What you ship | Skills + flows + scripts | A supervisor that launches and coordinates agents |
| Host | Claude Code, Codex, other Agent-Skills-standard runtimes | The forge *is* the host |
| Isolation | Worktrees created because a skill says so (`extract-session-worktree`, `implement-tickets`) | Worktrees created because the launcher assigned a role checkout |
| Handoff | Wrap files, session index, `/handoff` docs | Committed handoffs between roles, often with a daemon |
| Parallelism | Concurrent sessions; frontier tickets in parallel worktrees | Concurrent role processes (tmux, etc.) |
| Gates | Skill text + scripts + host tools the agent must invoke | Process will not propagate work if the gate fails |
| Failure mode | Agent skips a stage or burns tokens | Work stays in the previous role / worktree |
| Best at | One engineer's day: shape, build, land, wrap, resume | Multi-role production line on a large task |
| Cost | Low extra runtime; tokens follow the model | Coordination overhead; can be token-heavy if over-constrained |

Both sides can use Gherkin, tests, reviews, and worktrees. Sharing those pieces does not make the layers the same.

## What we are not

- Not Claude's native pre-session settings. `CLAUDE.md` is bootstrap. Skills are procedures. Flows compose procedures. The harness is Claude Code / Codex / a forge.
- Not a squad leader plus named worker processes with a fixed FSM, unless you add that outside this repo.
- Not a replacement for unit tests, CRAP, mutation testing, or CI. Those remain deterministic tools the flows can call.
- Not automatically correct if the model ignores a user-invoked skill. Soft control planes depend on invocation and obedience. That is a documented tradeoff, not a bug we pretend not to have.

## Naming to keep in the docs

Use these words on purpose:

- **Skill** — one procedure (`SKILL.md` + optional scripts).
- **Flow** — a composed path through skills (the overview stages, `/standup-prep`, `/implement-tickets`).
- **Router** — `/ask-alex`.
- **Bootstrap** — guidelines, prior-work, morning brief.
- **Handoff** — the `/handoff` packet: a mid-task, ephemeral file for a different agent, harness, or person.
- **Wrap** — the `/session-wrap` record: a permanent, searchable entry in the session index. Not the same thing as a handoff.
- **Harness** — the host runtime this pack installs into.

Do not call a single `SKILL.md` a harness. Do not call SwarmForge a skill pack. Do not call `/standup-prep` "just startup" if you also mean `/implement-tickets` and `/session-wrap`.

For the fuller per-term treatment — definitions, examples, and edge cases — see the [vocabulary index](vocabulary/index.md).

A one-paragraph version of all of this, worth reusing wherever a short definition is more useful than the full page:

> A **skill** is one procedure. A **flow** is a composed path through skills, including worktree isolation, session wrap files, and gated git/PR steps. A **harness** is the runtime those skills install into. This repository ships skills and flows. It does not ship a new harness.

## When to add a hard harness on top

Stay in this pack when the unit of work is a session, a ticket, or a PR, and one host agent (plus parallel worktrees) is enough.

Reach for an external harness when you need:

- roles that keep running after this chat dies
- a gate that cannot be skipped by a model that "forgot" the skill
- a dashboard / lieutenant that is not another prompt
- a multi-day production line with durable role state independent of any one context window

`/handoff` already assumes that move: the packet is for "a different agent, harness, or person." This pack is what travels. The harness is what runs.
