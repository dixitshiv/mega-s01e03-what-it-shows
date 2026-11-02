<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const merged = uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const anomalies = merged.filter((r) => notes.oneDayMove.includes(r.id));
  const months = [...new Set(merged.map((r) => r.receivedAt.slice(0, 7)))].sort();
  const monthCount = (month: string, field: 'receivedAt' | 'mergedAt') => merged.filter((r) => r[field]?.startsWith(month)).length;
</script>

<h2>Counting method</h2>
<p>The export contains {reports.length} rows. Deduplicating by report ID removes {reports.length - uniqueById(reports as Report[]).length} repeated rows; {merged.length} unique reports belong to #4471. Join each report to its tenant directory entry and classify by tenant locale, booking form and channel. Browser locale and intake tags do not establish cause.</p>
<table>
  <thead><tr><th>Cause</th><th>Assigned reports</th><th>Intake tags that disagree</th></tr></thead>
  <tbody>{#each groups as g}<tr><td>{g.cause}</td><td>{g.reports.length}</td><td>{Object.entries(g.taggedAs).filter(([tag]) => tag !== g.cause).map(([tag, n]) => `${tag}: ${n}`).join(', ') || 'none'}</td></tr>{/each}</tbody>
</table>

<h2>Received is different from merged</h2>
<table><thead><tr><th>Month</th><th>Received</th><th>Merged</th></tr></thead><tbody>{#each months as month}<tr><td>{month}</td><td>{monthCount(month, 'receivedAt')}</td><td>{monthCount(month, 'mergedAt')}</td></tr>{/each}</tbody></table>
<p>The July merge batch is desk activity, not the start of the incident. Reports arrived before that batch and continued after it. A growing merged count does not show a fix or recovery.</p>

<h2>Reports the classification does not explain</h2>
<p>{anomalies.length} reports are recorded in the desk notes as one-day moves. The supplied classifier assigns them to parser by tenant and channel; their bodies are not proof of a month/day swap. They remain included in that assigned count, with no double counting. Investigate date-only values, timezone conversion and event timestamps before asserting a third root cause or claiming the parser fix covers them.</p>
<table><thead><tr><th>Report</th><th>Tenant / channel</th><th>Reporter’s description</th></tr></thead><tbody>{#each anomalies as r}<tr><td>{r.id}</td><td>{r.tenant} / {r.channel}</td><td>{r.body}</td></tr>{/each}</tbody></table>
