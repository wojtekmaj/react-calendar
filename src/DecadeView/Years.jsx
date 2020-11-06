import React from 'react';

import TileGroup from '../TileGroup';
import Year from './Year';

import { getBeginOfDecadeYear } from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default function Years(props) {
  const { activeStartDate } = props;
  const start = getBeginOfDecadeYear(activeStartDate);
  const end = start + 9;

  return (
    <TileGroup
      {...props}
      className="react-calendar__decade-view__years"
      dateTransform={(year) => new Date(year, 0, 1)}
      dateType="year"
      end={end}
      start={start}
      tile={Year}
    />
  );
}

Years.propTypes = {
  ...tileGroupProps,
};
