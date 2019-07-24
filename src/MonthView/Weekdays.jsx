import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';

import {
  getBeginOfMonth,
  getDayOfWeek,
  getMonthIndex,
  getYear,
} from '../shared/dates';
import { formatWeekday, formatShortWeekday as defaultFormatShortWeekday } from '../shared/dateFormatter';
import { isCalendarType } from '../shared/propTypes';

export default function Weekdays(props) {
  const {
    calendarType,
    formatShortWeekday,
    locale,
    onMouseLeave,
  } = props;

  const anyDate = new Date();
  const beginOfMonth = getBeginOfMonth(anyDate);
  const year = getYear(beginOfMonth);
  const monthIndex = getMonthIndex(beginOfMonth);

  const weekdays = [];

  for (let weekday = 1; weekday <= 7; weekday += 1) {
    const weekdayDate = new Date(
      year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType),
    );

    const abbr = formatWeekday(locale, weekdayDate);

    weekdays.push(
      <div
        key={weekday}
        className="react-calendar__month-view__weekdays__weekday"
      >
        <abbr aria-label={abbr} title={abbr}>
          {formatShortWeekday(locale, weekdayDate).replace('.', '')}
        </abbr>
      </div>,
    );
  }

  return (
    <Flex
      className="react-calendar__month-view__weekdays"
      count={7}
      onFocus={onMouseLeave}
      onMouseOver={onMouseLeave}
    >
      {weekdays}
    </Flex>
  );
}

Weekdays.defaultProps = {
  formatShortWeekday: defaultFormatShortWeekday,
};

Weekdays.propTypes = {
  calendarType: isCalendarType.isRequired,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  onMouseLeave: PropTypes.func,
};
