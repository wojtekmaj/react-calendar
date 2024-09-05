'use client';

import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import clsx from 'clsx';

import Navigation from './Calendar/Navigation.js';
import CenturyView from './CenturyView.js';
import DecadeView from './DecadeView.js';
import YearView from './YearView.js';
import MonthView from './MonthView.js';

import { getBegin, getBeginNext, getEnd, getValueRange } from './shared/dates.js';
import { between } from './shared/utils.js';

import type {
  Action,
  CalendarType,
  ClassName,
  Detail,
  LooseValue,
  NavigationLabelFunc,
  OnArgs,
  OnClickFunc,
  OnClickWeekNumberFunc,
  Range,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  Value,
  View,
} from './shared/types.js';

import type {
  formatDay as defaultFormatDay,
  formatLongDate as defaultFormatLongDate,
  formatMonth as defaultFormatMonth,
  formatMonthYear as defaultFormatMonthYear,
  formatShortWeekday as defaultFormatShortWeekday,
  formatWeekday as defaultFormatWeekday,
  formatYear as defaultFormatYear,
} from './shared/dateFormatter.js';

const baseClassName = 'react-calendar';
const allViews = ['century', 'decade', 'year', 'month'] as const;
const allValueTypes = ['decade', 'year', 'month', 'day'] as const;

const defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
const defaultMaxDate = new Date(8.64e15);

export type CalendarProps = {
  /**
   * The beginning of a period that shall be displayed. If you wish to use react-calendar in an uncontrolled way, use `defaultActiveStartDate` instead.
   *
   * @example new Date(2017, 0, 1)
   */
  activeStartDate?: Date;
  /**
   * Whether to call onChange with only partial result given `selectRange` prop.
   *
   * @default false
   * @example true
   */
  allowPartialRange?: boolean;
  /**
   * Type of calendar that should be used. Can be `'gregory`, `'hebrew'`, `'islamic'`, `'iso8601'`. Setting to `"gregory"` or `"hebrew"` will change the first day of the week to Sunday. Setting to `"islamic"` will change the first day of the week to Saturday. Setting to `"islamic"` or `"hebrew"` will make weekends appear on Friday to Saturday.
   *
   * @example 'iso8601'
   */
  calendarType?: CalendarType;
  /**
   * Class name(s) that will be added along with `"react-calendar"` to the main react-calendar `<div>` element.
   *
   * @example 'class1 class2'
   * @example ['class1', 'class2 class3']
   */
  className?: ClassName;
  /**
   * The beginning of a period that shall be displayed by default. If you wish to use react-calendar in a controlled way, use `activeStartDate` instead.
   *
   * @example new Date(2017, 0, 1)
   */
  defaultActiveStartDate?: Date;
  /**
   * Calendar value that shall be selected initially. Can be either one value or an array of two values. If you wish to use react-calendar in a controlled way, use `value` instead.
   *
   * @example new Date(2017, 0, 1)
   * @example [new Date(2017, 0, 1), new Date(2017, 7, 1)]
   */
  defaultValue?: LooseValue;
  /**
   * Determines which calendar view shall be opened initially. Does not disable navigation. Can be `"month"`, `"year"`, `"decade"` or `"century"`. If you wish to use react-calendar in a controlled way, use `view` instead.
   *
   * @example 'year'
   */
  defaultView?: View;
  /**
   * Function called to override default formatting of day tile labels. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'd')
   */
  formatDay?: typeof defaultFormatDay;
  /**
   * Function called to override default formatting of day tile `abbr` labels. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'dd MMM YYYY')
   */
  formatLongDate?: typeof defaultFormatLongDate;
  /**
   * Function called to override default formatting of month names. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'MMM')
   */
  formatMonth?: typeof defaultFormatMonth;
  /**
   * Function called to override default formatting of months and years. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'MMMM YYYY')
   */
  formatMonthYear?: typeof defaultFormatMonthYear;
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
   *  Function called to override default formatting of year in the top navigation section. Can be used to use your own formatting function.
   *
   * @example (locale, date) => formatDate(date, 'YYYY')
   */
  formatYear?: typeof defaultFormatYear;
  /**
   * Whether to go to the beginning of the range when selecting the end of the range.
   *
   * @default true
   * @example false
   */
  goToRangeStartOnSelect?: boolean;
  /**
   *  A prop that behaves like [ref](https://reactjs.org/docs/refs-and-the-dom.html), but it's passed to main `<div>` rendered by `<Calendar>` component.
   *
   * @example (ref) => { this.myCalendar = ref; }
   * @example this.ref
   * @example ref
   */
  inputRef?: React.Ref<HTMLDivElement>;
  /**
   * Locale that should be used by the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag).
   *
   * **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
   *
   * @example 'hu-HU'
   */
  locale?: string;
  /**
   * Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although react-calendar will ensure that no later date is selected.
   *
   * @example new Date()
   */
  maxDate?: Date;
  /**
   * The most detailed view that the user shall see. View defined here also becomes the one on which clicking an item will select a date and pass it to onChange. Can be `"month"`, `"year"`, `"decade"` or `"century"`.
   *
   * @default 'month'
   * @example 'year'
   */
  maxDetail?: Detail;
  /**
   * Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected.
   *
   * @example new Date()
   */
  minDate?: Date;
  /**
   * The least detailed view that the user shall see. Can be `"month"`, `"year"`, `"decade"` or `"century"`.
   *
   * @default 'century'
   * @example 'decade'
   */
  minDetail?: Detail;
  /**
   * `aria-label` attribute of a label rendered on calendar navigation bar.
   *
   * @example 'Go up'
   */
  navigationAriaLabel?: string;
  /**
   * `aria-live` attribute of a label rendered on calendar navigation bar.
   *
   * @default undefined
   * @example 'polite'
   */
  navigationAriaLive?: 'off' | 'polite' | 'assertive';
  /**
   * Content of a label rendered on calendar navigation bar.
   *
   * @example ({ date, label, locale, view }) => alert(`Current view: ${view}, date: ${date.toLocaleDateString(locale)}`)
   */
  navigationLabel?: NavigationLabelFunc;
  /**
   * `aria-label` attribute of the "next on higher level" button on the navigation pane.
   *
   * @example 'Jump forwards'
   */
  next2AriaLabel?: string;
  /**
   * Content of the "next on higher level" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '»'
   * @example <DoubleNextIcon />
   */
  next2Label?: React.ReactNode;
  /**
   * `aria-label` attribute of the "next" button on the navigation pane.
   *
   * @example 'Next'
   */
  nextAriaLabel?: string;
  /**
   * Content of the "next" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '›'
   * @example <NextIcon />
   */
  nextLabel?: React.ReactNode;
  /**
   * Function called when the user navigates from one view to another using previous/next button. Note that this function will not be called when e.g. drilling up from January 2021 to 2021 or drilling down the other way around.
   *
   * `action` signifies the reason for active start date change and can be one of the following values: `"prev"`, `"prev2"`, `"next"`, `"next2"`, `"drillUp"`, `"drillDown"`, `"onChange"`.
   *
   * @example ({ action, activeStartDate, value, view }) => alert('Changed view to: ', activeStartDate, view)
   */
  onActiveStartDateChange?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  /**
   * Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available.
   *
   * @example (value, event) => alert('New date is: ', value)
   */
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Function called when the user clicks a day.
   *
   * @example (value, event) => alert('Clicked day: ', value)
   */
  onClickDay?: OnClickFunc;
  /**
   * Function called when the user clicks a decade.
   *
   * @example (value, event) => alert('Clicked decade: ', value)
   */
  onClickDecade?: OnClickFunc;
  /**
   * Function called when the user clicks a month.
   *
   * @example (value, event) => alert('Clicked month: ', value)
   */
  onClickMonth?: OnClickFunc;
  /**
   * Function called when the user clicks a week number.
   *
   * @example (weekNumber, date, event) => alert('Clicked week: ', weekNumber, 'that starts on: ', date)
   */
  onClickWeekNumber?: OnClickWeekNumberFunc;
  /**
   * Function called when the user clicks a year.
   *
   * @example (value, event) => alert('Clicked year: ', value)
   */
  onClickYear?: OnClickFunc;
  /**
   * Function called when the user drills down by clicking a tile.
   *
   * @example ({ activeStartDate, view }) => alert('Drilled down to: ', activeStartDate, view)
   */
  onDrillDown?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  /**
   * Function called when the user drills up by clicking drill up button.
   *
   * @example ({ activeStartDate, view }) => alert('Drilled up to: ', activeStartDate, view)
   */
  onDrillUp?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  /**
   * Function called when the user navigates from one view to another using drill up button or by clicking a tile.
   *
   * `action` signifies the reason for view change and can be one of the following values: `"prev"`, `"prev2"`, `"next"`, `"next2"`, `"drillUp"`, `"drillDown"`, `"onChange"`.
   *
   * @example ({ action, activeStartDate, value, view }) => alert('New view is: ', view)
   */
  onViewChange?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  /**
   * `aria-label` attribute of the "previous on higher level" button on the navigation pane.
   *
   * @example 'Jump backwards'
   */
  prev2AriaLabel?: string;
  /**
   * Content of the "previous on higher level" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '«'
   * @example <DoublePreviousIcon />
   */
  prev2Label?: React.ReactNode;
  /**
   * `aria-label` attribute of the "previous" button on the navigation pane.
   *
   * @example 'Previous'
   */
  prevAriaLabel?: string;
  /**
   * Content of the "previous" button on the navigation pane. Setting the value explicitly to null will hide the icon.
   *
   * @example '‹'
   * @example <PreviousIcon />
   */
  prevLabel?: React.ReactNode;
  /**
   * Which dates shall be passed by the calendar to the onChange function and onClick{Period} functions. Can be `"start"`, `"end"` or `"range"`. The latter will cause an array with start and end values to be passed.
   *
   * @default 'start'
   * @example 'range'
   */
  returnValue?: 'start' | 'end' | 'range';
  /**
   * Whether the user shall select two dates forming a range instead of just one. **Note**: This feature will make react-calendar return array with two dates regardless of returnValue setting.
   *
   * @default false
   * @example true
   */
  selectRange?: boolean;
  /**
   * Whether to show two months/years/… at a time instead of one. Defaults `showFixedNumberOfWeeks` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showDoubleView?: boolean;
  /**
   * Whether to always show fixed number of weeks (6). Forces `showNeighboringMonth` prop to be `true`.
   *
   * @default false
   * @example true
   */
  showFixedNumberOfWeeks?: boolean;
  /**
   * Whether a navigation bar with arrows and title shall be rendered.
   *
   * @default true
   * @example false
   */
  showNavigation?: boolean;
  /**
   * Whether decades from next century shall be rendered to fill the entire last row in.
   *
   * @default false
   * @example true
   */
  showNeighboringCentury?: boolean;
  /**
   * Whether years from next decade shall be rendered to fill the entire last row in.
   *
   * @default false
   * @example true
   */
  showNeighboringDecade?: boolean;
  /**
   * Whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively.
   *
   * @default true
   * @example false
   */
  showNeighboringMonth?: boolean;
  /**
   *  Whether week numbers shall be shown at the left of MonthView or not.
   *
   * @default false
   * @example true
   */
  showWeekNumbers?: boolean;
  /**
   * Class name(s) that will be applied to a given calendar item (day on month view, month on year view and so on).
   *
   * @example 'class1 class2'
   * @example ['class1', 'class2 class3']
   * @example ({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null
   */
  tileClassName?: TileClassNameFunc | ClassName;
  /**
   * Allows to render custom content within a given calendar item (day on month view, month on year view and so on).
   *
   * @example 'Sample'
   * @example ({ activeStartDate, date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
   */
  tileContent?: TileContentFunc | React.ReactNode;
  /**
   * Pass a function to determine if a certain day should be displayed as disabled.
   *
   * @example ({ activeStartDate, date, view }) => date.getDay() === 0
   */
  tileDisabled?: TileDisabledFunc;
  /**
   * Calendar value. Can be either one value or an array of two values. If you wish to use react-calendar in an uncontrolled way, use `defaultValue` instead.
   *
   * @example new Date(2017, 0, 1)
   * @example [new Date(2017, 0, 1), new Date(2017, 7, 1)]
   * @example ['2017-01-01', '2017-08-01']
   */
  value?: LooseValue;
  /**
   * Determines which calendar view shall be opened. Does not disable navigation. Can be `"month"`, `"year"`, `"decade"` or `"century"`. If you wish to use react-calendar in an uncontrolled way, use `defaultView` instead.
   *
   * @example 'year'
   */
  view?: View;
};

function toDate(value: Date | string): Date {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

/**
 * Returns views array with disallowed values cut off.
 */
function getLimitedViews(minDetail: Detail, maxDetail: Detail) {
  return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
}

/**
 * Determines whether a given view is allowed with currently applied settings.
 */
function isViewAllowed(view: Detail, minDetail: Detail, maxDetail: Detail) {
  const views = getLimitedViews(minDetail, maxDetail);

  return views.indexOf(view) !== -1;
}

/**
 * Gets either provided view if allowed by minDetail and maxDetail, or gets
 * the default view if not allowed.
 */
function getView(view: View | undefined, minDetail: Detail, maxDetail: Detail): View {
  if (!view) {
    return maxDetail;
  }

  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }

  return maxDetail;
}

/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType<T extends number>(view: (typeof allViews)[T]): (typeof allValueTypes)[T] {
  const index = allViews.indexOf(view) as T;

  return allValueTypes[index];
}

function getValue(value: LooseValue | undefined, index: 0 | 1): Date | null {
  const rawValue = Array.isArray(value) ? value[index] : value;

  if (!rawValue) {
    return null;
  }

  const valueDate = toDate(rawValue);

  if (Number.isNaN(valueDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueDate;
}

type DetailArgs = {
  value?: LooseValue;
  minDate?: Date;
  maxDate?: Date;
  maxDetail: Detail;
};

function getDetailValue({ value, minDate, maxDate, maxDetail }: DetailArgs, index: 0 | 1) {
  const valuePiece = getValue(value, index);

  if (!valuePiece) {
    return null;
  }

  const valueType = getValueType(maxDetail);

  const detailValueFrom = (() => {
    switch (index) {
      case 0:
        return getBegin(valueType, valuePiece);
      case 1:
        return getEnd(valueType, valuePiece);
      default:
        throw new Error(`Invalid index value: ${index}`);
    }
  })();

  return between(detailValueFrom, minDate, maxDate);
}

const getDetailValueFrom = (args: DetailArgs) => getDetailValue(args, 0);

const getDetailValueTo = (args: DetailArgs) => getDetailValue(args, 1);

const getDetailValueArray = (args: DetailArgs) =>
  [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args)) as [
    ReturnType<typeof getDetailValueFrom>,
    ReturnType<typeof getDetailValueTo>,
  ];

function getActiveStartDate({
  maxDate,
  maxDetail,
  minDate,
  minDetail,
  value,
  view,
}: DetailArgs & {
  minDetail: Detail;
  view?: View;
}) {
  const rangeType = getView(view, minDetail, maxDetail);
  const valueFrom =
    getDetailValueFrom({
      value,
      minDate,
      maxDate,
      maxDetail,
    }) || new Date();

  return getBegin(rangeType, valueFrom);
}

function getInitialActiveStartDate({
  activeStartDate,
  defaultActiveStartDate,
  defaultValue,
  defaultView,
  maxDate,
  maxDetail,
  minDate,
  minDetail,
  value,
  view,
}: {
  activeStartDate?: Date;
  defaultActiveStartDate?: Date;
  defaultValue?: LooseValue;
  defaultView?: View;
  maxDate: Date;
  maxDetail: Detail;
  minDate: Date;
  minDetail: Detail;
  value?: LooseValue;
  view?: View;
}) {
  const rangeType = getView(view, minDetail, maxDetail);
  const valueFrom = activeStartDate || defaultActiveStartDate;

  if (valueFrom) {
    return getBegin(rangeType, valueFrom);
  }

  return getActiveStartDate({
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value: value || defaultValue,
    view: view || defaultView,
  });
}

function getIsSingleValue<T>(value: T | T[]): value is T {
  return value && (!Array.isArray(value) || value.length === 1);
}

function areDatesEqual(date1?: Date | null, date2?: Date | null) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}

const Calendar: React.ForwardRefExoticComponent<CalendarProps & React.RefAttributes<unknown>> =
  forwardRef(function Calendar(props, ref) {
    const {
      activeStartDate: activeStartDateProps,
      allowPartialRange,
      calendarType,
      className,
      defaultActiveStartDate,
      defaultValue,
      defaultView,
      formatDay,
      formatLongDate,
      formatMonth,
      formatMonthYear,
      formatShortWeekday,
      formatWeekday,
      formatYear,
      goToRangeStartOnSelect = true,
      inputRef,
      locale,
      maxDate = defaultMaxDate,
      maxDetail = 'month',
      minDate = defaultMinDate,
      minDetail = 'century',
      navigationAriaLabel,
      navigationAriaLive,
      navigationLabel,
      next2AriaLabel,
      next2Label,
      nextAriaLabel,
      nextLabel,
      onActiveStartDateChange,
      onChange: onChangeProps,
      onClickDay,
      onClickDecade,
      onClickMonth,
      onClickWeekNumber,
      onClickYear,
      onDrillDown,
      onDrillUp,
      onViewChange,
      prev2AriaLabel,
      prev2Label,
      prevAriaLabel,
      prevLabel,
      returnValue = 'start',
      selectRange,
      showDoubleView,
      showFixedNumberOfWeeks,
      showNavigation = true,
      showNeighboringCentury,
      showNeighboringDecade,
      showNeighboringMonth = true,
      showWeekNumbers,
      tileClassName,
      tileContent,
      tileDisabled,
      value: valueProps,
      view: viewProps,
    } = props;

    const [activeStartDateState, setActiveStartDateState] = useState<Date | null | undefined>(
      defaultActiveStartDate,
    );
    const [hoverState, setHoverState] = useState<Date | null>(null);
    const [valueState, setValueState] = useState<Value | undefined>(
      Array.isArray(defaultValue)
        ? (defaultValue.map((el) => (el !== null ? toDate(el) : null)) as Range<Date | null>)
        : defaultValue !== null && defaultValue !== undefined
          ? toDate(defaultValue)
          : null,
    );
    const [viewState, setViewState] = useState<View | undefined>(defaultView);

    const activeStartDate =
      activeStartDateProps ||
      activeStartDateState ||
      getInitialActiveStartDate({
        activeStartDate: activeStartDateProps,
        defaultActiveStartDate,
        defaultValue,
        defaultView,
        maxDate,
        maxDetail,
        minDate,
        minDetail,
        value: valueProps,
        view: viewProps,
      });

    const value: Value = (() => {
      const rawValue = (() => {
        // In the middle of range selection, use value from state
        if (selectRange && getIsSingleValue(valueState)) {
          return valueState;
        }

        return valueProps !== undefined ? valueProps : valueState;
      })();

      if (!rawValue) {
        return null;
      }

      return Array.isArray(rawValue)
        ? (rawValue.map((el) => (el !== null ? toDate(el) : null)) as Range<Date | null>)
        : rawValue !== null
          ? toDate(rawValue)
          : null;
    })();

    const valueType = getValueType(maxDetail);

    const view = getView(viewProps || viewState, minDetail, maxDetail);

    const views = getLimitedViews(minDetail, maxDetail);

    const hover = selectRange ? hoverState : null;

    const drillDownAvailable = views.indexOf(view) < views.length - 1;

    const drillUpAvailable = views.indexOf(view) > 0;

    const getProcessedValue = useCallback(
      (value: Date) => {
        const processFunction = (() => {
          switch (returnValue) {
            case 'start':
              return getDetailValueFrom;
            case 'end':
              return getDetailValueTo;
            case 'range':
              return getDetailValueArray;
            default:
              throw new Error('Invalid returnValue.');
          }
        })();

        return processFunction({
          maxDate,
          maxDetail,
          minDate,
          value,
        });
      },
      [maxDate, maxDetail, minDate, returnValue],
    );

    const setActiveStartDate = useCallback(
      (nextActiveStartDate: Date, action: Action) => {
        setActiveStartDateState(nextActiveStartDate);

        const args: OnArgs = {
          action,
          activeStartDate: nextActiveStartDate,
          value,
          view,
        };

        if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
          onActiveStartDateChange(args);
        }
      },
      [activeStartDate, onActiveStartDateChange, value, view],
    );

    const onClickTile = useCallback(
      (value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        const callback = (() => {
          switch (view) {
            case 'century':
              return onClickDecade;
            case 'decade':
              return onClickYear;
            case 'year':
              return onClickMonth;
            case 'month':
              return onClickDay;
            default:
              throw new Error(`Invalid view: ${view}.`);
          }
        })();

        if (callback) callback(value, event);
      },
      [onClickDay, onClickDecade, onClickMonth, onClickYear, view],
    );

    const drillDown = useCallback(
      (nextActiveStartDate: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        if (!drillDownAvailable) {
          return;
        }

        onClickTile(nextActiveStartDate, event);

        const nextView = views[views.indexOf(view) + 1];

        if (!nextView) {
          throw new Error('Attempted to drill down from the lowest view.');
        }

        setActiveStartDateState(nextActiveStartDate);
        setViewState(nextView);

        const args: OnArgs = {
          action: 'drillDown',
          activeStartDate: nextActiveStartDate,
          value,
          view: nextView,
        };

        if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
          onActiveStartDateChange(args);
        }

        if (onViewChange && view !== nextView) {
          onViewChange(args);
        }

        if (onDrillDown) {
          onDrillDown(args);
        }
      },
      [
        activeStartDate,
        drillDownAvailable,
        onActiveStartDateChange,
        onClickTile,
        onDrillDown,
        onViewChange,
        value,
        view,
        views,
      ],
    );

    const drillUp = useCallback(() => {
      if (!drillUpAvailable) {
        return;
      }

      const nextView = views[views.indexOf(view) - 1];

      if (!nextView) {
        throw new Error('Attempted to drill up from the highest view.');
      }

      const nextActiveStartDate = getBegin(nextView, activeStartDate);

      setActiveStartDateState(nextActiveStartDate);
      setViewState(nextView);

      const args: OnArgs = {
        action: 'drillUp',
        activeStartDate: nextActiveStartDate,
        value,
        view: nextView,
      };

      if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
        onActiveStartDateChange(args);
      }

      if (onViewChange && view !== nextView) {
        onViewChange(args);
      }

      if (onDrillUp) {
        onDrillUp(args);
      }
    }, [
      activeStartDate,
      drillUpAvailable,
      onActiveStartDateChange,
      onDrillUp,
      onViewChange,
      value,
      view,
      views,
    ]);

    const onChange = useCallback(
      (rawNextValue: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        const previousValue = value;

        onClickTile(rawNextValue, event);

        const isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);

        let nextValue: Value;
        if (selectRange) {
          // Range selection turned on

          if (isFirstValueInRange) {
            // Value has 0 or 2 elements - either way we're starting a new array
            // First value
            nextValue = getBegin(valueType, rawNextValue);
          } else {
            if (!previousValue) {
              throw new Error('previousValue is required');
            }

            if (Array.isArray(previousValue)) {
              throw new Error('previousValue must not be an array');
            }

            // Second value
            nextValue = getValueRange(valueType, previousValue, rawNextValue);
          }
        } else {
          // Range selection turned off
          nextValue = getProcessedValue(rawNextValue);
        }

        const nextActiveStartDate =
          // Range selection turned off
          !selectRange ||
          // Range selection turned on, first value
          isFirstValueInRange ||
          // Range selection turned on, second value, goToRangeStartOnSelect toggled on
          goToRangeStartOnSelect
            ? getActiveStartDate({
                maxDate,
                maxDetail,
                minDate,
                minDetail,
                value: nextValue,
                view,
              })
            : null;

        event.persist();

        setActiveStartDateState(nextActiveStartDate);
        setValueState(nextValue);

        const args: OnArgs = {
          action: 'onChange',
          activeStartDate: nextActiveStartDate,
          value: nextValue,
          view,
        };

        if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
          onActiveStartDateChange(args);
        }

        if (onChangeProps) {
          if (selectRange) {
            const isSingleValue = getIsSingleValue(nextValue);

            if (!isSingleValue) {
              onChangeProps(nextValue || null, event);
            } else if (allowPartialRange) {
              if (Array.isArray(nextValue)) {
                throw new Error('value must not be an array');
              }

              onChangeProps([nextValue || null, null], event);
            }
          } else {
            onChangeProps(nextValue || null, event);
          }
        }
      },
      [
        activeStartDate,
        allowPartialRange,
        getProcessedValue,
        goToRangeStartOnSelect,
        maxDate,
        maxDetail,
        minDate,
        minDetail,
        onActiveStartDateChange,
        onChangeProps,
        onClickTile,
        selectRange,
        value,
        valueType,
        view,
      ],
    );

    function onMouseOver(nextHover: Date) {
      setHoverState(nextHover);
    }

    function onMouseLeave() {
      setHoverState(null);
    }

    useImperativeHandle(
      ref,
      () => ({
        activeStartDate,
        drillDown,
        drillUp,
        onChange,
        setActiveStartDate,
        value,
        view,
      }),
      [activeStartDate, drillDown, drillUp, onChange, setActiveStartDate, value, view],
    );

    function renderContent(next?: boolean) {
      const currentActiveStartDate = next
        ? getBeginNext(view, activeStartDate)
        : getBegin(view, activeStartDate);

      const onClick = drillDownAvailable ? drillDown : onChange;

      const commonProps = {
        activeStartDate: currentActiveStartDate,
        hover,
        locale,
        maxDate,
        minDate,
        onClick,
        onMouseOver: selectRange ? onMouseOver : undefined,
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
              showNeighboringCentury={showNeighboringCentury}
              {...commonProps}
            />
          );
        }
        case 'decade': {
          return (
            <DecadeView
              formatYear={formatYear}
              showNeighboringDecade={showNeighboringDecade}
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
              formatDay={formatDay}
              formatLongDate={formatLongDate}
              formatShortWeekday={formatShortWeekday}
              formatWeekday={formatWeekday}
              onClickWeekNumber={onClickWeekNumber}
              onMouseLeave={selectRange ? onMouseLeave : undefined}
              showFixedNumberOfWeeks={
                typeof showFixedNumberOfWeeks !== 'undefined'
                  ? showFixedNumberOfWeeks
                  : showDoubleView
              }
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

    function renderNavigation() {
      if (!showNavigation) {
        return null;
      }

      return (
        <Navigation
          activeStartDate={activeStartDate}
          drillUp={drillUp}
          formatMonthYear={formatMonthYear}
          formatYear={formatYear}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          navigationAriaLabel={navigationAriaLabel}
          navigationAriaLive={navigationAriaLive}
          navigationLabel={navigationLabel}
          next2AriaLabel={next2AriaLabel}
          next2Label={next2Label}
          nextAriaLabel={nextAriaLabel}
          nextLabel={nextLabel}
          prev2AriaLabel={prev2AriaLabel}
          prev2Label={prev2Label}
          prevAriaLabel={prevAriaLabel}
          prevLabel={prevLabel}
          setActiveStartDate={setActiveStartDate}
          showDoubleView={showDoubleView}
          view={view}
          views={views}
        />
      );
    }

    const valueArray = Array.isArray(value) ? value : [value];

    return (
      <div
        className={clsx(
          baseClassName,
          selectRange && valueArray.length === 1 && `${baseClassName}--selectRange`,
          showDoubleView && `${baseClassName}--doubleView`,
          className,
        )}
        ref={inputRef}
      >
        {renderNavigation()}
        <div
          className={`${baseClassName}__viewContainer`}
          onBlur={selectRange ? onMouseLeave : undefined}
          onMouseLeave={selectRange ? onMouseLeave : undefined}
        >
          {renderContent()}
          {showDoubleView ? renderContent(true) : null}
        </div>
      </div>
    );
  });

export default Calendar;
