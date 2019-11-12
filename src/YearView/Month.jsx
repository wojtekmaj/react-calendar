import React from 'react';
import PropTypes from 'prop-types';
import { getMonthStart, getMonthEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile';

import {
  formatMonth as defaultFormatMonth,
  formatMonthYear as defaultFormatMonthYear,
} from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__year-view__months__month';

export default function Month({
  classes,
  date,
  formatMonth = defaultFormatMonth,
  formatMonthYear = defaultFormatMonthYear,
  locale,
  ...otherProps
}) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(classes, className)}
      date={date}
      formatAbbr={formatMonthYear}
      locale={locale}
      maxDateTransform={getMonthEnd}
      minDateTransform={getMonthStart}
      view="year"
    >
      {formatMonth(locale, date)}
    </Tile>
  );
}

Month.propTypes = {
  ...tileProps,
  formatMonth: PropTypes.func,
  formatMonthYear: PropTypes.func,
};
