## What it does

`morning-pr-sweep` clears review debt across every open PR you own in one session, instead of running [respond-pr-review](./respond-pr-review.md) once per PR. It discovers every open PR, triages every thread on every one of them together before touching any code, batches fixes into one commit per PR, posts SHA confirmations, and reports which PRs are ready to merge. One context load, one standards load, one pass through all the code, rather than N of each.

This skill makes real, public writes: acknowledgement replies before any fix, fix commits pushed to each PR branch, and SHA confirmation replies after each push, all visible to anyone with repo access, on public repos visible to the entire internet. It shows a full discovery table and waits for explicit confirmation before posting anything.

## When to reach for it

`/morning-pr-sweep` sweeps every repo owned by the authenticated user. `/morning-pr-sweep <owner>/<repo>` scopes to one repo, `--repos <a>,<b>` to a specific set, `--orgs <org1>,<org2>` to entire organisations, and `--standards-url <url>` loads one shared standards document for the whole sweep instead of discovering `AGENTS.md` per repo.

Do not run it on PRs you are not authorised to respond to, or in repos where AI-authored replies are against the contribution guidelines. Always review the discovery table before confirming.

## Discovery classifies every PR before anything happens

Each open, non-draft PR is classified as `needs-response` (bot threads exist with no author SHA reply yet), `needs-review` (open but no review posted), `merge-ready` (every bot thread already has an author SHA reply), or `blocked` (CI failing, conflicts, or draft). The full table is shown before any writes, and you can answer `yes` to proceed, `no` to abort with nothing written, or `list only` to see the table with no writes at all.

## Triage happens across all PRs before any fix

This is deliberately the most important phase. Every unresponded thread across every `needs-response` PR is read and assigned one combined verdict table, using the same five-verdict scheme as [respond-pr-review](./respond-pr-review.md): valid, not valid, partially valid, needs branch owner input, valid but deferred. Nothing gets fixed until the whole triage table is approved.

Replies go out thread by thread, in the order they appear, before any fix, using the nested reply endpoint rather than a top-level review submission. Fixes are then batched one commit per PR, not one commit per fix, with the quality gate run before each push. After each push, every fixed thread gets a SHA confirmation reply; deferred threads get their tracking issue link instead. Before the final report, a close-out audit re-scans every reply this account has ever posted on any swept PR, not just this session's, for dangling commitment language ("will fix," "will open an issue") with no corresponding artifact, and creates whatever artifact is missing before reporting back.

## Common questions

**Why triage everything before fixing anything, instead of going PR by PR?**

Because going PR by PR means N separate context loads and N separate standards loads for work that is fundamentally the same kind of pass repeated. Triaging every thread across every PR first means the whole picture is visible before any code changes, and the actual fixing happens as one focused pass per PR rather than interleaved with more discovery.

**What if a thread's reply was already posted by an earlier session?**

The dedup check for this is the same one [respond-pr-review](./respond-pr-review.md) uses: an existing reply from this account skips the verdict-reply step, and an existing SHA or deferred reply skips the follow-up step, so nothing gets double-posted across sessions.

**What does the skill leave for me to do?**

Resolving threads and merging. The final report explicitly names those as the next manual step; no merge or resolve API call happens in this skill.

## It's working if

- No writes happen until you have seen the discovery table and answered `yes`.
- Every PR marked `needs-response` ends the sweep with every thread replied to, fixed or explained, and SHA-confirmed.
- Exactly one fix commit lands per PR, never one per thread.
- The close-out audit catches any prior-session commitment with no matching artifact and creates it before the final report.

## Where it fits

`morning-pr-sweep` is the many-PRs version of the same loop [respond-pr-review](./respond-pr-review.md) runs on one:

```txt
open-pr-sweep -> morning-pr-sweep -> (manual resolve + merge)
```

[open-pr-sweep](./open-pr-sweep.md) is the pure-discovery version with no writes at all, useful when you just want the list. `morning-pr-sweep` is the write-making version that actually clears the debt; run it as a daily ritual rather than reaching for [respond-pr-review](./respond-pr-review.md) N times in a row.
