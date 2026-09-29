---
"alexrebula-skills": minor
---

The docs site's generated data now carries two new fields for consuming sites. Each skill gets a `whenToUse` line: the first sentence of its docs page's "When to reach for it" section, inline markdown kept, written to a gitignored `skill-when-to-use.json` keyed by `category/name` like the summaries. Each flow stage gets an `ordered` flag, set by hand in the stage config and exposed on the site's flow sections, so a consumer can number and connect the skills of a stage that runs as a fixed sequence ("Start the day") and leave the others as a set. What the site renders is unchanged.
