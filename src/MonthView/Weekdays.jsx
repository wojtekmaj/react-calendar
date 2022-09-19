import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { getYear, getMonth, getMonthStart } from '@wojtekmaj/date-utils';

import Flex from '../Flex';

import { getDayOfWeek, isWeekend } from '../shared/dates';
import {
  formatShortWeekday as defaultFormatShortWeekday,
  formatWeekday as defaultFormatWeekday,
} from '../shared/dateFormatter';
import { isCalendarType } from '../shared/propTypes';

const className = 'react-calendar__month-view__weekdays';
const weekdayClassName = `${className}__weekday`;

export default function Weekdays(props) {
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
        className={mergeClassNames(
          weekdayClassName,
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

Weekdays.propTypes = {
  calendarType: isCalendarType.isRequired,
  formatShortWeekday: PropTypes.func,
  formatWeekday: PropTypes.func,
  locale: PropTypes.string,
  onMouseLeave: PropTypes.func,
};
