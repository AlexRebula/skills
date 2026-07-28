---
name: rebuild-root-index
description: Rescan every git repo under $AR_ROOT and refresh $AR_ROOT/index.md, the master barrel index across the whole workspace. Diffs against a content-hash manifest so only new/changed/deleted files are re-summarized. Chained automatically from the final step of /ingest; can also be run standalone when a doc changes outside the wiki (e.g. in a component library or project repo).
disable-model-invocation: true
---

Rebuild `{{AR_ROOT}}/index.md` — the single file that gives any Claude session awareness of every markdown doc across every repo in the workspace, not just the wiki.

---

## Step 0 — Discover repos

List every direct child of `{{AR_ROOT}}` that contains a `.git` folder. This is the repo set for this run — don't hardcode a repo list, so a newly cloned repo is picked up automatically and a removed one drops out.

Sort alphabetically. The wiki repo (folder name `wiki`) is handled specially (Step 1); every other repo goes through the generic scan (Step 2).

---

## Step 1 — Wiki section

Do **not** recursively scan the wiki repo's files — it already has its own curated catalog. Instead:

1. Read `{{WIKI_ROOT}}/wiki/index.md`.
2. Reproduce its `## Projects`, `## People`, `## Concepts`, `## Personal`, and `## Sources` sections verbatim under a top-level `## Wiki` heading in the root index, rewriting each link target to be relative from `{{AR_ROOT}}` (prefix with `wiki/wiki/`, e.g. `wiki/wiki/projects/dependency-chain.md`).
3. This section always gets fully regenerated from the current `wiki/wiki/index.md` — there's nothing to diff, since the wiki's own `/ingest` flow already keeps that file current.

---

## Step 2 — Generic per-repo scan

For each non-wiki repo, find every `.md`/`.mdx` file, excluding these directory names anywhere in the tree: `node_modules`, `dist`, `build`, `coverage`, `storybook-static`, `.yalc`, `.git`, `src`, `stories`, `.storybook`, `public`, `examples`, `.claude`, `.obsidian`.

```bash
find "<repo>" \( -type d \( -name node_modules -o -name dist -o -name build -o -name coverage \
  -o -name storybook-static -o -name .yalc -o -name .git -o -name src -o -name stories \
  -o -name .storybook -o -name public -o -name examples -o -name .claude -o -name .obsidian \) -prune \) \
  -o \( -type f \( -iname "*.md" -o -iname "*.mdx" \) -print \)
```

For each file found, compute its content hash: `shasum -a 256 <file>`.

### Diff against the manifest

Read `{{AR_ROOT}}/.index-manifest.json` (a flat JSON map: `{ "<repo>/<relative-path>": { "hash": "<sha256>", "description": "<one-liner>" } }`). If it doesn't exist yet, treat every file as new.

- **New or changed hash** → needs summarizing (see below).
- **Unchanged hash** → reuse the existing `description` from the manifest, skip reading the file.
- **In the manifest but no longer on disk** → drop the entry.

### Summarizing new/changed files

Read each new/changed file and write a genuine one-line description — specific content, not a restatement of the filename. Distinguish:

- **First-party docs** (anything you authored — `docs/`, root `README`/`AGENTS.md`/`CLAUDE.md`/`CONTEXT.md`, `cases/`, `incidents/`, topic folders, etc.) — read properly, write a real synthesized one-liner.
- **Vendored/third-party docs** (recognizable vendored resource trees, e.g. `rm/resources/**`, `rm/design-system/**`, template/package READMEs bundled from elsewhere) — a lighter description is fine: just what the vendored package/template is, no deep synthesis.

If a repo has more than ~30 files to summarize in one run, delegate the read-and-summarize work to a subagent per repo (or per subfolder for very large repos) so it happens in parallel rather than serially.

### PII redaction — required before writing any description

Some repos (legal case files, personal records, or other sensitive content) contain real names and sensitive details that the wiki's own `/ingest` process would normally redact via role-based placeholders (see `{{WIKI_ROOT}}/vault.md` and the ingest skill's Step 2.5).

Before writing any description string into the index:

1. Check it against `{{WIKI_ROOT}}/vault.md` — if any real name/value in the description matches a vault entry, substitute the corresponding `{{PLACEHOLDER}}`.
2. If the description would otherwise contain PII (a private individual's name, sensitive allegation, financial specifics, ID/case numbers) that has **no** existing vault.md mapping, don't invent a new placeholder here — describe it generically instead (e.g. "personal legal case notes" rather than the specifics), and mention in this run's report that a new PII pattern was found so the user can decide whether it needs a permanent vault.md entry.
3. Never read `vault.md`'s content back to the user verbatim in chat — use it only to perform substitutions.

---

## Step 3 — Assemble `{{AR_ROOT}}/index.md`

Structure, in order:

1. **Header** — one-paragraph purpose statement (this file gives any session awareness of every doc across every repo under `{{AR_ROOT}}`) plus `> _Last regenerated: <today's date>_`.
2. **`## Wiki`** — from Step 1.
3. One `## <repo>` heading per non-wiki repo, alphabetical, each containing:
   - A flat list of `- [Title](repo/relative/path.md) — description` for files directly in the repo root.
   - `### <subfolder>` groupings for files nested under subfolders, when a repo has meaningful subfolder structure (most do) — group sensibly (e.g. by `docs/`, `docs/migrations/`, `cases/case-001/`), don't force every single leaf folder into its own heading if that fragments things unhelpfully.

Use relative markdown links from `{{AR_ROOT}}` (e.g. `giselle-mui/docs/roadmap.md`) — plain relative links, not `[[wikilinks]]`, matching the existing `wiki/wiki/index.md` convention and working in Obsidian, GitHub, and plain text alike.

---

## Step 4 — Save the manifest

Write `{{AR_ROOT}}/.index-manifest.json` with the full current map of `<repo>/<relative-path>` → `{ hash, description }` for every file scanned this run (across all non-wiki repos). This is what the next run diffs against.

---

## Step 5 — Report

Tell the user:

- Files scanned / new / changed / deleted, per repo
- Any new PII pattern found with no existing vault.md mapping (from Step 2's redaction check)
- Confirmation that `{{AR_ROOT}}/index.md` and `{{AR_ROOT}}/.index-manifest.json` were written
