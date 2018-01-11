import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

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
  maxDate,
  minDate,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
}) => (
  <button
    className={mergeClassNames(
      className,
      ...classes,
      tileClassName instanceof Function ? tileClassName({ date, view: 'year' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfMonth(minDate) > date) ||
      (maxDate && getEndOfMonth(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={`${getISOLocalMonth(date)}T00:00:00.000`}>
      {formatMonth(date)}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view: 'year' }) : tileContent}
  </button>
);

Month.propTypes = {
  ...tileProps,
  formatMonth: PropTypes.func,
};

Month.defaultProps = {
  formatMonth: defaultFormatMonth,
};

export default Month;
