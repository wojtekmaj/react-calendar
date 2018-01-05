import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import { getBeginOfDecade, getEndOfDecade, getDecadeLabel } from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

const Decade = ({
  classes,
  date,
  decade,
  maxDate,
  minDate,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
}) => (
  <button
    className={mergeClassNames(
      className,
      ...classes,
      tileClassName instanceof Function ? tileClassName({ date, view: 'century' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfDecade(minDate) > date) ||
      (maxDate && getEndOfDecade(maxDate) < date)
    }
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={`${decade}T00:00:00.000`}>
      {getDecadeLabel(decade)}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view: 'century' }) : tileContent}
  </button>
);

Decade.propTypes = {
  decade: PropTypes.number.isRequired,
  ...tileProps,
};

export default Decade;
