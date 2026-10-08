/**
 * Inside a git hook, git exports GIT_DIR, GIT_WORK_TREE, GIT_INDEX_FILE and
 * friends to every child process. Those variables override `cwd` and `-C`, so
 * a child `git` call that inherits them acts on the repository running the
 * hook, not the one it was pointed at. A test that builds a throwaway repo in
 * a tmpdir and runs from the pre-push gate would then change the real repo.
 *
 * Pass `env: cleanGitEnv()` to every `git` child process a test spawns, and
 * to a script's git calls that must target a repo other than the one running
 * the hook, so `cwd`/`-C` decide which repository it touches.
 * (notify-consumers.ts keeps its own narrower filter on purpose: it hands
 * consumer commands an env that still carries GIT_AUTHOR_* and similar.)
 */
export function cleanGitEnv(env: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  return Object.fromEntries(Object.entries(env).filter(([key]) => !key.startsWith('GIT_')));
}
