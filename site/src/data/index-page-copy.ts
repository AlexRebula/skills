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
export const STATS_DESCRIPTION = 'Generated straight from the repo, so these numbers never go stale.';

export const FLOW_SECTION_TITLE = 'The Flow';

export const OVERVIEW_LINK_PREFIX = 'You just saw the shape.';
export const OVERVIEW_LINK_TEXT = 'Read the Flow in detail';
export const OVERVIEW_LINK_DESCRIPTION = 'for why these stages actually fit together.';
export const OVERVIEW_LINK_HREF = '/overview';

export const PERSONA_PICKER_CAPTION = 'Choose your category';
export const PERSONA_PICKER_TITLE = 'Flows tailored to you';
export const PERSONA_PICKER_DESCRIPTION =
  "Choose which persona category best fits you and we'll suggest the workflows and skills for you.";

export const PERSONA_PICKER_ROUTER_PREFIX = "Don't know where to start? Skip the picker and run";
export const PERSONA_PICKER_ROUTER_SUFFIX =
  "instead — works like Matt Pocock's ask-matt, scoped to this fork: describe your situation and it'll name the skill or sequence that fits.";
