import React from 'react';
import PropTypes from 'prop-types';

import { getBeginOfDecade, getEndOfDecade, getDecadeLabel } from '../shared/dates';
import { isMaxDate, isMinDate } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({
  active,
  date,
  decade,
  hasActive,
  maxDate,
  minDate,
  onClick,
  renderChildren,
}) => (
  <button
    className={[
      className,
      (active ? 'react-calendar__tile--active' : ''),
      (hasActive ? 'react-calendar__tile--hasActive' : ''),
      'react-calendar__tile',
    ].join(' ')}
    disabled={
      (minDate && getBeginOfDecade(minDate) > date) ||
      (maxDate && getEndOfDecade(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    style={{ flexGrow: 1 }}
    type="button"
  >
    <time>
      {getDecadeLabel(decade)}
    </time>
    {renderChildren && renderChildren({ date, view: 'century' })}
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
  renderChildren: PropTypes.func,
};

export default Decade;
