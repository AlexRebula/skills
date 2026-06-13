---
name: load-oss-standards
description: Verify access to the LittleBranches OSS Quality Standards AGENTS.md files (public + private), print a session health check table, and carry key rules inline. Use at the start of any session that touches a LittleBranches repository. Do not proactively load the full AGENTS.md — fetch on demand only when a specific rule is disputed.
---

# Load OSS Standards

Verify access to both AGENTS.md files. **Do not load the full content into context** — the key rules are already stated below and loading ~300 lines wastes context budget. Fetch on demand only if a specific rule is disputed.

## Arguments

`/load-oss-standards` — loads from the default LittleBranches OSS Quality Standards URLs. `/load-oss-standards --standards-url <url>` — loads a custom public `AGENTS.md` from the given raw URL instead. Skips the private standards repo check.

> **Adapting this skill?** Replace the default URLs in the `verify` section below with the raw URL to your own `AGENTS.md` file.

## verify — Check standards access

**If `--standards-url` was provided:** Confirm the custom URL is reachable without ingesting the body:

```sh
curl --head "<url>"
```

If it returns `HTTP 200` → ✅. If it returns an error or non-200 status → ❌ (log, continue). Skip the LittleBranches checks below — the caller supplied their own standards source.

**On-demand load for custom URL (only when a specific rule is in question):**

```sh
curl -sS "<url>" | grep -A 30 "^## <section>"
```

Do not proactively load the full file.

**Default flow (no `--standards-url`):**

**Public (always accessible):**

```sh
# Verify reachable — do NOT decode full content
gh api repos/LittleBranches/oss-quality-standards/contents/docs/AGENTS.md \
  --jq '.name' 2>/dev/null
```

If this returns `"AGENTS.md"` → ✅. If it fails → ❌ (log, continue).

**Private (requires `gh auth`):**

```sh
gh auth status 2>&1 | head -3
gh api repos/LittleBranches/oss-quality-standards-private/contents/AGENTS.md \
  --jq '.name' 2>/dev/null
```

If `gh auth status` fails or the second command errors → ⚠️ Private standards not loaded. Public standards apply only.

**On-demand full load (only when a specific rule is in question):**

```sh
gh api repos/LittleBranches/oss-quality-standards/contents/docs/AGENTS.md \
  --jq '.content' | base64 -d | grep -A 30 "^## <section>"
```

Do not proactively load the full file.

## rules — Key rules carried inline (apply throughout the session)

- **§2.1 — Allowed branch prefixes:** `feature/`, `fix/`, `chore/`, `docs/`, `data/`, `refactor/`, `test/`, `style/`. No other prefixes are valid. `wip/` is explicitly prohibited.
- **§2.2 — Conventional Commits:** `<type>(<scope>): <description>`, subject ≤ 72 chars, imperative mood.
- **§1.2 — Branch owner approval required** before creating any new branch.
- **§3.3 — Do NOT run the quality gate** proactively. The pre-push hook enforces it at push time.

## health — Print session health check

Before proceeding, print this table with real status values:

| Check                   | Status                                      |
| ----------------------- | ------------------------------------------- |
| OSS standards — public  | ✅ accessible / ❌ unreachable              |
| OSS standards — private | ✅ authenticated / ⚠️ not authenticated     |
| AlexRebula skills       | ✅ N skills on disk / ⚠️ N expected missing |
| Active model            | `<model-id>` (from system context)          |
| Session context budget  | ~N% used · ~N% available                    |

**Skills check:** List `.prompt.md` files in `{{AI_ROOT}}\Agents\Prompts\` and compare against `_index.md` in the same folder. Report count only — do not load the skill files.

**Active model:** Read the model name from the system context (the environment block injected at session start states "You are powered by the model named X"). Report the exact model ID. If the system block is absent or illegible, write `⚠️ model unknown`. This is the session-start model-detection banner — it surfaces any config-level downgrade before work begins. Mid-session compaction is handled by the wrap trigger rule below.

**Context budget:** Estimate the approximate % of the model's context window already consumed by system instructions, workspace info, copilot instructions, and any prior conversation. State plainly — e.g. `~20% used, ~80% available`.

- If context is already **>55%** at any point during this session: `⚠️ Context is over halfway full. Run /Session-Wrap now to reset the continuity pointer before proceeding further. A wrap at this point costs ~1% context and saves the next session from loading a stale file.`
- If context is already **>70%** at startup: `⚠️ Context is heavily loaded. Load only essential files for the rest of this session. Run /Session-Wrap before starting any new coding work.`

**Wrap trigger rule (applies throughout the session, not just at startup):** After completing any major task (PR merged, branch pushed, feature complete), re-estimate context budget. If >55%, suggest a wrap before the next task.

> **Note for OSS contributors:** This health-check pattern is generic and is a candidate for §0 of the public OSS AGENTS.md.
