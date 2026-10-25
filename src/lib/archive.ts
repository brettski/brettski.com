import type { Dated } from './posts';

export interface MonthEntry {
  month: number;
  count: number;
}
export interface YearEntry {
  year: number;
  count: number;
  months: MonthEntry[];
}

/** Groups by UTC year/month. Years and months are sorted newest first. */
export function buildArchive(posts: Dated[]): YearEntry[] {
  const years = new Map<number, Map<number, number>>();
  for (const { date } of posts) {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const months = years.get(y) ?? new Map<number, number>();
    months.set(m, (months.get(m) ?? 0) + 1);
    years.set(y, months);
  }
  return [...years]
    .sort(([a], [b]) => b - a)
    .map(([year, months]) => ({
      year,
      count: [...months.values()].reduce((a, b) => a + b, 0),
      months: [...months]
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => b.month - a.month),
    }));
}

export const inYear = <T extends Dated>(posts: T[], year: number): T[] =>
  posts.filter((p) => p.date.getUTCFullYear() === year);

export const inMonth = <T extends Dated>(
  posts: T[],
  year: number,
  month: number,
): T[] => inYear(posts, year).filter((p) => p.date.getUTCMonth() + 1 === month);
