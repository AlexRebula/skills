# Productivity

General workflow tools, not code-specific.

- **[asana-sync](./asana-sync/SKILL.md)** — Opt-in Asana sync for morning briefs: locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[capture](./capture/SKILL.md)** — Capture freeform text mid-session: routes to the correct Asana content project, creates a real task, writes a local markdown file, and commits it. Asks for confirmation when routing is ambiguous.
- **[sync](./sync/SKILL.md)** — Bidirectional Asana ↔ local sync: pulls new/updated tasks from Asana, pushes local changes, resolves conflicts (local wins), and commits. Idempotent.
- **[caveman](./caveman/SKILL.md)** — Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.
- **[check-prior-work](./check-prior-work/SKILL.md)** — Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[grill-me](./grill-me/SKILL.md)** — Get relentlessly interviewed about a plan or design until every branch of the decision tree is resolved.
- **[handoff](./handoff/SKILL.md)** — Compact the current conversation into a handoff document so another agent can continue the work.
- **[ingest](./ingest/SKILL.md)** — Ingest a raw source file into the personal wiki — reads the source, extracts metadata, writes a wiki/sources/ synthesis page, updates related wiki pages, and updates wiki/index.md and wiki/log.md. Add --deep to also write a long-form deep dive at wiki/deep/<slug>-deep.md.
- **[load-session-context](./load-session-context/SKILL.md)** — Load the session index and latest wrap file; check for an existing morning brief for today.
- **[collapse-session-folder](./collapse-session-folder/SKILL.md)** — Collapse all same-day session wrap folders into one combined folder. Repairs → Next footer links and updates sessions-index.md. Called automatically by /session-wrap.
- **[resolve-ai-paths](./resolve-ai-paths/SKILL.md)** — Resolve `SESSIONS_ROOT` and `PROMPTS_ROOT` for AI workflow skills. Call this at the start of any skill that reads/writes sessions or prompts folders.
- **[query](./query/SKILL.md)** — Answer a question using the personal wiki — reads the index, drills into relevant pages, synthesises an answer with citations, and optionally files the answer as a new wiki page.
- **[session-wrap](./session-wrap/SKILL.md)** — Write a session wrap doc, update the session index, and hand off to /wip-sweep. More powerful sibling of /handoff. Use at context >55% or after completing major work.
- **[standup-prep](./standup-prep/SKILL.md)** — Daily session startup coordinator. Runs preflight → session context → repo status + WIP sweep → open PR sweep → morning brief → file write → Asana sync.
- **[standup-prep-preflight](./standup-prep-preflight/SKILL.md)** — Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[wiki-lint](./wiki-lint/SKILL.md)** — Health-check the personal wiki — scans for contradictions, orphan pages, stale claims, missing cross-references, and data gaps. Produces a prioritised finding list and suggests next ingests.
- **[write-a-skill](./write-a-skill/SKILL.md)** — Create new skills with proper structure, progressive disclosure, and bundled resources.
