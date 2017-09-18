/* Simple getters - getting a property of a given point in time */

export const getYear = (date) => {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  if (typeof date === 'number') {
    return date;
  }

  const year = parseInt(date, 10);

  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }

  throw new Error(`Failed to get year from date: ${date}.`);
};

export const getMonthIndex = date => date.getMonth();

export const getDay = date => date.getDate();

export const getDayOfWeek = (date, calendarType = 'ISO 8601') => {
  const weekday = date.getDay();

  switch (calendarType) {
    case 'ISO 8601':
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case 'US':
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
};

/* Complex getters - getting a property somehow related to a given point in time */

export const getBeginOfCenturyYear = (date) => {
  const year = getYear(date) - 1;
  return year + (-year % 100) + 1;
};

export const getBeginOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear, 0, 1);
};

export const getEndOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear + 100, 0, 1, 0, 0, 0, -1);
};

export const getCenturyRange = date => [
  getBeginOfCentury(date),
  getEndOfCentury(date),
];

export const getBeginOfPreviousCentury = (date) => {
  const previousCenturyYear = getYear(date) - 100;
  return getBeginOfCentury(previousCenturyYear);
};

export const getEndOfPreviousCentury = (date) => {
  const previousCenturyYear = getYear(date) - 100;
  return getEndOfCentury(previousCenturyYear);
};

export const getBeginOfNextCentury = (date) => {
  const nextCenturyYear = getYear(date) + 100;
  return getBeginOfCentury(nextCenturyYear);
};

export const getBeginOfDecadeYear = (date) => {
  const year = getYear(date) - 1;
  return year + (-year % 10) + 1;
};

export const getBeginOfDecade = (date) => {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear, 0, 1);
};

export const getEndOfDecade = (date) => {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
};

export const getDecadeRange = date => [
  getBeginOfDecade(date),
  getEndOfDecade(date),
];

export const getBeginOfPreviousDecade = (date, offset = 10) => {
  const previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getBeginOfDecade(previousDecadeYear);
};

export const getEndOfPreviousDecade = (date, offset = 10) => {
  const previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getEndOfDecade(previousDecadeYear);
};

export const getBeginOfNextDecade = (date, offset = 10) => {
  const nextDecadeYear = getBeginOfDecadeYear(date) + offset;
  return getBeginOfDecade(nextDecadeYear);
};

/**
 * Returns the beginning of a given year.
 *
 * @param {Date} date Date.
 */
export const getBeginOfYear = (date) => {
  const year = getYear(date);
  return new Date(year, 0, 1);
};

/**
 * Returns the end of a given year.
 *
 * @param {Date} date Date.
 */
export const getEndOfYear = (date) => {
  const year = getYear(date);
  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given year.
 *
 * @param {Date} date Date.
 */
export const getYearRange = date => [
  getBeginOfYear(date),
  getEndOfYear(date),
];

export const getBeginOfPreviousYear = (date, offset = 1) => {
  const previousYear = getYear(date) - offset;
  return getBeginOfYear(previousYear);
};

export const getEndOfPreviousYear = (date, offset = 1) => {
  const previousYear = getYear(date) - offset;
  return getEndOfYear(previousYear);
};

export const getBeginOfNextYear = (date, offset = 1) => {
  const nextYear = getYear(date) + offset;
  return getBeginOfYear(nextYear);
};

/**
 * Returns the beginning of a given month.
 *
 * @param {Date} date Date.
 */
export const getBeginOfMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
};

/**
 * Returns the end of a given month.
 *
 * @param {Date} date Date.
 */
export const getEndOfMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export const getBeginOfWeek = (date, calendarType = 'ISO 8601') => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
};

/**
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
export const getMonthRange = date => [
  getBeginOfMonth(date),
  getEndOfMonth(date),
];

export const getBeginOfPreviousMonth = (date, offset = 1) => {
  const year = getYear(date);
  const previousMonthIndex = getMonthIndex(date) - offset;
  return getBeginOfMonth(new Date(year, previousMonthIndex, 1));
};

export const getEndOfPreviousMonth = (date, offset = 1) => {
  const year = getYear(date);
  const previousMonthIndex = getMonthIndex(date) - offset;
  return getEndOfMonth(new Date(year, previousMonthIndex, 1));
};

export const getBeginOfNextMonth = (date, offset = 1) => {
  const year = getYear(date);
  const nextMonthIndex = getMonthIndex(date) + offset;
  return getBeginOfMonth(new Date(year, nextMonthIndex, 1));
};

export const getBeginOfDay = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day);
};

export const getEndOfDay = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day + 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
export const getDayRange = date => [
  getBeginOfDay(date),
  getEndOfDay(date),
];

/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601 week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export const getWeekNumber = (date, calendarType = 'ISO 8601') => {
  let year = getYear(date) + 1;
  let dayInWeekOne;
  let beginOfFirstWeek;

  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarType === 'ISO 8601' ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date - beginOfFirstWeek < 0);

  return Math.floor((date - beginOfFirstWeek) / (8.64e7 * 7)) + 1;
};

/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export const getRange = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getCenturyRange(date);
    case 'decade':
      return getDecadeRange(date);
    case 'year':
      return getYearRange(date);
    case 'month':
      return getMonthRange(date);
    case 'day':
      return getDayRange(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

/**
 * Returns the beginning of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export const getBegin = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getBeginOfCentury(date);
    case 'decade':
      return getBeginOfDecade(date);
    case 'year':
      return getBeginOfYear(date);
    case 'month':
      return getBeginOfMonth(date);
    case 'day':
      return getBeginOfDay(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginPrevious = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getBeginOfPreviousCentury(date);
    case 'decade':
      return getBeginOfPreviousDecade(date);
    case 'year':
      return getBeginOfPreviousYear(date);
    case 'month':
      return getBeginOfPreviousMonth(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginNext = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getBeginOfNextCentury(date);
    case 'decade':
      return getBeginOfNextDecade(date);
    case 'year':
      return getBeginOfNextYear(date);
    case 'month':
      return getBeginOfNextMonth(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade':
      return getBeginOfPreviousDecade(date, 100);
    case 'year':
      return getBeginOfPreviousYear(date, 10);
    case 'month':
      return getBeginOfPreviousMonth(date, 12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginNext2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade':
      return getBeginOfNextDecade(date, 100);
    case 'year':
      return getBeginOfNextYear(date, 10);
    case 'month':
      return getBeginOfNextMonth(date, 12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

/**
 * Returns the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export const getEnd = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getEndOfCentury(date);
    case 'decade':
      return getEndOfDecade(date);
    case 'year':
      return getEndOfYear(date);
    case 'month':
      return getEndOfMonth(date);
    case 'day':
      return getEndOfDay(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getEndPrevious = (rangeType, date) => {
  switch (rangeType) {
    case 'century':
      return getEndOfPreviousCentury(date);
    case 'decade':
      return getEndOfPreviousDecade(date);
    case 'year':
      return getEndOfPreviousYear(date);
    case 'month':
      return getEndOfPreviousMonth(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getEndPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade':
      return getEndOfPreviousDecade(date, 100);
    case 'year':
      return getEndOfPreviousYear(date, 10);
    case 'month':
      return getEndOfPreviousMonth(date, 12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
export const getDaysInMonth = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 0).getDate();
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export const getCenturyLabel = (date) => {
  const [start, end] = getCenturyRange(date);
  const startLabel = getYear(start);
  const endLabel = getYear(end);
  return `${startLabel} – ${endLabel}`;
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export const getDecadeLabel = (date) => {
  const [start, end] = getDecadeRange(date);
  const startLabel = getYear(start);
  const endLabel = getYear(end);
  return `${startLabel} – ${endLabel}`;
};

/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 * @param {Date} date Date.
 */
export const isWeekend = (date) => {
  const weekday = getDayOfWeek(date);
  return weekday >= 5;
};
