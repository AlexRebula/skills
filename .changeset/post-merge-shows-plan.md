---
'alexrebula-skills': patch
---

The `post-merge` git hook no longer starts `npm run notify-consumers` in the background, and it runs no code at all. When a merge or pull moves local `main` on, it prints the command that shows the plan (`npm run notify-consumers -- --dry-run`) and the one that starts the run (`npm run notify-consumers`). A run executes the code the pull just brought in, with your git and `gh` credentials, so you now always start it yourself. Without a `notify-consumers.config.json`, the hook says it isn't set up and that it's only needed when another project keeps a copy of this repo's skills data. It no longer writes `notify-consumers.log`. It still skips on CI, off `main` and when `HEAD` didn't move, and always exits 0.
