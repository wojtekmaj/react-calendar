import React from 'react';
import { getYear, getMonth, getDate, getDaysInMonth } from '@wojtekmaj/date-utils';

import WeekNumber from './WeekNumber.js';
import Flex from '../Flex.js';

import { getBeginOfWeek, getDayOfWeek, getWeekNumber } from '../shared/dates.js';
import { mapCalendarType } from '../shared/utils.js';

import type {
  CalendarType,
  DeprecatedCalendarType,
  OnClickWeekNumberFunc,
} from '../shared/types.js';

type WeekNumbersProps = {
  activeStartDate: Date;
  calendarType: CalendarType | DeprecatedCalendarType | undefined;
  onClickWeekNumber?: OnClickWeekNumberFunc;
  onMouseLeave?: () => void;
  showFixedNumberOfWeeks?: boolean;
};

export default function WeekNumbers(props: WeekNumbersProps) {
  const {
    activeStartDate,
    calendarType: calendarTypeOrDeprecatedCalendarType,
    onClickWeekNumber,
    onMouseLeave,
    showFixedNumberOfWeeks,
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
      className="react-calendar__month-view__weekNumbers"
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
          />
        );
      })}
    </Flex>
  );
}
