import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Month from './Month';

import { getYear } from '../shared/dates';

export default class Months extends Component {
  get year() {
    const { year } = this.props;

    return getYear(year);
  }

  monthsInYear = 12

  render() {
    const { monthsInYear, year } = this;
    const { onClickMonth } = this.props;

    const months = [];

    for (let monthIndex = 0; monthIndex < monthsInYear; monthIndex += 1) {
      months.push(
        <Month
          key={monthIndex}
          month={new Date(year, monthIndex, 1)}
          onClick={onClickMonth}
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
  onClickMonth: PropTypes.func,
  year: PropTypes.instanceOf(Date).isRequired,
};
