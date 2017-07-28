import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getBeginOfCentury,
  getEndOfCentury,
  getBeginOfDecade,
  getEndOfDecade,
  getBeginOfCenturyYear,
} from './shared/dates';

export default class CenturyView extends Component {
  componentDidMount() {
    const { century, setDate } = this.props;

    const beginOfCentury = getBeginOfCentury(century);
    const endOfCentury = getEndOfCentury(century);

    if (setDate) setDate([beginOfCentury, endOfCentury]);
  }

  yearsInCentury = 100

  yearsInDecade = 10

  render() {
    const { century, onClickDecade, setDate } = this.props;

    const start = getBeginOfCenturyYear(century);

    const decades = [];
    for (let decade = start; decade < start + this.yearsInCentury; decade += this.yearsInDecade) {
      decades.push(
        <li
          key={decade}
          onClick={() => {
            if (onClickDecade) onClickDecade();

            if (setDate) {
              const beginOfDecade = getBeginOfDecade(decade);
              const endOfDecade = getEndOfDecade(decade);

              setDate([beginOfDecade, endOfDecade]);
            }
          }}
        >
          {decade}s
        </li>,
      );
    }

    return (
      <div>
        <p>CenturyView</p>
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
  onClickDecade: PropTypes.func,
  setDate: PropTypes.func,
};
