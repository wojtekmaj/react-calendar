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

import { CALENDAR_TYPES, WEEKDAYS } from './const.js';
import { formatYear as defaultFormatYear } from './dateFormatter.js';

import type { CalendarType, RangeType } from './types.js';

const SUNDAY = WEEKDAYS[0];
const FRIDAY = WEEKDAYS[5];
const SATURDAY = WEEKDAYS[6];

/* Simple getters - getting a property of a given point in time */

/**
 * Gets day of the week of a given date.
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Day of the week.
 */
export function getDayOfWeek(
  date: Date,
  calendarType: CalendarType = CALENDAR_TYPES.ISO_8601,
): number {
  const weekday = date.getDay();

  switch (calendarType) {
    case CALENDAR_TYPES.ISO_8601:
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case CALENDAR_TYPES.ISLAMIC:
      return (weekday + 1) % 7;
    case CALENDAR_TYPES.HEBREW:
    case CALENDAR_TYPES.GREGORY:
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
}

/**
 * Century
 */

/**
 * Gets the year of the beginning of a century of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a century.
 */
export function getBeginOfCenturyYear(date: Date): number {
  const beginOfCentury = getCenturyStart(date);
  return getYear(beginOfCentury);
}

/**
 * Decade
 */

/**
 * Gets the year of the beginning of a decade of a given date.
 * @param {Date} date Date.
 * @returns {number} Year of the beginning of a decade.
 */
export function getBeginOfDecadeYear(date: Date): number {
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
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {Date} Beginning of a given week.
 */
export function getBeginOfWeek(
  date: Date,
  calendarType: CalendarType = CALENDAR_TYPES.ISO_8601,
): Date {
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
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {number} Week number.
 */
export function getWeekNumber(
  date: Date,
  calendarType: CalendarType = CALENDAR_TYPES.ISO_8601,
): number {
  const calendarTypeForWeekNumber =
    calendarType === CALENDAR_TYPES.GREGORY ? CALENDAR_TYPES.GREGORY : CALENDAR_TYPES.ISO_8601;
  const beginOfWeek = getBeginOfWeek(date, calendarType);
  let year = getYear(date) + 1;
  let dayInWeekOne: Date;
  let beginOfFirstWeek: Date;

  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date < beginOfFirstWeek);

  return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (8.64e7 * 7)) + 1;
}

/**
 * Others
 */

/**
 * Returns the beginning of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a given range.
 */
export function getBegin(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'century':
      return getCenturyStart(date);
    case 'decade':
      return getDecadeStart(date);
    case 'year':
      return getYearStart(date);
    case 'month':
      return getMonthStart(date);
    case 'day':
      return getDayStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Returns the beginning of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a previous given range.
 */
export function getBeginPrevious(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyStart(date);
    case 'decade':
      return getPreviousDecadeStart(date);
    case 'year':
      return getPreviousYearStart(date);
    case 'month':
      return getPreviousMonthStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Returns the beginning of a next given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} Beginning of a next given range.
 */
export function getBeginNext(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'century':
      return getNextCenturyStart(date);
    case 'decade':
      return getNextDecadeStart(date);
    case 'year':
      return getNextYearStart(date);
    case 'month':
      return getNextMonthStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginPrevious2(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'decade':
      return getPreviousDecadeStart(date, -100);
    case 'year':
      return getPreviousYearStart(date, -10);
    case 'month':
      return getPreviousMonthStart(date, -12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginNext2(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'decade':
      return getNextDecadeStart(date, 100);
    case 'year':
      return getNextYearStart(date, 10);
    case 'month':
      return getNextMonthStart(date, 12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Returns the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a given range.
 */
export function getEnd(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'century':
      return getCenturyEnd(date);
    case 'decade':
      return getDecadeEnd(date);
    case 'year':
      return getYearEnd(date);
    case 'month':
      return getMonthEnd(date);
    case 'day':
      return getDayEnd(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Returns the end of a previous given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date} End of a previous given range.
 */
export function getEndPrevious(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyEnd(date);
    case 'decade':
      return getPreviousDecadeEnd(date);
    case 'year':
      return getPreviousYearEnd(date);
    case 'month':
      return getPreviousMonthEnd(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getEndPrevious2(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case 'decade':
      return getPreviousDecadeEnd(date, -100);
    case 'year':
      return getPreviousYearEnd(date, -10);
    case 'month':
      return getPreviousMonthEnd(date, -12);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 * @returns {Date[]} Beginning and end of a given range.
 */
export function getRange(rangeType: RangeType, date: Date): [Date, Date] {
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
}

/**
 * Creates a range out of two values, ensuring they are in order and covering entire period ranges.
 *
 * @param {RangeType} rangeType Range type (e.g. 'day')
 * @param {Date} date1 First date.
 * @param {Date} date2 Second date.
 * @returns {Date[]} Beginning and end of a given range.
 */
export function getValueRange(rangeType: RangeType, date1: Date, date2: Date): [Date, Date] {
  const rawNextValue = [date1, date2].sort((a, b) => a.getTime() - b.getTime()) as [Date, Date];
  return [getBegin(rangeType, rawNextValue[0]), getEnd(rangeType, rawNextValue[1])];
}

function toYearLabel(
  locale: string | undefined,
  formatYear: ((locale: string | undefined, date: Date) => string) | undefined,
  dates: Date[],
): string {
  return dates.map((date) => (formatYear || defaultFormatYear)(locale, date)).join(' – ');
}

/**
 * @callback FormatYear
 * @param {string} locale Locale.
 * @param {Date} date Date.
 * @returns {string} Formatted year.
 */

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a century of a given date.
 */
export function getCenturyLabel(
  locale: string | undefined,
  formatYear: ((locale: string | undefined, date: Date) => string) | undefined,
  date: Date,
): string {
  return toYearLabel(locale, formatYear, getCenturyRange(date));
}

/**
 * Returns a string labelling a decade of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {string} locale Locale.
 * @param {FormatYear} formatYear Function to format a year.
 * @param {Date|string|number} date Date or a year as a string or as a number.
 * @returns {string} String labelling a decade of a given date.
 */
export function getDecadeLabel(
  locale: string | undefined,
  formatYear: ((locale: string | undefined, date: Date) => string) | undefined,
  date: Date,
): string {
  return toYearLabel(locale, formatYear, getDecadeRange(date));
}

/**
 * Returns a boolean determining whether a given date is the current day of the week.
 *
 * @param {Date} date Date.
 * @returns {boolean} Whether a given date is the current day of the week.
 */
export function isCurrentDayOfWeek(date: Date): boolean {
  return date.getDay() === new Date().getDay();
}

/**
 * Returns a boolean determining whether a given date is a weekend day.
 *
 * @param {Date} date Date.
 * @param {CalendarType} [calendarType="iso8601"] Calendar type.
 * @returns {boolean} Whether a given date is a weekend day.
 */
export function isWeekend(
  date: Date,
  calendarType: CalendarType = CALENDAR_TYPES.ISO_8601,
): boolean {
  const weekday = date.getDay();

  switch (calendarType) {
    case CALENDAR_TYPES.ISLAMIC:
    case CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;
    case CALENDAR_TYPES.ISO_8601:
    case CALENDAR_TYPES.GREGORY:
      return weekday === SATURDAY || weekday === SUNDAY;
    default:
      throw new Error('Unsupported calendar type.');
  }
}
