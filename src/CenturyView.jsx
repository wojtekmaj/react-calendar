import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Decades from './CenturyView/Decades';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class CenturyView extends PureComponent {
  renderDecades() {
    return (
      <Decades {...this.props} />
    );
  }

  render() {
    const { onMouseLeave } = this.props;

    return (
      <div className="react-calendar__century-view" onMouseLeave={onMouseLeave}>
        {this.renderDecades()}
      </div>
    );
  }
}

CenturyView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
