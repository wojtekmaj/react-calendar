import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const className = 'react-calendar__tile';

export default function WeekNumber({
  date,
  onClickWeekNumber,
  weekNumber,
  weekNumberContent,
  ...otherProps
}) {
  const props = {
    className,
    ...otherProps,
  };

  const weekContent = useMemo(() => {
    return typeof weekNumberContent === 'function'
      ? weekNumberContent({ date, weekNumber })
      : weekNumberContent;
  }, [weekNumberContent, weekNumber, date]);

  const children = <>{weekContent ?? weekNumber}</>;

  return onClickWeekNumber ? (
    <button
      {...props}
      onClick={(event) => onClickWeekNumber(weekNumber, date, event)}
      type="button"
    >
      {children}
    </button>
  ) : (
    <div {...props}> {children} </div>
  );
}

WeekNumber.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onClickWeekNumber: PropTypes.func,
  weekNumber: PropTypes.node.isRequired,
  weekNumberContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
