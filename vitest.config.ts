import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // site/ is a separate npm package with its own vitest config (jsdom
    // environment, React Testing Library) and its own `npm test`: running
    // it again from here would use the wrong environment (plain Node, no
    // DOM) and fail every render() call.
    exclude: ['**/node_modules/**', 'site/**'],
    // Fails the run if any test changed this checkout's own .git/config,
    // HEAD or branch tip (a test running git with a git hook's GIT_DIR).
    globalSetup: ['scripts/real-repo-tripwire.ts'],
  },
});
