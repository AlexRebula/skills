---
'alexrebula-skills': patch
---

`cleanup-component`'s `description` is back on one line. It was a double-quoted string that wrapped onto a second line starting at column 0, which `js-yaml` accepts but the `yaml` parser used by the skills installer rejects ("Missing closing quote"). The installer then reported the skill as deleted upstream and skipped it on update.
