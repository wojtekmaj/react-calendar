import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '../Grid';

import {
  getBeginOfCenturyYear,
  getDecadeRange,
  getDecadeLabel,
} from '../shared/dates';

export default class Decades extends Component {
  decadesInCentury = 10

  yearsInDecade = 10

  render() {
    const { decadesInCentury, yearsInDecade } = this;
    const { century, onClickDecade, setActiveRange } = this.props;

    const start = getBeginOfCenturyYear(century);
    const end = start + (decadesInCentury * yearsInDecade);

    const decades = [];
    for (let decade = start; decade < end; decade += yearsInDecade) {
      decades.push(
        <button
          className={
            'react-calendar__decade-view__decades__decade react-calendar__tile'
          }
          key={decade}
          onClick={() => {
            if (onClickDecade) onClickDecade();

            if (setActiveRange) {
              const range = getDecadeRange(decade);

              setActiveRange(range);
            }
          }}
        >
          {getDecadeLabel(decade)}
        </button>,
      );
    }

    return (
      <Grid
        className="react-calendar__decade-view__decades"
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
