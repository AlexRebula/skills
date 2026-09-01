## What it does

`review-pr` reviews a diff on two axes: **Standards**, whether the code follows the repo's documented conventions plus a fixed Fowler smell baseline that applies even when the repo documents nothing, and **Spec**, whether it implements what the originating issue or PRD actually asked for. It runs in two modes. PR mode reviews an already-open PR and posts findings through the GitHub PR Reviews API as inline comments. Branch mode (`--branch`) reviews a branch diff before any PR exists and reports findings in chat only, so you can catch problems before you open one.

## When to reach for it

`/review-pr <N>` reviews an open PR. `/review-pr --branch <name>` pre-flights a branch diff with no PR required. Add `standards-only` to skip the Spec sub-agent when there is genuinely no spec to check against, `<owner>/<repo>` when the repo cannot be inferred, or `--standards-url <url>` to layer an org-level standards document on top of whatever the repo already documents.

## Standards and Spec run as two parallel sub-agents

Before either sub-agent runs, the diff is scanned directly for a fixed list of always-blocking patterns: `dangerouslySetInnerHTML`, an unchecked `javascript:` scheme on an interactive component, real personal data in test fixtures, plaintext financial identifiers, hardcoded secrets, a missing `aria-label` on an icon-only control, and leftover `console.log`/`warn`/`error` in production code. These are flagged immediately, before any sub-agent output comes back, because they do not need a judgement call.

The Standards sub-agent gets the full diff plus every standards document the repo carries (`AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, ADR titles, plus any `--standards-url` content), plus a fixed baseline of twelve Fowler code smells that applies even when the repo documents nothing. It reports violations labelled `blocking`, `non-blocking`, or `suggestion`, citing the exact standard; baseline smells always land as `suggestion`, since they are judgement calls a documented repo standard can override. It skips anything a linter or formatter already enforces. The Spec sub-agent gets the diff plus the spec (an issue, a PRD, or a spec file found by branch or feature name) and reports missing requirements, scope creep, and requirements that look implemented but are actually wrong, quoting the spec line for each finding. Both run in a single parallel dispatch, not sequentially.

## PR mode posts; branch mode only reports

In PR mode, the review is posted via `event: "COMMENT"`, never `APPROVE` or `REQUEST_CHANGES` unilaterally, with line-specific findings attached to their file and line and general findings in the review body. A review is posted even with zero findings, and every review body ends with an attribution line. In branch mode, the same findings are printed as a table in chat and no API call is made at all; the message is explicit that blocking findings should be fixed before a PR is even opened.

## Common questions

**Why does it never approve or request changes on its own?**

Because that is a judgement the branch owner or a human reviewer makes, not something the review should decide unilaterally on their behalf. Every PR-mode review is posted as a comment, regardless of how clean or how broken the diff is.

**What happens if there is no spec to check against?**

The skill asks whether one exists. If you confirm there genuinely is none, the Spec sub-agent is skipped and the report notes "No spec - Spec axis skipped" rather than silently running only half the review without saying so.

**Does it resolve or fix anything itself?**

No, in either mode. It reports findings; fixing valid ones and resolving threads is [respond-pr-review](./respond-pr-review.md)'s job, not this skill's.

## It's working if

- Every blocking pattern from the fixed list is caught before the sub-agents even report back.
- Line-specific findings land on the correct file and line in PR mode; general findings land in the body.
- Branch mode never touches the GitHub Reviews API.
- A PR with genuinely zero findings still gets a posted review saying so, rather than silence.

## Where it fits

`review-pr` sits after a PR exists or a branch is ready to become one:

```txt
create-pr -> review-pr -> respond-pr-review
```

Use branch mode before calling [create-pr](./create-pr.md), to catch blocking issues while there is still no PR to clean up. Use PR mode after a PR is open, as an independent pass distinct from a bot review; its findings are exactly the kind of thing [respond-pr-review](./respond-pr-review.md) and [morning-pr-sweep](./morning-pr-sweep.md) triage and fix afterward.
