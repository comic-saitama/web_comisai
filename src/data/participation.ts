// 参加詳細（募集要項・日程・頒布物のルール）。決まった項目から value を埋める。
// value が空文字の項目は「未定」と表示する。改行したいときは \n を入れる。
//
// published が false の間は、参加詳細ページの「募集要項」欄は npm run dev でだけ下書きとして表示され、
// 公開サイトには出ない。内容を準備会で確認したら true にして公開する（issue #14）。
//
// tentative: true の項目は「仮」（たたき台）。準備会で確定したら tentative の行を消す。
// tentative の項目が残ったまま published: true にするとビルドが失敗する（仮の内容を公開しないため）。
// たたき台の根拠: docs/participation-rules-research.md

export type Item = {
  label: string;
  value: string;
  /** 補足（小さく表示） */
  note?: string;
  /** 仮の内容（たたき台）。確定したら消す */
  tentative?: boolean;
};

export const participation = {
  published: false,

  /** スケジュール（時期・日付は自由な書き方でよい。例: '2027年5月10日(月)'、'2027年6月上旬'） */
  schedule: [
    { label: 'サークル参加申込 開始', value: '開催の約4か月前', note: 'むつめ祭の日程が出たら日付にする', tentative: true },
    { label: 'サークル参加申込 締切', value: '開催の約2か月前', tentative: true },
    { label: '抽選結果の通知（応募多数の場合）', value: '締切から2週間以内に、代表者のメールアドレスへ通知', tentative: true },
    { label: '頒布物概要の提出・審査（むつめ祭実行委員会）', value: '申込締切後〜開催の1か月前', note: 'むつめ祭常任委員会の審査日程に合わせる', tentative: true },
    { label: '搬入', value: '各開催日 9:00〜9:45', tentative: true },
    { label: '開催', value: 'むつめ祭の全日程（3日間）\n各日 10:00〜17:00', note: '2027年度 むつめ祭期間中', tentative: true },
    { label: '搬出', value: '各開催日 17:00〜18:00', tentative: true },
  ] satisfies Item[],

  /** サークル参加の募集要項 */
  circle: [
    { label: '参加資格', value: '代表者が埼玉大学の学生または教職員であること\n個人・サークルを問いません（1人での参加も歓迎）', note: '学外の方は委託参加をご利用ください', tentative: true },
    { label: '参加日', value: '1日単位で申込（複数日の参加も可）', tentative: true },
    { label: '募集数', value: '各日 20スペース', note: '応募多数の場合は抽選', tentative: true },
    { label: '参加費', value: '1スペース 500円（1日あたり）', tentative: true },
    { label: '1スペースの設備', value: '机 半分（約90cm × 45cm）・椅子 1脚', tentative: true },
    { label: '1サークルの参加人数', value: '1スペースあたり 2名まで', tentative: true },
    { label: '申込方法', value: '申込フォームから（受付開始時にこのページとお知らせでご案内します）' },
  ] satisfies Item[],

  /** 委託参加の募集要項 */
  consignment: [
    { label: '委託の条件', value: '当日参加が難しい学内のサークル・個人、および学外の方\n頒布物は事前審査を通過したものに限ります', tentative: true },
    { label: '委託手数料', value: '売上の10%', tentative: true },
    { label: '納品の方法・期限', value: '開催の1週間前までに、準備会へ手渡しまたは郵送（送料は出品者負担）', tentative: true },
    { label: '売上金・在庫の返却', value: '開催後2週間以内に、売上金（手数料を差し引いた額）と在庫を返却', tentative: true },
  ] satisfies Item[],

  /** 頒布物のルール */
  guidelines: [
    { label: '頒布できるもの', value: '自主制作物（マンガ・イラスト・小説・評論・写真・工作物など）', note: 'ジャンルは問いません' },
    {
      label: '禁止事項',
      value: '成人向けの内容を含むもの\nわいせつな内容を含むもの\n他人の著作物の無断転載・トレース\n実在の人物・団体を傷つける内容\n食品・飲料・酒類、化粧品類、生き物、金券類、ライターなどの危険物',
      tentative: true,
    },
    { label: '成人向け頒布物', value: '頒布できません（一般公開の学園祭のため）', tentative: true },
    { label: '二次創作', value: '頒布できます。公式の二次創作ガイドラインがある作品は、それに従ってください\n原作の画像・文章の転載やトレース、公式と誤認させる表示は禁止です', tentative: true },
    { label: '生成AIを使った作品', value: '生成AIの出力が主体の作品は頒布できません（下書き・補助的な利用は可）', tentative: true },
    { label: '価格表示・お釣り', value: '有償頒布できます。価格を見やすく表示してください\nお釣りは各サークルでご用意ください', note: '売上の扱いはむつめ祭のルールに従います', tentative: true },
  ] satisfies Item[],
};

/** 仮（tentative）のまま残っている項目のラベル一覧 */
export function tentativeItems(): string[] {
  const { schedule, circle, consignment, guidelines } = participation;
  const all: Item[] = [...schedule, ...circle, ...consignment, ...guidelines];
  return all.filter((item) => item.tentative).map((item) => item.label);
}
