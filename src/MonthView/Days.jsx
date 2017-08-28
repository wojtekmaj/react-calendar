import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Day from './Day';

import {
  getDayOfWeek,
  getDaysInMonth,
  getMonthIndex,
  getYear,
} from '../shared/dates';
import { isCalendarType, isMaxDate, isMinDate, isValue } from '../shared/propTypes';
import { getTileActivityFlags } from '../shared/utils';

export default class Days extends Component {
  getDayOfWeek(date) {
    const { calendarType } = this.props;
    return getDayOfWeek(date, calendarType);
  }

  get start() {
    const { activeStartDate } = this.props;
    return -this.getDayOfWeek(activeStartDate) + 1;
  }

  get end() {
    const { activeStartDate } = this.props;
    const { year, monthIndex } = this;
    const daysInMonth = getDaysInMonth(activeStartDate);
    const activeEndDate = new Date(year, monthIndex, daysInMonth);
    return getDaysInMonth(activeStartDate) + (7 - this.getDayOfWeek(activeEndDate) - 1);
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
      maxDate,
      minDate,
      onChange,
      value,
      valueType,
    } = this.props;

    const days = [];
    for (let day = start; day <= end; day += 1) {
      const date = new Date(year, monthIndex, day);

      days.push(
        <Day
          {...getTileActivityFlags(value, valueType, date, 'day')}
          currentMonthIndex={monthIndex}
          date={date}
          maxDate={maxDate}
          minDate={minDate}
          key={day}
          onChange={onChange}
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
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
