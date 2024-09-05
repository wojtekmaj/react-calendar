import { getYear, getMonth, getDaysInMonth, getDayStart } from '@wojtekmaj/date-utils';

import TileGroup from '../TileGroup.js';
import Day from './Day.js';

import { getDayOfWeek } from '../shared/dates.js';

import type { CalendarType } from '../shared/types.js';

type DaysProps = {
  /**
   * The beginning of a period that shall be displayed.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate: Date;
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType: CalendarType | undefined;
  /**
   * Whether to always show fixed number of weeks (6). Forces `showNeighboringMonth` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showFixedNumberOfWeeks?: boolean;
  /**
   * Whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively.
   *
   * @default true
   * @example false
   */
  showNeighboringMonth?: boolean;
} & Omit<
  React.ComponentProps<typeof TileGroup>,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start'
> &
  Omit<React.ComponentProps<typeof Day>, 'classes' | 'currentMonthIndex' | 'date' | 'point'>;

export default function Days(props: DaysProps): React.ReactElement {
  const {
    activeStartDate,
    calendarType,
    hover,
    showFixedNumberOfWeeks,
    showNeighboringMonth,
    value,
    valueType,
    ...otherProps
  } = props;

  const year = getYear(activeStartDate);
  const monthIndex = getMonth(activeStartDate);

  const hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
  const dayOfWeek = getDayOfWeek(activeStartDate, calendarType);

  const offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;

  /**
   * Defines on which day of the month the grid shall start. If we simply show current
   * month, we obviously start on day one, but if showNeighboringMonth is set to
   * true, we need to find the beginning of the week the first day of the month is in.
   */
  const start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;

  /**
   * Defines on which day of the month the grid shall end. If we simply show current
   * month, we need to stop on the last day of the month, but if showNeighboringMonth
   * is set to true, we need to find the end of the week the last day of the month is in.
   */
  const end = (() => {
    if (showFixedNumberOfWeeks) {
      // Always show 6 weeks
      return start + 6 * 7 - 1;
    }

    const daysInMonth = getDaysInMonth(activeStartDate);

    if (showNeighboringMonth) {
      const activeEndDate = new Date();
      activeEndDate.setFullYear(year, monthIndex, daysInMonth);
      activeEndDate.setHours(0, 0, 0, 0);
      const daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
      return daysInMonth + daysUntilEndOfTheWeek;
    }

    return daysInMonth;
  })();

  return (
    <TileGroup
      className="react-calendar__month-view__days"
      count={7}
      dateTransform={(day) => {
        const date = new Date();
        date.setFullYear(year, monthIndex, day);
        return getDayStart(date);
      }}
      dateType="day"
      hover={hover}
      end={end}
      renderTile={({ date, ...otherTileProps }) => (
        <Day
          key={date.getTime()}
          {...otherProps}
          {...otherTileProps}
          activeStartDate={activeStartDate}
          calendarType={calendarType}
          currentMonthIndex={monthIndex}
          date={date}
        />
      )}
      offset={offset}
      start={start}
      value={value}
      valueType={valueType}
    />
  );
}
