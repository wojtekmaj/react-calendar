import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import { getBeginOfYear, getEndOfYear } from '../shared/dates';
import { formatYear as defaultFormatYear } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

export default function Year({
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
      maxDateTransform={getEndOfYear}
      minDateTransform={getBeginOfYear}
      view="decade"
    >
      {formatYear(locale, date)}
    </Tile>
  );
}

Year.defaultProps = {
  formatYear: defaultFormatYear,
};

Year.propTypes = {
  ...tileProps,
  formatYear: PropTypes.func,
};
