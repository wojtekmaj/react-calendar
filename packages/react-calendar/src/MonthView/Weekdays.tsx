import clsx from 'clsx';
import { getYear, getMonth, getMonthStart } from '@wojtekmaj/date-utils';

import Flex from '../Flex.js';

import { getDayOfWeek, isCurrentDayOfWeek, isWeekend } from '../shared/dates.js';
import {
  formatShortWeekday as defaultFormatShortWeekday,
  formatWeekday as defaultFormatWeekday,
} from '../shared/dateFormatter.js';

import type { CalendarType } from '../shared/types.js';

const className = 'react-calendar__month-view__weekdays';
const weekdayClassName = `${className}__weekday`;

type WeekdaysProps = {
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType: CalendarType | undefined;
  /**
   * Function called to override default formatting of weekday names (shortened). Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'dd')
   */
  formatShortWeekday?: typeof defaultFormatShortWeekday;
  /**
   * Function called to override default formatting of weekday names. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'dd')
   */
  formatWeekday?: typeof defaultFormatWeekday;
  /**
   * Locale that should be used by the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag). **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
   *
   * @example 'hu-HU'
   */
  locale?: string;
  onMouseLeave?: () => void;
};

export default function Weekdays(props: WeekdaysProps) {
  const {
    calendarType,
    formatShortWeekday = defaultFormatShortWeekday,
    formatWeekday = defaultFormatWeekday,
    locale,
    onMouseLeave,
  } = props;

  const anyDate = new Date();
  const beginOfMonth = getMonthStart(anyDate);
  const year = getYear(beginOfMonth);
  const monthIndex = getMonth(beginOfMonth);

  const weekdays = [];

  for (let weekday = 1; weekday <= 7; weekday += 1) {
    const weekdayDate = new Date(
      year,
      monthIndex,
      weekday - getDayOfWeek(beginOfMonth, calendarType),
    );

    const abbr = formatWeekday(locale, weekdayDate);

    weekdays.push(
      <div
        key={weekday}
        className={clsx(
          weekdayClassName,
          isCurrentDayOfWeek(weekdayDate) && `${weekdayClassName}--current`,
          isWeekend(weekdayDate, calendarType) && `${weekdayClassName}--weekend`,
        )}
      >
        <abbr aria-label={abbr} title={abbr}>
          {formatShortWeekday(locale, weekdayDate).replace('.', '')}
        </abbr>
      </div>,
    );
  }

  return (
    <Flex className={className} count={7} onFocus={onMouseLeave} onMouseOver={onMouseLeave}>
      {weekdays}
    </Flex>
  );
}
