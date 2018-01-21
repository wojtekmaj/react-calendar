import React from 'react';
import PropTypes from 'prop-types';

const WeekNumber = ({
  date,
  onClickWeekNumber,
  weekNumber,
}) => (
  onClickWeekNumber ?
    <button
      className="react-calendar__tile"
      onClick={() => onClickWeekNumber(weekNumber, date)}
      style={{ flexGrow: 1 }}
      type="button"
    >
      <span>{weekNumber}</span>
    </button> :
    <div
      className="react-calendar__tile"
      style={{ flexGrow: 1 }}
    >
      <span>{weekNumber}</span>
    </div>
);

WeekNumber.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onClickWeekNumber: PropTypes.func,
  weekNumber: PropTypes.number.isRequired,
};

export default WeekNumber;
