import React from 'react';
import { getYear } from '@wojtekmaj/date-utils';

import TileGroup from '../TileGroup';
import Month from './Month';

import type { RangeType } from '../shared/types';

type MonthsProps = {
  activeStartDate: Date;
  valueType: RangeType;
} & Omit<React.ComponentProps<typeof Month>, 'classes' | 'date'>;

export default function Months(props: MonthsProps) {
  const { activeStartDate } = props;
  const start = 0;
  const end = 11;
  const year = getYear(activeStartDate);

  return (
    <TileGroup
      {...props}
      className="react-calendar__year-view__months"
      dateTransform={(monthIndex) => {
        const date = new Date();
        date.setFullYear(year, monthIndex, 1);
        date.setHours(0, 0, 0, 0);
        return date;
      }}
      dateType="month"
      end={end}
      start={start}
      tile={Month}
    />
  );
}
