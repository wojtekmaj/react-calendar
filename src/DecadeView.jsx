import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Years from './DecadeView/Years';

import {
  getBeginOfDecade,
  getEndOfDecade,
} from './shared/dates';

export default class DecadeView extends Component {
  componentDidMount() {
    const { decade, setActiveRange } = this.props;

    const beginOfCentury = getBeginOfDecade(decade);
    const endOfCentury = getEndOfDecade(decade);

    if (setActiveRange) setActiveRange([beginOfCentury, endOfCentury]);
  }

  renderYears() {
    const {
      onClickYear,
      setActiveRange,
      decade,
    } = this.props;

    return (
      <Years
        decade={decade}
        onClickYear={onClickYear}
        setActiveRange={setActiveRange}
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

DecadeView.defaultProps = {
  decade: new Date(),
};

DecadeView.propTypes = {
  decade: PropTypes.oneOfType([
    PropTypes.string, // Only strings that are parseable to integer
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  onClickYear: PropTypes.func,
  setActiveRange: PropTypes.func,
};
