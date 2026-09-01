import React, { type ReactNode } from 'react';
import type { InlineMarkdownProps } from './types';

/**
 * Renders the small subset of inline Markdown actually used in the skill
 * descriptions pulled from README.md and doc pages: `code spans`,
 * [links](url), **bold**, and a bold-wrapped link (**[text](url)**, the one
 * nesting doc prose actually uses - e.g. "It is **[stateful](url)**").
 * Treats everything else as literal text (React escapes it), so it's safe
 * against the HTML-looking tag names some descriptions quote inside code
 * spans (e.g. `<script setup>`). Deliberately not a recursive parser: this is
 * one non-overlapping token pass, so nesting beyond the bold-link case isn't
 * supported and renders as literal text instead.
 */
// Each alternative has a mutually exclusive starting character ("`", "[" or
// optionally "**[", "**") and only bounded, negated-class repetition (no
// nested/overlapping quantifiers), so it isn't vulnerable to the catastrophic
// backtracking this lint rule guards against, flagged as a false positive
// rather than simplified into something harder to read. The link
// alternative's leading `(\*\*)?...\2` requires the SAME optional "**" that
// opened it (if any) to close it too - group 2 backreferences to empty when
// unmatched (spec behaviour), so this one alternative covers a plain
// [link](url) and a bold-wrapped **[link](url)** without a separate,
// near-duplicate branch (which is what pushed this regex over the
// complexity budget last time).
// eslint-disable-next-line sonarjs/super-linear-regex
const TOKEN = /`([^`]+)`|(\*\*)?\[([^\]]+)\]\(([^)]+)\)\2|\*\*([^*]+)\*\*/g;

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
    const [full, code, boldMarker, linkText, linkHref, bold] = match;
    if (code !== undefined) {
      nodes.push(<code key={key++}>{code}</code>);
    } else if (linkText !== undefined) {
      nodes.push(
        boldMarker ? (
          <strong key={key++}>
            <a href={linkHref}>{linkText}</a>
          </strong>
        ) : (
          <a key={key++} href={linkHref}>
            {linkText}
          </a>
        )
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
