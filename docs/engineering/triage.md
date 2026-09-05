## What it does

`triage` works through the issues on your project's tracker, moving each one through a small state machine of **triage roles** (a category role and a state role) and leaving behind either an agent-ready brief, a specific question for the reporter, or a closed issue with a recorded reason.

It is only for issues **you didn't create**. Raw bug reports, incoming feature requests, an external pull request that arrived unannounced: work that landed in the tracker from outside, in whatever shape the reporter left it. [Tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) that [to-tickets](https://aihero.dev/skills-to-tickets) produced are already agent-ready by construction, and running `triage` over them is wasted work at best. The rule is flat: `/triage` is only for incoming issues, not for issues you created yourself.

The second thing that separates it from labelling by hand: it recommends and waits. It tells you its category and state call with reasoning, plus what it found in the codebase, and applies nothing until you direct it.

## When to reach for it

You invoke this by typing `/triage` and then describing what you want in plain language. The [agent](https://www.aihero.dev/ai-coding-dictionary/agent) won't reach for it on its own. "Show me anything that needs my attention", "let's look at #42", "move #42 to ready-for-agent".

| What you have | Where to go |
| --- | --- |
| A tracker full of raw reports from other people | `/triage` |
| A rough idea of your own, nothing written down | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| A settled conversation to turn into a [spec](https://www.aihero.dev/ai-coding-dictionary/spec) | [to-spec](https://aihero.dev/skills-to-spec) |
| A spec to split into agent-ready tickets | [to-tickets](https://aihero.dev/skills-to-tickets) |
| A confirmed bug that needs a root cause, not a label | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

## Prerequisites

`triage` reads and writes your issue tracker, so `setup-engineering-skills` has to have configured that tracker and its label vocabulary first. The role names below are **canonical**; the label strings in your tracker may differ, and the mapping is what setup provides. If your tracker already uses the canonical names exactly, there is nothing to map and nothing to set up.

The tracker config also decides whether external pull requests count as a request surface, and who counts as external. That flag defaults to off and is no longer a setup question, so flip it in `docs/agents/issue-tracker.md` if you want PRs in scope.

## The state machine

Every triaged item ends up carrying exactly one category role and one state role. Two categories: `bug` (something is broken) and `enhancement` (new feature or improvement). Six states in this fork:

| State | Means |
| --- | --- |
| `needs-triage` | You need to evaluate it. Where an unlabelled issue normally lands first. |
| `needs-info` | Waiting on the reporter. Returns to `needs-triage` when they reply. |
| `ready-for-agent` | Fully specified, with an agent brief attached. An [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) agent can take it. |
| `ready-for-human` | The same brief, plus why this can't be delegated: judgment, external access, manual testing. |
| `to-grill` | Enough information to know the problem, not enough to know the solution. Route to [grill-me](https://aihero.dev/skills-grill-me); moves to `ready-for-agent` once that session produces a PRD. |
| `wontfix` | Closed, with the reason recorded. |

That is the whole vocabulary, and the "exactly one state role" invariant is what keeps the queries simple. `to-grill` is this fork's own addition on top of upstream's five: it is distinct from `needs-info` — `needs-info` waits on the _reporter_ for more facts, `to-grill` has enough facts already and is waiting on a design decision instead. You do not need `/triage` to reach `to-grill`: an issue you wrote and labelled yourself (a finding, an incident writeup, anything you already know needs design exploration before implementation) can carry the label from the moment you file it — `/triage`'s `to-grill` role exists for the same situation arriving from an _external_ reporter instead. It is also the most-requested area of the [skill](https://www.aihero.dev/ai-coding-dictionary/skill) upstream: users have asked for a state for work that is specified but blocked on another issue, for `deferred` work gated on a future trigger, and for a terminal `implemented` state. None of those has shipped upstream. See the questions below.

`wontfix` splits three ways, and the difference matters because only one of them writes to the knowledge base:

| Why you're closing it | What happens |
| --- | --- |
| Already implemented | A comment pointing at where it already lives. Nothing is written to `.out-of-scope/`, because it's a built feature, not a rejected one, and filing it there would poison the dedup checks. |
| Rejected bug | Polite explanation, then close. |
| Rejected enhancement | A file in `.out-of-scope/`, linked from the closing comment, then close. |

`.out-of-scope/` is one markdown file per rejected **concept**, not per issue, written as a short design document rather than a database row: what was rejected, why, and every issue that has asked for it. `triage` reads the whole directory before it evaluates anything, and matches by concept rather than keyword, so "night theme" matches `dark-mode.md`. When it hits a match it surfaces the old decision and asks whether you still feel the same way, instead of re-litigating the request from scratch.

## Verify before you brief

Before any [grilling](https://www.aihero.dev/ai-coding-dictionary/grilling), `triage` checks that the claim actually holds. For a bug, it reproduces it from the reporter's steps. For a PR, it checks the branch out and runs the relevant tests. Then it reports which of three things happened: confirmed, with the code path; failed to reproduce; or not enough detail to try, which is itself the strongest `needs-info` signal there is.

It runs two more checks against the codebase in the same pass: **redundancy** (is this already implemented, searched by domain concept rather than by the reporter's wording?) and **prior rejection** (does `.out-of-scope/` already say no?). Both are cheap, and both produce a `wontfix` when they hit.

All of it exists to make one artifact good: the **agent brief**, the structured comment posted when an issue moves to `ready-for-agent`. Once it's posted, the brief is the contract and the original report is only context. Briefs are written to be **durable** rather than precise, because an issue can sit in `ready-for-agent` for weeks while the code moves underneath it. So they name types, signatures and behavioural contracts, and never file paths or line numbers. A confirmed reproduction makes a far stronger brief than a guess does.

## A PR is an issue with attached code

Where the tracker treats external pull requests as a request surface, they run through the same machine, with the same categories, same states, same transitions. The states just read against the diff: `ready-for-agent` means a brief is attached and an agent should take the next step on the code, `ready-for-human` means it's ready for a person to merge. A brief on a PR describes what's left to do to the existing diff, not how to build the thing from nothing.

Discovery surfaces only _external_ PRs, because a collaborator's in-flight branch is not triage work. That filter is discovery-only, and naming a PR explicitly gets it triaged whoever wrote it. One rough edge: the GitHub template's external-PR listing command asks `gh pr list` for an `authorAssociation` field that `gh` does not expose, so the command as written fails outright ([#468](https://github.com/mattpocock/skills/issues/468)).

## Common questions

**I ran `/to-spec` and `/to-tickets`, and now those tickets are sitting there untriaged. Do I run `/triage` over them?** No. They are already agent-ready, because `to-tickets` applies the `ready-for-agent` label as it publishes, precisely so an AFK runner picks them up without another pass. The user who hit this had run the spec flow, seen `needs-triage` on the output, and found their AFK runner ignoring everything. `triage` is the on-ramp for work that arrives from outside; the spec flow is the lane for work you originate. They meet at `ready-for-agent`, not before.

**Is `triage` still relevant now that there's a `to-spec` → `to-tickets` → `implement` flow?** Only if you have inbound work. `triage` predates that spine and does a different job: it is the lane for reports other people filed. If everything in your tracker came out of your own planning, you will rarely open it. If you maintain anything public, or your team files bugs at you, it is the front door. The main use is open-source repos taking issues from external contributors.

**The agent tried to apply `ready-for-agent` and `gh` said the label doesn't exist.** Known open bug ([#616](https://github.com/mattpocock/skills/issues/616)). `setup-engineering-skills` writes the label vocabulary into `docs/agents/triage-labels.md`, but does not create the labels in your tracker. Create the six state labels and two category labels yourself, once, with `gh label create` or the tracker's UI, and it stops. There is a community fix branch linked from the issue that hasn't been merged.

**Six states still aren't enough: what about blocked, or deferred, or implemented?** `to-grill` (above) was this fork's own answer to one gap in the upstream five — it does not touch this one. This is the most-filed gap on the skill, in three shapes. An issue that is fully specified but waiting on another issue to close ([#139](https://github.com/mattpocock/skills/issues/139)), where the reporter's complaint was that `ready-for-agent` is "technically true" there but misleading, so an agent picks it up and hits a wall. Trigger-gated future work that is intended but not actionable yet ([#297](https://github.com/mattpocock/skills/issues/297)). And a terminal state for "implemented, awaiting verification", without which an AFK runner can re-queue finished tickets. Matt has agreed the blocked case is real and is undecided on the name (`blocked` versus `paused`). None of it has shipped. The workaround people use is a repo-local extra label alongside the category, which keeps the canonical state slot occupied by something honest at the cost of the skill not knowing about it. One community derivative goes further, adding `needs-slicing`, `tracking` and effort labels. That works, but it is theirs, not the skill's.

**How is this different from `/diagnosing-bugs`?** The verification step here is deliberately shallow (enough to answer "is this real, and roughly where does it live"), not to find a root cause. When a bug won't reproduce from the reporter's steps in a few minutes, the honest move is `needs-info`, or [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) if you want to chase it now. Neither skill's text currently mentions the other; a user found that seam, and it is still open.

**Can I point it at my whole backlog and let it run?** You can ask, but watch what it reads. The "show what needs attention" pass is a cheap listing meant for _selection_, where you pick one, and then it gathers full [context](https://www.aihero.dev/ai-coding-dictionary/context) on the one you picked. Run it across twenty issues at once and an agent can quietly fall back to that cheap listing as its evidence base, which returns issue bodies but not comments. A user hit exactly this: three issues already carried a comment saying "already fixed, recommend closing", and all three got fresh agent briefs instead. If you want a bulk pass, say explicitly that comments must be read per issue.

**Does it work with Linear, or anything other than GitHub Issues?** Yes, the tracker is config, not a hard-coded assumption, and people run it against Linear (via the `linear` CLI), GitLab, and plain markdown files under `.scratch/`. A common split is Linear for issues and planning, GitHub for code and PRs: skills that say "issue tracker" map to Linear, skills that say "PR" map to GitHub. On the local-markdown tracker there is an open template bug where the generated file can carry the acceptance criteria twice, once at the top level and once inside the agent brief ([#200](https://github.com/mattpocock/skills/issues/200)).

## It's working if

- Every item it touches ends with exactly one category role and one state role, never zero, never two states in conflict.
- It gives you a recommendation with reasoning and stops, rather than relabelling and moving on.
- The bug got reproduced, or the PR got checked out and run, before anything reached `ready-for-agent`.
- The briefs it writes name types and behaviours, and contain no file paths and no line numbers.
- A request that was rejected six months ago comes back, and it says so and quotes the old reason instead of triaging it fresh.
- Every comment it posts opens with `> *This was generated by AI during triage.*`

## Where it fits

`triage` is an **on-ramp**, not a step in the main chain. The main flow runs from an idea you had (grill, spec, tickets, implement, review), and `triage` is the parallel lane for work that arrived instead. The two lanes merge at two different points depending on how settled the request already is: a fully-specified request merges straight at `ready-for-agent`, which [implement](https://aihero.dev/skills-implement) picks up exactly as it would a ticket from [to-tickets](https://aihero.dev/skills-to-tickets); a request that still needs design exploration merges one step earlier, at `to-grill`, which routes into the same [grill-me](https://aihero.dev/skills-grill-me) → [to-spec](https://aihero.dev/skills-to-spec) → [to-tickets](https://aihero.dev/skills-to-tickets) pipeline an idea you originated yourself would use. When you're not sure which lane you are in, [ask-alex](./ask-alex.md) routes you.

Still needs design exploration, either self-filed or routed there by `/triage`:

```
idea or finding (yours) ──┐
                          ├──▶ [to-grill] ──▶ /grill-me ──▶ /to-spec ──▶ /to-tickets ──▶ [ready-for-agent] ──▶ /implement or /implement-tickets
report from outside ──▶ /triage ──┘
```

Already fully specified when it arrives:

```
report from outside ──▶ /triage ──▶ [ready-for-agent] ──▶ /implement or /implement-tickets
```

Two things are worth noting about the `to-grill` entry point above. First, filing that issue yourself needs no dedicated skill — a plain `gh issue create --label to-grill` (or your tracker's equivalent) is enough; there is currently no skill that packages a raw finding into that issue for you, and given how small the step is, that may not be worth building. Second, `/triage` itself is never the thing that runs `/grill-me` — it only applies the label and tells you a session is queued; you still invoke `/grill-me` yourself, same as the self-filed path.
