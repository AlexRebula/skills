#!/usr/bin/env node
/**
 * check-flow-stages.ts
 *
 * `site/sidebars.ts`'s FLOW_STAGES is a hand-maintained routing config that
 * mirrors docs/overview.md's stage breakdown - it exists specifically to
 * exhaustively and non-redundantly cover every real skill docs page (minus
 * the one skill deliberately excluded as "the router", see ROUTER_SKILL in
 * sidebars.ts). That's easy to silently drift out of sync as skills get
 * added, renamed, or re-categorised, since nothing else checks it.
 *
 * This enumerates the real skill docs pages (docs/<category>/<name>.md for
 * every TARGET_CATEGORIES category) and diffs that against every
 * `{ category, name }` entry actually reachable inside FLOW_STAGES, to
 * surface:
 *   - stale entries (in FLOW_STAGES, no matching docs page)
 *   - duplicate entries (same skill listed in more than one stage)
 *   - missing skills (a real docs page not covered by FLOW_STAGES or the
 *     router)
 *
 * Usage:
 *   npx tsx scripts/check-flow-stages.ts [--docs-root <path>]
 *
 * Exit codes:
 *   0: FLOW_STAGES + the router exhaustively and non-redundantly cover
 *      every real skill docs page
 *   1: at least one stale, duplicate, or missing entry was found
 */

import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TARGET_CATEGORIES } from '../site/src/data/categories.ts';
import { FLOW_STAGES, ROUTER_SKILL } from '../site/sidebars.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

export interface SkillRef {
  category: string;
  name: string;
}

export interface FlowStagesCoverageReport {
  /** "category/name" for every real docs page across TARGET_CATEGORIES, sorted */
  realSkills: string[];
  /** "category/name" entries listed in more than one stage, sorted */
  duplicates: string[];
  /** "category/name" entries in FLOW_STAGES with no matching docs page, sorted */
  stale: string[];
  /** real skills covered by neither FLOW_STAGES nor the router skill, sorted */
  missing: string[];
}

/** "category/name" for every `docs/<category>/*.md` page across TARGET_CATEGORIES. */
export function listRealSkills(docsRoot: string): string[] {
  const skills: string[] = [];
  for (const category of TARGET_CATEGORIES) {
    const categoryDir = join(docsRoot, category);
    if (!existsSync(categoryDir) || !statSync(categoryDir).isDirectory()) continue;

    for (const entry of readdirSync(categoryDir)) {
      if (!entry.endsWith('.md')) continue;
      skills.push(`${category}/${entry.slice(0, -'.md'.length)}`);
    }
  }
  return skills.sort();
}

/**
 * Recursively walks a Docusaurus sidebar item tree and collects every doc
 * item's id ("category/name"). Generic over the tree shape rather than
 * FLOW_STAGES's specific structure, so it doesn't need to know how deeply
 * stages nest their items.
 */
function extractDocIds(items: unknown): string[] {
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

/**
 * Diffs FLOW_STAGES's actual coverage against every real skill docs page.
 * `routerSkill` is the one skill allowed to be absent from FLOW_STAGES
 * itself (see ROUTER_SKILL in sidebars.ts) - it's still expected to have a
 * real docs page, just not a stage entry.
 */
export function checkFlowStagesCoverage(
  docsRoot: string,
  flowStages: unknown,
  routerSkill: SkillRef,
): FlowStagesCoverageReport {
  const realSkills = listRealSkills(docsRoot);
  const realSet = new Set(realSkills);

  const flowEntries = extractDocIds(flowStages);

  const counts = new Map<string, number>();
  for (const entry of flowEntries) counts.set(entry, (counts.get(entry) ?? 0) + 1);
  const duplicates = [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id)
    .sort();

  const stale = [...new Set(flowEntries.filter((id) => !realSet.has(id)))].sort();

  const routerId = `${routerSkill.category}/${routerSkill.name}`;
  const covered = new Set([...flowEntries, routerId]);
  const missing = realSkills.filter((id) => !covered.has(id)).sort();

  return { realSkills, duplicates, stale, missing };
}

/** Render a human-readable report. Pure function, easy to assert on in tests. */
export function formatReport(report: FlowStagesCoverageReport): string {
  if (report.duplicates.length === 0 && report.stale.length === 0 && report.missing.length === 0) {
    return `FLOW_STAGES exhaustively and non-redundantly covers all ${report.realSkills.length} skill(s).`;
  }

  const lines: string[] = [];
  if (report.duplicates.length > 0) {
    lines.push('Listed in more than one stage:', ...report.duplicates.map((id) => `  - ${id}`), '');
  }
  if (report.stale.length > 0) {
    lines.push(
      'In FLOW_STAGES but no matching docs page (stale):',
      ...report.stale.map((id) => `  - ${id}`),
      '',
    );
  }
  if (report.missing.length > 0) {
    lines.push(
      'Real docs page missing from every stage (and not the router skill):',
      ...report.missing.map((id) => `  - ${id}`),
      '',
    );
  }
  return lines.join('\n').trimEnd();
}

function main() {
  const args = process.argv.slice(2);
  const getFlag = (name: string, fallback: string): string => {
    const idx = args.indexOf(name);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
  };

  const docsRoot = getFlag('--docs-root', join(REPO_ROOT, 'docs'));

  const report = checkFlowStagesCoverage(docsRoot, FLOW_STAGES, ROUTER_SKILL);
  console.log(formatReport(report));

  const ok = report.duplicates.length === 0 && report.stale.length === 0 && report.missing.length === 0;
  process.exit(ok ? 0 : 1);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
