import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfMonth,
  getEndOfMonth,
  getISOLocalMonth,
} from '../shared/dates';
import { formatMonth } from '../shared/dateFormatter';
import { isClassName, isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__year-view__months__month';

const Month = ({
  active, date, hasActive, maxDate, minDate, onClick, tileClassName, tileContent,
}) => (
  <button
    className={mergeClassNames(
      className,
      active && 'react-calendar__tile--active',
      hasActive && 'react-calendar__tile--hasActive',
      'react-calendar__tile',
      tileClassName instanceof Function ? tileClassName({ date, view: 'year' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfMonth(minDate) > date) ||
      (maxDate && getEndOfMonth(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={`${getISOLocalMonth(date)}T00:00:00.000`}>
      {formatMonth(date)}
    </time>
    {tileContent instanceof Function ? tileContent({ date, view: 'year' }) : tileContent}
  </button>
);

Month.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  hasActive: PropTypes.bool.isRequired,
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

export default Month;
