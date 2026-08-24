# Daily Workflow

The scaffolding around every session: starting the day, keeping Asana in sync, and closing out cleanly when context runs low or the work is done.

- **[standup-prep](./standup-prep/SKILL.md)**: Daily session startup coordinator. Runs preflight, then session context, then repo status and WIP sweep, then open PR sweep, then morning brief, then file write, then Asana sync.
- **[standup-prep-preflight](./standup-prep-preflight/SKILL.md)**: Composite pre-flight: runs `/check-prior-work`, `/load-oss-standards`, and `/load-dependency-chain` in sequence.
- **[session-wrap](./session-wrap/SKILL.md)**: Write a session wrap doc, update the session index, and hand off to `/wip-sweep`. More powerful sibling of `/handoff`. Use at context >55% or after completing major work.
- **[check-prior-work](./check-prior-work/SKILL.md)**: Scans context for a `<conversation-summary>` block and extracts earlier session work for continuity.
- **[load-session-context](./load-session-context/SKILL.md)**: Load the session index and latest wrap file; check for an existing morning brief for today.
- **[load-session-guidelines](./load-session-guidelines/SKILL.md)**: Load all session guidelines in one go: Karpathy coding rules, OSS quality standards, and PR/branch conventions. Run at the start of every session before any user task.
- **[handoff](./handoff/SKILL.md)**: Compact the current conversation into a handoff document so another agent can continue the work.
- **[collapse-session-folder](./collapse-session-folder/SKILL.md)**: Collapse all same-day session wrap folders into one combined folder. Repairs Previous/Next footer links and updates sessions-index.md. Called automatically by `/session-wrap`.
- **[extract-session-worktree](./extract-session-worktree/SKILL.md)**: Split one session's uncommitted changes out of a working directory shared by multiple concurrent sessions, into its own isolated git worktree and branch, without touching any other session's pending work.
- **[resolve-ai-paths](./resolve-ai-paths/SKILL.md)**: Resolve `SESSIONS_ROOT`, `PROMPTS_ROOT`, `MORNING_BRIEFS_ROOT`, and `SKILLS_ROOT` for AI workflow skills. Call this at the start of any skill that reads or writes the sessions, morning-briefs, prompts, or skills-repo folders.
- **[asana-sync](./asana-sync/SKILL.md)**: Opt-in Asana sync for morning briefs. Locate or bootstrap `.asana-config.json`, create the Morning Briefs section if missing, seed tasks with full metadata, post a Status Update, and log results back to the brief file.
- **[sync](./sync/SKILL.md)**: Bidirectional Asana to local markdown sync. Pulls new or updated tasks from Asana, pushes local changes, resolves conflicts (local wins), and commits.
- **[capture](./capture/SKILL.md)**: Capture a freeform thought, task, or note mid-session. Routes it to the correct content project, creates a real Asana task, writes a local markdown file, and commits it.
