const [
  // eslint-disable-next-line no-unused-vars
  SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY,
] = [...Array(7)].map((el, index) => index);

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

export function getDayOfWeek(date, calendarType = 'ISO 8601') {
  const weekday = date.getDay();

  switch (calendarType) {
    case 'ISO 8601':
      // Shifts days of the week so that Monday is 0, Sunday is 6
      return (weekday + 6) % 7;
    case 'Arabic':
      return (weekday + 1) % 7;
    case 'Hebrew':
    case 'US':
      return weekday;
    default:
      throw new Error('Unsupported calendar type.');
  }
}

/* Complex getters - getting a property somehow related to a given point in time */

export function getBeginOfCenturyYear(date) {
  const year = getYear(date) - 1;
  return year + (-year % 100) + 1;
}

export function getBeginOfCentury(date) {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear, 0, 1);
}

export function getEndOfCentury(date) {
  const beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear + 100, 0, 1, 0, 0, 0, -1);
}

export function getCenturyRange(date) {
  return [
    getBeginOfCentury(date),
    getEndOfCentury(date),
  ];
}

export function getBeginOfPreviousCentury(date) {
  const previousCenturyYear = getYear(date) - 100;
  return getBeginOfCentury(previousCenturyYear);
}

export function getEndOfPreviousCentury(date) {
  const previousCenturyYear = getYear(date) - 100;
  return getEndOfCentury(previousCenturyYear);
}

export function getBeginOfNextCentury(date) {
  const nextCenturyYear = getYear(date) + 100;
  return getBeginOfCentury(nextCenturyYear);
}

export function getBeginOfDecadeYear(date) {
  const year = getYear(date) - 1;
  return year + (-year % 10) + 1;
}

export function getBeginOfDecade(date) {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear, 0, 1);
}

export function getEndOfDecade(date) {
  const beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
}

export function getDecadeRange(date) {
  return [
    getBeginOfDecade(date),
    getEndOfDecade(date),
  ];
}

export function getBeginOfPreviousDecade(date, offset = 10) {
  const previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getBeginOfDecade(previousDecadeYear);
}

export function getEndOfPreviousDecade(date, offset = 10) {
  const previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getEndOfDecade(previousDecadeYear);
}

export function getBeginOfNextDecade(date, offset = 10) {
  const nextDecadeYear = getBeginOfDecadeYear(date) + offset;
  return getBeginOfDecade(nextDecadeYear);
}

/**
 * Returns the beginning of a given year.
 *
 * @param {Date} date Date.
 */
export function getBeginOfYear(date) {
  const year = getYear(date);
  return new Date(year, 0, 1);
}

/**
 * Returns the end of a given year.
 *
 * @param {Date} date Date.
 */
export function getEndOfYear(date) {
  const year = getYear(date);
  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
}

/**
 * Returns an array with the beginning and the end of a given year.
 *
 * @param {Date} date Date.
 */
export function getYearRange(date) {
  return [
    getBeginOfYear(date),
    getEndOfYear(date),
  ];
}

export function getBeginOfPreviousYear(date, offset = 1) {
  const previousYear = getYear(date) - offset;
  return getBeginOfYear(previousYear);
}

export function getEndOfPreviousYear(date, offset = 1) {
  const previousYear = getYear(date) - offset;
  return getEndOfYear(previousYear);
}

export function getBeginOfNextYear(date, offset = 1) {
  const nextYear = getYear(date) + offset;
  return getBeginOfYear(nextYear);
}

/**
 * Returns the beginning of a given month.
 *
 * @param {Date} date Date.
 */
export function getBeginOfMonth(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
}

/**
 * Returns the end of a given month.
 *
 * @param {Date} date Date.
 */
export function getEndOfMonth(date) {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
}

/**
 * Returns the beginning of a given week.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export function getBeginOfWeek(date, calendarType = 'ISO 8601') {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}

/**
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
export function getMonthRange(date) {
  return [
    getBeginOfMonth(date),
    getEndOfMonth(date),
  ];
}

function getDifferentMonth(date, offset) {
  const year = getYear(date);
  const previousMonthIndex = getMonthIndex(date) + offset;
  return new Date(year, previousMonthIndex, 1);
}

export function getBeginOfPreviousMonth(date, offset = 1) {
  const previousMonth = getDifferentMonth(date, -offset);
  return getBeginOfMonth(previousMonth);
}

export function getEndOfPreviousMonth(date, offset = 1) {
  const previousMonth = getDifferentMonth(date, -offset);
  return getEndOfMonth(previousMonth);
}

export function getBeginOfNextMonth(date, offset = 1) {
  const nextMonth = getDifferentMonth(date, offset);
  return getBeginOfMonth(nextMonth);
}

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

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
export function getDayRange(date) {
  return [
    getBeginOfDay(date),
    getEndOfDay(date),
  ];
}

/**
 * Gets week number according to ISO 8601 or US standard.
 * In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
 * In US calendar week 1 is the one with January 1.
 *
 * @param {Date} date Date.
 * @param {String} calendarType Calendar type. Can be ISO 8601 or US.
 */
export function getWeekNumber(date, calendarType = 'ISO 8601') {
  const calendarTypeForWeekNumber = calendarType === 'US' ? 'US' : 'ISO 8601';
  const beginOfWeek = getBeginOfWeek(date, calendarTypeForWeekNumber);
  let year = getYear(date) + 1;
  let dayInWeekOne;
  let beginOfFirstWeek;

  // Look for the first week one that does not come after a given date
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === 'ISO 8601' ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarTypeForWeekNumber);
    year -= 1;
  } while (date - beginOfFirstWeek < 0);

  return Math.round((beginOfWeek - beginOfFirstWeek) / (8.64e7 * 7)) + 1;
}

/**
 * Returns the beginning of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export function getBegin(rangeType, date) {
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
}

export function getBeginPrevious(rangeType, date) {
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
}

export function getBeginNext(rangeType, date) {
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
}

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
export function getEnd(rangeType, date) {
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
}

export function getEndPrevious(rangeType, date) {
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
}

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
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export function getRange(rangeType, date) {
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

function toYearLabel([start, end]) {
  return `${getYear(start)} – ${getYear(end)}`;
}

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export function getCenturyLabel(date) {
  return toYearLabel(getCenturyRange(date));
}

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
export function getDecadeLabel(date) {
  return toYearLabel(getDecadeRange(date));
}

/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 *
 * @param {Date} date Date.
 */
export function isWeekend(date, calendarType = 'ISO 8601') {
  const weekday = date.getDay();
  switch (calendarType) {
    case 'Arabic':
    case 'Hebrew':
      return weekday === FRIDAY || weekday === SATURDAY;
    case 'ISO 8601':
    case 'US':
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

  if (isNaN(date.getTime())) {
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

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  const year = getYear(date);
  const month = `0${getMonth(date)}`.slice(-2);
  const day = `0${getDay(date)}`.slice(-2);

  return `${year}-${month}-${day}`;
}
