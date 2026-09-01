import React from 'react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GitHubStars } from './github-stars';

describe('GitHubStars', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a plain GitHub link while the star count is unknown', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => {})), // never resolves
    );
    render(<GitHubStars repo="AlexRebula/skills" />);
    expect(screen.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/AlexRebula/skills',
    );
  });

  it('shows the star count once the GitHub API responds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ stargazers_count: 1234 }) }),
    );
    render(<GitHubStars repo="AlexRebula/skills" />);
    await waitFor(() =>
      expect(screen.getByRole('link', { name: '★ 1,234 stars' })).toBeInTheDocument(),
    );
  });

  it('falls back to a plain link when the API call fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
    render(<GitHubStars repo="AlexRebula/skills" />);
    await waitFor(() =>
      expect(screen.getByRole('link', { name: 'View on GitHub' })).toBeInTheDocument(),
    );
  });
});
