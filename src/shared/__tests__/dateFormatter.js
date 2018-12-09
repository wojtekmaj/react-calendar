import {
  formatDate,
  formatMonthYear,
  formatMonth,
  formatShortWeekday,
} from '../dateFormatter';

describe('formatDate', () => {
  it('returns proper full numeric date', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatDate('en-US', date);

    expect(formattedDate).toBe('2/1/2017');
  });
});

describe('formatMonthYear', () => {
  it('returns proper month name and year', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatMonthYear('en-US', date);

    expect(formattedDate).toBe('February 2017');
  });
});

describe('formatMonth', () => {
  it('returns proper month name', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatMonth('en-US', date);

    expect(formattedDate).toBe('February');
  });
});

describe('formatShortWeekday', () => {
  it('returns proper short weekday name', () => {
    const date = new Date(2017, 1, 1);

    const formattedDate = formatShortWeekday('en-US', date);

    expect(formattedDate).toBe('Wed');
  });
});
