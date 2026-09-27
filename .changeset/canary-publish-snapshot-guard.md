---
"alexrebula-skills": patch
---

`canary-publish` now guards against publishing a real version by mistake. The snapshot version step must be run without piping its output, its exit code checked, and `package.json` confirmed to hold a `0.0.0-canary-` version before `changeset publish` runs. It also documents that `@changesets/changelog-github` needs a `GITHUB_TOKEN` for that step. The post-publish cleanup now restores every pending changeset (the version step consumes all of them, not just a new one), and the consumer step only clears the framework build cache when typecheck needs it and no dev server is running from that checkout.
