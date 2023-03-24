import React from 'react';
import PropTypes from 'prop-types';
import { getYear, getMonth, getDate, getDaysInMonth } from '@wojtekmaj/date-utils';

import WeekNumber from './WeekNumber';
import Flex from '../Flex';

import { getBeginOfWeek, getDayOfWeek, getWeekNumber } from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

import type { CalendarType, OnClickWeekNumberFunc } from '../shared/types';

type WeekNumbersProps = {
  activeStartDate: Date;
  calendarType: CalendarType;
  onClickWeekNumber?: OnClickWeekNumberFunc;
  onMouseLeave?: () => void;
  showFixedNumberOfWeeks?: boolean;
};

export default function WeekNumbers(props: WeekNumbersProps) {
  const { activeStartDate, calendarType, onClickWeekNumber, onMouseLeave, showFixedNumberOfWeeks } =
    props;

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

WeekNumbers.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
};
