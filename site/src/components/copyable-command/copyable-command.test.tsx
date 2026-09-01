import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyableCommand } from './copyable-command';

describe('CopyableCommand', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it('renders the command text', () => {
    render(<CopyableCommand command="npx skills@latest add AlexRebula/skills" />);
    expect(screen.getByText('npx skills@latest add AlexRebula/skills')).toBeInTheDocument();
  });

  it('copies the command to the clipboard and announces the state change', async () => {
    render(<CopyableCommand command="npx skills@latest add AlexRebula/skills" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    expect(button).toHaveAttribute('aria-live', 'polite');

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'npx skills@latest add AlexRebula/skills',
    );
    await waitFor(() => expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument());
  });
});
