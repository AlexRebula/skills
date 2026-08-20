## What it does

`caveman` is a response mode, not a task. Once triggered, it drops articles, filler words, pleasantries and hedging from every reply, while keeping every technical claim exactly as accurate as it would be in full prose. The reported effect is roughly a 75% cut in tokens spent on a response, because most of what gets cut was never carrying information: "sure", "just", "basically", "I'd be happy to help" are the words that die, not the facts.

It is written to be sticky. Once it's on, it stays on for every following response in the session, not just the one after the trigger. There's no quiet drift back to normal prose after a few turns, and if the agent is ever unsure whether it's still meant to be active, the rule is to assume yes.

## When to reach for it

Say "caveman mode", "talk like caveman", "use caveman", "less tokens", "be brief", or invoke `/caveman`.

| Your situation | What happens |
| --- | --- |
| You want shorter answers for the rest of the session | Say the trigger phrase once; it applies to every response after |
| You're mid-caveman-session and want a break | Say "stop caveman" or "normal mode" |
| The next step is destructive, or a warning matters | The skill drops caveman on its own for that one message |

## What survives the cut

Code blocks are untouched. Error messages are quoted exactly as given. Technical terms keep their full, precise form. What gets compressed is the connective tissue around those things: conjunctions get stripped, causality gets written as an arrow (`X -> Y`), common terms get abbreviated (`DB`, `auth`, `config`, `impl`), and a long phrase collapses into a shorter synonym wherever one exists (`fix` instead of "implement a solution for").

The shape it aims for is `[thing] [action] [reason]. [next step].` A caveman-mode answer to "why does my React component re-render" reads: "Inline obj prop -> new ref -> re-render. `useMemo`." Nothing about the underlying claim changed; only the words carrying it got shorter.

## The auto-clarity exception

Caveman mode suspends itself, without being asked, in four situations: a security warning, confirming an irreversible action, a multi-step sequence where fragments could be misread out of order, or the user asking for clarification because something wasn't clear the first time. A destructive database operation gets a full warning in full sentences, with the caveman voice resuming only once that part is past:

```
**Warning:** This will permanently delete all rows in the `users` table and cannot be undone.
```

The judgment call (is this risky enough to warrant full prose) is the skill's to make, not yours to ask for each time.

## Common questions

**Does it lose precision to save tokens?**
No, and that's the one rule the skill treats as non-negotiable. Everything cut is filler: articles, hedging, pleasantries. The technical substance, meaning any claim you could be wrong about, stays exactly as stated in full prose.

**How do I turn it off?**
Say "stop caveman" or "normal mode". Nothing else reliably ends it; it doesn't fade out on its own after some number of turns.

**Will it stay off for a warning and then go silent again after?**
It resumes caveman mode right after the exception is handled, so you get one full-prose paragraph for the risky part and terse responses either side of it.

## It's working if

- Responses read like the React example: fragments, arrows for causality, no pleasantries, and every technical word intact.
- A destructive action still gets a full, clear warning in full sentences, not a compressed one.
- The mode doesn't quietly drift back to full prose over the course of a long session.
- Saying "stop caveman" gets you back to normal responses on the next message.

## Where it fits

`caveman` is a standalone response mode with no dependency on any other skill and no hand-off to one. It changes how answers are phrased, not what work gets done, so it layers over whatever else is happening in the session rather than replacing it.
