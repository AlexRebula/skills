import React, { type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * Test-only stand-in for `@docusaurus/Link`, which isn't a real installed
 * package — Docusaurus resolves it via its own webpack alias, which Vite/
 * Vitest knows nothing about. Aliased in vitest.config.ts so components
 * that render navigation links stay testable without a live Docusaurus app.
 */
export default function Link({
  to,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children?: ReactNode }): ReactNode {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
