#!/usr/bin/env bash
#
# copy-to-worktree.sh — replicate a fixed list of files' session-modified
# state from the shared source repo into a new isolated worktree, preserving
# relative paths.
#
# Handles both directions a bucket-A file can change: if it exists on disk in
# the source, it's copied and verified byte-identical. If it does NOT exist
# on disk but DOES exist in the source repo's HEAD, the session deleted it —
# that deletion is replicated by removing it from the worktree too (the
# worktree started at a clean origin/<default-branch> checkout, so the file
# is there to remove). A path that exists in neither place is a real error,
# not a deletion — usually a typo.
#
# Non-destructive to the source repo either way. Pair with revert-in-source.sh
# (run only after visually confirming the copy) to apply the same changes
# there — restoring modified files to HEAD, deleting new ones. (Deleted files
# are already handled correctly by revert-in-source.sh's existing logic: it
# restores anything found in HEAD, which includes a file the session deleted.)
#
# Usage:
#   copy-to-worktree.sh <source-root> <worktree-path> <file1> [file2 ...]
#
# Arguments:
#   source-root     Root of the shared source repo (paths below are relative to this).
#   worktree-path   Root of the destination worktree.
#   fileN           Repo-relative paths to replicate — created, modified, or
#                   deleted by the session. Regular files only — a directory
#                   or symlink is not expanded; pass its members individually.
#                   Only whole-file, single-owner paths belong here — a file
#                   with interleaved content from multiple concurrent sessions
#                   (e.g. an append-only shared log) must NOT be passed to
#                   this script. Split those by hand instead (see SKILL.md's
#                   "Shared append-only files" section) — copying the whole
#                   file would drag another session's uncommitted lines into
#                   this branch.
#
# Exit codes:
#   0  all files replicated (copied or deleted) and verified
#   1  bad usage
#   2  a path was missing from both the source disk and the source's HEAD —
#      not a deletion, an actual error (check for a typo)
#   3  a copy did not verify byte-identical
#
# Example:
#   ./copy-to-worktree.sh /path/to/wiki /path/to/wiki-my-slug \
#       SCHEMA.md wiki/index.md _scripts/lib/new-module.ts old/moved-away.md

set -euo pipefail

print_help() {
  sed -n '2,47p' "$0" | sed 's/^# \{0,1\}//'
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

  if [[ -f "$src" ]]; then
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"

    if ! diff -q "$src" "$dest" > /dev/null; then
      echo "!! copy did not verify byte-identical: $rel_path" >&2
      exit 3
    fi

    echo "✓ copied: $rel_path"
  elif git -C "$source_root" cat-file -e "HEAD:$rel_path" 2>/dev/null; then
    # Not on disk, but exists in HEAD — the session deleted it. Replicate
    # that deletion in the worktree instead of treating it as an error.
    # rm -f is a safe no-op if the worktree never had this path to begin with.
    rm -f "$dest"
    if [[ -f "$dest" ]]; then
      echo "!! deletion did not verify — still present: $rel_path" >&2
      exit 3
    fi
    echo "✓ deleted (matches source deletion): $rel_path"
  else
    echo "!! missing from both source disk and source HEAD: $src" >&2
    echo "   (not a deletion — check the path for a typo)" >&2
    exit 2
  fi
done

echo "✓ all $file_count file(s) replicated (copied or deleted) and verified"
