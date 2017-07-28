import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';

export default class Years extends Component {
  yearsInDecade = 10

  get start() {
    const { decade } = this.props;

    return getBeginOfDecadeYear(decade);
  }

  get end() {
    return this.start + this.yearsInDecade;
  }

  render() {
    const { end, start } = this;
    const { onClickYear } = this.props;

    const years = [];

    for (let year = start; year < end; year += 1) {
      years.push(
        <Year
          year={year}
          key={year}
          onClick={onClickYear}
        />,
      );
    }

    return (
      <Grid
        className="react-calendar__decade-view__years"
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
};
