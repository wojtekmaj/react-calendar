import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  getDay,
  getDayOfWeek,
  getDaysInMonth,
  getMonthIndex,
  getYear,
  isWeekend,
} from '../shared/dates';

export default class Days extends Component {
  get year() {
    const { month } = this.props;

    return getYear(month);
  }

  get monthIndex() {
    const { month } = this.props;

    return getMonthIndex(month);
  }

  /*
  get beginOfMonth() {
    const { month } = this.props;

    return getBeginOfMonth(month);
  }

  get endOfMonth() {
    const { month } = this.props;

    return getEndOfMonth(month);
  }

  get beginOfGrid() {
    const { year, monthIndex, beginOfMonth } = this;
    const { calendarType } = this.props;

    return new Date(year, monthIndex, 1 - getDayOfWeek(beginOfMonth, calendarType));
  }

  get endOfGrid() {
    const { year, monthIndex, endOfMonth } = this;
    const { calendarType } = this.props;

    return new Date(year, monthIndex + 1, 6 - getDayOfWeek(endOfMonth, calendarType));
  }
  */

  render() {
    const { year, monthIndex } = this;
    const { calendarType, month, onClickDay, setActiveRange } = this.props;

    const days = [];
    const className = 'react-calendar__month-view__days__day';

    for (let day = 1; day <= getDaysInMonth(month); day += 1) {
      const beginOfDay = new Date(year, monthIndex, day);

      days.push(
        <button
          className={
            `${className} react-calendar__tile ${
              isWeekend(beginOfDay) ?
              ' react-calendar__month-view__days__day--weekend' :
              ''
            }`
          }
          key={day}
          onClick={() => {
            if (onClickDay) onClickDay();

            if (setActiveRange) {
              const endOfDay = new Date(year, monthIndex, day + 1, 0, 0, 0, -1);

              setActiveRange([beginOfDay, endOfDay]);
            }
          }}
          style={(day === 1) ? {
            gridColumnStart: getDayOfWeek(beginOfDay, calendarType) + 1,
          } : null}
        >
          {getDay(beginOfDay)}
        </button>,
      );
    }

    return (
      <Grid
        className="react-calendar__month-view__days"
        count={7}
        grow
      >
        {days}
      </Grid>
    );
  }
}

Days.propTypes = {
  calendarType: PropTypes.oneOf(['ISO 8601', 'US']),
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickDay: PropTypes.func,
  setActiveRange: PropTypes.func,
};
