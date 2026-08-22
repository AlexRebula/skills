#!/usr/bin/env node
/**
 * generate-skill-icons.ts
 *
 * The landing page renders a gradient summary card for every AlexRebula-
 * original skill, each carrying a semantically-matched icon from the
 * `solar` Iconify set (see `SKILL_ICON_NAMES` in
 * `site/src/data/skill-icons.ts`). Rather than shipping the full
 * `@iconify-json/solar` package (7000+ icons, several MB) to the browser,
 * or having the client fetch icon data from Iconify's public API at
 * runtime, this script extracts just the glyph data for the icons actually
 * referenced into a small local collection the site can register offline
 * via `addCollection`.
 *
 * `@iconify-json/solar` is a devDependency (build-time only, not shipped).
 *
 * Usage:
 *   npx tsx scripts/generate-skill-icons.ts [--out <path>]
 *
 * Exit codes:
 *   0 — icon collection written
 *   1 — a name in SKILL_ICON_NAMES doesn't exist in the real solar icon set
 */

import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILL_ICON_NAMES } from '../site/src/data/skill-icons.ts';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

interface IconifyIconData {
  body: string;
  width?: number;
  height?: number;
}

interface IconifyJSON {
  prefix: string;
  width: number;
  height: number;
  icons: Record<string, IconifyIconData>;
}

function parseArgs(argv: string[]): { out: string } {
  let out = join(REPO_ROOT, 'site/src/data/solar-icons.json');
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out' && argv[i + 1]) out = argv[++i];
  }
  return { out };
}

function main(): void {
  const { out } = parseArgs(process.argv.slice(2));

  const solarSet = require('@iconify-json/solar/icons.json') as IconifyJSON;
  const neededNames = [...new Set(Object.values(SKILL_ICON_NAMES))].map(
    (base) => `${base}-bold-duotone`,
  );

  const missing = neededNames.filter((name) => !(name in solarSet.icons));
  if (missing.length > 0) {
    throw new Error(
      `${missing.length} icon name(s) in SKILL_ICON_NAMES don't exist in @iconify-json/solar: ${missing.join(', ')}`,
    );
  }

  const icons: Record<string, IconifyIconData> = {};
  for (const name of neededNames) icons[name] = solarSet.icons[name];

  const collection: IconifyJSON = {
    prefix: 'solar',
    width: solarSet.width,
    height: solarSet.height,
    icons,
  };

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(collection, null, 2) + '\n');
  console.log(`Wrote ${neededNames.length} solar icon(s) to ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    main();
  } catch (e) {
    console.error(`ERROR: ${(e as Error).message}`);
    process.exit(1);
  }
}
