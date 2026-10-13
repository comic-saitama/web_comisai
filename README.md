# コミックさいたま（仮）準備会 公式サイト

むつめ祭同人即売会「コミックさいたま（仮）準備会」の公式サイトです。
[Astro](https://astro.build/) で作成し、GitHub Pages で公開しています。

- 公開URL: https://comic-saitama.github.io/web_comisai/

## よくある更新

### お知らせを追加する

`src/content/news/` に Markdown ファイルを1つ追加します（GitHub の画面上で作成できます）。
`example.md` をコピーして使ってください。

```markdown
---
title: サークル参加申込の受付を開始しました
date: 2026-10-20
---

本文を書きます。
```

追加したお知らせは、トップページに新しい順で表示されます。`draft: true` を付けると表示されません。

### 連絡先・X アカウント・GA 測定IDを変える

`src/data/site.ts` を書き換えます。全ページのヘッダー・フッター・本文に反映されます。

### ページの文章を変える

| ページ | ファイル |
|---|---|
| トップ | `src/pages/index.astro` |
| 参加詳細 | `src/pages/pages/services.astro` |
| スタッフ募集 | `src/pages/pages/recruit.astro` |
| お問い合わせ | `src/pages/pages/contact.astro` |

サイト内リンクは `url('/pages/recruit.html')` のように書きます（公開先のパス `/web_comisai` が自動で付きます）。

## 公開の流れ

1. ブランチを作って変更し、Pull Request を出す
2. GitHub Actions でビルド（型チェック含む）が実行される。失敗したら修正する
3. もう1人が確認して `main` にマージすると、自動で GitHub Pages に公開される

## 手元で確認する

Node.js 22.12 以上が必要です。

```bash
npm install
npm run dev      # http://localhost:4321/web_comisai/ で確認
npm run build    # dist/ に公開用ファイルを出力
```

## ディレクトリ構成

```
src/
├─ data/site.ts            団体名・連絡先・SNS・GA測定ID
├─ layouts/BaseLayout.astro   <head>（OGP・GA）とヘッダー・フッターの共通枠
├─ components/             Header / Footer / NewsList など
├─ content/news/           お知らせ（1件1ファイル）
├─ pages/                  各ページ（URL と対応）
└─ styles/style.css        スタイル
public/assets/images/      ロゴ・favicon・OGP画像
.github/workflows/deploy.yml  ビルドと公開
```
