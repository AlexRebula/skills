export type SkillCardColor = 'green' | 'amber';

export interface SkillCardProps {
  category: string;
  name: string;
  color: SkillCardColor;
  label: string;
}
