import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'analytics',
    navLabel: 'Analytics & reporting',
    title: 'ObjectOS Analytics: Dashboards and Reports over Governed Objects',
    description:
      'Aggregations, time series, funnels, and dashboards over the same governed objects the app runs on — with a widget-based dashboard designer and a band-based report designer, permission-aware by construction.',
    eyebrow: 'Analytics & reporting',
    heroTitle: 'Answers from the system of record — not a second data stack.',
    lead:
      'Finance wants MRR by plan, month over month. Ops wants an SLA dashboard. The usual answer is exporting into a BI tool where permissions, definitions, and freshness quietly drift. ObjectOS runs the same questions over the governed objects themselves — defined once as a dataset, rendered in dashboards, and assembled in a designer.',
    primary: { label: 'Compare editions and pricing', href: '/en/pricing/' },
    secondary: { label: 'See data modeling', href: '/en/data-modeling/' },
    metrics: [
      { value: '3', label: 'Query strategies: native SQL, ObjectQL, in-memory' },
      { value: 'Same rules', label: 'Row and field permissions apply to every report' },
      { value: 'Zero ETL', label: 'Reports run on live objects, not exported copies' },
    ],
    artifact: {
      eyebrow: 'Metrics as metadata',
      title: 'Define the measure once. Reuse it everywhere.',
      body:
        'A dataset names the measures and dimensions a business cares about. Dashboards, reports, and AI questions all resolve against the same definition, so "monthly recurring revenue" means one thing.',
      code: `import { defineDataset, defineReport } from '@objectstack/spec/ui';

export const RevenueDataset = defineDataset({
  name: 'billing_revenue',
  label: 'Revenue',
  object: 'billing_subscription',
  dimensions: [
    { name: 'plan', label: 'Plan', field: 'plan', type: 'string' },
    { name: 'month', label: 'Month', field: 'renews_at', type: 'date', dateGranularity: 'month' },
  ],
  measures: [
    { name: 'mrr', label: 'MRR', aggregate: 'sum', field: 'mrr', format: '0.0' },
    { name: 'active_subs', label: 'Active Subscriptions', aggregate: 'count' },
  ],
});

export const MrrByPlan = defineReport({
  name: 'billing_mrr_by_plan',
  label: 'MRR by Plan',
  type: 'summary',
  drilldown: true,
  dataset: 'billing_revenue',
  rows: ['plan'],
  values: ['mrr'],
});`,
    },
    sections: [
      {
        id: 'primitives',
        eyebrow: 'Reporting primitives',
        title: 'Answer finance’s question, then keep going',
        copy:
          'The analytics service compiles questions to the right strategy — pushed down to SQL where it can, computed in the runtime where it must.',
        items: [
          {
            title: 'Aggregations & grouping',
            body: '“MRR by plan” is the dataset’s sum over one dimension — sums, counts, averages, and breakdowns traverse relations through the query engine.',
          },
          {
            title: 'Time series',
            body: 'The renewal curve by month, ticket volume by week — time-zone-aware bucketing by day, week, or month on any date dimension.',
          },
          {
            title: 'Funnels',
            body: 'Trial → paid, request → approved → fulfilled — stage-to-stage conversion across status fields and processes.',
          },
          {
            title: 'Dashboards',
            body: 'The MRR chart, the active-subscriptions counter, and the churn table compose into one shareable dashboard next to the records they summarize.',
          },
          {
            title: 'Semantic datasets',
            body: 'Named measures and dimensions keep every team — and every AI answer — computing the same numbers.',
          },
        ],
      },
      {
        id: 'designer',
        eyebrow: 'The dashboard & report designers',
        title: 'Assembled by clicking, saved as metadata',
        copy:
          'Dashboards and reports open in designers in the open-source ObjectStack console — what you click together is stored as the same reviewable definitions an agent writes.',
        items: [
          {
            title: 'The dashboard designer',
            body: 'Click a widget on the grid canvas and an inspector opens for its title, chart type, and data binding; add new widgets from a picker of 10+ types — charts render live data while you design.',
          },
          {
            title: 'The report designer',
            body: 'Band-based layout — report header, detail, group and page footers — with text, field, chart, and table elements placed on the canvas and a preview toggle to check the output.',
          },
          {
            title: 'Drill down to the records',
            body: 'Reports built with drilldown enabled let a reviewer click the MRR number and land on the exact subscriptions behind it — permissions applied on the way down.',
          },
          {
            title: 'One dataset feeds them all',
            body: 'The designer binds widgets to datasets, not raw tables — so the dashboard, the report, and an AI answer stay on the same definition of “revenue”.',
          },
        ],
      },
      {
        id: 'governed',
        eyebrow: 'Governed by design',
        title: 'The report respects the same authority as the app',
        copy:
          'Because analytics runs inside the runtime, the permission model is not an afterthought — it is the execution path.',
        items: [
          {
            title: 'Permission-aware results',
            body: 'A regional manager’s dashboard aggregates only their region’s rows; masked fields never leak into a chart or an export.',
          },
          {
            title: 'Same rules for AI and people',
            body: 'AI Ask answers inside the same permissions as every dashboard, so a chat answer never shows more than the screen would.',
          },
          {
            title: 'No export drift',
            body: 'Reports read live objects instead of stale copies, so the number in the meeting is the number in the system.',
          },
        ],
      },
    ],
    table: {
      columns: ['Business need', 'AI writes', 'Runtime supplies'],
      rows: [
        ['MRR by plan and month', 'A dataset with measures and dimensions', 'Compiled queries, charts, and caching'],
        ['A new KPI card on the ops dashboard', 'Nothing — click it together in the designer', 'The widget inspector, live data, saved as metadata'],
        ['Pipeline conversion by stage', 'A summary report over the stage field', 'Stage-to-stage computation and trends'],
        ['Ask AI "how did Q3 close?"', 'Nothing new — the dataset is enough', 'The same governed numbers, in chat'],
      ],
    },
    checklistTitle: 'An analytics review should confirm',
    checklist: [
      'Key measures are defined once, in datasets, not per chart.',
      'Dashboards inherit row and field permissions.',
      'Time series use consistent time zones and calendars.',
      'AI answers resolve against the same definitions as reports.',
      'No pipeline exports data to a less-governed copy.',
    ],
    faqs: [
      {
        question: 'Does this replace our BI tool?',
        answer:
          'For operational reporting on business objects, you will not need a separate stack: dashboards, funnels, and time series run in the platform. For cross-system warehousing, ObjectOS coexists — federation and APIs make governed objects easy to consume.',
      },
      {
        question: 'Are the dashboard and report designers in the open-source ObjectStack?',
        answer:
          'Yes. The widget-based dashboard designer, the band-based report designer, drilldown, aggregations, time series, funnels, and semantic datasets are all part of the open-source ObjectStack runtime, with the same permission enforcement as the rest of the platform.',
      },
    ],
  } satisfies MarketingPage;

export default page;
