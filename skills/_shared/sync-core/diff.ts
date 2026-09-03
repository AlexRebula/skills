/**
 * diff.ts: directory-tree drift detection.
 *
 * Compares two directory trees file-by-file. Read-only: never writes to
 * either tree. Reports additions, removals, and content changes.
 *
 * Lives under skills/_shared/sync-core/ rather than inside skills/git/
 * sync-status/ itself: see config.ts's header for why this module is
 * shared ahead of its second and third real callers (sync-down, sync-up).
 */

import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export const DEFAULT_IGNORE = ['node_modules', '.git', 'dist', 'build', 'coverage', '.turbo', '.next', '.cache'];

export interface DiffTreesOptions {
  ignore?: string[];
}

export interface DiffTreesResult {
  onlyInA: string[];
  onlyInB: string[];
  changed: string[];
}

function isIgnored(relPath: string, ignore: string[]): boolean {
  const segments = relPath.split(path.sep);
  return segments.some((segment) => ignore.includes(segment));
}

function walk(rootDir: string, ignore: string[]): Set<string> {
  const files = new Set<string>();

  function recurse(currentDir: string) {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(rootDir, fullPath);
      if (isIgnored(relPath, ignore)) continue;

      if (entry.isDirectory()) {
        recurse(fullPath);
      } else if (entry.isFile()) {
        files.add(relPath.split(path.sep).join('/'));
      }
    }
  }

  recurse(rootDir);
  return files;
}

/**
 * Diffs two directory trees. Read-only: never modifies dirA or dirB.
 */
export function diffTrees(dirA: string, dirB: string, options: DiffTreesOptions = {}): DiffTreesResult {
  const ignore = options.ignore ?? DEFAULT_IGNORE;

  const filesA = walk(dirA, ignore);
  const filesB = walk(dirB, ignore);

  const onlyInA: string[] = [];
  const onlyInB: string[] = [];
  const changed: string[] = [];

  for (const relPath of filesA) {
    if (!filesB.has(relPath)) {
      onlyInA.push(relPath);
      continue;
    }
    const contentA = readFileSync(path.join(dirA, relPath));
    const contentB = readFileSync(path.join(dirB, relPath));
    if (!contentA.equals(contentB)) {
      changed.push(relPath);
    }
  }

  for (const relPath of filesB) {
    if (!filesA.has(relPath)) {
      onlyInB.push(relPath);
    }
  }

  onlyInA.sort();
  onlyInB.sort();
  changed.sort();

  return { onlyInA, onlyInB, changed };
}
