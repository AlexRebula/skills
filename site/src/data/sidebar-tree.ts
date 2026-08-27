/**
 * Recursively walks a Docusaurus sidebar item tree and collects every doc
 * item's id ("category/name"). Generic over the tree shape rather than any
 * one sidebar's specific structure, so it doesn't need to know how deeply
 * items nest.
 *
 * Shared between `scripts/check-flow-stages.ts` (validates FLOW_STAGES's
 * coverage) and `site/src/data/flow-sections.ts` (regroups FLOW_STAGES for
 * the homepage) — before this module existed, `flow-sections.ts` had its own
 * flat-only walker that silently dropped any nested stage item with no error
 * or test for that case (issue #156 rework item 6).
 */
export function extractDocIds(items: unknown): string[] {
  if (!Array.isArray(items)) return [];

  const ids: string[] = [];
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;

    if ('type' in item && item.type === 'doc' && 'id' in item) {
      ids.push(String(item.id));
    }
    if ('items' in item) {
      ids.push(...extractDocIds((item as { items: unknown }).items));
    }
  }
  return ids;
}
