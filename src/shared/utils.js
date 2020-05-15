import { getRange } from './dates';

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {*} value Value to return.
 * @param {*} min Minimum return value.
 * @param {*} max Maximum return value.
 */
export function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}

export function isValueWithinRange(value, range) {
  return (
    range[0] <= value
    && range[1] >= value
  );
}

export function isRangeWithinRange(greaterRange, smallerRange) {
  return (
    greaterRange[0] <= smallerRange[0]
    && greaterRange[1] >= smallerRange[1]
  );
}

export function doRangesOverlap(range1, range2) {
  return (
    isValueWithinRange(range1[0], range2)
    || isValueWithinRange(range1[1], range2)
  );
}

function getRangeClassNames(valueRange, dateRange, baseClassName) {
  const isRange = doRangesOverlap(dateRange, valueRange);

  const classes = [];

  if (isRange) {
    classes.push(baseClassName);

    const isRangeStart = isValueWithinRange(valueRange[0], dateRange);
    const isRangeEnd = isValueWithinRange(valueRange[1], dateRange);

    if (isRangeStart) {
      classes.push(`${baseClassName}Start`);
    }

    if (isRangeEnd) {
      classes.push(`${baseClassName}End`);
    }

    if (isRangeStart && isRangeEnd) {
      classes.push(`${baseClassName}BothEnds`);
    }
  }

  return classes;
}

export function getTileClasses({
  value, valueType, date, dateType, hover,
} = {}) {
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
  }

  const valueRangeClassNames = getRangeClassNames(valueRange, dateRange, `${className}--range`);

  classes.push(...valueRangeClassNames);

  if (hover) {
    const hoverRange = hover > valueRange[1] ? [valueRange[1], hover] : [hover, valueRange[0]];
    const hoverRangeClassNames = getRangeClassNames(hoverRange, dateRange, `${className}--hover`);

    classes.push(...hoverRangeClassNames);
  }

  return classes;
}
