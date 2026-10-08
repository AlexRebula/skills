/**
 * check-test-git-env.ts
 *
 * Fails when a test file runs `git` through child_process (execFileSync,
 * execFile, spawnSync, spawn, execSync, exec) without an explicit `env`
 * option, or with `env: process.env` (or a spread of it). Inside a git hook the inherited GIT_DIR overrides `cwd`/`-C`, so
 * such a test acts on the real repository when the pre-push gate runs it.
 * Pass `env: cleanGitEnv()` from scripts/git-env.ts (see CONVENTIONS.md).
 *
 * A small source scan rather than an ESLint rule: this repo's root ESLint
 * config deliberately covers only a handful of scripts, and a custom rule
 * would need a local plugin. The scan covers every test file regardless.
 * It is a heuristic, not a parser: it only recognises `git` passed as a
 * string literal first argument, it doesn't check what a custom env holds
 * beyond `process.env`, and a regex literal containing a quote can confuse
 * it. Options passed as a variable are always flagged.
 *
 * Usage: tsx scripts/check-test-git-env.ts   (exit 1 when anything is found)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface UnsafeGitCall {
  line: number;
  call: string;
}

const SPAWNERS = new Set(['execFileSync', 'execFile', 'spawnSync', 'spawn', 'execSync', 'exec']);
const GIT_COMMAND = /^(['"`])git(\1|\s)/;
const ENV_OPTION = /(?:^|[{,\s])env\s*(?::|,|\}|$)/m;
const INHERITED_ENV = /(?:^|[{,\s])env\s*:\s*(?:\{\s*\.\.\.\s*)?process\.env\b/m;
const SKIPPED_DIRS = new Set(['node_modules', '.git', '.docusaurus', 'build']);
const TEST_FILE = /\.test\.[cm]?[jt]sx?$/;

/** If a string literal or comment starts at `i`, the index just past it; otherwise `i`. */
function skipNonCode(source: string, i: number): number {
  const char = source[i];
  if (char === '/' && source[i + 1] === '/') {
    const end = source.indexOf('\n', i);
    return end === -1 ? source.length : end;
  }
  if (char === '/' && source[i + 1] === '*') {
    const end = source.indexOf('*/', i + 2);
    return end === -1 ? source.length : end + 2;
  }
  if (char === "'" || char === '"' || char === '`') {
    let j = i + 1;
    while (j < source.length && source[j] !== char) j += source[j] === '\\' ? 2 : 1;
    return j + 1;
  }
  return i;
}

/** Splits the call starting at the `(` at `open` into its top-level arguments, and finds its end. */
function readArguments(source: string, open: number): { args: string[]; end: number } {
  const args: string[] = [];
  let depth = 0;
  let start = open + 1;
  let i = open;
  while (i < source.length) {
    const skipped = skipNonCode(source, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    const char = source[i];
    if ('([{'.includes(char)) depth++;
    else if (')]}'.includes(char)) depth--;
    if (depth === 0) {
      args.push(source.slice(start, i));
      return { args, end: i + 1 };
    }
    if (depth === 1 && char === ',') {
      args.push(source.slice(start, i));
      start = i + 1;
    }
    i++;
  }
  args.push(source.slice(start));
  return { args, end: source.length };
}

/** Every child_process call in `source` that runs git and passes no `env` option. */
export function findUnsafeGitCalls(source: string): UnsafeGitCall[] {
  const found: UnsafeGitCall[] = [];
  let i = 0;
  while (i < source.length) {
    const skipped = skipNonCode(source, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    const identifier = /^[A-Za-z_$][\w$]*/.exec(source.slice(i, i + 64));
    if (!identifier) {
      i++;
      continue;
    }
    const name = identifier[0];
    const open = source.slice(i + name.length).search(/\S/) + i + name.length;
    if (SPAWNERS.has(name) && source[open] === '(') {
      const { args, end } = readArguments(source, open);
      const options = args.slice(1).join(',');
      if (
        GIT_COMMAND.test(args[0].trim()) &&
        (!ENV_OPTION.test(options) || INHERITED_ENV.test(options))
      ) {
        found.push({ line: source.slice(0, i).split('\n').length, call: source.slice(i, end) });
      }
    }
    i += name.length;
  }
  return found;
}

function listTestFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory())
      return SKIPPED_DIRS.has(entry.name) ? [] : listTestFiles(join(dir, entry.name));
    return entry.isFile() && TEST_FILE.test(entry.name) ? [join(dir, entry.name)] : [];
  });
}

function main(): void {
  const repoRoot = fileURLToPath(new URL('..', import.meta.url));
  const problems = listTestFiles(repoRoot).flatMap((file) =>
    findUnsafeGitCalls(readFileSync(file, 'utf8')).map(
      ({ line, call }) => `  ${relative(repoRoot, file)}:${line}  ${call.split('\n')[0]}`
    )
  );
  if (problems.length === 0) {
    console.log('check-test-git-env: every git call in a test file passes an explicit env.');
    return;
  }
  console.error(
    [
      'check-test-git-env: these test calls run git without a GIT_*-free env option:',
      ...problems,
      'Inside a git hook the inherited GIT_DIR overrides cwd/-C and points git at this repository.',
      "Pass `env: cleanGitEnv()` (import { cleanGitEnv } from './git-env').",
    ].join('\n')
  );
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
