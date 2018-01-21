import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfYear, getEndOfYear } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

const Year = ({ classes, year, ...otherProps }) => (
  <Tile
    {...otherProps}
    classes={[...classes, className]}
    dateTime={`${year}T00:00:00.000`}
    maxDateTransform={getEndOfYear}
    minDateTransform={getBeginOfYear}
    view="decade"
  >
    {year}
  </Tile>
);

Year.propTypes = {
  year: PropTypes.number.isRequired,
  ...tileProps,
};

export default Year;
