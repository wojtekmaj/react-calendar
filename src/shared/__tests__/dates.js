import {
  getYear,
  getMonth,
  getMonthIndex,
  getDay,
  getDayOfWeek,
  getBeginOfCenturyYear,
  getBeginOfCentury,
  getEndOfCentury,
  getCenturyRange,
  getBeginOfPreviousCentury,
  getEndOfPreviousCentury,
  getBeginOfNextCentury,
  getBeginOfDecadeYear,
  getBeginOfDecade,
  getEndOfDecade,
  getDecadeRange,
  getBeginOfPreviousDecade,
  getEndOfPreviousDecade,
  getBeginOfNextDecade,
  getBeginOfYear,
  getEndOfYear,
  getYearRange,
  getBeginOfPreviousYear,
  getEndOfPreviousYear,
  getBeginOfNextYear,
  getBeginOfMonth,
  getEndOfMonth,
  getBeginOfWeek,
  getMonthRange,
  getBeginOfPreviousMonth,
  getEndOfPreviousMonth,
  getBeginOfNextMonth,
  getBeginOfDay,
  getEndOfDay,
  getDayRange,
  getWeekNumber,
  getRange,
  getBegin,
  getBeginPrevious,
  getBeginNext,
  getBeginPrevious2,
  getBeginNext2,
  getEnd,
  getEndPrevious,
  getEndPrevious2,
  getValueRange,
  getDaysInMonth,
  getCenturyLabel,
  getDecadeLabel,
  isWeekend,
  getISOLocalMonth,
  getISOLocalDate,
} from '../dates';

describe('getYear', () => {
  it('returns proper year for a given date', () => {
    const date = new Date(2017, 0, 1);

    const year = getYear(date);

    expect(year).toBe(2017);
  });

  it('returns proper year for a given number', () => {
    const date = 2017;

    const year = getYear(date);

    expect(year).toBe(2017);
  });

  it('returns proper year for a given string', () => {
    const date = '2017';

    const year = getYear(date);

    expect(year).toBe(2017);
  });

  it('throws an error when given nonsense data', () => {
    const text = 'wololo';
    const flag = true;

    expect(() => getYear(text)).toThrow();
    expect(() => getYear(flag)).toThrow();
    expect(() => getYear()).toThrow();
  });
});

describe('getMonth', () => {
  it('returns proper month', () => {
    const date = new Date(2017, 0, 1);

    const monthIndex = getMonth(date);

    expect(monthIndex).toBe(1);
  });
});

describe('getMonthIndex', () => {
  it('returns proper month index', () => {
    const date = new Date(2017, 0, 1);

    const monthIndex = getMonthIndex(date);

    expect(monthIndex).toBe(0);
  });
});

describe('getDay', () => {
  it('returns proper day', () => {
    const date = new Date(2017, 0, 1);

    const day = getDay(date);

    expect(day).toBe(1);
  });
});

describe('getDayOfWeek', () => {
  it('returns proper day of the week (ISO 8601)', () => {
    const date = new Date(2017, 0, 1);

    const dayOfWeek = getDayOfWeek(date, 'ISO 8601');

    expect(dayOfWeek).toBe(6);
  });

  it('returns proper day of the week (US)', () => {
    const date = new Date(2017, 0, 1);

    const dayOfWeek = getDayOfWeek(date, 'US');

    expect(dayOfWeek).toBe(0);
  });

  it('returns proper day of the week (default)', () => {
    const date = new Date(2017, 0, 1);

    const dayOfWeek = getDayOfWeek(date);

    expect(dayOfWeek).toBe(6);
  });

  it('throws an error when given unrecognized calendar type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getDayOfWeek(date, 'Chinese')).toThrow();
  });
});

describe('getBeginOfCenturyYear', () => {
  it('returns proper year of the beginning of the century', () => {
    const date1 = new Date(2017, 0, 1);
    const date2 = new Date(2001, 0, 1);
    const date3 = new Date(2000, 0, 1);

    const beginOfCenturyYear1 = getBeginOfCenturyYear(date1);
    const beginOfCenturyYear2 = getBeginOfCenturyYear(date2);
    const beginOfCenturyYear3 = getBeginOfCenturyYear(date3);

    expect(beginOfCenturyYear1).toBe(2001);
    expect(beginOfCenturyYear2).toBe(2001);
    expect(beginOfCenturyYear3).toBe(1901);
  });
});

describe('getBeginOfCentury', () => {
  it('returns proper beginning of the century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(2001, 0, 1);

    const beginOfCentury = getBeginOfCentury(date);

    expect(beginOfCentury).toEqual(beginOfCenturyDate);
  });
});

describe('getEndOfCentury', () => {
  it('returns proper end of the century', () => {
    const date = new Date(2017, 0, 1);
    const endOfCenturyDate = new Date(2100, 11, 31, 23, 59, 59, 999);

    const endOfCentury = getEndOfCentury(date);

    expect(endOfCentury).toEqual(endOfCenturyDate);
  });
});

describe('getCenturyRange', () => {
  it('returns proper century date range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(2001, 0, 1);
    const endOfCenturyDate = new Date(2100, 11, 31, 23, 59, 59, 999);

    const centuryRange = getCenturyRange(date);

    expect(centuryRange).toHaveLength(2);
    expect(centuryRange).toEqual([beginOfCenturyDate, endOfCenturyDate]);
  });
});

describe('getBeginPreviousOfCentury', () => {
  it('returns proper beginning of the previous century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousCenturyDate = new Date(1901, 0, 1);

    const beginOfPreviousCentury = getBeginOfPreviousCentury(date);

    expect(beginOfPreviousCentury).toEqual(beginOfPreviousCenturyDate);
  });
});

describe('getEndOfPreviousCentury', () => {
  it('returns proper end of the previous century', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousCenturyDate = new Date(2000, 11, 31, 23, 59, 59, 999);

    const endOfPreviousCentury = getEndOfPreviousCentury(date);

    expect(endOfPreviousCentury).toEqual(endOfPreviousCenturyDate);
  });
});

describe('getBeginOfNextCentury', () => {
  it('returns proper beginning of the next century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextCenturyDate = new Date(2101, 0, 1);

    const beginOfNextCentury = getBeginOfNextCentury(date);

    expect(beginOfNextCentury).toEqual(beginOfNextCenturyDate);
  });
});

describe('getBeginOfDecadeYear', () => {
  it('returns proper year of the beginning of the decade', () => {
    const date1 = new Date(2017, 0, 1);
    const date2 = new Date(2001, 0, 1);
    const date3 = new Date(2000, 0, 1);

    const beginOfDecadeYear1 = getBeginOfDecadeYear(date1);
    const beginOfDecadeYear2 = getBeginOfDecadeYear(date2);
    const beginOfDecadeYear3 = getBeginOfDecadeYear(date3);

    expect(beginOfDecadeYear1).toBe(2011);
    expect(beginOfDecadeYear2).toBe(2001);
    expect(beginOfDecadeYear3).toBe(1991);
  });
});

describe('getBeginOfDecade', () => {
  it('returns proper beginning of the decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2011, 0, 1);

    const beginOfDecade = getBeginOfDecade(date);

    expect(beginOfDecade).toEqual(beginOfDecadeDate);
  });
});

describe('getEndOfDecade', () => {
  it('returns proper end of the decade', () => {
    const date = new Date(2017, 0, 1);
    const endOfDecadeDate = new Date(2020, 11, 31, 23, 59, 59, 999);

    const endOfDecade = getEndOfDecade(date);

    expect(endOfDecade).toEqual(endOfDecadeDate);
  });
});

describe('getDecadeRange', () => {
  it('returns proper decade date range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2011, 0, 1);
    const endOfDecadeDate = new Date(2020, 11, 31, 23, 59, 59, 999);

    const decadeRange = getDecadeRange(date);

    expect(decadeRange).toHaveLength(2);
    expect(decadeRange).toEqual([beginOfDecadeDate, endOfDecadeDate]);
  });
});

describe('getBeginPreviousOfDecade', () => {
  it('returns proper beginning of the previous decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousDecadeDate = new Date(2001, 0, 1);

    const beginOfPreviousDecade = getBeginOfPreviousDecade(date);

    expect(beginOfPreviousDecade).toEqual(beginOfPreviousDecadeDate);
  });
});

describe('getEndOfPreviousDecade', () => {
  it('returns proper end of the previous decade', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousDecadeDate = new Date(2010, 11, 31, 23, 59, 59, 999);

    const endOfPreviousDecade = getEndOfPreviousDecade(date);

    expect(endOfPreviousDecade).toEqual(endOfPreviousDecadeDate);
  });
});

describe('getBeginOfNextDecade', () => {
  it('returns proper beginning of the next decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextDecadeDate = new Date(2021, 0, 1);

    const beginOfNextDecade = getBeginOfNextDecade(date);

    expect(beginOfNextDecade).toEqual(beginOfNextDecadeDate);
  });
});

describe('getBeginOfYear', () => {
  it('returns proper beginning of the year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2017, 0, 1);

    const beginOfYear = getBeginOfYear(date);

    expect(beginOfYear).toEqual(beginOfYearDate);
  });
});

describe('getEndOfYear', () => {
  it('returns proper end of the year', () => {
    const date = new Date(2017, 0, 1);
    const endOfYearDate = new Date(2017, 11, 31, 23, 59, 59, 999);

    const endOfYear = getEndOfYear(date);

    expect(endOfYear).toEqual(endOfYearDate);
  });
});

describe('getYearRange', () => {
  it('returns proper year date range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2017, 0, 1);
    const endOfYearDate = new Date(2017, 11, 31, 23, 59, 59, 999);

    const yearRange = getYearRange(date);

    expect(yearRange).toHaveLength(2);
    expect(yearRange).toEqual([beginOfYearDate, endOfYearDate]);
  });
});

describe('getBeginPreviousOfYear', () => {
  it('returns proper beginning of the previous year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousYearDate = new Date(2016, 0, 1);

    const beginOfPreviousYear = getBeginOfPreviousYear(date);

    expect(beginOfPreviousYear).toEqual(beginOfPreviousYearDate);
  });
});

describe('getEndOfPreviousYear', () => {
  it('returns proper end of the previous year', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousYearDate = new Date(2016, 11, 31, 23, 59, 59, 999);

    const endOfPreviousYear = getEndOfPreviousYear(date);

    expect(endOfPreviousYear).toEqual(endOfPreviousYearDate);
  });
});

describe('getBeginOfNextYear', () => {
  it('returns proper beginning of the next year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextYearDate = new Date(2018, 0, 1);

    const beginOfNextYear = getBeginOfNextYear(date);

    expect(beginOfNextYear).toEqual(beginOfNextYearDate);
  });
});

describe('getBeginOfMonth', () => {
  it('returns proper beginning of the month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2017, 0, 1);

    const beginOfMonth = getBeginOfMonth(date);

    expect(beginOfMonth).toEqual(beginOfMonthDate);
  });
});

describe('getEndOfMonth', () => {
  it('returns proper end of the month', () => {
    const date = new Date(2017, 0, 1);
    const endOfMonthDate = new Date(2017, 0, 31, 23, 59, 59, 999);

    const endOfMonth = getEndOfMonth(date);

    expect(endOfMonth).toEqual(endOfMonthDate);
  });
});

describe('getBeginOfWeek', () => {
  it('returns proper beginning of the week (ISO 8601)', () => {
    const date = new Date(2017, 0, 1);
    const beginOfWeekDate = new Date(2016, 11, 26);

    const beginOfWeek = getBeginOfWeek(date, 'ISO 8601');

    expect(beginOfWeek).toEqual(beginOfWeekDate);
  });

  it('returns proper beginning of the week (US)', () => {
    const date = new Date(2016, 0, 1);
    const beginOfWeekDate = new Date(2015, 11, 27);

    const beginOfWeek = getBeginOfWeek(date, 'US');

    expect(beginOfWeek).toEqual(beginOfWeekDate);
  });

  it('returns proper beginning of the week (default)', () => {
    const date = new Date(2017, 0, 1);
    const beginOfWeekDate = new Date(2016, 11, 26);

    const beginOfWeek = getBeginOfWeek(date);

    expect(beginOfWeek).toEqual(beginOfWeekDate);
  });
});

describe('getMonthRange', () => {
  it('returns proper month date range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2017, 0, 1);
    const endOfMonthDate = new Date(2017, 0, 31, 23, 59, 59, 999);

    const monthRange = getMonthRange(date);

    expect(monthRange).toHaveLength(2);
    expect(monthRange).toEqual([beginOfMonthDate, endOfMonthDate]);
  });
});

describe('getBeginPreviousOfMonth', () => {
  it('returns proper beginning of the previous month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousMonthDate = new Date(2016, 11, 1);

    const beginOfPreviousMonth = getBeginOfPreviousMonth(date);

    expect(beginOfPreviousMonth).toEqual(beginOfPreviousMonthDate);
  });
});

describe('getEndOfPreviousMonth', () => {
  it('returns proper end of the previous month', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousMonthDate = new Date(2016, 11, 31, 23, 59, 59, 999);

    const endOfPreviousMonth = getEndOfPreviousMonth(date);

    expect(endOfPreviousMonth).toEqual(endOfPreviousMonthDate);
  });
});

describe('getBeginOfNextMonth', () => {
  it('returns proper beginning of the next month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextMonthDate = new Date(2017, 1, 1);

    const beginOfNextMonth = getBeginOfNextMonth(date);

    expect(beginOfNextMonth).toEqual(beginOfNextMonthDate);
  });
});

describe('getBeginOfDay', () => {
  it('returns proper beginning of the day', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDayDate = new Date(2017, 0, 1);

    const beginOfDay = getBeginOfDay(date);

    expect(beginOfDay).toEqual(beginOfDayDate);
  });
});

describe('getEndOfDay', () => {
  it('returns proper end of the day', () => {
    const date = new Date(2017, 0, 1);
    const endOfDayDate = new Date(2017, 0, 1, 23, 59, 59, 999);

    const endOfDay = getEndOfDay(date);

    expect(endOfDay).toEqual(endOfDayDate);
  });
});

describe('getDayRange', () => {
  it('returns proper day date range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDayDate = new Date(2017, 0, 1);
    const endOfDayDate = new Date(2017, 0, 1, 23, 59, 59, 999);

    const dayRange = getDayRange(date);

    expect(dayRange).toHaveLength(2);
    expect(dayRange).toEqual([beginOfDayDate, endOfDayDate]);
  });
});

describe('getWeekNumber', () => {
  it('returns proper week number for a sample week 1 (ISO 8601)', () => {
    const year = 2018;
    const month = 0;
    const startDate = 1;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'ISO 8601');

      expect(weekNumber).toBe(1);
    }
  });

  it('returns proper week number for a sample year starting in week 1 (ISO 8601)', () => {
    const year = 2018;
    const month = 0;
    const startDate = 1;

    for (let currentWeek = 1; currentWeek <= 52; currentWeek += 1) {
      const weekOffset = (currentWeek - 1) * 7;
      const date = new Date(year, month, startDate + weekOffset);

      const weekNumber = getWeekNumber(date, 'ISO 8601');

      expect(weekNumber).toBe(currentWeek);
    }
  });

  it('returns proper week number for a sample week 52 (ISO 8601)', () => {
    const year = 2016;
    const month = 11;
    const startDate = 26;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'ISO 8601');

      expect(weekNumber).toBe(52);
    }
  });

  it('returns proper week number for a sample week 53 (ISO 8601)', () => {
    const year = 2015;
    const month = 11;
    const startDate = 28;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'ISO 8601');

      expect(weekNumber).toBe(53);
    }
  });

  it('returns proper week number for a sample week 1 (US)', () => {
    const year = 2015;
    const month = 11;
    const startDate = 27;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'US');

      expect(weekNumber).toBe(1);
    }
  });

  it('returns proper week number for a sample year starting in week 1 (US)', () => {
    const year = 2015;
    const month = 11;
    const startDate = 27;

    for (let currentWeek = 1; currentWeek <= 53; currentWeek += 1) {
      const weekOffset = (currentWeek - 1) * 7;
      const date = new Date(year, month, startDate + weekOffset);

      const weekNumber = getWeekNumber(date, 'US');

      expect(weekNumber).toBe(currentWeek);
    }
  });

  it('returns proper week number for a sample week 1 (US)', () => {
    const year = 2015;
    const month = 11;
    const startDate = 27;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'US');

      expect(weekNumber).toBe(1);
    }
  });

  it('returns proper week number for a sample week 52 (US)', () => {
    const year = 2017;
    const month = 11;
    const startDate = 24;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'US');

      expect(weekNumber).toBe(52);
    }
  });

  it('returns proper week number for a sample week 53 (US)', () => {
    const year = 2016;
    const month = 11;
    const startDate = 25;

    for (let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate);

      const weekNumber = getWeekNumber(date, 'US');

      expect(weekNumber).toBe(53);
    }
  });
});

describe('getRange', () => {
  it('returns proper century range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(2001, 0, 1);
    const endOfCenturyDate = new Date(2100, 11, 31, 23, 59, 59, 999);

    const centuryRange = getRange('century', date);

    expect(centuryRange).toHaveLength(2);
    expect(centuryRange).toEqual([beginOfCenturyDate, endOfCenturyDate]);
  });

  it('returns proper decade range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2011, 0, 1);
    const endOfDecadeDate = new Date(2020, 11, 31, 23, 59, 59, 999);

    const decadeRange = getRange('decade', date);

    expect(decadeRange).toHaveLength(2);
    expect(decadeRange).toEqual([beginOfDecadeDate, endOfDecadeDate]);
  });

  it('returns proper year range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2017, 0, 1);
    const endOfYearDate = new Date(2017, 11, 31, 23, 59, 59, 999);

    const yearRange = getRange('year', date);

    expect(yearRange).toHaveLength(2);
    expect(yearRange).toEqual([beginOfYearDate, endOfYearDate]);
  });

  it('returns proper month range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2017, 0, 1);
    const endOfMonthDate = new Date(2017, 0, 31, 23, 59, 59, 999);

    const monthRange = getRange('month', date);

    expect(monthRange).toHaveLength(2);
    expect(monthRange).toEqual([beginOfMonthDate, endOfMonthDate]);
  });

  it('returns proper day range', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDayDate = new Date(2017, 0, 1);
    const endOfDayDate = new Date(2017, 0, 1, 23, 59, 59, 999);

    const dayRange = getRange('day', date);

    expect(dayRange).toHaveLength(2);
    expect(dayRange).toEqual([beginOfDayDate, endOfDayDate]);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getRange('hamster', date)).toThrow();
  });
});

describe('getBegin', () => {
  it('returns proper beginning of the century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(2001, 0, 1);

    const beginOfCentury = getBegin('century', date);

    expect(beginOfCentury).toEqual(beginOfCenturyDate);
  });

  it('returns proper beginning of the decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2011, 0, 1);

    const beginOfDecade = getBegin('decade', date);

    expect(beginOfDecade).toEqual(beginOfDecadeDate);
  });

  it('returns proper beginning of the year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2017, 0, 1);

    const beginOfYear = getBegin('year', date);

    expect(beginOfYear).toEqual(beginOfYearDate);
  });

  it('returns proper beginning of the month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2017, 0, 1);

    const monthRange = getBegin('month', date);

    expect(monthRange).toEqual(beginOfMonthDate);
  });

  it('returns proper beginning of the day', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDayDate = new Date(2017, 0, 1);

    const beginOfDay = getBegin('day', date);

    expect(beginOfDay).toEqual(beginOfDayDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getBegin('hamster', date)).toThrow();
  });
});

describe('getBeginPrevious', () => {
  it('returns proper beginning of the previous century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(1901, 0, 1);

    const beginOfCentury = getBeginPrevious('century', date);

    expect(beginOfCentury).toEqual(beginOfCenturyDate);
  });

  it('returns proper beginning of the previous decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2001, 0, 1);

    const beginOfDecade = getBeginPrevious('decade', date);

    expect(beginOfDecade).toEqual(beginOfDecadeDate);
  });

  it('returns proper beginning of the previous year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2016, 0, 1);

    const beginOfYear = getBeginPrevious('year', date);

    expect(beginOfYear).toEqual(beginOfYearDate);
  });

  it('returns proper beginning of the previous month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2016, 11, 1);

    const monthRange = getBeginPrevious('month', date);

    expect(monthRange).toEqual(beginOfMonthDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getBeginPrevious('hamster', date)).toThrow();
  });
});

describe('getBeginNext', () => {
  it('returns proper beginning of the next century', () => {
    const date = new Date(2017, 0, 1);
    const beginOfCenturyDate = new Date(2101, 0, 1);

    const beginOfCentury = getBeginNext('century', date);

    expect(beginOfCentury).toEqual(beginOfCenturyDate);
  });

  it('returns proper beginning of the next decade', () => {
    const date = new Date(2017, 0, 1);
    const beginOfDecadeDate = new Date(2021, 0, 1);

    const beginOfDecade = getBeginNext('decade', date);

    expect(beginOfDecade).toEqual(beginOfDecadeDate);
  });

  it('returns proper beginning of the next year', () => {
    const date = new Date(2017, 0, 1);
    const beginOfYearDate = new Date(2018, 0, 1);

    const beginOfYear = getBeginNext('year', date);

    expect(beginOfYear).toEqual(beginOfYearDate);
  });

  it('returns proper beginning of the next month', () => {
    const date = new Date(2017, 0, 1);
    const beginOfMonthDate = new Date(2017, 1, 1);

    const monthRange = getBeginNext('month', date);

    expect(monthRange).toEqual(beginOfMonthDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getBeginNext('hamster', date)).toThrow();
  });
});

describe('getBeginPrevious2', () => {
  it('returns proper beginning of the decade 10 decades ago', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousCenturyDate = new Date(1911, 0, 1);

    const beginOfPreviousCentury = getBeginPrevious2('decade', date);

    expect(beginOfPreviousCentury).toEqual(beginOfPreviousCenturyDate);
  });

  it('returns proper beginning of the year 10 years ago', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousDecadeDate = new Date(2007, 0, 1);

    const beginOfPreviousDecade = getBeginPrevious2('year', date);

    expect(beginOfPreviousDecade).toEqual(beginOfPreviousDecadeDate);
  });

  it('returns proper beginning of the month 1 year ago', () => {
    const date = new Date(2017, 0, 1);
    const beginOfPreviousYearDate = new Date(2016, 0, 1);

    const beginOfPreviousYear = getBeginPrevious2('month', date);

    expect(beginOfPreviousYear).toEqual(beginOfPreviousYearDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getBeginPrevious2('hamster', date)).toThrow();
  });
});

describe('getBeginNext2', () => {
  it('returns proper beginning of the decade 10 decades ahead', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextCenturyDate = new Date(2111, 0, 1);

    const beginOfNextCentury = getBeginNext2('decade', date);

    expect(beginOfNextCentury).toEqual(beginOfNextCenturyDate);
  });

  it('returns proper beginning of the year 10 years ahead', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextDecadeDate = new Date(2027, 0, 1);

    const beginOfNextDecade = getBeginNext2('year', date);

    expect(beginOfNextDecade).toEqual(beginOfNextDecadeDate);
  });

  it('returns proper beginning of the month 1 year ahead', () => {
    const date = new Date(2017, 0, 1);
    const beginOfNextYearDate = new Date(2018, 0, 1);

    const beginOfNextYear = getBeginNext2('month', date);

    expect(beginOfNextYear).toEqual(beginOfNextYearDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getBeginNext2('hamster', date)).toThrow();
  });
});

describe('getEnd', () => {
  it('returns proper end of the century', () => {
    const date = new Date(2017, 0, 1);
    const endOfCenturyDate = new Date(2100, 11, 31, 23, 59, 59, 999);

    const endOfCentury = getEnd('century', date);

    expect(endOfCentury).toEqual(endOfCenturyDate);
  });

  it('returns proper end of the decade', () => {
    const date = new Date(2017, 0, 1);
    const endOfDecadeDate = new Date(2020, 11, 31, 23, 59, 59, 999);

    const endOfDecade = getEnd('decade', date);

    expect(endOfDecade).toEqual(endOfDecadeDate);
  });

  it('returns proper end of the year', () => {
    const date = new Date(2017, 0, 1);
    const endOfYearDate = new Date(2017, 11, 31, 23, 59, 59, 999);

    const endOfYear = getEnd('year', date);

    expect(endOfYear).toEqual(endOfYearDate);
  });

  it('returns proper end of the month', () => {
    const date = new Date(2017, 0, 1);
    const endOfMonthDate = new Date(2017, 0, 31, 23, 59, 59, 999);

    const monthRange = getEnd('month', date);

    expect(monthRange).toEqual(endOfMonthDate);
  });

  it('returns proper end of the day', () => {
    const date = new Date(2017, 0, 1);
    const endOfDayDate = new Date(2017, 0, 1, 23, 59, 59, 999);

    const endOfDay = getEnd('day', date);

    expect(endOfDay).toEqual(endOfDayDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getEnd('hamster', date)).toThrow();
  });
});

describe('getEndPrevious', () => {
  it('returns proper end of the previous century', () => {
    const date = new Date(2017, 0, 1);
    const endOfCenturyDate = new Date(2000, 11, 31, 23, 59, 59, 999);

    const endOfCentury = getEndPrevious('century', date);

    expect(endOfCentury).toEqual(endOfCenturyDate);
  });

  it('returns proper end of the previous decade', () => {
    const date = new Date(2017, 0, 1);
    const endOfDecadeDate = new Date(2010, 11, 31, 23, 59, 59, 999);

    const endOfDecade = getEndPrevious('decade', date);

    expect(endOfDecade).toEqual(endOfDecadeDate);
  });

  it('returns proper end of the previous year', () => {
    const date = new Date(2017, 0, 1);
    const endOfYearDate = new Date(2016, 11, 31, 23, 59, 59, 999);

    const endOfYear = getEndPrevious('year', date);

    expect(endOfYear).toEqual(endOfYearDate);
  });

  it('returns proper end of the previous month', () => {
    const date = new Date(2017, 0, 1);
    const endOfMonthDate = new Date(2016, 11, 31, 23, 59, 59, 999);

    const monthRange = getEndPrevious('month', date);

    expect(monthRange).toEqual(endOfMonthDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getEndPrevious('hamster', date)).toThrow();
  });
});

describe('getEndPrevious2', () => {
  it('returns proper end of the decade 10 decades ago', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousCenturyDate = new Date(1920, 11, 31, 23, 59, 59, 999);

    const endOfPreviousCentury = getEndPrevious2('decade', date);

    expect(endOfPreviousCentury).toEqual(endOfPreviousCenturyDate);
  });

  it('returns proper end of the year 10 years ago', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousDecadeDate = new Date(2007, 11, 31, 23, 59, 59, 999);

    const endOfPreviousDecade = getEndPrevious2('year', date);

    expect(endOfPreviousDecade).toEqual(endOfPreviousDecadeDate);
  });

  it('returns proper end of the month 1 year ago', () => {
    const date = new Date(2017, 0, 1);
    const endOfPreviousYearDate = new Date(2016, 0, 31, 23, 59, 59, 999);

    const endOfPreviousYear = getEndPrevious2('month', date);

    expect(endOfPreviousYear).toEqual(endOfPreviousYearDate);
  });

  it('throws an error when given unrecognized range type', () => {
    const date = new Date(2017, 0, 1);

    expect(() => getEndPrevious2('hamster', date)).toThrow();
  });
});

describe('getValueRange', () => {
  it('returns an array of dates given two ordered dates', () => {
    const date1 = new Date(2018, 0, 1);
    const date2 = new Date(2018, 6, 1);

    const range = getValueRange('day', date1, date2);

    expect(range).toEqual([getBeginOfDay(date1), getEndOfDay(date2)]);
  });

  it('returns an array of dates given two unordered dates', () => {
    const date1 = new Date(2018, 6, 1);
    const date2 = new Date(2018, 0, 1);

    const range = getValueRange('day', date1, date2);

    expect(range).toEqual([getBeginOfDay(date2), getEndOfDay(date1)]);
  });
});

describe('getDaysInMonth', () => {
  it('returns proper number of days in a month', () => {
    const date = new Date(2017, 0, 1);

    const daysInMonth = getDaysInMonth(date);

    expect(daysInMonth).toBe(31);
  });
});

describe('getCenturyLabel', () => {
  it('returns proper label for the century a given date is in', () => {
    const date = new Date(2017, 0, 1);

    const centuryLabel = getCenturyLabel(date);

    expect(centuryLabel).toBe('2001 – 2100');
  });
});

describe('getDecadeLabel', () => {
  it('returns proper label for the decade a given date is in', () => {
    const date = new Date(2017, 0, 1);

    const decadeLabel = getDecadeLabel(date);

    expect(decadeLabel).toBe('2011 – 2020');
  });
});

describe('isWeekend', () => {
  it('returns proper flag', () => {
    const date1 = new Date(2016, 11, 30);
    const date2 = new Date(2016, 11, 31);
    const date3 = new Date(2017, 0, 1);
    const date4 = new Date(2017, 0, 2);

    const isWeekend1 = isWeekend(date1);
    const isWeekend2 = isWeekend(date2);
    const isWeekend3 = isWeekend(date3);
    const isWeekend4 = isWeekend(date4);

    expect(isWeekend1).toBe(false);
    expect(isWeekend2).toBe(true);
    expect(isWeekend3).toBe(true);
    expect(isWeekend4).toBe(false);
  });
});

describe('getISOLocalMonth', () => {
  it('returns proper ISO month', () => {
    const date = new Date(Date.UTC(2017, 0, 1));

    const ISOMonth = getISOLocalMonth(date);

    expect(ISOMonth).toBe('2017-01');
  });

  it('returns nothing when given nothing', () => {
    expect(getISOLocalMonth()).toBeUndefined();
  });

  it('throws an error when given nonsense data', () => {
    const text = 'wololo';
    const fn = () => {};

    expect(() => getISOLocalMonth(text)).toThrow();
    expect(() => getISOLocalMonth(fn)).toThrow();
  });
});

describe('getISOLocalDate', () => {
  it('returns proper ISO date', () => {
    const date = new Date(Date.UTC(2017, 0, 1));

    const ISODate = getISOLocalDate(date);

    expect(ISODate).toBe('2017-01-01');
  });

  it('returns nothing when given nothing', () => {
    expect(getISOLocalDate()).toBeUndefined();
  });

  it('throws an error when given nonsense data', () => {
    const text = 'wololo';
    const fn = () => {};

    expect(() => getISOLocalDate(text)).toThrow();
    expect(() => getISOLocalDate(fn)).toThrow();
  });
});
