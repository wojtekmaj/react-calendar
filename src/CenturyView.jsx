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
      onClickDecade,
      setActiveRange,
      century,
    } = this.props;

    return (
      <Decades
        century={century}
        onClickDecade={onClickDecade}
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

CenturyView.defaultProps = {
  century: new Date(),
};

CenturyView.propTypes = {
  century: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickDecade: PropTypes.func,
  setActiveRange: PropTypes.func,
  setView: PropTypes.func,
};
