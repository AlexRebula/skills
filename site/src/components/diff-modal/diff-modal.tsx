import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import type { DiffRow } from '../../data/provenance.types';
import type { DiffModalProps } from './types';
import styles from './diff-modal.module.css';

function shortSha(sha: string): string {
  return sha.slice(0, 7);
}

/** The file whose tab is open by default: SKILL.md when present, otherwise whichever file is first. */
function defaultFile(files: DiffModalProps['files']): string {
  return files.some((f) => f.file === 'SKILL.md') ? 'SKILL.md' : files[0].file;
}

function lineCounts(rows: DiffRow[]): { added: number; removed: number } {
  const added = rows.filter((r) => r.type === 'add' || r.type === 'change').length;
  const removed = rows.filter((r) => r.type === 'remove' || r.type === 'change').length;
  return { added, removed };
}

function DiffRowView({ row }: { row: DiffRow }): ReactNode {
  return (
    <tr className={styles[row.type]}>
      <td className={styles.lineNumber}>{row.oldLineNumber ?? ''}</td>
      <td className={styles.lineContent}>{row.oldContent}</td>
      <td className={styles.lineNumber}>{row.newLineNumber ?? ''}</td>
      <td className={styles.lineContent}>{row.newContent}</td>
    </tr>
  );
}

/**
 * Full-screen, tabbed side-by-side diff, replacing the small "Changed vs
 * Upstream" popover ProvenanceButton used to show. Renders directly against
 * the FileDiff[] shape generate-provenance.ts computes at build time: no
 * diffing, and no network call, happens here.
 *
 * Tabs only appear when there's more than one changed file: a single-file
 * diff (the common case) goes straight to the two-column view.
 */
export function DiffModal({ skillName, upstreamSha, files, onClose }: DiffModalProps): ReactNode {
  const [activeFile, setActiveFile] = useState(() => defaultFile(files));
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const activeDiff = files.find((f) => f.file === activeFile) ?? files[0];

  return (
    <div className={styles.overlay}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={`What's different in ${skillName}`}>
        <div className={styles.header}>
          <span className={styles.skillName}>{skillName}</span>
          <span className={styles.sha}>upstream @ {shortSha(upstreamSha)}</span>
          <button type="button" ref={closeButtonRef} className={styles.closeButton} aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {files.length > 1 && (
          <div className={styles.tabs} role="tablist">
            {files.map((f) => (
              <button
                key={f.file}
                type="button"
                role="tab"
                aria-selected={f.file === activeFile}
                className={clsx(styles.tab, f.file === activeFile && styles.tabActive)}
                onClick={() => setActiveFile(f.file)}
              >
                {f.file} ({(() => {
                  const { added, removed } = lineCounts(f.rows);
                  return `+${added}/-${removed}`;
                })()})
              </button>
            ))}
          </div>
        )}

        <div className={styles.body}>
          <table className={styles.diffTable}>
            <tbody>
              {activeDiff.rows.map((row, i) => (
                // Diff rows have no stable identity of their own (a line's content can
                // repeat elsewhere in the same file); position in this fixed, never-
                // reordered list is the only available key.
                <DiffRowView key={i} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
