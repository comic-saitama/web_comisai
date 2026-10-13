// base（/web_comisai）を付けたサイト内URLを返す。
// 例: url('/pages/recruit.html') → '/web_comisai/pages/recruit.html'
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
