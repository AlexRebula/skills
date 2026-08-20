## What it does

`respond-giselle-pr-review` works through an open Copilot PR review on a LittleBranches repository, acting as the branch owner's assistant rather than the branch owner. It pre-loads the public and private OSS Quality Standards AGENTS.md files plus the standards repo's own PR-review workflow doc, triages every open thread, replies inline before touching any code, batches the valid fixes into one commit, and posts a follow-up on each fixed thread. It never resolves a thread itself; that stays the branch owner's call.

## When to reach for it

Use this instead of the generic PR-review-response skill specifically for LittleBranches repos: `giselle-mui`, `giselle-ui`, `giselle-sections-sdk`, `first-branch`, and others in the org. The generic skill is for everywhere else.

| Your situation | Where to go |
| --- | --- |
| An open Copilot review on a LittleBranches repo | `respond-giselle-pr-review <N>` |
| An open Copilot review on any other repo | `respond-pr-review` |
| You just want the standards rules summarized, not a PR worked | [load-oss-standards](./load-oss-standards.md) |
| The PR has merge conflicts *and* review threads | This skill; conflicts are resolved as step 2b, before triage starts |

Arguments: `<N>` is required (ask if it's missing). Add `<owner>/<repo>` if the repo can't be inferred from context. Add `--standards-url <url>` to load a different org's public standards instead of the LittleBranches default; that still fetches the LittleBranches workflow doc, but skips the private barrel unconditionally.

## Prerequisites

`gh` authenticated against GitHub, with access to `LittleBranches/oss-quality-standards-private` if you want the private rules loaded. If `gh` returns a permission error on the private repo specifically, the skill proceeds without it but says explicitly that banned-content and encryption rules went unchecked, rather than staying silent about the gap.

## Order matters here more than in most review-response flows

Standards and workflow load first, always, before a single thread is read. Then the repo and branch get identified and the merge/CI state gets checked, and this step is treated as mandatory rather than a nice-to-have: a clean `git status` locally does not mean the branch is conflict-free against the base, and the only trustworthy signal is the API's `mergeable` and `mergeStateStatus` fields. Merge conflicts block everything else and get resolved first; CI failures don't block gathering threads, but the fix rides along in the same batch commit as the review fixes.

Only after both of those checks does thread-gathering start, and it gathers *every* thread, plus your own prior replies, before triaging a single one — the dedup index built from your own past replies is what stops the skill from posting a second verdict or a second SHA follow-up on a thread it already answered in an earlier pass.

## The five verdicts

Every thread gets exactly one: `✅ Valid`, `❌ Not valid`, `⚠️ Partially valid`, `⏸️ Needs branch owner input`, or `⏭️ Valid but deferred`. Security and WCAG comments default to `✅ Valid` unless there's a specific technical reason they don't apply; that default exists because those categories are the ones where waving a comment away on a hunch costs the most.

A thread carrying a GitHub suggested-change block gets an explicit accept-or-reject call recorded before any custom fix is written for it. Silently ignoring a suggestion, or writing your own fix without saying whether the suggestion itself was accepted or rejected, is the one thing this step forbids outright.

## The close-out audit is not optional

Before handing back to the branch owner, every reply posted under your account in the session gets scanned for commitment language: "will," "follow-up," "separate issue," "fix in this PR." Each one needs a matching artifact — a commit SHA, an opened issue with its link posted back, or an updated PR description — before the report goes out. A reply that says "I'll open an issue for this" with no issue ever opened is exactly the gap this step exists to catch.

## Common questions

**Why load the standards fresh every time instead of relying on `load-oss-standards`?**

Because this skill needs the actual PR-review workflow document, not just the rule summary that skill carries inline. `load-oss-standards` is the lightweight session-start check; this skill's job requires the full workflow text.

**What if Copilot review never ran, or produced no threads?**

Say so to the branch owner and ask whether to re-request Copilot review or fall back to a manual review pass instead of guessing at what a review would have found.

**Can I resolve threads myself once the fixes are in?**

No. Resolution is the branch owner's decision, made after they've verified the fixes; the skill's job stops at replying and fixing.

**What happens to outdated threads, the ones GitHub collapses after a new commit shifts the diff?**

They're fully replyable through the same inline-reply endpoint as any active thread. No fallback to a top-level comment is needed just because a thread went outdated.

## It's working if

- Every thread has exactly one verdict, and every suggested-change thread has an explicit accept or reject recorded before any custom fix lands.
- The reply-before-fix order is real: no code changes before every non-acknowledged thread has its inline reply.
- All valid fixes land in a single batch commit, not scattered across several.
- Every fixed thread gets a SHA follow-up, and every deferred thread gets an issue link, with none skipped except where the dedup index shows you already posted one.
- The close-out audit turns up zero commitments without a matching artifact.
- No thread gets resolved by the skill itself; that decision is left sitting for the branch owner.

## Where it fits

`respond-giselle-pr-review` is the LittleBranches-specific version of `respond-pr-review`, with the org's standards and workflow pre-loaded instead of discovered per run. [load-oss-standards](./load-oss-standards.md) covers the lighter, session-start version of the same rule set when a full PR-review pass isn't what's needed.
