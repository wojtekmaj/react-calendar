import { getRange } from './dates';

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
export const mergeFunctions = (...functions) => (...args) =>
  functions.filter(f => f).forEach(f => f(...args));

export const isValueWithinRange = (value, range) => (
  range[0].getTime() <= value.getTime() &&
  range[1].getTime() >= value.getTime()
);

export const isRangeWithinRange = (greaterRange, smallerRange) => (
  greaterRange[0].getTime() <= smallerRange[0].getTime() &&
  greaterRange[1].getTime() >= smallerRange[1].getTime()
);

export const doRangesOverlap = (range1, range2) => (
  isValueWithinRange(range1[0], range2) ||
  isValueWithinRange(range1[1], range2)
);

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
