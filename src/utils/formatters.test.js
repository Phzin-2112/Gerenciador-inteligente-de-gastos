import { describe, expect, it } from 'vitest';
import { getMonthlyComparison, getPreviousMonth, getWeeklyTotals } from './formatters';

describe('formatters', () => {
  it('returns the previous month correctly', () => {
    expect(getPreviousMonth('2026-03')).toBe('2026-02');
    expect(getPreviousMonth('2026-01')).toBe('2025-12');
  });

  it('aggregates expenses by weekday', () => {
    const items = [
      { data: '2026-09-01', valor: 100 },
      { data: '2026-09-02', valor: 50 },
      { data: '2026-09-03', valor: 25 },
      { data: '2026-09-04', valor: 75 },
    ];

    const totals = getWeeklyTotals(items);

    expect(totals[0]).toBe(0);
    expect(totals[1]).toBe(100);
    expect(totals[2]).toBe(50);
    expect(totals[3]).toBe(25);
    expect(totals[4]).toBe(75);
    expect(totals[5]).toBe(0);
    expect(totals[6]).toBe(0);
  });

  it('compares current and previous totals', () => {
    const current = [{ valor: 250 }, { valor: 150 }];
    const previous = [{ valor: 100 }, { valor: 50 }];

    expect(getMonthlyComparison(current, previous)).toMatchObject({
      currentTotal: 400,
      previousTotal: 150,
      delta: 250,
      isHigher: true,
      isLower: false,
      isEqual: false,
    });
  });
});
