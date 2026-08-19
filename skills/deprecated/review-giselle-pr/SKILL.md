---
name: review-giselle-pr
description: DEPRECATED — use /review-pr --standards-url https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md instead. That skill includes everything this one did, plus branch-mode pre-PR review and configurable standards URL.
---

# Review Giselle PR — Deprecated

This skill is superseded by `/review-pr`.

## Migration

Replace any invocation of this skill with:

```
/review-pr <N> --standards-url https://raw.githubusercontent.com/LittleBranches/oss-quality-standards/main/docs/AGENTS.md
```

For the private barrel, add it as a second `--standards-url` pass or load it manually:

```sh
gh api repos/LittleBranches/oss-quality-standards-private/contents/AGENTS.md \
  --jq '.content | @base64d'
```

## What changed

`/review-pr` now includes:

- **Branch mode** (`--branch <name>`): review a diff before a PR exists — findings reported in chat only
- **`--standards-url`**: load any org's standards from a raw URL instead of a hardcoded LittleBranches path
- **Blocking pattern scan**: XSS, privacy, sensitive data, security, accessibility, debug artifacts — always checked regardless of repo standards
- Everything `review-giselle-pr` previously did (two-axis review, inline GitHub comments, close-out audit)
