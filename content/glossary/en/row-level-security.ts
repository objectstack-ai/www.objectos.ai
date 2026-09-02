import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: 'Row-level security',
  title: 'Row-Level Security (RLS): Definition, How It Works, and How to Prove It Enforces',
  description:
    'Row-level security restricts which rows of a table a user may read or write by attaching a predicate to the table itself, so the filter runs inside the query instead of in the code that calls it.',
  definition:
    'Row-level security (RLS) is an access-control mechanism that restricts which rows of a table a given user may read or write by attaching a predicate to the table itself, so the restriction is applied inside the query rather than by the application code that issues it.',
  explanation: [
    'The idea is older than any AI platform and is worth stating in its original form. PostgreSQL has shipped it since 9.5: CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) attaches a condition to the table, and every subsequent SELECT — from the ORM, from a reporting tool, from a psql session someone opened at 2am — carries it. Salesforce reaches the same result through sharing rules and an ownership hierarchy. What both are buying is the property that makes RLS worth the trouble: the restriction travels with the data, so a new endpoint, a new export path, or a new caller inherits it without anyone remembering to add a WHERE clause. Access control that lives in the caller is a convention; access control that lives in the table is a boundary.',
    'ObjectStack expresses the same construct as authorable metadata. A permission set carries a rowLevelSecurity array whose entries name an object and an operation, then declare a predicate: using for the read side (SELECT, UPDATE, DELETE), check for the write side (INSERT, UPDATE), spelled as a constrained CEL expression such as owner_id == current_user.id or assigned_to_id in current_user.team_member_ids. The engine lowers each predicate into an ObjectQL filter and pushes it into the query, so the rows never enter process memory — which matters more than usual when the next hop is an AI model’s context window, because a row filtered after retrieval has already been read. Applicable policies OR-combine, so a user who qualifies under any policy is allowed; a policy whose context value resolves to null or an empty array drops out rather than widening; and a predicate the compiler cannot lower produces no filter at all, at which point the read path substitutes a deny sentinel and the object returns zero rows. The failure direction is closed, never open.',
    'That last case is the one a security reviewer should press on, because it is invisible from the metadata: a rule that reads as scoped access and behaves as a blanket refusal, with nothing at authoring time pointing at the responsible line. ObjectStack’s answer is a compile-time enforceability gate — validateRlsPredicateEnforceability runs over every declared using and check at build time and rejects, as an error, any predicate that would never enforce. What makes the gate trustworthy is that it does not model the runtime or pattern-match for it: it calls the runtime’s own decision procedure, isSupportedRlsExpression, on the same input the compiler consults, so "rejected by the linter" and "dropped with no enforcement" are the same boolean and cannot drift apart. This is the artifact to ask any platform for. Not "do you support row-level security" — everyone says yes. Ask whether the build can reject a security rule that would silently do nothing.',
  ],
  alsoKnownAs: ['RLS', 'record-level security', 'row-level access control', 'row filtering'],
  relatedTerms: ['permission-model', 'audit-trail', 'governed-runtime'],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'objectos-automation-engine',
  ],
  pageSlugs: ['permissions', 'trust-center', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
