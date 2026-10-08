# Keeping consumers in sync: `notify-consumers`

Other projects can keep a static copy of this repo's generated site data, such as a snapshot of the skills flow that a portfolio or a component library's stories read. `scripts/notify-consumers.ts` tells each of them to refresh that copy whenever local `main` moves on. Each consumer owns its own sync command (for example, one that rebuilds its snapshot and opens a PR when something changed); this script only starts it and reports the result.

It runs locally on purpose. This repo is public, so it holds no tokens and names no consumer. Which projects consume the data, and where their checkouts live, is personal machine setup.

`npm run notify-consumers -- --help` is the reference for options and exit codes; this page covers setup and troubleshooting.

## Set it up

1. Copy the example config and list your consumers:

   ```sh
   cp notify-consumers.config.example.json notify-consumers.config.json
   ```

   `notify-consumers.config.json` is gitignored. The fields of each consumer (`name`, `path`, `command`) are documented on `Consumer` in `scripts/notify-consumers.types.ts`. Each command runs with `SKILLS_REPO` set to this checkout, so it reads the data just regenerated here.

2. Make sure the git hooks are installed. `npm install` does it (`postinstall` runs `scripts/setup-hooks.js`), and `git config core.hooksPath` should print `.githooks`.

3. Check the plan without running anything:

   ```sh
   npm run notify-consumers -- --dry-run
   ```

## When it runs

- **Never automatically.** After a merge or a merging pull moves local `main` on, `.githooks/post-merge` only prints the two commands below (see the plan, run it). It runs no code itself: a run uses your git and `gh` credentials to push and open PRs, with the code the pull just brought in, so you look at the plan first and start it yourself.
- **Skipped by the hook**, which always exits 0:
  - on CI, or when there's no config file: the hook says why on stderr;
  - on any branch other than `main` (or a detached `HEAD`), or when the merge didn't move `HEAD`: silently.
- **Skipped by the script:** when the config lists no consumers. It prints the reason.
- **Not after a rebasing pull:** git doesn't run `post-merge` after `git pull --rebase` (or with `pull.rebase=true`), so nothing reminds you then.
- **By hand, at any time:** see the plan, then run it:

  ```sh
  npm run notify-consumers -- --dry-run
  npm run notify-consumers
  ```

Each run does two things:

1. It regenerates the site data once (`npm run precheck` in `site/`). This includes provenance against the upstream repo, so it needs network access.
2. It runs every consumer's command, one after another. A consumer that fails, or whose checkout is missing, doesn't stop the others, but either makes the run exit 1.

## Read the output

A run prints to the terminal you started it from, after a `notify-consumers: started <timestamp>` line. Nothing writes a log file any more; an old `notify-consumers.log` at the repo root is stale and safe to delete.

- Each consumer gets its own `ok`, `failed` or `skipped` line, and the consumer's own output sits around it, including the URL of any PR it opened.
- The last line is the summary: `done: N ok, N failed, N skipped`, or `done: regeneration failed, no consumer was notified` when step 1 failed (then no consumer ran).

## Troubleshooting

- **A consumer opened a PR although nothing in this repo changed.** The regeneration also refreshes provenance against the upstream repo. When upstream has moved on, the data changes (new upstream commit and links), and each consumer correctly proposes a refresh.
  - A consumer's own `--dry-run` uses the data already generated on disk, so it can say "unchanged" when the full run won't.
  - To see what a real run will do, run `npm run precheck` in `site/` first, then the consumer's dry run.
- **The hook printed nothing after a pull.** Check, in order:
  - Was it a rebasing pull?
  - Are you on `main`, and did the pull bring in new commits?
  - Is `core.hooksPath` set to `.githooks`?

- **The hook printed the commands but no consumer was updated.** That's expected: the hook never starts a run. Run `npm run notify-consumers`.

- **A consumer failed or was skipped.** A skipped consumer's checkout wasn't found at its `path`. To retry a failed one, run its command from its own checkout with `SKILLS_REPO` pointing here; most consumer syncs take `--dry-run` too, so you can see their plan first.
- **A sync PR from an earlier run is still open.** Merge or close it before running again: a second run on the same commit may try to open the same PR.
- **Use a different config file:** `npm run notify-consumers -- --config <path>`.
