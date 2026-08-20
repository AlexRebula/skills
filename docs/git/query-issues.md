## What it does

`query-issues` fetches GitHub issues from a given repo filtered by one or more labels, using strict AND logic: an issue has to carry every listed label to match, not just one. It prints a formatted list in chat and writes nothing anywhere.

## When to reach for it

`/query-issues <owner>/<repo> <label>[,<label>...] [--state open|closed|all]`

Both the repo and at least one label are required; the skill asks rather than guesses if either is missing. State defaults to `open`.

Run it at the start of a session to find pending cross-repo work directed at the repo you are in (for example, a handover label), or any time you need to know which issues carry a specific label combination.

## AND logic is enforced twice

GitHub's own list and search endpoints do not reliably AND multiple label filters; some OR them instead. `query-issues` re-verifies the AND condition client-side after the fetch and discards anything that does not actually carry every requested label, regardless of which API path served the result. Never trust the filter alone.

Two fetch paths exist depending on the session: `gh issue list` with repeated `--label` flags when the `gh` CLI is available, or GitHub's search/list MCP tools with a `label:"..."` query for sessions where `gh` is not installed.

## Zero matches is not an error

An empty result for a label combination is reported plainly as "nothing pending for this label combination," never dressed up as a failure. A real error, repo not found, no access, an API failure, is reported as an error and never disguised as an empty result either. The two are kept distinct on purpose.

## Common questions

**Why does it re-check the AND logic after fetching, if the query already asked for it?**

Because some GitHub list endpoints silently OR their label filters instead of ANDing them, so trusting the query alone can return issues that only match some of the requested labels. Re-verifying client-side against the actual label list on each returned issue closes that gap.

**What happens if I only give one label?**

That is a valid single-label query; AND logic is vacuous with one term and every issue carrying that label matches.

## It's working if

- Every issue in the result carries all of the requested labels, not just one of them.
- A genuinely empty result reads as "nothing pending," not as an error.
- A real API failure or access problem is reported as a failure, with the specific call that failed named.
- Results are ordered newest first, with the correct singular or plural count at the end.

## Where it fits

`query-issues` is a standalone discovery tool, not a step in a chain. It answers a narrower question than [open-pr-sweep](./open-pr-sweep.md) (issues, not pull requests) and is commonly the first thing run in a session to check whether other work is waiting on the current repo before diving into anything else.
