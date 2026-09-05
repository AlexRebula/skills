import type { FileDiff } from '../../data/provenance.types';

export interface DiffModalProps {
  skillName: string;
  upstreamSha: string;
  /** ISO 8601 date; absent skills render without a "last updated" line rather than a placeholder. */
  lastUpdated?: string;
  files: FileDiff[];
  onClose: () => void;
}
