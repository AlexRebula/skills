import { describe, expect, it } from 'vitest';
import { cleanGitEnv } from './git-env';

describe('cleanGitEnv', () => {
  it('drops every GIT_* variable and keeps everything else', () => {
    const env = cleanGitEnv({
      PATH: '/bin',
      HOME: '/home/test',
      GIT_DIR: '/real/repo/.git',
      GIT_WORK_TREE: '/real/repo',
      GIT_INDEX_FILE: '/real/repo/.git/index',
      GIT_CONFIG_PARAMETERS: "'core.bare'='true'",
      GIT_AUTHOR_NAME: 'Someone',
    });
    expect(env).toEqual({ PATH: '/bin', HOME: '/home/test' });
  });

  it('defaults to the current process environment without changing it', () => {
    const before = { ...process.env };
    process.env.GIT_DIR = '/nonexistent/poisoned-git-dir';
    try {
      const env = cleanGitEnv();
      expect(env.GIT_DIR).toBeUndefined();
      expect(env.PATH).toBe(process.env.PATH);
      expect(process.env.GIT_DIR).toBe('/nonexistent/poisoned-git-dir');
    } finally {
      if (before.GIT_DIR === undefined) delete process.env.GIT_DIR;
      else process.env.GIT_DIR = before.GIT_DIR;
    }
  });
});
