import warning from 'tiny-warning';

import { CALENDAR_TYPES, DEPRECATED_CALENDAR_TYPES } from './const.js';
import { getRange } from './dates.js';

import type { CalendarType, DeprecatedCalendarType, Range, RangeType, Value } from './types.js';

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {Date} value Value to return.
 * @param {Date} min Minimum return value.
 * @param {Date} max Maximum return value.
 * @returns {Date} Value between min and max.
 */
export function between<T extends Date>(value: T, min?: T | null, max?: T | null): T {
  if (min && min > value) {
    return min;
  }

  if (max && max < value) {
    return max;
  }

  return value;
}

export function isValueWithinRange(value: Date, range: Range<Date>): boolean {
  return range[0] <= value && range[1] >= value;
}

export function isRangeWithinRange(greaterRange: Range<Date>, smallerRange: Range<Date>): boolean {
  return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
}

export function doRangesOverlap(range1: Range<Date>, range2: Range<Date>): boolean {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
}

function getRangeClassNames(
  valueRange: Range<Date>,
  dateRange: Range<Date>,
  baseClassName: string,
): string[] {
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

function isCompleteValue<T>(value: T | null | Range<T | null>): value is T | Range<T> {
  if (Array.isArray(value)) {
    return value[0] !== null && value[1] !== null;
  }

  return value !== null;
}

export function getTileClasses(args: {
  date?: Date | Range<Date>;
  dateType?: RangeType;
  hover?: Date | null;
  value?: Value;
  valueType?: RangeType;
}): string[] {
  if (!args) {
    throw new Error('args is required');
  }

  const { value, date, hover } = args;

  const className = 'react-calendar__tile';
  const classes = [className];

  if (!date) {
    return classes;
  }

  const now = new Date();
  const dateRange = (() => {
    if (Array.isArray(date)) {
      return date;
    }

    const { dateType } = args;

    if (!dateType) {
      throw new Error('dateType is required when date is not an array of two dates');
    }

    return getRange(dateType, date);
  })();

  if (isValueWithinRange(now, dateRange)) {
    classes.push(`${className}--now`);
  }

  if (!value || !isCompleteValue(value)) {
    return classes;
  }

  const valueRange = (() => {
    if (Array.isArray(value)) {
      return value;
    }

    const { valueType } = args;

    if (!valueType) {
      throw new Error('valueType is required when value is not an array of two dates');
    }

    return getRange(valueType, value);
  })();

  if (isRangeWithinRange(valueRange, dateRange)) {
    classes.push(`${className}--active`);
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classes.push(`${className}--hasActive`);
  }

  const valueRangeClassNames = getRangeClassNames(valueRange, dateRange, `${className}--range`);

  classes.push(...valueRangeClassNames);

  const valueArray = Array.isArray(value) ? value : [value];

  if (hover && valueArray.length === 1) {
    const hoverRange: Range<Date> =
      hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]];
    const hoverRangeClassNames = getRangeClassNames(hoverRange, dateRange, `${className}--hover`);

    classes.push(...hoverRangeClassNames);
  }

  return classes;
}

const calendarTypeMap: Record<DeprecatedCalendarType, CalendarType> = {
  [DEPRECATED_CALENDAR_TYPES.ARABIC]: CALENDAR_TYPES.ISLAMIC,
  [DEPRECATED_CALENDAR_TYPES.HEBREW]: CALENDAR_TYPES.HEBREW,
  [DEPRECATED_CALENDAR_TYPES.ISO_8601]: CALENDAR_TYPES.ISO_8601,
  [DEPRECATED_CALENDAR_TYPES.US]: CALENDAR_TYPES.GREGORY,
};

function isDeprecatedCalendarType(
  calendarType: CalendarType | DeprecatedCalendarType | undefined,
): calendarType is DeprecatedCalendarType {
  return calendarType !== undefined && calendarType in DEPRECATED_CALENDAR_TYPES;
}

let warned = false;

export function mapCalendarType(
  calendarTypeOrDeprecatedCalendarType?: CalendarType | DeprecatedCalendarType,
): CalendarType | undefined {
  if (isDeprecatedCalendarType(calendarTypeOrDeprecatedCalendarType)) {
    const calendarType = calendarTypeMap[calendarTypeOrDeprecatedCalendarType];

    warning(
      warned,
      `Specifying calendarType="${calendarTypeOrDeprecatedCalendarType}" is deprecated. Use calendarType="${calendarType}" instead.`,
    );

    warned = true;

    return calendarType;
  }

  return calendarTypeOrDeprecatedCalendarType;
}
