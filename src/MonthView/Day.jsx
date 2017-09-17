import React from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  isWeekend,
} from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({ active, currentMonthIndex, date, maxDate, minDate, onClick, renderChildren }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
      (active ? 'react-calendar__tile--active' : ''),
      (isWeekend(date) ? `${className}--weekend` : ''),
      (date.getMonth() !== currentMonthIndex ? `${className}--neighboringMonth` : ''),
    ].join(' ')}
    disabled={
      (minDate && getBeginOfDay(minDate) > date) ||
      (maxDate && getEndOfDay(maxDate) < date)
    }
    key={date}
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={date.toISOString()}>
      {getDay(date)}
    </time>
    {renderChildren && renderChildren({ date, view: 'month' })}
  </button>
);

Day.propTypes = {
  active: PropTypes.bool.isRequired,
  currentMonthIndex: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  renderChildren: PropTypes.func,
};

export default Day;
