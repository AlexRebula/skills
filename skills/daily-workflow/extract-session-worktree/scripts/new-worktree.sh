#!/usr/bin/env bash
#
# new-worktree.sh — create an isolated git worktree off the repo's default
# branch (never a possibly-stale local HEAD), on a fresh branch.
#
# Usage:
#   new-worktree.sh <repo-root> <worktree-path> <branch-name>
#
# Arguments:
#   repo-root       Path to the existing repo (the shared working directory).
#   worktree-path   Path for the new worktree. Must not already exist.
#   branch-name     Name for the new branch (e.g. docs/20260813-my-slug).
#
# What it does:
#   1. Resolves the repo's actual default branch from origin/HEAD — never
#      assumes "main". A local checked-out branch can be stale (already
#      merged, sitting behind origin) without anyone noticing, so the new
#      worktree is always cut from the fetched remote tip, not local HEAD.
#   2. Fetches that default branch from origin.
#   3. Creates the worktree on the new branch, based on the fetched tip.
#
# Exit codes:
#   0  worktree created
#   1  bad usage
#   2  worktree-path already exists
#   3  git command failed
#
# Example:
#   ./new-worktree.sh /path/to/wiki /path/to/wiki-my-slug docs/20260813-my-slug

set -euo pipefail

print_help() {
  sed -n '2,25p' "$0" | sed 's/^# \{0,1\}//'
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  print_help
  exit 0
fi

if [[ $# -ne 3 ]]; then
  echo "Usage: $(basename "$0") <repo-root> <worktree-path> <branch-name>" >&2
  echo "Run with --help for details." >&2
  exit 1
fi

repo_root="$1"
worktree_path="$2"
branch_name="$3"

if [[ -e "$worktree_path" ]]; then
  echo "!! worktree-path already exists: $worktree_path" >&2
  exit 2
fi

if [[ ! -d "$repo_root/.git" && ! -f "$repo_root/.git" ]]; then
  echo "!! not a git repo: $repo_root" >&2
  exit 3
fi

cd "$repo_root"

default_branch="$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')"
if [[ -z "$default_branch" ]]; then
  echo "!! could not resolve origin/HEAD — is 'origin' fetched at least once? Falling back to 'main'." >&2
  default_branch="main"
fi

echo "-- resolved default branch: $default_branch"

if ! git fetch origin "$default_branch" --quiet; then
  echo "!! git fetch origin $default_branch failed" >&2
  exit 3
fi

echo "-- creating worktree at $worktree_path on new branch $branch_name (from origin/$default_branch)"

if ! git worktree add "$worktree_path" -b "$branch_name" "origin/$default_branch"; then
  echo "!! git worktree add failed" >&2
  exit 3
fi

echo "✓ worktree ready: $worktree_path (branch: $branch_name)"
