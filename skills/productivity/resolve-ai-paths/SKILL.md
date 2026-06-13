---
name: resolve-ai-paths
description: Resolve SESSIONS_ROOT, PROMPTS_ROOT, MORNING_BRIEFS_ROOT, and SKILLS_ROOT for AI workflow skills. Scans the workspace when template variables are not set. Call this at the start of any skill that reads or writes to the sessions, morning-briefs, or prompts folders — do not inline the resolution logic.
---

# Resolve AI Paths

Resolve the filesystem paths used by AI workflow skills. The calling skill invokes this, receives the resolved values, then substitutes them throughout its own steps.

> If your tool supports template variable substitution, define `SESSIONS_ROOT`, `PROMPTS_ROOT`, `MORNING_BRIEFS_ROOT`, and `SKILLS_ROOT` in your tool's configuration and they will be substituted automatically — this skill has nothing further to do. Otherwise, the scan steps below are the primary path-resolution mechanism.

---

## Step 1 — Resolve SESSIONS_ROOT

Work through these checks in order — stop at the first that succeeds:

1. **Template variable substituted** — if `{{SESSIONS_ROOT}}` is a real filesystem path (not the literal text `{{SESSIONS_ROOT}}`), use it. Done.
2. **Workspace scan** — search all folders visible in the current workspace for a file named `sessions-index.md`.
   - **One result** → announce `"Detected sessions folder: <path>"` and proceed.
   - **Multiple results** → list all candidates and ask: `"Which sessions folder should I use?"`
   - **No result** → ask: `"I could not find your sessions folder. Please provide the path to the folder that contains sessions-index.md."`

---

## Step 2 — Resolve PROMPTS_ROOT

_(Skip entirely if the calling skill does not use `PROMPTS_ROOT`.)_

1. **Template variable substituted** — if `{{PROMPTS_ROOT}}` is a real filesystem path, use it. Done.
2. Check whether any sibling folder of `SESSIONS_ROOT` (same parent directory) contains `prompts-index.md`. If yes, use that folder.
3. **Workspace scan** — search all visible folders for `prompts-index.md`. Apply the same one/multiple/none logic as Step 1.
   - If still not found: return `PROMPTS_ROOT = not found`.

---

## Step 3 — Resolve MORNING_BRIEFS_ROOT

_(Skip entirely if the calling skill does not use `MORNING_BRIEFS_ROOT`.)_

1. **Template variable substituted** — if `{{MORNING_BRIEFS_ROOT}}` is a real filesystem path, use it. Done.
2. Check whether any sibling folder of `SESSIONS_ROOT` (same parent directory) is named `morning-briefs` or contains a `morning-briefs-index.md` file. If yes, use that folder.
3. **Workspace scan** — search all visible folders for `morning-briefs-index.md`. Apply the same one/multiple/none logic as Step 1.
   - If still not found: ask: `"I could not find your morning briefs folder. Please provide the path."`

---

## Step 4 — Resolve SKILLS_ROOT

_(Skip entirely if the calling skill does not use `SKILLS_ROOT`.)_

`SKILLS_ROOT` is the root of the skills repository on disk — the folder that contains the `scripts/` directory (e.g. `scripts/collapse-sessions.ts`).

1. **Template variable substituted** — if `{{SKILLS_ROOT}}` is a real filesystem path, use it. Done.
2. **Workspace scan** — search all visible folders for `scripts/collapse-sessions.ts`. The parent of `scripts/` is `SKILLS_ROOT`.
   - **One result** → announce `"Detected skills root: <path>"` and proceed.
   - **Multiple results** → list all candidates and ask: `"Which skills root should I use?"`
   - **No result** → return `SKILLS_ROOT = not found` and tell the calling skill: any step that invokes `collapse-sessions.ts` must be skipped or handled manually.

---

## Output

Announce the resolved values before returning to the calling skill:

```
✔ SESSIONS_ROOT       = <resolved path>
✔ MORNING_BRIEFS_ROOT = <resolved path>
✔ PROMPTS_ROOT        = <resolved path>
✔ SKILLS_ROOT         = <resolved path>
  — or —
⚠ PROMPTS_ROOT not found — the calling skill must skip any step that requires it.
⚠ MORNING_BRIEFS_ROOT not found — the calling skill must skip any step that requires it.
⚠ SKILLS_ROOT not found — steps that invoke collapse-sessions.ts must be handled manually.
```

The calling skill substitutes these values wherever `{{SESSIONS_ROOT}}`, `{{MORNING_BRIEFS_ROOT}}`, `{{PROMPTS_ROOT}}`, and `{{SKILLS_ROOT}}` appear in its steps.
