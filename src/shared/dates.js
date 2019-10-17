import { CALENDAR_TYPES, WEEKDAYS } from './const';
import { formatYear as defaultFormatYear } from './dateFormatter';

const SUNDAY = WEEKDAYS[0];
const FRIDAY = WEEKDAYS[5];
const SATURDAY = WEEKDAYS[6];

function isValidDate(date) {
  return !isNaN(date.getTime());
}

function makeGetRange(functions) {
  return function makeGetRangeInternal(date) {
    return functions.map(fn => fn(date));
  };
}

function makeGetEnd(getBeginOfNextPeriod) {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}

function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborInternal(date, offset = defaultOffset) {
    const previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}

/* Simple getters - getting a property of a given point in time */

export function getYear(date) {
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
}

export function getMonth(date) { return date.getMonth() + 1; }

export function getMonthIndex(date) { return date.getMonth(); }

export function getDay(date) { return date.getDate(); }

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
  const year = getYear(date) - 1;
  return year + (-year % 100) + 1;
}

export function getBeginOfCentury(date) {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear, 0, 1);
}
export const getBeginOfPreviousCentury = makeGetEdgeOfNeighbor(getYear, getBeginOfCentury, -100);
export const getBeginOfNextCentury = makeGetEdgeOfNeighbor(getYear, getBeginOfCentury, 100);

export const getEndOfCentury = makeGetEnd(getBeginOfNextCentury);
export const getEndOfPreviousCentury = makeGetEdgeOfNeighbor(getYear, getEndOfCentury, -100);
export const getEndOfNextCentury = makeGetEdgeOfNeighbor(getYear, getEndOfCentury, 100);

export const getCenturyRange = makeGetRange([getBeginOfCentury, getEndOfCentury]);

/**
 * Decade
 */
export function getBeginOfDecadeYear(date) {
  const year = getYear(date) - 1;
  return year + (-year % 10) + 1;
}

export function getBeginOfDecade(date) {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear, 0, 1);
}
export const getBeginOfPreviousDecade = makeGetEdgeOfNeighbor(
  getBeginOfDecadeYear, getBeginOfDecade, -10,
);
export const getBeginOfNextDecade = makeGetEdgeOfNeighbor(
  getBeginOfDecadeYear, getBeginOfDecade, 10,
);

export function getEndOfDecade(date) {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
}
export const getEndOfPreviousDecade = makeGetEdgeOfNeighbor(
  getBeginOfDecadeYear, getEndOfDecade, -10,
);
export const getEndOfNextDecade = makeGetEdgeOfNeighbor(
  getBeginOfDecadeYear, getEndOfDecade, 10,
);

export const getDecadeRange = makeGetRange([getBeginOfDecade, getEndOfDecade]);

/**
 * Year
 */

export function getBeginOfYear(date) {
  const year = getYear(date);
  return new Date(year, 0, 1);
}
export const getBeginOfPreviousYear = makeGetEdgeOfNeighbor(getYear, getBeginOfYear, -1);
export const getBeginOfNextYear = makeGetEdgeOfNeighbor(getYear, getBeginOfYear, 1);

export const getEndOfYear = makeGetEnd(getBeginOfNextYear);
export const getEndOfPreviousYear = makeGetEdgeOfNeighbor(getYear, getEndOfYear, -1);
export const getEndOfNextYear = makeGetEdgeOfNeighbor(getYear, getEndOfYear, 1);

export const getYearRange = makeGetRange([getBeginOfYear, getEndOfYear]);

/**
 * Month
 */

function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
  return function getBeginOfPreviousMonth(date, offset = defaultOffset) {
    const year = getYear(date);
    const previousMonthIndex = getMonthIndex(date) + offset;
    const previousMonth = new Date(year, previousMonthIndex, 1);
    return getEdgeOfPeriod(previousMonth);
  };
}

export function getBeginOfMonth(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
}
export const getBeginOfPreviousMonth = makeGetEdgeOfNeighborMonth(getBeginOfMonth, -1);
export const getBeginOfNextMonth = makeGetEdgeOfNeighborMonth(getBeginOfMonth, 1);

export const getEndOfMonth = makeGetEnd(getBeginOfNextMonth);
export const getEndOfPreviousMonth = makeGetEdgeOfNeighborMonth(getEndOfMonth, -1);
export const getEndOfNextMonth = makeGetEdgeOfNeighborMonth(getEndOfMonth, 1);

export const getMonthRange = makeGetRange([getBeginOfMonth, getEndOfMonth]);

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
 * Day
 */

export function getBeginOfDay(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day);
}

export function getEndOfDay(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day + 1, 0, 0, 0, -1);
}

export const getDayRange = makeGetRange([getBeginOfDay, getEndOfDay]);

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
    case 'century': return getBeginOfCentury(date);
    case 'decade': return getBeginOfDecade(date);
    case 'year': return getBeginOfYear(date);
    case 'month': return getBeginOfMonth(date);
    case 'day': return getBeginOfDay(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century': return getBeginOfPreviousCentury(date);
    case 'decade': return getBeginOfPreviousDecade(date);
    case 'year': return getBeginOfPreviousYear(date);
    case 'month': return getBeginOfPreviousMonth(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case 'century': return getBeginOfNextCentury(date);
    case 'decade': return getBeginOfNextDecade(date);
    case 'year': return getBeginOfNextYear(date);
    case 'month': return getBeginOfNextMonth(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getBeginPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getBeginOfPreviousDecade(date, -100);
    case 'year': return getBeginOfPreviousYear(date, -10);
    case 'month': return getBeginOfPreviousMonth(date, -12);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
};

export const getBeginNext2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getBeginOfNextDecade(date, 100);
    case 'year': return getBeginOfNextYear(date, 10);
    case 'month': return getBeginOfNextMonth(date, 12);
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
    case 'century': return getEndOfCentury(date);
    case 'decade': return getEndOfDecade(date);
    case 'year': return getEndOfYear(date);
    case 'month': return getEndOfMonth(date);
    case 'day': return getEndOfDay(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case 'century': return getEndOfPreviousCentury(date);
    case 'decade': return getEndOfPreviousDecade(date);
    case 'year': return getEndOfPreviousYear(date);
    case 'month': return getEndOfPreviousMonth(date);
    default: throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

export const getEndPrevious2 = (rangeType, date) => {
  switch (rangeType) {
    case 'decade': return getEndOfPreviousDecade(date, -100);
    case 'year': return getEndOfPreviousYear(date, -10);
    case 'month': return getEndOfPreviousMonth(date, -12);
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

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
export function getDaysInMonth(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 0).getDate();
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

/**
 * Returns local month in ISO-like format (YYYY-MM).
 */
export function getISOLocalMonth(value) {
  if (!value) {
    return value;
  }

  const date = new Date(value);

  if (!isValidDate(date)) {
    throw new Error(`Invalid date: ${value}`);
  }

  const year = getYear(date);
  const month = `0${getMonth(date)}`.slice(-2);

  return `${year}-${month}`;
}

/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 */
export function getISOLocalDate(value) {
  if (!value) {
    return value;
  }

  const date = new Date(value);

  if (!isValidDate(date)) {
    throw new Error(`Invalid date: ${value}`);
  }

  const year = getYear(date);
  const month = `0${getMonth(date)}`.slice(-2);
  const day = `0${getDay(date)}`.slice(-2);

  return `${year}-${month}-${day}`;
}
