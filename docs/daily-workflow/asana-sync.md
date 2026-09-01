## What it does

`asana-sync` takes a finished morning brief and pushes it into Asana: it finds or bootstraps `.asana-config.json`, checks that you actually have write access to the project you are about to write into, creates a "Morning Briefs" section if one does not exist yet, files a task for every open PR, WIP commit, and critical-path item in the brief, posts the brief's narrative as a project Status Update, and appends a log of exactly what it wrote back into the brief file itself.

It is opt-in on every run. The skill does not decide on its own that today's brief should go to Asana; it asks first, and a "no" ends the skill immediately with nothing written anywhere.

## When to reach for it

You do not invoke this one directly most of the time. It is called from the standup flow after a morning brief exists, and it asks its own permission question before doing anything: "Sync today's standup to Asana?" Answer no and the rest of the skill never runs.

Reach for it once you actually want your daily brief to leave the terminal and become tracked work: tasks a teammate can see, or a personal record you did not have to type twice.

## The safety rules come first

Most of what this skill does is refuse to write somewhere unsafe, before it writes anywhere at all.

- **Never seed a repo-linked project.** The config's `projects` map ties each repo to its own Asana project for real engineering work. A morning brief landing there pollutes that backlog for everyone who can see it, so the skill blocks the attempt outright rather than asking permission.
- **Verify write access before selecting a target.** A quick lookup against the candidate project confirms you are actually a member with write access. No access means no write, full stop.
- **Warn on shared projects.** More than one member on the target project means anything written there is visible to all of them. The skill surfaces that fact and waits for an explicit yes before continuing.
- **Prefer a dedicated standup project.** Once `standupProjectGid` exists in the config, the skill goes straight to it and skips the selection prompt entirely. First run without one walks you through creating a personal project instead of guessing.

## The impact plan

Before a single task is created, the skill shows you exactly what it is about to do: which project, which tasks, with what titles and priorities. You confirm, edit, or decline. Nothing lands in Asana on the strength of the brief alone.

## Common questions

**What happens if I say no to the sync prompt?**
Nothing. The skill stops there. No config is read, no API call is made.

**Do I need to set anything up before the first run?**
No. If `.asana-config.json` cannot be found, the skill walks you through getting a personal access token, finding your workspace GID, and creating a dedicated standup project, then writes the config for next time.

**Will it ever create tasks in my team's project by mistake?**
Only if that project isn't in the `projects` repo-link map and you explicitly choose it despite the shared-project warning. The one thing it will never do is write into a project the config has tied to a specific repo.

**Where does the log of what was synced go?**
Back into the same morning brief file, under an "Asana Sync Log" heading, with links to every task and the Status Update it posted.

## Where it fits

`asana-sync` is the last step of the standup chain, not a standalone entry point. It assumes a morning brief already exists and turns it from a document you read once into tasks and a status update that outlive the session. It composes naturally with `capture`, which does the same kind of Asana-task-plus-file write for a single freeform thought rather than a whole brief.
