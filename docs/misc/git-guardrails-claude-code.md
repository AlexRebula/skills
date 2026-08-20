## What it does

`git-guardrails-claude-code` installs a `PreToolUse` hook that inspects every `Bash` command before Claude Code runs it, and blocks a fixed list of destructive git operations: `git push` (including `--force`), `git reset --hard`, `git clean -f` / `-fd`, `git branch -D`, and `git checkout .` / `git restore .`.

The block happens at the shell, not in the model. A blocked command exits with code 2 and prints a message telling Claude it does not have authority to run it. That is a different guarantee than "the agent has been told to be careful": a hook fires every time, whether the instruction to avoid the command is fresh in context or three compactions ago.

## When to reach for it

Type `/git-guardrails-claude-code`. The skill won't reach for itself; installing guardrails is something you decide to do, not something an agent proposes mid-task.

Reach for it once, per machine or per project, before you start pointing an agent at a repo you'd mind losing history in. It's cheap enough that there's no real downside to installing it everywhere.

| Your situation | Where to install |
| --- | --- |
| One repo you're worried about, others don't matter | Project scope, `.claude/settings.json` |
| Every repo on this machine | Global scope, `~/.claude/settings.json` |
| Both | Install project first; it layers on top of global |

## What actually gets blocked

- `git push`, in any form, including `--force` and `--force-with-lease`
- `git reset --hard`
- `git clean -f` and `git clean -fd`
- `git branch -D`
- `git checkout .` and `git restore .`

This list is a starting point, not a fixed contract. The skill asks whether you want to add or remove patterns before it finishes, and the script it copies in is a plain shell file you can edit by hand afterward.

## Project vs. global scope

Project scope writes the hook script to `.claude/hooks/block-dangerous-git.sh` and wires it into `.claude/settings.json`. It travels with the repo if you commit `.claude/`, and it only protects that one checkout.

Global scope writes to `~/.claude/hooks/` and `~/.claude/settings.json`, and covers every project you open with Claude Code on that machine. If a settings file already has other hooks configured, the skill merges into the existing `hooks.PreToolUse` array rather than replacing it, so your other hooks keep firing.

## Common questions

**Does this stop me from pushing at all?**
No. It stops Claude Code from running the push. You can still run `git push` yourself from a terminal; the hook only intercepts commands the agent issues through the `Bash` tool.

**What if I actually need Claude to force-push a branch it created?**
Ask it to tell you the exact command and run it yourself, or remove that one pattern from the hook script for the duration of the task and put it back after. The hook is a plain shell script; there's no override flag baked in on purpose.

**Will this catch every dangerous git invocation?**
No, and it isn't trying to. It catches the specific commands on the list, matched by pattern in the script. A sufficiently different phrasing of the same operation could slip through. Treat it as a guardrail against the common accidental case, not a sandbox.

## It's working if

- A blocked command exits with code 2 and a visible BLOCKED message, and Claude does not retry it silently.
- Other hooks you had configured before installing this one still fire.
- You can name, off the top of your head, which of the five default patterns you'd actually want to loosen for your own workflow.

## Where it fits

This is a standalone, install-once skill with no dependency on anything else in this collection. It sits alongside [setup-pre-commit](./setup-pre-commit.md) as the other piece of "protect me from myself" tooling: pre-commit hooks catch bad code before it's committed, this hook catches bad git operations before they run at all. Neither depends on the other, and there's no reason not to run both.
