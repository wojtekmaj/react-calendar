import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getBeginOfYear, formatDate, formatMonth, getYear } from './shared/dates';

export default class YearView extends Component {
  get year() {
    const { year } = this.props;

    return getYear(year);
  }

  monthsInYear = 12

  render() {
    const months = [];

    for (let month = 0; month < this.monthsInYear; month += 1) {
      months.push(<li key={month}>{formatMonth(new Date(this.year, month, 1))}</li>);
    }

    return (
      <div>
        <p>YearView</p>
        <p>Year begins on {formatDate(getBeginOfYear(this.props.year))}</p>
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
};
