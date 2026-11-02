# Problem

The shared date parser interprets day-first tenant input month-first, producing invites and reminders for the wrong calendar date. This is separate from booking-v3’s misleading hint.

# Reports covered

**379 unique reports** assigned to `parser` in merged ticket #4471, from 2026-04-01 through 2026-10-04, across 11 tenants. Deduplicate the 427 export rows by report ID before counting the 412 reports. Assignment uses the tenant directory’s locale, booking form and report channel via `causeOf`, not browser locale, subject or intake tags. 356 of these were tagged parser and 23 were tagged hint.

The full report ID membership is in `evidence/analysis.json`; regenerate with `node scripts/analyze.mjs`.

# Evidence and reproduction target

R-41200: Harbour Dental, en-GB, booking-v2, app. The report says 7 April appeared as 4 July. R-41203: Lantern Row, cs-CZ, app, reports 2 December appearing as 12 February. The export’s `causes.ts` specifies a shared month-first parser.

For a day-first tenant, enter an intended date such as `07/04/2026` through the affected app/email flow or booking-v2, then inspect the saved date and generated invite. Expected: 7 April. Reported behavior: 4 July. This is an evidence-backed reproduction target; the course export contains no runnable product to reproduce it against.

# Unresolved caveats

Five included IDs — R-41202, R-41209, R-41236, R-41344, R-41620 — describe one-day shifts or event ordering, rather than a demonstrated month swap. The supplied classifier assigns them here by tenant/channel; these are assigned counts, not proof that all reports share this root cause. Investigate date-only storage, timezone conversion and timestamps. Do not claim they are fixed by a parser change without reproducing their behavior. They are not counted again in a separate issue.

# Acceptance checks

- Interpret input using the intended tenant locale; do not infer it from the reporter’s browser locale.
- Verify ambiguous dates and days greater than 12 through app, email and booking-v2 paths, inspecting both stored values and actual invite/reminder dates.
- Check app/email paths for booking-v3 tenants too; the form hint is a separate issue.
- Investigate and explicitly account for the five anomalous reports before closing this ticket.
- Verify incoming reports after the export; a merge count or a queued fix does not show recovery.
