# Triage Labels

The skills speak in terms of six canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate this issue |
| `needs-info` | `needs-info` | Waiting on reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified, ready for an AFK agent |
| `ready-for-human` | `ready-for-human` | Requires human implementation |
| `to-grill` | `to-grill` | Needs design exploration via `/grill-me` before implementing |
| `wontfix` | `wontfix` | Will not be actioned |

This repo adds one role beyond the six above, for the moment an issue has been grilled but is not itself a `ready-for-agent` ticket (e.g. an epic, or a decision-only issue whose implementation lives in a split-off child ticket):

| Role | Label in our tracker | Meaning |
| --- | --- | --- |
| settled | `spec'd` | Grilled and decided (see `grilling`'s "Closing out a tracked issue" step) — `to-grill` must never remain once this is applied |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.
