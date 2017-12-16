import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Flex from '../Flex';
import Month from './Month';

import { getYear } from '../shared/dates';
import { getTileActivityFlags } from '../shared/utils';
import { isClassName, isMaxDate, isMinDate, isValue } from '../shared/propTypes';

export default class Months extends PureComponent {
  start = 0

  end = 11

  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate);
  }

  render() {
    const { end, start, year } = this;
    const {
      maxDate, minDate, onClick, tileClassName, tileContent, value, valueType,
    } = this.props;

    const monthProps = {
      maxDate,
      minDate,
      onClick,
      tileClassName,
      tileContent,
    };

    const months = [];
    for (let monthIndex = start; monthIndex <= end; monthIndex += 1) {
      const date = new Date(year, monthIndex, 1);

      months.push(
        <Month
          {...getTileActivityFlags(value, valueType, date, 'month')}
          date={date}
          key={monthIndex}
          {...monthProps}
        />,
      );
    }

    return (
      <Flex
        className="react-calendar__year-view__months"
        count={3}
        wrap
      >
        {months}
      </Flex>
    );
  }
}

Months.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onClick: PropTypes.func,
  tileClassName: PropTypes.oneOfType([
    PropTypes.func,
    isClassName,
  ]),
  tileContent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  value: isValue,
  valueType: PropTypes.string,
};
