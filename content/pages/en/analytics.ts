import type { MarketingPage } from '../../../src/content-pages/types';

const page = {
    slug: 'analytics',
    navLabel: 'Analytics & reporting',
    title: 'ObjectOS Analytics: Dashboards and Reports over Governed Objects',
    description:
      'Aggregations, time series, funnels, and dashboards over the same governed objects the app runs on — permission-aware by construction, with no separate BI stack to wire up.',
    eyebrow: 'Analytics & reporting',
    heroTitle: 'Answers from the system of record — not a second data stack.',
    lead:
      'Operational reporting usually means exporting data into a BI tool, where permissions, definitions, and freshness quietly drift. ObjectOS runs analytics over the governed objects themselves, so the numbers, the rules, and the data are the same ones the application uses.',
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
        'A semantic cube names the measures and dimensions a business cares about. Dashboards, reports, and AI questions all resolve against the same definition, so "monthly recurring revenue" means one thing.',
      code: `defineCube('Revenue', {
  object: 'Subscription',
  measures: {
    mrr: sum('mrr'),
    activeCustomers: countDistinct('customer'),
  },
  dimensions: {
    plan: field('plan'),
    month: time('renewsAt', 'month'),
    region: field('customer.region'),
  },
});`,
    },
    sections: [
      {
        id: 'primitives',
        eyebrow: 'Reporting primitives',
        title: 'From a quick count to a funnel, without leaving the platform',
        copy:
          'The analytics service compiles questions to the right strategy — pushed down to SQL where it can, computed in the runtime where it must.',
        items: [
          {
            title: 'Aggregations & grouping',
            body: 'Sums, counts, averages, and breakdowns over any object, with relations traversed by the query engine.',
          },
          {
            title: 'Time series',
            body: 'Trends by day, week, or month with time-zone-aware bucketing — renewal curves, ticket volume, pipeline over time.',
          },
          {
            title: 'Funnels',
            body: 'Stage-to-stage conversion across status fields and processes: lead → qualified → won, request → approved → fulfilled.',
          },
          {
            title: 'Dashboards',
            body: 'Charts and counters compose into shareable dashboards that live next to the records they summarize.',
          },
          {
            title: 'Semantic cubes',
            body: 'Named measures and dimensions keep every team — and every AI answer — computing the same numbers.',
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
            title: 'One definition for AI and people',
            body: 'AI Ask resolves questions against the same cubes and permissions, so a chat answer matches the dashboard.',
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
        ['MRR by plan and month', 'A cube with measures and dimensions', 'Compiled queries, charts, and caching'],
        ['A support SLA dashboard', 'Dashboard and widget definitions', 'Live rendering with permission-filtered rows'],
        ['Pipeline conversion by stage', 'A funnel over the status field', 'Stage-to-stage computation and trends'],
        ['Ask AI "how did Q3 close?"', 'Nothing new — the cube is enough', 'The same governed numbers, in chat'],
      ],
    },
    checklistTitle: 'An analytics review should confirm',
    checklist: [
      'Key measures are defined once, in cubes, not per chart.',
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
        question: 'Is analytics in the open-source edition?',
        answer:
          'Yes. Aggregations, time series, funnels, dashboards, and semantic cubes are part of the open-source runtime, with the same permission enforcement as the rest of the platform.',
      },
    ],
  } satisfies MarketingPage;

export default page;
