import type { FileDiff } from '../../data/provenance.types';

export interface DiffModalProps {
  skillName: string;
  upstreamSha: string;
  files: FileDiff[];
  onClose: () => void;
}
