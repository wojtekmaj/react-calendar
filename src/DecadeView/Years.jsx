import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Year from './Year';

import {
  getBeginOfDecadeYear,
  isWithinRange,
  isRangeWithinRange,
} from '../shared/dates';

export default class Years extends Component {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfDecadeYear(activeStartDate);
  }

  get end() {
    return this.start + 9;
  }

  render() {
    const { end, start } = this;
    const { onClickItem, value } = this.props;

    const years = [];

    for (let year = start; year <= end; year += 1) {
      const date = new Date(year, 0, 1);

      years.push(
        <Year
          active={isWithinRange(value, date)}
          hasActive={isRangeWithinRange(value, 'year', date)}
          date={date}
          key={year}
          onClick={onClickItem}
          year={year}
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
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
