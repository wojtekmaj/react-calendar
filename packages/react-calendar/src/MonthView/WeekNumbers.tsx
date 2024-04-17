import React from 'react';
import { getYear, getMonth, getDate, getDaysInMonth } from '@wojtekmaj/date-utils';

import WeekNumber from './WeekNumber.js';
import Flex from '../Flex.js';

import { getBeginOfWeek, getDayOfWeek, getWeekNumber } from '../shared/dates.js';
import { mapCalendarType } from '../shared/utils.js';

import type {
  CalendarType,
  ClassName,
  DeprecatedCalendarType,
  OnClickWeekNumberFunc,
} from '../shared/types.js';

export const slotNames = ['weekNumbersView', 'weekNumberView'] as const;
type SlotName = (typeof slotNames)[number];

type WeekNumbersProps = {
  classNames?: Partial<Record<SlotName, ClassName>>;
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
   * Function called when the user clicks a week number.
   *
   * @example (weekNumber, date, event) => alert('Clicked week: ', weekNumber, 'that starts on: ', date)
   */
  onClickWeekNumber?: OnClickWeekNumberFunc;
  onMouseLeave?: () => void;
  /**
   * Whether to always show fixed number of weeks (6). Forces `showNeighboringMonth` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showFixedNumberOfWeeks?: boolean;
};

export default function WeekNumbers(props: WeekNumbersProps) {
  const {
    activeStartDate,
    calendarType: calendarTypeOrDeprecatedCalendarType,
    onClickWeekNumber,
    onMouseLeave,
    showFixedNumberOfWeeks,
    classNames = {},
  } = props;

  const calendarType = mapCalendarType(calendarTypeOrDeprecatedCalendarType);
  const numberOfWeeks = (() => {
    if (showFixedNumberOfWeeks) {
      return 6;
    }

    const numberOfDays = getDaysInMonth(activeStartDate);
    const startWeekday = getDayOfWeek(activeStartDate, calendarType);

    const days = numberOfDays - (7 - startWeekday);
    return 1 + Math.ceil(days / 7);
  })();

  const dates = (() => {
    const year = getYear(activeStartDate);
    const monthIndex = getMonth(activeStartDate);
    const day = getDate(activeStartDate);

    const result = [];
    for (let index = 0; index < numberOfWeeks; index += 1) {
      result.push(getBeginOfWeek(new Date(year, monthIndex, day + index * 7), calendarType));
    }
    return result;
  })();

  const weekNumbers = dates.map((date) => getWeekNumber(date, calendarType));

  return (
    <Flex
      className={['react-calendar__month-view__weekNumbers', classNames.weekNumbersView]}
      count={numberOfWeeks}
      direction="column"
      onFocus={onMouseLeave}
      onMouseOver={onMouseLeave}
      style={{ flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }}
    >
      {weekNumbers.map((weekNumber, weekIndex) => {
        const date = dates[weekIndex];

        if (!date) {
          throw new Error('date is not defined');
        }

        return (
          <WeekNumber
            key={weekNumber}
            date={date}
            onClickWeekNumber={onClickWeekNumber}
            weekNumber={weekNumber}
            className={classNames.weekNumberView}
          />
        );
      })}
    </Flex>
  );
}
