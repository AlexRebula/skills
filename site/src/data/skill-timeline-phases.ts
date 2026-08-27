import type { FlowSkill } from './flow-sections.types';
import { PROVENANCE_TIMELINE_COLOR } from './provenance-display';
import type { SkillTimelinePhaseData } from './skill-timeline-phases.types';

/**
 * Builds the non-JSX Timeline phase data for one sub-list's skills, in the
 * given array order (the caller is responsible for passing `sortOrder="key"`
 * to the Timeline component so this order is actually honored, since the
 * component's own default sort is by `date`, and here that isn't a real date).
 */
export function buildSkillTimelinePhases(skills: FlowSkill[]): SkillTimelinePhaseData[] {
  return skills.map((skill, index) => ({
    key: index,
    category: skill.category,
    name: skill.name,
    title: `/${skill.name}`,
    description: skill.description,
    date: skill.category,
    side: index % 2 === 0 ? 'left' : 'right',
    color: PROVENANCE_TIMELINE_COLOR[skill.status],
    hasDiff: !!skill.diff && skill.diff.files.length > 0,
  }));
}
