import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  getISOLocalDate,
  isWeekend,
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({
  classes,
  currentMonthIndex,
  date,
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
      isWeekend(date) && `${className}--weekend`,
      date.getMonth() !== currentMonthIndex && `${className}--neighboringMonth`,
      tileClassName instanceof Function ? tileClassName({ date, view: 'month' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfDay(minDate) > date) ||
      (maxDate && getEndOfDay(maxDate) < date)
    }
    key={date}
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={`${getISOLocalDate(date)}T00:00:00.000`}>
      {getDay(date)}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view: 'month' }) : tileContent}
  </button>
);

Day.propTypes = {
  currentMonthIndex: PropTypes.number.isRequired,
  ...tileProps,
};

export default Day;
