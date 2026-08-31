import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineMarkdown } from './inline-markdown';

describe('InlineMarkdown', () => {
  it('renders a code span', () => {
    render(<InlineMarkdown text="Run `npm test` first." />);
    expect(screen.getByText('npm test', { selector: 'code' })).toBeInTheDocument();
  });

  it('renders a link', () => {
    const { container } = render(
      <InlineMarkdown text="See [the docs](https://example.com/docs)." />
    );
    const link = container.querySelector('a[href="https://example.com/docs"]');
    expect(link).toHaveTextContent('the docs');
  });

  it('renders bold text', () => {
    render(<InlineMarkdown text="This is **important**." />);
    expect(screen.getByText('important', { selector: 'strong' })).toBeInTheDocument();
  });

  it('renders a bold-wrapped link as a link inside <strong>, not literal markdown syntax', () => {
    const { container } = render(
      <InlineMarkdown text="It is **[stateful](https://example.com/stateful)**." />
    );
    const strong = container.querySelector('strong');
    const link = strong?.querySelector('a[href="https://example.com/stateful"]');
    expect(link).toHaveTextContent('stateful');
    expect(container.textContent).not.toContain('[stateful]');
    expect(container.textContent).not.toContain('**');
  });

  it('leaves plain text untouched', () => {
    render(<InlineMarkdown text="Just plain text, nothing special." />);
    expect(screen.getByText('Just plain text, nothing special.')).toBeInTheDocument();
  });

  it('renders a mix of tokens in one pass', () => {
    const { container } = render(
      <InlineMarkdown text="Use `code`, a [link](https://example.com), and **bold** together." />
    );
    expect(container.querySelector('code')).toHaveTextContent('code');
    expect(container.querySelector('a')).toHaveTextContent('link');
    expect(container.querySelector('strong')).toHaveTextContent('bold');
  });
});
