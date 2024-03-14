import warning from 'warning';

import { CALENDAR_TYPES, DEPRECATED_CALENDAR_TYPES } from './const.js';
import { getRange } from './dates.js';

import type {
  CalendarType,
  ClassName,
  DeprecatedCalendarType,
  Range,
  RangeType,
  Value,
} from './types.js';

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

const rangeSlotNames = ['base', 'start', 'end', 'bothEnds'] as const;
type RangeSlotName = (typeof rangeSlotNames)[number];
export type RangeClassNames = Partial<Record<RangeSlotName, ClassName>>;
function getRangeClassNames(
  valueRange: Range<Date>,
  dateRange: Range<Date>,
  baseClassName: string,
  rangeClassNames: RangeClassNames = {},
): ClassName[] {
  const isRange = doRangesOverlap(dateRange, valueRange);

  const classNames: ClassName[] = [];

  if (isRange) {
    classNames.push(baseClassName, rangeClassNames.base);

    const isRangeStart = isValueWithinRange(valueRange[0], dateRange);
    const isRangeEnd = isValueWithinRange(valueRange[1], dateRange);

    if (isRangeStart) {
      classNames.push(`${baseClassName}Start`, rangeClassNames.start);
    }

    if (isRangeEnd) {
      classNames.push(`${baseClassName}End`, rangeClassNames.end);
    }

    if (isRangeStart && isRangeEnd) {
      classNames.push(`${baseClassName}BothEnds`, rangeClassNames.bothEnds);
    }
  }

  return classNames;
}

function isCompleteValue<T>(value: T | null | Range<T | null>): value is T | Range<T> {
  if (Array.isArray(value)) {
    return value[0] !== null && value[1] !== null;
  }

  return value !== null;
}

const tileSlotNames = ['base', 'now', 'active', 'hasActive'] as const;
type TileSlotName = (typeof tileSlotNames)[number];
export type TileClassNames = Partial<Record<TileSlotName, ClassName>> & {
  range?: RangeClassNames;
  hoverRange?: RangeClassNames;
};
export function getTileClassName(args: {
  date?: Date | Range<Date>;
  dateType?: RangeType;
  hover?: Date | null;
  value?: Value;
  valueType?: RangeType;
  tileClassNames?: TileClassNames;
}): ClassName[] {
  if (!args) {
    throw new Error('args is required');
  }

  const { value, date, hover, tileClassNames = {} } = args;

  const className = 'react-calendar__tile';
  const classNames: ClassName[] = [className, tileClassNames.base];

  if (!date) {
    return classNames;
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
    classNames.push(`${className}--now`, tileClassNames.now);
  }

  if (!value || !isCompleteValue(value)) {
    return classNames;
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
    classNames.push(`${className}--active`, tileClassNames.active);
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classNames.push(`${className}--hasActive`, tileClassNames.hasActive);
  }

  const valueRangeClassNames = getRangeClassNames(
    valueRange,
    dateRange,
    `${className}--range`,
    tileClassNames.range,
  );

  classNames.push(...valueRangeClassNames);

  const valueArray = Array.isArray(value) ? value : [value];

  if (hover && valueArray.length === 1) {
    const hoverRange: Range<Date> =
      hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]];
    const hoverRangeClassNames = getRangeClassNames(
      hoverRange,
      dateRange,
      `${className}--hover`,
      tileClassNames.hoverRange,
    );

    classNames.push(...hoverRangeClassNames);
  }

  return classNames;
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

export function pickClassNames<
  T extends Partial<Record<string, unknown>>,
  K extends keyof T & string,
>(obj: T | undefined, keys: readonly K[]): Pick<T, K> {
  if (!obj) {
    return {} as Pick<T, K>;
  }
  const pickedClassNames = {} as Pick<T, K>;
  for (const key of keys) {
    pickedClassNames[key] = obj[key];
  }
  return pickedClassNames;
}

export function mergeRangeClassNames(
  ...rangeClassNames: (RangeClassNames | undefined)[]
): RangeClassNames {
  const mergedRangeClassNames = {} as RangeClassNames;
  rangeSlotNames.forEach((rangeSlotName) => {
    mergedRangeClassNames[rangeSlotName] = rangeClassNames.map(
      (rangeClassNamesElement) => rangeClassNamesElement?.[rangeSlotName],
    );
  });
  return mergedRangeClassNames;
}

export function mergeTileClassNames(
  ...tileClassNames: (TileClassNames | undefined)[]
): TileClassNames {
  const mergedTileClassNames = {} as TileClassNames;
  tileSlotNames.forEach((tileSlotName) => {
    mergedTileClassNames[tileSlotName] = tileClassNames.map(
      (tileClassNamesElement) => tileClassNamesElement?.[tileSlotName],
    );
  });
  (['range', 'hoverRange'] as const).forEach((rangeSlotName) => {
    mergedTileClassNames[rangeSlotName] = mergeRangeClassNames(
      ...tileClassNames.map((tileClassNamesElement) => tileClassNamesElement?.[rangeSlotName]),
    );
  });
  return mergedTileClassNames;
}
