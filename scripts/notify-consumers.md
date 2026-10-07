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

- **Automatically:** `.githooks/post-merge` starts it in the background after a merge or a merging pull moves local `main` on. The pull doesn't wait for it.
- **Skipped by the hook**, which always exits 0:
  - on CI, when there's no config file, or when `npm` isn't found: the hook says why on stderr;
  - on any branch other than `main` (or a detached `HEAD`), or when the merge didn't move `HEAD`: silently.
- **Skipped by the script:** when the config lists no consumers. It prints the reason.
- **Not after a rebasing pull:** git doesn't run `post-merge` after `git pull --rebase` (or with `pull.rebase=true`). Run it by hand then.
- **By hand, at any time:**

  ```sh
  npm run notify-consumers
  ```

Each run does two things:

1. It regenerates the site data once (`npm run precheck` in `site/`). This includes provenance against the upstream repo, so it needs network access.
2. It runs every consumer's command, one after another. A consumer that fails, or whose checkout is missing, doesn't stop the others, but either makes the run exit 1.

## Read the log

An automatic run writes to `notify-consumers.log` at the repo root (gitignored). The hook overwrites it only when it actually starts a run, so after a skipped run the log still shows the previous one: check the `notify-consumers: started <timestamp>` line near the top before trusting it.

- Each consumer gets its own `ok`, `failed` or `skipped` line, and the consumer's own output sits around it, including the URL of any PR it opened.
- The last line is the summary: `done: N ok, N failed, N skipped`, or `done: regeneration failed, no consumer was notified` when step 1 failed (then no consumer ran).
- A by-hand run prints the same to the terminal.

## Troubleshooting

- **A consumer opened a PR although nothing in this repo changed.** The regeneration also refreshes provenance against the upstream repo. When upstream has moved on, the data changes (new upstream commit and links), and each consumer correctly proposes a refresh.
  - A consumer's own `--dry-run` uses the data already generated on disk, so it can say "unchanged" when the full run won't.
  - To see what a real run will do, run `npm run precheck` in `site/` first, then the consumer's dry run.
- **Nothing happened after a pull.** Check, in order:
  - Was it a rebasing pull?
  - Are you on `main`, and did the pull bring in new commits?
  - Is there a `notify-consumers.config.json`, and does it list any consumers?
  - Is `core.hooksPath` set to `.githooks`, and is `npm` on the hook's `PATH`?

  Then look at `notify-consumers.log`, checking its start timestamp first.

- **A consumer failed or was skipped.** A skipped consumer's checkout wasn't found at its `path`. To retry a failed one, run its command from its own checkout with `SKILLS_REPO` pointing here; most consumer syncs take `--dry-run` too, so you can see their plan first.
- **A sync PR from an earlier run is still open.** Merge or close it before running again: a second run on the same commit may try to open the same PR.
- **Use a different config file:** `npm run notify-consumers -- --config <path>`.
