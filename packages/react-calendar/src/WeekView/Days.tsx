import { getYear, getMonth, getDayStart, getDate } from '@wojtekmaj/date-utils';
import TileGroup from '../TileGroup.js';
import Day from './Day.js';

import type { CalendarType } from '../shared/types.js';
import {getWeekEndDate} from '../shared/dates.js';

type WeekViewDaysProps = {
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
} & Omit<
  React.ComponentProps<typeof TileGroup>,
  'dateTransform' | 'dateType' | 'end' | 'renderTile' | 'start'
> &
  Omit<React.ComponentProps<typeof Day>, 'classes' | 'currentMonthIndex' | 'date' | 'point'>;

export default function WeekViewDays(props: WeekViewDaysProps): React.ReactElement {
  const { activeStartDate, calendarType, hover, value, valueType, ...otherProps } = props;

  const year = getYear(activeStartDate);
  const monthIndex = getMonth(activeStartDate);
  const offset = 0;
  const start = getDate(activeStartDate);
  const end = start + 6;

  const endDate = getWeekEndDate(activeStartDate, calendarType);
  const endMonthIndex = getMonth(endDate);
  const dateMap = new Map<number, Date>();

  for (let i = 0; i <= 6; i++) {
    const d = new Date(activeStartDate.getTime());
    const day = d.getDate() + i;
    d.setDate(day);
    getDayStart(d);
    dateMap.set(day, d);
  }

  return (
    <TileGroup
      className="react-calendar__month-view__days"
      count={7}
      dateTransform={(day) => {
        let value = dateMap.get(day);
        if (value) {
          return value;
        }
        value = new Date();
        value.setFullYear(year, monthIndex, day);
        return getDayStart(value);
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
          currentMonthIndex={endMonthIndex}
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
