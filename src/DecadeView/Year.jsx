import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfYear,
  getEndOfYear,
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

const Year = ({
  classes,
  date,
  maxDate,
  minDate,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
  year,
}) => (
  <button
    className={mergeClassNames(
      className,
      ...classes,
      tileClassName instanceof Function ? tileClassName({ date, view: 'decade' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfYear(minDate) > date) ||
      (maxDate && getEndOfYear(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={`${year}T00:00:00.000`}>
      {year}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view: 'decade' }) : tileContent}
  </button>
);

Year.propTypes = {
  year: PropTypes.number.isRequired,
  ...tileProps,
};

export default Year;
