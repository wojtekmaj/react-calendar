import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
  getBeginOfMonth,
  getEndOfMonth,
  getISOLocalMonth,
} from '../shared/dates';
import { formatMonth as defaultFormatMonth } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__year-view__months__month';

const Month = ({
  classes,
  date,
  formatMonth,
  locale,
  ...otherProps
}) => (
  <Tile
    {...otherProps}
    classes={[...classes, className]}
    date={date}
    dateTime={`${getISOLocalMonth(date)}T00:00:00.000`}
    maxDateTransform={getEndOfMonth}
    minDateTransform={getBeginOfMonth}
    view="year"
  >
    {formatMonth(date, locale)}
  </Tile>
);

Month.defaultProps = {
  formatMonth: defaultFormatMonth,
};

Month.propTypes = {
  ...tileProps,
  formatMonth: PropTypes.func,
  locale: PropTypes.string,
};

export default Month;
