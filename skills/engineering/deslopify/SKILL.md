---
name: deslopify
description: >
  Strip AI tells from prose and code and restore a human voice. For prose (blog drafts, PR
  descriptions, commit messages, wiki pages, docs, session summaries) this must always apply:
  scan and rewrite any Claude-authored text meant for a human reader before it's shown, the same
  way a human editor would pass over their own first draft. For code, only on explicit request
  (`/deslopify <file>` or as part of a review): never silently rewrite code that wasn't asked
  for.
---

# Deslopify

Two independent passes, sharing one process: scan for tells, rewrite, add back what generic
output strips out, self-audit.

Prose pattern list adapted from cursor/plugins' `unslop` skill
(https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md).

## Prose

Applies to anything meant for a human reader: blog drafts, PR descriptions, commit messages,
wiki/doc pages, session summaries, chat or agent-session replies. Every pattern below applies
everywhere in that list except pattern 13 (em dashes), which applies only to text being written
to a file, not to live chat or agent-session replies. See that pattern for the exact split.

### Process

1. Calibrate density to context (see below) before touching anything.
2. Scan for the patterns below.
3. Rewrite. Preserve meaning, match the intended tone and the density from step 1.
4. Add soul (see below): removing patterns is half the job, sterile voiceless writing is just
   as obvious a tell.
5. Self-audit: "What makes this obviously AI-generated?" Fix whatever's left, without losing
   density in a reference-context answer.

### Calibrate density to context

Decide what the target is for before rewriting. This changes what "fixed" looks like.

- **Narrative** (blog drafts, essays, PR descriptions meant to be read end-to-end, wiki pages
  written to be read straight through): flatten inline-header lists into prose per pattern 16,
  vary sentence rhythm, let paragraphs run as long as the content earns. Write it the way an
  experienced writer would, not a list that got mechanically joined into sentences. If you can't
  tell the difference on read-back, it isn't done yet. See "Adding soul" below for the concrete
  technique.
- **Reference or technical** (research answers, engineering Q&A, rule or config summaries,
  anything the reader will scan or jump back into): keep bullets, short bold labels, and tables.
  Three or more distinct items get a numbered or bulleted list, never run together in one
  sentence, even in a short reply. The tell being fixed is empty language, not structure. Turning
  a scannable list into flowing paragraphs is not a fix here. It's a regression. It forces linear
  reading onto information the reader wanted to scan, and makes the answer longer to get through,
  not shorter.

A fix must never add length. Deslopify removes noise, it does not pad. If cutting a pattern (a
hedge, a filler phrase) leaves a gap, close it with fewer words, not more sentences. A rewrite
that reads longer than the slop it replaced has moved the tell, not fixed it, that includes
converting a tight bulleted answer into paragraphs that say the same thing at greater length.

### Adding soul

- **Have opinions.** React to facts instead of neutrally listing pros and cons.
- **Vary rhythm.** Short sentences. Then longer ones that take their time. Mix it up.
- **Acknowledge complexity.** "Impressive but also kind of unsettling" beats "impressive."
- **Use "I" when it fits.** First person isn't unprofessional.
- **Let some mess in.** Perfect structure looks machine-made.
- **Be specific.** Not "this is concerning" but "there's something unsettling about agents
  churning away at 3am."

### Patterns to detect and fix

**Content**

1. **Puffery.** "pivotal moment", "testament to", "evolving landscape", "setting the stage for",
   "indelible mark", "deeply rooted". Cut it, state what happened.
2. **Name-dropping.** Listing sources/outlets without context. Pick one, say what was said.
3. **Superficial -ing phrases.** "highlighting...", "ensuring...", "reflecting...",
   "showcasing...", "fostering...". Delete or expand with a real detail.
4. **Promotional language.** "nestled", "vibrant", "breathtaking", "groundbreaking", "renowned",
   "stunning", "must-visit". Use neutral descriptions.
5. **Vague attributions.** "Experts believe", "Industry reports suggest", "Some critics argue".
   Name the source or delete.
6. **Formulaic challenges.** "Despite challenges... continues to thrive." Replace with specific
   facts.

**Language**

7. **AI vocabulary.** Additionally, crucial, delve, enduring, enhance, fostering, garner,
   interplay, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), testament,
   underscore, vibrant. Replace with plain words.
8. **Fancy ways to say "is".** "serves as", "stands as", "boasts", "features". Just say "is" or
   "has".
9. **"Not just X, but Y."** State the point directly instead.
10. **Rule of three.** Forcing ideas into groups of three. Use the natural number.
11. **Synonym cycling.** Protagonist, main character, central figure, hero all in one paragraph.
    Pick one, repeat it.
12. **False ranges.** "from X to Y" where X and Y aren't on a meaningful scale. List topics
    directly.

**Style**

13. **Em dash overuse, in committed text.** Applies to anything being written to a file: blog
    drafts, commit messages, PR bodies, wiki or doc pages, session-summary files. Avoid em dashes
    entirely there. Use periods or commas only (no parentheses, no en dashes, no hyphen-as-dash
    substitutes). Em dashes are an AI tell in written artifacts, and reaching for parentheses
    instead just trades one tell for another. If a thought needs separation, end the sentence or
    use a comma. **Exception: live chat or agent-session replies that are not being saved to
    disk.** Em dashes are allowed there. This pattern does not apply to that surface.
14. **Colon overuse.** Colons are fine before a list or example, not as mid-sentence connectors.
    "If you're coming from traditional automation: instead of registering event handlers, you
    describe conditions" adds nothing with the colon. Rewrite to let the point stand on its own.
15. **Boldface overuse.** Don't bold every proper noun or acronym.
16. **Inline-header lists.** The tell is a bold label and colon that restates the line: "**
    Performance:** Performance improved...". Fix the restating label (reword it or drop the
    colon-restate). Only flatten the surrounding list into prose in a narrative context, in a
    reference or technical context, keep the list and fix just the label (see "Calibrate density
    to context" above). A bold lead-in that ends in a period, names the item, and is followed by
    genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine, not a
    tell, in either context.
17. **Title case headings.** Use sentence case.
18. **Decorative emojis.** Remove from headings and bullets.
19. **Curly quotes.** Replace with straight quotes.

**Communication artifacts**

20. **Chatbot phrases.** "I hope this helps!", "Let me know if...", "Of course!", "Certainly!",
    "Found the smoking gun!" Remove.
21. **Cutoff disclaimers.** "While specific details are limited..." Find sources or remove.
22. **Sycophantic tone.** "Great question! You're absolutely right!" Respond directly.

**Filler**

23. **Filler phrases.** "In order to" becomes "To". "Due to the fact that" becomes "Because". "It
    is important to note that" gets deleted.
24. **Excessive hedging.** "could potentially possibly be argued that it might" becomes "may".
25. **Generic conclusions.** "The future looks bright." State specific plans or facts.

**Jargon**

26. **Abstract metaphor nouns.** Substrate, wedge, vector, locus, vantage, nexus, primitive (as
    noun), harness (as metaphor), surface (as in "API surface"), bedrock, scaffolding (as
    metaphor), modality, paradigm, gold-plating, ratchet (as metaphor), evacuate (for moving
    code), endgame, north star, flywheel. These read as technical but usually have a plainer
    concrete word: "substrate" becomes "base", "wedge in" becomes "add", "vector" becomes "way"
    or "method", "gold-plating" becomes "more than the job needs", "ratchet" becomes the
    mechanism's real name or "a limit that only tightens", "evacuate" becomes "move out",
    "endgame" becomes "the last phase". Pick the concrete word.

**Plain speech**

27. **Say what it does, not how it feels.** "the database stays close at hand", "SQL you can
    read", "types that follow your schema" name a feeling. Name the mechanism or a number
    instead: "`.toSQL()` returns the exact string sent to the database", "a column rename fails
    the build". Ask what the sentence tells the reader to do or know, then write that. If you
    can't restate it as a concrete instruction, fact, or number, cut it. One more check: if the
    sentence could appear unchanged in another project's docs, it says nothing about this one.
    Cut it.
28. **Shorten or split dense sentences.** If the reader has to backtrack to parse a sentence,
    break it in two or drop clauses. One idea per sentence.
29. **Active voice.** Prefer it. Catch "is/are/was/were + past participle" and name the actor:
    "queries are validated" becomes "the compiler validates queries", "the file is parsed by the
    loader" becomes "the loader parses the file". Passive is fine only when the actor is unknown
    or genuinely doesn't matter.
30. **Cut adverbs, or use a stronger verb.** "runs quickly" becomes "is fast" or the number.
    "significantly improves" becomes the measured delta. An adverb propping up a weak verb means
    the verb is wrong.
31. **Prefer the plain word.** "utilize" becomes "use", "leverage" becomes "use", "facilitate"
    becomes "help", "numerous" becomes "many", "in the event that" becomes "if". The fancier
    synonym is rarely clearer.

## Code

Applies only when explicitly invoked: `/deslopify <file>` or as an explicit step in a review.
Never auto-triggers on code, and never runs alongside a design/simplification review as a
substitute for one.

**Scope note:** this pass hunts *generation tells* (leftovers from an AI writing pass that a
careful human wouldn't have left in), not general code quality. Questions like "is this the
simplest design", "is this reused elsewhere", or "does this follow the repo's standards" belong
to `karpathy-guidelines`, `/simplify`, and `/review-pr` respectively. If a finding is really
about design or duplication rather than a tell, name it but leave the actual fix to one of those.

### Process

1. Scan the target file(s) for the patterns below.
2. Fix each one directly: this is a rewrite pass, not a findings report.
3. Self-audit: "What in this file looks like it was generated rather than written?" Fix whatever
   is left.

### Patterns to detect and fix

1. **Restating comments.** A comment that just repeats what the line below already says in
   English (`// increment i` above `i++`, `// Return the result` above `return result;`). Delete
   the comment; if the code needs explaining, the comment should say *why*, not *what*.
2. **Impossible error handling.** `try`/`catch` (or equivalent) wrapping code that cannot throw
   given its actual inputs, or a `catch` that only rethrows/logs and adds no behavior. Remove the
   wrapper; let it fail loudly if it ever does throw for a real reason.
3. **Dead defensive branches.** An `if`/`else`, null check, or type guard defending against a
   state the caller's types or contract already rule out. Confirm it's genuinely unreachable
   (not just unlikely), then delete the branch.
4. **Placeholder docstrings.** A docstring or JSDoc block that restates the function's name in
   sentence form ("This function processes the data and returns the result") without adding
   information a careful reader couldn't get from the signature. Delete it, or replace it with
   the one non-obvious fact worth recording (a constraint, a gotcha, a why).
5. **Over-verbose naming.** A variable, function, or type renamed into an unnecessarily long
   descriptive phrase where a short, honest name already existed and was clear
   (`userAuthenticationStatusBooleanFlag` for `isAuthenticated`). Shorten to the name a human
   maintainer of this codebase would actually use.
6. **Leftover generation scaffolding.** `TODO`/`FIXME` comments, stub functions, or placeholder
   values left behind from a generation pass rather than tracking a real, intended follow-up.
   Remove scaffolding that isn't a genuine open task; leave real TODOs alone.

Report what you changed and why, file:line, in the same reply: don't just make the edits
silently for the code half, since (unlike the always-on prose half) the human didn't watch this
one happen turn by turn.
