'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeekend = exports.getDecadeLabel = exports.getCenturyLabel = exports.getDaysInMonth = exports.getBeginNext2 = exports.getBeginPrevious2 = exports.getBeginNext = exports.getBeginPrevious = exports.getBegin = exports.getRange = exports.getWeekNumber = exports.getBeginOfMonth = exports.getBeginOfDecade = exports.getBeginOfDecadeYear = exports.getBeginOfCenturyYear = exports.getDayOfWeek = exports.getDay = exports.getMonthIndex = exports.getYear = exports.formatShortWeekday = exports.formatMonth = exports.formatMonthYear = exports.formatDate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _locales = require('./locales');

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = JSON.stringify(options);

  if (!formatterCache[locales]) {
    formatterCache[locales] = {};
  }

  if (!formatterCache[locales][stringifiedOptions]) {
    formatterCache[locales][stringifiedOptions] = new Intl.DateTimeFormat(locales, options).format;
  }

  return formatterCache[locales][stringifiedOptions];
};

var formatDate = exports.formatDate = function formatDate(date) {
  return getFormatter({ day: 'numeric', month: 'numeric', year: 'numeric' })(date);
};

var formatMonthYear = exports.formatMonthYear = function formatMonthYear(date) {
  return getFormatter({ month: 'long', year: 'numeric' })(date);
};

var formatMonth = exports.formatMonth = function formatMonth(date) {
  return getFormatter({ month: 'long' })(date);
};

var formatShortWeekday = exports.formatShortWeekday = function formatShortWeekday(date) {
  return getFormatter({ weekday: 'short' })(date);
};

/* Simple getters - getting a property of a given point in time */

var getYear = exports.getYear = function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  if (typeof date === 'number') {
    return date;
  }

  var year = parseInt(date, 10);

  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }

  throw new Error('Failed to get year from date: ' + date + '.');
};

var getMonthIndex = exports.getMonthIndex = function getMonthIndex(date) {
  return date.getMonth();
};

var getDay = exports.getDay = function getDay(date) {
  return date.getDate();
};

var getDayOfWeek = exports.getDayOfWeek = function getDayOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var weekday = date.getDay();

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

var getBeginOfCenturyYear = exports.getBeginOfCenturyYear = function getBeginOfCenturyYear(date) {
  var year = getYear(date);
  return year + -year % 100 + 1;
};

var getBeginOfCentury = function getBeginOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear, 0, 1);
};

var getEndOfCentury = function getEndOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);
  return new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1);
};

var getCenturyRange = function getCenturyRange(date) {
  return [getBeginOfCentury(date), getEndOfCentury(date)];
};

var getBeginOfPreviousCentury = function getBeginOfPreviousCentury(date) {
  var previousCenturyYear = getYear(date) - 100;
  return getBeginOfCentury(previousCenturyYear);
};

var getBeginOfNextCentury = function getBeginOfNextCentury(date) {
  var nextCenturyYear = getYear(date) + 100;
  return getBeginOfCentury(nextCenturyYear);
};

var getBeginOfDecadeYear = exports.getBeginOfDecadeYear = function getBeginOfDecadeYear(date) {
  var year = getYear(date) - 1;
  return year + -year % 10 + 1;
};

var getBeginOfDecade = exports.getBeginOfDecade = function getBeginOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear, 0, 1);
};

var getEndOfDecade = function getEndOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);
  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
};

var getDecadeRange = function getDecadeRange(date) {
  return [getBeginOfDecade(date), getEndOfDecade(date)];
};

var getBeginOfPreviousDecade = function getBeginOfPreviousDecade(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var previousDecadeYear = getBeginOfDecadeYear(date) - offset;
  return getBeginOfDecade(previousDecadeYear);
};

var getBeginOfNextDecade = function getBeginOfNextDecade(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var nextDecadeYear = getBeginOfDecadeYear(date) + offset;
  return getBeginOfDecade(nextDecadeYear);
};

/**
 * Returns the beginning of a given year.
 *
 * @param {Date} date Date.
 */
var getBeginOfYear = function getBeginOfYear(date) {
  var year = getYear(date);
  return new Date(year, 0, 1);
};

/**
 * Returns the end of a given year.
 *
 * @param {Date} date Date.
 */
var getEndOfYear = function getEndOfYear(date) {
  var year = getYear(date);
  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given year.
 *
 * @param {Date} date Date.
 */
var getYearRange = function getYearRange(date) {
  return [getBeginOfYear(date), getEndOfYear(date)];
};

var getBeginOfPreviousYear = function getBeginOfPreviousYear(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var previousYear = getYear(date) - offset;
  return getBeginOfYear(previousYear);
};

var getBeginOfNextYear = function getBeginOfNextYear(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var nextYear = getYear(date) + offset;
  return getBeginOfYear(nextYear);
};

/**
 * Returns the beginning of a given month.
 *
 * @param {Date} date Date.
 */
var getBeginOfMonth = exports.getBeginOfMonth = function getBeginOfMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
};

/**
 * Returns the end of a given month.
 *
 * @param {Date} date Date.
 */
var getEndOfMonth = function getEndOfMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
var getMonthRange = function getMonthRange(date) {
  return [getBeginOfMonth(date), getEndOfMonth(date)];
};

var getBeginOfPreviousMonth = function getBeginOfPreviousMonth(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var previousMonthIndex = getMonthIndex(date) - offset;
  return getBeginOfMonth(new Date(year, previousMonthIndex, 1));
};

var getBeginOfNextMonth = function getBeginOfNextMonth(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var nextMonthIndex = getMonthIndex(date) + offset;
  return getBeginOfMonth(new Date(year, nextMonthIndex, 1));
};

var getBeginOfDay = function getBeginOfDay(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = getDay(date);
  return new Date(year, monthIndex, day);
};

var getEndOfDay = function getEndOfDay(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = getDay(date);
  return new Date(year, monthIndex, day + 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
var getDayRange = function getDayRange(date) {
  return [getBeginOfDay(date), getEndOfDay(date)];
};

var getWeekNumber = exports.getWeekNumber = function getWeekNumber(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var tempDate = new Date(+date);
  tempDate.setDate(getDay(tempDate) + (4 - getDayOfWeek(tempDate, calendarType)));
  var yearStart = getBeginOfYear(tempDate);
  return Math.ceil((tempDate - yearStart) / 8.64e7 / 7);
};

/**
 * Returns an array with the beginning and the end of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
var getRange = exports.getRange = function getRange(rangeType, date) {
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
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

/**
 * Returns the beginning of a given range.
 *
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
var getBegin = exports.getBegin = function getBegin(rangeType, date) {
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
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginPrevious = exports.getBeginPrevious = function getBeginPrevious(rangeType, date) {
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
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginNext = exports.getBeginNext = function getBeginNext(rangeType, date) {
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
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginPrevious2 = exports.getBeginPrevious2 = function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getBeginOfPreviousDecade(date, 100);
    case 'year':
      return getBeginOfPreviousYear(date, 10);
    case 'month':
      return getBeginOfPreviousMonth(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getBeginNext2 = exports.getBeginNext2 = function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getBeginOfNextDecade(date, 100);
    case 'year':
      return getBeginOfNextYear(date, 10);
    case 'month':
      return getBeginOfNextMonth(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
var getDaysInMonth = exports.getDaysInMonth = function getDaysInMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 0).getDate();
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2001-2100.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
var getCenturyLabel = exports.getCenturyLabel = function getCenturyLabel(date) {
  var _getCenturyRange = getCenturyRange(date),
      _getCenturyRange2 = _slicedToArray(_getCenturyRange, 2),
      start = _getCenturyRange2[0],
      end = _getCenturyRange2[1];

  var startLabel = getYear(start);
  var endLabel = getYear(end);
  return startLabel + ' \u2013 ' + endLabel;
};

/**
 * Returns a string labelling a century of a given date.
 * For example, for 2017 it will return 2011-2020.
 *
 * @param {Date|String|Number} date Date or a year as a string or as a number.
 */
var getDecadeLabel = exports.getDecadeLabel = function getDecadeLabel(date) {
  var _getDecadeRange = getDecadeRange(date),
      _getDecadeRange2 = _slicedToArray(_getDecadeRange, 2),
      start = _getDecadeRange2[0],
      end = _getDecadeRange2[1];

  var startLabel = getYear(start);
  var endLabel = getYear(end);
  return startLabel + ' \u2013 ' + endLabel;
};

/**
 * Returns a boolean determining whether a given date is on Saturday or Sunday.
 * @param {Date} date Date.
 */
var isWeekend = exports.isWeekend = function isWeekend(date) {
  var weekday = getDayOfWeek(date);
  return weekday >= 5;
};