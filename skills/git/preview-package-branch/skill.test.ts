import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL = readFileSync(join(__dirname, 'SKILL.md'), 'utf8');

describe('preview-package-branch', () => {
  // ── The yalc publish/push regression ────────────────────────────────────
  it('documents yalc publish, not yalc push, as the way to update the store', () => {
    // yalc push fans out to every yalc-linked installation on the machine,
    // confirmed the hard way during development, when it silently rewrote
    // unrelated repos' vendored yalc snapshots. The skill must keep steering
    // future edits away from reintroducing `yalc push` as the recommended step.
    expect(SKILL).toContain('yalc publish');
    expect(SKILL).toMatch(/don't|never/i);
  });

  // ── Real restart, not HMR ────────────────────────────────────────────────
  it('calls for a real dev-server restart, not a hot-reload', () => {
    expect(SKILL).toMatch(/restart/i);
    expect(SKILL).toMatch(/never a hot-reload|not a hot-reload/i);
  });

  // ── Genericity guard: config-driven, not hardcoded to one project ───────
  it('pulls the consumer path, sync script, and port from config rather than hardcoding them', () => {
    // This skill was originally built naming one specific private
    // library/consumer pair by name (an org-specific skill in all but the
    // literal repo strings). Fixed by making it fully config-driven — keep
    // it that way: the config section is what makes this reusable for any
    // package/consumer pair, not just the one it was first built for.
    expect(SKILL).toMatch(/consumerWorktreePath/);
    expect(SKILL).toMatch(/syncScript/);
    expect(SKILL).toMatch(/never assume a name/i);
  });

  // ── Privacy guard: never name the private repos or product this was built for ──
  //
  // This file is committed to a public repo, so the two private repo names
  // below are deliberately never written as a contiguous literal string —
  // even inside a "must not contain" assertion, the literal substring itself
  // is still sitting in this file's own text for anyone to read or grep.
  // An earlier commit on this exact branch made exactly that mistake (wrote
  // the two repo names directly into this test), and it went unnoticed
  // through a full genericization pass before being caught. Reassembled only
  // at runtime for the actual check — see PRIVATE_REPO_NAMES below.
  const PRIVATE_REPO_NAMES = [
    ['giselle', 'mui', 'poc'].join('-'),
    ['alexrebula', 'portfolio', 'poc'].join('-'),
  ];

  it('never names the private repos or product this was originally built against', () => {
    // This skill lives in a public repo. An earlier draft named the private
    // library/consumer repos directly, and even after that was fixed, the
    // skill was still hardcoded to one company's product name throughout
    // (its own name, description, and worked examples). Keep this skill
    // fully generic: no product name, no repo name, no absolute local path.
    // "giselle" alone is fine — it's the name of this org's actual public
    // component library, already named throughout this same public repo's
    // other, already-merged skills.
    for (const name of PRIVATE_REPO_NAMES) {
      expect(SKILL).not.toContain(name);
    }
    expect(SKILL).not.toMatch(/\/Users\/[a-zA-Z]/);
  });
});
