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
 * root, in the shape of `NotifyConfig` below (copy
 * `notify-consumers.config.example.json` to start one). Consumer names and
 * paths are personal machine setup, so they never live in a tracked file.
 * Each `command` runs through a shell with its consumer's `path` as the
 * working directory.
 *
 * Each command runs with `SKILLS_REPO` set to this checkout's root, so it
 * reads the freshly regenerated data from here. Git's repo-local variables
 * (`GIT_DIR`, `GIT_WORK_TREE`, `GIT_CONFIG_PARAMETERS`, ...) and the outer
 * `npm run`'s `npm_*` variables are removed from its environment first: a
 * git hook exports the former, and a consumer's own git commands would
 * otherwise act on this repo instead of the consumer's.
 *
 * Usage:
 *   npm run notify-consumers
 *   npm run notify-consumers -- --dry-run
 *   npm run notify-consumers -- --config <path>
 *
 *   --dry-run        Print the plan (which consumers, where, what command)
 *                    and exit. Runs nothing: no generators, no git, no gh.
 *   --config <path>  Read the config from <path> instead of the default.
 *
 * Does nothing (and says why) on CI, when the config file is missing, or
 * when it lists no consumers.
 *
 * Exit codes:
 *   0: every step succeeded, or there was nothing to do (skipped)
 *   1: bad arguments or config, the regeneration failed (no consumer runs),
 *      or at least one consumer failed or its checkout was not found
 *      (the others still run)
 */

import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_FILE = 'notify-consumers.config.json';
const EXAMPLE_CONFIG_FILE = 'notify-consumers.config.example.json';
const PREFIX = 'notify-consumers:';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Consumer {
  /** Label used in the log. */
  name: string;
  /** Absolute path to the consumer's checkout; the command's working directory. */
  path: string;
  /** Run through a shell, e.g. "npm run sync -- --pr". */
  command: string;
}

export interface NotifyConfig {
  consumers: Consumer[];
}

export interface Step {
  label: string;
  cwd: string;
  command: string;
}

export interface ConsumerStep extends Step {
  /** The checkout at `cwd` doesn't exist: the step is reported and skipped. */
  missing: boolean;
}

export type Plan =
  | { kind: 'skip'; reason: string }
  | { kind: 'run'; regenerate: Step; consumers: ConsumerStep[] };

export interface CliArgs {
  dryRun: boolean;
  configPath: string | null;
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

export function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { dryRun: false, configPath: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--config') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) throw new Error('--config needs a path');
      args.configPath = value;
      i++;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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
    const where = `consumers[${i}]`;
    if (!isRecord(entry)) throw new Error(`${where} must be an object`);
    const field = (key: keyof Consumer): string => {
      const value = entry[key];
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`${where} needs a non-empty "${key}" string`);
      }
      return value;
    };
    const consumer: Consumer = { name: field('name'), path: field('path'), command: field('command') };
    if (!isAbsolute(consumer.path)) {
      throw new Error(`${where} "path" must be absolute: ${consumer.path}`);
    }
    if (seen.has(consumer.name)) throw new Error(`${where} duplicate consumer name: ${consumer.name}`);
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

export interface PlanInput {
  ci: boolean;
  /** The parsed config, or null when the config file doesn't exist. */
  config: NotifyConfig | null;
  configPath: string;
  repoRoot: string;
  pathExists: (path: string) => boolean;
}

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
    regenerate: { label: 'regenerate site data', cwd: join(repoRoot, 'site'), command: 'npm run precheck' },
    consumers: config.consumers.map((c) => ({
      label: c.name,
      cwd: c.path,
      command: c.command,
      missing: !pathExists(c.path),
    })),
  };
}

/** The dry-run output: every step, where it runs, and the exact command. */
export function formatPlan(plan: Plan, repoRoot: string): string {
  if (plan.kind === 'skip') return `${PREFIX} skipping: ${plan.reason}`;
  const count = plan.consumers.length;
  const lines = [`${PREFIX} plan (${count} consumer${count === 1 ? '' : 's'})`];
  const add = (n: number, title: string, step: Step, command: string) => {
    lines.push(`  ${n}. ${title}`, `       cwd: ${step.cwd}`, `       run: ${command}`);
  };
  add(1, plan.regenerate.label, plan.regenerate, plan.regenerate.command);
  plan.consumers.forEach((c, i) => {
    const title = c.missing ? `${c.label} (checkout not found, will be skipped)` : c.label;
    add(i + 2, title, c, `SKILLS_REPO=${repoRoot} ${c.command}`);
  });
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

export interface RunDeps {
  /** Runs one step and resolves with its exit code. */
  run: (step: Step) => Promise<number>;
  log: (line: string) => void;
}

export async function runPlan(plan: Plan, { run, log }: RunDeps): Promise<number> {
  if (plan.kind === 'skip') {
    log(`${PREFIX} skipping: ${plan.reason}`);
    return 0;
  }

  log(`${PREFIX} ${plan.regenerate.label}`);
  const regenCode = await run(plan.regenerate);
  if (regenCode !== 0) {
    log(`${PREFIX} ${plan.regenerate.label} failed (exit ${regenCode}), no consumer was notified`);
    return 1;
  }

  let ok = 0;
  let failed = 0;
  let skipped = 0;
  for (const consumer of plan.consumers) {
    if (consumer.missing) {
      log(`${PREFIX} ${consumer.label} skipped: checkout not found at ${consumer.cwd}`);
      skipped++;
      continue;
    }
    log(`${PREFIX} ${consumer.label}: ${consumer.command}`);
    const code = await run(consumer);
    if (code === 0) {
      log(`${PREFIX} ${consumer.label} ok`);
      ok++;
    } else {
      log(`${PREFIX} ${consumer.label} failed (exit ${code})`);
      failed++;
    }
  }

  log(`${PREFIX} done: ${ok} ok, ${failed} failed, ${skipped} skipped`);
  return failed === 0 && skipped === 0 ? 0 : 1;
}

function spawnStep(step: Step, env: NodeJS.ProcessEnv): Promise<number> {
  return new Promise((resolve) => {
    const child = spawn(step.command, { cwd: step.cwd, env, shell: true, stdio: 'inherit' });
    child.on('error', (err) => {
      console.error(`${PREFIX} ${step.label} could not start: ${err.message}`);
      resolve(1);
    });
    child.on('close', (code) => resolve(code ?? 1));
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  let args: CliArgs;
  let config: NotifyConfig | null = null;
  let configPath = join(REPO_ROOT, CONFIG_FILE);
  try {
    args = parseArgs(process.argv.slice(2));
    configPath = args.configPath ?? configPath;
    if (existsSync(configPath)) config = parseConfig(readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.error(`${PREFIX} ${(err as Error).message}`);
    process.exit(1);
  }

  const plan = buildPlan({
    ci: Boolean(process.env.CI),
    config,
    configPath,
    repoRoot: REPO_ROOT,
    pathExists: existsSync,
  });

  if (args.dryRun) {
    console.log(formatPlan(plan, REPO_ROOT));
    return;
  }

  if (plan.kind === 'run') console.log(`${PREFIX} started ${new Date().toISOString()}`);
  const env = consumerEnv(process.env, REPO_ROOT);
  const code = await runPlan(plan, { run: (step) => spawnStep(step, env), log: (line) => console.log(line) });
  process.exit(code);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  void main();
}
