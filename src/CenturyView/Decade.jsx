import React from 'react';
import PropTypes from 'prop-types';

import { getBeginOfDecade, getEndOfDecade, getDecadeLabel } from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ active, date, decade, hasActive, maxDate, minDate, onChange }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    disabled={
      (minDate && getBeginOfDecade(minDate) > date) ||
      (maxDate && getEndOfDecade(maxDate) < date)
    }
    onClick={onChange && (() => onChange(date))}
  >
    <time>
      {getDecadeLabel(decade)}
    </time>
  </button>
);

Decade.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  decade: PropTypes.number.isRequired,
  hasActive: PropTypes.bool.isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
};

export default Decade;
