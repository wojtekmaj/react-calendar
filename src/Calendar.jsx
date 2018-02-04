import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import Navigation from './Calendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getBegin, getEnd, getValueRange } from './shared/dates';
import { isCalendarType, isClassName, isMaxDate, isMinDate, isValue } from './shared/propTypes';
import { between, callIfDefined, mergeFunctions } from './shared/utils';

const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

const datesAreDifferent = (date1, date2) => (
  (date1 && !date2) ||
  (!date1 && date2) ||
  (date1 && date2 && date1.getTime() !== date2.getTime())
);

export default class Calendar extends Component {
  get drillDownAvailable() {
    const views = this.getLimitedViews();
    const { view } = this.state;

    return views.indexOf(view) < views.length - 1;
  }

  get drillUpAvailable() {
    const views = this.getLimitedViews();
    const { view } = this.state;

    return views.indexOf(view) > 0;
  }

  /**
   * Returns value type that can be returned with currently applied settings.
   */
  get valueType() {
    const { maxDetail } = this.props;
    return allValueTypes[allViews.indexOf(maxDetail)];
  }

  getValueArray(value) {
    if (value instanceof Array) {
      return value;
    }

    return [this.getValueFrom(value), this.getValueTo(value)];
  }

  getValueFrom = (value) => {
    if (!value) {
      return null;
    }

    const { maxDate, minDate } = this.props;
    const rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;
    const valueFromDate = new Date(rawValueFrom);

    if (Number.isNaN(valueFromDate.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }

    const valueFrom = getBegin(this.valueType, valueFromDate);

    return between(valueFrom, minDate, maxDate);
  }

  getValueTo = (value) => {
    if (!value) {
      return null;
    }

    const { maxDate, minDate } = this.props;
    const rawValueTo = value instanceof Array && value.length === 2 ? value[1] : value;
    const valueToDate = new Date(rawValueTo);

    if (Number.isNaN(valueToDate.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }

    const valueTo = getEnd(this.valueType, valueToDate);

    return between(valueTo, minDate, maxDate);
  }

  /**
   * Returns views array with disallowed values cut off.
   */
  getLimitedViews(props = this.props) {
    const { minDetail, maxDetail } = props;

    return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
  }

  /**
   * Determines whether a given view is allowed with currently applied settings.
   */
  isViewAllowed(props = this.props, view = this.state.view) {
    const views = this.getLimitedViews(props);

    return views.indexOf(view) !== -1;
  }

  /**
   * Gets current value in a desired format.
   */
  getProcessedValue(value) {
    const { returnValue } = this.props;

    switch (returnValue) {
      case 'start':
        return this.getValueFrom(value);
      case 'end':
        return this.getValueTo(value);
      case 'range':
        return this.getValueArray(value);
      default:
        throw new Error('Invalid returnValue.');
    }
  }

  state = {
    activeStartDate: this.getActiveStartDate(),
    hover: null,
    view: this.getView(),
    value: this.props.value,
  }

  componentWillReceiveProps(nextProps) {
    const { value: nextValue } = nextProps;
    const { value } = this.state;

    const nextState = {};

    const allowedViewChanged = (
      nextProps.minDetail !== this.props.minDetail ||
      nextProps.maxDetail !== this.props.maxDetail
    );

    if (allowedViewChanged && !this.isViewAllowed(nextProps)) {
      nextState.view = this.getView(nextProps);
    }

    if (
      allowedViewChanged ||
      datesAreDifferent(...[nextValue, value].map(this.getValueFrom)) ||
      datesAreDifferent(...[nextValue, value].map(this.getValueTo))
    ) {
      this.updateValues(nextProps);
    } else {
      nextState.activeStartDate = this.getActiveStartDate(nextProps);
    }

    if (!nextProps.selectRange && this.props.selectRange) {
      nextState.hover = null;
    }

    this.setState(nextState);
  }

  updateValues = (props = this.props) => {
    this.setState({
      value: props.value,
      activeStartDate: this.getActiveStartDate(props),
    });
  }

  getActiveStartDate(props = this.props) {
    const rangeType = this.getView(props);
    const valueFrom = (
      this.getValueFrom(props.value) ||
      props.activeStartDate ||
      new Date()
    );
    return getBegin(rangeType, valueFrom);
  }

  getView(props = this.props) {
    const { view } = props;

    if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
      return view;
    }

    return this.getLimitedViews(props).pop();
  }

  /**
   * Called when the user uses navigation buttons.
   */
  setActiveStartDate = (activeStartDate) => {
    this.setState({ activeStartDate }, () => {
      callIfDefined(this.props.onActiveDateChange, {
        activeStartDate,
        view: this.state.view,
      });
    });
  }

  drillDown = (activeStartDate) => {
    if (!this.drillDownAvailable) {
      return;
    }

    const views = this.getLimitedViews();

    this.setState((prevState) => {
      const nextView = views[views.indexOf(prevState.view) + 1];
      return {
        activeStartDate,
        view: nextView,
      };
    }, () => {
      callIfDefined(this.props.onDrillDown, {
        activeStartDate,
        view: this.state.view,
      });
    });
  }

  drillUp = () => {
    if (!this.drillUpAvailable) {
      return;
    }

    const views = this.getLimitedViews();

    this.setState((prevState) => {
      const nextView = views[views.indexOf(prevState.view) - 1];
      const activeStartDate = getBegin(nextView, prevState.activeStartDate);

      return {
        activeStartDate,
        view: nextView,
      };
    }, () => {
      callIfDefined(this.props.onDrillUp, {
        activeStartDate: this.state.activeStartDate,
        view: this.state.view,
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
        !previousValue ||
        [].concat(previousValue).length !== 1 // 0 or 2 - either way we're starting a new array
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
    this.setState({ hover: value });
  }

  onMouseOut = () => {
    this.setState({ hover: null });
  }

  renderContent() {
    const {
      calendarType,
      locale,
      maxDate,
      minDate,
      renderChildren,
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
      onMouseOver: this.props.selectRange ? onMouseOver : null,
      tileClassName,
      tileContent: tileContent || renderChildren, // For backwards compatibility
      tileDisabled,
      value,
      valueType,
    };

    const clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

    switch (view) {
      case 'century':
        return (
          <CenturyView
            onClick={mergeFunctions(clickAction, this.props.onClickDecade)}
            {...commonProps}
          />
        );
      case 'decade':
        return (
          <DecadeView
            onClick={mergeFunctions(clickAction, this.props.onClickYear)}
            {...commonProps}
          />
        );
      case 'year':
        return (
          <YearView
            formatMonth={this.props.formatMonth}
            onClick={mergeFunctions(clickAction, this.props.onClickMonth)}
            {...commonProps}
          />
        );
      case 'month':
        return (
          <MonthView
            calendarType={calendarType}
            formatShortWeekday={this.props.formatShortWeekday}
            onClick={mergeFunctions(clickAction, this.props.onClickDay)}
            onClickWeekNumber={this.props.onClickWeekNumber}
            showNeighboringMonth={this.props.showNeighboringMonth}
            showWeekNumbers={this.props.showWeekNumbers}
            {...commonProps}
          />
        );
      default:
        throw new Error(`Invalid view: ${view}.`);
    }
  }

  renderNavigation() {
    const { showNavigation } = this.props;

    if (!showNavigation) {
      return null;
    }

    return (
      <Navigation
        activeRange={this.state.activeRange}
        activeStartDate={this.state.activeStartDate}
        drillUp={this.drillUp}
        formatMonthYear={this.props.formatMonthYear}
        locale={this.props.locale}
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        next2Label={this.props.next2Label}
        nextLabel={this.props.nextLabel}
        prev2Label={this.props.prev2Label}
        prevLabel={this.props.prevLabel}
        setActiveStartDate={this.setActiveStartDate}
        view={this.state.view}
        views={this.getLimitedViews()}
      />
    );
  }

  render() {
    const { className, selectRange } = this.props;
    const { value } = this.state;
    const { onMouseOut } = this;
    const valueArray = [].concat(value);

    return (
      <div
        className={mergeClassNames(
          'react-calendar',
          selectRange && valueArray.length === 1 && 'react-calendar--selectRange',
          className,
        )}
        onMouseOut={selectRange ? onMouseOut : null}
        onBlur={selectRange ? onMouseOut : null}
      >
        {this.renderNavigation()}
        {this.renderContent()}
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
  next2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onActiveDateChange: PropTypes.func,
  onChange: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickDecade: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  onClickYear: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDrillUp: PropTypes.func,
  prev2Label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  renderChildren: PropTypes.func, // For backwards compatibility
  returnValue: PropTypes.oneOf(['start', 'end', 'range']),
  selectRange: PropTypes.bool,
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
