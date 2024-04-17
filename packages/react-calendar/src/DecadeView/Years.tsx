import React from 'react';
import { getYearStart } from '@wojtekmaj/date-utils';

import TileGroup, { slotNames as tileGroupSlotNames } from '../TileGroup.js';
import Year, { slotNames as yearSlotNames } from './Year.js';

import { getBeginOfDecadeYear } from '../shared/dates.js';
import type { ClassName } from '../shared/types.js';
import { pickClassNames } from '../shared/utils.js';

type TileGroupProps = React.ComponentProps<typeof TileGroup>;
type YearProps = React.ComponentProps<typeof Year>;

const localSlotName = ['yearsView'] as const;
type LocalSlotName = (typeof localSlotName)[number];
export const slotNames = [...localSlotName, ...tileGroupSlotNames, ...yearSlotNames] as const;

type YearsProps = {
  classNames?: TileGroupProps['classNames'] &
    YearProps['classNames'] &
    Partial<Record<LocalSlotName, ClassName>>;
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
  TileGroupProps,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start' | 'classNames'
> &
  Omit<YearProps, 'currentDecade' | 'date' | 'classNames'>;

export default function Years(props: YearsProps) {
  const {
    activeStartDate,
    hover,
    showNeighboringDecade,
    value,
    valueType,
    classNames = {},
    ...otherProps
  } = props;
  const start = getBeginOfDecadeYear(activeStartDate);
  const end = start + (showNeighboringDecade ? 11 : 9);

  return (
    <TileGroup
      classNames={pickClassNames(
        {
          ...classNames,
          tileGroup: [
            'react-calendar__decade-view__years',
            classNames.tileGroup,
            classNames.yearsView,
          ],
        },
        tileGroupSlotNames,
      )}
      dateTransform={getYearStart}
      dateType="year"
      end={end}
      hover={hover}
      renderTile={({ date, className }) => (
        <Year
          key={date.getTime()}
          classNames={pickClassNames(
            { ...classNames, yearTile: [classNames.yearTile, className] },
            yearSlotNames,
          )}
          {...otherProps}
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
