## What it does

`capture` takes a freeform thought, task, or note typed mid-session and turns it into a real, tracked artifact without breaking whatever you were doing: it routes the text to the correct content project, creates an Asana task, writes a schema-compliant markdown file, and opens a PR on its own dedicated branch. One command, one round trip, and you are back to what you were doing.

## When to reach for it

Type `/capture "<text>"`, or just say "capture this" mid-conversation. If you invoke it with no text, it asks what you want captured before doing anything else.

Reach for it the moment an idea, a task, or a stray note occurs to you and you do not want to lose it to the next context switch, but you also do not want to stop and file it properly by hand. That is the whole point: the mechanics of routing, ticketing, and filing happen in one call instead of three separate chores.

## What has to already be in place

This skill leans on project-level plumbing it does not itself build:

- `.asana-config.json` at the project root (created by running the project's own `npm run setup-asana`)
- `ASANA_TOKEN` set in `.env`
- A `npm run capture` script (or equivalent) that the project provides and that accepts freeform text

The skill's own job is thin by design: pass the text to that script, read its exit code, and report the result. All of the routing logic, the Asana call, the file write, and the branch-and-PR step live in the project's capture script, not in the skill.

## Reading the result

The script always exits with one of three codes, and the skill's behavior branches cleanly on each:

- **Exit 0** means success. You get the project and section it routed to, the file path it wrote, a link to the Asana task, and the branch and PR it opened. If the branch or PR came back null, the file and task still landed, just the git step failed, and you are told so explicitly rather than left to discover it later.
- **Exit 2** means the routing was ambiguous. The script's own suggested project is shown as the safe default alongside every other project it considered, and the skill waits for you to confirm or pick a different one before re-running with your choice locked in.
- **Exit 1** means an error, most often a missing config file, a missing token, or a project that was never registered. The skill surfaces the stderr message and the specific fix for each of those three cases.

## Common questions

**What happens if the git step fails but the task and file were created?**
You are told plainly that the branch and PR came back null, so you know to push manually. Nothing about the Asana task or the file write is undone.

**What if capture doesn't know which project this belongs to?**
It exits 2 with a suggested default and the full list of known projects, and waits for you to confirm before writing anything.

**Do I need to write the capture script myself?**
Yes, once, at the project level. The skill is the same across every project that has one; the script is what differs project to project.

## Where it fits

`capture` is the low-friction counterpart to `asana-sync`: where that skill batches a whole morning brief into Asana, this one handles a single stray thought the instant it occurs to you, without waiting for the next standup.
