'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTileActivityFlags = exports.doRangesOverlap = exports.isRangeWithinRange = exports.isValueWithinRange = exports.mergeFunctions = undefined;

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

var isValueWithinRange = exports.isValueWithinRange = function isValueWithinRange(value, range) {
  return range[0].getTime() <= value.getTime() && range[1].getTime() >= value.getTime();
};

var isRangeWithinRange = exports.isRangeWithinRange = function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0].getTime() <= smallerRange[0].getTime() && greaterRange[1].getTime() >= smallerRange[1].getTime();
};

var doRangesOverlap = exports.doRangesOverlap = function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
};

var getTileActivityFlags = exports.getTileActivityFlags = function getTileActivityFlags(value, valueType, date, dateType) {
  var flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  if (!date || !(value instanceof Array) && !valueType || !(date instanceof Array) && !dateType) {
    throw new Error('getTileActivityFlags(): Unable to get tile activity flags because one or more required arguments were not passed.');
  }

  var valueRange = value instanceof Array ? value : (0, _dates.getRange)(valueType, value);
  var dateRange = date instanceof Array ? date : (0, _dates.getRange)(dateType, date);

  flags.active = isRangeWithinRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};