---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: 'What will the next session be used for?'
---

## Step 1 — Recover the full session history

The in-context summary is **always incomplete** if the conversation was compacted one or more times before the handoff was called. Work done in earlier parts of the session may have been summarised away and will be silently missing from the handoff unless you recover it first.

If the platform provides a session transcript file (e.g. `{{VSCODE_TARGET_SESSION_LOG}}` in VS Code Copilot — a template variable substituted at runtime with the session log file path; on other platforms the path may differ or be absent — see the fallback below):

1. Read the transcript file (JSONL — one JSON object per line).
2. Extract every `<conversation-summary>` compaction block. Each block is a faithful summary of what happened before that compaction point.
3. Also read the uncompacted tail — tool calls and assistant messages after the final block.
4. Merge this full history with what is visible in the current context window.

If no transcript file is available, proceed from context alone and add this note to the handoff document:

> ⚠️ Session transcript unavailable — this handoff may be incomplete if the conversation was compacted. Verify against screenshots or a separate session log if needed.

---

## Step 2 — Write the handoff document

Write a handoff document summarising the full session history (from Step 1) so a fresh agent can continue the work. Save to the temporary directory of the user's OS — not the current workspace.

Include a "suggested skills" section in the document, which suggests skills that the agent should invoke.

Do not duplicate content already captured in other artifacts (PRDs, plans, ADRs, issues, commits, diffs). Reference them by path or URL instead.

Redact any sensitive information, such as API keys, passwords, or personally identifiable information.

If the user passed arguments, treat them as a description of what the next session will focus on and tailor the doc accordingly.
