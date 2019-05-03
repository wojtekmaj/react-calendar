import React from 'react';
import PropTypes from 'prop-types';

import TileGroup from '../TileGroup';
import Month from './Month';

import { getYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default function Months(props) {
  const { activeStartDate } = props;
  const start = 0;
  const end = 11;
  const year = getYear(activeStartDate);

  return (
    <TileGroup
      {...props}
      className="react-calendar__year-view__months"
      dateTransform={monthIndex => new Date(year, monthIndex, 1)}
      dateType="month"
      end={end}
      start={start}
      tile={Month}
    />
  );
}

Months.propTypes = {
  ...tileGroupProps,
  locale: PropTypes.string,
};
