import { getCenturyStart, getDecadeEnd, getDecadeStart } from '@wojtekmaj/date-utils';

import Tile from '../Tile.js';

import { formatYear as defaultFormatYear } from '../shared/dateFormatter.js';
import { getDecadeLabel } from '../shared/dates.js';

const className = 'react-calendar__century-view__decades__decade';

type DecadeProps = {
  classes?: string[];
  currentCentury: number;
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

export default function Decade({
  classes = [],
  currentCentury,
  formatYear = defaultFormatYear,
  ...otherProps
}: DecadeProps): React.ReactElement {
  const { date, locale } = otherProps;

  const classesProps: string[] = [];

  if (classes) {
    classesProps.push(...classes);
  }

  if (className) {
    classesProps.push(className);
  }

  if (getCenturyStart(date).getFullYear() !== currentCentury) {
    classesProps.push(`${className}--neighboringCentury`);
  }

  return (
    <Tile
      {...otherProps}
      classes={classesProps}
      maxDateTransform={getDecadeEnd}
      minDateTransform={getDecadeStart}
      view="century"
    >
      {getDecadeLabel(locale, formatYear, date)}
    </Tile>
  );
}
