import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getBeginOfCentury, getBeginOfCenturyYear, formatDate } from './shared/dates';

export default class CenturyView extends Component {
  yearsInCentury = 100

  yearsInDecade = 10

  render() {
    const start = getBeginOfCenturyYear(this.props.century);

    const decades = [];

    for (let decade = start; decade < start + this.yearsInCentury; decade += this.yearsInDecade) {
      decades.push(<li key={decade}>{decade}s</li>);
    }

    return (
      <div>
        <p>CenturyView</p>
        <p>Century begins on {formatDate(getBeginOfCentury(this.props.century))}</p>
        <ul>
          {decades}
        </ul>
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
};
