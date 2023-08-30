import React from 'react';
import { getYearStart, getYearEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { formatYear as defaultFormatYear } from '../shared/dateFormatter.js';

const className = 'react-calendar__decade-view__years__year';

type YearProps = {
  classes?: string[];
  formatYear?: typeof defaultFormatYear;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'maxDateTransform' | 'minDateTransform' | 'view'
>;

export default function Year({
  classes = [],
  formatYear = defaultFormatYear,
  ...otherProps
}: YearProps) {
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      classes={[...classes, className]}
      maxDateTransform={getYearEnd}
      minDateTransform={getYearStart}
      view="decade"
    >
      {formatYear(locale, date)}
    </Tile>
  );
}
