import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
  isWithinRange,
  isRangeWithinRange,
} from '../shared/dates';

export default class Decades extends Component {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfCenturyYear(activeStartDate);
  }

  get end() {
    return this.start + 99;
  }

  render() {
    const { end, start } = this;
    const { onClickItem, value } = this.props;

    const decades = [];

    for (let decade = start; decade <= end; decade += 10) {
      const date = getBeginOfDecade(decade);

      decades.push(
        <Decade
          active={isWithinRange(value, date)}
          hasActive={isRangeWithinRange(value, 'decade', date)}
          date={date}
          decade={decade}
          key={decade}
          onClick={onClickItem}
        />,
      );
    }

    return (
      <Grid
        className="react-calendar__century-view__decades"
        grow
        width={110}
      >
        {decades}
      </Grid>
    );
  }
}

Decades.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  onClickItem: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
