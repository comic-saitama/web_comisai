// 下書きページの表示制御。
// 開発サーバー（npm run dev）でだけ true になり、本番ビルド（GitHub Pages）には下書きもリンクも出力されない。
export const showDrafts = import.meta.env.DEV;
