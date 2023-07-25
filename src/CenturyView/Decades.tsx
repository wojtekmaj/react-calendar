import React from 'react';
import { getDecadeStart } from '@wojtekmaj/date-utils';

import TileGroup from '../TileGroup';
import Decade from './Decade';

import { getBeginOfCenturyYear } from '../shared/dates';

import type { RangeType } from '../shared/types';

type DecadesProps = {
  activeStartDate: Date;
  valueType: RangeType;
} & Omit<React.ComponentProps<typeof Decade>, 'classes' | 'date'>;

export default function Decades(props: DecadesProps) {
  const { activeStartDate } = props;
  const start = getBeginOfCenturyYear(activeStartDate);
  const end = start + 99;

  return (
    <TileGroup
      {...props}
      className="react-calendar__century-view__decades"
      dateTransform={getDecadeStart}
      dateType="decade"
      end={end}
      start={start}
      step={10}
      tile={Decade}
    />
  );
}
