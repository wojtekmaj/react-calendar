import React from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfDay,
  getDay,
  getDayOfWeek,
  getEndOfDay,
  isWeekend,
} from '../shared/dates';
import { isCalendarType, isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({ active, calendarType, currentMonthIndex, date, maxDate, minDate, onChange }) => (
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
    style={(getDay(date) === 1) ? {
      gridColumnStart: getDayOfWeek(date, calendarType) + 1,
    } : null}
  >
    <time dateTime={date.toISOString()}>
      {getDay(date)}
    </time>
  </button>
);

Day.propTypes = {
  active: PropTypes.bool.isRequired,
  calendarType: isCalendarType.isRequired,
  currentMonthIndex: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
};

export default Day;
