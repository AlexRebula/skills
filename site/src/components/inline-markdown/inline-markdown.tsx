import React, { type ReactNode } from 'react';
import type { InlineMarkdownProps } from './types';

/**
 * Renders the small subset of inline Markdown actually used in the skill
 * descriptions pulled from README.md: `code spans`, [links](url), and
 * **bold**. Treats everything else as literal text (React escapes it),
 * so it's safe against the HTML-looking tag names some descriptions
 * quote inside code spans (e.g. `<script setup>`).
 */
// Each alternative has a mutually exclusive starting character ("`", "[", "**")
// and only bounded, negated-class repetition (no nested/overlapping quantifiers),
// so it isn't vulnerable to the catastrophic backtracking this lint rule guards
// against, flagged as a false positive rather than simplified into something
// harder to read.
// eslint-disable-next-line sonarjs/super-linear-regex
const TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

export function InlineMarkdown({ text }: InlineMarkdownProps): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // matchAll takes its own copy of TOKEN's state instead of mutating the
  // shared module-level regex, so repeated/concurrent calls stay safe.
  for (const match of text.matchAll(TOKEN)) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [full, code, linkText, linkHref, bold] = match;
    if (code !== undefined) {
      nodes.push(<code key={key++}>{code}</code>);
    } else if (linkText !== undefined) {
      nodes.push(
        <a key={key++} href={linkHref}>
          {linkText}
        </a>,
      );
    } else if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return <>{nodes}</>;
}
