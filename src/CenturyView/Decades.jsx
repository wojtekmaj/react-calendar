import React from 'react';

import TileGroup from '../TileGroup';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
} from '../shared/dates';
import { tileGroupProps } from '../shared/propTypes';

export default function Decades(props) {
  const { activeStartDate } = props;
  const start = getBeginOfCenturyYear(activeStartDate);
  const end = start + 99;

  return (
    <TileGroup
      {...props}
      className="react-calendar__century-view__decades"
      dateTransform={getBeginOfDecade}
      dateType="decade"
      end={end}
      start={start}
      step={10}
      tile={Decade}
    />
  );
}

Decades.propTypes = {
  ...tileGroupProps,
};
