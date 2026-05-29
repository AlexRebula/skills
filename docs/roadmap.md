# Skills — Roadmap

LittleBranches fork of [mattpocock/skills](https://github.com/mattpocock/skills). Adds purpose-built agent skills for the giselle-mui component library and LittleBranches OSS Quality Standards workflow.

Status legend: ✅ Done · 🔄 In progress · ⬜ Planned · ⏸ Blocked

---

## Current state — May 2026

Fork is live. LittleBranches-specific skills are shipped and installable via `npx skills@latest add AlexRebula/skills`. Original mattpocock skills are unchanged and included.

---

## Phase A — LittleBranches Core Skills ✅ (Done)

| Skill                        | Status |
| ---------------------------- | ------ |
| `/create-giselle-component`  | ✅     |
| `/audit-giselle-tests`       | ✅     |
| `/review-pr`                 | ✅     |
| `/review-giselle-pr`         | ✅     |
| `/respond-pr-review`         | ✅     |
| `/respond-giselle-pr-review` | ✅     |
| `/morning-pr-sweep`          | ✅     |
| `/create-react-component`    | ✅     |
| `/create-vue-component`      | ✅     |
| `/create-angular-component`  | ✅     |

---

## Phase B — Workflow Skills ⬜

| Skill           | Purpose                                                   | Status |
| --------------- | --------------------------------------------------------- | ------ |
| `/sync-roadmap` | Read Asana task completion → update roadmap.md checkboxes | ⬜     |
| `/session-wrap` | Compact conversation into a handoff doc                   | ⬜     |
| `/standup`      | Generate standup from recent session activity             | ⬜     |

---

## Phase C — Infrastructure ⬜

| Item                                                  | Status |
| ----------------------------------------------------- | ------ |
| Move canonical source from Google Drive to this repo  | ✅     |
| GitHub Actions CI: lint + validate all SKILL.md files | ⬜     |
| Automated sync: skills index → `README.md` table      | ⬜     |
