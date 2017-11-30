import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class WeekNumbers extends Component {
  get numberOfDays() {
    const { activeStartDate } = this.props;
    return getDaysInMonth(activeStartDate);
  }

  get startWeekday() {
    const { activeStartDate, calendarType } = this.props;
    return getDayOfWeek(activeStartDate, calendarType);
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

  get numberOfWeeks() {
    const days = this.numberOfDays - (7 - this.startWeekday);
    return 1 + Math.ceil(days / 7);
  }

  render() {
    const {
      year,
      monthIndex,
      numberOfWeeks,
      day,
    } = this;
    const { calendarType, onClickWeekNumber } = this.props;

    const weekDates = [];
    const weekNumbers = [];
    for (let index = 0; index < this.numberOfWeeks; index += 1) {
      const date = new Date(year, monthIndex, day + (index * 7));
      weekDates.push(getBeginOfWeek(date));
      weekNumbers.push(getWeekNumber(date, calendarType));
    }

    const Tag = onClickWeekNumber ? 'button' : 'div';

    return (
      <Flex
        className="react-calendar__month-view__weekNumbers"
        count={numberOfWeeks}
        direction="column"
        style={{ flexBasis: 'calc(100% * (1 / 8)', flexShrink: 0 }}
      >
        {
          weekNumbers.map((weekNumber, weekIndex) => (
            <Tag
              className="react-calendar__tile"
              key={weekNumber}
              onClick={onClickWeekNumber &&
                (() => onClickWeekNumber(weekNumber, weekDates[weekIndex]))
              }
              style={{ flexGrow: 1 }}
              type={onClickWeekNumber ? 'button' : null}
            >
              <span>{weekNumber}</span>
            </Tag>
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
};
