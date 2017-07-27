import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getBeginOfDecade, getBeginOfDecadeYear, formatDate } from './shared/dates';

export default class DecadeView extends Component {
  yearsInDecade = 10

  render() {
    const start = getBeginOfDecadeYear(this.props.decade);

    const years = [];

    for (let year = start; year < start + this.yearsInDecade; year += 1) {
      years.push(<li key={year}>{year}</li>);
    }

    return (
      <div>
        <p>DecadeView</p>
        <p>Decade begins on {formatDate(getBeginOfDecade(this.props.decade))}</p>
        <ul>
          {years}
        </ul>
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
};
