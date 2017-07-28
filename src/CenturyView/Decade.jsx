import React from 'react';
import PropTypes from 'prop-types';

import { getDecadeLabel, getDecadeRange } from '../shared/dates';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ decade, onClick }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick(getDecadeRange(decade));
    }}
  >
    <time dateTime={decade.toISOString()}>
      {getDecadeLabel(decade)}
    </time>
  </button>
);

Decade.propTypes = {
  decade: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Decade;
