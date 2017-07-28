import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Months from './YearView/Months';

export default class YearView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('year');
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

YearView.propTypes = {
  onClickMonth: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  year: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};
