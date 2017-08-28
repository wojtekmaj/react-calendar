import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Years from './DecadeView/Years';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class DecadeView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('decade');
  }

  renderYears() {
    const {
      setView,
      ...childProps
    } = this.props;

    return (
      <Years {...childProps} />
    );
  }

  render() {
    return (
      <div className="react-calendar__decade-view">
        {this.renderYears()}
      </div>
    );
  }
}

DecadeView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
