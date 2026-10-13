# コミックさいたま準備会 公式サイト

むつめ祭同人即売会「コミックさいたま準備会」の公式サイトです。
[Astro](https://astro.build/) で作成し、GitHub Pages で公開しています。

- 公開URL: https://comic-saitama.github.io/web_comisai/
- 要件定義・残タスク: [docs/requirements.md](docs/requirements.md)
- 参加資格・頒布物ルールの調査: [docs/participation-rules-research.md](docs/participation-rules-research.md)

## よくある更新

### お知らせを追加する

`src/content/news/` に Markdown ファイルを1つ追加します（GitHub の画面上で作成できます）。
[docs/news-template.md](docs/news-template.md) をコピーして使ってください。

```markdown
---
title: サークル参加申込の受付を開始しました
date: 2026-10-20
---

本文を書きます。
```

追加したお知らせは、トップページに新しい順で表示されます。`draft: true` を付けると公開サイトには出ず、`npm run dev` でだけ「下書き」として表示されます（内容を確認してから `draft: false` にして公開）。

### 開催日・会場・申込状況を変える

`src/data/site.ts` の `event` を書き換えると、トップページの告知欄と申込状況の帯が切り替わります。

- 開催日が未定の間は `event.dates` を空（`[]`）にしておくと、`event.period`（例: 2027年度 むつめ祭）と「日程は決定し次第お知らせします」が表示されます。決まったら `dates: ['2027-11-27', '2027-11-28']` のように日付を入れてください。

| `event.entry.status` | 表示 |
|---|---|
| `'upcoming'` | 「募集要項は準備中」＋メーリングリスト登録への案内 |
| `'open'` | 「受付中！締切 ○月○日（あと○日）」＋申込ボタン。`formUrl` と `deadline` を必ず設定する |
| `'closed'` | 「受付は終了しました」 |

「あと○日」は閲覧した時点で計算されるので、日付が変わるたびに更新する必要はありません。

### 連絡先・X アカウント・GA 測定IDを変える

`src/data/site.ts` を書き換えます。全ページのヘッダー・フッター・本文に反映されます。

### 参加詳細（募集要項・日程）を埋める

`src/data/participation.ts` の各項目の `value` を、決まったものから埋めます。空の項目は「未定」と表示されます。

- `published: false` の間は、参加詳細ページの募集要項欄は `npm run dev` でだけ下書きとして表示されます
- 内容を準備会で確認したら `published: true` にすると公開されます（issue #14）

### Discord サーバーを表示する

サーバーの作り方（チャンネル構成・ロール・ルール文案・招待リンクの作り方）は [docs/discord-setup.md](docs/discord-setup.md) を参照してください。


`src/data/site.ts` の `discord.inviteUrl` に招待URLを入れると、「最新情報を受け取る」欄（トップ・参加詳細）とフッターに Discord が表示されます。空の間は表示されません。

- 招待リンクは Discord の「招待を作成」→「招待リンクを編集」で **有効期限: 無期限 / 最大使用回数: 無制限** にしてから発行してください（既定の7日で切れるとサイトのリンクが使えなくなります）。

### ページの文章を変える

| ページ | ファイル |
|---|---|
| トップ | `src/pages/index.astro` |
| 参加詳細 | `src/pages/pages/services.astro` |
| スタッフ募集 | `src/pages/pages/recruit.astro` |
| お問い合わせ | `src/pages/pages/contact.astro` |

サイト内リンクは `url('/pages/recruit.html')` のように書きます（公開先のパス `/web_comisai` が自動で付きます）。

## ブラウザだけで確認・編集する（GitHub Codespaces）

Node.js をインストールしなくても、ブラウザ上で開発サーバーを動かして下書きを確認できます。

1. GitHub のリポジトリページで「Code」→「Codespaces」→「Create codespace on main」
2. 初回は準備に数分かかります。終わると自動で `npm run dev` が起動します
3. 右下に出る「ブラウザーで開く」（または「ポート」タブの 4321）を開き、URL の末尾に **`/web_comisai`** を付けて表示します
   - そのままのURL（`/`）では「ページが見つかりません」になります
4. ファイルを編集・保存すると、プレビューにすぐ反映されます。変更はブランチを作ってコミットし、PR を出してください

使い終わったら、GitHub の「Your codespaces」から停止または削除してください（無料枠を消費します）。

## 下書きページを確認する

`src/drafts/` に置いたページは、開発サーバー（`npm run dev`）でだけ表示され、公開サイトには出力されません（リンクも出ません）。

- 個人情報の取り扱い（下書き）: http://localhost:4321/web_comisai/pages/policy.html
- 参加詳細の募集要項欄（下書き）: http://localhost:4321/web_comisai/pages/services.html
- お知らせの下書き（`draft: true`）: トップページの「お知らせ」

公開するときは、下書きを `src/pages/pages/` に移して `src/pages/pages/[draft].astro` の一覧から外し、`showDrafts` で隠しているリンクを常に表示するように変えます。

## 更新の依頼（issue テンプレート）

コードを触らずに更新を頼みたいときは、GitHub の「Issues」→「New issue」から次のテンプレートを選んで書き込みます。

- **お知らせを追加したい**：タイトル・掲載日・本文・急ぎ具合
- **文言・情報を直したい**：ページ・今の文言・直したあとの文言・理由
- **表示がおかしい・リンクが切れている**：URL・何が起きたか・端末

## 公開の流れ

1. ブランチを作って変更し、Pull Request を出す
2. GitHub Actions でビルド（型チェック・リンク切れチェック含む）が実行される。失敗したら修正する
3. ビルドが成功したら `main` にマージする。自動で GitHub Pages に公開される

- **他のメンバーによる確認は推奨（必須ではない）**です。文章の誤字や日程・連絡先など、公開して困る内容を変えたときは、できるだけ誰かに見てもらってからマージしてください。
- `main` はブランチ保護されています。直接 push はできず、ビルドが成功しない PR はマージできません（管理者も同様）。
- GitHub の画面でファイルを編集したときは、「Commit directly to the `main` branch」ではなく「Create a new branch for this commit and start a pull request」を選んでください。

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
