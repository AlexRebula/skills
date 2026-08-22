/**
 * Test-only stand-in for `@docusaurus/useBaseUrl` (see docusaurus-link.tsx
 * for why this needs an alias rather than a real module). Returns the path
 * unchanged — tests don't run under a deployed `baseUrl` prefix.
 */
export default function useBaseUrl(path: string): string {
  return path;
}
