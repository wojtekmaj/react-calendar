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
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  get monthIndex() {
    const { activeStartDate } = this.props;
    return getMonthIndex(activeStartDate);
  }

  render() {
    const { year, monthIndex } = this;
    const {
      activeStartDate,
      calendarType,
      onClickItem,
    } = this.props;

    const days = [];
    for (let day = 1; day <= getDaysInMonth(activeStartDate); day += 1) {
      days.push(
        <Day
          calendarType={calendarType}
          day={new Date(year, monthIndex, day)}
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
  calendarType: isCalendarType,
  onClickItem: PropTypes.func,
};
