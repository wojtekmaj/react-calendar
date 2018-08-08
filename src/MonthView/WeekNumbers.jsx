import React, { PureComponent } from 'react';
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

export default class WeekNumbers extends PureComponent {
  get startWeekday() {
    const { activeStartDate, calendarType } = this.props;
    return getDayOfWeek(activeStartDate, calendarType);
  }

  get numberOfDays() {
    const { activeStartDate } = this.props;
    return getDaysInMonth(activeStartDate);
  }

  get numberOfWeeks() {
    const { showFixedNumberOfWeeks } = this.props;

    if (showFixedNumberOfWeeks) {
      return 6;
    }

    const days = this.numberOfDays - (7 - this.startWeekday);
    return 1 + Math.ceil(days / 7);
  }

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  get monthIndex() {
    const { activeStartDate } = this.props;
    return getMonthIndex(activeStartDate);
  }

  get day() {
    const { activeStartDate } = this.props;
    return getDay(activeStartDate);
  }

  get dates() {
    const {
      year, monthIndex, numberOfWeeks, day,
    } = this;
    const { calendarType } = this.props;

    const dates = [];
    for (let index = 0; index < numberOfWeeks; index += 1) {
      dates.push(
        getBeginOfWeek(new Date(year, monthIndex, day + (index * 7)), calendarType),
      );
    }
    return dates;
  }

  get weekNumbers() {
    const { dates } = this;
    const { calendarType } = this.props;
    return dates.map(date => getWeekNumber(date, calendarType));
  }

  render() {
    const { dates, numberOfWeeks, weekNumbers } = this;
    const { onClickWeekNumber } = this.props;

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
}

WeekNumbers.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType.isRequired,
  onClickWeekNumber: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
};
