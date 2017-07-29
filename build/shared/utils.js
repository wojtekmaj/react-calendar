'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTileActivityFlags = exports.mergeFunctions = undefined;

var _dates = require('./dates');

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
var mergeFunctions = exports.mergeFunctions = function mergeFunctions() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return functions.filter(function (f) {
      return f;
    }).forEach(function (f) {
      return f.apply(undefined, args);
    });
  };
};

var isValueWithinRange = function isValueWithinRange(value, range) {
  return range[0].getTime() <= value.getTime() && range[1].getTime() >= value.getTime();
};

var isRangeCoveringRange = function isRangeCoveringRange(valueRange, dateRange) {
  return valueRange[0].getTime() <= dateRange[0].getTime() && valueRange[1].getTime() >= dateRange[1].getTime();
};

var doRangesOverlap = function doRangesOverlap(valueRange, dateRange) {
  return isValueWithinRange(valueRange[0], dateRange) || // Value begins in date
  isValueWithinRange(valueRange[1], dateRange) || // Value ends in date
  isRangeCoveringRange(valueRange, dateRange) // Value covers date
  ;
};

var getTileActivityFlags = exports.getTileActivityFlags = function getTileActivityFlags(value, valueType, date, dateType) {
  var flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  var valueRange = value instanceof Array ? value : (0, _dates.getRange)(valueType, value);
  var dateRange = date instanceof Array ? date : (0, _dates.getRange)(dateType, date);

  flags.active = isRangeCoveringRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};