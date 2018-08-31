import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import { tileProps } from './shared/propTypes';

const Tile = ({
  activeStartDate,
  children,
  classes,
  date,
  dateTime,
  maxDate,
  maxDateTransform,
  minDate,
  minDateTransform,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
  tileDisabled,
  view,
}) => (
  <button
    className={mergeClassNames(
      classes,
      tileClassName instanceof Function ? tileClassName({ date, view }) : tileClassName,
    )}
    disabled={
      (minDate && minDateTransform(minDate) > date)
      || (maxDate && maxDateTransform(maxDate) < date)
      || (tileDisabled && tileDisabled({ activeStartDate, date, view }))
    }
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={dateTime}>
      {children}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view }) : tileContent}
  </button>
);

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  dateTime: PropTypes.string.isRequired,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};

export default Tile;
