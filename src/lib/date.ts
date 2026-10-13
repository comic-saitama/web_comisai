const TZ = 'Asia/Tokyo';

/** 'YYYY-MM-DD' を日本時間の日付として Date にする */
export function parseDate(ymd: string): Date {
  return new Date(`${ymd}T00:00:00+09:00`);
}

/** 例: 11.28 */
export function formatMonthDay(ymd: string): string {
  const d = parseDate(ymd);
  const parts = new Intl.DateTimeFormat('ja-JP', { timeZone: TZ, month: 'numeric', day: 'numeric' }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('month')}.${get('day')}`;
}

/** 例: 土 */
export function formatWeekday(ymd: string): string {
  return new Intl.DateTimeFormat('ja-JP', { timeZone: TZ, weekday: 'short' }).format(parseDate(ymd));
}

/** 例: 11月20日(金) */
export function formatJaDate(ymd: string): string {
  const d = parseDate(ymd);
  const md = new Intl.DateTimeFormat('ja-JP', { timeZone: TZ, month: 'long', day: 'numeric' }).format(d);
  return `${md}(${formatWeekday(ymd)})`;
}
