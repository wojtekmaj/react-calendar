import React from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfYear,
  getEndOfYear,
} from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

const Year = ({ active, date, hasActive, maxDate, minDate, onClick, renderChildren, year }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    disabled={
      (minDate && getBeginOfYear(minDate) > date) ||
      (maxDate && getEndOfYear(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={year}>
      {year}
    </time>
    {renderChildren && renderChildren({ date, view: 'decade' })}
  </button>
);

Year.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hasActive: PropTypes.bool.isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  renderChildren: PropTypes.func,
  year: PropTypes.number.isRequired,
};

export default Year;
