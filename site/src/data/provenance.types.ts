/**
 * Shared between scripts/generate-provenance.ts (which writes provenance.json)
 * and ProvenanceBadge.tsx (which reads it): the single source of truth for
 * this shape, per the companion-types / promotion rule (a type used by a
 * second module moves to one shared file rather than being redeclared).
 */
export type ProvenanceStatus = 'upstream' | 'modified' | 'original' | 'inherited';

export interface DiffStatEntry {
  file: string;
  added: number;
  removed: number;
}

export interface ProvenanceEntry {
  status: ProvenanceStatus;
  /**
   * For "upstream"/"modified": the current upstream commit. For "inherited"
   * (no current upstream counterpart, but the skill existed upstream at some
   * point in its history): the last commit where it still existed there,
   * before it was removed or renamed.
   */
  upstreamSha?: string;
  upstreamUrl?: string;
  /** Only present when status is "modified": per-file +/- line counts vs upstream. */
  diffStat?: DiffStatEntry[];
  /**
   * Only present when status is "modified" and SKILL.md's `##` headings
   * changed vs upstream. Mechanically derived from the actual heading diff,
   * never AI-generated: e.g. "Adds 'Review step'; removes 'Legacy notes'".
   * Silent (undefined) when the diff didn't touch any heading, since a
   * heading-level summary can't honestly describe a same-section wording change.
   */
  changeSummary?: string;
}

export type ProvenanceMap = Record<string, ProvenanceEntry>;
