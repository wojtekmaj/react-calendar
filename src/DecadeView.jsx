import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Years from './DecadeView/Years';

import { isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class DecadeView extends PureComponent {
  renderYears() {
    return (
      <Years {...this.props} />
    );
  }

  render() {
    const { onMouseLeave } = this.props;

    return (
      <div className="react-calendar__decade-view" onMouseLeave={onMouseLeave}>
        {this.renderYears()}
      </div>
    );
  }
}

DecadeView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  setActiveRange: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
