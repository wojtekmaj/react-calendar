import React from 'react';
import { getMonthStart, getYear } from '@wojtekmaj/date-utils';

import TileGroup, { slotNames as tileGroupSlotNames } from '../TileGroup.js';
import Month, { slotNames as monthSlotNames } from './Month.js';
import type { ClassName } from '../shared/types.js';
import { pickClassNames } from '../shared/utils.js';

type TileGroupProps = React.ComponentProps<typeof TileGroup>;
type MonthProps = React.ComponentProps<typeof Month>;

const localSlotName = ['monthsView'] as const;
type LocalSlotName = (typeof localSlotName)[number];
export const slotNames = [...localSlotName, ...tileGroupSlotNames, ...monthSlotNames] as const;

type MonthsProps = {
  classNames?: TileGroupProps['classNames'] &
    MonthProps['classNames'] &
    Partial<Record<LocalSlotName, ClassName>>;
  /**
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
} & Omit<
  TileGroupProps,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start' | 'classNames'
> &
  Omit<MonthProps, 'date' | 'classNames'>;

export default function Months(props: MonthsProps) {
  const { activeStartDate, hover, value, valueType, classNames = {}, ...otherProps } = props;
  const start = 0;
  const end = 11;
  const year = getYear(activeStartDate);

  return (
    <TileGroup
      classNames={pickClassNames(
        {
          ...classNames,
          tileGroup: [
            'react-calendar__year-view__months',
            classNames.tileGroup,
            classNames.monthsView,
          ],
        },
        tileGroupSlotNames,
      )}
      dateTransform={(monthIndex) => {
        const date = new Date();
        date.setFullYear(year, monthIndex, 1);
        return getMonthStart(date);
      }}
      dateType="month"
      end={end}
      hover={hover}
      renderTile={({ date, className }) => (
        <Month
          key={date.getTime()}
          {...otherProps}
          classNames={pickClassNames(
            { ...classNames, monthTile: [classNames.monthTile, className] },
            monthSlotNames,
          )}
          activeStartDate={activeStartDate}
          date={date}
        />
      )}
      start={start}
      value={value}
      valueType={valueType}
    />
  );
}
