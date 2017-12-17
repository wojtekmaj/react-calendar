import { getRange } from './dates';

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
export const mergeFunctions = (...functions) => (...args) =>
  functions.filter(Boolean).forEach(f => f(...args));

/**
 * Calls a function, if it's defined, with specified arguments
 * @param {Function} fn
 * @param {Object} args
 */
export const callIfDefined = (fn, ...args) => {
  if (fn && typeof fn === 'function') {
    fn(...args);
  }
};

export const isValueWithinRange = (value, range) => (
  range[0] <= value &&
  range[1] >= value
);

export const isRangeWithinRange = (greaterRange, smallerRange) => (
  greaterRange[0] <= smallerRange[0] &&
  greaterRange[1] >= smallerRange[1]
);

export const doRangesOverlap = (range1, range2) => (
  isValueWithinRange(range1[0], range2) ||
  isValueWithinRange(range1[1], range2)
);

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {*} value Value to return.
 * @param {*} min Minimum return value.
 * @param {*} max Maximum return value.
 */
export const between = (value, min, max) => {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
};

export const getTileActivityFlags = (value, valueType, date, dateType) => {
  const flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  if (
    !date ||
    (!(value instanceof Array) && !valueType) ||
    (!(date instanceof Array) && !dateType)
  ) {
    throw new Error('getTileActivityFlags(): Unable to get tile activity flags because one or more required arguments were not passed.');
  }

  const valueRange = value instanceof Array ? value : getRange(valueType, value);
  const dateRange = date instanceof Array ? date : getRange(dateType, date);

  flags.active = isRangeWithinRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};
