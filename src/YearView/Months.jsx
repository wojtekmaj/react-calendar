import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  getYear,
  formatMonth,
} from '../shared/dates';

export default class Months extends Component {
  get year() {
    const { year } = this.props;

    return getYear(year);
  }

  monthsInYear = 12

  render() {
    const { monthsInYear, year } = this;
    const { onClickMonth, setActiveRange } = this.props;

    const months = [];
    for (let monthIndex = 0; monthIndex < monthsInYear; monthIndex += 1) {
      const beginOfMonth = new Date(year, monthIndex, 1);

      months.push(
        <button
          className={
            'react-calendar__year-view__months__month react-calendar__tile'
          }
          key={monthIndex}
          onClick={() => {
            if (onClickMonth) onClickMonth();

            if (setActiveRange) {
              const endOfMonth = new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);

              setActiveRange([beginOfMonth, endOfMonth]);
            }
          }}
        >
          {formatMonth(beginOfMonth)}
        </button>,
      );
    }

    return (
      <Grid
        className="react-calendar__month-view__days"
        grow
      >
        {months}
      </Grid>
    );
  }
}

Months.propTypes = {
  onClickMonth: PropTypes.func,
  setActiveRange: PropTypes.func,
  year: PropTypes.instanceOf(Date).isRequired,
};
