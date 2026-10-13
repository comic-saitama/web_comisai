// ビルド結果（dist/）のサイト内リンク切れを検出する。
// href / src / srcset に書かれた base（/web_comisai/）配下のURLが、
// dist/ 内のファイルとして存在するか、#アンカーがリンク先にあるかを確認する。
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname, posix, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = '/web_comisai/';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

const htmlFiles = (await walk(DIST)).filter((f) => f.endsWith('.html'));
const idsByFile = new Map();
const pages = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  pages.set(file, html);
  idsByFile.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

/** サイト内URL → dist 内のファイルパス */
async function resolveTarget(pathname) {
  let rel = decodeURIComponent(pathname.slice(BASE.length));
  if (rel === '' || rel.endsWith('/')) rel += 'index.html';
  const candidates = [rel, `${rel}.html`, posix.join(rel, 'index.html')];
  for (const c of candidates) {
    const p = join(DIST, c);
    if (await exists(p)) return p;
  }
  return null;
}

const errors = [];
for (const [file, html] of pages) {
  const from = relative(DIST, file);
  const urls = [];
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) urls.push(m[1]);
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) urls.push(part.trim().split(/\s+/)[0]);
  }

  for (const raw of urls) {
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(raw)) continue;

    // ページ内アンカー
    if (raw.startsWith('#')) {
      if (raw.length > 1 && !idsByFile.get(file).has(raw.slice(1))) errors.push(`${from}: アンカーがない ${raw}`);
      continue;
    }

    const url = new URL(raw, `https://example.invalid/${posix.join(BASE, dirname(from).split(sep).join('/'))}/`);
    if (!url.pathname.startsWith(BASE)) {
      errors.push(`${from}: base（${BASE}）の外を指している ${raw}`);
      continue;
    }
    const target = await resolveTarget(url.pathname);
    if (!target) {
      errors.push(`${from}: リンク切れ ${raw}`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!idsByFile.get(target)?.has(id)) errors.push(`${from}: アンカーがない ${raw}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`リンク切れが ${errors.length} 件あります:`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`リンクチェック OK（${htmlFiles.length} ページ）`);
