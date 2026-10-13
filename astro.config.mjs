// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages（プロジェクトサイト）で公開するための設定。
// 独自ドメインに移行する場合は site を変更し、base を削除する。
export default defineConfig({
  site: 'https://comic-saitama.github.io',
  base: '/web_comisai',
  // 既存URL（/pages/services.html など）を維持するため .html で出力する
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
});
