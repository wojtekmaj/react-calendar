import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';

import {
  getBeginOfMonth,
  getDayOfWeek,
  getMonthIndex,
  getYear,
} from '../shared/dates';
import { formatShortWeekday as defaultFormatShortWeekday } from '../shared/dateFormatter';
import { isCalendarType } from '../shared/propTypes';

export default class Weekdays extends Component {
  shouldComponentUpdate(nextProps) {
    const { calendarType, locale } = this.props;

    return (
      nextProps.calendarType !== calendarType
      || nextProps.locale !== locale
    );
  }

  get beginOfMonth() {
    const { month } = this.props;

    return getBeginOfMonth(month);
  }

  get year() {
    const { beginOfMonth } = this;

    return getYear(beginOfMonth);
  }

  get monthIndex() {
    const { beginOfMonth } = this;

    return getMonthIndex(beginOfMonth);
  }

  render() {
    const { calendarType, formatShortWeekday, locale } = this.props;
    const { beginOfMonth, year, monthIndex } = this;

    const weekdays = [];

    for (let weekday = 1; weekday <= 7; weekday += 1) {
      const weekdayDate = new Date(
        year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType),
      );

      weekdays.push(
        <div
          className="react-calendar__month-view__weekdays__weekday"
          key={weekday}
          style={{ flexGrow: 1 }}
        >
          {formatShortWeekday(weekdayDate, locale).replace('.', '')}
        </div>,
      );
    }

    return (
      <Flex
        className="react-calendar__month-view__weekdays"
        count={7}
      >
        {weekdays}
      </Flex>
    );
  }
}

Weekdays.defaultProps = {
  formatShortWeekday: defaultFormatShortWeekday,
};

Weekdays.propTypes = {
  calendarType: isCalendarType.isRequired,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
