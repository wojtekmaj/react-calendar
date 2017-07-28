import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';

export default class Years extends Component {
  yearsInDecade = 10

  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfDecadeYear(activeStartDate);
  }

  get end() {
    return this.start + this.yearsInDecade;
  }

  render() {
    const { end, start } = this;
    const { onClickItem } = this.props;

    const years = [];

    for (let year = start; year < end; year += 1) {
      years.push(
        <Year
          year={year}
          key={year}
          onClick={onClickItem}
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
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  onClickItem: PropTypes.func,
};
