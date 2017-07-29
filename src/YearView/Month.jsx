import React from 'react';
import PropTypes from 'prop-types';

import { formatMonth } from '../shared/dates';

const className = 'react-calendar__year-view__months__month';

const Month = ({ active, date, hasActive, onChange }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    onClick={onChange && (() => onChange(date))}
  >
    <time dateTime={date.toISOString()}>
      {formatMonth(date)}
    </time>
  </button>
);

Month.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hasActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

export default Month;
