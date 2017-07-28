import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  getBeginOfDecadeYear,
  getBeginOfYear,
  getEndOfYear,
} from '../shared/dates';

export default class Years extends Component {
  yearsInDecade = 10

  render() {
    const { decade, onClickYear, setActiveRange } = this.props;

    const start = getBeginOfDecadeYear(decade);
    const end = start + this.yearsInDecade;

    const years = [];
    for (let year = start; year < end; year += 1) {
      years.push(
        <button
          className={
            'react-calendar__year-view__years__year react-calendar__tile'
          }
          key={year}
          onClick={() => {
            if (onClickYear) onClickYear();

            if (setActiveRange) {
              const beginOfYear = getBeginOfYear(year);
              const endOfYear = getEndOfYear(year);

              setActiveRange([beginOfYear, endOfYear]);
            }
          }}
        >
          {year}
        </button>,
      );
    }

    return (
      <Grid
        className="react-calendar__year-view__years"
        grow
      >
        {years}
      </Grid>
    );
  }
}

Years.propTypes = {
  decade: PropTypes.instanceOf(Date).isRequired,
  onClickYear: PropTypes.func,
  setActiveRange: PropTypes.func,
};
