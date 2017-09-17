import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Decade from './Decade';

import {
  getBeginOfDecade,
  getBeginOfCenturyYear,
} from '../shared/dates';
import { getTileActivityFlags } from '../shared/utils';
import { isMaxDate, isMinDate, isValue } from '../shared/propTypes';

export default class Decades extends Component {
  get start() {
    const { activeStartDate } = this.props;
    return getBeginOfCenturyYear(activeStartDate);
  }

  get end() {
    return this.start + 99;
  }

  render() {
    const { end, start } = this;
    const { maxDate, minDate, onClick, renderChildren, value, valueType } = this.props;

    const decadeProps = {
      maxDate,
      minDate,
      onClick,
      renderChildren,
    };

    const decades = [];
    for (let decade = start; decade <= end; decade += 10) {
      const date = getBeginOfDecade(decade);

      decades.push(
        <Decade
          {...getTileActivityFlags(value, valueType, date, 'decade')}
          date={date}
          decade={decade}
          key={decade}
          {...decadeProps}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__century-view__decades"
        count={3}
        wrap
      >
        {decades}
      </Flex>
    );
  }
}

Decades.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  renderChildren: PropTypes.func,
  value: isValue,
  valueType: PropTypes.string,
};
