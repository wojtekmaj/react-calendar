import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Decades from './CenturyView/Decades';

export default class CenturyView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('century');
  }

  renderDecades() {
    const {
      activeStartDate,
      onClickItem,
      setActiveRange,
    } = this.props;

    return (
      <Decades
        activeStartDate={activeStartDate}
        onClickItem={onClickItem}
        setActiveRange={setActiveRange}
      />
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
  onClickItem: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
};
