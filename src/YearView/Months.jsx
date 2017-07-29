import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Month from './Month';

import {
  getYear,
  isWithinRange,
  isRangeWithinRange,
} from '../shared/dates';

export default class Months extends Component {
  start = 0

  end = 11

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  render() {
    const { end, start, year } = this;
    const { onClickItem, value } = this.props;

    const months = [];

    for (let monthIndex = start; monthIndex <= end; monthIndex += 1) {
      const date = new Date(year, monthIndex, 1);

      months.push(
        <Month
          active={isWithinRange(value, date)}
          hasActive={isRangeWithinRange(value, 'month', date)}
          key={monthIndex}
          date={date}
          onClick={onClickItem}
        />,
      );
    }

    return (
      <Grid
        className="react-calendar__year-view__months"
        grow
      >
        {months}
      </Grid>
    );
  }
}

Months.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  onClickItem: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
