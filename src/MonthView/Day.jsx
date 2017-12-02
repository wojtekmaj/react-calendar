import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  getISOLocalDate,
  isWeekend,
} from '../shared/dates';
import { isClassName, isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({
  active, currentMonthIndex, date, maxDate, minDate, onClick, tileClassName, tileContent,
}) => (
  <button
    className={mergeClassNames(
      className,
      'react-calendar__tile',
      active && 'react-calendar__tile--active',
      isWeekend(date) && `${className}--weekend`,
      date.getMonth() !== currentMonthIndex && `${className}--neighboringMonth`,
      tileClassName instanceof Function ? tileClassName({ date, view: 'month' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfDay(minDate) > date) ||
      (maxDate && getEndOfDay(maxDate) < date)
    }
    key={date}
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={`${getISOLocalDate(date)}T00:00:00.000`}>
      {getDay(date)}
    </time>
    {tileContent instanceof Function ? tileContent({ date, view: 'month' }) : tileContent}
  </button>
);

Day.propTypes = {
  active: PropTypes.bool.isRequired,
  currentMonthIndex: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  tileClassName: PropTypes.oneOfType([
    PropTypes.func,
    isClassName,
  ]),
  tileContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
};

export default Day;
