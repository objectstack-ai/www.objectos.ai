import type { GlossaryTerm } from '../../../src/glossary/types';

const term = {
  slug: 'row-level-security',
  term: '行レベルセキュリティ',
  title: '行レベルセキュリティ（RLS）とは：定義、仕組み、そして本当に効いていることを証明する方法',
  description:
    '行レベルセキュリティは、テーブルそのものに述語を付けることでユーザーが読み書きできる行を制限し、フィルタを呼び出し側のコードではなくクエリの内部で実行させる仕組みである。',
  definition:
    '行レベルセキュリティ（RLS）とは、テーブルそのものに述語を付けることで、あるユーザーが読み取り・書き込みできる行を制限するアクセス制御の仕組みであり、その制限はクエリを発行するアプリケーションコードではなく、クエリの内部で適用される。',
  explanation: [
    'この考え方はどの AI プラットフォームよりも古く、まずは本来の形で述べておく価値がある。PostgreSQL は 9.5 からこれを備えている。CREATE POLICY tenant_isolation ON accounts FOR SELECT USING (tenant_id = current_setting(\'app.current_tenant_id\')) はテーブルに条件を付け、以後のあらゆる SELECT——ORM から、レポーティングツールから、誰かが午前 2 時に開いた psql セッションから——がその条件を伴って実行される。Salesforce は共有ルールと所有者階層によって同じ結果にたどり着く。両者が手に入れているのは、RLS を手間をかけて導入するだけの価値がある理由そのものである性質だ。制限がデータと一緒に移動するので、新しいエンドポイントも、新しいエクスポート経路も、新しい呼び出し元も、誰かが WHERE 句を書き足すのを覚えていなくてもそれを継承する。呼び出し側にあるアクセス制御は慣習にすぎない。テーブルにあるアクセス制御こそが境界である。',
    'ObjectStack は同じ構造を、記述可能なメタデータとして表現する。権限セットは rowLevelSecurity 配列を持ち、各エントリはオブジェクトと操作を指定したうえで述語を宣言する。読み取り側（SELECT、UPDATE、DELETE）には using、書き込み側（INSERT、UPDATE）には check を使い、owner_id == current_user.id や assigned_to_id in current_user.team_member_ids のような制約付きの CEL 式で書く。エンジンは各述語を ObjectQL フィルタへ変換してクエリに押し込むため、対象外の行はそもそもプロセスのメモリに入らない。次の行き先が AI モデルのコンテキストウィンドウである場合、これは普段以上に重要になる。取得した後でフィルタされた行は、すでに読まれてしまっているからだ。適用されるポリシー同士は OR で結合されるため、いずれかのポリシーの条件を満たすユーザーは許可される。参照するコンテキスト値が null や空配列に解決されたポリシーは、範囲を広げるのではなく脱落する。そしてコンパイラが変換できない述語はフィルタを一切生成せず、その時点で読み取り経路は拒否センチネルに置き換えられ、そのオブジェクトは 0 行を返す。失敗の方向は常にクローズであり、決してオープンにはならない。',
    'セキュリティレビュアーが追及すべきは、この最後のケースだ。メタデータを見ても分からないからである。読めば範囲を絞ったアクセスに見えるのに、実際には全面的な拒否として振る舞うルールがあり、しかも記述時点では原因の行を指し示すものが何もない。ObjectStack の答えは、コンパイル時の強制可能性ゲートである。validateRlsPredicateEnforceability はビルド時に宣言されたすべての using と check を走査し、決して強制されることのない述語をエラーとして拒否する。このゲートが信頼できるのは、ランタイムをモデル化したりパターンマッチで推し量ったりしないからだ。コンパイラが参照するのと同じ入力に対して、ランタイム自身の判定手続きである isSupportedRlsExpression を呼び出す。そのため「リンターに拒否された」と「強制されないまま脱落した」は同じ真偽値であり、両者がずれることはありえない。どのプラットフォームにも求めるべき成果物はこれである。「行レベルセキュリティに対応していますか」と聞くのではない——誰もが「はい」と答える。聞くべきは、黙って何もしないセキュリティルールをビルドが拒否できるかどうかだ。',
  ],
  alsoKnownAs: ['RLS', 'Row-Level Security', 'レコードレベルセキュリティ', '行レベルアクセス制御', '行フィルタリング', '行レベル権限'],
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
