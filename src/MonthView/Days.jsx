import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Day from './Day';

import {
  getDaysInMonth,
  getMonthIndex,
  getYear,
  isWithinRange,
} from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

export default class Days extends Component {
  start = 1

  get end() {
    const { activeStartDate } = this.props;
    return getDaysInMonth(activeStartDate);
  }

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  get monthIndex() {
    const { activeStartDate } = this.props;
    return getMonthIndex(activeStartDate);
  }

  render() {
    const { start, end, year, monthIndex } = this;
    const {
      calendarType,
      onClickItem,
      value,
    } = this.props;

    const days = [];
    for (let day = start; day <= end; day += 1) {
      const date = new Date(year, monthIndex, day);

      days.push(
        <Day
          active={isWithinRange(value, date)}
          calendarType={calendarType}
          date={date}
          key={day}
          onClick={onClickItem}
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
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType.isRequired,
  onClickItem: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
