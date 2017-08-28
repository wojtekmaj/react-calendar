import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getDayOfWeek,
  getDaysInMonth,
  getWeekNumber,
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

  get startWeekNumber() {
    const { activeStartDate, calendarType } = this.props;
    return getWeekNumber(activeStartDate, calendarType);
  }

  get numberOfWeeks() {
    const days = this.numberOfDays - (7 - this.startWeekday);
    const weeks = 1 + Math.ceil(days / 7);

    return weeks;
  }

  render() {
    const { startWeekNumber } = this;
    const weekNumbers = [];
    for (let index = 0; index < this.numberOfWeeks; index += 1) {
      const currentNumber = index + startWeekNumber;
      weekNumbers.push(currentNumber > 52 ? currentNumber % 52 : currentNumber);
    }

    return (
      <div className="react-calendar__month-view__weekNumbers">
        {
          weekNumbers.map(weekNumber => (
            <div
              className="react-calendar__tile"
              key={weekNumber}
            >
              {weekNumber}
            </div>
          ))
        }
      </div>
    );
  }
}

WeekNumbers.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType.isRequired,
};
