## What it does

`manual-vercel-deploy` ships an app straight to Vercel via the Vercel CLI, bypassing GitHub Actions and Vercel's own git-integration build entirely. `vercel deploy` (or `vercel deploy --prod`) uploads and builds the current local checkout directly against Vercel's API — nothing about that path goes through GitHub Actions, so it keeps working even when Actions can't run at all.

It also documents the diagnosis that has to happen first: confirming GitHub Actions really is the blocker (not just slow), and separately confirming Vercel's own build actually works once triggered — those are two independent failure points, and finding one doesn't rule out the other.

## When to reach for it

Say something like "deploy manually" or "GitHub Actions budget ran out, get this live anyway" — the skill's own description is written to match. Reach for it whenever a real deploy needs to go out and the normal merge → CI → Vercel path is stalled because Actions itself can't run — most commonly a spending/budget limit being reached, but any Actions outage has the same shape.

## Diagnosing before assuming this applies

Don't skip straight to deploying. Two things worth checking independently:

- **Is Actions actually the blocker?** A run that fails in a couple of seconds with no real steps executed (`gh run view <id> --json jobs` shows empty `steps: []`) is the signature of a job that never started — check its check-run annotations for the actual reason once run logs have expired (`gh api repos/<owner>/<repo>/check-runs/<job-id>/annotations`), since GitHub keeps those around longer than full logs.
- **Does Vercel's own build even work right now?** `vercel ls` showing consistent, fast `Error` deployments well before the Actions problem started points to something else — commonly a private-registry package whose auth token was never configured as a Vercel environment variable (`npm error 401` on install). That's a separate, one-time fix, not something a bypass deploy works around on its own.

## Common questions

**Why does adding a missing environment variable need explicit confirmation if I'm already trying to unblock a deploy?**

Because it's an account-settings change to a third-party service, independent of whatever authorized the deploy itself. State plainly what's being added and where the value comes from, and get a clear yes before touching it — every time, not just the first time.

**What if the production deploy command gets blocked by an agent's own safety layer?**

That's the system working as intended for a real, externally-visible, hard-to-reverse action — don't hunt for another tool or flag to route around it. Stop, explain what was being attempted, and let the repo owner run it themselves or explicitly grant it.

**Does anything need to be undone once GitHub Actions is usable again?**

No. This skill only ever adds a path around Actions; it never modifies Actions itself, its workflows, or its billing. The normal merge → CI → deploy path resumes on its own.

## It's working if

- `vercel ls` shows a new deployment at the intended commit with `Ready` status.
- The deployed URL actually serves the app, not just exists with a green status.
- GitHub Actions itself — its workflows, its billing, its configuration — was never touched by this process.

## Where it fits

```txt
GitHub Actions available   -> normal path: merge -> CI -> Vercel git-integration deploy
GitHub Actions unavailable -> manual-vercel-deploy, from a local checkout
```

If the app also consumes a package published via [canary-publish](./canary-publish.md) and that package's own CI is down too, run canary-publish's manual publish phase first so there's an intended version for this deploy to actually build against.
