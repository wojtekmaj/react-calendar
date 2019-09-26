import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfDecade, getDecadeLabel, getEndOfDecade } from '../shared/dates';
import { formatYear as defaultFormatYear } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

export default function Decade({
  classes,
  date,
  formatYear,
  locale,
  ...otherProps
}) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(classes, className)}
      date={date}
      locale={locale}
      maxDateTransform={getEndOfDecade}
      minDateTransform={getBeginOfDecade}
      view="century"
    >
      {getDecadeLabel(locale, formatYear, date)}
    </Tile>
  );
}

Decade.defaultProps = {
  formatYear: defaultFormatYear,
};

Decade.propTypes = {
  ...tileProps,
  formatYear: PropTypes.func,
};
