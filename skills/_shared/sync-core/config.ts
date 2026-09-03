/**
 * config.ts: per-project sync config, bootstrapped on first run.
 *
 * `.sync-config.json` lives at the consuming project's root and is never
 * committed. If it's missing, bootstrapConfig drives a short interview to
 * create it, shows the disclaimer, and adds a .gitignore entry. If it
 * already exists, it's returned as-is; this function never overwrites it.
 *
 * Lives under skills/_shared/sync-core/ rather than inside skills/git/
 * sync-status/ itself: this module is the shared foundation for two more
 * sibling skills, sync-down and sync-up, specified in the same parent issue
 * (AlexRebula/skills#206) and already ticketed as the next two tickets in
 * this batch, not a speculative abstraction ahead of a real second caller.
 */

import { existsSync, readFileSync, writeFileSync, appendFileSync } from 'fs';
import path from 'path';

export const CONFIG_FILENAME = '.sync-config.json';

export const DISCLAIMER = `
sync-core (sync-status / sync-down / sync-up)
----------------------------------------------
THIS TOOLING IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. THE AUTHOR IS NOT
LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM ANYTHING YOU
SYNC, EXPOSE, OR LEAK THROUGH YOUR OWN CONFIGURATION OR USE OF THESE SKILLS.
`.trim();

export interface SyncConfig {
  repoA: string;
  repoB: string;
  qualityGateCommand: string;
}

export interface ConfigBootstrapOptions {
  prompt?: (question: string) => Promise<string>;
  onDisclaimer?: (text: string) => void;
}

function configPath(projectRoot: string): string {
  return path.join(projectRoot, CONFIG_FILENAME);
}

/** Reads `.sync-config.json` from projectRoot, or null if it doesn't exist. */
export function readConfig(projectRoot: string): SyncConfig | null {
  const file = configPath(projectRoot);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8')) as SyncConfig;
}

/**
 * Adds `filename` to `projectRoot`'s `.gitignore` if it isn't already
 * listed there. Shared by every sync-core file that must never be
 * committed (`.sync-config.json`, and `sync-up`'s `.banned-patterns.local`).
 */
export function ensureGitignoreEntry(projectRoot: string, filename: string): void {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  const existing = existsSync(gitignorePath) ? readFileSync(gitignorePath, 'utf8') : '';
  const lines = existing.split('\n');
  if (lines.includes(filename)) return;

  const prefix = existing.length > 0 && !existing.endsWith('\n') ? '\n' : '';
  appendFileSync(gitignorePath, `${prefix}${filename}\n`);
}

async function defaultPrompt(question: string): Promise<string> {
  const readline = await import('node:readline/promises');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    return await rl.question(question);
  } finally {
    rl.close();
  }
}

/**
 * Loads `.sync-config.json` from projectRoot, or drives a first-run
 * interview (shows the disclaimer, prompts for both repo paths and the
 * quality-gate command, writes the file) if it's missing. Never overwrites
 * an existing config's own answers, but does backfill a field added to the
 * schema after the config was first created (currently: qualityGateCommand),
 * prompting for just that one field. Either way, verifies the .gitignore
 * entry for the config file is present, in case it was removed since the
 * config was created.
 */
export async function bootstrapConfig(
  projectRoot: string,
  options: ConfigBootstrapOptions = {}
): Promise<SyncConfig> {
  const prompt = options.prompt ?? defaultPrompt;
  const onDisclaimer = options.onDisclaimer ?? ((text: string) => console.log(text));

  const existing = readConfig(projectRoot);
  if (existing) {
    if (!existing.qualityGateCommand) {
      existing.qualityGateCommand = (
        await prompt('Quality-gate command to run before syncing changes in (e.g. `npm run check`): ')
      ).trim();
      writeFileSync(configPath(projectRoot), JSON.stringify(existing, null, 2) + '\n');
    }
    ensureGitignoreEntry(projectRoot, CONFIG_FILENAME);
    return existing;
  }

  onDisclaimer(DISCLAIMER);

  const repoA = (await prompt('Path to the first repo (e.g. your playground): ')).trim();
  const repoB = (await prompt('Path to the second repo (e.g. production): ')).trim();
  const qualityGateCommand = (
    await prompt('Quality-gate command to run before syncing changes in (e.g. `npm run check`): ')
  ).trim();

  const config: SyncConfig = { repoA, repoB, qualityGateCommand };
  writeFileSync(configPath(projectRoot), JSON.stringify(config, null, 2) + '\n');
  ensureGitignoreEntry(projectRoot, CONFIG_FILENAME);

  return config;
}
