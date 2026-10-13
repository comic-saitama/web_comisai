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
