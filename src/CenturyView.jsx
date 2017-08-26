import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Decades from './CenturyView/Decades';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class CenturyView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('century');
  }

  renderDecades() {
    const {
      setView,
      ...childProps
    } = this.props;

    return (
      <Decades {...childProps} />
    );
  }

  render() {
    return (
      <div className="react-calendar__century-view">
        {this.renderDecades()}
      </div>
    );
  }
}

CenturyView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
