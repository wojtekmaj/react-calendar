import React from 'react';
import { getDecadeStart } from '@wojtekmaj/date-utils';

import TileGroup, { slotNames as tileGroupSlotNames } from '../TileGroup.js';
import Decade, { slotNames as decadeSlotNames } from './Decade.js';

import { getBeginOfCenturyYear } from '../shared/dates.js';
import type { ClassName } from '../shared/types.js';
import { pickClassNames } from '../shared/utils.js';

const localSlotNames = ['decadesView'] as const;
type LocalSlotName = (typeof localSlotNames)[number];
export const slotNames = ['decadesView', ...tileGroupSlotNames, ...decadeSlotNames] as const;

type DecadeProps = React.ComponentProps<typeof Decade>;
type TileGroupProps = React.ComponentProps<typeof TileGroup>;

type DecadesProps = {
  classNames?: DecadeProps['classNames'] &
    TileGroupProps['classNames'] &
    Partial<Record<LocalSlotName, ClassName>>;
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  /**
   * Whether decades from next century shall be rendered to fill the entire last row in.
   *
   * @default false
   * @example true
   */
  showNeighboringCentury?: boolean;
} & Omit<
  TileGroupProps,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start' | 'classNames'
> &
  Omit<DecadeProps, 'currentCentury' | 'date' | 'classNames'>;

export default function Decades(props: DecadesProps) {
  const {
    activeStartDate,
    hover,
    showNeighboringCentury,
    value,
    valueType,
    classNames = {},
    ...otherProps
  } = props;
  const start = getBeginOfCenturyYear(activeStartDate);
  const end = start + (showNeighboringCentury ? 119 : 99);

  return (
    <TileGroup
      classNames={pickClassNames(
        {
          ...classNames,
          tileGroup: [
            'react-calendar__century-view__decades',
            classNames.tileGroup,
            classNames.decadesView,
          ],
        },
        tileGroupSlotNames,
      )}
      dateTransform={getDecadeStart}
      dateType="decade"
      end={end}
      hover={hover}
      renderTile={({ date, className }) => (
        <Decade
          key={date.getTime()}
          classNames={pickClassNames(
            { ...classNames, decadeTile: [classNames.decadeTile, className] },
            decadeSlotNames,
          )}
          {...otherProps}
          activeStartDate={activeStartDate}
          currentCentury={start}
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
