import once from 'lodash.once';

const getLocales = once(() => {
  const languageList = [];

  if (window.navigator.languages) {
    languageList.push(...window.navigator.languages);
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  // Fallback
  languageList.push('en-GB');

  return languageList;
});

const getLocale = once(() => getLocales()[0]);

const formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
export const getFormatter = (options, locales = getLocale()) => {
  const stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

export const formatDate = date => getFormatter(
  { day: 'numeric', month: 'numeric', year: 'numeric' },
)(date);

export const formatMonthYear = date => getFormatter(
  { month: 'long', year: 'numeric' },
)(date);

export const formatMonth = date => getFormatter(
  { month: 'long' },
)(date);

export const formatLongWeekday = date => getFormatter(
  { weekday: 'long' },
)(date);

export const formatShortWeekday = date => getFormatter(
  { weekday: 'short' },
)(date);

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

export const getMonth = date => getMonthIndex(date) + 1;

export const getDay = date => date.getDate();

export const getDayOfWeek = (date, calendarType = 'ISO 8601') => {
  let weekday = date.getDay();

  switch (calendarType) {
    case 'ISO 8601':
      if (weekday > 0) {
        weekday -= 1;
      } else {
        weekday = 6;
      }
      break;
    case 'US':
      break;
    default:
      throw new Error('Unsupported calendar type.');
  }

  return weekday;
};

/* Complex getters - getting a property somehow related to a given point in time */

export const getBeginOfCenturyYear = (date) => {
  const year = getYear(date);

  return year + (-year % 100) + 1;
};

export const getBeginOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear, 0, 1);
};

export const getEndOfCentury = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1);
};

export const getCenturyRange = (date) => {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);

  return [
    new Date(beginOfCenturyYear, 0, 1),
    new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1),
  ];
};

export const getPreviousCenturyRange = (date) => {
  const previousCenturyYear = getYear(date) - 100;

  return getCenturyRange(previousCenturyYear);
};

export const getNextCenturyRange = (date) => {
  const nextCenturyYear = getYear(date) + 100;

  return getCenturyRange(nextCenturyYear);
};

export const getBeginOfDecadeYear = (date) => {
  const year = getYear(date);

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

export const getDecadeRange = (date) => {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);

  return [
    new Date(beginOfDecadeYear, 0, 1),
    new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1),
  ];
};

export const getPreviousDecadeRange = (date, offset = 10) => {
  const previousDecadeYear = getBeginOfDecadeYear(date) - offset;

  return getDecadeRange(previousDecadeYear);
};

export const getNextDecadeRange = (date, offset = 10) => {
  const nextDecadeYear = getBeginOfDecadeYear(date) + offset;

  return getDecadeRange(nextDecadeYear);
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
export const getYearRange = (date) => {
  const year = getYear(date);

  return [
    new Date(year, 0, 1),
    new Date(year + 1, 0, 1, 0, 0, 0, -1),
  ];
};

export const getPreviousYearRange = (date, offset = 1) => {
  const previousYear = getYear(date) - offset;

  return getYearRange(previousYear);
};

export const getNextYearRange = (date, offset = 1) => {
  const nextYear = getYear(date) + offset;

  return getYearRange(nextYear);
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
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
export const getMonthRange = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);

  return [
    new Date(year, monthIndex, 1),
    new Date(year, monthIndex + 1, 1, 0, 0, 0, -1),
  ];
};

export const getPreviousMonthRange = (date, offset = 1) => {
  const year = getYear(date);
  const previousMonthIndex = getMonthIndex(date) - offset;

  return [
    new Date(year, previousMonthIndex, 1),
    new Date(year, previousMonthIndex + 1, 1, 0, 0, 0, -1),
  ];
};

export const getNextMonthRange = (date, offset = 1) => {
  const year = getYear(date);
  const nextMonthIndex = getMonthIndex(date) + offset;

  return [
    new Date(year, nextMonthIndex, 1),
    new Date(year, nextMonthIndex + 1, 1, 0, 0, 0, -1),
  ];
};

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
export const getDayRange = (date) => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);

  return [
    new Date(year, monthIndex, day),
    new Date(year, monthIndex, day + 1, 0, 0, 0, -1),
  ];
};

export const getRange = (range, date) => {
  switch (range) {
    case 'century':
      return getCenturyRange(date);
    case 'decade':
      return getDecadeRange(date);
    case 'year':
      return getYearRange(date);
    case 'month':
      return getMonthRange(date);
    default:
      throw new Error('Invalid range.');
  }
};

export const getPreviousRange = (range, date) => {
  switch (range) {
    case 'century':
      return getPreviousCenturyRange(date);
    case 'decade':
      return getPreviousDecadeRange(date);
    case 'year':
      return getPreviousYearRange(date);
    case 'month':
      return getPreviousMonthRange(date);
    default:
      throw new Error('Invalid range.');
  }
};

export const getNextRange = (range, date) => {
  switch (range) {
    case 'century':
      return getNextCenturyRange(date);
    case 'decade':
      return getNextDecadeRange(date);
    case 'year':
      return getNextYearRange(date);
    case 'month':
      return getNextMonthRange(date);
    default:
      throw new Error('Invalid range.');
  }
};

export const getPreviousRange2 = (range, date) => {
  switch (range) {
    case 'decade':
      return getPreviousDecadeRange(date, 100);
    case 'year':
      return getPreviousYearRange(date, 10);
    case 'month':
      return getPreviousMonthRange(date, 12);
    default:
      throw new Error('Invalid range.');
  }
};

export const getNextRange2 = (range, date) => {
  switch (range) {
    case 'decade':
      return getNextDecadeRange(date, 100);
    case 'year':
      return getNextYearRange(date, 10);
    case 'month':
      return getNextMonthRange(date, 12);
    default:
      throw new Error('Invalid range.');
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

  return weekday === 5 || weekday === 6;
};
