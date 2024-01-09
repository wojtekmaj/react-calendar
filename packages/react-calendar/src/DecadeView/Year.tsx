import React from 'react';
import { getYearStart, getYearEnd, getDecadeStart } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { formatYear as defaultFormatYear } from '../shared/dateFormatter.js';

const className = 'react-calendar__decade-view__years__year';

type YearProps = {
  classes?: string[];
  currentDecade: number;
  /**
   *  Function called to override default formatting of year in the top navigation section. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'YYYY')
   */
  formatYear?: typeof defaultFormatYear;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'maxDateTransform' | 'minDateTransform' | 'view'
>;

export default function Year({
  classes = [],
  currentDecade,
  formatYear = defaultFormatYear,
  ...otherProps
}: YearProps) {
  const { date, locale } = otherProps;

  const classesProps: string[] = [];

  if (classes) {
    classesProps.push(...classes);
  }

  if (className) {
    classesProps.push(className);
  }

  if (getDecadeStart(date).getFullYear() !== currentDecade) {
    classesProps.push(`${className}--neighboringDecade`);
  }

  return (
    <Tile
      {...otherProps}
      classes={classesProps}
      maxDateTransform={getYearEnd}
      minDateTransform={getYearStart}
      view="decade"
    >
      {formatYear(locale, date)}
    </Tile>
  );
}
