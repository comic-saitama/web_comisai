// 参加詳細（募集要項・日程・頒布物のルール）。決まった項目から value を埋める。
// value が空文字の項目は「未定」と表示する。改行したいときは \n を入れる。
//
// published が false の間は、参加詳細ページの「募集要項」欄は npm run dev でだけ下書きとして表示され、
// 公開サイトには出ない。内容を準備会で確認したら true にして公開する（issue #14）。

export type Item = {
  label: string;
  value: string;
  /** 補足（小さく表示） */
  note?: string;
};

export const participation = {
  published: false,

  /** スケジュール（時期・日付は自由な書き方でよい。例: '2027年5月10日(月)'、'2027年6月上旬'） */
  schedule: [
    { label: 'サークル参加申込 開始', value: '' },
    { label: 'サークル参加申込 締切', value: '' },
    { label: '抽選結果の通知（応募多数の場合）', value: '' },
    { label: '頒布物概要の提出・審査（むつめ祭実行委員会）', value: '' },
    { label: '搬入', value: '' },
    { label: '開催', value: '', note: '2027年度 むつめ祭期間中' },
    { label: '搬出', value: '' },
  ] satisfies Item[],

  /** サークル参加の募集要項 */
  circle: [
    { label: '参加資格', value: '' },
    { label: '募集数', value: '' },
    { label: '参加費', value: '' },
    { label: '1スペースの設備', value: '', note: '机・椅子のサイズと数など' },
    { label: '1サークルの参加人数', value: '' },
    { label: '申込方法', value: '申込フォームから（受付開始時にこのページとお知らせでご案内します）' },
  ] satisfies Item[],

  /** 委託参加の募集要項 */
  consignment: [
    { label: '委託の条件', value: '' },
    { label: '委託手数料', value: '' },
    { label: '納品の方法・期限', value: '' },
    { label: '売上金・在庫の返却', value: '' },
  ] satisfies Item[],

  /** 頒布物のルール */
  guidelines: [
    { label: '頒布できるもの', value: '自主制作物（マンガ・イラスト・小説・評論・写真・工作物など）', note: 'ジャンルは問いません' },
    { label: '禁止事項', value: '' },
    { label: '成人向け頒布物', value: '' },
    { label: '二次創作', value: '' },
    { label: '価格表示・お釣り', value: '' },
  ] satisfies Item[],
};
