import React from 'react';
import { getYearStart, getYearEnd, getDecadeStart } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { formatYear as defaultFormatYear } from '../shared/dateFormatter.js';
import type { ClassName } from '../shared/types.js';

const className = 'react-calendar__decade-view__years__year';

export const slotNames = ['yearTile', 'neighbouringDecadeYearTile'] as const;
type SlotName = (typeof slotNames)[number];

type YearProps = {
  classNames?: Partial<Record<SlotName, ClassName>>;
  currentDecade: number;
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

export default function Year({
  classNames = {},
  currentDecade,
  formatYear = defaultFormatYear,
  ...otherProps
}: YearProps) {
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      className={[
        className,
        classNames.yearTile,
        getDecadeStart(date).getFullYear() !== currentDecade
          ? [`${className}--neighboringDecade`, classNames.neighbouringDecadeYearTile]
          : undefined,
      ]}
      maxDateTransform={getYearEnd}
      minDateTransform={getYearStart}
      view="decade"
    >
      {formatYear(locale, date)}
    </Tile>
  );
}
