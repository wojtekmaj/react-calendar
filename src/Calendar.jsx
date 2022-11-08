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
  isValue,
  isView,
} from './shared/propTypes';
import { between } from './shared/utils';

const defaultMinDate = new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
const defaultMaxDate = new Date(8.64e15);

const baseClassName = 'react-calendar';
const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

/**
 * Returns views array with disallowed values cut off.
 */
function getLimitedViews(minDetail, maxDetail) {
  return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
}

/**
 * Determines whether a given view is allowed with currently applied settings.
 */
function isViewAllowed(view, minDetail, maxDetail) {
  const views = getLimitedViews(minDetail, maxDetail);

  return views.indexOf(view) !== -1;
}

/**
 * Gets either provided view if allowed by minDetail and maxDetail, or gets
 * the default view if not allowed.
 */
function getView(view, minDetail, maxDetail) {
  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }

  return maxDetail;
}

/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(maxDetail) {
  return allValueTypes[allViews.indexOf(maxDetail)];
}

function getValue(value, index) {
  if (!value) {
    return null;
  }

  const rawValue = Array.isArray(value) && value.length === 2 ? value[index] : value;

  if (!rawValue) {
    return null;
  }

  const valueDate = toDate(rawValue);

  if (isNaN(valueDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueDate;
}

function getDetailValue({ value, minDate, maxDate, maxDetail }, index) {
  const valuePiece = getValue(value, index);

  if (!valuePiece) {
    return null;
  }

  const valueType = getValueType(maxDetail);
  const detailValueFrom = [getBegin, getEnd][index](valueType, valuePiece);

  return between(detailValueFrom, minDate, maxDate);
}

const getDetailValueFrom = (args) => getDetailValue(args, 0);

const getDetailValueTo = (args) => getDetailValue(args, 1);

const getDetailValueArray = (args) => {
  const { value } = args;

  if (Array.isArray(value)) {
    return value;
  }

  return [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args));
};

function getActiveStartDate(props) {
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

function getInitialActiveStartDate(props) {
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

const getIsSingleValue = (value) => value && [].concat(value).length === 1;

export default class Calendar extends Component {
  state = {
    activeStartDate: this.props.defaultActiveStartDate,
    value: this.props.defaultValue,
    view: this.props.defaultView,
  };

  get activeStartDate() {
    const { activeStartDate: activeStartDateProps } = this.props;
    const { activeStartDate: activeStartDateState } = this.state;

    return activeStartDateProps || activeStartDateState || getInitialActiveStartDate(this.props);
  }

  get value() {
    const { selectRange, value: valueProps } = this.props;
    const { value: valueState } = this.state;

    // In the middle of range selection, use value from state
    if (selectRange && getIsSingleValue(valueState)) {
      return valueState;
    }

    return valueProps !== undefined ? valueProps : valueState;
  }

  get valueType() {
    const { maxDetail } = this.props;

    return getValueType(maxDetail);
  }

  get view() {
    const { minDetail, maxDetail, view: viewProps } = this.props;
    const { view: viewState } = this.state;

    return getView(viewProps || viewState, minDetail, maxDetail);
  }

  get views() {
    const { minDetail, maxDetail } = this.props;

    return getLimitedViews(minDetail, maxDetail);
  }

  get hover() {
    const { selectRange } = this.props;
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
  getProcessedValue(value) {
    const { minDate, maxDate, maxDetail, returnValue } = this.props;

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

  setStateAndCallCallbacks = (nextState, event, callback) => {
    const { activeStartDate: previousActiveStartDate, view: previousView } = this;

    const { allowPartialRange, onActiveStartDateChange, onChange, onViewChange, selectRange } =
      this.props;

    const prevArgs = {
      activeStartDate: previousActiveStartDate,
      view: previousView,
    };

    this.setState(nextState, () => {
      const args = {
        action: nextState.action,
        activeStartDate: nextState.activeStartDate || this.activeStartDate,
        value: nextState.value || this.value,
        view: nextState.view || this.view,
      };

      function shouldUpdate(key) {
        return (
          // Key must exist, and…
          key in nextState &&
          // …key changed from undefined to defined or the other way around, or…
          (typeof nextState[key] !== typeof prevArgs[key] ||
            // …value changed.
            (nextState[key] instanceof Date
              ? nextState[key].getTime() !== prevArgs[key].getTime()
              : nextState[key] !== prevArgs[key]))
        );
      }

      if (shouldUpdate('activeStartDate')) {
        if (onActiveStartDateChange) onActiveStartDateChange(args);
      }

      if (shouldUpdate('view')) {
        if (onViewChange) onViewChange(args);
      }

      if (shouldUpdate('value')) {
        if (onChange) {
          if (selectRange) {
            const isSingleValue = getIsSingleValue(nextState.value);

            if (!isSingleValue) {
              onChange(nextState.value, event);
            } else if (allowPartialRange) {
              onChange([nextState.value], event);
            }
          } else {
            onChange(nextState.value, event);
          }
        }
      }

      if (callback) callback(args);
    });
  };

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveStartDate = (nextActiveStartDate, action) => {
    this.setStateAndCallCallbacks({
      action,
      activeStartDate: nextActiveStartDate,
    });
  };

  drillDown = (nextActiveStartDate, event) => {
    if (!this.drillDownAvailable) {
      return;
    }

    this.onClickTile(nextActiveStartDate, event);

    const { view, views } = this;
    const { onDrillDown } = this.props;

    const nextView = views[views.indexOf(view) + 1];

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
    const { onDrillUp } = this.props;

    const nextView = views[views.indexOf(view) - 1];
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

  onChange = (value, event) => {
    const { value: previousValue } = this;
    const { goToRangeStartOnSelect, selectRange } = this.props;

    this.onClickTile(value, event);

    const isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);

    let nextValue;
    if (selectRange) {
      // Range selection turned on
      const { valueType } = this;
      if (isFirstValueInRange) {
        // Value has 0 or 2 elements - either way we're starting a new array
        // First value
        nextValue = getBegin(valueType, value);
      } else {
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
            ...this.props,
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

  onClickTile = (value, event) => {
    const { view } = this;
    const { onClickDay, onClickDecade, onClickMonth, onClickYear } = this.props;

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

  onMouseOver = (value) => {
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

  renderContent(next) {
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
    } = this.props;
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
        const { formatYear } = this.props;

        return <CenturyView formatYear={formatYear} {...commonProps} />;
      }
      case 'decade': {
        const { formatYear } = this.props;

        return <DecadeView formatYear={formatYear} {...commonProps} />;
      }
      case 'year': {
        const { formatMonth, formatMonthYear } = this.props;

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
        } = this.props;
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
    const { showNavigation } = this.props;

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
    } = this.props;

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
    const { className, inputRef, selectRange, showDoubleView } = this.props;
    const { onMouseLeave, value } = this;
    const valueArray = [].concat(value);

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
          onBlur={selectRange ? onMouseLeave : null}
          onMouseLeave={selectRange ? onMouseLeave : null}
        >
          {this.renderContent()}
          {showDoubleView && this.renderContent(true)}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  goToRangeStartOnSelect: true,
  maxDate: defaultMaxDate,
  maxDetail: 'month',
  minDate: defaultMinDate,
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
};

const isActiveStartDate = PropTypes.instanceOf(Date);
const isLooseValue = PropTypes.oneOfType([PropTypes.string, isValue]);

Calendar.propTypes = {
  activeStartDate: isActiveStartDate,
  allowPartialRange: PropTypes.bool,
  calendarType: isCalendarType,
  className: isClassName,
  defaultActiveStartDate: isActiveStartDate,
  defaultValue: isLooseValue,
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
  value: isLooseValue,
  view: isView,
};
