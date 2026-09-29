#!/usr/bin/env node
/**
 * notify-consumers.ts
 *
 * Tells every registered consumer of this repo's generated site data to
 * refresh its own copy. It regenerates the site data once (the site's
 * `precheck` generators, provenance against upstream included, so it needs
 * network access), then runs each consumer's own sync command in that
 * consumer's checkout and logs the result. What a consumer's sync does
 * (open a PR, rewrite a snapshot, nothing at all when unchanged) is up to
 * the consumer: this script only starts it and reports its exit code.
 *
 * Runs automatically from `.githooks/post-merge` (in the background, with a
 * log) when a merge or pull moves local `main` on, and by hand with
 * `npm run notify-consumers`.
 *
 * Config: a local, gitignored `notify-consumers.config.json` at the repo
 * root, in the shape of `NotifyConfig` (see notify-consumers.types.ts; copy
 * `notify-consumers.config.example.json` to start one). Consumer names and
 * paths are personal machine setup, so they never live in a tracked file.
 * Each `command` is an argument list (program first), spawned without a
 * shell, with its consumer's `path` as the working directory.
 *
 * Each command runs with `SKILLS_REPO` set to this checkout's root, so it
 * reads the freshly regenerated data from here. Git's repo-local variables
 * (`GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_PARAMETERS`, ...) and the outer
 * `npm run`'s `npm_*` variables are removed from its environment first: a
 * git hook exports the former, and a consumer's own git commands would
 * otherwise act on this repo instead of the consumer's.
 *
 * Usage: see HELP below (`npm run notify-consumers -- --help`).
 *
 * Output streams:
 *   stdout: the result. That is the help text, the dry-run plan, the skip
 *           reason when there is nothing to do, and the final summary line
 *           ("done: N ok, N failed, N skipped").
 *   stderr: everything else. Argument and config errors, the start
 *           timestamp, each step as it starts, and each step's ok/failed/
 *           skipped line.
 *   Each command's own output goes to the same stdout/stderr it inherits.
 *
 * Exit codes:
 *   0: every step succeeded, or there was nothing to do (skipped), or
 *      --help / --dry-run
 *   1: bad arguments or config, the regeneration failed (no consumer runs),
 *      or at least one consumer failed or its checkout was not found
 *      (the others still run)
 */

import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import type { CliArgs, Consumer, NotifyConfig, Plan, PlanInput, RunDeps, Step } from './notify-consumers.types';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_FILE = 'notify-consumers.config.json';
const EXAMPLE_CONFIG_FILE = 'notify-consumers.config.example.json';
const PREFIX = 'notify-consumers:';

export const HELP = `Usage: npm run notify-consumers -- [options]

Regenerates this repo's site data once, then runs each consumer's sync
command listed in ${CONFIG_FILE} (gitignored; copy
${EXAMPLE_CONFIG_FILE} to start one).

Options:
  --dry-run        Print the plan (which consumers, where, what command) and
                   exit. Runs nothing: no generators, no git, no gh.
  --config <path>  Read the config from <path> instead of ${CONFIG_FILE}
                   at the repo root. Unlike the default, <path> must exist.
  -h, --help       Print this help and exit.

Does nothing (and says why) on CI, when the default config file is missing, or when
it lists no consumers.

Exit codes:
  0  every step succeeded, there was nothing to do, or --help / --dry-run
  1  bad arguments or config, the regeneration failed, or a consumer failed
     or its checkout was not found`;

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

export function parseCliArgs(argv: string[]): CliArgs {
  const { values } = parseArgs({
    args: argv,
    options: {
      'dry-run': { type: 'boolean', default: false },
      config: { type: 'string' },
      help: { type: 'boolean', short: 'h', default: false },
    },
    strict: true,
    allowPositionals: false,
  });
  return { dryRun: values['dry-run'], help: values.help, configPath: values.config ?? null };
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

function parseConsumer(entry: unknown, where: string): Consumer {
  if (!isRecord(entry)) throw new Error(`${where} must be an object`);
  const text = (key: 'name' | 'path'): string => {
    const value = entry[key];
    if (!isNonEmptyString(value)) throw new Error(`${where} needs a non-empty "${key}" string`);
    return value;
  };
  const name = text('name');
  const path = text('path');
  if (!isAbsolute(path)) throw new Error(`${where} "path" must be absolute: ${path}`);

  const command = entry.command;
  if (!Array.isArray(command) || command.length === 0 || !command.every(isNonEmptyString)) {
    throw new Error(
      `${where} "command" must be a non-empty array of non-empty strings, program first, e.g. ["npm", "run", "sync"]`
    );
  }
  return { name, path, command: [...command] };
}

/** Parses and validates the config file's text. Throws with a readable message. */
export function parseConfig(text: string): NotifyConfig {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error('config is not valid JSON');
  }
  if (!isRecord(raw) || !Array.isArray(raw.consumers)) {
    throw new Error('config must be an object with a "consumers" array');
  }

  const seen = new Set<string>();
  const consumers = raw.consumers.map((entry: unknown, i: number): Consumer => {
    const consumer = parseConsumer(entry, `consumers[${i}]`);
    if (seen.has(consumer.name)) throw new Error(`consumers[${i}] duplicate consumer name: ${consumer.name}`);
    seen.add(consumer.name);
    return consumer;
  });
  return { consumers };
}

// ---------------------------------------------------------------------------
// Environment handed to each step
// ---------------------------------------------------------------------------

/**
 * Git's repo-local variables, as listed by `git rev-parse --local-env-vars`.
 * A hook inherits them, and they would pin a consumer's git commands to
 * this repo (or carry this repo's `git -c` config into them).
 */
const GIT_LOCAL_VARS = new Set([
  'GIT_ALTERNATE_OBJECT_DIRECTORIES',
  'GIT_CONFIG',
  'GIT_CONFIG_PARAMETERS',
  'GIT_CONFIG_COUNT',
  'GIT_OBJECT_DIRECTORY',
  'GIT_DIR',
  'GIT_WORK_TREE',
  'GIT_IMPLICIT_WORK_TREE',
  'GIT_GRAFT_FILE',
  'GIT_INDEX_FILE',
  'GIT_NO_REPLACE_OBJECTS',
  'GIT_REPLACE_REF_BASE',
  'GIT_PREFIX',
  'GIT_SHALLOW_FILE',
  'GIT_COMMON_DIR',
]);

function isInheritedOnly(key: string): boolean {
  return (
    GIT_LOCAL_VARS.has(key) ||
    /^GIT_CONFIG_(KEY|VALUE)_\d+$/.test(key) || // the entries GIT_CONFIG_COUNT counts
    key.startsWith('npm_') // the outer `npm run notify-consumers`'s package and lifecycle
  );
}

export function consumerEnv(base: NodeJS.ProcessEnv, repoRoot: string): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(base)) {
    if (!isInheritedOnly(key)) env[key] = value;
  }
  env.SKILLS_REPO = repoRoot;
  return env;
}

// ---------------------------------------------------------------------------
// Plan
// ---------------------------------------------------------------------------

export function buildPlan({ ci, config, configPath, repoRoot, pathExists }: PlanInput): Plan {
  if (ci) {
    return { kind: 'skip', reason: 'CI detected, consumers are only notified from a local checkout' };
  }
  if (!config) {
    return {
      kind: 'skip',
      reason: `no config at ${configPath} (copy ${EXAMPLE_CONFIG_FILE} to ${CONFIG_FILE} to set one up)`,
    };
  }
  if (config.consumers.length === 0) {
    return { kind: 'skip', reason: `no consumers listed in ${configPath}` };
  }
  return {
    kind: 'run',
    regenerate: { label: 'regenerate site data', cwd: join(repoRoot, 'site'), command: ['npm', 'run', 'precheck'] },
    consumers: config.consumers.map((c) => ({
      label: c.name,
      cwd: c.path,
      command: c.command,
      missing: !pathExists(c.path),
    })),
  };
}

/**
 * Renders an argument list for reading (and pasting into a POSIX shell):
 * plain arguments as they are, anything else single-quoted. Display only:
 * the script itself never runs a command through a shell.
 */
export function displayCommand(command: string[]): string {
  return command.map((arg) => (/^[\w@%+=:,./-]+$/.test(arg) ? arg : `'${arg.replaceAll("'", "'\\''")}'`)).join(' ');
}

/** The dry-run output: every step, where it runs, and the exact command. */
export function formatPlan(plan: Plan, repoRoot: string): string {
  if (plan.kind === 'skip') return `${PREFIX} skipping: ${plan.reason}`;
  const count = plan.consumers.length;
  const lines = [`${PREFIX} plan (${count} consumer${count === 1 ? '' : 's'})`];
  const add = (n: number, title: string, step: Step, command: string) => {
    lines.push(`  ${n}. ${title}`, `       cwd: ${step.cwd}`, `       run: ${command}`);
  };
  add(1, plan.regenerate.label, plan.regenerate, displayCommand(plan.regenerate.command));
  const envPrefix = displayCommand(['SKILLS_REPO=' + repoRoot]);
  plan.consumers.forEach((c, i) => {
    const title = c.missing ? `${c.label} (checkout not found, will be skipped)` : c.label;
    add(i + 2, title, c, `${envPrefix} ${displayCommand(c.command)}`);
  });
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

export async function runPlan(plan: Plan, { run, progress, result }: RunDeps): Promise<number> {
  if (plan.kind === 'skip') {
    result(`${PREFIX} skipping: ${plan.reason}`);
    return 0;
  }

  progress(`${PREFIX} ${plan.regenerate.label}`);
  const regenCode = await run(plan.regenerate);
  if (regenCode !== 0) {
    progress(`${PREFIX} ${plan.regenerate.label} failed (exit ${regenCode})`);
    result(`${PREFIX} done: regeneration failed, no consumer was notified`);
    return 1;
  }

  let ok = 0;
  let failed = 0;
  let skipped = 0;
  for (const consumer of plan.consumers) {
    if (consumer.missing) {
      progress(`${PREFIX} ${consumer.label} skipped: checkout not found at ${consumer.cwd}`);
      skipped++;
      continue;
    }
    progress(`${PREFIX} ${consumer.label}: ${displayCommand(consumer.command)}`);
    const code = await run(consumer);
    if (code === 0) {
      progress(`${PREFIX} ${consumer.label} ok`);
      ok++;
    } else {
      progress(`${PREFIX} ${consumer.label} failed (exit ${code})`);
      failed++;
    }
  }

  result(`${PREFIX} done: ${ok} ok, ${failed} failed, ${skipped} skipped`);
  return failed === 0 && skipped === 0 ? 0 : 1;
}

function spawnStep(step: Step, env: NodeJS.ProcessEnv): Promise<number> {
  const [program, ...args] = step.command;
  return new Promise((resolve) => {
    const child = spawn(program, args, { cwd: step.cwd, env, stdio: 'inherit' });
    child.on('error', (err) => {
      process.stderr.write(`${PREFIX} ${step.label} could not start: ${err.message}\n`);
      resolve(1);
    });
    child.on('close', (code) => resolve(code ?? 1));
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const toStdout = (line: string) => process.stdout.write(`${line}\n`);
const toStderr = (line: string) => process.stderr.write(`${line}\n`);

async function main(argv: string[]): Promise<number> {
  let args: CliArgs;
  let config: NotifyConfig | null = null;
  let configPath = join(REPO_ROOT, CONFIG_FILE);
  try {
    args = parseCliArgs(argv);
    if (args.help) {
      toStdout(HELP);
      return 0;
    }
    configPath = args.configPath ?? configPath;
    // A path named with --config is a request for that file, so its absence is
    // an error. Only the default file may be missing (not set up yet: skip).
    if (args.configPath !== null && !existsSync(configPath)) {
      throw new Error(`--config file not found: ${configPath}`);
    }
    if (existsSync(configPath)) config = parseConfig(readFileSync(configPath, 'utf8'));
  } catch (err) {
    toStderr(`${PREFIX} ${(err as Error).message} (see --help)`);
    return 1;
  }

  const plan = buildPlan({
    ci: Boolean(process.env.CI),
    config,
    configPath,
    repoRoot: REPO_ROOT,
    pathExists: existsSync,
  });

  if (args.dryRun) {
    toStdout(formatPlan(plan, REPO_ROOT));
    return 0;
  }

  if (plan.kind === 'run') toStderr(`${PREFIX} started ${new Date().toISOString()}`);
  const env = consumerEnv(process.env, REPO_ROOT);
  return runPlan(plan, { run: (step) => spawnStep(step, env), progress: toStderr, result: toStdout });
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (err: unknown) => {
      toStderr(`${PREFIX} unexpected error: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  );
}
