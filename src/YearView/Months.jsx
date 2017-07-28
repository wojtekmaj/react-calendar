import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Month from './Month';

import { getYear } from '../shared/dates';

export default class Months extends Component {
  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  monthsInYear = 12

  render() {
    const { monthsInYear, year } = this;
    const { onClickItem } = this.props;

    const months = [];

    for (let monthIndex = 0; monthIndex < monthsInYear; monthIndex += 1) {
      months.push(
        <Month
          key={monthIndex}
          month={new Date(year, monthIndex, 1)}
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
};
