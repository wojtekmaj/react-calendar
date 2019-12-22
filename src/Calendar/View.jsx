import React from 'react';

import CenturyView from '../CenturyView';
import DecadeView from '../DecadeView';
import YearView from '../YearView';
import MonthView from '../MonthView';

import { isView } from '../shared/propTypes';

export default function View({
  activeStartDate,
  calendarType,
  formatLongDate,
  formatMonth,
  formatMonthYear,
  formatShortWeekday,
  formatYear,
  hover,
  locale,
  maxDate,
  minDate,
  onClick,
  onClickWeekNumber,
  onMouseLeave,
  onMouseOver,
  selectRange,
  showDoubleView,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  showWeekNumbers,
  tileClassName,
  tileContent,
  tileDisabled,
  value,
  valueType,
  view,
}) {
  const commonProps = {
    activeStartDate,
    hover,
    locale,
    maxDate,
    minDate,
    onClick,
    onMouseOver: selectRange ? onMouseOver : null,
    tileClassName,
    tileContent,
    tileDisabled,
    value,
    valueType,
  };

  switch (view) {
    case 'century': {
      return (
        <CenturyView
          formatYear={formatYear}
          {...commonProps}
        />
      );
    }
    case 'decade': {
      return (
        <DecadeView
          formatYear={formatYear}
          {...commonProps}
        />
      );
    }
    case 'year': {
      return (
        <YearView
          formatMonth={formatMonth}
          formatMonthYear={formatMonthYear}
          {...commonProps}
        />
      );
    }
    case 'month': {
      return (
        <MonthView
          calendarType={calendarType}
          formatLongDate={formatLongDate}
          formatShortWeekday={formatShortWeekday}
          onClickWeekNumber={onClickWeekNumber}
          onMouseLeave={onMouseLeave}
          showFixedNumberOfWeeks={showFixedNumberOfWeeks || showDoubleView}
          showNeighboringMonth={showNeighboringMonth}
          showWeekNumbers={showWeekNumbers}
          {...commonProps}
        />
      );
    }
    default:
      throw new Error(`Invalid view: ${view}.`);
  }
}

View.propTypes = {
  view: isView,
};
