import React from 'react';
import PropTypes from 'prop-types';

import { getYearRange } from '../shared/dates';

const className = 'react-calendar__decade-view__years__year';

const Year = ({ year, onClick }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick(getYearRange(year));
    }}
  >
    {year}
  </button>
);

Year.propTypes = {
  onClick: PropTypes.func,
  year: PropTypes.number.isRequired,
};

export default Year;
