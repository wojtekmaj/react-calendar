import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfYear, getEndOfYear } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

const Year = ({ classes, point, ...otherProps }) => (
  <Tile
    {...otherProps}
    classes={[...classes, className]}
    dateTime={`${point}T00:00:00.000`}
    maxDateTransform={getEndOfYear}
    minDateTransform={getBeginOfYear}
    view="decade"
  >
    {point}
  </Tile>
);

Year.propTypes = {
  point: PropTypes.number.isRequired,
  ...tileProps,
};

export default Year;
