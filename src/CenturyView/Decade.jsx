import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import { getBeginOfDecade, getEndOfDecade, getDecadeLabel } from '../shared/dates';
import { isClassName, isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({
  active,
  date,
  decade,
  hasActive,
  maxDate,
  minDate,
  onClick,
  tileClassName,
  tileContent,
}) => (
  <button
    className={mergeClassNames(
      className,
      active && 'react-calendar__tile--active',
      hasActive && 'react-calendar__tile--hasActive',
      'react-calendar__tile',
      tileClassName instanceof Function ? tileClassName({ date, view: 'century' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfDecade(minDate) > date) ||
      (maxDate && getEndOfDecade(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time dateTime={`${decade}T00:00:00.000`}>
      {getDecadeLabel(decade)}
    </time>
    {tileContent instanceof Function ? tileContent({ date, view: 'century' }) : tileContent}
  </button>
);

Decade.propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  decade: PropTypes.number.isRequired,
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

export default Decade;
