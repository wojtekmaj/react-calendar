import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';
import Decade from './Decade';

import { getBeginOfCenturyYear } from '../shared/dates';

export default class Decades extends Component {
  decadesInCentury = 10

  yearsInDecade = 10

  get start() {
    const { century } = this.props;
    return getBeginOfCenturyYear(century);
  }

  get end() {
    return this.start + (this.decadesInCentury * this.yearsInDecade);
  }

  render() {
    const { yearsInDecade, end, start } = this;
    const { onClickDecade, setActiveRange } = this.props;

    const decades = [];

    for (let decade = start; decade < end; decade += yearsInDecade) {
      decades.push(
        <Decade
          decade={decade}
          key={decade}
          onClick={onClickDecade}
          setActiveRange={setActiveRange}
        />,
      );
    }

    return (
      <Grid
        className="react-calendar__century-view__decades"
        grow
      >
        {decades}
      </Grid>
    );
  }
}

Decades.propTypes = {
  century: PropTypes.instanceOf(Date).isRequired,
  onClickDecade: PropTypes.func,
  setActiveRange: PropTypes.func,
};
