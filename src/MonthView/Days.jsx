import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Day from './Day';

import {
  getDaysInMonth,
  getMonthIndex,
  getYear,
} from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

export default class Days extends Component {
  get year() {
    const { month } = this.props;

    return getYear(month);
  }

  get monthIndex() {
    const { month } = this.props;

    return getMonthIndex(month);
  }

  render() {
    const { year, monthIndex } = this;
    const { calendarType, month, onClickDay, setActiveRange } = this.props;

    const days = [];
    for (let day = 1; day <= getDaysInMonth(month); day += 1) {
      days.push(
        <Day
          calendarType={calendarType}
          day={new Date(year, monthIndex, day)}
          key={day}
          onClick={onClickDay}
          setActiveRange={setActiveRange}
        />,
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
  calendarType: isCalendarType,
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickDay: PropTypes.func,
  setActiveRange: PropTypes.func,
};
