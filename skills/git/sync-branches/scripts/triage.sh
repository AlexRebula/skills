#!/usr/bin/env bash
#
# Phase 0 + Phase 1 of the sync-branches skill.
#
# Fetches, resolves each repo's default branch from origin/HEAD, and prints a
# read-only triage report. Handles one repo or many, including a workspace that
# mixes `main` and `master` repos.
#
# Usage:
#   triage.sh                          # current repo
#   triage.sh /path/to/a /path/to/b    # one or more repos
#
# Read-only with respect to your work: it fetches, prunes remote-tracking refs,
# and may repair the local origin/HEAD ref. It never checks out, merges, pushes,
# commits, or deletes a branch.
#
# Exit codes:
#   0  every repo triaged
#   1  bad usage
#   2  at least one repo could not be triaged (see "!!" lines in the output)

set -uo pipefail

had_failure=0

# Resolve the remote-tracking default ref, e.g. "origin/master".
# Echoes an empty string when it cannot be determined.
resolve_default_ref() {
  local ref
  ref=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null) || ref=""

  if [ -z "$ref" ]; then
    # origin/HEAD is absent in --single-branch clones and some older clones.
    # This repairs a LOCAL ref only; it mutates nothing on the remote.
    git remote set-head origin --auto >/dev/null 2>&1 || true
    ref=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null) || ref=""
  fi

  printf '%s' "$ref"
}

# Branches fully merged into the default branch — deletion candidates.
# The branch you are currently on is filtered out of this list by `^\*`;
# print_current_branch below reports it separately.
print_merged() {
  local default_ref=$1
  local default_branch=$2

  echo "=== MERGED into ${default_ref} (deletion candidates) ==="
  git branch --merged "$default_ref" | grep -vE "^\*|^  ${default_branch}\$" || true
}

# Every local branch with its upstream and tracking state.
print_all_branches() {
  echo "=== ALL BRANCHES (branch|upstream|track) ==="
  git for-each-ref \
    --format='%(refname:short)|%(upstream:short)|%(upstream:track)' \
    refs/heads/
}

# A local branch with no configured upstream is NOT necessarily local-only —
# origin/<branch> may exist and tracking was simply never set. Report the real
# ahead/behind counts for those so they are not misread as local-only.
print_untracked_with_remote() {
  echo "=== SAME-NAME ORIGIN WITHOUT UPSTREAM ==="

  local branch upstream counts behind ahead

  while read -r branch; do
    upstream=$(git for-each-ref --format='%(upstream:short)' "refs/heads/${branch}")
    [ -n "$upstream" ] && continue
    git show-ref --verify --quiet "refs/remotes/origin/${branch}" || continue

    counts=$(git rev-list --left-right --count "origin/${branch}...${branch}")
    behind=$(echo "$counts" | awk '{print $1}')
    ahead=$(echo "$counts" | awk '{print $2}')

    echo "${branch}|origin/${branch}|[same-name remote, no upstream]|behind=${behind}|ahead=${ahead}"
  done < <(git for-each-ref --format='%(refname:short)' refs/heads/)
}

# Where the branch you are currently on stands relative to the default branch.
# ahead=0 means it is fully merged and is itself a deletion candidate.
print_current_branch() {
  local default_ref=$1
  local current counts behind ahead

  current=$(git branch --show-current)
  if [ -z "$current" ]; then
    echo "=== CURRENT BRANCH: (detached HEAD) ==="
    return
  fi

  counts=$(git rev-list --left-right --count "${default_ref}...HEAD")
  behind=$(echo "$counts" | awk '{print $1}')
  ahead=$(echo "$counts" | awk '{print $2}')

  echo "=== CURRENT BRANCH (excluded from the MERGED list above) ==="
  echo "${current}|behind=${behind}|ahead=${ahead}"
}

print_working_tree() {
  echo "=== WORKING TREE ==="
  if [ -z "$(git status --porcelain)" ]; then
    echo "clean"
  else
    git status --short
  fi
}

# Returns non-zero when the repo could not be triaged. Runs in a subshell, so
# it must signal failure through its exit code, not a shared variable.
triage_repo() {
  local repo=$1

  echo "====== REPO: ${repo} ======"

  if ! cd "$repo" 2>/dev/null; then
    echo "!! not a readable directory — skipped"
    return 1
  fi

  if ! git rev-parse --git-dir >/dev/null 2>&1; then
    echo "!! not a git repository — skipped"
    return 1
  fi

  git fetch --prune origin

  local default_ref default_branch
  default_ref=$(resolve_default_ref)

  if [ -z "$default_ref" ]; then
    echo "!! could not resolve origin/HEAD — skipped."
    echo "!! Do NOT assume 'main'. Ask the developer which branch is the default."
    return 1
  fi

  default_branch=${default_ref#origin/}

  echo "=== DEFAULT: ${default_branch} (${default_ref}) ==="
  print_merged "$default_ref" "$default_branch"
  print_all_branches
  print_untracked_with_remote
  print_current_branch "$default_ref"
  print_working_tree
  echo

  return 0
}

usage() {
  cat <<'EOF'
Usage:
  triage.sh                          triage the current repo
  triage.sh /path/to/a /path/to/b    triage one or more repos

Phase 0 + Phase 1 of the sync-branches skill: fetch, resolve each repo's
default branch from origin/HEAD, print a read-only triage report.

Never checks out, merges, pushes, commits, or deletes a branch.

Exit codes:
  0  every repo triaged
  1  bad usage
  2  at least one repo could not be triaged (see "!!" lines in the output)
EOF
}

main() {
  local -a repos

  if [ "$#" -eq 0 ]; then
    repos=("$PWD")
  else
    repos=("$@")
  fi

  local repo
  for repo in "${repos[@]}"; do
    # Subshell so a `cd` cannot leak into the next iteration.
    if ! ( triage_repo "$repo" ); then
      had_failure=1
    fi
  done

  if [ "$had_failure" -ne 0 ]; then
    echo "One or more repos could not be triaged — see the '!!' lines above."
    return 2
  fi

  return 0
}

case "${1:-}" in
  -h|--help)
    usage
    exit 0
    ;;
esac

main "$@"
