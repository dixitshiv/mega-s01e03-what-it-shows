# Problem

The booking-v3 form prints `MM/DD/YYYY` while interpreting dates in the tenant’s day-first order. People follow the displayed hint and the form reads another date. Correcting the shared parser alone does not correct the hint contract.

# Reports covered

**33 unique reports** assigned to `hint` in merged ticket #4471, from 2026-04-17 through 2026-09-22. All arrived through `form` for three booking-v3 tenants: Alder Physio (de-DE), Copper Studio (es-ES) and Pale Harbour (pt-PT). 18 were tagged hint and 15 were incorrectly tagged parser. The classification joins tenant locale/form to report channel; browser locale and intake tags are not authoritative.

The full report ID membership is in `evidence/analysis.json`; regenerate with `node scripts/analyze.mjs`. Together the two assignments cover all 412 unique reports, with no overlap.

# Evidence and reproduction target

R-41230: Copper Studio, booking-v3, form. The reporter describes 6 January appearing as 1 June, although intake tagged it parser. R-41241: Alder Physio, form, reports 6 August appearing as 8 June. `DATE_HINT` and `causeOf` in the export explain this separate path.

Open booking-v3 for a day-first tenant. For intended 6 January, enter `01/06/2026` as the displayed month-first hint instructs. Expected: the hint, validation and interpretation agree, preserving 6 January. Reported behavior: the tenant’s day-first reader produces 1 June. The export does not include the product implementation, so this is a reproduction target rather than a claim of a local product test.

# Acceptance checks

- Make displayed format, validation and interpretation agree with the tenant locale.
- Verify all three affected booking-v3 tenants with an ambiguous date and a day greater than 12.
- Check the stored booking and generated invite; show clear validation when input disagrees with the format.
- Verify booking-v2 and app/email paths separately; they do not share this hint-specific assignment.
- Keep this issue separate from the shared parser fix and review new reports after the snapshot.

# Engineering outcome

The [course desk update](https://hq.mega.dev/challenges/what-it-shows#engineering-update) marks #4471 closed on 5 October and hint WON'T FIX: booking-v3 form retired. Close this issue as not planned because the affected form was retired, not because its hint was corrected.
