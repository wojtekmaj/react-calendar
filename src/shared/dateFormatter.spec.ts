import { describe, expect, it } from 'vitest';
import {
  formatDate,
  formatMonth,
  formatMonthYear,
  formatShortWeekday,
  formatWeekday,
  formatYear,
} from './dateFormatter.js';

describe('formatDate', () => {
  it('returns proper full numeric date', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatDate('en-US', date);

    expect(formattedDate).toBe('2/1/2017');
  });
});

describe('formatMonth', () => {
  it('returns proper month name', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatMonth('en-US', date);

    expect(formattedDate).toBe('February');
  });
});

describe('formatMonthYear', () => {
  it('returns proper month name and year', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatMonthYear('en-US', date);

    expect(formattedDate).toBe('February 2017');
  });
});

describe('formatShortWeekday', () => {
  it('returns proper short weekday name', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatShortWeekday('en-US', date);

    expect(formattedDate).toBe('Wed');
  });
});

describe('formatWeekday', () => {
  it('returns proper weekday name', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatWeekday('en-US', date);

    expect(formattedDate).toBe('Wednesday');
  });
});

describe('formatYear', () => {
  it('returns proper month name and year', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatYear('en-US', date);

    expect(formattedDate).toBe('2017');
  });
});
