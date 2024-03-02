import React from 'react';
import { getMonthStart, getMonthEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import {
  formatMonth as defaultFormatMonth,
  formatMonthYear as defaultFormatMonthYear,
} from '../shared/dateFormatter.js';
import type { ClassName } from '../shared/types.js';

const className = 'react-calendar__year-view__months__month';

export const slotNames = ['monthTile'] as const;
type SlotName = (typeof slotNames)[number];

type MonthProps = {
  classNames?: Partial<Record<SlotName, ClassName>>;
  /**
   * Function called to override default formatting of month names. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'MMM')
   */
  formatMonth?: typeof defaultFormatMonth;
  /**
   * Function called to override default formatting of months and years. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'MMMM YYYY')
   */
  formatMonthYear?: typeof defaultFormatMonthYear;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'formatAbbr' | 'maxDateTransform' | 'minDateTransform' | 'view' | 'className'
>;

export default function Month({
  classNames = {},
  formatMonth = defaultFormatMonth,
  formatMonthYear = defaultFormatMonthYear,
  ...otherProps
}: MonthProps) {
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      className={[className, classNames.monthTile]}
      formatAbbr={formatMonthYear}
      maxDateTransform={getMonthEnd}
      minDateTransform={getMonthStart}
      view="year"
    >
      {formatMonth(locale, date)}
    </Tile>
  );
}
