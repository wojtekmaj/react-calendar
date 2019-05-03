import React from 'react';
import PropTypes from 'prop-types';

import WeekNumber from './WeekNumber';
import Flex from '../Flex';

import {
  getBeginOfWeek,
  getDay,
  getDayOfWeek,
  getDaysInMonth,
  getMonthIndex,
  getWeekNumber,
  getYear,
} from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

export default function WeekNumbers(props) {
  const {
    activeStartDate,
    calendarType,
    onClickWeekNumber,
    showFixedNumberOfWeeks,
  } = props;

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
    const monthIndex = getMonthIndex(activeStartDate);
    const day = getDay(activeStartDate);

    const result = [];
    for (let index = 0; index < numberOfWeeks; index += 1) {
      result.push(
        getBeginOfWeek(new Date(year, monthIndex, day + (index * 7)), calendarType),
      );
    }
    return result;
  })();

  const weekNumbers = dates.map(date => getWeekNumber(date, calendarType));

  return (
    <Flex
      className="react-calendar__month-view__weekNumbers"
      count={numberOfWeeks}
      direction="column"
      style={{ flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }}
    >
      {
        weekNumbers.map((weekNumber, weekIndex) => (
          <WeekNumber
            date={dates[weekIndex]}
            key={weekNumber}
            onClickWeekNumber={onClickWeekNumber}
            weekNumber={weekNumber}
          />
        ))
      }
    </Flex>
  );
}

WeekNumbers.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType.isRequired,
  onClickWeekNumber: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
};
