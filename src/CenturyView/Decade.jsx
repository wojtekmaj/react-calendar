import React from 'react';
import PropTypes from 'prop-types';

import { getDecadeLabel, getDecadeRange } from '../shared/dates';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({ decade, onClick, setActiveRange }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick();

      if (setActiveRange) setActiveRange(getDecadeRange(decade));
    }}
  >
    {getDecadeLabel(decade)}
  </button>
);

Decade.propTypes = {
  decade: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  setActiveRange: PropTypes.func,
};

export default Decade;
