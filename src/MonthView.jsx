import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';

import {
  getBeginOfMonth,
  getEndOfMonth,
  getMonthIndex,
  getYear,
} from './shared/dates';

export default class MonthView extends Component {
  componentDidMount() {
    const { month, setActiveRange } = this.props;

    const beginOfMonth = getBeginOfMonth(month);
    const endOfMonth = getEndOfMonth(month);

    if (setActiveRange) setActiveRange([beginOfMonth, endOfMonth]);
  }

  get year() {
    const { month } = this.props;

    return getYear(month);
  }

  get monthIndex() {
    const { month } = this.props;

    return getMonthIndex(month);
  }

  get beginOfMonth() {
    const { month } = this.props;

    return getBeginOfMonth(month);
  }

  get endOfMonth() {
    const { month } = this.props;

    return getEndOfMonth(month);
  }

  renderWeekdays() {
    const { calendarType } = this.props;

    return (
      <Weekdays
        beginOfMonth={this.beginOfMonth}
        calendarType={calendarType}
      />
    );
  }

  renderDays() {
    const {
      calendarType,
      month,
      onClickDay,
      setActiveRange,
    } = this.props;

    return (
      <Days
        calendarType={calendarType}
        month={month}
        onClickDay={onClickDay}
        setActiveRange={setActiveRange}
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

MonthView.defaultProps = {
  calendarType: 'ISO 8601',
  month: new Date(),
};

MonthView.propTypes = {
  calendarType: PropTypes.oneOf(['ISO 8601', 'US']),
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickDay: PropTypes.func,
  setActiveRange: PropTypes.func,
};
