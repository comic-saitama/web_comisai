// ビルド結果（dist/）に含まれる外部リンク（https://〜）が生きているかを確認する。
// 週1回 GitHub Actions（.github/workflows/link-check.yml）で実行し、切れていたら issue を作る。
// 手元で試すとき: npm run build のあと node scripts/check-external-links.mjs
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE_ORIGIN = 'https://comic-saitama.github.io';
const TIMEOUT_MS = 15_000;

// ボット対策でアクセスを拒否するため、自動では確認できないホスト（手で確認する）
const SKIP_HOSTS = ['x.com', 'twitter.com'];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** URL → そのURLを含むページの一覧 */
const links = new Map();
for (const file of await walk(DIST)) {
  const html = await readFile(file, 'utf8');
  const page = file.slice(DIST.length).split(sep).join('/');
  for (const m of html.matchAll(/\s(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replaceAll('&amp;', '&');
    if (url.startsWith(SITE_ORIGIN)) continue; // 自サイト（canonical・OGP など）
    if (!links.has(url)) links.set(url, new Set());
    links.get(url).add(page);
  }
}

async function check(url) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (SKIP_HOSTS.includes(host)) return { url, status: 'skip' };
  const attempt = async (method) => {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; comic-saitama-link-check)' },
    });
    return res.status;
  };
  try {
    let status = await attempt('HEAD');
    // HEAD に対応していないサーバーがあるので GET でもう一度確認する
    if (status >= 400) status = await attempt('GET');
    return { url, status };
  } catch (e) {
    return { url, status: 'error', detail: e.cause?.code ?? e.name };
  }
}

const results = [];
for (const url of links.keys()) results.push(await check(url));

const broken = results.filter((r) => r.status === 'error' || (typeof r.status === 'number' && r.status >= 400));
const skipped = results.filter((r) => r.status === 'skip');

console.log(`外部リンク ${results.length} 件を確認（自動確認できないもの ${skipped.length} 件はスキップ）`);
for (const r of results) console.log(`  ${String(r.status).padEnd(5)} ${r.url}`);

if (broken.length > 0) {
  const lines = [
    `公開サイトの外部リンクのうち **${broken.length} 件** にアクセスできませんでした（${new Date().toISOString().slice(0, 10)} の自動チェック）。`,
    '',
    '| 状態 | URL | 載っているページ |',
    '|---|---|---|',
    ...broken.map((r) => `| ${r.status}${r.detail ? ` (${r.detail})` : ''} | ${r.url} | ${[...links.get(r.url)].join('<br>')} |`),
    '',
    '一時的な不調のこともあるので、ブラウザで開いて確認してください。本当に切れていたら、リンク先を直す PR を出してください（Google フォームを作り直した場合は `src/data/site.ts` の `forms`）。',
  ];
  await writeFile('broken-links.md', lines.join('\n'));
  console.error(`\nリンク切れ: ${broken.length} 件`);
  process.exit(1);
}
console.log('\nリンク切れはありません');
