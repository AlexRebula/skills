import React, { type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import '../../data/register-solar-icons';
import { SKILL_ICON_NAMES } from '../../data/skill-icons';
import type { SkillIconProps } from './types';

/**
 * A skill's solar icon, looked up from `SKILL_ICON_NAMES` by "category/name".
 * Used by `SkillCard`, the landing page's per-skill summary card.
 */
export function SkillIcon({ category, name, size = 30 }: SkillIconProps): ReactNode {
  const iconBase = SKILL_ICON_NAMES[`${category}/${name}`];
  return <Icon icon={`solar:${iconBase}-bold-duotone`} width={size} height={size} />;
}
