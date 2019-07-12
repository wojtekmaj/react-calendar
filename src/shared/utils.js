import { getRange } from './dates';

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
export const mergeFunctions = (...functions) => (...args) => functions
  .filter(Boolean).forEach(f => f(...args));

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
  range[0] <= value
  && range[1] >= value
);

export const isRangeWithinRange = (greaterRange, smallerRange) => (
  greaterRange[0] <= smallerRange[0]
  && greaterRange[1] >= smallerRange[1]
);

export const doRangesOverlap = (range1, range2) => (
  isValueWithinRange(range1[0], range2)
  || isValueWithinRange(range1[1], range2)
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

export const getTileClasses = ({
  value, valueType, date, dateType, hover,
} = {}) => {
  const className = 'react-calendar__tile';
  const classes = [className];

  if (!date) {
    return classes;
  }

  if (!(date instanceof Array) && !dateType) {
    throw new Error('getTileClasses(): Unable to get tile activity classes because one or more required arguments were not passed.');
  }

  const now = new Date();
  const dateRange = date instanceof Array ? date : getRange(dateType, date);

  if (isValueWithinRange(now, dateRange)) {
    classes.push(`${className}--now`);
  }

  if (!value) {
    return classes;
  }

  if (!(value instanceof Array) && !valueType) {
    throw new Error('getTileClasses(): Unable to get tile activity classes because one or more required arguments were not passed.');
  }

  const valueRange = value instanceof Array ? value : getRange(valueType, value);

  if (isRangeWithinRange(valueRange, dateRange)) {
    classes.push(`${className}--active`);
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classes.push(`${className}--hasActive`);
  } else if (
    hover && (
      // Date before value
      (
        dateRange[1] < valueRange[0]
        && doRangesOverlap(dateRange, [hover, valueRange[0]])
      )
      // Date after value
      || (
        dateRange[0] > valueRange[1]
        && doRangesOverlap(dateRange, [valueRange[1], hover])
      )
    )
  ) {
    classes.push(`${className}--hover`);
  }

  const isRangeStart = isValueWithinRange(valueRange[0], dateRange);
  const isRangeEnd = isValueWithinRange(valueRange[1], dateRange);

  if (isRangeStart) {
    classes.push(`${className}--rangeStart`);
  }

  if (isRangeEnd) {
    classes.push(`${className}--rangeEnd`);
  }

  if (isRangeStart && isRangeEnd) {
    classes.push(`${className}--rangeBothEnds`);
  }

  return classes;
};
