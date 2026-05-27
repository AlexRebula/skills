#!/usr/bin/env bash
set -euo pipefail

# Creates directory links in .agents/skills/<name>/ pointing to the canonical
# bucket directories at skills/<bucket>/<name>/.
#
# macOS / Linux : real symlinks (ln -sfn) — transparent and git-safe
# Windows       : NTFS directory junctions via PowerShell — same behaviour,
#                 no Developer Mode required
#
# In both cases, editing any file in the bucket dir is instantly visible via
# the link. Git checkout/pull/commit do NOT break either mechanism.
#
# VS Code Copilot registers skill paths as absolute paths (stored in state.vscdb).
# Those paths point to .agents/skills/<name>/SKILL.md — which resolves through
# the link to the bucket's SKILL.md automatically.
#
# Re-run only when: adding a NEW skill or cloning the repo.
# Runs automatically via: npm install (postinstall hook)
#
# Usage: bash scripts/sync-agents-skills.sh

REPO="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$REPO/.agents/skills"

mkdir -p "$DEST"

# Fail fast if any skill name appears in more than one bucket.
duplicate_check=$(find "$REPO/skills" -mindepth 3 -maxdepth 3 -name SKILL.md \
  -not -path '*/node_modules/*' \
  -not -path '*/deprecated/*' \
  -print0 |
  while IFS= read -r -d '' f; do basename "$(dirname "$f")"; done |
  sort | uniq -d)
if [[ -n "$duplicate_check" ]]; then
  echo "ERROR: duplicate skill names detected — each name must be unique across all buckets:" >&2
  printf '  %s\n' $duplicate_check >&2
  exit 1
fi

find "$REPO/skills" -mindepth 3 -maxdepth 3 -name SKILL.md \
  -not -path '*/node_modules/*' \
  -not -path '*/deprecated/*' \
  -print0 |
while IFS= read -r -d '' skill_md; do
  skill_dir="$(dirname "$skill_md")"
  name="$(basename "$skill_dir")"
  dest_dir="$DEST/$name"

  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash / Cygwin): use NTFS directory junction.
    # Real symlinks require Developer Mode; junctions work without it.
    if [[ -d "$dest_dir" ]]; then
      win_dest="$(cygpath -w "$dest_dir")"
      cmd //c "rmdir \"$win_dest\"" 2>/dev/null || rm -rf "$dest_dir"
    fi
    win_src="$(cygpath -w "$skill_dir")"
    win_dest="$(cygpath -w "$dest_dir")"
    powershell -NoProfile -Command \
      "New-Item -ItemType Junction -Path '$win_dest' -Target '$win_src'" \
      > /dev/null
  else
    # macOS / Linux: real directory symlink — no special permissions needed.
    ln -sfn "$skill_dir" "$dest_dir"
  fi

  echo "linked $name"
done

echo ""
echo "✔ .agents/skills/ links are up to date."
