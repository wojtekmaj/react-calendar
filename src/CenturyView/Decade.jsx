import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfDecade, getDecadeLabel, getEndOfDecade } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

export default function Decade({ classes, point, ...otherProps }) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(classes, className)}
      maxDateTransform={getEndOfDecade}
      minDateTransform={getBeginOfDecade}
      view="century"
    >
      {getDecadeLabel(point)}
    </Tile>
  );
}

Decade.propTypes = {
  ...tileProps,
  point: PropTypes.number.isRequired,
};
