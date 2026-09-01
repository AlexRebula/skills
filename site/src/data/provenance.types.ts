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

export type DiffRowType = 'context' | 'add' | 'remove' | 'change';

/**
 * One row of a side-by-side diff: independent old/new line numbers and
 * content so a two-column render can lay them out directly, without
 * re-deriving alignment from a unified +/- stream. A row has only an old
 * side ("remove"), only a new side ("add"), both sides from the same
 * unchanged line ("context"), or both sides from a paired replace, i.e. a
 * same-position wording change ("change").
 */
export interface DiffRow {
  type: DiffRowType;
  oldLineNumber: number | null;
  oldContent: string | null;
  newLineNumber: number | null;
  newContent: string | null;
}

export interface FileDiff {
  file: string;
  rows: DiffRow[];
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
  /**
   * Only present when status is "modified": the full line-level diff for
   * every changed file, computed once at build time so the diff modal never
   * needs a runtime GitHub call.
   */
  diffs?: FileDiff[];
  /**
   * Set when this skill's local name differs from the name its upstream
   * lineage was actually matched under (see site/src/data/skill-renames.ts).
   * Independent of `status`: a renamed skill still needs credit for the old
   * name even once its real status is correctly resolved.
   */
  renamedFrom?: string;
}

export type ProvenanceMap = Record<string, ProvenanceEntry>;
