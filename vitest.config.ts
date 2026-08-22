import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // site/ is a separate npm package with its own vitest config (jsdom
    // environment, React Testing Library) and its own `npm test`: running
    // it again from here would use the wrong environment (plain Node, no
    // DOM) and fail every render() call.
    exclude: ['**/node_modules/**', 'site/**'],
  },
});
