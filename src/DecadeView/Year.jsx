import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfYear, getEndOfYear } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

export default function Year({ classes, point, ...otherProps }) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(classes, className)}
      maxDateTransform={getEndOfYear}
      minDateTransform={getBeginOfYear}
      view="decade"
    >
      {point}
    </Tile>
  );
}

Year.propTypes = {
  ...tileProps,
  point: PropTypes.number.isRequired,
};
