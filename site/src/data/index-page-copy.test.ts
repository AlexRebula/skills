import { describe, expect, it } from 'vitest';
import { formatHeroStatsCaption } from './index-page-copy';

describe('formatHeroStatsCaption', () => {
  it('interpolates the skill and category counts into the caption', () => {
    expect(formatHeroStatsCaption(79, 10)).toBe('79 skills · 10 categories · MIT');
  });
});
