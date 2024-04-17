import React from 'react';
import clsx from 'clsx';
import { getDecadeStart, getDecadeEnd, getCenturyStart } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { getDecadeLabel } from '../shared/dates.js';
import { formatYear as defaultFormatYear } from '../shared/dateFormatter.js';
import type { ClassName } from '../shared/types.js';

const className = 'react-calendar__century-view__decades__decade';

export const slotNames = ['decadeTile', 'neighbouringCenturyDecadeTile'] as const;
type SlotName = (typeof slotNames)[number];

type DecadeProps = {
  classNames?: Partial<Record<SlotName, ClassName>>;
  currentCentury: number;
  /**
   *  Function called to override default formatting of year in the top navigation section. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'YYYY')
   */
  formatYear?: typeof defaultFormatYear;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'maxDateTransform' | 'minDateTransform' | 'view' | 'className'
>;

export default function Decade({
  classNames = {},
  currentCentury,
  formatYear = defaultFormatYear,
  ...otherProps
}: DecadeProps) {
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      className={clsx(
        className,
        classNames.decadeTile,
        getCenturyStart(date).getFullYear() !== currentCentury && [
          `${className}--neighboringCentury`,
          classNames.neighbouringCenturyDecadeTile,
        ],
      )}
      maxDateTransform={getDecadeEnd}
      minDateTransform={getDecadeStart}
      view="century"
    >
      {getDecadeLabel(locale, formatYear, date)}
    </Tile>
  );
}
