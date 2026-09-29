import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  HELP,
  buildPlan,
  consumerEnv,
  displayCommand,
  formatPlan,
  parseCliArgs,
  parseConfig,
  runPlan,
} from './notify-consumers';
import type { NotifyConfig, Plan, Step } from './notify-consumers.types';

const REPO_ROOT = '/path/to/skills';
const CONFIG_PATH = `${REPO_ROOT}/notify-consumers.config.json`;

const CONFIG: NotifyConfig = {
  consumers: [
    { name: 'example-consumer', path: '/path/to/consumer', command: ['npm', 'run', 'sync:example', '--', '--pr'] },
    { name: 'second-consumer', path: '/path/to/second', command: ['npm', 'run', 'sync:second', '--', '--pr'] },
  ],
};

const allPathsExist = () => true;

function plan(overrides: Partial<Parameters<typeof buildPlan>[0]> = {}): Plan {
  return buildPlan({
    ci: false,
    config: CONFIG,
    configPath: CONFIG_PATH,
    repoRoot: REPO_ROOT,
    pathExists: allPathsExist,
    ...overrides,
  });
}

// ---------------------------------------------------------------------------
// parseCliArgs
// ---------------------------------------------------------------------------

describe('parseCliArgs', () => {
  it('defaults to a real run with the default config path', () => {
    expect(parseCliArgs([])).toEqual({ dryRun: false, help: false, configPath: null });
  });

  it('parses --dry-run', () => {
    expect(parseCliArgs(['--dry-run'])).toEqual({ dryRun: true, help: false, configPath: null });
  });

  it('parses --config <path>', () => {
    expect(parseCliArgs(['--config', '/path/to/other.json'])).toEqual({
      dryRun: false,
      help: false,
      configPath: '/path/to/other.json',
    });
  });

  it('parses --help and -h', () => {
    expect(parseCliArgs(['--help']).help).toBe(true);
    expect(parseCliArgs(['-h']).help).toBe(true);
  });

  it('throws when --config has no value', () => {
    expect(() => parseCliArgs(['--config'])).toThrow(/--config/);
  });

  it('throws on an unknown flag', () => {
    expect(() => parseCliArgs(['--pr'])).toThrow(/--pr/);
  });

  it('throws on a positional argument', () => {
    expect(() => parseCliArgs(['extra'])).toThrow(/extra/);
  });
});

// ---------------------------------------------------------------------------
// parseConfig
// ---------------------------------------------------------------------------

describe('parseConfig', () => {
  it('accepts a valid config', () => {
    expect(parseConfig(JSON.stringify(CONFIG))).toEqual(CONFIG);
  });

  it('accepts an empty consumer list', () => {
    expect(parseConfig('{"consumers": []}')).toEqual({ consumers: [] });
  });

  it('rejects malformed JSON', () => {
    expect(() => parseConfig('{')).toThrow(/not valid JSON/);
  });

  it('rejects a config without a consumers array', () => {
    expect(() => parseConfig('{}')).toThrow(/"consumers" array/);
  });

  it('rejects a consumer missing a field', () => {
    const bad = { consumers: [{ name: 'x', path: '/path/to/x' }] };
    expect(() => parseConfig(JSON.stringify(bad))).toThrow(/consumers\[0\].*"command"/);
  });

  it('rejects a relative consumer path', () => {
    const bad = { consumers: [{ name: 'x', path: '../x', command: ['npm', 'run', 'sync'] }] };
    expect(() => parseConfig(JSON.stringify(bad))).toThrow(/absolute/);
  });

  it.each([
    ['a string', 'npm run sync'],
    ['an empty array', []],
    ['an array with an empty string', ['npm', '']],
    ['an array with a non-string', ['npm', 1]],
  ])('rejects a command that is %s', (_label, command) => {
    const bad = { consumers: [{ name: 'x', path: '/path/to/x', command }] };
    expect(() => parseConfig(JSON.stringify(bad))).toThrow(/consumers\[0\] "command" must be a non-empty array/);
  });

  it('rejects duplicate consumer names', () => {
    const dup = CONFIG.consumers[0];
    expect(() => parseConfig(JSON.stringify({ consumers: [dup, dup] }))).toThrow(/duplicate/i);
  });
});

// ---------------------------------------------------------------------------
// consumerEnv
// ---------------------------------------------------------------------------

describe('consumerEnv', () => {
  it('points SKILLS_REPO at this checkout', () => {
    expect(consumerEnv({ PATH: '/bin' }, REPO_ROOT)).toEqual({ PATH: '/bin', SKILLS_REPO: REPO_ROOT });
  });

  it("strips git's repo-local and the outer npm run's variables, so a consumer's git never targets this repo", () => {
    const env = consumerEnv(
      {
        PATH: '/bin',
        GIT_DIR: '/path/to/skills/.git',
        GIT_WORK_TREE: '/path/to/skills',
        GIT_INDEX_FILE: '/path/to/skills/.git/index',
        GIT_COMMON_DIR: '/path/to/skills/.git',
        GIT_PREFIX: '',
        GIT_OBJECT_DIRECTORY: '/x',
        GIT_ALTERNATE_OBJECT_DIRECTORIES: '/y',
        GIT_CONFIG_PARAMETERS: "'core.x'='y'",
        GIT_CONFIG_COUNT: '1',
        GIT_CONFIG_KEY_0: 'core.x',
        GIT_CONFIG_VALUE_0: 'y',
        npm_package_name: 'outer-package',
        npm_lifecycle_event: 'notify-consumers',
        GIT_AUTHOR_NAME: 'kept',
      },
      REPO_ROOT
    );
    expect(env).toEqual({ PATH: '/bin', GIT_AUTHOR_NAME: 'kept', SKILLS_REPO: REPO_ROOT });
  });

  it('overrides an inherited SKILLS_REPO', () => {
    expect(consumerEnv({ SKILLS_REPO: '/elsewhere' }, REPO_ROOT).SKILLS_REPO).toBe(REPO_ROOT);
  });
});

// ---------------------------------------------------------------------------
// buildPlan
// ---------------------------------------------------------------------------

describe('buildPlan', () => {
  it('skips on CI, and says why', () => {
    expect(plan({ ci: true })).toEqual({ kind: 'skip', reason: expect.stringMatching(/CI/) });
  });

  it('skips on CI even when a config exists', () => {
    expect(plan({ ci: true }).kind).toBe('skip');
  });

  it('skips when the config is missing, naming the path and the example file', () => {
    const result = plan({ config: null });
    expect(result.kind).toBe('skip');
    expect(result.kind === 'skip' && result.reason).toMatch(/no config at .*notify-consumers\.config\.json/);
    expect(result.kind === 'skip' && result.reason).toMatch(/notify-consumers\.config\.example\.json/);
  });

  it('skips when the config lists no consumers', () => {
    const result = plan({ config: { consumers: [] } });
    expect(result).toEqual({ kind: 'skip', reason: expect.stringMatching(/no consumers/) });
  });

  it('regenerates the site data once, from site/', () => {
    const result = plan();
    expect(result.kind).toBe('run');
    if (result.kind !== 'run') return;
    expect(result.regenerate).toEqual({
      label: 'regenerate site data',
      cwd: `${REPO_ROOT}/site`,
      command: ['npm', 'run', 'precheck'],
    });
  });

  it('runs every consumer command in its own checkout, in config order', () => {
    const result = plan();
    if (result.kind !== 'run') throw new Error('expected a run plan');
    expect(result.consumers).toEqual([
      {
        label: 'example-consumer',
        cwd: '/path/to/consumer',
        command: ['npm', 'run', 'sync:example', '--', '--pr'],
        missing: false,
      },
      {
        label: 'second-consumer',
        cwd: '/path/to/second',
        command: ['npm', 'run', 'sync:second', '--', '--pr'],
        missing: false,
      },
    ]);
  });

  it('flags a consumer whose checkout does not exist', () => {
    const result = plan({ pathExists: (p) => p !== '/path/to/second' });
    if (result.kind !== 'run') throw new Error('expected a run plan');
    expect(result.consumers.map((c) => c.missing)).toEqual([false, true]);
  });
});

// ---------------------------------------------------------------------------
// displayCommand / formatPlan (the dry-run output)
// ---------------------------------------------------------------------------

describe('displayCommand', () => {
  it('prints plain arguments as they are', () => {
    expect(displayCommand(['npm', 'run', 'sync:example', '--', '--pr'])).toBe('npm run sync:example -- --pr');
  });

  it('single-quotes arguments a shell would split or expand', () => {
    expect(displayCommand(['echo', 'two words', "it's", '$HOME'])).toBe(`echo 'two words' 'it'\\''s' '$HOME'`);
  });
});

describe('formatPlan', () => {
  it('prints the regeneration step, then each consumer with its cwd and command', () => {
    expect(formatPlan(plan(), REPO_ROOT)).toBe(
      [
        'notify-consumers: plan (2 consumers)',
        '  1. regenerate site data',
        '       cwd: /path/to/skills/site',
        '       run: npm run precheck',
        '  2. example-consumer',
        '       cwd: /path/to/consumer',
        '       run: SKILLS_REPO=/path/to/skills npm run sync:example -- --pr',
        '  3. second-consumer',
        '       cwd: /path/to/second',
        '       run: SKILLS_REPO=/path/to/skills npm run sync:second -- --pr',
      ].join('\n')
    );
  });

  it('marks a consumer whose checkout is missing', () => {
    const text = formatPlan(plan({ pathExists: (p) => p !== '/path/to/second' }), REPO_ROOT);
    expect(text).toContain('  3. second-consumer (checkout not found, will be skipped)');
  });

  it('prints the skip reason when there is nothing to do', () => {
    expect(formatPlan({ kind: 'skip', reason: 'CI detected' }, REPO_ROOT)).toBe(
      'notify-consumers: skipping: CI detected'
    );
  });
});

// ---------------------------------------------------------------------------
// runPlan (with an injected fake runner: nothing real is ever spawned)
// ---------------------------------------------------------------------------

function fakeRunner(exitCodes: Record<string, number> = {}) {
  const calls: Step[] = [];
  const progress: string[] = [];
  const results: string[] = [];
  return {
    calls,
    progress,
    results,
    deps: {
      run: async (step: Step) => {
        calls.push(step);
        return exitCodes[step.label] ?? 0;
      },
      progress: (line: string) => progress.push(line),
      result: (line: string) => results.push(line),
    },
  };
}

describe('runPlan', () => {
  it('runs nothing and exits 0 for a skip plan', async () => {
    const fake = fakeRunner();
    expect(await runPlan({ kind: 'skip', reason: 'CI detected' }, fake.deps)).toBe(0);
    expect(fake.calls).toEqual([]);
    expect(fake.results).toEqual(['notify-consumers: skipping: CI detected']);
    expect(fake.progress).toEqual([]);
  });

  it('regenerates once, then runs each consumer, and exits 0 when all succeed', async () => {
    const fake = fakeRunner();
    expect(await runPlan(plan(), fake.deps)).toBe(0);
    expect(fake.calls.map((s) => s.label)).toEqual(['regenerate site data', 'example-consumer', 'second-consumer']);
    expect(fake.results).toEqual(['notify-consumers: done: 2 ok, 0 failed, 0 skipped']);
  });

  it('stops before any consumer when regeneration fails, and exits 1', async () => {
    const fake = fakeRunner({ 'regenerate site data': 2 });
    expect(await runPlan(plan(), fake.deps)).toBe(1);
    expect(fake.calls.map((s) => s.label)).toEqual(['regenerate site data']);
    expect(fake.progress).toContain('notify-consumers: regenerate site data failed (exit 2)');
    expect(fake.results).toEqual(['notify-consumers: done: regeneration failed, no consumer was notified']);
  });

  it('keeps going after one consumer fails, then exits 1', async () => {
    const fake = fakeRunner({ 'example-consumer': 1 });
    expect(await runPlan(plan(), fake.deps)).toBe(1);
    expect(fake.calls.map((s) => s.label)).toEqual(['regenerate site data', 'example-consumer', 'second-consumer']);
    expect(fake.progress).toContain('notify-consumers: example-consumer failed (exit 1)');
    expect(fake.progress).toContain('notify-consumers: second-consumer ok');
    expect(fake.results).toEqual(['notify-consumers: done: 1 ok, 1 failed, 0 skipped']);
  });

  it('skips a missing checkout without running it, and exits 1', async () => {
    const fake = fakeRunner();
    const code = await runPlan(plan({ pathExists: (p) => p !== '/path/to/consumer' }), fake.deps);
    expect(code).toBe(1);
    expect(fake.calls.map((s) => s.label)).toEqual(['regenerate site data', 'second-consumer']);
    expect(fake.progress).toContain(
      'notify-consumers: example-consumer skipped: checkout not found at /path/to/consumer'
    );
    expect(fake.results).toEqual(['notify-consumers: done: 1 ok, 0 failed, 1 skipped']);
  });
});

// ---------------------------------------------------------------------------
// The CLI itself, run for real, but only with --help, --dry-run and bad
// input: none of these runs a generator, git, gh or any consumer command.
// ---------------------------------------------------------------------------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const TSX = join(SCRIPT_DIR, '..', 'node_modules', '.bin', 'tsx');
const SCRIPT = join(SCRIPT_DIR, 'notify-consumers.ts');

function cli(args: string[], extraEnv: Record<string, string> = {}) {
  const env: NodeJS.ProcessEnv = { ...process.env, ...extraEnv };
  if (!('CI' in extraEnv)) delete env.CI;
  const r = spawnSync(TSX, [SCRIPT, ...args], { env, encoding: 'utf8' });
  return { code: r.status, stdout: r.stdout, stderr: r.stderr };
}

describe('notify-consumers CLI', () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'notify-consumers-cli-'));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('--help prints the help text to stdout and exits 0', () => {
    const r = cli(['--help']);
    expect(r.code).toBe(0);
    expect(r.stdout).toBe(`${HELP}\n`);
    expect(r.stderr).toBe('');
  });

  it('--dry-run prints the plan to stdout, exits 0, and runs nothing', () => {
    const marker = join(dir, 'ran');
    const config = join(dir, 'config.json');
    const consumer = { name: 'example-consumer', path: dir, command: ['touch', marker] };
    writeFileSync(config, JSON.stringify({ consumers: [consumer] }));
    const r = cli(['--dry-run', '--config', config]);
    expect(r.code).toBe(0);
    expect(r.stdout).toContain('notify-consumers: plan (1 consumer)');
    expect(r.stdout).toContain(`run: SKILLS_REPO=`);
    expect(r.stdout).toContain(`touch ${marker}`);
    expect(r.stderr).toBe('');
    expect(spawnSync('test', ['-e', marker]).status).not.toBe(0);
  });

  it('reports a --config file that does not exist on stderr and exits 1', () => {
    const absent = join(dir, 'absent.json');
    const r = cli(['--config', absent]);
    expect(r.code).toBe(1);
    expect(r.stdout).toBe('');
    expect(r.stderr).toContain(`--config file not found: ${absent} (see --help)`);
  });

  it('skips on CI with a reason on stdout and exits 0', () => {
    const config = join(dir, 'config.json');
    writeFileSync(config, JSON.stringify({ consumers: [] }));
    const r = cli(['--config', config], { CI: 'true' });
    expect(r.code).toBe(0);
    expect(r.stdout).toMatch(/^notify-consumers: skipping: CI detected/);
  });

  it('reports an unknown flag on stderr and exits 1', () => {
    const r = cli(['--bogus']);
    expect(r.code).toBe(1);
    expect(r.stdout).toBe('');
    expect(r.stderr).toMatch(/--bogus.*\(see --help\)/);
  });

  it('reports an invalid config on stderr and exits 1', () => {
    const config = join(dir, 'config.json');
    writeFileSync(config, JSON.stringify({ consumers: [{ name: 'x', path: dir, command: 'npm run sync' }] }));
    const r = cli(['--dry-run', '--config', config]);
    expect(r.code).toBe(1);
    expect(r.stdout).toBe('');
    expect(r.stderr).toMatch(/"command" must be a non-empty array/);
  });
});
