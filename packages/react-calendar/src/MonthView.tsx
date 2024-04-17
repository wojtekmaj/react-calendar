import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Days, { slotNames as daysSlotNames } from './MonthView/Days.js';
import Weekdays, { slotNames as weekdaysSlotNames } from './MonthView/Weekdays.js';
import WeekNumbers, { slotNames as weekNumbersSlotNames } from './MonthView/WeekNumbers.js';

import { CALENDAR_TYPES, CALENDAR_TYPE_LOCALES } from './shared/const.js';
import { isCalendarType, tileGroupProps } from './shared/propTypes.js';

import type { CalendarType, ClassName, DeprecatedCalendarType } from './shared/types.js';
import { pickClassNames } from './shared/utils.js';

function getCalendarTypeFromLocale(locale: string | undefined): CalendarType {
  if (locale) {
    for (const [calendarType, locales] of Object.entries(CALENDAR_TYPE_LOCALES)) {
      if (locales.includes(locale)) {
        return calendarType as CalendarType;
      }
    }
  }

  return CALENDAR_TYPES.ISO_8601;
}

const className = 'react-calendar__month-view';

const localSlotName = ['monthView', 'weekNumbersMonthView'] as const;
type LocalSlotName = (typeof localSlotName)[number];

export const slotNames = [
  ...localSlotName,
  ...daysSlotNames,
  ...weekdaysSlotNames,
  ...weekNumbersSlotNames,
] as const;

type WeekdaysProps = React.ComponentProps<typeof Weekdays>;
type WeekNumbersProps = React.ComponentProps<typeof WeekNumbers>;
type DaysProps = React.ComponentProps<typeof Days>;

type MonthViewProps = {
  classNames?: WeekdaysProps['classNames'] &
    WeekNumbersProps['classNames'] &
    DaysProps['classNames'] &
    Partial<Record<LocalSlotName, ClassName>>;
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType?: CalendarType | DeprecatedCalendarType;
  /**
   *  Whether week numbers shall be shown at the left of MonthView or not.
   *
   * @default false
   * @example true
   */
  showWeekNumbers?: boolean;
} & Omit<
  Omit<WeekdaysProps, 'classNames'> &
    Omit<WeekNumbersProps, 'classNames'> &
    Omit<DaysProps, 'classNames'>,
  'calendarType'
>;

/**
 * Displays a given month.
 */
const MonthView: React.FC<MonthViewProps> = function MonthView(props) {
  const { activeStartDate, locale, onMouseLeave, showFixedNumberOfWeeks, classNames = {} } = props;
  const {
    calendarType = getCalendarTypeFromLocale(locale),
    formatShortWeekday,
    formatWeekday,
    onClickWeekNumber,
    showWeekNumbers,
    ...childProps
  } = props;

  function renderWeekdays() {
    return (
      <Weekdays
        calendarType={calendarType}
        formatShortWeekday={formatShortWeekday}
        formatWeekday={formatWeekday}
        locale={locale}
        onMouseLeave={onMouseLeave}
        classNames={pickClassNames(classNames, weekdaysSlotNames)}
      />
    );
  }

  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickWeekNumber={onClickWeekNumber}
        onMouseLeave={onMouseLeave}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
        classNames={pickClassNames(classNames, weekNumbersSlotNames)}
      />
    );
  }

  function renderDays() {
    return (
      <Days
        calendarType={calendarType}
        classNames={pickClassNames(classNames, daysSlotNames)}
        {...childProps}
      />
    );
  }

  return (
    <div
      className={clsx(
        className,
        classNames.monthView,
        showWeekNumbers ? [`${className}--weekNumbers`, classNames.weekNumbersMonthView] : '',
      )}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {renderWeekNumbers()}
        <div
          style={{
            flexGrow: 1,
            width: '100%',
          }}
        >
          {renderWeekdays()}
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

MonthView.propTypes = {
  ...tileGroupProps,
  calendarType: isCalendarType,
  formatDay: PropTypes.func,
  formatLongDate: PropTypes.func,
  formatShortWeekday: PropTypes.func,
  formatWeekday: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
};

export default MonthView;
