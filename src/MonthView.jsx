import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfMonth,
  getEndOfMonth,
  getDaysInMonth,
  formatDate,
  getYear,
  getMonthIndex,
} from './shared/dates';

export default class MonthView extends Component {
  componentDidMount() {
    const { month, setDate } = this.props;

    const beginOfMonth = getBeginOfMonth(month);
    const endOfMonth = getEndOfMonth(month);

    if (setDate) setDate([beginOfMonth, endOfMonth]);
  }

  get year() {
    const { month } = this.props;

    return getYear(month);
  }

  get monthIndex() {
    const { month } = this.props;

    return getMonthIndex(month);
  }

  render() {
    const { month, onClickDay, setDate } = this.props;

    const days = [];
    for (let day = 1; day <= getDaysInMonth(month); day += 1) {
      const beginOfDay = new Date(this.year, this.monthIndex, day);

      days.push(
        <li
          key={day}
          onClick={() => {
            if (onClickDay) onClickDay();

            if (setDate) {
              const endOfDay = new Date(this.year, this.monthIndex, day + 1, 0, 0, 0, -1);

              setDate([beginOfDay, endOfDay]);
            }
          }}
        >
          {formatDate(beginOfDay)}
        </li>,
      );
    }

    return (
      <div>
        <p>MonthView</p>
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
  onClickDay: PropTypes.func,
  setDate: PropTypes.func,
};
