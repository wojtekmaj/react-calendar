import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';

import { getLocale } from './shared/locales';
import { isCalendarType } from './shared/propTypes';

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

  renderDays() {
    const { calendarType } = this;
    const {
      activeStartDate,
      onClickItem,
      setActiveRange,
      value,
    } = this.props;

    return (
      <Days
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickItem={onClickItem}
        setActiveRange={setActiveRange}
        value={value}
      />
    );
  }

  render() {
    return (
      <div className="react-calendar__month-view">
        {this.renderWeekdays()}
        {this.renderDays()}
      </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  onClickItem: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
