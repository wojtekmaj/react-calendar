import React from 'react';
import PropTypes from 'prop-types';
import { getDecadeStart, getDecadeEnd } from '@wojtekmaj/date-utils';

import Tile from '../Tile';

import { getDecadeLabel } from '../shared/dates';
import { formatYear as defaultFormatYear } from '../shared/dateFormatter';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__century-view__decades__decade';

type DecadeProps = {
  classes?: string[];
  formatYear?: typeof defaultFormatYear;
} & Omit<
  React.ComponentProps<typeof Tile>,
  'children' | 'maxDateTransform' | 'minDateTransform' | 'view'
>;

export default function Decade({
  classes = [],
  formatYear = defaultFormatYear,
  ...otherProps
}: DecadeProps) {
  const { date, locale } = otherProps;

  return (
    <Tile
      {...otherProps}
      classes={[...classes, className]}
      maxDateTransform={getDecadeEnd}
      minDateTransform={getDecadeStart}
      view="century"
    >
      {getDecadeLabel(locale, formatYear, date)}
    </Tile>
  );
}

Decade.propTypes = {
  ...tileProps,
  formatYear: PropTypes.func,
};
