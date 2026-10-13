// サイト全体で使う団体情報。連絡先などはここだけを書き換える。
export const site = {
  name: 'コミックさいたま（仮）準備会',
  fullName: 'むつめ祭同人即売会「コミックさいたま（仮）準備会」',
  copyrightHolder: 'コミックさいたま準備会',
  email: 'comic.saitadai@gmail.com',
  x: {
    handle: 'ComicSaidai',
    url: 'https://x.com/ComicSaidai',
  },
  // Google アナリティクス 4 の測定ID（例: 'G-XXXXXXXXXX'）。空文字の間はタグを出力しない。
  // 差し替えは issue #1 を参照。
  gaMeasurementId: '',
} as const;

// 画面表示用（スパム対策で @ を [at] に置き換える）
export const obfuscatedEmail = site.email.replace('@', '[at]');

// イベント情報。日程・会場・申込状況はここを書き換える。
export const event = {
  name: 'コミックさいたま',
  tagline: 'むつめ祭 同人誌即売会',
  /** 開催時期（日程が未定の間はこれを表示する） */
  period: '2027年度 むつめ祭',
  /** 開催日（YYYY-MM-DD）。未定の間は空にしておく。例: ['2027-11-27', '2027-11-28'] */
  dates: [] as string[],
  venue: '埼玉大学（むつめ祭会場内）',
  venueNote: '会場の詳細は決定し次第お知らせします',
  /** サークル参加申込 */
  entry: {
    /**
     * 'upcoming' … 受付前（メーリングリストへ誘導）
     * 'open'     … 受付中（formUrl と deadline を必ず設定）
     * 'closed'   … 受付終了
     */
    status: 'upcoming' as 'upcoming' | 'open' | 'closed',
    /** 申込フォームのURL（Googleフォームなど） */
    formUrl: '',
    /** 申込締切日（YYYY-MM-DD、この日の23:59まで） */
    deadline: '',
  },
};

// Googleフォーム（別タブで開く）
export const forms = {
  mailingList: 'https://docs.google.com/forms/d/e/1FAIpQLSeD2Nd0S8iunS9BJnJxT49mUz4mOIA3MrH_DIeC6cKQBIM99w/viewform',
  staff: 'https://docs.google.com/forms/d/e/1FAIpQLScuGxYh-rDsL_Ho6wAsP4RaIqTMBAp8vSroTdMOuYsddU9vSw/viewform',
} as const;
