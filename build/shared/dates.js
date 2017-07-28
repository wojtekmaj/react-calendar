'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWeekend = exports.getDecadeLabel = exports.getCenturyLabel = exports.getDaysInMonth = exports.getNextRange2 = exports.getPreviousRange2 = exports.getNextRange = exports.getPreviousRange = exports.getRange = exports.getDayRange = exports.getNextMonthRange = exports.getPreviousMonthRange = exports.getMonthRange = exports.getEndOfMonth = exports.getBeginOfMonth = exports.getNextYearRange = exports.getPreviousYearRange = exports.getYearRange = exports.getEndOfYear = exports.getBeginOfYear = exports.getNextDecadeRange = exports.getPreviousDecadeRange = exports.getDecadeRange = exports.getEndOfDecade = exports.getBeginOfDecade = exports.getBeginOfDecadeYear = exports.getNextCenturyRange = exports.getPreviousCenturyRange = exports.getCenturyRange = exports.getEndOfCentury = exports.getBeginOfCentury = exports.getBeginOfCenturyYear = exports.getDayOfWeek = exports.getDay = exports.getMonth = exports.getMonthIndex = exports.getYear = exports.formatShortWeekday = exports.formatLongWeekday = exports.formatMonth = exports.formatMonthYear = exports.formatDate = exports.getFormatter = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash.once');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getLocales = (0, _lodash2.default)(function () {
  var languageList = [];

  if (window.navigator.languages) {
    languageList.push.apply(languageList, _toConsumableArray(window.navigator.languages));
  } else if (window.navigator.userLanguage) {
    languageList.push(window.navigator.userLanguage);
  }

  // Fallback
  languageList.push('en-GB');

  return languageList;
});

var getLocale = (0, _lodash2.default)(function () {
  return getLocales()[0];
});

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = exports.getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getLocale();

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

var formatLongWeekday = exports.formatLongWeekday = function formatLongWeekday(date) {
  return getFormatter({ weekday: 'long' })(date);
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

var getMonth = exports.getMonth = function getMonth(date) {
  return getMonthIndex(date) + 1;
};

var getDay = exports.getDay = function getDay(date) {
  return date.getDate();
};

var getDayOfWeek = exports.getDayOfWeek = function getDayOfWeek(date) {
  var calendarType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ISO 8601';

  var weekday = date.getDay();

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

var getBeginOfCenturyYear = exports.getBeginOfCenturyYear = function getBeginOfCenturyYear(date) {
  var year = getYear(date);

  return year + -year % 100 + 1;
};

var getBeginOfCentury = exports.getBeginOfCentury = function getBeginOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear, 0, 1);
};

var getEndOfCentury = exports.getEndOfCentury = function getEndOfCentury(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);

  return new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1);
};

var getCenturyRange = exports.getCenturyRange = function getCenturyRange(date) {
  var beginOfCenturyYear = getBeginOfCenturyYear(date);

  return [new Date(beginOfCenturyYear, 0, 1), new Date(beginOfCenturyYear + 100, 0, 0, 0, 0, 0, -1)];
};

var getPreviousCenturyRange = exports.getPreviousCenturyRange = function getPreviousCenturyRange(date) {
  var previousCenturyYear = getYear(date) - 100;

  return getCenturyRange(previousCenturyYear);
};

var getNextCenturyRange = exports.getNextCenturyRange = function getNextCenturyRange(date) {
  var nextCenturyYear = getYear(date) + 100;

  return getCenturyRange(nextCenturyYear);
};

var getBeginOfDecadeYear = exports.getBeginOfDecadeYear = function getBeginOfDecadeYear(date) {
  var year = getYear(date);

  return year + -year % 10 + 1;
};

var getBeginOfDecade = exports.getBeginOfDecade = function getBeginOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);

  return new Date(beginOfDecadeYear, 0, 1);
};

var getEndOfDecade = exports.getEndOfDecade = function getEndOfDecade(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);

  return new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1);
};

var getDecadeRange = exports.getDecadeRange = function getDecadeRange(date) {
  var beginOfDecadeYear = getBeginOfDecadeYear(date);

  return [new Date(beginOfDecadeYear, 0, 1), new Date(beginOfDecadeYear + 10, 0, 1, 0, 0, 0, -1)];
};

var getPreviousDecadeRange = exports.getPreviousDecadeRange = function getPreviousDecadeRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var previousDecadeYear = getBeginOfDecadeYear(date) - offset;

  return getDecadeRange(previousDecadeYear);
};

var getNextDecadeRange = exports.getNextDecadeRange = function getNextDecadeRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var nextDecadeYear = getBeginOfDecadeYear(date) + offset;

  return getDecadeRange(nextDecadeYear);
};

/**
 * Returns the beginning of a given year.
 *
 * @param {Date} date Date.
 */
var getBeginOfYear = exports.getBeginOfYear = function getBeginOfYear(date) {
  var year = getYear(date);

  return new Date(year, 0, 1);
};

/**
 * Returns the end of a given year.
 *
 * @param {Date} date Date.
 */
var getEndOfYear = exports.getEndOfYear = function getEndOfYear(date) {
  var year = getYear(date);

  return new Date(year + 1, 0, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given year.
 *
 * @param {Date} date Date.
 */
var getYearRange = exports.getYearRange = function getYearRange(date) {
  var year = getYear(date);

  return [new Date(year, 0, 1), new Date(year + 1, 0, 1, 0, 0, 0, -1)];
};

var getPreviousYearRange = exports.getPreviousYearRange = function getPreviousYearRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var previousYear = getYear(date) - offset;

  return getYearRange(previousYear);
};

var getNextYearRange = exports.getNextYearRange = function getNextYearRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var nextYear = getYear(date) + offset;

  return getYearRange(nextYear);
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
var getEndOfMonth = exports.getEndOfMonth = function getEndOfMonth(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);

  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

/**
 * Returns an array with the beginning and the end of a given month.
 *
 * @param {Date} date Date.
 */
var getMonthRange = exports.getMonthRange = function getMonthRange(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);

  return [new Date(year, monthIndex, 1), new Date(year, monthIndex + 1, 1, 0, 0, 0, -1)];
};

var getPreviousMonthRange = exports.getPreviousMonthRange = function getPreviousMonthRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var previousMonthIndex = getMonthIndex(date) - offset;

  return [new Date(year, previousMonthIndex, 1), new Date(year, previousMonthIndex + 1, 1, 0, 0, 0, -1)];
};

var getNextMonthRange = exports.getNextMonthRange = function getNextMonthRange(date) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var year = getYear(date);
  var nextMonthIndex = getMonthIndex(date) + offset;

  return [new Date(year, nextMonthIndex, 1), new Date(year, nextMonthIndex + 1, 1, 0, 0, 0, -1)];
};

/**
 * Returns an array with the beginning and the end of a given day.
 *
 * @param {Date} date Date.
 */
var getDayRange = exports.getDayRange = function getDayRange(date) {
  var year = getYear(date);
  var monthIndex = getMonthIndex(date);
  var day = getDay(date);

  return [new Date(year, monthIndex, day), new Date(year, monthIndex, day + 1, 0, 0, 0, -1)];
};

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

var getPreviousRange = exports.getPreviousRange = function getPreviousRange(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getPreviousCenturyRange(date);
    case 'decade':
      return getPreviousDecadeRange(date);
    case 'year':
      return getPreviousYearRange(date);
    case 'month':
      return getPreviousMonthRange(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getNextRange = exports.getNextRange = function getNextRange(rangeType, date) {
  switch (rangeType) {
    case 'century':
      return getNextCenturyRange(date);
    case 'decade':
      return getNextDecadeRange(date);
    case 'year':
      return getNextYearRange(date);
    case 'month':
      return getNextMonthRange(date);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getPreviousRange2 = exports.getPreviousRange2 = function getPreviousRange2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getPreviousDecadeRange(date, 100);
    case 'year':
      return getPreviousYearRange(date, 10);
    case 'month':
      return getPreviousMonthRange(date, 12);
    default:
      throw new Error('Invalid rangeType: ' + rangeType);
  }
};

var getNextRange2 = exports.getNextRange2 = function getNextRange2(rangeType, date) {
  switch (rangeType) {
    case 'decade':
      return getNextDecadeRange(date, 100);
    case 'year':
      return getNextYearRange(date, 10);
    case 'month':
      return getNextMonthRange(date, 12);
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

  return weekday === 5 || weekday === 6;
};