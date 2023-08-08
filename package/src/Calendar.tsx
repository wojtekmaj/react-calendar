'use client';

import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Navigation from './Calendar/Navigation.js';
import CenturyView from './CenturyView.js';
import DecadeView from './DecadeView.js';
import YearView from './YearView.js';
import MonthView from './MonthView.js';

import { getBegin, getBeginNext, getEnd, getValueRange } from './shared/dates.js';
import {
  isCalendarType,
  isClassName,
  isMaxDate,
  isMinDate,
  isRef,
  isView,
  rangeOf,
} from './shared/propTypes.js';
import { between } from './shared/utils.js';

import type {
  Action,
  CalendarType,
  ClassName,
  DeprecatedCalendarType,
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
  activeStartDate?: Date;
  allowPartialRange?: boolean;
  calendarType?: CalendarType | DeprecatedCalendarType;
  className?: ClassName;
  defaultActiveStartDate?: Date;
  defaultValue?: LooseValue;
  defaultView?: View;
  formatDay?: typeof defaultFormatDay;
  formatLongDate?: typeof defaultFormatLongDate;
  formatMonth?: typeof defaultFormatMonth;
  formatMonthYear?: typeof defaultFormatMonthYear;
  formatShortWeekday?: typeof defaultFormatShortWeekday;
  formatWeekday?: typeof defaultFormatWeekday;
  formatYear?: typeof defaultFormatYear;
  goToRangeStartOnSelect?: boolean;
  inputRef?: React.Ref<HTMLDivElement>;
  locale?: string;
  maxDate?: Date;
  maxDetail?: Detail;
  minDate?: Date;
  minDetail?: Detail;
  navigationAriaLabel?: string;
  navigationAriaLive?: 'off' | 'polite' | 'assertive';
  navigationLabel?: NavigationLabelFunc;
  next2AriaLabel?: string;
  next2Label?: React.ReactNode;
  nextAriaLabel?: string;
  nextLabel?: React.ReactNode;
  onActiveStartDateChange?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  onChange?: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDay?: OnClickFunc;
  onClickDecade?: OnClickFunc;
  onClickMonth?: OnClickFunc;
  onClickWeekNumber?: OnClickWeekNumberFunc;
  onClickYear?: OnClickFunc;
  onDrillDown?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  onDrillUp?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  onViewChange?: ({ action, activeStartDate, value, view }: OnArgs) => void;
  prev2AriaLabel?: string;
  prev2Label?: React.ReactNode;
  prevAriaLabel?: string;
  prevLabel?: React.ReactNode;
  returnValue?: 'start' | 'end' | 'range';
  selectRange?: boolean;
  showDoubleView?: boolean;
  showFixedNumberOfWeeks?: boolean;
  showNavigation?: boolean;
  showNeighboringMonth?: boolean;
  showWeekNumbers?: boolean;
  tileClassName?: TileClassNameFunc | ClassName;
  tileContent?: TileContentFunc | React.ReactNode;
  tileDisabled?: TileDisabledFunc;
  value?: LooseValue;
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

  if (isNaN(valueDate.getTime())) {
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

const Calendar = forwardRef(function Calendar(props: CalendarProps, ref) {
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
        return <CenturyView formatYear={formatYear} {...commonProps} />;
      }
      case 'decade': {
        return <DecadeView formatYear={formatYear} {...commonProps} />;
      }
      case 'year': {
        return (
          <YearView formatMonth={formatMonth} formatMonthYear={formatMonthYear} {...commonProps} />
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

const isActiveStartDate = PropTypes.instanceOf(Date);

const isValue = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]);

const isValueOrValueArray = PropTypes.oneOfType([isValue, rangeOf(isValue)]);

Calendar.propTypes = {
  activeStartDate: isActiveStartDate,
  allowPartialRange: PropTypes.bool,
  calendarType: isCalendarType,
  className: isClassName,
  defaultActiveStartDate: isActiveStartDate,
  defaultValue: isValueOrValueArray,
  defaultView: isView,
  formatDay: PropTypes.func,
  formatLongDate: PropTypes.func,
  formatMonth: PropTypes.func,
  formatMonthYear: PropTypes.func,
  formatShortWeekday: PropTypes.func,
  formatWeekday: PropTypes.func,
  formatYear: PropTypes.func,
  goToRangeStartOnSelect: PropTypes.bool,
  inputRef: isRef,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  minDetail: PropTypes.oneOf(allViews),
  navigationAriaLabel: PropTypes.string,
  navigationAriaLive: PropTypes.oneOf(['off', 'polite', 'assertive'] as const),
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.node,
  onActiveStartDateChange: PropTypes.func,
  onChange: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickDecade: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onClickYear: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDrillUp: PropTypes.func,
  onViewChange: PropTypes.func,
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.node,
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.node,
  returnValue: PropTypes.oneOf(['start', 'end', 'range'] as const),
  selectRange: PropTypes.bool,
  showDoubleView: PropTypes.bool,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNavigation: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  tileClassName: PropTypes.oneOfType([PropTypes.func, isClassName]),
  tileContent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tileDisabled: PropTypes.func,
  value: isValueOrValueArray,
  view: isView,
};

export default Calendar;
