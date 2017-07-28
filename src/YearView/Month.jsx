import React from 'react';
import PropTypes from 'prop-types';

import {
  formatMonth,
  getMonthRange,
} from '../shared/dates';

const className = 'react-calendar__year-view__months__month';

const Month = ({ month, onClick, setActiveRange }) => (
  <button
    className={[
      className,
      'react-calendar__tile',
    ].join(' ')}
    onClick={() => {
      if (onClick) onClick();

      if (setActiveRange) setActiveRange(getMonthRange(month));
    }}
  >
    {formatMonth(month)}
  </button>
);

Month.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func,
  setActiveRange: PropTypes.func,
};

export default Month;
