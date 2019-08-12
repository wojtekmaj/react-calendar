import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import mergeClassNames from 'merge-class-names';

import Navigation from './Calendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getBegin, getEnd, getValueRange } from './shared/dates';
import {
  isCalendarType, isClassName, isMaxDate, isMinDate, isValue,
} from './shared/propTypes';
import { between, callIfDefined, mergeFunctions } from './shared/utils';

const baseClassName = 'react-calendar';
const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

const datesAreDifferent = (date1, date2) => (
  (date1 && !date2)
  || (!date1 && date2)
  || (date1 && date2 && date1.getTime() !== date2.getTime())
);

/**
 * Returns views array with disallowed values cut off.
 */
const getLimitedViews = (minDetail, maxDetail) => allViews
  .slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);

/**
 * Determines whether a given view is allowed with currently applied settings.
 */
const isViewAllowed = (view, minDetail, maxDetail) => {
  const views = getLimitedViews(minDetail, maxDetail);

  return views.indexOf(view) !== -1;
};

/**
 * Gets either provided view if allowed by minDetail and maxDetail, or gets
 * the default view if not allowed.
 */
const getView = (view, minDetail, maxDetail) => {
  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }

  return getLimitedViews(minDetail, maxDetail).pop();
};

/**
 * Returns value type that can be returned with currently applied settings.
 */
const getValueType = maxDetail => allValueTypes[allViews.indexOf(maxDetail)];

const getValueFrom = (value) => {
  if (!value) {
    return null;
  }

  const rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;

  if (!rawValueFrom) {
    return null;
  }

  const valueFromDate = new Date(rawValueFrom);

  if (isNaN(valueFromDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueFromDate;
};

const getDetailValueFrom = (value, minDate, maxDate, maxDetail) => {
  const valueFrom = getValueFrom(value);

  if (!valueFrom) {
    return null;
  }

  const detailValueFrom = getBegin(getValueType(maxDetail), valueFrom);

  return between(detailValueFrom, minDate, maxDate);
};

const getValueTo = (value) => {
  if (!value) {
    return null;
  }

  const rawValueTo = value instanceof Array && value.length === 2 ? value[1] : value;

  if (!rawValueTo) {
    return null;
  }

  const valueToDate = new Date(rawValueTo);

  if (isNaN(valueToDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueToDate;
};

const getDetailValueTo = (value, minDate, maxDate, maxDetail) => {
  const valueTo = getValueTo(value);

  if (!valueTo) {
    return null;
  }

  const detailValueTo = getEnd(getValueType(maxDetail), valueTo);

  return between(detailValueTo, minDate, maxDate);
};

const getDetailValueArray = (value, minDate, maxDate, maxDetail) => {
  if (value instanceof Array) {
    return value;
  }

  return [
    getDetailValueFrom(value, minDate, maxDate, maxDetail),
    getDetailValueTo(value, minDate, maxDate, maxDetail),
  ];
};

const getActiveStartDate = (props) => {
  const {
    activeStartDate,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value,
    view,
  } = props;

  const rangeType = getView(view, minDetail, maxDetail);
  const valueFrom = (
    getDetailValueFrom(value, minDate, maxDate, maxDetail)
    || activeStartDate
    || new Date()
  );
  return getBegin(rangeType, valueFrom);
};

export default class Calendar extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      minDate, maxDate, minDetail, maxDetail,
    } = nextProps;

    const nextState = {};

    /**
     * If the next activeStartDate is different from the current one, update
     * activeStartDate (for display) and activeStartDateProps (for future comparisons)
     */
    const nextActiveStartDate = getActiveStartDate(nextProps);
    if (datesAreDifferent(nextActiveStartDate, prevState.activeStartDateProps)) {
      nextState.activeStartDate = nextActiveStartDate;
      nextState.activeStartDateProps = nextActiveStartDate;
    }

    /**
     * If the next view is different from the current one, and the previously set view is not
     * valid based on minDetail and maxDetail, get a new one.
     */
    const nextView = getView(nextProps.view, minDetail, maxDetail);
    if (nextView !== prevState.viewProps && !isViewAllowed(prevState.view, minDetail, maxDetail)) {
      nextState.view = nextView;
      nextState.viewProps = nextView;
    }

    /**
     * If the next value is different from the current one (with an exception of situation in
     * which values provided are limited by minDate and maxDate so that the dates are the same),
     * get a new one.
     */
    const values = [nextProps.value, prevState.valueProps];
    if (
      nextState.view // Allowed view changed
      || datesAreDifferent(
        ...values.map(value => getValueFrom(value, minDate, maxDate, maxDetail)),
      )
      || datesAreDifferent(
        ...values.map(value => getValueTo(value, minDate, maxDate, maxDetail)),
      )
    ) {
      nextState.value = nextProps.value;
      nextState.valueProps = nextProps.value;
    }

    if (!nextProps.selectRange && prevState.hover) {
      nextState.hover = null;
    }

    return nextState;
  }

  state = {};

  get drillDownAvailable() {
    const { maxDetail, minDetail } = this.props;
    const { view } = this.state;

    const views = getLimitedViews(minDetail, maxDetail);

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const { maxDetail, minDetail } = this.props;
    const { view } = this.state;

    const views = getLimitedViews(minDetail, maxDetail);

    return views.indexOf(view) > 0;
  }

  get valueType() {
    const { maxDetail } = this.props;

    return getValueType(maxDetail);
  }

  /**
   * Gets current value in a desired format.
   */
  getProcessedValue(value) {
    const {
      minDate, maxDate, maxDetail, returnValue,
    } = this.props;

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

    return processFunction(value, minDate, maxDate, maxDetail);
  }

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveStartDate = (activeStartDate) => {
    const { onActiveDateChange } = this.props;

    this.setState({ activeStartDate }, () => {
      const { view } = this.state;

      callIfDefined(onActiveDateChange, {
        activeStartDate,
        view,
      });
    });
  }

  drillDown = (activeStartDate) => {
    if (!this.drillDownAvailable) {
      return;
    }

    const { maxDetail, minDetail, onDrillDown } = this.props;

    const views = getLimitedViews(minDetail, maxDetail);

    this.setState((prevState) => {
      const nextView = views[views.indexOf(prevState.view) + 1];
      return {
        activeStartDate,
        view: nextView,
      };
    }, () => {
      const { view } = this.state;

      callIfDefined(onDrillDown, {
        activeStartDate,
        view,
      });
    });
  }

  drillUp = () => {
    if (!this.drillUpAvailable) {
      return;
    }

    const { maxDetail, minDetail, onDrillUp } = this.props;

    const views = getLimitedViews(minDetail, maxDetail);

    this.setState((prevState) => {
      const nextView = views[views.indexOf(prevState.view) - 1];
      const activeStartDate = getBegin(nextView, prevState.activeStartDate);

      return {
        activeStartDate,
        view: nextView,
      };
    }, () => {
      const { activeStartDate, view } = this.state;

      callIfDefined(onDrillUp, {
        activeStartDate,
        view,
      });
    });
  }

  onChange = (value) => {
    const { onChange, selectRange } = this.props;

    let nextValue;
    let callback;
    if (selectRange) {
      const { value: previousValue } = this.state;
      // Range selection turned on
      if (
        !previousValue
        || [].concat(previousValue).length !== 1 // 0 or 2 - either way we're starting a new array
      ) {
        // First value
        nextValue = getBegin(this.valueType, value);
      } else {
        // Second value
        nextValue = getValueRange(this.valueType, previousValue, value);
        callback = () => callIfDefined(onChange, nextValue);
      }
    } else {
      // Range selection turned off
      nextValue = this.getProcessedValue(value);
      callback = () => callIfDefined(onChange, nextValue);
    }

    this.setState({ value: nextValue }, callback);
  }

  onMouseOver = (value) => {
    this.setState((prevState) => {
      if (prevState.hover && (prevState.hover.getTime() === value.getTime())) {
        return null;
      }

      return { hover: value };
    });
  }

  onMouseLeave = () => {
    this.setState({ hover: null });
  }

  renderContent() {
    const {
      calendarType,
      locale,
      maxDate,
      minDate,
      renderChildren,
      selectRange,
      tileClassName,
      tileContent,
      tileDisabled,
    } = this.props;
    const {
      activeStartDate, hover, value, view,
    } = this.state;
    const { onMouseOver, valueType } = this;

    const commonProps = {
      activeStartDate,
      hover,
      locale,
      maxDate,
      minDate,
      onMouseOver: selectRange ? onMouseOver : null,
      tileClassName,
      tileContent: tileContent || renderChildren, // For backwards compatibility
      tileDisabled,
      value,
      valueType,
    };

    const clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

    switch (view) {
      case 'century': {
        const { onClickDecade } = this.props;

        return (
          <CenturyView
            onClick={mergeFunctions(clickAction, onClickDecade)}
            {...commonProps}
          />
        );
      }
      case 'decade': {
        const { onClickYear } = this.props;

        return (
          <DecadeView
            onClick={mergeFunctions(clickAction, onClickYear)}
            {...commonProps}
          />
        );
      }
      case 'year': {
        const { formatMonth, onClickMonth } = this.props;

        return (
          <YearView
            formatMonth={formatMonth}
            onClick={mergeFunctions(clickAction, onClickMonth)}
            {...commonProps}
          />
        );
      }
      case 'month': {
        const {
          formatShortWeekday,
          onClickDay,
          onClickWeekNumber,
          showFixedNumberOfWeeks,
          showNeighboringMonth,
          showWeekNumbers,
        } = this.props;
        const { onMouseLeave } = this;

        return (
          <MonthView
            calendarType={calendarType}
            formatShortWeekday={formatShortWeekday}
            onClick={mergeFunctions(clickAction, onClickDay)}
            onClickWeekNumber={onClickWeekNumber}
            onMouseLeave={onMouseLeave}
            showFixedNumberOfWeeks={showFixedNumberOfWeeks}
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

    const {
      formatMonthYear,
      locale,
      maxDate,
      maxDetail,
      minDate,
      minDetail,
      navigationAriaLabel,
      navigationLabel,
      next2AriaLabel,
      next2Label,
      nextAriaLabel,
      nextLabel,
      prev2AriaLabel,
      prev2Label,
      prevAriaLabel,
      prevLabel,
    } = this.props;
    const { activeStartDate, view } = this.state;

    return (
      <Navigation
        activeStartDate={activeStartDate}
        drillUp={this.drillUp}
        formatMonthYear={formatMonthYear}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        navigationAriaLabel={navigationAriaLabel}
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
        view={view}
        views={getLimitedViews(minDetail, maxDetail)}
      />
    );
  }

  render() {
    const { className, selectRange } = this.props;
    const { value } = this.state;
    const { onMouseLeave } = this;
    const valueArray = [].concat(value);

    return (
      <div
        className={mergeClassNames(
          baseClassName,
          selectRange && valueArray.length === 1 && `${baseClassName}--selectRange`,
          className,
        )}
      >
        {this.renderNavigation()}
        <div
          className={`${baseClassName}__viewContainer`}
          onBlur={selectRange ? onMouseLeave : null}
          onMouseLeave={selectRange ? onMouseLeave : null}
        >
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
  view: 'month',
};

Calendar.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date),
  calendarType: isCalendarType,
  className: isClassName,
  formatMonth: PropTypes.func,
  formatMonthYear: PropTypes.func,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  maxDetail: PropTypes.oneOf(allViews),
  minDate: isMinDate,
  minDetail: PropTypes.oneOf(allViews),
  navigationAriaLabel: PropTypes.string,
  navigationLabel: PropTypes.func,
  next2AriaLabel: PropTypes.string,
  next2Label: PropTypes.node,
  nextAriaLabel: PropTypes.string,
  nextLabel: PropTypes.node,
  onActiveDateChange: PropTypes.func,
  onChange: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickDecade: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onClickYear: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDrillUp: PropTypes.func,
  prev2AriaLabel: PropTypes.string,
  prev2Label: PropTypes.node,
  prevAriaLabel: PropTypes.string,
  prevLabel: PropTypes.node,
  renderChildren: PropTypes.func, // For backwards compatibility
  returnValue: PropTypes.oneOf(['start', 'end', 'range']),
  selectRange: PropTypes.bool,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNavigation: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  tileClassName: PropTypes.oneOfType([
    PropTypes.func,
    isClassName,
  ]),
  tileContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  tileDisabled: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    isValue,
  ]),
  view: PropTypes.oneOf(allViews),
};

polyfill(Calendar);
