import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfDecade, getEndOfDecade, getDecadeLabel } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ classes, decade, ...otherProps }) => (
  <Tile
    {...otherProps}
    classes={[...classes, className]}
    dateTime={`${decade}T00:00:00.000`}
    maxDateTransform={getEndOfDecade}
    minDateTransform={getBeginOfDecade}
    view="century"
  >
    {getDecadeLabel(decade)}
  </Tile>
);

Decade.propTypes = {
  decade: PropTypes.number.isRequired,
  ...tileProps,
};

export default Decade;
