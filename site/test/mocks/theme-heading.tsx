import React, { type HTMLAttributes, type ReactNode } from 'react';

/**
 * Test-only stand-in for `@theme/Heading`, which isn't a real installed
 * package, since Docusaurus resolves it via its own webpack alias, which Vite/
 * Vitest knows nothing about. Aliased in vitest.config.ts so components
 * that render a themed heading stay testable without a live Docusaurus app.
 */
export default function Heading({
  as: Tag,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement> & { as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; children?: ReactNode }): ReactNode {
  return <Tag {...rest}>{children}</Tag>;
}
