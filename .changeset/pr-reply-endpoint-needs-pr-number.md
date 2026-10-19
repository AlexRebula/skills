---
'alexrebula-skills': patch
---

`respond-pr-review`, `respond-giselle-pr-review` and `morning-pr-sweep` now post inline replies to `/repos/<owner>/<repo>/pulls/<N>/comments/<comment-id>/replies`. The path they gave left out the PR number, so GitHub answered 404 for every thread and nothing was posted. The two respond skills also say what to do on a 404: check the PR number is in the path, and never fall back to a top-level review.
