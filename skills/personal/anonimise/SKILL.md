---
name: anonimise
description: >
  Anonymise sensitive personal data in wiki files using {{SCREAMING_SNAKE_CASE}} placeholders, with real values stored locally in vault.md (gitignored). Also resolves placeholders for local-context work by reading vault.md. Use when the user says "anonimise", "anonymise", "anonymize", "redact this", "add to vault", or invokes /anonimise.
---

# Anonimise Skill

Implements the wiki anonymisation pattern: sensitive personal data lives in `vault.md` (local, gitignored), wiki files use `{{SCREAMING_SNAKE_CASE}}` placeholders. Agents on this machine resolve placeholders via vault.md; remote agents see anonymised text but retain full structural context.

## Paths

- Vault: `$WIKI_ROOT/vault.md` (default: `c:/work/projects/ar/wiki/vault.md`)
- Vault example: `$WIKI_ROOT/vault.md.example`
- Path registry: `$WIKI_ROOT/paths.md`

## Direction 1 — Anonymise (real data → placeholders)

Use when the user wants to redact a file before pushing, or asks to "anonimise" content.

### Steps

1. **Read the target file(s).** If no file is specified, ask the user which file to anonymise.

2. **Read vault.md** (if it exists) to learn existing variable names and avoid duplicates.

3. **Identify sensitive data** — look for:
   - Full names, preferred names, nicknames
   - Email addresses, phone numbers
   - Physical locations (home address, city, country of residence)
   - Employer names, job titles, colleague names
   - Legal case details, case numbers, opposing party names
   - Financial figures tied to a person
   - Any named individual other than well-known public figures

4. **Propose variable names** using `{{SCREAMING_SNAKE_CASE}}`:
   - Names: `{{FULL_NAME}}`, `{{PREFERRED_NAME}}`, `{{EMPLOYER_NAME}}`
   - Locations: `{{HOME_CITY}}`, `{{HOME_COUNTRY}}`
   - Case details: `{{CASE_SUBJECT_NAME}}`, `{{CASE_NUMBER}}`
   - Contacts: `{{CONTACT_NAME}}`, `{{CONTACT_EMAIL}}`
   - Reuse existing vault variables where the value matches

5. **Show the proposed substitutions** to the user before editing:

   ```
   {{FULL_NAME}}     → Alex Rebula
   {{EMPLOYER_NAME}} → Acme Corp
   ```

   Confirm or adjust before proceeding.

6. **Edit the file** — replace all identified values with their `{{VARIABLE}}` placeholders.

7. **Update vault.md** — append any new variables under `## Variables`:

   ```md
   - NEW_VARIABLE: real value
   ```

   Preserve existing entries. If vault.md does not exist, create it from vault.md.example.

8. **Report** what was redacted and what was added to vault.md.

---

## Direction 2 — Resolve (placeholders → real values, local context only)

Use when the user is working locally and asks you to "resolve", "de-anonymise", or "show the real values" for a file containing `{{VARIABLES}}`.

### Steps

1. **Read vault.md.** If it does not exist, tell the user and stop.

2. **Read the target file(s).**

3. **Substitute** all `{{VARIABLE}}` occurrences with their vault.md values inline in your response — do NOT write the resolved version back to disk.

4. **Flag any unresolved variables** (present in the file but missing from vault.md).

---

## Rules

- Never write real personal values into any file tracked by git.
- vault.md is gitignored (`**/vault.md` in `.gitignore`) — always confirm this before writing to it.
- If a value is already a placeholder (`{{...}}`), do not double-wrap it.
- Prefer reusing existing vault variables over creating new ones for the same value.
- Variable names should be descriptive but not so specific they leak context (e.g. `{{CASE_SUBJECT_NAME}}` not `{{JESS_FULL_NAME}}`).
- Do not anonymise well-known public figures, organisations, or place names that add no identifying risk.
