/**
 * privacy-scan.ts: built-in privacy/secret scan for the sync-up promotion
 * path. Always on, no configuration needed. Detects email addresses (with
 * an allowlist for placeholder/example addresses), phone numbers, and
 * common secret-key shapes. Detection only: never rewrites or redacts
 * anything. Any finding is meant to block promotion, not fix it silently.
 */

import { readFileSync } from 'fs';
import path from 'path';

// Bounded repetition throughout (no unbounded nested quantifiers) so this
// can't backtrack super-linearly on adversarial input.
const EMAIL_RE = /[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,5}[A-Za-z]{2,24}/g;
const ALLOWED_EMAIL_RE =
  /^git@github\.com$|\.example$|@(example\.(com|org|net)|users\.noreply\.github\.com)$/i;

// Deliberately conservative: broad-enough digit sequences (dates, version
// numbers, IDs) would swamp this with false positives. Covers common
// international and US phone formats.
const PHONE_RE = new RegExp(
  [
    '\\+\\d{1,3}[ -]?\\(?\\d{2,4}\\)?(?:[ -]\\d{2,4}){2,4}', // e.g. +1 415-555-2671
    '\\(\\d{3}\\)[ -]?\\d{3}[ -]?\\d{4}', // e.g. (415) 555-2671
    '\\b\\d{3}[ -]\\d{3}[ -]\\d{4}\\b', // e.g. 415-555-2671
  ].join('|'),
  'g'
);

const SECRET_KEY_PATTERNS: { re: RegExp }[] = [
  { re: /\bAKIA[0-9A-Z]{16}\b/g }, // AWS access key id
  { re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/g }, // GitHub token (personal access, OAuth, etc.)
  { re: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g }, // Slack token
  { re: /\bsk_live_[0-9A-Za-z]{16,}\b/g }, // Stripe live secret key
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g }, // PEM private key block
];

export type SensitiveFindingType = 'email' | 'phone' | 'secret-key';

export interface SensitiveFinding {
  file: string;
  type: SensitiveFindingType;
  match: string;
}

export interface SensitiveScanResult {
  clean: boolean;
  findings: SensitiveFinding[];
}

/**
 * Scans the given files (relative paths under baseDir) for PII or secrets.
 * Read-only, never modifies anything. Collects every finding rather than
 * stopping at the first.
 */
export function scanForSensitiveContent(baseDir: string, relFiles: string[]): SensitiveScanResult {
  const findings: SensitiveFinding[] = [];

  for (const relFile of relFiles) {
    const fullPath = path.join(baseDir, relFile);
    let content: string;
    try {
      content = readFileSync(fullPath, 'utf8');
    } catch {
      continue; // missing, binary, or unreadable: nothing to text-scan
    }

    for (const match of content.matchAll(EMAIL_RE)) {
      if (ALLOWED_EMAIL_RE.test(match[0])) continue;
      findings.push({ file: relFile, type: 'email', match: match[0] });
    }

    for (const match of content.matchAll(PHONE_RE)) {
      findings.push({ file: relFile, type: 'phone', match: match[0] });
    }

    for (const { re } of SECRET_KEY_PATTERNS) {
      for (const match of content.matchAll(re)) {
        findings.push({ file: relFile, type: 'secret-key', match: match[0] });
      }
    }
  }

  return { clean: findings.length === 0, findings };
}
