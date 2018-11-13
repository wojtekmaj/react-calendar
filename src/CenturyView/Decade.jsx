import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfDecade, getDecadeLabel, getEndOfDecade } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ classes, point, ...otherProps }) => (
  <Tile
    {...otherProps}
    classes={[...classes, className]}
    maxDateTransform={getEndOfDecade}
    minDateTransform={getBeginOfDecade}
    view="century"
  >
    {getDecadeLabel(point)}
  </Tile>
);

Decade.propTypes = {
  point: PropTypes.number.isRequired,
  ...tileProps,
};

export default Decade;
