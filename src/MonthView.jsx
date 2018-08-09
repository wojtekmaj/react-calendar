import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import {
  isCalendarType,
  isMaxDate,
  isMinDate,
  isValue,
} from './shared/propTypes';

export default class MonthView extends PureComponent {
  get calendarType() {
    const { calendarType, locale } = this.props;

    if (calendarType) {
      return calendarType;
    }

    switch (locale) {
      case 'en-CA':
      case 'en-US':
      case 'he-IL':
        return 'US';
      default:
        return 'ISO 8601';
    }
  }

  renderWeekdays() {
    const { activeStartDate, formatShortWeekday, locale } = this.props;

    return (
      <Weekdays
        calendarType={this.calendarType}
        locale={locale}
        month={activeStartDate}
        formatShortWeekday={formatShortWeekday}
      />
    );
  }

  renderWeekNumbers() {
    const { showWeekNumbers } = this.props;

    if (!showWeekNumbers) {
      return null;
    }

    const {
      activeStartDate,
      onClickWeekNumber,
      showFixedNumberOfWeeks,
    } = this.props;

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={this.calendarType}
        onClickWeekNumber={onClickWeekNumber}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
      />
    );
  }

  renderDays() {
    const { calendarType, showWeekNumbers, ...childProps } = this.props;

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
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {this.renderWeekNumbers()}
          <div
            style={{
              flexGrow: 1,
              width: '100%',
            }}
          >
            {this.renderWeekdays()}
            {this.renderDays()}
          </div>
        </div>
      </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  formatShortWeekday: PropTypes.func,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  setActiveRange: PropTypes.func,
  showFixedNumberOfWeeks: PropTypes.bool,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};
