import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Months from './YearView/Months';

import {
  getBeginOfYear,
  getEndOfYear,
} from './shared/dates';

export default class YearView extends Component {
  componentDidMount() {
    const { year, setActiveRange } = this.props;

    const beginOfYear = getBeginOfYear(year);
    const endOfYear = getEndOfYear(year);

    if (setActiveRange) setActiveRange([beginOfYear, endOfYear]);
  }

  renderMonths() {
    const { onClickMonth, setActiveRange, year } = this.props;

    return (
      <Months
        year={year}
        onClickMonth={onClickMonth}
        setActiveRange={setActiveRange}
      />
    );
  }

  render() {
    return (
      <div className="react-calendar__year-view">
        {this.renderMonths()}
      </div>
    );
  }
}

YearView.defaultProps = {
  year: new Date(),
};

YearView.propTypes = {
  onClickMonth: PropTypes.func,
  setActiveRange: PropTypes.func,
  year: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
