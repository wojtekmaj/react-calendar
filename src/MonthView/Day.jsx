import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  isWeekend,
} from '../shared/dates';
import { formatLongDate } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

export default function Day({
  calendarType,
  classes,
  currentMonthIndex,
  date,
  ...otherProps
}) {
  return (
    <Tile
      {...otherProps}
      classes={[].concat(
        classes,
        className,
        isWeekend(date, calendarType) ? `${className}--weekend` : null,
        date.getMonth() !== currentMonthIndex ? `${className}--neighboringMonth` : null,
      )}
      date={date}
      formatAbbr={formatLongDate}
      maxDateTransform={getEndOfDay}
      minDateTransform={getBeginOfDay}
      view="month"
    >
      {getDay(date)}
    </Tile>
  );
}

Day.propTypes = {
  ...tileProps,
  currentMonthIndex: PropTypes.number.isRequired,
};
