#!/usr/bin/env node
/**
 * check-bucket-promotion.ts
 *
 * Enforces AGENTS.md's bucket-promotion rule: skills in the four
 * non-promoted buckets (misc, personal, in-progress, deprecated) must not
 * appear in `.claude-plugin/plugin.json`'s `skills` array.
 *
 * README.md carries a narrower version of the same rule. `in-progress` and
 * `deprecated` skills must never appear there either, but `misc` and
 * `personal` are a required exception: scripts/generate-landing-data.ts
 * parses README.md's `## Misc`/`## Personal` sections directly to build the
 * docs site's real, rendered homepage content (see site/src/data/categories.ts,
 * TARGET_CATEGORIES). A check that flagged those two buckets in README.md
 * would permanently fail against required, working site behaviour.
 *
 * Usage:
 *   npx tsx scripts/check-bucket-promotion.ts [--plugin-json <path>] [--readme <path>]
 *
 * Exit codes:
 *   0: no violation found in either file, per the rules above
 *   1: at least one violation found
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

/** Buckets that must never appear in plugin.json's `skills` array. */
export const NON_PROMOTED_CATEGORIES = ['misc', 'personal', 'in-progress', 'deprecated'] as const;

/** Buckets that must never appear in README.md. Narrower than plugin.json's
 *  rule: `misc`/`personal` are a required data source for the docs site. */
export const README_FORBIDDEN_CATEGORIES = ['in-progress', 'deprecated'] as const;

export interface BucketViolation {
  category: string;
  skill: string;
}

export interface BucketPromotionReport {
  pluginJsonViolations: BucketViolation[];
  readmeViolations: BucketViolation[];
}

interface PluginManifest {
  skills: string[];
}

/** Scans plugin.json's parsed `skills` array for entries under a non-promoted bucket. */
export function findPluginJsonViolations(pluginJsonText: string): BucketViolation[] {
  const manifest = JSON.parse(pluginJsonText) as PluginManifest;
  const violations: BucketViolation[] = [];

  for (const entry of manifest.skills) {
    for (const category of NON_PROMOTED_CATEGORIES) {
      const prefix = `./skills/${category}/`;
      if (entry.startsWith(prefix)) {
        violations.push({ category, skill: entry.slice(prefix.length) });
      }
    }
  }

  return violations;
}

/**
 * Scans README.md for skill-list entries under a forbidden bucket, using the
 * same entry pattern generate-landing-data.ts's extractSkills relies on, so
 * this only matches real skill-list bullets, not incidental prose mentions.
 */
export function findReadmeViolations(readmeText: string): BucketViolation[] {
  const violations: BucketViolation[] = [];

  for (const category of README_FORBIDDEN_CATEGORIES) {
    const pattern = new RegExp(
      `\\*\\*\\[([a-z0-9-]+)\\]\\(\\./skills/${category}/[a-z0-9-]+/SKILL\\.md\\)\\*\\*`,
      'g',
    );
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(readmeText)) !== null) {
      violations.push({ category, skill: match[1] });
    }
  }

  return violations;
}

export function checkBucketPromotion(pluginJsonText: string, readmeText: string): BucketPromotionReport {
  return {
    pluginJsonViolations: findPluginJsonViolations(pluginJsonText),
    readmeViolations: findReadmeViolations(readmeText),
  };
}

/** Render a human-readable report. Pure function, easy to assert on in tests. */
export function formatReport(report: BucketPromotionReport): string {
  const total = report.pluginJsonViolations.length + report.readmeViolations.length;
  if (total === 0) {
    return 'No bucket-promotion violations found in plugin.json or README.md.';
  }

  const lines: string[] = [`${total} bucket-promotion violation(s) found:`, ''];

  if (report.pluginJsonViolations.length > 0) {
    lines.push('plugin.json:');
    for (const v of report.pluginJsonViolations) {
      lines.push(`  - ${v.skill} (./skills/${v.category}/${v.skill}) should not be in the shipped skill set`);
    }
    lines.push('');
  }

  if (report.readmeViolations.length > 0) {
    lines.push('README.md:');
    for (const v of report.readmeViolations) {
      lines.push(`  - ${v.skill} (./skills/${v.category}/${v.skill}) should not be documented there`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}

function main() {
  const args = process.argv.slice(2);
  const getFlag = (name: string, fallback: string): string => {
    const idx = args.indexOf(name);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
  };

  const pluginJsonPath = getFlag('--plugin-json', join(REPO_ROOT, '.claude-plugin/plugin.json'));
  const readmePath = getFlag('--readme', join(REPO_ROOT, 'README.md'));

  const report = checkBucketPromotion(readFileSync(pluginJsonPath, 'utf-8'), readFileSync(readmePath, 'utf-8'));
  console.log(formatReport(report));

  const total = report.pluginJsonViolations.length + report.readmeViolations.length;
  process.exit(total === 0 ? 0 : 1);
}

// Only run when executed directly (not when imported by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
