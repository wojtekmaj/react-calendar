import React from 'react';
import PropTypes from 'prop-types';

import { getDecadeLabel, getDecadeRange } from '../shared/dates';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ active, date, decade, hasActive, onClick }) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick(getDecadeRange(date));
    }}
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
  onClick: PropTypes.func,
};

export default Decade;
