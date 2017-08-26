import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Months from './YearView/Months';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class YearView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('year');
  }

  renderMonths() {
    const {
      setView,
      ...childProps
    } = this.props;

    return (
      <Months {...childProps} />
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
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
