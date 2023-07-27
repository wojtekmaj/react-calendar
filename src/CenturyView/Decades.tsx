import React from 'react';
import { getDecadeStart } from '@wojtekmaj/date-utils';

import TileGroup from '../TileGroup.js';
import Decade from './Decade.js';

import { getBeginOfCenturyYear } from '../shared/dates.js';

type DecadesProps = {
  activeStartDate: Date;
} & Omit<
  React.ComponentProps<typeof TileGroup>,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start'
> &
  Omit<React.ComponentProps<typeof Decade>, 'classes' | 'date'>;

export default function Decades(props: DecadesProps) {
  const { activeStartDate, hover, value, valueType, ...otherProps } = props;
  const start = getBeginOfCenturyYear(activeStartDate);
  const end = start + 99;

  return (
    <TileGroup
      className="react-calendar__century-view__decades"
      dateTransform={getDecadeStart}
      dateType="decade"
      end={end}
      hover={hover}
      renderTile={({ date, ...otherTileProps }) => (
        <Decade
          key={date.getTime()}
          {...otherProps}
          {...otherTileProps}
          activeStartDate={activeStartDate}
          date={date}
        />
      )}
      start={start}
      step={10}
      value={value}
      valueType={valueType}
    />
  );
}
