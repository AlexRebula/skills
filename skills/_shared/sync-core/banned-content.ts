/**
 * banned-content.ts: optional, project-specific banned-content check.
 *
 * Loads additional patterns from a gitignored local file at the consuming
 * project's root, one per line, `#`-comments and blank lines skipped. If
 * the file is absent, the check is simply skipped, not an error. Ships
 * with zero real banned terms: real terms are always the user's own to
 * supply, in their own gitignored file, never in this repo's source.
 */

import { existsSync, readFileSync } from 'fs';
import path from 'path';

export const BANNED_PATTERNS_FILENAME = '.banned-patterns.local';

/**
 * Loads patterns from `projectRoot`'s `.banned-patterns.local`, or an
 * empty list if the file doesn't exist.
 */
export function loadBannedPatterns(projectRoot: string): string[] {
  const file = path.join(projectRoot, BANNED_PATTERNS_FILENAME);
  if (!existsSync(file)) return [];

  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
}

export interface BannedContentViolation {
  pattern: string;
  file: string;
  line: number;
  text: string;
}

export interface BannedContentResult {
  passed: boolean;
  violations: BannedContentViolation[];
}

/**
 * Checks the given files (relative paths under baseDir) for any of the
 * given patterns. Passes cleanly with no patterns configured. Read-only,
 * never modifies anything.
 */
export function checkBannedContent(
  baseDir: string,
  relFiles: string[],
  patterns: string[]
): BannedContentResult {
  const violations: BannedContentViolation[] = [];
  if (patterns.length === 0) return { passed: true, violations };

  for (const relFile of relFiles) {
    let content: string;
    try {
      content = readFileSync(path.join(baseDir, relFile), 'utf8');
    } catch {
      continue; // missing, binary, or unreadable: nothing to check
    }

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      for (const pattern of patterns) {
        if (line.includes(pattern)) {
          violations.push({ pattern, file: relFile, line: index + 1, text: line.trim() });
        }
      }
    });
  }

  return { passed: violations.length === 0, violations };
}
