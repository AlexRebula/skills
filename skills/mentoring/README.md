# Mentoring

Skills about growing someone else's work, not your own: preparing and auditing GitHub issues for a student or apprentice contributor.

- **[audit-issue](./audit-issue/SKILL.md)**: Audit a GitHub issue body against a principles index and draft fixes for approval before touching GitHub. Paste the issue body and your principles directly in chat: no `gh` CLI or file paths required. The lower-level primitive that `/next-issue` wraps with automatic issue fetching.
- **[learner-history](./learner-history/SKILL.md)**: Build a factual, source-verified history of a learner's GitHub issue work across an org. Call this before `/audit-issue` or `/next-issue` to establish what concepts the learner has already encountered and at what quality.
- **[next-issue](./next-issue/SKILL.md)**: Identify, audit, and prepare the next GitHub issue for a student or apprentice. GitHub-integrated wrapper around `/audit-issue` that adds automatic issue fetching, principles file discovery, and learner progression checks via `/learner-history`.
- **[teach](./teach/SKILL.md)**: Teach the user a new skill or concept over multiple sessions, using the current directory as a stateful teaching workspace.
