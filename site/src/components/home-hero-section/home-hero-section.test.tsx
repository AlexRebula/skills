import React from 'react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GiselleThemeProvider } from '@littlebranches/giselle-mui';
import { HomeHeroSection } from './home-hero-section';
import {
  REPO,
  HERO_TITLE,
  HERO_SUBTITLE_PREFIX,
  HERO_SUBTITLE_SUFFIX,
  UPSTREAM_REPO_URL,
  UPSTREAM_REPO_LABEL,
  INSTALL_LABEL,
  formatHeroStatsCaption,
} from '../../data/index-page-copy';

// The component itself doesn't wrap in its own GiselleThemeProvider (it
// relies on the app-wide one mounted in theme/Root.tsx) - tests provide one
// directly, matching LandingStatsSection's own test setup, since
// SectionContainer/SectionTitle read `theme.vars.palette` and throw with no
// MUI theme context at all.
function renderWithTheme(ui: React.ReactElement) {
  return render(<GiselleThemeProvider>{ui}</GiselleThemeProvider>);
}

describe('HomeHeroSection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the hero caption, title, and subtitle', () => {
    // GitHubStars fetches on mount regardless of what this test asserts -
    // stub a never-resolving fetch so it doesn't hit the network.
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    renderWithTheme(<HomeHeroSection totalSkills={76} categoriesCount={10} />);

    expect(screen.getByText(formatHeroStatsCaption(76, 10))).toBeInTheDocument();
    expect(screen.getByText(HERO_TITLE)).toBeInTheDocument();
    expect(screen.getByText(HERO_SUBTITLE_PREFIX, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(HERO_SUBTITLE_SUFFIX, { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: UPSTREAM_REPO_LABEL })).toHaveAttribute(
      'href',
      UPSTREAM_REPO_URL
    );
  });

  it('renders the hero title as a real h1', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    renderWithTheme(<HomeHeroSection totalSkills={76} categoriesCount={10} />);

    expect(screen.getByRole('heading', { level: 1, name: HERO_TITLE })).toBeInTheDocument();
  });

  it('renders the install command and the GitHub link', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {}))
    );
    renderWithTheme(<HomeHeroSection totalSkills={76} categoriesCount={10} />);

    expect(screen.getByText(INSTALL_LABEL)).toBeInTheDocument();
    expect(screen.getByText(`npx skills@latest add ${REPO}`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
      'href',
      `https://github.com/${REPO}`
    );
  });
});
