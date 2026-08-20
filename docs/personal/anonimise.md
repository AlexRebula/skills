## What it does

`anonimise` keeps sensitive personal data out of anything tracked by git while letting an agent keep full structural context. It works in two directions. Going one way, it reads a file, finds names, emails, addresses, employers, case details and other person-linked data, and replaces each value with a `{{SCREAMING_SNAKE_CASE}}` placeholder. Going the other way, it reads the same placeholders back and substitutes the real values inline, for local work only, without ever writing the resolved text to disk.

The real values live in one place: a local `vault.md` file that stays out of version control. Everything else, wiki pages, notes, whatever the skill touches, carries only placeholders. An agent working on a clone of the repo sees the shape of the content (a case has a subject, a date, an employer) without ever seeing who any of it is.

## When to reach for it

Say "anonimise", "anonymise", "anonymize", "redact this", "add to vault", or invoke `/anonimise` directly.

| Your situation | Direction |
| --- | --- |
| A file has real names, emails, or other personal data and you're about to commit it | Anonymise: real data to placeholders |
| A file is full of `{{PLACEHOLDERS}}` and you need the real values to keep working locally | Resolve: placeholders to real data, shown in the response only |
| You're not sure if a value is already anonymised | Ask first: the skill won't double-wrap an existing placeholder |

## The vault

`vault.md` is the only place real values are stored, and it must be gitignored before anything gets written to it. The skill checks for an ignore rule before writing a secret, and stops and warns you if one is missing rather than writing it anyway. A `vault.md.example` with no real values ships alongside it, so a fresh checkout has a template to build from.

Variable names are picked to describe the *kind* of value, not the value itself: `{{EMPLOYER_NAME}}`, `{{CASE_SUBJECT_NAME}}`, `{{HOME_CITY}}`. A name specific enough to leak context back (`{{JESS_FULL_NAME}}`) defeats the point, so the skill favours the duller, more generic label every time.

Before writing anything, it proposes the substitution table for you to confirm:

```
{{FULL_NAME}}     -> Jane Smith
{{EMPLOYER_NAME}} -> Acme Corp
```

Only after that does it edit the file and append any new entries to the vault.

## Common questions

**What counts as sensitive?**
Full names and nicknames, emails and phone numbers, home address or city, employer names and job titles, colleague names, case numbers and opposing party names in anything legal, financial figures tied to a specific person, and any named individual who isn't a public figure. Well-known public figures, organisations, and place names that carry no identifying risk on their own are left alone.

**Why not just encrypt the file?**
Encryption hides the content from everyone, including the agent that's supposed to keep working on it. Placeholders keep the structure legible (a case still visibly has a subject and a number) while the specific identity underneath it never leaves your machine.

**What happens to a value that's already a placeholder?**
Nothing. The skill checks for existing `{{...}}` wrapping before proposing a new one, and reuses an existing vault variable if the underlying value already has a name.

**Does resolving ever touch the file on disk?**
No. Resolution only ever appears in the response. The file with `{{PLACEHOLDERS}}` in it stays exactly as it was; nothing gets written back with real values inline.

## It's working if

- Every value in a committed file is a placeholder, never the real thing.
- `vault.md` never appears in `git status` as a trackable, un-ignored file.
- The proposed substitution table showed up before any edit was made, not after.
- A resolved value only ever appeared in a response, never on disk.
- Reused variables outnumber newly minted ones once a vault has a few entries in it.

## Where it fits

`anonimise` is a standalone, reach-for-it-anytime skill scoped to one workflow: keeping personal data out of a git-tracked wiki while an agent still works with the content. It has no upstream or downstream skill it hands off to; it's just the gate a file passes through before it's safe to commit, and the door back through when you need the real values again.
