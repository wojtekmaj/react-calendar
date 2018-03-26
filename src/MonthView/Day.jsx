import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  getISOLocalDate,
  isWeekend,
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({
  classes,
  currentMonthIndex,
  date,
  ...otherProps
}) => (
  <Tile
    {...otherProps}
    classes={[
      ...classes,
      className,
      isWeekend(date) ? `${className}--weekend` : null,
      date.getMonth() !== currentMonthIndex ? `${className}--neighboringMonth` : null,
    ]}
    date={date}
    dateTime={`${getISOLocalDate(date)}T00:00:00.000`}
    maxDateTransform={getEndOfDay}
    minDateTransform={getBeginOfDay}
    view="month"
  >
    {getDay(date)}
  </Tile>
);

Day.propTypes = {
  currentMonthIndex: PropTypes.number.isRequired,
  ...tileProps,
};

export default Day;
