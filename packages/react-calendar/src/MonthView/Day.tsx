import React from 'react';
import { getDayStart, getDayEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { isWeekend } from '../shared/dates.js';
import {
  formatDay as defaultFormatDay,
  formatLongDate as defaultFormatLongDate,
} from '../shared/dateFormatter.js';
import { mapCalendarType } from '../shared/utils.js';

import type { CalendarType, ClassName, DeprecatedCalendarType } from '../shared/types.js';

const className = 'react-calendar__month-view__days__day';

export const slotNames = ['dayTile', 'weekendDayTile', 'neighbouringMonthDayTile'] as const;
type SlotName = (typeof slotNames)[number];

type DayProps = {
  classNames?: Partial<Record<SlotName, ClassName>>;
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType: CalendarType | DeprecatedCalendarType | undefined;
  currentMonthIndex: number;
  /**
   * Function called to override default formatting of day tile labels. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'd')
   */
  formatDay?: typeof defaultFormatDay;
  /**
   * Function called to override default formatting of day tile `abbr` labels. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'dd MMM YYYY')
   */
  formatLongDate?: typeof defaultFormatLongDate;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'formatAbbr' | 'maxDateTransform' | 'minDateTransform' | 'view' | 'className'
>;

export default function Day({
  calendarType: calendarTypeOrDeprecatedCalendarType,
  classNames = {},
  currentMonthIndex,
  formatDay = defaultFormatDay,
  formatLongDate = defaultFormatLongDate,
  ...otherProps
}: DayProps) {
  const calendarType = mapCalendarType(calendarTypeOrDeprecatedCalendarType);
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      className={[
        className,
        classNames.dayTile,
        isWeekend(date, calendarType)
          ? [`${className}--weekend`, classNames.weekendDayTile]
          : undefined,
        date.getMonth() !== currentMonthIndex
          ? [`${className}--neighboringMonth`, classNames.neighbouringMonthDayTile]
          : undefined,
      ]}
      formatAbbr={formatLongDate}
      maxDateTransform={getDayEnd}
      minDateTransform={getDayStart}
      view="month"
    >
      {formatDay(locale, date)}
    </Tile>
  );
}
