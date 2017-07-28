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
    const { calendarType, activeStartDate } = this.props;

    return (
      <Weekdays
        calendarType={calendarType}
        month={activeStartDate}
      />
    );
  }

  renderDays() {
    const {
      activeStartDate,
      calendarType,
      onClickItem,
      setActiveRange,
    } = this.props;

    return (
      <Days
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickItem={onClickItem}
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
};

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  onClickItem: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
};
