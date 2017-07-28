import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';

import { isCalendarType } from './shared/propTypes';

export default class MonthView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('month');
  }

  renderWeekdays() {
    const { calendarType, month } = this.props;

    return (
      <Weekdays
        calendarType={calendarType}
        month={month}
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
  calendarType: isCalendarType,
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickDay: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
};
