import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Vitest doesn't auto-run this the way Jest + jest-environment-jsdom does:
// without it, each test's rendered DOM leaks into the next test in the file.
afterEach(() => {
  cleanup();
});

// giselle-mui's MotionViewport (whileInView) and scroll-linked hooks need
// browser APIs jsdom doesn't implement - without these, any test that
// mounts a real FeatureFlowSection (not just its own sub-components) throws.
// Mirrors giselle-mui's own test suite setup for the identical code path.
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  Element.prototype.scrollIntoView = vi.fn();

  class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver);

  // jsdom doesn't implement ResizeObserver either - DiffModal uses one to
  // detect when its diff table overflows horizontally.
  class NoopResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', NoopResizeObserver);
});
