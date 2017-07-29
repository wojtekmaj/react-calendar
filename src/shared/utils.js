import { getRange } from './dates';

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
export const mergeFunctions = (...functions) => (...args) =>
  functions.filter(f => f).forEach(f => f(...args));

const isValueWithinRange = (value, range) => (
  range[0].getTime() <= value.getTime() &&
  range[1].getTime() >= value.getTime()
);

const isRangeCoveringRange = (valueRange, dateRange) => (
  valueRange[0].getTime() <= dateRange[0].getTime() &&
  valueRange[1].getTime() >= dateRange[1].getTime()
);

const doRangesOverlap = (valueRange, dateRange) => (
  isValueWithinRange(valueRange[0], dateRange) || // Value begins in date
  isValueWithinRange(valueRange[1], dateRange) || // Value ends in date
  isRangeCoveringRange(valueRange, dateRange) // Value covers date
);

export const getTileActivityFlags = (value, valueType, date, dateType) => {
  const flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  const valueRange = value instanceof Array ? value : getRange(valueType, value);
  const dateRange = date instanceof Array ? date : getRange(dateType, date);

  flags.active = isRangeCoveringRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};
