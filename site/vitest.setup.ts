import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Vitest doesn't auto-run this the way Jest + jest-environment-jsdom does:
// without it, each test's rendered DOM leaks into the next test in the file.
afterEach(() => {
  cleanup();
});
