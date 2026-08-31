export const REPO = 'AlexRebula/skills';

export const HERO_TITLE = 'Skills for real engineers';
export const HERO_SUBTITLE_PREFIX =
  'A practical skill system for engineers who want to use AI without giving up their standards. Install the ones you use, then type a slash command. This is a fork of';
export const HERO_SUBTITLE_SUFFIX =
  'extended with framework scaffolding, the full git and PR lifecycle, and daily engineering workflows.';

/** The hero's overline caption - the skill/category counts are the only dynamic part. */
export function formatHeroStatsCaption(totalSkills: number, categoriesCount: number): string {
  return `${totalSkills} skills · ${categoriesCount} categories · MIT`;
}

export const UPSTREAM_REPO_URL = 'https://github.com/mattpocock/skills';
export const UPSTREAM_REPO_LABEL = 'mattpocock/skills';

export const INSTALL_LABEL = 'Install';
export const INSTALL_NOTE_PREFIX = 'Or as a read-only Claude Code plugin:';

export const STATS_CAPTION = 'By the numbers';
export const STATS_TITLE = 'This fork, at a glance';
export const STATS_DESCRIPTION =
  'Pulled from the same skill and provenance data the sections below render — not a separate, hand-maintained count.';

export const FLOW_SECTION_TITLE = 'The Flow';

export const OVERVIEW_LINK_PREFIX = 'You just saw the shape.';
export const OVERVIEW_LINK_TEXT = 'Read the Flow in detail';
export const OVERVIEW_LINK_DESCRIPTION = 'for why these stages actually fit together.';
export const OVERVIEW_LINK_HREF = '/overview';
