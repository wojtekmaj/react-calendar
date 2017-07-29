import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
} from '../shared/dates';
import { getTileActivityFlags } from '../shared/utils';
import { isValue } from '../shared/propTypes';

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
    const { onChange, value, valueType } = this.props;

    const decades = [];
    for (let decade = start; decade <= end; decade += 10) {
      const date = getBeginOfDecade(decade);

      decades.push(
        <Decade
          {...getTileActivityFlags(value, valueType, date, 'decade')}
          date={date}
          decade={decade}
          key={decade}
          onChange={onChange}
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
  onChange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
