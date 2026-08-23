import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DiffModal } from './diff-modal';
import type { FileDiff } from '../../data/provenance.types';

const SKILL_MD_DIFF: FileDiff = {
  file: 'SKILL.md',
  rows: [
    { type: 'context', oldLineNumber: 1, oldContent: 'a', newLineNumber: 1, newContent: 'a' },
    { type: 'change', oldLineNumber: 2, oldContent: 'foo', newLineNumber: 2, newContent: 'bar' },
  ],
};

const REFERENCE_DIFF: FileDiff = {
  file: 'reference.md',
  rows: [{ type: 'add', oldLineNumber: null, oldContent: null, newLineNumber: 1, newContent: 'new line' }],
};

describe('DiffModal', () => {
  it('renders the skill name and a shortened upstream SHA in the header', () => {
    render(
      <DiffModal skillName="ask-matt" upstreamSha="5b15a47f2d7150f545fbcacbfe381787fc0230dc" files={[SKILL_MD_DIFF]} onClose={() => {}} />,
    );
    expect(screen.getByText('ask-matt')).toBeInTheDocument();
    expect(screen.getByText(/5b15a47/)).toBeInTheDocument();
  });

  it('shows no tabs for a single-file diff', () => {
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={() => {}} />);
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('shows tabs for a multi-file diff, with SKILL.md selected by default', () => {
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[REFERENCE_DIFF, SKILL_MD_DIFF]} onClose={() => {}} />);
    expect(screen.getByRole('tab', { name: /SKILL\.md/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /reference\.md/ })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches the visible diff when a different tab is clicked', async () => {
    const user = userEvent.setup();
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[REFERENCE_DIFF, SKILL_MD_DIFF]} onClose={() => {}} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /reference\.md/ }));
    expect(screen.getByText('new line')).toBeInTheDocument();
    expect(screen.queryByText('foo')).not.toBeInTheDocument();
  });

  it('calls onClose when the close control is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={onClose} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('moves focus into the dialog on mount and restores it to the previously-focused element on unmount', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { unmount } = render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={() => {}} />);
    expect(document.activeElement).not.toBe(trigger);
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement);

    unmount();
    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('is a labeled, modal dialog', () => {
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName(/ask-matt/);
  });

  it('renders both sides of a paired wording-change row', () => {
    render(<DiffModal skillName="ask-matt" upstreamSha="abc1234" files={[SKILL_MD_DIFF]} onClose={() => {}} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });
});
