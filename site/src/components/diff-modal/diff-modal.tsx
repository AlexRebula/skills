import React, { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
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

// A file's name can contain characters (like the "/" in "agents/openai.yaml")
// that are unconventional in an id/CSS selector context; sanitize rather than
// relying on the raw filename being safe as one.
function slug(file: string): string {
  return file.replace(/[^a-zA-Z0-9_-]/g, '-');
}

const tabId = (file: string): string => `diff-tab-${slug(file)}`;
const panelId = (file: string): string => `diff-panel-${slug(file)}`;

/** Whether this row's old (removed) side should be tinted. */
function oldSideClass(row: DiffRow): string | undefined {
  return row.type === 'remove' || row.type === 'change' ? styles.removedSide : undefined;
}

/** Whether this row's new (added) side should be tinted. */
function newSideClass(row: DiffRow): string | undefined {
  return row.type === 'add' || row.type === 'change' ? styles.addedSide : undefined;
}

/**
 * A "context" row's old and new content are always identical (nothing
 * changed on that line) - rendering both sides anyway just duplicates the
 * same text twice, which is most of a typical diff's rows and was the real
 * cause of a table wide enough to make comparing the lines that actually
 * differ feel like scrolling through noise to find them (reported directly,
 * even after the sticky column / scroll hint fix below already shipped -
 * that fixed discoverability, not the underlying width). One row, one line
 * number, content spanning the full row instead.
 */
function DiffRowView({ row }: { row: DiffRow }): ReactNode {
  if (row.type === 'context') {
    return (
      <tr>
        <td className={styles.lineNumber}>{row.oldLineNumber ?? ''}</td>
        <td className={styles.lineContent} colSpan={3}>
          {row.oldContent}
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td className={clsx(styles.lineNumber, oldSideClass(row))}>{row.oldLineNumber ?? ''}</td>
      <td className={clsx(styles.lineContent, styles.oldColumn, oldSideClass(row))}>{row.oldContent}</td>
      <td className={clsx(styles.lineNumber, newSideClass(row))}>{row.newLineNumber ?? ''}</td>
      <td className={clsx(styles.lineContent, newSideClass(row))}>{row.newContent}</td>
    </tr>
  );
}

/**
 * Every element inside the panel that Tab should be able to reach, in DOM
 * order: excludes disabled elements and, importantly, the inactive tabs
 * (real <button> elements, but deliberately given tabIndex={-1} as part of
 * the roving-tabindex pattern, so they must not count as "focusable" here).
 */
function focusableElements(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>('button, [href], [tabindex]')).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1',
  );
}

/**
 * Full-screen, tabbed side-by-side diff, replacing the small "Changed vs
 * Upstream" popover ProvenanceButton used to show. Renders directly against
 * the FileDiff[] shape generate-provenance.ts computes at build time: no
 * diffing, and no network call, happens here.
 *
 * Tabs only appear when there's more than one changed file: a single-file
 * diff (the common case) goes straight to the two-column view. Follows the
 * WAI-ARIA tabs pattern for real (roving tabindex, arrow-key navigation,
 * tab/tabpanel linked via aria-controls), not just the tablist/tab roles
 * with none of the accompanying behavior.
 */
export function DiffModal({ skillName, upstreamSha, files, onClose }: DiffModalProps): ReactNode {
  const [activeFile, setActiveFile] = useState(() => defaultFile(files));
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const previouslyFocused = useRef<Element | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // The side-by-side table can run far wider than any real viewport (a long
  // code line easily produces a several-thousand-pixel-wide row) - `.body`'s
  // own `overflow: auto` already lets it scroll, but a plain scrollbar alone
  // is easy to miss, which reads as "the table is cropped" rather than
  // "scroll right for more" (reported repeatedly). ResizeObserver instead of
  // a one-off check on mount: switching tabs (a different file's table, a
  // different natural width) must re-evaluate, not just the initial file.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    function checkOverflow() {
      if (!body) return;
      setHasOverflow(body.scrollWidth > body.clientWidth);
    }
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(body);
    return () => observer.disconnect();
  }, [activeFile]);

  // Move focus in on mount, restore it to whatever had it before (the
  // trigger button, in practice) on unmount, rather than letting it fall
  // back to document.body when this component disappears.
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused.current instanceof HTMLElement) previouslyFocused.current.focus();
    };
  }, []);

  // Escape closes the dialog; Tab/Shift+Tab wrap at the panel's edges
  // instead of escaping into the page behind the modal (a focus trap).
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = focusableElements(panelRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function focusTabAt(index: number) {
    const file = files[index]?.file;
    if (!file) return;
    setActiveFile(file);
    tabRefs.current[file]?.focus();
  }

  // Roving-tabindex arrow-key navigation, per the WAI-ARIA tabs pattern:
  // only the active tab is in the normal Tab order, arrow keys move (and
  // activate) between tabs directly.
  function handleTabKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusTabAt((index + 1) % files.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusTabAt((index - 1 + files.length) % files.length);
    }
  }

  const hasTabs = files.length > 1;
  const activeDiff = files.find((f) => f.file === activeFile) ?? files[0];

  return (
    <div className={styles.overlay}>
      <div ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-label={`What's different in ${skillName}`}>
        <div className={styles.header}>
          <span className={styles.skillName}>{skillName}</span>
          <span className={styles.sha}>upstream @ {shortSha(upstreamSha)}</span>
          <button type="button" ref={closeButtonRef} className={styles.closeButton} aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {hasTabs && (
          <div className={styles.tabs} role="tablist">
            {files.map((f, index) => {
              const isActive = f.file === activeFile;
              const { added, removed } = lineCounts(f.rows);
              return (
                <button
                  key={f.file}
                  ref={(el) => {
                    tabRefs.current[f.file] = el;
                  }}
                  type="button"
                  id={tabId(f.file)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId(f.file)}
                  tabIndex={isActive ? 0 : -1}
                  className={clsx(styles.tab, isActive && styles.tabActive)}
                  onClick={() => setActiveFile(f.file)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                >
                  {f.file} (+{added}/-{removed})
                </button>
              );
            })}
          </div>
        )}

        <div
          ref={bodyRef}
          className={styles.body}
          role={hasTabs ? 'tabpanel' : undefined}
          id={hasTabs ? panelId(activeDiff.file) : undefined}
          aria-labelledby={hasTabs ? tabId(activeDiff.file) : undefined}
        >
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
        {hasOverflow && <p className={styles.scrollHint}>Scroll to see more →</p>}
      </div>
    </div>
  );
}
