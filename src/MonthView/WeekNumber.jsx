import React from 'react';
import PropTypes from 'prop-types';

export default function WeekNumber({
  date,
  onClickWeekNumber,
  weekNumber,
}) {
  const props = {
    className: 'react-calendar__tile',
    style: { flexGrow: 1 },
  };

  const children = (
    <span>
      {weekNumber}
    </span>
  );

  return (
    onClickWeekNumber
      ? (
        <button
          {...props}
          onClick={() => onClickWeekNumber(weekNumber, date)}
          type="button"
        >
          {children}
        </button>
      )
      : (
        <div {...props}>
          {children}
        </div>
      )
  );
}

WeekNumber.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onClickWeekNumber: PropTypes.func,
  weekNumber: PropTypes.number.isRequired,
};
