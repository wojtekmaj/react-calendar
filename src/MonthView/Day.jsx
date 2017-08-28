import React from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfDay,
  getEndOfDay,
  getDay,
  isWeekend,
} from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({ active, currentMonthIndex, date, maxDate, minDate, onChange }) => (
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
    onClick={onChange && (() => onChange(date))}
  >
    <time dateTime={date.toISOString()}>
      {getDay(date)}
    </time>
  </button>
);

Day.propTypes = {
  active: PropTypes.bool.isRequired,
  currentMonthIndex: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
};

export default Day;
