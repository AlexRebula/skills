#!/usr/bin/env bash
# Privacy scan — checks files for hardcoded local paths, PII patterns, and local banned names.
# Usage:
#   check-privacy.sh <file> [<file> ...]   — scan specific files
#   check-privacy.sh --staged             — scan git staged files
#   check-privacy.sh --diff <base>        — scan files changed vs <base> branch

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOCAL_BANNED="$REPO_ROOT/.banned-patterns.local"

RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

FOUND=0

# ── Structural patterns (always enforced) ────────────────────────────────────

STRUCTURAL_PATTERNS=(
  # Windows local absolute paths
  '[cC]:/work/'
  '[cC]:\\\\work\\\\'
  # Mac/Linux local absolute paths with a username segment
  '/Users/[a-zA-Z][a-zA-Z0-9_-]*/'
  '/home/[a-zA-Z][a-zA-Z0-9_-]*/'
  # Email addresses (exclude @example.com, @github.com placeholders)
  '[a-zA-Z0-9._%+\-]+@(?!example\.|github\.|anthropic\.)[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
)

STRUCTURAL_LABELS=(
  "Hardcoded Windows local path"
  "Hardcoded Windows local path (backslash)"
  "Hardcoded Mac/Linux user path"
  "Hardcoded Linux home path"
  "Email address"
)

# ── Resolve file list ─────────────────────────────────────────────────────────

FILES=()

if [[ "${1:-}" == "--staged" ]]; then
  while IFS= read -r f; do
    [[ "$f" == *.md || "$f" == *.txt || "$f" == *.json || "$f" == *.yaml || "$f" == *.yml ]] && FILES+=("$f")
  done < <(git -C "$REPO_ROOT" diff --cached --name-only --diff-filter=ACM)
elif [[ "${1:-}" == "--diff" ]]; then
  BASE="${2:-origin/main}"
  while IFS= read -r f; do
    [[ -f "$REPO_ROOT/$f" ]] && \
    [[ "$f" == *.md || "$f" == *.txt || "$f" == *.json || "$f" == *.yaml || "$f" == *.yml ]] && \
    FILES+=("$REPO_ROOT/$f")
  done < <(git -C "$REPO_ROOT" diff --name-only --diff-filter=ACM "$BASE"...HEAD)
else
  FILES=("$@")
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "Privacy scan: no files to check."
  exit 0
fi

# ── Run structural checks ─────────────────────────────────────────────────────

for i in "${!STRUCTURAL_PATTERNS[@]}"; do
  pattern="${STRUCTURAL_PATTERNS[$i]}"
  label="${STRUCTURAL_LABELS[$i]}"
  while IFS= read -r hit; do
    echo -e "${RED}FAIL${NC} [$label] $hit"
    FOUND=1
  done < <(grep -rPn "$pattern" "${FILES[@]}" 2>/dev/null || true)
done

# ── Run local banned names (gitignored, personal) ────────────────────────────

if [[ -f "$LOCAL_BANNED" ]]; then
  while IFS= read -r term || [[ -n "$term" ]]; do
    [[ -z "$term" || "$term" == \#* ]] && continue
    while IFS= read -r hit; do
      echo -e "${RED}FAIL${NC} [Banned name: '$term'] $hit"
      FOUND=1
    done < <(grep -rn "$term" "${FILES[@]}" 2>/dev/null || true)
  done < "$LOCAL_BANNED"
else
  echo -e "${YELLOW}NOTE${NC} No .banned-patterns.local file found. Personal names will not be scanned."
  echo "      Copy .banned-patterns.local.example to .banned-patterns.local and add your terms."
fi

# ── Result ───────────────────────────────────────────────────────────────────

if [[ $FOUND -ne 0 ]]; then
  echo ""
  echo -e "${RED}Privacy scan FAILED.${NC} Fix all violations before committing."
  echo "  - Replace hardcoded paths with template variables (e.g. {{WIKI_ROOT}})"
  echo "  - Remove or anonymise personal names and contact details"
  exit 1
else
  echo "Privacy scan passed. (${#FILES[@]} file(s) checked)"
fi
