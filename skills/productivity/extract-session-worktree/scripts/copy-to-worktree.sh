#!/usr/bin/env bash
#
# copy-to-worktree.sh — copy a fixed list of files from the shared source
# repo into a new isolated worktree, preserving relative paths.
#
# Non-destructive: never touches the source repo. Pair with
# revert-in-source.sh (run only after visually confirming the copy) to
# remove these same files from the shared tree.
#
# Usage:
#   copy-to-worktree.sh <source-root> <worktree-path> <file1> [file2 ...]
#
# Arguments:
#   source-root     Root of the shared source repo (paths below are relative to this).
#   worktree-path   Root of the destination worktree.
#   fileN           Repo-relative paths to copy. Regular files only — a
#                   directory or symlink is not expanded; pass its members
#                   individually. Only whole-file, single-owner paths belong
#                   here — a file with interleaved content from multiple
#                   concurrent sessions (e.g. an append-only shared log) must
#                   NOT be passed to this script. Split those by hand instead
#                   (see SKILL.md's "Shared append-only files" section) —
#                   copying the whole file would drag another session's
#                   uncommitted lines into this branch.
#
# Exit codes:
#   0  all files copied and verified byte-identical
#   1  bad usage
#   2  a source file was missing
#   3  a copy did not verify byte-identical
#
# Example:
#   ./copy-to-worktree.sh /path/to/wiki /path/to/wiki-my-slug \
#       SCHEMA.md wiki/index.md _scripts/lib/new-module.ts

set -euo pipefail

print_help() {
  sed -n '2,34p' "$0" | sed 's/^# \{0,1\}//'
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  print_help
  exit 0
fi

if [[ $# -lt 3 ]]; then
  echo "Usage: $(basename "$0") <source-root> <worktree-path> <file1> [file2 ...]" >&2
  echo "Run with --help for details." >&2
  exit 1
fi

source_root="$1"
worktree_path="$2"
shift 2
file_count=$#

for rel_path in "$@"; do
  src="$source_root/$rel_path"
  dest="$worktree_path/$rel_path"

  if [[ ! -f "$src" ]]; then
    echo "!! missing source file: $src" >&2
    exit 2
  fi

  mkdir -p "$(dirname "$dest")"
  cp "$src" "$dest"

  if ! diff -q "$src" "$dest" > /dev/null; then
    echo "!! copy did not verify byte-identical: $rel_path" >&2
    exit 3
  fi

  echo "✓ copied: $rel_path"
done

echo "✓ all $file_count file(s) copied and verified byte-identical"
