import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfYear,
  getEndOfYear,
} from '../shared/dates';
import { isClassName, isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__decade-view__years__year';

const Year = ({
  active, date, hasActive, maxDate, minDate, onClick, tileClassName, tileContent, year,
}) => (
  <button
    className={mergeClassNames(
      className,
      active && 'react-calendar__tile--active',
      hasActive && 'react-calendar__tile--hasActive',
      'react-calendar__tile',
      tileClassName instanceof Function ? tileClassName({ date, view: 'decade' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfYear(minDate) > date) ||
      (maxDate && getEndOfYear(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={`${year}T00:00:00.000`}>
      {year}
    </time>
    {tileContent instanceof Function ? tileContent({ date, view: 'decade' }) : tileContent}
  </button>
);

Year.propTypes = {
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
  year: PropTypes.number.isRequired,
};

export default Year;
