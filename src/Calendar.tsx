import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Navigation from './Calendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getBegin, getBeginNext, getEnd, getValueRange } from './shared/dates';
import {
  isCalendarType,
  isClassName,
  isMaxDate,
  isMinDate,
  isRef,
  isView,
} from './shared/propTypes';
import { between } from './shared/utils';

import type {
  Action,
  CalendarType,
  ClassName,
  Detail,
  LooseValue,
  NavigationLabelFunc,
  OnArgs,
  OnChangeFunc,
  OnClickWeekNumberFunc,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  Value,
  View,
} from './shared/types';

import type {
  formatDay as defaultFormatDay,
  formatLongDate as defaultFormatLongDate,
  formatMonth as defaultFormatMonth,
  formatMonthYear as defaultFormatMonthYear,
  formatShortWeekday as defaultFormatShortWeekday,
  formatWeekday as defaultFormatWeekday,
  formatYear as defaultFormatYear,
} from './shared/dateFormatter';

const baseClassName = 'react-calendar';
const allViews = ['century', 'decade', 'year', 'month'] as const;
const allValueTypes = ['decade', 'year', 'month', 'day'] as const;

const defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
const defaultMaxDate = new Date(8.64e15);

const defaultProps = {
  goToRangeStartOnSelect: true,
  maxDate: defaultMaxDate,
  maxDetail: 'month',
  minDate: defaultMinDate,
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
};

type CalendarProps = {
  activeStartDate?: Date;
  allowPartialRange?: boolean;
  calendarType?: CalendarType;
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
  onClickDay?: OnChangeFunc;
  onClickDecade?: OnChangeFunc;
  onClickMonth?: OnChangeFunc;
  onClickWeekNumber?: OnClickWeekNumberFunc;
  onClickYear?: OnChangeFunc;
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

type CalendarPropsWithDefaults = typeof defaultProps & CalendarProps;

type CalendarState = {
  action?: Action;
  activeStartDate?: Date | null;
  hover?: Date | null;
  value?: Value;
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

function getActiveStartDate(
  props: DetailArgs & {
    minDetail: Detail;
    view?: View;
  },
) {
  const { maxDate, maxDetail, minDate, minDetail, value, view } = props;

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

function getInitialActiveStartDate(props: CalendarPropsWithDefaults) {
  const {
    activeStartDate,
    defaultActiveStartDate,
    defaultValue,
    defaultView,
    maxDetail,
    minDetail,
    value,
    view,
    ...otherProps
  } = props;

  const rangeType = getView(view, minDetail, maxDetail);
  const valueFrom = activeStartDate || defaultActiveStartDate;

  if (valueFrom) {
    return getBegin(rangeType, valueFrom);
  }

  return getActiveStartDate({
    maxDetail,
    minDetail,
    value: value || defaultValue,
    view: view || defaultView,
    ...otherProps,
  });
}

function getIsSingleValue<T>(value: T | T[]): value is T {
  return value && (!Array.isArray(value) || value.length === 1);
}

const isActiveStartDate = PropTypes.instanceOf(Date);

const isValue = PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]);

const isValueOrValueArray = PropTypes.oneOfType([isValue, PropTypes.arrayOf(isValue)]);

export default class Calendar extends Component<CalendarProps, CalendarState> {
  static defaultProps = defaultProps;

  static propTypes = {
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
    navigationAriaLive: PropTypes.oneOf(['off', 'polite', 'assertive']),
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
    returnValue: PropTypes.oneOf(['start', 'end', 'range']),
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

  state: Readonly<CalendarState> = {
    activeStartDate: this.props.defaultActiveStartDate,
    hover: null,
    value: Array.isArray(this.props.defaultValue)
      ? (this.props.defaultValue.map((el) => (el !== null ? toDate(el) : el)) as [
          Date | null,
          Date | null,
        ])
      : this.props.defaultValue !== null && this.props.defaultValue !== undefined
      ? toDate(this.props.defaultValue)
      : this.props.defaultValue,
    view: this.props.defaultView,
  };

  get activeStartDate() {
    const { activeStartDate: activeStartDateProps } = this.props as CalendarPropsWithDefaults;
    const { activeStartDate: activeStartDateState } = this.state;

    return (
      activeStartDateProps ||
      activeStartDateState ||
      getInitialActiveStartDate(this.props as CalendarPropsWithDefaults)
    );
  }

  get value(): Value {
    const { selectRange, value: valueProps } = this.props as CalendarPropsWithDefaults;
    const { value: valueState } = this.state;

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
      ? (rawValue.map((el) => (el !== null ? toDate(el) : el)) as [Date | null, Date | null])
      : rawValue !== null
      ? toDate(rawValue)
      : rawValue;
  }

  get valueType() {
    const { maxDetail } = this.props as CalendarPropsWithDefaults;

    return getValueType(maxDetail);
  }

  get view() {
    const { minDetail, maxDetail, view: viewProps } = this.props as CalendarPropsWithDefaults;
    const { view: viewState } = this.state;

    return getView(viewProps || viewState, minDetail, maxDetail);
  }

  get views() {
    const { minDetail, maxDetail } = this.props as CalendarPropsWithDefaults;

    return getLimitedViews(minDetail, maxDetail);
  }

  get hover() {
    const { selectRange } = this.props as CalendarPropsWithDefaults;
    const { hover } = this.state;

    return selectRange ? hover : null;
  }

  get drillDownAvailable() {
    const { view, views } = this;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { view, views } = this;

    return views.indexOf(view) > 0;
  }

  /**
   * Gets current value in a desired format.
   */
  getProcessedValue(value: Date) {
    const { minDate, maxDate, maxDetail, returnValue } = this.props as CalendarPropsWithDefaults;

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
      value,
      minDate,
      maxDate,
      maxDetail,
    });
  }

  setStateAndCallCallbacks = (
    nextState: {
      action: Action;
      activeStartDate: Date | null;
      value?: Value;
      view?: View;
    },
    event?: React.MouseEvent<HTMLButtonElement> | undefined,
    callback?: ({ action, activeStartDate, value, view }: OnArgs) => void,
  ) => {
    const { activeStartDate: previousActiveStartDate, view: previousView } = this;

    const { allowPartialRange, onActiveStartDateChange, onChange, onViewChange, selectRange } = this
      .props as CalendarPropsWithDefaults;

    const prevArgs = {
      action: undefined,
      activeStartDate: previousActiveStartDate,
      value: undefined,
      view: previousView,
    };

    this.setState(nextState, () => {
      const args = {
        action: nextState.action,
        activeStartDate: nextState.activeStartDate || this.activeStartDate,
        value: ('value' in nextState && nextState.value) || this.value,
        view: ('view' in nextState && nextState.view) || this.view,
      };

      function shouldUpdate(key: keyof OnArgs) {
        // Key must exist, and…
        if (!(key in nextState)) {
          return false;
        }

        const nextValue = nextState[key];
        const prevValue = prevArgs[key];

        // …key changed from defined to undefined or the other way around, or…
        if (typeof nextValue !== typeof prevValue) {
          return true;
        }

        // …value changed.
        if (nextValue instanceof Date && prevValue instanceof Date) {
          return nextValue.getTime() !== prevValue.getTime();
        } else {
          return nextValue !== prevValue;
        }
      }

      if (shouldUpdate('activeStartDate')) {
        if (onActiveStartDateChange) onActiveStartDateChange(args);
      }

      if (shouldUpdate('view')) {
        if (onViewChange) onViewChange(args);
      }

      if (shouldUpdate('value')) {
        if (onChange) {
          if (!event) {
            throw new Error('event is required');
          }

          if (selectRange) {
            const isSingleValue = getIsSingleValue(nextState.value);

            if (!isSingleValue) {
              onChange(nextState.value || null, event);
            } else if (allowPartialRange) {
              if (Array.isArray(nextState.value)) {
                throw new Error('value must not be an array');
              }

              onChange([nextState.value || null, null], event);
            }
          } else {
            onChange(nextState.value || null, event);
          }
        }
      }

      if (callback) callback(args);
    });
  };

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveStartDate = (nextActiveStartDate: Date, action: Action) => {
    this.setStateAndCallCallbacks({
      action,
      activeStartDate: nextActiveStartDate,
    });
  };

  drillDown = (nextActiveStartDate: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    if (!this.drillDownAvailable) {
      return;
    }

    this.onClickTile(nextActiveStartDate, event);

    const { view, views } = this;
    const { onDrillDown } = this.props as CalendarPropsWithDefaults;

    const nextView = views[views.indexOf(view) + 1];

    if (!nextView) {
      throw new Error('Attempted to drill down from the lowest view.');
    }

    this.setStateAndCallCallbacks(
      {
        action: 'drillDown',
        activeStartDate: nextActiveStartDate,
        view: nextView,
      },
      undefined,
      onDrillDown,
    );
  };

  drillUp = () => {
    if (!this.drillUpAvailable) {
      return;
    }

    const { activeStartDate, view, views } = this;
    const { onDrillUp } = this.props as CalendarPropsWithDefaults;

    const nextView = views[views.indexOf(view) - 1];

    if (!nextView) {
      throw new Error('Attempted to drill up from the highest view.');
    }

    const nextActiveStartDate = getBegin(nextView, activeStartDate);

    this.setStateAndCallCallbacks(
      {
        action: 'drillUp',
        activeStartDate: nextActiveStartDate,
        view: nextView,
      },
      undefined,
      onDrillUp,
    );
  };

  onChange = (value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    const { value: previousValue } = this;
    const { goToRangeStartOnSelect, selectRange } = this.props as CalendarPropsWithDefaults;

    this.onClickTile(value, event);

    const isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);

    let nextValue: Value;
    if (selectRange) {
      // Range selection turned on
      const { valueType } = this;

      if (isFirstValueInRange) {
        // Value has 0 or 2 elements - either way we're starting a new array
        // First value
        nextValue = getBegin(valueType, value);
      } else {
        if (!previousValue) {
          throw new Error('previousValue is required');
        }

        if (Array.isArray(previousValue)) {
          throw new Error('previousValue must not be an array');
        }

        // Second value
        nextValue = getValueRange(valueType, previousValue, value);
      }
    } else {
      // Range selection turned off
      nextValue = this.getProcessedValue(value);
    }

    const nextActiveStartDate =
      // Range selection turned off
      !selectRange ||
      // Range selection turned on, first value
      isFirstValueInRange ||
      // Range selection turned on, second value, goToRangeStartOnSelect toggled on
      goToRangeStartOnSelect
        ? getActiveStartDate({
            ...(this.props as CalendarPropsWithDefaults),
            value: nextValue,
          })
        : null;

    event.persist();

    this.setStateAndCallCallbacks(
      {
        action: 'onChange',
        activeStartDate: nextActiveStartDate,
        value: nextValue,
      },
      event,
    );
  };

  onClickTile = (value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    const { view } = this;
    const { onClickDay, onClickDecade, onClickMonth, onClickYear } = this
      .props as CalendarPropsWithDefaults;

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
  };

  onMouseOver = (value: Date) => {
    this.setState((prevState) => {
      if (prevState.hover && prevState.hover.getTime() === value.getTime()) {
        return null;
      }

      return { hover: value };
    });
  };

  onMouseLeave = () => {
    this.setState({ hover: null });
  };

  renderContent(next?: boolean) {
    const { activeStartDate: currentActiveStartDate, onMouseOver, valueType, value, view } = this;
    const {
      calendarType,
      locale,
      maxDate,
      minDate,
      selectRange,
      tileClassName,
      tileContent,
      tileDisabled,
    } = this.props as CalendarPropsWithDefaults;
    const { hover } = this;

    const activeStartDate = next
      ? getBeginNext(view, currentActiveStartDate)
      : getBegin(view, currentActiveStartDate);

    const onClick = this.drillDownAvailable ? this.drillDown : this.onChange;

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
        const { formatYear } = this.props as CalendarPropsWithDefaults;

        return <CenturyView formatYear={formatYear} {...commonProps} />;
      }
      case 'decade': {
        const { formatYear } = this.props as CalendarPropsWithDefaults;

        return <DecadeView formatYear={formatYear} {...commonProps} />;
      }
      case 'year': {
        const { formatMonth, formatMonthYear } = this.props as CalendarPropsWithDefaults;

        return (
          <YearView formatMonth={formatMonth} formatMonthYear={formatMonthYear} {...commonProps} />
        );
      }
      case 'month': {
        const {
          formatDay,
          formatLongDate,
          formatShortWeekday,
          formatWeekday,
          onClickWeekNumber,
          showDoubleView,
          showFixedNumberOfWeeks,
          showNeighboringMonth,
          showWeekNumbers,
        } = this.props as CalendarPropsWithDefaults;
        const { onMouseLeave } = this;

        return (
          <MonthView
            calendarType={calendarType}
            formatDay={formatDay}
            formatLongDate={formatLongDate}
            formatShortWeekday={formatShortWeekday}
            formatWeekday={formatWeekday}
            onClickWeekNumber={onClickWeekNumber}
            onMouseLeave={selectRange ? onMouseLeave : null}
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

  renderNavigation() {
    const { showNavigation } = this.props as CalendarPropsWithDefaults;

    if (!showNavigation) {
      return null;
    }

    const { activeStartDate, view, views } = this;
    const {
      formatMonthYear,
      formatYear,
      locale,
      maxDate,
      minDate,
      navigationAriaLabel,
      navigationAriaLive,
      navigationLabel,
      next2AriaLabel,
      next2Label,
      nextAriaLabel,
      nextLabel,
      prev2AriaLabel,
      prev2Label,
      prevAriaLabel,
      prevLabel,
      showDoubleView,
    } = this.props as CalendarPropsWithDefaults;

    return (
      <Navigation
        activeStartDate={activeStartDate}
        drillUp={this.drillUp}
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
        setActiveStartDate={this.setActiveStartDate}
        showDoubleView={showDoubleView}
        view={view}
        views={views}
      />
    );
  }

  render() {
    const { className, inputRef, selectRange, showDoubleView } = this
      .props as CalendarPropsWithDefaults;
    const { onMouseLeave, value } = this;
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
        {this.renderNavigation()}
        <div
          className={`${baseClassName}__viewContainer`}
          onBlur={selectRange ? onMouseLeave : undefined}
          onMouseLeave={selectRange ? onMouseLeave : undefined}
        >
          {this.renderContent()}
          {showDoubleView ? this.renderContent(true) : null}
        </div>
      </div>
    );
  }
}
