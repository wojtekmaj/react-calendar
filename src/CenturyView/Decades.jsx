import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Decade from './Decade';

import { getBeginOfCenturyYear } from '../shared/dates';

export default class Decades extends Component {
  decadesInCentury = 10

  yearsInDecade = 10

  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfCenturyYear(activeStartDate);
  }

  get end() {
    return this.start + (this.decadesInCentury * this.yearsInDecade);
  }

  render() {
    const { yearsInDecade, end, start } = this;
    const { onClickItem } = this.props;

    const decades = [];

    for (let decade = start; decade < end; decade += yearsInDecade) {
      decades.push(
        <Decade
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
};
