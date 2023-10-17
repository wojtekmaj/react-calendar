import React from 'react';
import clsx from 'clsx';
import { getYear, getMonth, getMonthStart } from '@wojtekmaj/date-utils';

import Flex from '../Flex.js';

import { getDayOfWeek, isCurrentDayOfWeek, isWeekend } from '../shared/dates.js';
import {
  formatShortWeekday as defaultFormatShortWeekday,
  formatWeekday as defaultFormatWeekday,
} from '../shared/dateFormatter.js';
import { mapCalendarType } from '../shared/utils.js';

import type { CalendarType, DeprecatedCalendarType } from '../shared/types.js';

const className = 'react-calendar__month-view__weekdays';
const weekdayClassName = `${className}__weekday`;

type WeekdaysProps = {
  calendarType: CalendarType | DeprecatedCalendarType | undefined;
  formatShortWeekday?: typeof defaultFormatShortWeekday;
  formatWeekday?: typeof defaultFormatWeekday;
  locale?: string;
  onMouseLeave?: () => void;
};

export default function Weekdays(props: WeekdaysProps) {
  const {
    calendarType: calendarTypeOrDeprecatedCalendarType,
    formatShortWeekday = defaultFormatShortWeekday,
    formatWeekday = defaultFormatWeekday,
    locale,
    onMouseLeave,
  } = props;

  const calendarType = mapCalendarType(calendarTypeOrDeprecatedCalendarType);
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
