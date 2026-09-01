import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GiselleThemeProvider, type StatCardItem } from '@littlebranches/giselle-mui';
import { LandingStatsSection } from './landing-stats-section';

// The component itself no longer wraps in its own GiselleThemeProvider (it
// relies on the app-wide one mounted in theme/Root.tsx) - tests provide one
// directly, since StatCardRow's own styles read `theme.vars.palette` and
// throw with no MUI theme context at all.
function renderWithTheme(ui: React.ReactElement) {
  return render(<GiselleThemeProvider>{ui}</GiselleThemeProvider>);
}

// @iconify/react is mocked so tests have no network dependency — giselle-mui's
// own StatCardRow/GiselleIcon tests use the same pattern (see
// node_modules/@littlebranches/giselle-mui's stat-card-row.test.ts).
vi.mock('@iconify/react', () => ({
  Icon: ({ icon }: { icon: string }) => React.createElement('svg', { 'data-icon': icon }),
}));

const ITEMS: StatCardItem[] = [
  { label: 'Skills', value: 76, color: 'primary', iconId: 'solar:widget-add-bold-duotone' },
  { label: 'Categories', value: 10, color: 'info', iconId: 'solar:folder-check-bold-duotone' },
  {
    label: 'AlexRebula original',
    value: 46,
    color: 'success',
    iconId: 'solar:checklist-bold-duotone',
  },
  {
    label: 'Diverged from upstream',
    value: 11,
    color: 'warning',
    iconId: 'solar:branching-paths-up-bold-duotone',
  },
];

describe('LandingStatsSection', () => {
  it('renders the section heading', () => {
    renderWithTheme(<LandingStatsSection items={ITEMS} />);
    expect(screen.getByText('This fork, at a glance')).toBeInTheDocument();
  });

  it('renders one stat tile per item, with its label and value', () => {
    renderWithTheme(<LandingStatsSection items={ITEMS} />);
    for (const item of ITEMS) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(String(item.value))).toBeInTheDocument();
    }
  });
});
