import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
  getBeginOfMonth,
  getEndOfMonth,
} from '../shared/dates';
import {
  formatMonth as defaultFormatMonth,
  formatMonthYear,
} from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__year-view__months__month';

export default function Month({
  classes,
  date,
  formatMonth,
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
      maxDateTransform={getEndOfMonth}
      minDateTransform={getBeginOfMonth}
      view="year"
    >
      {formatMonth(locale, date)}
    </Tile>
  );
}

Month.defaultProps = {
  formatMonth: defaultFormatMonth,
};

Month.propTypes = {
  ...tileProps,
  formatMonth: PropTypes.func,
};
