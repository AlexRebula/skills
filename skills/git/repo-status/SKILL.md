---
name: repo-status
description: Dynamically discover all workspace git repos and produce a dirty state table (repo, branch, dirty file count, clean/uncommitted status). Sources paths from the VS Code workspace context and dependency-chain.md. Use before any WIP sweep or morning brief to know which repos need attention.
---

# Repo Status

## Discover repo paths dynamically (never hardcode paths)

> If `dependency-chain.md` was already loaded earlier in this session, it is in context. Do not re-read it — use the path references already extracted.

**Source 1 — VS Code workspace context (primary):** Your system context includes a `<workspace_info>` block that lists the open workspace folders. Extract every folder path from that block.

**Source 2 — dependency-chain.md:** Scan `{{WIKI_ROOT}}\wiki\projects\dependency-chain.md` for file system path references (any line containing an absolute path or a known repo name). Add any paths not already in your list.

**Source 3 — developer input (fallback):** If fewer than 2 repos are found after Sources 1 and 2, ask:

> "I could not auto-detect your repo locations from the workspace context. What is your project root directory? (e.g. `/Users/alex/projects` or `C:/work`)"

For each candidate path found in Sources 1 or 2, verify it is actually a git repo:

```sh
git -C "<path>" rev-parse --git-dir 2>/dev/null
```

Discard any path that is not a git repo.

**For any expected repo that cannot be located on disk:**

- Log it explicitly — do NOT skip silently:
  ```
  ⚠️ Repo not found on disk: <repo-name>
     Last known path: <path if seen in dependency-chain.md, else 'unknown'>
  ```
- After checking all candidates, collect all missing repos and ask:
  > "The following expected repos were not found:
  >
  > - <list>
  >   Please provide correct paths, or type 'skip' for any you want excluded."
- Wait for the developer's response before continuing.

## Check dirty state

For each confirmed repo path:

```sh
git -C "<repo-path>" status --porcelain
git -C "<repo-path>" branch --show-current
```

Produce a **dirty state table**:

| Repo         | Branch                        | Dirty files | Status         |
| ------------ | ----------------------------- | ----------- | -------------- |
| giselle-mui  | chore/two-phase-scaffold-gate | 7           | ⚠️ uncommitted |
| first-branch | main                          | 0           | ✅ clean       |
| ...          | ...                           | ...         | ...            |

Repos with zero dirty files → ✅ Clean.
