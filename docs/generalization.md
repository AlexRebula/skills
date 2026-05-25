# Skills Generalization Tracker

This document tracks skills in this fork that currently carry project-specific hardcoding.
The goal is for every skill here to be usable by anyone — not just LittleBranches / giselle-mui contributors.

Each entry describes:
- **What's project-specific today** — exact line or assumption that limits reuse
- **Path to general** — concrete change needed to make it work for any project

---

## Status key

| Symbol | Meaning |
| --- | --- |
| ⚠️ Quick fix | Hardcoded string/path — one config change away from general |
| 🔧 Needs refactor | Skill logic is coupled to a specific convention that needs abstracting |
| ❌ By design | Skill deliberately targets giselle-mui — a general variant needs to be created separately |

---

## Skills with open generalization work

### `/standup-prep` ⚠️ Quick fix

**What's specific:** The first line hardcodes `AI_ROOT = c:\work\projects\ar\ai-workflow`. Anyone else running this skill gets the wrong path silently.

**Path to general:** Remove the hardcoded value. Document that the user must set `{{AI_ROOT}}` as a template variable in their VS Code settings (e.g. `"github.copilot.chat.templateVariables": { "AI_ROOT": "..." }`). The rest of the skill already uses `{{AI_ROOT}}` correctly via the variable.

**GitHub issue:** [ ] to be created

---

### `/standup-prep-preflight` ⚠️ Quick fix

**What's specific:** Step 2 calls `/load-oss-standards`, which fetches from `LittleBranches/oss-quality-standards`. Any user without access to that repo gets a dead step.

**Path to general:** Make the standards-loading step conditional or document it as optional. Add a note: "If you don't use LittleBranches OSS Quality Standards, replace this step with your own standards-loading skill or skip it."

**GitHub issue:** [ ] to be created

---

### `/load-oss-standards` ⚠️ Quick fix

**What's specific:** Fetches from `LittleBranches/oss-quality-standards` and `LittleBranches/oss-quality-standards-private` specifically. The verification + health-check pattern is completely reusable; only the URLs are specific.

**Path to general:** Accept a `--standards-url` argument (or a config key) pointing to any `AGENTS.md`. The default can remain the LittleBranches URL. Anyone running their own `AGENTS.md`-driven standards file can point to their own repo.

**GitHub issue:** [ ] to be created

---

### `/load-dependency-chain` ⚠️ Quick fix

**What's specific:** References `{{AI_ROOT}}\Agents\Context\dependency-chain.md` — the file path and the dependency-chain.md convention are both specific to this workflow.

**Path to general:** The skill is already parameterized via `{{AI_ROOT}}`. The remaining specificity is the `dependency-chain.md` convention itself. Document the expected file format so anyone can adopt it.

**GitHub issue:** [ ] to be created

---

### `/open-pr-sweep` ⚠️ Quick fix

**What's specific:** The `gh repo list` command hardcodes `LittleBranches|AlexRebula` as the org filter. Anyone else gets zero results.

**Path to general:** Add `--orgs` argument (comma-separated). Default to the user's authenticated GitHub username if no orgs are specified. The skill already supports `--repos` for individual repos; org-level default is the only missing piece.

**GitHub issue:** [ ] to be created

---

### `/morning-pr-sweep` ⚠️ Quick fix (partially done)

**What's specific:**
- ~~Default repo discovery hardcodes `LittleBranches|AlexRebula` orgs.~~ **Fixed in PR #14** — now uses `gh repo list` with a configurable org argument.
- Standards-loading still hardcodes the LittleBranches AGENTS.md URLs in Phase 0b.

**Remaining work:** Make standards-loading conditional. Check whether the target repo has an AGENTS.md at its root and load that; fall back to no-standards mode if none found. The `--repos` argument already allows full control over repo scope.

**GitHub issue:** [ ] to be created

---

### `/review-giselle-pr` ⚠️ Quick fix

**What's specific:** Standards are pre-loaded from `LittleBranches/oss-quality-standards`. The rest of the PR review workflow is fully general.

**Path to general:** Add `--standards-url` argument pointing to any `AGENTS.md`. The `giselle` in the name reflects the pre-loaded standard, not a technical limitation. Rename to `/review-pr-with-standards <N> --standards-url <url>` in a future iteration, keeping `/review-giselle-pr` as a named alias.

**GitHub issue:** [ ] to be created

---

### `/respond-giselle-pr-review` ⚠️ Quick fix

**What's specific:** Same as `/review-giselle-pr` — standards are pre-loaded from LittleBranches URLs.

**Path to general:** Add `--standards-url` argument. Same rename path as above.

**GitHub issue:** [ ] to be created

---

### `/sync-roadmap` 🔧 Needs refactor

**What's specific:** Two layers of specificity:
1. Config is read from a hardcoded alexrebula repo path (`c:/work/projects/ar/rm/presentation/alexrebula/.asana-config.json`)
2. The `data.tsx` companion update pattern is specific to the alexrebula codebase (Next.js data files that mirror roadmap.md)

**Path to general:**
- Layer 1 (config path): Already solved — the `asana-sync` skill dynamically locates `.asana-config.json` by searching workspace roots. `sync-roadmap` should adopt the same discovery pattern.
- Layer 2 (data.tsx): This is a project-specific side-effect. Make it optional/conditional. If no `data.tsx` companion exists, skip that step silently.

**GitHub issue:** [ ] to be created

---

### `/create-giselle-pr` ❌ By design (companion to `/create-pr`)

**What's specific:** This skill is intentionally coupled to the LittleBranches org:
- Pre-loads `LittleBranches/oss-quality-standards` (public) and `LittleBranches/oss-quality-standards-private` (private) AGENTS.md barrels
- Runs a banned-content scan against LittleBranches-specific identifier lists
- Assumes the `docs/pr-messages/` companion doc convention used in LittleBranches repos
- References `data/` branch prefix convention specific to this org

**Path to general:** `/create-pr` already exists as the general variant. `/create-giselle-pr` is intentionally a thin org-scoped wrapper. No further generalisation needed — but any user of this fork who wants to adapt it should:
1. Replace the AGENTS.md URLs with their own standards URL
2. Replace the banned-content scan with their own equivalent (or remove it)
3. Replace the companion-doc path with their own convention

**GitHub issue:** [ ] to be created (document as org-scoped wrapper in README)

---

### `/create-giselle-component` ❌ By design (general variant needed)

**What's specific:** This skill is intentionally coupled to giselle-mui:
- Enforces the giselle-mui folder taxonomy (`material/`, `chart/`, `motion/`, `lab/`, `section/`)
- Enforces LittleBranches OSS Quality Standards test patterns
- References MUI CSS variables mode and `theme.vars.*`
- Knows about subpath export architecture (`src/index.ts`, `src/charts-index.ts`, etc.)

**Path to general:** Create a new `/create-mui-component` skill that:
- Accepts the folder taxonomy as a question (not hardcoded to giselle-mui categories)
- Accepts a standards URL as config (defaults to no standards)
- Keep `/create-giselle-component` as a thin wrapper that pre-answers the giselle-mui questions

**GitHub issue:** [ ] to be created

---

### `/audit-giselle-tests` ❌ By design (general variant needed)

**What's specific:** Deeply coupled to giselle-mui:
- References `vi.mock('@mui/material/...')` as the specific anti-pattern
- References `renderWithTheme` helper and `ThemeProvider` with `cssVariables: true`
- References the two-phase scaffold quality gate (`src/quality-gate/two-phase-scaffold.test.ts`)
- Bucket C (compliant tests) is defined against giselle-mui test conventions

**Path to general:** Create a new `/audit-component-tests` skill that:
- Takes a config URL (or inline config) describing what "compliant" means for the target project
- Treats the MUI-mock anti-pattern as one specific case of "improper external dependency mocking"
- Keep `/audit-giselle-tests` as a named variant that pre-loads the giselle-mui config

**GitHub issue:** [ ] to be created

---

## Skills that are already general

These skills work in any project without modification:

| Skill | Notes |
| --- | --- |
| `/create-react-component` | No project-specific dependencies |
| `/create-vue-component` | No project-specific dependencies |
| `/create-angular-component` | No project-specific dependencies |
| `/review-pr` | Discovers standards from the target repo dynamically |
| `/respond-pr-review` | Discovers standards from the target repo dynamically |
| `/repo-status` | Pure git commands |
| `/wip-sweep` | Pure git + gh commands |
| `/commit-wip` | Pure git commands |
| `/check-prior-work` | Reads conversation context only |
| `/asana-sync` | Dynamically discovers `.asana-config.json`; no hardcoded paths |
| `/session-wrap` | Uses `{{AI_ROOT}}` template variable — user must set it, but it is not hardcoded |
| `/load-session-context` | Uses `{{AI_ROOT}}` template variable — same |
