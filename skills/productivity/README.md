# Productivity

General workflow tools, not code-specific.

## User-invoked

Reachable only when you type them (`disable-model-invocation: true`).

- **[grill-me](./grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[handoff](./handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[teach](./teach/SKILL.md)** — Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
- **[writing-great-skills](./writing-great-skills/SKILL.md)** — Reference for writing and editing skills well: the vocabulary and principles that make a skill predictable.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[grilling](./grilling/SKILL.md)** — Interview the user relentlessly about a plan, decision, or idea until every branch of the decision tree is resolved.

---

## AlexRebula extensions

Skills specific to this fork, not in the upstream mattpocock/skills repo.

- **[asana-sync](./asana-sync/SKILL.md)** — Opt-in Asana sync for morning briefs: locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[audit-issue](./audit-issue/SKILL.md)** — Audit a GitHub issue body against a principles index and draft fixes for approval. Use when preparing an issue for a student or junior contributor.
- **[caveman](./caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[check-prior-work](./check-prior-work/SKILL.md)** — Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[ingest](./ingest/SKILL.md)** — Ingest a raw source file into the personal wiki — reads the source, extracts metadata, writes a wiki/sources/ synthesis page, updates related wiki pages, and updates wiki/index.md and wiki/log.md. Add --deep to also write a long-form deep dive at wiki/deep/<slug>-deep.md.
- **[load-session-context](./load-session-context/SKILL.md)** — Load the session index and latest wrap file; check for an existing morning brief for today.
- **[collapse-session-folder](./collapse-session-folder/SKILL.md)** — Collapse all same-day session wrap folders into one combined folder. Repairs → Next footer links and updates sessions-index.md. Called automatically by /session-wrap.
- **[resolve-ai-paths](./resolve-ai-paths/SKILL.md)** — Resolve `SESSIONS_ROOT` and `PROMPTS_ROOT` for AI workflow skills. Call this at the start of any skill that reads/writes sessions or prompts folders.
- **[query](./query/SKILL.md)** — Answer a question using the personal wiki — reads the index, drills into relevant pages, synthesises an answer with citations, and optionally files the answer as a new wiki page.
- **[session-wrap](./session-wrap/SKILL.md)** — Write a session wrap doc, update the session index, and hand off to /wip-sweep. More powerful sibling of /handoff. Use at context >55% or after completing major work.
- **[standup-prep](./standup-prep/SKILL.md)** — Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync.
- **[standup-prep-preflight](./standup-prep-preflight/SKILL.md)** — Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[wiki-lint](./wiki-lint/SKILL.md)** — Health-check the personal wiki — scans for contradictions, orphan pages, stale claims, missing cross-references, and data gaps. Produces a prioritised finding list and suggests next ingests.
- **[learner-history](./learner-history/SKILL.md)** — Build a factual, source-verified history of a learner's GitHub issue work across an org. Call this before `/audit-issue` or `/next-issue` to establish what concepts the learner has already encountered and at what quality.
- **[next-issue](./next-issue/SKILL.md)** — Identify, audit, and prepare the next GitHub issue for a student or apprentice. GitHub-integrated wrapper around `/audit-issue` that adds automatic issue fetching, principles file discovery, and learner progression checks via `/learner-history`.
- **[rebuild-root-index](./rebuild-root-index/SKILL.md)** — Rescan every git repo under `$AR_ROOT` and refresh the master barrel index. Diffs against a content-hash manifest so only new/changed/deleted files are re-summarized. Chained from `/ingest` or run standalone.
- **[load-session-guidelines](./load-session-guidelines/SKILL.md)** — Load all session guidelines in one go: Karpathy coding rules, OSS quality standards, and PR/branch conventions. Run at the start of every session before any user task.
