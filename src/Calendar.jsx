import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import Navigation from './Calendar/Navigation';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import YearView from './YearView';
import MonthView from './MonthView';

import { getBegin, getEnd } from './shared/dates';
import { setLocale } from './shared/locales';
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

  getValueFrom(value) {
    if (!value) {
      return null;
    }

    const { maxDate, minDate } = this.props;
    const rawValueFrom = value instanceof Array ? value[0] : value;
    const valueFromDate = new Date(rawValueFrom);

    if (Number.isNaN(valueFromDate.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }

    const valueFrom = getBegin(this.valueType, valueFromDate);

    return between(valueFrom, minDate, maxDate);
  }

  getValueTo(value) {
    if (!value) {
      return null;
    }

    const { maxDate, minDate } = this.props;
    const rawValueTo = value instanceof Array ? value[1] : value;
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
    view: this.getView(),
  }

  componentWillMount() {
    setLocale(this.props.locale);
  }

  componentWillReceiveProps(nextProps) {
    const { locale: nextLocale, value: nextValue } = nextProps;
    const { locale, value } = this.props;

    if (nextLocale !== locale) {
      setLocale(nextLocale);
    }

    const nextState = {};

    const allowedViewChanged = (
      nextProps.minDetail !== this.props.minDetail ||
      nextProps.maxDetail !== this.props.maxDetail
    );

    if (allowedViewChanged && !this.isViewAllowed(nextProps)) {
      nextState.view = this.getView(nextProps);
    }

    const nextValueFrom = this.getValueFrom(nextValue);
    const valueFrom = this.getValueFrom(value);

    const nextValueTo = this.getValueTo(nextValue);
    const valueTo = this.getValueTo(value);

    if (
      allowedViewChanged ||
      datesAreDifferent(nextValueFrom, valueFrom) ||
      datesAreDifferent(nextValueTo, valueTo)
    ) {
      nextState.activeStartDate = this.getActiveStartDate(nextProps);
    }

    this.setState(nextState);
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
    callIfDefined(this.props.onChange, this.getProcessedValue(value));
  }

  renderContent() {
    const {
      calendarType, maxDate, minDate, renderChildren, tileClassName, tileContent, value,
    } = this.props;
    const { activeStartDate, view } = this.state;

    const commonProps = {
      activeStartDate,
      maxDate,
      minDate,
      tileClassName,
      tileContent: tileContent || renderChildren, // For backwards compatibility
      value: this.getProcessedValue(value),
      valueType: this.valueType,
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
            onClick={mergeFunctions(clickAction, this.props.onClickMonth)}
            {...commonProps}
          />
        );
      case 'month':
        return (
          <MonthView
            calendarType={calendarType}
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
    return (
      <div className={mergeClassNames('react-calendar', this.props.className)}>
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    isValue,
  ]),
  view: PropTypes.oneOf(allViews),
};
