import React from 'react';
import { getYearStart } from '@wojtekmaj/date-utils';

import TileGroup from '../TileGroup.js';
import Year from './Year.js';

import { getBeginOfDecadeYear } from '../shared/dates.js';

type YearsProps = {
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  /**
   * Whether years from next decade shall be rendered to fill the entire last row in.
   *
   * @default false
   * @example true
   */
  showNeighboringDecade?: boolean;
} & Omit<
  React.ComponentProps<typeof TileGroup>,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start'
> &
  Omit<React.ComponentProps<typeof Year>, 'classes' | 'currentDecade' | 'date'>;

export default function Years(props: YearsProps) {
  const { activeStartDate, hover, showNeighboringDecade, value, valueType, ...otherProps } = props;
  const start = getBeginOfDecadeYear(activeStartDate);
  const end = start + (showNeighboringDecade ? 11 : 9);

  return (
    <TileGroup
      className="react-calendar__decade-view__years"
      dateTransform={getYearStart}
      dateType="year"
      end={end}
      hover={hover}
      renderTile={({ date, ...otherTileProps }) => (
        <Year
          key={date.getTime()}
          {...otherProps}
          {...otherTileProps}
          activeStartDate={activeStartDate}
          currentDecade={start}
          date={date}
        />
      )}
      start={start}
      value={value}
      valueType={valueType}
    />
  );
}
