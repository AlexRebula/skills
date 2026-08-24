#!/usr/bin/env bash
#
# revert-in-source.sh — remove a fixed list of files from the shared source
# repo's working tree, after they've been copied elsewhere (see
# copy-to-worktree.sh). Files that exist in HEAD are restored to their
# committed content (index + working tree); files that don't exist in HEAD
# (new this session, whether staged or not) are unstaged and deleted.
#
# Regular files only — a directory or symlink is not handled; pass its
# members individually. Only ever pass whole-file, single-owner paths here —
# the same rule as copy-to-worktree.sh. Never pass a shared append-only file
# that also contains another session's uncommitted lines.
#
# Usage:
#   revert-in-source.sh <source-root> <file1> [file2 ...]
#
# Exit codes:
#   0  all files reverted, verified clean
#   1  bad usage
#   2  a revert left the file still dirty (unexpected — investigate before continuing)
#
# Partial failure: this runs under `set -e`, so a failing command partway
# through the loop (e.g. a permission error) aborts immediately — the files
# processed before the failure are already reverted, the rest are not, and
# the "verifying clean" step below never runs because the script has already
# exited. A non-zero exit from this script means: inspect what's still dirty
# yourself and re-run with only the remaining paths, not "something is wrong
# with every path you passed."
#
# Example:
#   ./revert-in-source.sh /path/to/wiki SCHEMA.md wiki/index.md

set -euo pipefail

print_help() {
  sed -n '2,31p' "$0" | sed 's/^# \{0,1\}//'
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  print_help
  exit 0
fi

if [[ $# -lt 2 ]]; then
  echo "Usage: $(basename "$0") <source-root> <file1> [file2 ...]" >&2
  echo "Run with --help for details." >&2
  exit 1
fi

source_root="$1"
shift
file_count=$#

cd "$source_root"

for rel_path in "$@"; do
  if git cat-file -e "HEAD:$rel_path" 2>/dev/null; then
    # Existed in HEAD (this session modified it) — restore committed
    # content to both the index and the working tree. Plain `git checkout
    # -- <path>` is NOT enough here: it restores from the index, not HEAD,
    # so a staged modification would survive it untouched.
    git checkout HEAD -- "$rel_path"
    echo "✓ reverted tracked file: $rel_path"
  else
    # Never existed in HEAD (new this session) — unstage if staged, then
    # delete. `git rm --cached` on a file that was never staged is a
    # harmless no-op, swallowed below.
    git rm -f --cached "$rel_path" > /dev/null 2>&1 || true
    rm -f "$rel_path"
    echo "✓ removed new file: $rel_path"
  fi
done

echo "-- verifying clean:"
dirty="$(git status --porcelain -- "$@")"
if [[ -n "$dirty" ]]; then
  echo "!! still dirty after revert — investigate before continuing:" >&2
  echo "$dirty" >&2
  exit 2
fi

echo "✓ all $file_count file(s) confirmed clean in source repo"
