// src/utils/dateFormatter.test.ts
import { describe, it, expect } from 'vitest';
import { formatRelativeTime } from './dateFormatter';

describe('formatRelativeTime', () => {
  it('1分未満は「たった今」を返す', () => {
    const now = new Date();
    const result = formatRelativeTime(now.toISOString());
    expect(result).toBe('たった今');
  });

  it('5分前は「5分前」を返す', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = formatRelativeTime(fiveMinutesAgo.toISOString());
    expect(result).toBe('5分前');
  });

  it('2時間前は「2時間前」を返す', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const result = formatRelativeTime(twoHoursAgo.toISOString());
    expect(result).toBe('2時間前');
  });

  it('3日前は「3日前」を返す', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const result = formatRelativeTime(threeDaysAgo.toISOString());
    expect(result).toBe('3日前');
  });
  it('7日以上前は日付を返す', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const result = formatRelativeTime(tenDaysAgo.toISOString());

    // 日付形式であることを確認
    expect(result).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/);
  });
});
