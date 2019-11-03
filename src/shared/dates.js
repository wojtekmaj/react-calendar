import {
  getYear,
  getMonth as getMonthIndex,

  getCenturyStart,
  getPreviousCenturyStart,
  getNextCenturyStart,
  getCenturyEnd,
  getPreviousCenturyEnd,
  getCenturyRange,

  getDecadeStart,
  getPreviousDecadeStart,
  getNextDecadeStart,
  getDecadeEnd,
  getPreviousDecadeEnd,
  getDecadeRange,

  getYearStart,
  getPreviousYearStart,
  getNextYearStart,
  getYearEnd,
  getPreviousYearEnd,
  getYearRange,

  getMonthStart,
  getPreviousMonthStart,
  getNextMonthStart,
  getMonthEnd,
  getPreviousMonthEnd,
  getMonthRange,

  getDayStart,
  getDayEnd,
  getDayRange,
} from '@wojtekmaj/date-utils';

import { CALENDAR_TYPES, WEEKDAYS } from './const';
import { formatYear as defaultFormatYear } from './dateFormatter';

const SUNDAY = WEEKDAYS[0];
const FRIDAY = WEEKDAYS[5];
const SATURDAY = WEEKDAYS[6];

/* Simple getters - getting a property of a given point in time */

export function getDayOfWeek(date, calendarType = CALENDAR_TYPES.ISO_8601) {
  const weekday = date.getDay();

  switch (calendarType) {
    case CALENDAR_TYPES.ISO_8601:
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case CALENDAR_TYPES.ARABIC:
      return (weekday + 1) % 7;
    case CALENDAR_TYPES.HEBREW:
    case CALENDAR_TYPES.US:
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
}

/**
 * Century
 */

export function getBeginOfCenturyYear(date) {
  const beginOfCentury = getCenturyStart(date);
  return getYear(beginOfCentury);
}

/**
 * Decade
 */
export function getBeginOfDecadeYear(date) {
  const beginOfDecade = getDecadeStart(date);
  return getYear(beginOfDecade);
}

/**
 * Week
 */

/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export function getBeginOfWeek(date, calendarType = CALENDAR_TYPES.ISO_8601) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}

/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export function getWeekNumber(date, calendarType = CALENDAR_TYPES.ISO_8601) {
  const calendarTypeForWeekNumber = (
    calendarType === CALENDAR_TYPES.US
      ? CALENDAR_TYPES.US
      : CALENDAR_TYPES.ISO_8601
  );
  const beginOfWeek = getBeginOfWeek(date, calendarTypeForWeekNumber);
  let year = getYear(date) + 1;
  let dayInWeekOne;
  let beginOfFirstWeek;

  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarTypeForWeekNumber);
    year -= 1;
  } while (date - beginOfFirstWeek < 0);

  return Math.round((beginOfWeek - beginOfFirstWeek) / (8.64e7 * 7)) + 1;
}

/**
 * Others
 */

/**
 * Returns the beginning of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export function getBegin(rangeType, date) {
  switch (rangeType) {
    case 'century': return getCenturyStart(date);
    case 'decade': return getDecadeStart(date);
    case 'year': return getYearStart(date);
    case 'month': return getMonthStart(date);
    case 'day': return getDayStart(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century': return getPreviousCenturyStart(date);
    case 'decade': return getPreviousDecadeStart(date);
    case 'year': return getPreviousYearStart(date);
    case 'month': return getPreviousMonthStart(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case 'century': return getNextCenturyStart(date);
    case 'decade': return getNextDecadeStart(date);
    case 'year': return getNextYearStart(date);
    case 'month': return getNextMonthStart(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getBeginPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getPreviousDecadeStart(date, -100);
    case 'year': return getPreviousYearStart(date, -10);
    case 'month': return getPreviousMonthStart(date, -12);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginNext2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getNextDecadeStart(date, 100);
    case 'year': return getNextYearStart(date, 10);
    case 'month': return getNextMonthStart(date, 12);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

/**
 * Returns the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export function getEnd(rangeType, date) {
  switch (rangeType) {
    case 'century': return getCenturyEnd(date);
    case 'decade': return getDecadeEnd(date);
    case 'year': return getYearEnd(date);
    case 'month': return getMonthEnd(date);
    case 'day': return getDayEnd(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century': return getPreviousCenturyEnd(date);
    case 'decade': return getPreviousDecadeEnd(date);
    case 'year': return getPreviousYearEnd(date);
    case 'month': return getPreviousMonthEnd(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getEndPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getPreviousDecadeEnd(date, -100);
    case 'year': return getPreviousYearEnd(date, -10);
    case 'month': return getPreviousMonthEnd(date, -12);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export function getRange(rangeType, date) {
  switch (rangeType) {
    case 'century': return getCenturyRange(date);
    case 'decade': return getDecadeRange(date);
    case 'year': return getYearRange(date);
    case 'month': return getMonthRange(date);
    case 'day': return getDayRange(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Creates a range out of two values, ensuring they are in order and covering entire period ranges.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date1 First date.
 * @param {Date} date2 Second date.
 */
export function getValueRange(rangeType, date1, date2) {
  const rawNextValue = [date1, date2].sort((a, b) => a - b);
  return [
    getBegin(rangeType, rawNextValue[0]),
    getEnd(rangeType, rawNextValue[1]),
  ];
}

function toYearLabel(locale, formatYear = defaultFormatYear, dates) {
  return dates
    .map(date => formatYear(locale, date))
    .join(' – ');
}

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export function getCenturyLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, getCenturyRange(date));
}

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export function getDecadeLabel(locale, formatYear, date) {
  return toYearLabel(locale, formatYear, getDecadeRange(date));
}

/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 *
 * @param {Date} date Date.
 */
export function isWeekend(date, calendarType = CALENDAR_TYPES.ISO_8601) {
  const weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ARABIC:
    case CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;
    case CALENDAR_TYPES.ISO_8601:
    case CALENDAR_TYPES.US:
      return weekday === SATURDAY || weekday === SUNDAY;
    default:
      throw new Error('Unsupported calendar type.');
  }
}
