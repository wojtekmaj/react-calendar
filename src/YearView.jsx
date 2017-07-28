import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Months from './YearView/Months';

export default class YearView extends Component {
  componentDidMount() {
    const { setView } = this.props;

    if (setView) setView('year');
  }

  renderMonths() {
    const {
      activeStartDate,
      onClickItem,
      setActiveRange,
    } = this.props;

    return (
      <Months
        activeStartDate={activeStartDate}
        onClickItem={onClickItem}
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
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  onClickItem: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
};
