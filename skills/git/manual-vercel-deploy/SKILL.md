---
name: manual-vercel-deploy
description: Deploy an app straight to Vercel via the Vercel CLI, bypassing GitHub Actions and Vercel's own git-integration build entirely. Use whenever GitHub Actions is unavailable for a repo — most commonly a GitHub Actions spending/budget limit being reached, but the same steps apply to any Actions outage — and a real deploy still needs to go out.
---

# Manual Vercel Deploy

For any repo whose normal path to production is "merge → GitHub Actions runs CI → Vercel's git integration builds and deploys." When GitHub Actions can't run at all, that whole chain stalls — not just CI, but usually Vercel's own deploy too, since many git-integration setups treat Actions status as a gate. This skill deploys straight from a local checkout via the Vercel CLI, which talks to Vercel's API directly and never touches GitHub Actions.

This is a bypass, not a fix. It doesn't touch anything about why Actions is unavailable — see "Diagnosing: is this really an Actions problem?" below to confirm the actual cause before assuming this skill applies. Once Actions is usable again, the normal merge → CI → deploy path resumes on its own; nothing this skill does needs to be undone.

---

## Arguments

`/manual-vercel-deploy [--prod]`: repo inferred from the current working directory. Without `--prod`, deploys a preview build; with it, deploys to Production. `/manual-vercel-deploy <path> [--prod]`: explicit repo path, for when the current directory isn't the target app.

---

## Diagnosing: is this really an Actions problem?

Don't assume — confirm it, and confirm it's the *only* problem. Two independent things can each block a deploy; finding one doesn't mean the other isn't also present.

**Confirm GitHub Actions is actually blocked**, rather than just slow or one flaky run:

```sh
gh run list --repo <owner>/<repo> --workflow "<workflow-name>" --limit 5 --json conclusion,createdAt
```

If every recent run fails, get the real reason. Run logs expire from GitHub's storage after a while (`gh run view --log` / `--log-failed` returns `log not found` once they have) — when that happens, the check-run's own **annotations** survive independently and usually still carry the actual message:

```sh
gh api repos/<owner>/<repo>/actions/jobs/<job-id>/logs   # try this first — best detail while it's still available
# if that 404s:
gh api repos/<owner>/<repo>/check-runs/<job-id>/annotations
```

A spending-limit block reads roughly like this in the annotation (GitHub's own standard message, not something specific to any one org — it names both possible causes, but the one worth caring about here is the budget one):

> *the job was not started because the account's Actions spending limit needs to be increased*

If you don't have a recent run to inspect, `gh workflow run "<workflow-name>" --repo <owner>/<repo> --ref main` triggers one — safe to do purely diagnostically, since a blocked run does nothing. A run that fails in a couple of seconds with empty `steps: []` (check via `gh run view <id> --json jobs`) is this same signature: it never started, rather than started and failed partway through.

**Separately, confirm Vercel's own build actually works**, rather than assuming it's fine just because Actions isn't the thing you're fixing right now:

```sh
cd <repo> && vercel ls
```

If deployments show `Error` status well before today's Actions problem started, or in a handful of seconds (too fast to have actually installed dependencies and built), that's a *different*, likely pre-existing problem — inspect it:

```sh
vercel inspect <deployment-url> --logs
```

The most common cause for a fast, consistent failure here: the app depends on a private-registry package (e.g. GitHub Packages), and the Vercel project has never had the registry auth token configured as an environment variable. This shows up as `npm error 401 Unauthorized` on the install step. Check:

```sh
vercel env ls
```

If the token your app's own `.npmrc` expects (check for a line like `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}` — the variable name after `=` is what Vercel needs to supply) isn't in that list, that's the fix, and it's a one-time setup step, not something that recurs — see the next section. Don't skip this check and go straight to redeploying; a deploy that fails on a pre-existing, unrelated cause will look identical to "the Actions bypass didn't work."

---

## One-time setup, if needed

**Vercel CLI authenticated and the repo linked to its project:**

```sh
vercel whoami          # confirms auth; `vercel login` if not
ls .vercel/project.json 2>/dev/null || vercel link   # links this checkout to its Vercel project if not already
```

**Missing registry auth token** (only if the diagnosis above found this): adding an environment variable to a Vercel project is an account-settings change — get explicit confirmation before doing it, every time, even under an otherwise-authorized "just get it deployed" request. State plainly what you're about to add and where it comes from.

Pipe the value straight from wherever it already lives on disk — never type or `echo` a secret value directly on the command line. That specific pattern (`echo [value] | vercel env add ...`) is called out by Vercel's own CLI docs as writing the value to shell history in plain text; piping from a file avoids it entirely, matching Vercel's own documented convention for non-interactive `env add`/`env update`:

```sh
grep _authToken ~/.npmrc | sed 's/.*_authToken=//' | vercel env add NODE_AUTH_TOKEN production
grep _authToken ~/.npmrc | sed 's/.*_authToken=//' | vercel env add NODE_AUTH_TOKEN preview
```

Reusing the token already in `~/.npmrc` is the pragmatic default — it already exists, and minting a narrower one requires the repo owner's own action in GitHub's web UI (personal access tokens can't be created via `gh`/API). Flag explicitly that this token is likely broader than a consumer build needs (e.g. `write:packages` when only `read:packages` is required) and that swapping in a narrower one later is the repo owner's call, not something to decide unilaterally.

Vercel stores Production and Preview values as `sensitive` by default: once set, the value itself can't be read back later via the dashboard or `vercel env ls`, only overwritten or removed — the CLI's own confirmation output says so at add-time. This is genuinely one-time: once set, it persists on the Vercel project across every future deploy, manual or automatic, until someone rotates it.

---

## Deploying

```sh
cd <repo>
vercel deploy            # preview
vercel deploy --prod     # production
```

`vercel deploy` uploads and builds the current local working tree directly — it does not go through Vercel's git integration and does not care whether the branch is pushed, so it reflects exactly what's on disk right now, including anything not yet pushed. Deploy from a clean, intended commit (check `git status`/`git log` first) so what ships matches what you think it does.

**A production deploy is a real, externally-visible, hard-to-reverse action** — treat it with the same care as a `git push` to a shared branch, not as a routine command. Get explicit confirmation before running `--prod`, same as any other production-affecting action. If an autonomous/auto-mode environment's own safety layer blocks the command outright, that is the system working as intended — don't look for another tool or flag to route around it; stop, explain what you were trying to do, and let the repo owner either run it themselves or explicitly grant it.

---

## Reading the result

`vercel deploy` prints the deployment URL on success. For `--prod`, that URL is (or promotes to) the production domain; for a preview, it's a unique preview URL only. Either way, confirm it actually worked rather than trusting a clean exit code alone — `vercel inspect <url> --logs` shows the real build log if anything is in doubt.

If it fails, don't assume it's the same Actions-related cause you came here to bypass — read the actual error. A failure here that isn't the registry-auth issue above is a real, separate problem worth its own diagnosis, not something to retry blindly.
