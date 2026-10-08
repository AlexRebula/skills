import { describe, expect, it } from 'vitest';
import { findUnsafeGitCalls } from './check-test-git-env';

describe('findUnsafeGitCalls', () => {
  it('flags execFileSync, spawnSync and spawn running git with no env option', () => {
    const source = [
      `import { execFileSync, spawn, spawnSync } from 'node:child_process';`,
      `execFileSync('git', ['init'], { cwd: repo });`,
      `spawnSync("git", ['status']);`,
      `const child = spawn('git', ['fetch'], {`,
      `  cwd: repo,`,
      `});`,
    ].join('\n');
    expect(findUnsafeGitCalls(source)).toEqual([
      { line: 2, call: `execFileSync('git', ['init'], { cwd: repo })` },
      { line: 3, call: `spawnSync("git", ['status'])` },
      { line: 4, call: `spawn('git', ['fetch'], {\n  cwd: repo,\n})` },
    ]);
  });

  it('flags execSync running a git command line with no env option', () => {
    expect(findUnsafeGitCalls('execSync(`git commit -m x`, { cwd: repo });')).toEqual([
      { line: 1, call: 'execSync(`git commit -m x`, { cwd: repo })' },
    ]);
  });

  it('accepts a git call that passes env, as a property or shorthand', () => {
    const source = [
      `execFileSync('git', args, { cwd: repo, env: cleanGitEnv(), encoding: 'utf8' });`,
      `spawnSync('git', ['merge', 'x'], { cwd: repo, env, encoding: 'utf8' });`,
      `execFileSync('git', args, { env: gitEnv(extra) });`,
    ].join('\n');
    expect(findUnsafeGitCalls(source)).toEqual([]);
  });

  it('does not count process.env or a helper name as an env option', () => {
    expect(
      findUnsafeGitCalls(`execFileSync('git', [process.env.X], { cwd: cleanGitEnvDir });`)
    ).toHaveLength(1);
  });

  it('flags a git call whose env is the inherited process.env', () => {
    const source = [
      `execFileSync('git', args, { cwd: repo, env: process.env });`,
      `spawnSync('git', args, { env: { ...process.env, CI: '' } });`,
    ].join('\n');
    expect(findUnsafeGitCalls(source).map(({ line }) => line)).toEqual([1, 2]);
  });

  it('ignores calls that do not run git, and git calls inside comments or strings', () => {
    const source = [
      `spawnSync('sh', [HOOK, '--help'], { cwd: repo });`,
      `execFileSync('gitleaks', ['detect']);`,
      `pattern.exec(text);`,
      `// execFileSync('git', ['init']);`,
      `const doc = "spawnSync('git', ['status'])";`,
    ].join('\n');
    expect(findUnsafeGitCalls(source)).toEqual([]);
  });
});
