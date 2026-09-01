import React from 'react';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GiselleThemeProvider, type FeatureFlowItem } from '@littlebranches/giselle-mui';
import { FlowSection } from './flow-section';
import { FLOW_SECTION_TITLE } from '../../data/index-page-copy';

// `FeatureFlowSection`'s `renderRightPanel` (used here via `FlowStageHoverPanel`)
// replaces the default image column entirely, so the ref its own
// `useImageRevealTransform` hook creates is never attached to any DOM node -
// not "not yet", but permanently, for as long as `renderRightPanel` is used.
// giselle-mui calls that hook unconditionally regardless of `renderRightPanel`.
// Real jsdom API gaps (matchMedia, IntersectionObserver, scrollIntoView) are
// stubbed globally in vitest.setup.ts and do NOT fix this - confirmed by
// testing with those stubs in place - because this is a different failure:
// framer-motion's real `useScroll` (unmocked; giselle-mui ships as a
// pre-built dist bundle that Vitest's dependency optimizer pre-bundles ahead
// of time, so a per-test `vi.mock('framer-motion', ...)` never reaches the
// code path that throws - verified directly, the mock factory is never
// invoked) throws "Target ref is defined but not hydrated" as an uncaught,
// asynchronous exception once its frame loop actually runs. It doesn't fail
// any assertion (all 4 tests below pass), but an uncaught exception fails
// vitest's process exit code regardless. Filtering this one specific,
// diagnosed, harmless exception at the process level is the narrowest fix
// available from a consumer test file - Vitest has no per-file equivalent of
// `--dangerouslyIgnoreUnhandledErrors` (that flag is CLI/project-config only).
let originalUncaughtExceptionListeners: NodeJS.UncaughtExceptionListener[] = [];

beforeAll(() => {
  originalUncaughtExceptionListeners = process.listeners(
    'uncaughtException'
  ) as NodeJS.UncaughtExceptionListener[];
  process.removeAllListeners('uncaughtException');
  process.on('uncaughtException', (error: Error, origin) => {
    if (error?.message?.includes('Target ref is defined but not hydrated')) return;
    originalUncaughtExceptionListeners.forEach((listener) => listener(error, origin));
  });
});

afterAll(() => {
  process.removeAllListeners('uncaughtException');
  originalUncaughtExceptionListeners.forEach((listener) =>
    process.on('uncaughtException', listener)
  );
});

function renderWithTheme(ui: React.ReactElement) {
  return render(<GiselleThemeProvider>{ui}</GiselleThemeProvider>);
}

const ITEMS: FeatureFlowItem[] = [
  {
    id: 'shape-it',
    icon: 'solar:compass-bold-duotone',
    title: 'Shape it',
    description: 'Stress-test the idea and pin down the spec before code gets written.',
    highlightCards: [
      {
        title: 'grilling',
        description: 'Grill a plan or decision relentlessly.',
        href: '/thinking-tools/grilling',
      },
    ],
  },
  {
    id: 'build-it',
    icon: 'solar:code-bold-duotone',
    title: 'Build it',
    description: 'Turn the spec into working, tested code.',
  },
];

describe('FlowSection', () => {
  it('renders the section title', () => {
    renderWithTheme(<FlowSection items={ITEMS} imageSrc="/shape-square.svg" />);
    expect(screen.getByText(FLOW_SECTION_TITLE)).toBeInTheDocument();
  });

  it("renders every item's title and description in its own row", () => {
    renderWithTheme(<FlowSection items={ITEMS} imageSrc="/shape-square.svg" />);

    // Scoped by each row's own accessible name (its stage title), not by
    // position in a whole-document button count: `FlowStageHoverPanel`'s
    // per-skill provenance badges (also real <button>s) sit elsewhere in the
    // document, so counting "every button" would double-count unrelated
    // controls rather than the two stage rows this test actually cares about.
    ITEMS.forEach((item) => {
      const row = screen.getByRole('button', { name: new RegExp(item.title) });
      expect(row).toHaveTextContent(item.title);
      expect(row).toHaveTextContent(item.description);
    });
  });

  it("clicking an item's row surfaces its skill accordion (renderHighlightPanel) content", () => {
    renderWithTheme(<FlowSection items={ITEMS} imageSrc="/shape-square.svg" />);

    // An accordion *button* named "/grilling" is unique to `FlowSkillAccordionList`
    // (the detail panel's renderHighlightPanel content) - `FlowStageHoverPanel`'s
    // own always-visible skill list also renders "/grilling", but as a plain
    // link, never a button. The detail panel itself isn't mounted at all until
    // an item with expansion data is clicked (giselle-mui's `FeatureFlowSection`
    // behaviour), so this doubles as the "isn't there yet" check too.
    expect(screen.queryByRole('button', { name: '/grilling' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Shape it/ }));

    expect(screen.getByRole('button', { name: '/grilling' })).toBeInTheDocument();
  });

  it("threads the expanded state through to the renderRightPanel content (FlowStageHoverPanel's hint line)", () => {
    renderWithTheme(<FlowSection items={ITEMS} imageSrc="/shape-square.svg" />);

    expect(
      screen.getByText('Select this stage to browse each skill in more depth.')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Shape it/ }));

    expect(screen.getByText('Browse each skill in more depth below.')).toBeInTheDocument();
  });
});
