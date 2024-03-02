import React from 'react';
import { getYear, getMonth, getDaysInMonth, getDayStart } from '@wojtekmaj/date-utils';

import TileGroup, { slotNames as tileGroupSlotNames } from '../TileGroup.js';
import Day, { slotNames as daySlotNames } from './Day.js';

import { getDayOfWeek } from '../shared/dates.js';
import { mapCalendarType, pickClassNames } from '../shared/utils.js';

import type { CalendarType, ClassName, DeprecatedCalendarType } from '../shared/types.js';

type TileGroupProps = React.ComponentProps<typeof TileGroup>;
type DayProps = React.ComponentProps<typeof Day>;

const localSlotName = ['daysView'] as const;
type LocalSlotName = (typeof localSlotName)[number];
export const slotNames = [...localSlotName, ...tileGroupSlotNames, ...daySlotNames] as const;

type DaysProps = {
  classNames?: TileGroupProps['classNames'] &
    DayProps['classNames'] &
    Partial<Record<LocalSlotName, ClassName>>;
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType: CalendarType | DeprecatedCalendarType | undefined;
  /**
   * Whether to always show fixed number of weeks (6). Forces `showNeighboringMonth` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showFixedNumberOfWeeks?: boolean;
  /**
   * Whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively.
   *
   * @default true
   * @example false
   */
  showNeighboringMonth?: boolean;
} & Omit<
  TileGroupProps,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start' | 'classNames'
> &
  Omit<DayProps, 'currentMonthIndex' | 'date' | 'point' | 'classNames'>;

export default function Days(props: DaysProps) {
  const {
    activeStartDate,
    calendarType: calendarTypeOrDeprecatedCalendarType,
    hover,
    showFixedNumberOfWeeks,
    showNeighboringMonth,
    value,
    valueType,
    classNames = {},
    ...otherProps
  } = props;

  const calendarType = mapCalendarType(calendarTypeOrDeprecatedCalendarType);
  const year = getYear(activeStartDate);
  const monthIndex = getMonth(activeStartDate);

  const hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
  const dayOfWeek = getDayOfWeek(activeStartDate, calendarType);

  const offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;

  /**
   * Defines on which day of the month the grid shall start. If we simply show current
   * month, we obviously start on day one, but if showNeighboringMonth is set to
   * true, we need to find the beginning of the week the first day of the month is in.
   */
  const start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;

  /**
   * Defines on which day of the month the grid shall end. If we simply show current
   * month, we need to stop on the last day of the month, but if showNeighboringMonth
   * is set to true, we need to find the end of the week the last day of the month is in.
   */
  const end = (() => {
    if (showFixedNumberOfWeeks) {
      // Always show 6 weeks
      return start + 6 * 7 - 1;
    }

    const daysInMonth = getDaysInMonth(activeStartDate);

    if (showNeighboringMonth) {
      const activeEndDate = new Date();
      activeEndDate.setFullYear(year, monthIndex, daysInMonth);
      activeEndDate.setHours(0, 0, 0, 0);
      const daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
      return daysInMonth + daysUntilEndOfTheWeek;
    }

    return daysInMonth;
  })();

  return (
    <TileGroup
      classNames={pickClassNames(
        {
          ...classNames,
          tileGroup: [
            'react-calendar__month-view__days',
            classNames.tileGroup,
            classNames.daysView,
          ],
        },
        tileGroupSlotNames,
      )}
      count={7}
      dateTransform={(day) => {
        const date = new Date();
        date.setFullYear(year, monthIndex, day);
        return getDayStart(date);
      }}
      dateType="day"
      hover={hover}
      end={end}
      renderTile={({ date, className }) => (
        <Day
          key={date.getTime()}
          classNames={pickClassNames(
            { ...classNames, dayTile: [classNames.dayTile, className] },
            daySlotNames,
          )}
          {...otherProps}
          activeStartDate={activeStartDate}
          calendarType={calendarTypeOrDeprecatedCalendarType}
          currentMonthIndex={monthIndex}
          date={date}
        />
      )}
      offset={offset}
      start={start}
      value={value}
      valueType={valueType}
    />
  );
}
