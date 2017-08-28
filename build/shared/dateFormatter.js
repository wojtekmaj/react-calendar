'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatShortWeekday = exports.formatMonth = exports.formatMonthYear = exports.formatDate = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _locales = require('./locales');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatterCache = {};

/**
 * Gets Intl-based date formatter from formatter cache. If it doesn't exist in cache
 * just yet, it will be created on the fly.
 */
var getFormatter = function getFormatter(options) {
  var locales = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _locales.getLocale)();

  var stringifiedOptions = (0, _stringify2.default)(options);

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