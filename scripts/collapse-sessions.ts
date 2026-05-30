#!/usr/bin/env node
/**
 * collapse-sessions.ts
 *
 * Collapses multiple same-day session folders into one combined folder.
 * All mechanical work: file moves, renumbering, → Next link repairs,
 * sessions-index.md row merge, old-folder deletion.
 *
 * The AI's only job is to generate the --slug argument.
 *
 * Usage:
 *   npx tsx scripts/collapse-sessions.ts \
 *     --sessions-root <absolute-path> \
 *     --slug <combined-slug> \
 *     [--date YYYY-MM-DD]          (default: today)
 *
 * Exit codes:
 *   0 — success or nothing to collapse
 *   1 — argument error or fatal I/O error
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SessionFolder {
  /** Full folder name, e.g. "2026-05-30-sync-branches-skill" */
  name: string;
  /** Absolute path to the folder */
  path: string;
  /** Sorted NN-*.md filenames within the folder */
  files: string[];
  /** mtime of the earliest file (used for sort order) */
  earliestMtime: number;
}

interface RenameEntry {
  oldFolderName: string;
  /** e.g. "01-foo.md" */
  oldFileName: string;
  /** e.g. "01-foo" */
  oldBaseName: string;
  newFolderName: string;
  /** e.g. "03-foo.md" */
  newFileName: string;
  /** e.g. "03-foo" */
  newBaseName: string;
  /** e.g. "03" */
  newNn: string;
  /** Everything after the NN- prefix, e.g. "foo" */
  semanticSlug: string;
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

interface CliArgs {
  sessionsRoot: string;
  slug: string;
  date: string;
}

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--') && i + 1 < argv.length) {
      args[arg.slice(2)] = argv[i + 1];
      i++;
    }
  }

  const sessionsRoot = args['sessions-root'];
  const slug = args['slug'];
  if (!sessionsRoot || !slug) {
    console.error(
      'Usage: collapse-sessions.ts --sessions-root <path> --slug <slug> [--date YYYY-MM-DD]'
    );
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);
  return { sessionsRoot, slug, date: args['date'] ?? today };
}

// ---------------------------------------------------------------------------
// Folder discovery
// ---------------------------------------------------------------------------

function getSessionFolders(sessionsRoot: string, date: string): SessionFolder[] {
  const entries = readdirSync(sessionsRoot, { withFileTypes: true });
  const folders: SessionFolder[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!entry.name.startsWith(`${date}-`)) continue;

    const folderPath = join(sessionsRoot, entry.name);
    const files = readdirSync(folderPath)
      .filter((f: string) => /^\d{2}-.+\.md$/.test(f))
      .sort();

    const earliestMtime =
      files.length > 0
        ? statSync(join(folderPath, files[0])).mtimeMs
        : statSync(folderPath).mtimeMs;

    folders.push({ name: entry.name, path: folderPath, files, earliestMtime });
  }

  return folders.sort((a, b) => a.earliestMtime - b.earliestMtime);
}

// ---------------------------------------------------------------------------
// Rename map
// ---------------------------------------------------------------------------

function buildRenameMap(folders: SessionFolder[], combinedFolderName: string): RenameEntry[] {
  const entries: RenameEntry[] = [];
  let counter = 1;

  for (const folder of folders) {
    for (const fileName of folder.files) {
      const nn = String(counter).padStart(2, '0');
      const semanticSlug = fileName.replace(/^\d{2}-/, '').replace(/\.md$/, '');
      const newFileName = `${nn}-${semanticSlug}.md`;
      entries.push({
        oldFolderName: folder.name,
        oldFileName: fileName,
        oldBaseName: fileName.replace(/\.md$/, ''),
        newFolderName: combinedFolderName,
        newFileName,
        newBaseName: `${nn}-${semanticSlug}`,
        newNn: nn,
        semanticSlug,
      });
      counter++;
    }
  }

  return entries;
}

// ---------------------------------------------------------------------------
// sessions-index.md update
// ---------------------------------------------------------------------------

function dedup(csv: string): string {
  return [
    ...new Set(
      csv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  ].join(', ');
}

function mergeSessionIds(idSets: string[]): string {
  const all = idSets
    .flatMap((s) => s.split(',').map((t) => t.trim()))
    .filter((s) => s && s.toLowerCase() !== 'n/a');
  const unique = [...new Set(all)];
  return unique.length > 0 ? unique.join(', ') : 'N/A';
}

interface IndexRowData {
  date: string;
  title: string;
  projects: string;
  topics: string;
  wraps: number;
  models: string;
  sessionIds: string;
  folderCell: string;
}

function parseIndexRow(line: string): IndexRowData | null {
  // Table rows look like: | col1 | col2 | ... | colN |
  if (!line.startsWith('|')) return null;
  const parts = line.split('|').map((p) => p.trim());
  // parts[0] and parts[-1] are empty (outside the leading/trailing pipes)
  if (parts.length < 10) return null;
  const wraps = parseInt(parts[5], 10);
  if (isNaN(wraps)) return null;
  return {
    date: parts[1],
    title: parts[2],
    projects: parts[3],
    topics: parts[4],
    wraps,
    models: parts[6],
    sessionIds: parts[7],
    folderCell: parts[8],
  };
}

function updateSessionsIndex(
  sessionsRoot: string,
  oldFolders: SessionFolder[],
  combinedFolderName: string,
  renameMap: RenameEntry[],
  combinedSlug: string
): void {
  const indexPath = join(sessionsRoot, 'sessions-index.md');
  if (!existsSync(indexPath)) {
    console.log('  ⚠ sessions-index.md not found — skipping index update');
    return;
  }

  const oldFolderNames = new Set(oldFolders.map((f) => f.name));
  const content = readFileSync(indexPath, 'utf8');
  const lines = content.split('\n');

  // Find all rows that reference any of the old folders
  const matchingIndices: number[] = [];
  const matchingRows: IndexRowData[] = [];

  for (let i = 0; i < lines.length; i++) {
    const row = parseIndexRow(lines[i]);
    if (!row) continue;
    for (const name of oldFolderNames) {
      if (row.folderCell.includes(name)) {
        matchingIndices.push(i);
        matchingRows.push(row);
        break;
      }
    }
  }

  if (matchingIndices.length === 0) {
    console.log('  ⚠ No matching rows in sessions-index.md — skipping index update');
    return;
  }

  // Merge all matching rows into one
  const base = matchingRows[0];
  const merged: IndexRowData = matchingRows.slice(1).reduce(
    (acc, row) => ({
      date: acc.date,
      title: acc.title,
      projects: dedup(`${acc.projects}, ${row.projects}`),
      topics: dedup(`${acc.topics}, ${row.topics}`),
      wraps: acc.wraps + row.wraps,
      models: dedup(`${acc.models}, ${row.models}`),
      sessionIds: mergeSessionIds([acc.sessionIds, row.sessionIds]),
      folderCell: acc.folderCell,
    }),
    base
  );

  // Human title: Title Case of combined slug
  const humanTitle = combinedSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // First file in the combined folder (after renaming)
  const firstNewFileName = renameMap[0]?.newFileName ?? '';
  const mergedLine =
    `| ${merged.date} | ${humanTitle} | ${merged.projects} | ${merged.topics}` +
    ` | ${merged.wraps} | ${merged.models} | ${merged.sessionIds}` +
    ` | [${combinedFolderName}](./${combinedFolderName}/) |`;

  // Replace first matching row; delete the rest
  const deleteSet = new Set(matchingIndices.slice(1));
  const newLines = lines
    .map((line: string, i: number) => {
      if (i === matchingIndices[0]) return mergedLine;
      if (deleteSet.has(i)) return null;
      return line;
    })
    .filter((l: string | null): l is string => l !== null);

  writeFileSync(indexPath, newLines.join('\n'), 'utf8');
  console.log(`  Updated sessions-index.md — merged ${matchingRows.length} row(s) into 1`);
}

// ---------------------------------------------------------------------------
// Link repair
// ---------------------------------------------------------------------------

/** Resolve all .md files recursively under a directory */
function findAllMdFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllMdFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Build lookup maps from the rename entries:
 *  - oldBaseName  → newBaseName  (for wiki-links inside session files)
 *  - oldFolderName → combinedFolderName  (for MD links in sessions-index)
 */
function buildLinkMaps(renameMap: RenameEntry[]): {
  baseNameMap: Map<string, string>;
  folderNameMap: Map<string, string>;
} {
  const baseNameMap = new Map<string, string>();
  const folderNameMap = new Map<string, string>();

  for (const entry of renameMap) {
    // Key by "oldFolderName/oldBaseName" to avoid collisions when multiple source
    // folders share a filename (e.g. "01-initial.md" from two different sessions).
    // Wiki-link repair uses a bare oldBaseName lookup as a fallback for links that
    // lack folder context — prefer the folder-qualified key when available.
    const qualifiedKey = `${entry.oldFolderName}/${entry.oldBaseName}`;
    baseNameMap.set(qualifiedKey, entry.newBaseName);
    // Also register the bare name, but only if no collision exists yet.
    if (!baseNameMap.has(entry.oldBaseName)) {
      baseNameMap.set(entry.oldBaseName, entry.newBaseName);
    }
    folderNameMap.set(entry.oldFolderName, entry.newFolderName);
  }

  return { baseNameMap, folderNameMap };
}

function fixLinksInFile(
  filePath: string,
  baseNameMap: Map<string, string>,
  folderNameMap: Map<string, string>
): boolean {
  let content = readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Repair Obsidian wiki-links: [[oldBaseName|label]] → [[newBaseName|label]]
  //    Also update the NN prefix in the label when it changed.
  content = content.replace(
    /\[\[([^\]|]+?)(\|[^\]]*?)?\]\]/g,
    (_match: string, target: string, pipeLabel: string | undefined) => {
      const trimmed = target.trim();
      const newBaseName = baseNameMap.get(trimmed);
      if (!newBaseName || newBaseName === trimmed) return _match;

      let newLabel = pipeLabel ?? '';
      if (pipeLabel) {
        // Update NN prefix in label text if it matches the old NN
        const oldNn = trimmed.match(/^(\d{2})-/)?.[1];
        const newNn = newBaseName.match(/^(\d{2})-/)?.[1];
        if (oldNn && newNn && oldNn !== newNn) {
          newLabel = pipeLabel.replace(new RegExp(`\\b${oldNn}\\b`), newNn);
        }
      }

      return `[[${newBaseName}${newLabel}]]`;
    }
  );

  // 2. Repair markdown links that reference old folder paths:
  //    [text](./old-folder/file.md) → [text](./new-folder/file.md)
  //    [text](./old-folder/) → [text](./new-folder/)
  //    Also repair the filename portion when the file was renumbered.
  content = content.replace(
    /\[([^\]]*?)\]\(([^)]+?)\)/g,
    (_match: string, label: string, href: string) => {
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
        return _match;
      }
      let newHref = href;
      for (const [oldFolder, newFolder] of folderNameMap) {
        if (newHref.includes(oldFolder)) {
          newHref = newHref.replace(oldFolder, newFolder);
          // Also fix the filename if it was renumbered
          const fileMatch = newHref.match(/\/([^/]+\.md)$/);
          if (fileMatch) {
            const oldFileName = fileMatch[1];
            const oldBase = oldFileName.replace(/\.md$/, '');
            const qualifiedKey = `${oldFolder}/${oldBase}`;
            const newBase = baseNameMap.get(qualifiedKey) ?? baseNameMap.get(oldBase);
            if (newBase && newBase !== oldBase) {
              newHref = newHref.replace(oldFileName, `${newBase}.md`);
            }
          }
          break;
        }
      }
      return newHref === href ? _match : `[${label}](${newHref})`;
    }
  );

  if (content !== original) {
    writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function fixLinks(sessionsRoot: string, renameMap: RenameEntry[]): void {
  const { baseNameMap, folderNameMap } = buildLinkMaps(renameMap);
  const mdFiles = findAllMdFiles(sessionsRoot);
  const fixed: string[] = [];

  for (const filePath of mdFiles) {
    if (fixLinksInFile(filePath, baseNameMap, folderNameMap)) {
      fixed.push(filePath.replace(sessionsRoot, '').replace(/^[\\/]/, ''));
    }
  }

  if (fixed.length > 0) {
    console.log(`  Fixed links in ${fixed.length} file(s):`);
    fixed.forEach((f) => console.log(`    ${f}`));
  } else {
    console.log('  No link fixes needed');
  }
}

// ---------------------------------------------------------------------------
// Bridge → Next links (junction between merged folders)
// ---------------------------------------------------------------------------

/** Extract the first # heading from a file, or fall back to the base name */
function extractTitle(filePath: string, fallbackBaseName: string): string {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallbackBaseName;
}

/**
 * For each boundary between old folders in the merged set, ensure the last
 * file of folder A has a → Next link pointing to the first file of folder B.
 * Files that already have a → Next line are left unchanged.
 */
function addBridgeLinks(combinedFolderPath: string, renameMap: RenameEntry[]): void {
  // Find junction indices: where the source folder changes
  const junctions: Array<{ sourceIdx: number; targetIdx: number }> = [];
  for (let i = 0; i < renameMap.length - 1; i++) {
    if (renameMap[i].oldFolderName !== renameMap[i + 1].oldFolderName) {
      junctions.push({ sourceIdx: i, targetIdx: i + 1 });
    }
  }

  for (const { sourceIdx, targetIdx } of junctions) {
    const sourceEntry = renameMap[sourceIdx];
    const targetEntry = renameMap[targetIdx];

    const sourceFilePath = join(combinedFolderPath, sourceEntry.newFileName);
    const targetFilePath = join(combinedFolderPath, targetEntry.newFileName);

    const sourceContent = readFileSync(sourceFilePath, 'utf8');

    // Skip if a real → Next wikilink already exists in this file.
    // Do NOT skip if the file only has the trailing placeholder
    // "**→ Next:** _(next session not yet started)_" — that placeholder
    // must be replaced with a real wikilink when files are collapsed.
    const hasRealNextLink = /→ Next:.*\[\[/.test(sourceContent);
    if (hasRealNextLink) continue;

    const title = extractTitle(targetFilePath, targetEntry.semanticSlug.replace(/-/g, ' '));
    const nextLink = `\n\n---\n\n**→ Next:** [[${targetEntry.newBaseName}|${targetEntry.newNn} — ${title}]]`;

    writeFileSync(sourceFilePath, sourceContent.trimEnd() + nextLink + '\n', 'utf8');
    console.log(`  Added → Next bridge: ${sourceEntry.newFileName} → ${targetEntry.newFileName}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const { sessionsRoot, slug, date } = parseArgs(process.argv);

  if (!existsSync(sessionsRoot)) {
    console.error(`Error: sessions-root does not exist: ${sessionsRoot}`);
    process.exit(1);
  }

  const folders = getSessionFolders(sessionsRoot, date);

  if (folders.length <= 1) {
    console.log(`Nothing to collapse: found ${folders.length} folder(s) for ${date}.`);
    process.exit(0);
  }

  const combinedFolderName = `${date}-${slug}`;
  const combinedFolderPath = join(sessionsRoot, combinedFolderName);

  // If the target already exists and isn't one of the source folders, abort
  if (existsSync(combinedFolderPath) && !folders.some((f) => f.name === combinedFolderName)) {
    console.error(
      `Error: Target folder already exists and is not a source folder: ${combinedFolderPath}`
    );
    process.exit(1);
  }

  console.log(`\nCollapsing ${folders.length} session folders for ${date}:`);
  folders.forEach((f) => console.log(`  - ${f.name}/ (${f.files.length} file(s))`));
  console.log(`Into: ${combinedFolderName}/\n`);

  const renameMap = buildRenameMap(folders, combinedFolderName);

  // Create the combined folder
  mkdirSync(combinedFolderPath, { recursive: true });

  // Move + rename files (skip files already in the target folder)
  for (const entry of renameMap) {
    const src = join(sessionsRoot, entry.oldFolderName, entry.oldFileName);
    const dst = join(combinedFolderPath, entry.newFileName);
    if (src !== dst) {
      renameSync(src, dst);
      if (entry.oldFileName !== entry.newFileName || entry.oldFolderName !== combinedFolderName) {
        console.log(
          `  Moved: ${entry.oldFolderName}/${entry.oldFileName} → ${combinedFolderName}/${entry.newFileName}`
        );
      }
    }
  }

  // Update sessions-index.md
  updateSessionsIndex(sessionsRoot, folders, combinedFolderName, renameMap, slug);

  // Repair → Next links and folder references across all session files
  fixLinks(sessionsRoot, renameMap);

  // Add bridge → Next links at folder junctions
  addBridgeLinks(combinedFolderPath, renameMap);

  // Delete old (now-empty) source folders
  for (const folder of folders) {
    if (folder.name !== combinedFolderName && existsSync(folder.path)) {
      rmSync(folder.path, { recursive: true, force: true });
      console.log(`  Deleted: ${folder.name}/`);
    }
  }

  const totalFiles = renameMap.length;
  console.log(`\n✅ Done — ${totalFiles} file(s) in ${combinedFolderName}/`);
}

main();
