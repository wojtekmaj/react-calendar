import React from 'react';
import PropTypes from 'prop-types';
import { getYearStart, getYearEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile';

import { formatYear as defaultFormatYear } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

export default function Year({
  classes,
  date,
  formatYear = defaultFormatYear,
  locale,
  ...otherProps
}) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(classes, className)}
      date={date}
      locale={locale}
      maxDateTransform={getYearEnd}
      minDateTransform={getYearStart}
      view="decade"
    >
      {formatYear(locale, date)}
    </Tile>
  );
}

Year.propTypes = {
  ...tileProps,
  formatYear: PropTypes.func,
};
