import React from 'react';
import PropTypes from 'prop-types';

import { getYearRange } from '../shared/dates';

const className = 'react-calendar__decade-view__years__year';

const Year = ({ active, date, hasActive, onClick, year }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick(getYearRange(date));
    }}
  >
    <time dateTime={year}>
      {year}
    </time>
  </button>
);

Year.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hasActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  year: PropTypes.number.isRequired,
};

export default Year;
