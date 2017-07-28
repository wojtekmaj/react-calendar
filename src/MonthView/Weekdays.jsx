import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  formatShortWeekday,
  getBeginOfMonth,
  getDayOfWeek,
  getMonthIndex,
  getYear,
} from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

export default class Weekdays extends Component {
  get beginOfMonth() {
    const { month } = this.props;

    return getBeginOfMonth(month);
  }

  get year() {
    const { beginOfMonth } = this;

    return getYear(beginOfMonth);
  }

  get monthIndex() {
    const { beginOfMonth } = this;

    return getMonthIndex(beginOfMonth);
  }

  render() {
    const { beginOfMonth, year, monthIndex } = this;
    const { calendarType } = this.props;

    const weekdays = [];

    for (let weekday = 1; weekday <= 7; weekday += 1) {
      const weekdayDate =
        new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));

      weekdays.push(
        <div key={weekday}>
          {formatShortWeekday(weekdayDate)}
        </div>,
      );
    }

    return (
      <Grid
        className="react-calendar__month-view__weekdays"
        count={7}
        grow
      >
        {weekdays}
      </Grid>
    );
  }
}

Weekdays.defaultProps = {
  calendarType: 'ISO 8601',
  month: new Date(),
};

Weekdays.propTypes = {
  calendarType: isCalendarType,
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
