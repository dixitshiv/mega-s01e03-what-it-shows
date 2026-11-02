# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review

The signed review is in `src/routes/kb/incidents/4471-review/+page.svx`.
Its rendered HTML is `build/kb/incidents/4471-review.html`; the full static site, including assets, is in `build/`.

- `npm ci` installs the locked dependencies (Node 22.17+).
- `node scripts/analyze.mjs` regenerates the report membership and counts in `evidence/analysis.json`.
- `npm run build` compiles the original Svelte components and prerenders every kb page.
- `npm run preview -- --port 4173` serves the built site locally; open `/kb/incidents/4471-review`.

The original accepted decision 0001 is unchanged. Decision 0002 is proposed; this work does not claim desk approval or a deployed product fix. The incident and triage prose now point to the evidence and proposed replacement.

The report counts are assignments from the supplied tenant/form/channel classifier. Five anomalous report bodies are preserved for investigation within the parser assignment. The issue drafts in `evidence/` state that limitation explicitly.

## Engineering tickets

- [Shared parser: 379 assigned reports](https://github.com/dixitshiv/mega-s01e03-what-it-shows/issues/1)
- [Booking-v3 hint: 33 reports](https://github.com/dixitshiv/mega-s01e03-what-it-shows/issues/2)
