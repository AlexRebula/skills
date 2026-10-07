import { describe, expect, it } from 'vitest';
import { FLOW_STAGE_ORDER_NOTE, formatHeroStatsCaption } from './index-page-copy';

describe('formatHeroStatsCaption', () => {
  it('interpolates the skill and category counts into the caption', () => {
    expect(formatHeroStatsCaption(79, 10)).toBe('79 skills · 10 categories · MIT');
  });
});

describe('FLOW_STAGE_ORDER_NOTE', () => {
  it('tells the reader the order is a suggestion they can skip or rearrange', () => {
    expect(FLOW_STAGE_ORDER_NOTE).toMatch(/suggestion/);
    expect(FLOW_STAGE_ORDER_NOTE).toMatch(/skip/i);
    expect(FLOW_STAGE_ORDER_NOTE).toMatch(/order/);
  });
});
