import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  formatShortWeekday,
  getDayOfWeek,
  getMonthIndex,
  getYear,
} from '../shared/dates';

export default class Weekdays extends Component {
  get year() {
    const { beginOfMonth } = this.props;

    return getYear(beginOfMonth);
  }

  get monthIndex() {
    const { beginOfMonth } = this.props;

    return getMonthIndex(beginOfMonth);
  }

  render() {
    const { year, monthIndex } = this;
    const { beginOfMonth, calendarType } = this.props;

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
  beginOfMonth: PropTypes.instanceOf(Date),
  calendarType: PropTypes.oneOf(['ISO 8601', 'US']),
};
