import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfDecade,
  getEndOfDecade,
  getBeginOfYear,
  getEndOfYear,
  getBeginOfDecadeYear,
} from './shared/dates';

export default class DecadeView extends Component {
  componentDidMount() {
    const { decade, setDate } = this.props;

    const beginOfCentury = getBeginOfDecade(decade);
    const endOfCentury = getEndOfDecade(decade);

    if (setDate) setDate([beginOfCentury, endOfCentury]);
  }

  yearsInDecade = 10

  render() {
    const { decade, onClickYear, setDate } = this.props;

    const start = getBeginOfDecadeYear(decade);

    const years = [];
    for (let year = start; year < start + this.yearsInDecade; year += 1) {
      years.push(
        <li
          key={year}
          onClick={() => {
            if (onClickYear) onClickYear();

            if (setDate) {
              const beginOfYear = getBeginOfYear(year);
              const endOfYear = getEndOfYear(year);

              setDate([beginOfYear, endOfYear]);
            }
          }}
        >
          {year}s
        </li>,
      );
    }

    return (
      <div>
        <p>DecadeView</p>
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
  onClickYear: PropTypes.func,
  setDate: PropTypes.func,
};
