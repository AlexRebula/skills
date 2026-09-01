import React, { useState, type ReactNode } from 'react';
import type { CopyableCommandProps } from './types';
import styles from './copyable-command.module.css';

export function CopyableCommand({ command }: CopyableCommandProps): ReactNode {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className={styles.commandRow}>
      <code>{command}</code>
      <button type="button" className={styles.copyButton} onClick={handleCopy} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
