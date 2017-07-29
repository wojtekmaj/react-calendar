import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Years from './DecadeView/Years';

export default class DecadeView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('decade');
  }

  renderYears() {
    const {
      activeStartDate,
      onClickItem,
      setActiveRange,
      value,
    } = this.props;

    return (
      <Years
        activeStartDate={activeStartDate}
        onClickItem={onClickItem}
        setActiveRange={setActiveRange}
        value={value}
      />
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
  onClickItem: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};
