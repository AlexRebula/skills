## What it does

`setup-pre-commit` wires up Husky, lint-staged, and Prettier so that every commit runs formatting, a type check, and the test suite before it's allowed through. It detects your package manager, installs the three dependencies, initializes Husky, writes the pre-commit hook, and creates a Prettier config if one doesn't already exist.

The result is a repo where "I forgot to run the formatter" or "I committed something that doesn't type-check" stops being possible, not just discouraged.

## When to reach for it

Type `/setup-pre-commit`, or ask to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting, type-checking, or tests, and the agent will reach for it.

Reach for it once per repo, early, ideally before more than a couple of contributors have already built up their own local habits around when they format and test. It's a one-time setup, not something you run per feature.

## What gets installed

- **Husky**, for the `pre-commit` hook itself.
- **lint-staged**, running **Prettier** on staged files only, so the hook stays fast.
- A `typecheck` and a `test` script invocation inside the hook, if the repo already has those scripts in `package.json`. If it doesn't have one or both, the skill omits that line and tells you, rather than inventing a script that doesn't exist.

## Steps, in order

1. **Detect the package manager** from the lockfile present: `package-lock.json` → npm, `pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun. Defaults to npm if none is clearly present.
2. **Install** `husky`, `lint-staged`, and `prettier` as dev dependencies.
3. **Initialize Husky**: `npx husky init`, which creates `.husky/` and adds a `prepare` script to `package.json`.
4. **Write `.husky/pre-commit`**, running lint-staged, then typecheck, then tests, in that order, with the detected package manager's command prefix. Husky v9+ doesn't need a shebang line here.
5. **Write `.lintstagedrc`**, pointing every staged file at `prettier --ignore-unknown --write`.
6. **Write `.prettierrc`**, but only if the repo has no Prettier config already; an existing config is never overwritten.
7. **Verify**: the hook file exists and is executable, `.lintstagedrc` exists, `prepare` is set to `"husky"`, a Prettier config exists, and `npx lint-staged` actually runs.
8. **Commit** everything the setup created, with a message describing the hooks added. That commit runs through the brand-new hooks itself, which doubles as the smoke test that the whole chain actually works.

## Common questions

**What if the repo has no `test` script?**
The `test` line is left out of the pre-commit hook, and you're told it was skipped, rather than the hook silently failing on every commit because `npm run test` doesn't exist. Add a `test` script later and re-run the skill (or add the line yourself) to bring it into the hook.

**Will this overwrite my existing Prettier config?**
No. A Prettier config already present is left untouched; the default one the skill writes only shows up when there was nothing there before.

**Why does the setup commit end with the hooks running on themselves?**
Because that's the cheapest real test of whether the hook actually works end to end, on real staged files, in the exact way every future commit will experience it. A setup that "looks right" but has never actually fired isn't verified yet.

**The order is lint-staged, then typecheck, then tests. Why that order?**
Fast, staged-file-only formatting first, so the common case (a formatting nit) fails and gets fixed in under a second. The slower, whole-repo checks (typecheck, tests) only run once the fast one is already clean.

## It's working if

- `.husky/pre-commit` exists, is executable, and runs lint-staged, then typecheck, then tests, in that order.
- `.lintstagedrc` runs Prettier on staged files.
- `package.json`'s `prepare` script is `"husky"`.
- A Prettier config exists, and it's the one that was already there if the repo had one.
- The setup commit itself went through the new hook rather than being pushed with `--no-verify`.

## Where it fits

A standalone, one-time-per-repo setup skill, closest in spirit to [git-guardrails-claude-code](./git-guardrails-claude-code.md): both exist to make a class of mistake structurally impossible rather than relying on anyone (human or agent) remembering to be careful. Neither depends on the other, and installing both is the common case, not the exception.
