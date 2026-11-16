import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'semantic-layer',
  term: '시맨틱 레이어',
  title: '시맨틱 레이어란: 정의, 그리고 시맨틱 레이어만으로 충분한 경우',
  description:
    '시맨틱 레이어는 지표, 차원, 엔티티 이름 같은 비즈니스 정의를 원시 저장소와 쿼리 도구 사이에 두고 관리해, 하나의 용어가 어디서든 합의된 하나의 계산으로 해석되게 합니다.',
  definition:
    '시맨틱 레이어는 지표, 차원, 엔티티 이름 같은 거버넌스가 적용된 비즈니스 정의의 집합을 원시 데이터 저장소와 이를 조회하는 도구 사이에 두어, "활성 고객"이나 "순매출"이 누가 묻든 어떤 도구에서 묻든 합의된 하나의 계산으로 해석되게 하는 계층입니다.',
  explanation: [
    '이 용어의 본고장은 분석 영역입니다. dbt의 Semantic Layer, Cube, AtScale, Looker의 LookML은 모두 같은 문제를 풉니다. 모든 대시보드와 노트북, 스프레드시트가 저마다의 SQL로 "매출"을 다시 도출하다 보니 숫자가 서로 맞지 않게 된 것입니다. 지표를 웨어하우스 위, 도구 아래에서 한 번만 정의하면, 공유되는 산출물이 쿼리가 아니라 정의 자체가 됩니다. 2026년부터는 같은 단어가 에이전틱 AI 아래에 놓이는 비즈니스 정의 계층을 가리키는 데도 쓰이고 있습니다. Fabric과 Foundry가 쓰는 의미가 바로 이것입니다. 그래서 이 표현은 이제 말하는 사람에 따라 서로 다른 두 범위를 뜻하며, 어느 쪽을 말하는지 먼저 밝혀 둘 필요가 있습니다.',
    '상당히 넓은 범위의 작업에서 시맨틱 레이어는 실제로 옳고 충분한 도구이며, 이 점은 얼버무리지 말고 분명히 말해 둘 만합니다. 재무팀과 영업팀이 서로 다른 매출 수치를 인용하거나, 셀프서비스 분석이 서로 모순되는 대시보드를 만들어 내거나, AI 어시스턴트가 웨어하우스 위에서 일관되게 질문에 답해야 하는 것이 문제라면, 그 웨어하우스 위의 지표 레이어가 문제를 해결합니다. 그 밑에 애플리케이션 플랫폼을 덧붙이는 것은 아무도 묻지 않은 질문에 답하는 일입니다. 시맨틱 레이어는 약한 온톨로지가 아니라 다른 도구이며, 분석적인 질문에서는 더 나은 도구입니다.',
    '시맨틱 레이어가 담지 않는 것은 쓰기 쪽입니다. 시맨틱 레이어는 읽기 계약입니다. 숫자가 무엇을 뜻하는지는 정해 주지만, 누가 그 밑의 레코드를 바꿀 수 있는지, 애초에 어떤 작업이 존재하는지, 변경에 승인이 필요한지, 변경 뒤에 어떤 증거가 남는지는 정하지 않습니다. ObjectStack은 그 선의 반대편에 있습니다. 객체를 정의하는 타입 애플리케이션 메타데이터가 그 객체의 권한, 액션, 승인 단계까지 함께 선언하고, 런타임은 모든 호출에서 이 모두를 강제합니다. 그래서 정의는 읽기를 기술하는 데 그치지 않고 쓰기를 통제합니다. ObjectStack은 웨어하우스의 시맨틱 레이어를 대체하지 않으며, 본격적으로 BI를 하는 회사라면 여전히 시맨틱 레이어가 필요할 것입니다.',
  ],
  alsoKnownAs: ['의미 계층', '시맨틱 계층', 'Semantic Layer', '비즈니스 시맨틱 레이어', '지표 레이어', '메트릭 레이어', 'headless BI'],
  relatedTerms: [
    'ontology',
    'knowledge-graph',
    'object-type-and-action-type',
    'application-metadata',
    'definition-layer',
    'governed-runtime',
  ],
  articleSlugs: [
    'ontology-vs-semantic-layer-vs-knowledge-graph',
    'why-ai-agent-pilots-fail-four-layers',
    'enterprise-ontology-race-open-vs-closed',
    'context-bottleneck-read-half',
    'ai-ontology-open-protocol',
  ],
  pageSlugs: ['analytics', 'data-modeling', 'platform'],
} satisfies GlossaryTerm;

export default term;
