import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: '행 수준 보안',
  title: '행 수준 보안(RLS)이란: 정의, 작동 방식, 그리고 실제로 적용되는지 증명하는 법',
  description:
    '행 수준 보안은 테이블 자체에 술어를 붙여 사용자가 읽거나 쓸 수 있는 행을 제한하므로, 필터가 호출하는 코드가 아니라 쿼리 안에서 실행됩니다.',
  definition:
    '행 수준 보안(RLS)은 테이블 자체에 술어(predicate)를 붙여 특정 사용자가 읽거나 쓸 수 있는 행을 제한하는 접근 제어 메커니즘으로, 이 제한은 쿼리를 보내는 애플리케이션 코드가 아니라 쿼리 내부에서 적용됩니다.',
  explanation: [
    '이 개념은 어떤 AI 플랫폼보다도 오래되었으니, 먼저 원래 모습 그대로 짚어 둘 만합니다. PostgreSQL은 9.5부터 이 기능을 제공해 왔습니다. CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\'))는 테이블에 조건 하나를 붙이고, 그 뒤의 모든 SELECT — ORM에서 오든, 리포팅 도구에서 오든, 누군가 새벽 2시에 연 psql 세션에서 오든 — 가 그 조건을 달고 실행됩니다. Salesforce는 공유 규칙과 소유권 계층으로 같은 결과에 도달합니다. 둘이 얻는 것은 RLS를 들일 가치가 있게 만드는 바로 그 성질입니다. 제한이 데이터와 함께 움직이므로, 새 엔드포인트나 새 내보내기 경로, 새 호출자가 생겨도 누군가 WHERE 절을 기억해서 덧붙이지 않아도 그 제한을 그대로 물려받습니다. 호출자 쪽에 있는 접근 제어는 관례이고, 테이블에 있는 접근 제어는 경계입니다.',
    'ObjectStack은 같은 구조를 작성 가능한 메타데이터로 표현합니다. 권한 집합(permission set)은 rowLevelSecurity 배열을 가지며, 각 항목은 객체와 작업을 지정한 뒤 술어를 선언합니다. 읽기 측(SELECT, UPDATE, DELETE)은 using, 쓰기 측(INSERT, UPDATE)은 check이며, owner_id == current_user.id나 assigned_to_id in current_user.team_member_ids 같은 제약된 CEL 식으로 씁니다. 엔진은 각 술어를 ObjectQL 필터로 낮춰 쿼리 안으로 밀어 넣으므로, 해당 행은 아예 프로세스 메모리에 들어오지 않습니다. 다음 단계가 AI 모델의 컨텍스트 윈도일 때 이 점은 평소보다 더 중요합니다. 조회한 뒤에 걸러 낸 행은 이미 읽힌 행이기 때문입니다. 적용되는 정책들은 OR로 결합되어 어느 한 정책이라도 충족하는 사용자는 허용됩니다. 참조하는 컨텍스트 값이 null이나 빈 배열로 해석되는 정책은 범위를 넓히는 대신 빠지며, 컴파일러가 낮출 수 없는 술어는 필터를 전혀 만들지 않습니다. 이때 읽기 경로는 거부 센티널(deny sentinel)로 대체되어 해당 객체는 0행을 반환합니다. 실패 방향은 언제나 닫힘이며, 결코 열림이 아닙니다.',
    '보안 리뷰어가 파고들어야 할 것은 바로 이 마지막 경우입니다. 메타데이터만 봐서는 보이지 않기 때문입니다. 읽기에는 범위가 지정된 접근처럼 보이지만 실제로는 전면 거부로 동작하는 규칙이 생기는데, 작성 시점에는 책임이 있는 그 줄을 가리키는 것이 아무것도 없습니다. ObjectStack의 답은 컴파일 타임 적용 가능성 게이트입니다. validateRlsPredicateEnforceability는 빌드 시점에 선언된 모든 using과 check를 검사하여, 결코 적용되지 않을 술어를 오류로 거부합니다. 이 게이트를 신뢰할 수 있는 이유는 런타임을 모델링하거나 패턴 매칭으로 흉내 내지 않는다는 데 있습니다. 컴파일러가 참조하는 것과 같은 입력으로 런타임 자신의 판정 절차인 isSupportedRlsExpression을 호출하므로, "린터가 거부함"과 "적용 없이 버려짐"은 같은 불리언 값이며 서로 어긋날 수 없습니다. 어떤 플랫폼에든 요구해야 할 산출물이 바로 이것입니다. "행 수준 보안을 지원하나요?"라고 묻지 마십시오. 누구나 지원한다고 답합니다. 조용히 아무 일도 하지 않을 보안 규칙을 빌드가 거부할 수 있는지를 물어야 합니다.',
  ],
  alsoKnownAs: ['RLS', '로우 레벨 보안', 'Row-Level Security', '레코드 수준 보안', '행 단위 보안', '행 수준 접근 제어', '행 필터링'],
  relatedTerms: [
    'permission-model',
    'audit-trail',
    'governed-runtime',
    'declared-vs-enforced',
    'governed-tool-layer',
  ],
  articleSlugs: [
    'objectos-agent-permission-boundaries',
    'ai-agent-business-data-security-boundaries',
    'objectos-automation-engine',
  ],
  pageSlugs: ['permissions', 'trust-center', 'data-modeling'],
} satisfies GlossaryTerm;

export default term;
