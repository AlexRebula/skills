import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // Not real packages, since Docusaurus resolves these via its own webpack
      // alias, which Vite/Vitest has no knowledge of. See test/mocks/*.
      '@docusaurus/Link': fileURLToPath(new URL('./test/mocks/docusaurus-link.tsx', import.meta.url)),
      '@docusaurus/useBaseUrl': fileURLToPath(
        new URL('./test/mocks/docusaurus-use-base-url.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.d.ts'],
    },
  },
});
