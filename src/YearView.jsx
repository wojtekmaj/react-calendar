import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfYear,
  getEndOfYear,
  formatMonth,
  getYear,
} from './shared/dates';

export default class YearView extends Component {
  componentDidMount() {
    const { year, setDate } = this.props;

    const beginOfYear = getBeginOfYear(year);
    const endOfYear = getEndOfYear(year);

    if (setDate) setDate([beginOfYear, endOfYear]);
  }

  get year() {
    const { year } = this.props;

    return getYear(year);
  }

  monthsInYear = 12

  render() {
    const { onClickMonth, setDate } = this.props;

    const months = [];
    for (let monthIndex = 0; monthIndex < this.monthsInYear; monthIndex += 1) {
      const beginOfMonth = new Date(this.year, monthIndex, 1);

      months.push(
        <li
          key={monthIndex}
          onClick={() => {
            if (onClickMonth) onClickMonth();

            if (setDate) {
              const endOfMonth = new Date(this.year, monthIndex + 1, 1, 0, 0, 0, -1);

              setDate([beginOfMonth, endOfMonth]);
            }
          }}
        >
          {formatMonth(beginOfMonth)}
        </li>,
      );
    }

    return (
      <div>
        <p>YearView</p>
        <ul>
          {months}
        </ul>
      </div>
    );
  }
}

YearView.defaultProps = {
  year: new Date(),
};

YearView.propTypes = {
  year: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickMonth: PropTypes.func,
  setDate: PropTypes.func,
};
