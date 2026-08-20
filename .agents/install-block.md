# The canonical install block

One install story, one wording. `README.md`, `.changeset/*`, and every page under `docs/` must say **this** and nothing else. Change it here first, then propagate.

Unlike upstream `mattpocock/skills`, this fork is not listed in Claude Code's official marketplace (`claude-plugins-official`). `alexrebula-skills` ships as its own single-plugin marketplace instead: `.claude-plugin/marketplace.json` names it, and a user adds that marketplace before installing.

## Claude Code: the plugin

<canonical-block name="claude-code">

```
/plugin marketplace add AlexRebula/skills
/plugin install alexrebula-skills@AlexRebula
```

Updates arrive on `git pull` of your marketplace clone plus a plugin update, not automatically the way an official-marketplace listing would.

</canonical-block>

## Codex, and other agents: skills.sh

The plugin is Claude Code only. Everywhere else, [skills.sh](https://skills.sh/AlexRebula/skills) copies editable skill files into the project. Use the whole-set form on `README.md`:

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add AlexRebula/skills
```

Pick the skills you want, and which coding agents to install them on. **The installer lets you choose which skills to take: make sure `setup-engineering-skills` is one of them.**

</canonical-block>

…and the single-skill form wherever one skill is named on its own.

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add AlexRebula/skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

`skills@latest` is the pinned spelling in all three. This fork does not currently publish `docs/` pages to a hosted site, so the "docs pages render their own install widget" rule that applies to upstream's aihero.dev-published pages does not apply here yet; if that changes, revisit [writing-docs.md](./writing-docs.md).

## The two routes are exclusive

The plugin is a managed, read-only bundle you subscribe to. skills.sh writes files you own and edit. Installing both leaves the user with every skill twice: always say "pick one".
