import React from 'react';
import PropTypes from 'prop-types';

import {
  getDay,
  getDayOfWeek,
  isWeekend,
} from '../shared/dates';
import { isCalendarType } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({ active, calendarType, date, onChange }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
      (active ? 'react-calendar__tile--active' : ''),
      (isWeekend(date) ? `${className}--weekend` : ''),
    ].join(' ')}
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
  calendarType: isCalendarType,
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func,
};

export default Day;
