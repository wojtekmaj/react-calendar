import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getBeginOfMonth, formatDate, getYear, getMonthIndex } from './shared/dates';

export default class MonthView extends Component {
  get year() {
    const { month } = this.props;

    return getYear(month);
  }

  get monthIndex() {
    const { month } = this.props;

    return getMonthIndex(month);
  }

  get daysInMonth() {
    return new Date(this.year, this.monthIndex + 1, 0).getDate();
  }

  render() {
    const days = [];

    for (let day = 1; day <= this.daysInMonth; day += 1) {
      days.push(<li key={day}>{formatDate(new Date(this.year, this.monthIndex, day))}</li>);
    }

    return (
      <div>
        <p>MonthView</p>
        <p>Month begins on {formatDate(getBeginOfMonth(this.props.month))}</p>
        <ul>
          {days}
        </ul>
      </div>
    );
  }
}

MonthView.defaultProps = {
  month: new Date(),
};

MonthView.propTypes = {
  month: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
