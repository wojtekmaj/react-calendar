import React from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfMonth,
  getEndOfMonth,
} from '../shared/dates';
import { formatMonth } from '../shared/dateFormatter';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__year-view__months__month';

const Month = ({ active, date, hasActive, maxDate, minDate, onClick, renderChildren }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    disabled={
      (minDate && getBeginOfMonth(minDate) > date) ||
      (maxDate && getEndOfMonth(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={date.toISOString()}>
      {formatMonth(date)}
    </time>
    {renderChildren && renderChildren({ date, view: 'year' })}
  </button>
);

Month.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hasActive: PropTypes.bool.isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  renderChildren: PropTypes.func,
};

export default Month;
