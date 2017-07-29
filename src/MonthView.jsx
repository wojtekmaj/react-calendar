import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import { getLocale } from './shared/locales';
import { isCalendarType, isValue } from './shared/propTypes';

export default class MonthView extends Component {
  get calendarType() {
    const { calendarType } = this.props;

    if (calendarType) {
      return calendarType;
    }

    switch (getLocale()) {
      case 'en-US':
        return 'US';
      default:
        return 'ISO 8601';
    }
  }

  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('month');
  }

  renderWeekdays() {
    const { calendarType } = this;
    const { activeStartDate } = this.props;

    return (
      <Weekdays
        calendarType={calendarType}
        month={activeStartDate}
      />
    );
  }

  renderWeekNumbers() {
    const { showWeekNumbers } = this.props;

    if (!showWeekNumbers) {
      return null;
    }

    const { calendarType } = this;
    const { activeStartDate } = this.props;

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
      />
    );
  }

  renderDays() {
    const { setView, calendarType, ...childProps } = this.props;

    return (
      <Days
        calendarType={this.calendarType}
        {...childProps}
      />
    );
  }

  render() {
    const { showWeekNumbers } = this.props;

    const className = 'react-calendar__month-view';

    return (
      <div
        className={[
          className,
          showWeekNumbers ? `${className}--weekNumbers` : '',
        ].join(' ')}
      >
        {this.renderWeekdays()}
        {this.renderWeekNumbers()}
        {this.renderDays()}
      </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};
