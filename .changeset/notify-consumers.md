---
"alexrebula-skills": minor
---

Add `npm run notify-consumers`, which tells local consumers of the docs site's generated data to refresh their own copy. It regenerates the site data once (provenance included, so it needs network access), then runs each consumer's own sync command in that consumer's checkout, with `SKILLS_REPO` pointing back at this checkout, and logs each result. Consumers are listed in a gitignored `notify-consumers.config.json` (format in `notify-consumers.config.example.json`), so no machine-specific path is ever committed. A new `post-merge` git hook starts it in the background, logging to `notify-consumers.log`, whenever a merge or pull moves local `main` on. It does nothing on CI, on other branches, or when there is no config, and says why. `--dry-run` prints the plan and runs nothing.
