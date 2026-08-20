import React, { type ReactNode } from 'react';

/**
 * Renders the small subset of inline Markdown actually used in the skill
 * descriptions pulled from README.md: `code spans`, [links](url), and
 * **bold**. Treats everything else as literal text (React escapes it),
 * so it's safe against the HTML-looking tag names some descriptions
 * quote inside code spans (e.g. `<script setup>`).
 */
const TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

export default function InlineMarkdown({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, code, linkText, linkHref, bold] = match;
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
    lastIndex = TOKEN.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return <>{nodes}</>;
}
